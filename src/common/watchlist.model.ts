export class WatchlistItem {
    instrument: string;
    industry: string;
    unitsOwned: number;
    avgPrice: number;
    lastPrice: number;
    change: number;
    percentChange: number;

    get marketValue(): number {
        if (this.unitsOwned > 0 && this.lastPrice > 0) {            
            return this.unitsOwned * this.lastPrice;
        }
        else
            return 0;
    }

    get dayChange(): number {
        if (this.unitsOwned && this.change) {            
            return this.unitsOwned * this.change;
        }
        else
            return 0;
    }

    get netPnL(): number {
        if (this.unitsOwned && this.avgPrice && this.lastPrice) {            
            return this.unitsOwned * (this.lastPrice - this.avgPrice);
        }
        else
            return 0;
    }
}

export class Watchlist {
    id: number;
    name: string;
    description: string;
    owner: string;
    createdOn: Date = new Date();
    instruments: WatchlistItem[];
    
    get totalMarketValue(): number {
        return this.instruments.reduce((totalV,wl) => totalV + wl.marketValue, 0);        
    }

    get totalDayChange(): number {
        return this.instruments.reduce((totalV,wl) => totalV + wl.dayChange, 0);        
    }

    get totalPnL(): number {
        return this.instruments.reduce((totalV,wl) => totalV + wl.netPnL, 0);        
    }

}