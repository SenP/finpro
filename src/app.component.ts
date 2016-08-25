import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { Watchlist, WatchlistItem } from './common/watchlist.model';
import { WatchlistService } from './common/watchlist.service';
import { QuoteService } from './common/quote.service';

@Component({
  selector: 'finpro-app',  
  template:   `
                   <nav-bar></nav-bar>
                   <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3 side-bar">
                                <div>
                                    <button class="btn btn-default center-block" (click)="wl.onChangeSelection(null)">
                                        View Dashboard
                                    </button>
                                </div>
                                <hr />
                                <fp-watchlists #wl [watchlists]="watchlists" (changeSelection)="onSelect($event)"></fp-watchlists>
                            </div>
                            <div *ngIf="selectedWatchlist" class="col-md-9 main-area">
                                <fp-watchlist [watchlist]="selectedWatchlist"></fp-watchlist>
                            </div>
                            <div *ngIf="!selectedWatchlist" class="col-md-9 main-area">
                                <fp-dashboard [watchlists]="watchlists"></fp-dashboard>
                            </div>
                        </div>
                    </div>
                `,
styles: [`
           
        `]
})

export class AppComponent implements OnInit {

    watchlists: Watchlist[] = [];
    selectedWatchlist;

    constructor (private watchlistService: WatchlistService,
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
