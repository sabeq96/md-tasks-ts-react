import React from 'react';
import Login from './components/Login';
import Content from './components/Content';
import Menu from './components/Menu';

import { getDraft } from './utils/getDraft';

export interface Item {
  id: number
  text: string
  modified: number
}

interface DbConf {
  baseUrl: string,
  headers: Headers,
}

const dbConf: DbConf = {
  baseUrl: 'https://api.myjson.com/bins/',
  headers: new Headers({
    'content-type': "application/json; charset=utf-8",
  })
}

const getMdsFromDb = (binId: string): Promise<Item[]> => (
  fetch(dbConf.baseUrl + binId)
  .then((response) => ( response.json() ))
  .then((response) => ( response && response.mds ))
)

const setMdsToDb = (binId: string, mds: Item[] ): Promise<Item[]> => (
  fetch(dbConf.baseUrl + binId, {
      method: 'PUT',
      body: JSON.stringify({ mds }),
      headers: dbConf.headers,
  })
  .then((response) => ( response.json() ))
  .then((response) => ( response && response.mds ))
)

const App: React.FC = () => {
  const [binId, setBinId] = React.useState<string>('')
  const [selectedMd, setSelectedMd] = React.useState<Item>(getDraft())
  const [mds, setMds] = React.useState<Item[]>([])

  // Get mds after bin id change
  React.useEffect(() => {
    if (binId) {
      getMdsFromDb(binId).then((mds) => {
        setMds(mds || [])
        setSelectedMd(mds[0])
      })
    }
  }, [binId])

  // Get saved binId from chrome
  React.useEffect(() => {
    chrome.storage.sync.get('binId', (data) => {
      if (data.binId) {
        setBinId(data.binId)
      }
    })
  }, [])

  const saveBinId = (binId: string): void => {
    chrome.storage.sync.set({ binId }, () => {
      setBinId(binId)
    })
  }

  const saveMdsHandler = (value: Item) => {
    const index = mds.indexOf(mds.filter((md) => md.id === value.id)[0])
    const newMds = [...mds]
    if (index !== -1) { // modify exist
      newMds[index] = value
    } else { // add new
      newMds.push(value)
    }

    setMdsToDb(binId, newMds).then(setMds)
  }

  const deleteMd = (value: Item) => {
    const newMds = [...mds].filter((md) => ( md.id !== value.id ));

    setMdsToDb(binId, newMds).then(setMds)
  }

  return (
    <div className="App">
      <Login setBinId={saveBinId} binId={binId} />
      <Menu items={mds} setSelectedMd={setSelectedMd} deleteMd={deleteMd} />
      <Content selectedMd={selectedMd} onSave={saveMdsHandler} />
    </div>
  )
}

export default App;
