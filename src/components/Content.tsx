import React from 'react';
import { Item } from './Menu';

export interface Content {
  selectedMd: Item
  onSave(md: Item): void
}

const Content: React.FC<Content> = ({ selectedMd, onSave }) => {
  const [currentValue, setCurrentValue] = React.useState<string>(selectedMd.text);
  const [preview, setPreview] = React.useState<boolean>(true);

  React.useEffect(() => {
    setCurrentValue(selectedMd.text);
    setPreview(true);
  }, [selectedMd]);

  return (
    <div>
      <button onClick={() => setPreview(!preview)}>
        {preview ? 'Edycja' : 'Podgląd'}
      </button>
      {preview ? (
        <div>
          {currentValue}
        </div>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault()
          onSave({
            ...selectedMd,
            text: currentValue,
            modified: new Date().getTime()
          })
        }}>
          <button type="submit">Zapisz</button>
          <textarea onChange={(e) => { setCurrentValue(e.target.value); }}>
            {currentValue}
          </textarea>
        </form>
      )}
    </div>
  );
};

export default Content;
