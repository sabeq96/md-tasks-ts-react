import _get from 'lodash/get';

import { Item } from '../App';

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

export interface IDbManager {
  setMd(md: Item): Item[]
  deleteMd(mds: Item): Item[]
  reinitialize(): Promise<Item[]>
  binId: string
  mds: Item[]
}

export class DbManager implements IDbManager {
  private _binId: string
  private _mds: Item[] = []

  get mds(): Item[] { return this._mds }
  get binId(): string { return this._binId }

  constructor(binId: string = '') {
    this._binId = binId

    if (this._binId) {
      chrome.storage.sync.set({ binId })
      this.getMdsFromDb().then((mds) => this._mds = mds);
    }
  }

  public reinitialize(): Promise<Item[]> {
    return this.getMdsFromDb().then((mds) => this._mds = mds);
  }

  private getMdsFromDb(): Promise<Item[]> {

    return fetch(dbConf.baseUrl + this._binId)
      .then((response) => ( response.json() ))
      .then((response) => {
        const mds = _get(response, 'mds', []);
        this._mds = mds;
        return mds;
      })
  }
  
  private setMdsToDb(mds: Item[]) {
    return fetch(dbConf.baseUrl + this._binId, {
        method: 'PUT',
        body: JSON.stringify({ mds }),
        headers: dbConf.headers,
      })
  }

  public setMd(value: Item): Item[] {
    const index = this._mds.indexOf(this._mds.filter((md) => md.id === value.id)[0])
    const newMds = [...this._mds]
    if (index !== -1) { // modify exist
      newMds[index] = value
    } else { // add new
      newMds.push(value)
    }

    this._mds = newMds;
    this.setMdsToDb(newMds)

    return this._mds;
  }

  public deleteMd(value: Item): Item[] {
    const newMds = [...this._mds].filter((md) => ( md.id !== value.id ));
    console.log(newMds)

    this._mds = newMds;
    this.setMdsToDb(newMds)

    return this._mds;
  }
}
