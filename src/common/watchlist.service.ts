import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Watchlist, WatchlistItem } from './watchlist.model';
import { Quote } from '../common/quote.model';
import { QuoteService } from '../common/quote.service';

@Injectable()

export class WatchlistService {

  private watchlists: Array<Watchlist> = [];

  constructor(private quoteService: QuoteService) {
    //1st
    this.watchlists.push(Object.assign(new Watchlist(), {
      id: 1,
      name: 'US',
      description: "technology stocks",
      owner: 'sk',
      instruments: []
    }));

    this.watchlists[0].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'GOOG',
      exchange: 'NASDAQ',
      unitsOwned: 100,
      avgPrice: 50
    }));

    //2nd
    this.watchlists.push(Object.assign(new Watchlist(), {
      id: 2,
      name: 'UK',
      description: "UK stocks",
      owner: 'sk',
      instruments: []
    }));
    this.watchlists[1].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'AZN',
      exchange: 'LON',
      unitsOwned: 20,
      avgPrice: 5000
    }));

    //3rd
    this.watchlists.push(Object.assign(new Watchlist(), {
      id: 3,
      name: 'India',
      description: "Indian stocks",
      owner: 'sk',
      instruments: []
    }));
    this.watchlists[2].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'INFY',
      exchange: 'NSE',
      unitsOwned: 100,
      avgPrice: 1000
    }));
    this.watchlists[2].instruments.push(Object.assign(new WatchlistItem(), {
      instrument: 'RELIANCE',
      exchange: 'NSE',
      unitsOwned: 100,
      avgPrice: 900
    }));

  }

  //Get the watchlists (modify later to take userid param)
  getWatchlists() {
    //localStorage.clear();
    //localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
    this.watchlists = [];
    let watchlistsRaw: Object[] = JSON.parse(localStorage.getItem("fpwatchlists"));
    if (watchlistsRaw) {
      watchlistsRaw.forEach(wlraw => {
        let newWL: Watchlist = Object.assign(new Watchlist(), wlraw);
        newWL.instruments = []; //reset so we can create and assign watchlist items      
        wlraw.instruments.forEach(ins => {
          let newWLItem = Object.assign(new WatchlistItem(), ins);
          newWL.instruments.push(newWLItem);
        });
        this.watchlists.push(newWL);
      });
    }
    return this.watchlists;
  }

  //Update watchlist instruments with given quotes 
  updateQuotes(qmap: Map<string, Quote>) {
    this.watchlists.forEach(wl => {
      wl.instruments.forEach(stock => {
        let quote = qmap.get(stock.exchange + ':' + stock.instrument);
        if (quote) {
          stock.lastPrice = quote.lastPrice || 0;
          stock.change = quote.change || 0;
          stock.percentChange = quote.percentChange || 0;
        }
      });
    });
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
      return { status: "error", msg: "Duplicate watchlist name" };
    }

    if (i === -1 && this.watchlists.length === 10) { //watchlist limit reached
      return { status: "error", msg: "Can not create more than 10 watchlists" };
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
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
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
  doSaveWatchlistItem(wlist, wlItem): any {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wl.instruments.findIndex(ins => ins.instrument === wlItem.instrument);
    let data = null;

    if (i === -1 && wl.instruments.length === 30) { //stocks limit reached
      return { status: "error", msg: "Can not have more than 30 stocks in a watchlist" };
    }

    if (i !== -1) { //edit
      Object.assign(wl.instruments[i], wlItem);
      data = wl.instruments[i];
    }
    else { //create
      wl.instruments.push(Object.assign(new WatchlistItem(), wlItem));
      this.quoteService.register(wlItem.instrument, wlItem.exchange);
      data = wl.instruments[wl.instruments.length - 1];
    }
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
    return { status: "success", data: data };
  }

  //simulate http delete of watchlist
  deleteWatchlist(wlist: Watchlist) {
    let p = new Promise(resolve => setTimeout(() => {
      resolve(this.doRemoveWatchlist(wlist));
    }, 2000));

    return p;
  }
  //remove the selected watchlist
  doRemoveWatchlist(wlist: Watchlist) {
    let i = this.watchlists.findIndex(w => w.id === wlist.id);
    let ret = null;

    if (i !== -1) {
      this.watchlists.splice(i, 1);
      //deregister instrument from quote service
      if (wlist.instruments.length > 0) {
        wlist.instruments.forEach(ins => {
          this.quoteService.deregister(ins.instrument, ins.exchange);
        })
      }
    }
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
    return { status: "success", data: wlist };
  }

  deleteWatchlistItem(wlist: Watchlist, wlItem: WatchlistItem) {
    let p = new Promise(resolve => setTimeout(() => {
      resolve(this.doRemoveWatchlistItem(wlist, wlItem));
    }, 2000));

    return p;
  }
  //remove the selected watchlist item
  doRemoveWatchlistItem(wlist: Watchlist, wlItem: WatchlistItem) {
    let wl = this.watchlists[this.watchlists.findIndex(w => w.id === wlist.id)];
    let i = wl.instruments.findIndex(ins => ins.instrument === wlItem.instrument);
    let ret = null;

    if (i !== -1) {
      wl.instruments.splice(i, 1);
      this.quoteService.deregister(wlItem.instrument, wlItem.exchange);
    }
    localStorage.setItem("fpwatchlists", JSON.stringify(this.watchlists));
    return { status: "success", data: wlItem };
  }
}