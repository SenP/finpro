import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { Watchlist, WatchlistItem } from './common/watchlist.model';
import { WatchlistService } from './common/watchlist.service';
import { QuoteService } from './common/quote.service';

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
    selectedWatchlist;
    qsub: Subscription;

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

        this.qsub = this.quoteService
            .init(15000)
            .subscribe(qmap => {
                this.watchlistService.updateQuotes(qmap);
            });
    }

    onSelect(wl) {
        this.selectedWatchlist = wl;
    }
}
