import React from 'react';
import Markdown from 'markdown-it';
import { Item } from '../App';
import { insertTab } from '../utils/insertTab';

const Md = new Markdown({ breaks: true });

export interface Content {
  selectedMd: Item
  onSave(md: Item): void
}

const Content: React.FC<Content> = ({ selectedMd, onSave }) => {
  const [currentValue, setCurrentValue] = React.useState<string>(selectedMd.text);
  const [preview, setPreview] = React.useState<boolean>(true);

  React.useEffect(() => {
    setCurrentValue(selectedMd.text);
    setPreview(Boolean(selectedMd.text));
  }, [selectedMd]);

  return (
    <div>
      <button onClick={() => setPreview(!preview)}>
        {preview ? 'Edycja' : 'Podgląd'}
      </button>
      {preview ? (
        <div dangerouslySetInnerHTML={{__html: Md.render(currentValue)}}>
        </div>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault()
          onSave({
            ...selectedMd,
            text: currentValue,
            modified: new Date().getTime(),
          })
        }}>
          <button type="submit">Zapisz</button>
          <textarea
            onChange={(e) => { setCurrentValue(e.target.value); }}
            onKeyDown={insertTab}
          >
            {currentValue}
          </textarea>
        </form>
      )}
    </div>
  );
};

export default Content;
