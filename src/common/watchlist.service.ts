import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Watchlist, WatchlistItem } from './watchlist.model';

@Injectable()

export class WatchlistService {

  private watchlists: Array<Watchlist> = [];

  constructor() {
    //1st
    this.watchlists.push(Object.assign(new Watchlist(), {
      id: 1,
      name: 'tech',
      description: "technology stocks",
      owner: 'sk',
      instruments: []
    }));

    this.watchlists[0].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'GOOG',
      industry: 'tech',
      unitsOwned: 100,
      avgPrice: 50
    }));

    //2nd
    this.watchlists.push(Object.assign(new Watchlist(), {
      id: 2,
      name: 'retail',
      description: "retail stocks",
      owner: 'sk',
      instruments: []
    }));
    this.watchlists[1].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'ESU16.CME',
      industry: 'retail',
      unitsOwned: 200,
      avgPrice: 50
    }));

    //3rd
    this.watchlists.push(Object.assign(new Watchlist(), {
      id: 3,
      name: 'london',
      description: "london stocks",
      owner: 'sk',
      instruments: []
    }));
    this.watchlists[2].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'AZN.L',
      industry: 'pharma',
      unitsOwned: 10,
      avgPrice: 5000
    }));
    this.watchlists[2].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'AV.L',
      industry: 'insurance',
      unitsOwned: 100,
      avgPrice: 400
    }));

  }

  getWatchlists() {
    return this.watchlists;
  }

  //Save a watchlist, simulate http post delay  
  saveWatchlist(wl) {
    let p = new Promise(resolve => setTimeout(() => {
      resolve(this.doSaveWatchlist(wl));
    }, 2000));

    return p;
  }

  //utility: save the edited/new watchlist
  doSaveWatchlist(wlist: Watchlist): any {
    let i = this.watchlists.findIndex(wl => wl.id === wlist.id);
    let data = null;

    let dupName = this.watchlists.findIndex(wl => (wl.id !== wlist.id) && (wl.name === wlist.name));
    if (dupName !== -1) { //duplicate name found
      return { status: "error", msg: "duplicate name" };
    }

    if (i !== -1) { //Edit watchlist
      Object.assign(this.watchlists[i], wlist);
      data = this.watchlists[i];
    }
    else { //Create New watchlist
      wlist.id = this.watchlists.reduce((prev, curr) => prev.id > curr.id ? prev : curr, { id: 0 }).id + 1;
      wlist.instruments = [];
      this.watchlists.push(Object.assign(new Watchlist(), wlist));
      data = this.watchlists[this.watchlists.length - 1];
    }
    return { status: "success", data: data };
  }

  //Save a watchlist item, simulate http post delay  
  saveWatchlistItem(wlist, wlItem) {
    let p = new Promise(resolve => setTimeout(() => {
      resolve(this.doSaveWatchlistItem(wlist, wlItem));
    }, 2000));

    return p;
  }

  //utility: save the edited/new watchlist item
  doSaveWatchlistItem(wlist, wlItem) {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    console.log(wl);
    let i = wl.instruments.findIndex(ins => ins.instrument === wlItem.instrument);
    let data = null;

    if (i !== -1) {
      Object.assign(wl.instruments[i], wlItem);
      data = wl.instruments[i];
    }
    else {
      wl.instruments.push(Object.assign(new WatchlistItem(), wlItem));
      data = wl.instruments[wl.instruments.length - 1];
    }

    return { status: "success", data: data };
  }

  deleteWatchlist(wlist) {
    let p = new Promise(resolve => setTimeout(() => {
      resolve(this.doRemoveWatchlist(wlist));
    }, 2000));

    return p;
  }
  //remove the selected watchlist
  doRemoveWatchlist(wlist) {
    let i = this.watchlists.findIndex(w => w.id === wlist.id);
    let ret = null;

    if (i !== -1) {
      this.watchlists.splice(i, 1);
    }

    return { status: "success", data: wlist };
  }

  deleteWatchlistItem(wlist, wlItem) {
    let p = new Promise(resolve => setTimeout(() => {
      resolve(this.doRemoveWatchlistItem(wlist, wlItem));
    }, 2000));

    return p;
  }
  //remove the selected watchlist item
  doRemoveWatchlistItem(wlist, wlItem) {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wl.instruments.findIndex(ins => ins.instrument === wlItem.instrument);
    let ret = null;

    if (i !== -1) {
      wl.instruments.splice(i, 1);
    }

    return { status: "success", data: wlItem };
  }
}