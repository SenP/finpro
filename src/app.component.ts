import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { Watchlist, WatchlistItem } from './common/watchlist.model';
import { WatchlistService } from './common/watchlist.service';
import { QuoteService } from './common/quote.service';

@Component({
    selector: 'finpro-app',
    templateUrl: 'app/app.component.html',
    styles: [`
           
        `]
})

export class AppComponent implements OnInit {

    watchlists: Watchlist[] = [];
    selectedWatchlist;

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService
    ) {

    }

    ngOnInit() {
        this.watchlists = this.watchlistService.getWatchlists();
    }

    onSelect(wl) {
        this.selectedWatchlist = wl;
    }
}
