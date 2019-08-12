import React from 'react'

export interface Item {
  id: number
  text: string
  created: number
  modified: number
}

export interface Menu {
  items: Item[]
  setSelectedMd(md: Item): void
}

const Menu: React.FC<Menu> = ({ items, setSelectedMd }) => (
  <div>
    {items.map((item) => (
      <div onClick={() => { setSelectedMd(item) }}>
        {item.text.substring(0, 20)}
      </div>
    ))}
  </div>
);

export default Menu
