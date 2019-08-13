import React from 'react'
import { Item } from '../App';
import { getDraft } from '../utils/getDraft';

interface Menu {
  items: Item[]
  setSelectedMd(md: Item): void
  deleteMd(md: Item): void
}

const Menu: React.FC<Menu> = ({ items, setSelectedMd, deleteMd }) => (
  <div>
    {items.map((item) => (
      <div style={css.itemWrapper}>
        <div style={css.title} onClick={() => { setSelectedMd(item) }}>
          {item.text ? (
            item.text.substring(0, 15)
          ): (
            String('-Pusty-')
          )}
        </div>
        <div style={css.delete} onClick={() => { deleteMd(item) }}>
          [x]
        </div>
      </div>
    ))}
    <div onClick={() => { setSelectedMd(getDraft()) }}>
      New Markdown
    </div>
  </div>
);

const css = {
  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    cursor: 'pointer',
  },
  delete: {
    marginLeft: 10,
    cursor: 'pointer',
  }
}

export default Menu
