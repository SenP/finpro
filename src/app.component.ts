import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { Watchlist, WatchlistItem } from './common/watchlist.model';
import { WatchlistService } from './common/watchlist.service';
import { QuoteService } from './common/quote.service';
import { Quote } from './common/quote.model';

@Component({
    selector: 'finpro-app',
    templateUrl: 'app/app.component.html',
    styles: [`
                .posLabel {
                    color: green;
                }
                .negLabel {
                    color: red;
                }
        `]
})

export class AppComponent implements OnInit {

    watchlists: Watchlist[] = [];
    selectedWatchlist: Watchlist;
    refInterval: number = 60;
    refFreqs: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService
    ) { }

    ngOnInit() {
        this.watchlists = this.watchlistService.getWatchlists();

        //register all instruments with quote service
        this.watchlists.forEach(wl => {
            wl.instruments.forEach(stock => {
                this.quoteService.register(stock.instrument, stock.exchange);
            });
        });

        this.quoteService
            .init(this.refInterval * 1000)
            .subscribe(qmap => {
                this.watchlistService.updateQuotes(qmap);
            });
    }

    onSelect(wl) {
        this.selectedWatchlist = wl;
    }

    onChangeTimer() {
        this.quoteService.resetTimer(this.refInterval * 1000);
    }
}
