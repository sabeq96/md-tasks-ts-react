import React from 'react'
import { Item } from '../App';
import { getDraft } from '../utils/getDraft';
import { OverflowYProperty } from 'csstype';

interface Menu {
  items: Item[]
  setSelectedMd(md: Item): void
  deleteMd(md: Item): void
}

const Menu: React.FC<Menu> = ({ items, setSelectedMd, deleteMd }) => (
  <div style={css.wrapper}>
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
  wrapper: {
    margin: '8px 0',
    overflowY: 'auto' as OverflowYProperty,
    height: '100%',
  },
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
