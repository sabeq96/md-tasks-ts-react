import React from 'react';
import Login from './components/Login';
import Content from './components/Content';
import Menu, { Item } from './components/Menu';

interface dbConf {
  baseUrl: string,
  headers: Headers,
}

const dbConf: dbConf = {
  baseUrl: 'https://api.myjson.com/bins/',
  headers: new Headers({
    'content-type': "application/json; charset=utf-8",
  })
}

const db = {
  mds: [{
    id: 1,
    text: "Sample markdown file",
    created: 1565548994814,
    modified: 1565548994814,
  }, {
    id: 2,
    text: "Sample markdown file 2",
    created: 1565548994814,
    modified: 1565548994814,
  }]
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
  const [selectedMd, setSelectedMd] = React.useState<Item>(db.mds[0])
  const [mds, setMds] = React.useState<Item[]>([])

  React.useEffect(() => {
    if (binId) {
      getMdsFromDb(binId).then((mds) => {
        setMds(mds || [])
        setSelectedMd(mds[0])
      })
    }
  }, [binId])

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
    newMds[index] = value

    setMdsToDb(binId, newMds).then(setMds)
  }

  return (
    <div className="App">
      <Login setBinId={saveBinId} binId={binId} />
      <Menu items={mds} setSelectedMd={setSelectedMd} />
      <Content selectedMd={selectedMd} onSave={saveMdsHandler} />
    </div>
  )
}

export default App;
