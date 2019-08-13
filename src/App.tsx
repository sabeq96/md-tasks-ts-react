import React from 'react';
import Login from './components/Login';
import Content from './components/Content';
import Menu from './components/Menu';

import { DbManager, IDbManager } from './utils/DbManager';
import { getDraft } from './utils/getDraft';

export interface Item {
  id: number
  text: string
  modified: number
  isDraft: boolean
}

const App: React.FC = () => {
  const [dbManager, setDbManager] = React.useState<IDbManager>(new DbManager())
  const [selectedMd, setSelectedMd] = React.useState<Item>(getDraft())
  const [mds, setMds] = React.useState<Item[]>([])

  React.useEffect(() => {
    if (!dbManager.binId) {
      chrome.storage.sync.get('binId', (data) => {
        const newDbManager = new DbManager(data.binId);
        newDbManager.reinitialize().then((mds) => {
          setDbManager(newDbManager)
          setMds(mds)
          setSelectedMd(mds[0] || getDraft())
        })
      })
    }
  }, [])

  const saveBinId = (binId: string): void => {
    setDbManager(new DbManager(binId))
  }

  const saveMdsHandler = (value: Item) => {
    const newMds = dbManager.setMd(value)
    setMds(newMds);
  }

  const deleteMd = (value: Item) => {
    const newMds = dbManager.deleteMd(value)
    setMds(newMds);
  }

  return (
    <div className="App">
      <Login setBinId={saveBinId} binId={dbManager.binId} />
      <Menu items={mds} setSelectedMd={setSelectedMd} deleteMd={deleteMd} />
      <Content selectedMd={selectedMd} onSave={saveMdsHandler} />
    </div>
  )
}

export default App;
