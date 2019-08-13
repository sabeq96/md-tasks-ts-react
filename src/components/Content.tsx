import React, { TextareaHTMLAttributes, FormEvent } from 'react';
import Markdown from 'markdown-it';
import { Item } from '../App';
import { insertTab } from '../utils/insertTab';
import { HtmlAttributes, ResizeProperty, BoxSizingProperty } from 'csstype';

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

  const handleSubmit = (e: MouseEvent | FormEvent) => {
    e.preventDefault();
    onSave({
      ...selectedMd,
      text: currentValue,
      modified: new Date().getTime(),
    });
  };

  return (
    <div style={css.wrapper}>
      <div style={css.buttonsWrapper}>
        <button onClick={() => setPreview(!preview)}>
          {preview ? 'Edycja' : 'Podgląd'}
        </button>
        <button onClick={handleSubmit}>Zapisz</button>
      </div>
      {preview ? (
        <div style={css.board} dangerouslySetInnerHTML={{__html: Md.render(currentValue)}}>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={css.form}>
          <textarea
            style={css.board}
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

const css = {
  wrapper: {
    flex: 1,
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  form: {
    height: '400px',
  },
  board: {
    boxSizing: 'border-box' as BoxSizingProperty,
    border: '1px solid #ccc',
    height: '400px',
    width: '100%',
    padding: '8px',
    resize: 'none' as ResizeProperty,
  }
}

export default Content;
