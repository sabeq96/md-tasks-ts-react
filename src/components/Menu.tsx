import React from 'react'
import { Item } from '../App';
import { getDraft } from '../utils/getDraft';

interface Menu {
  items: Item[]
  setSelectedMd(md: Item): void
}

const Menu: React.FC<Menu> = ({ items, setSelectedMd }) => (
  <div>
    {items.map((item) => (
      <div style={{ display: 'flex' }}>
        <div onClick={() => { setSelectedMd(item) }}>
          {item.text.substring(0, 15)}
        </div>
        <div style={{ marginLeft: 10 }} onClick={() => { }}>
          [x]
        </div>
      </div>
    ))}
    <div onClick={() => { setSelectedMd(getDraft()) }}>
      New Markdown
    </div>
  </div>
);

export default Menu
