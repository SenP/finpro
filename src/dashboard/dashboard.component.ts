import { Component, Input, OnInit } from '@angular/core';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { WatchlistService } from '../common/watchlist.service';
import { QuoteService } from '../common/quote.service';

@Component({
  selector: 'fp-dashboard',  
  template:   `
                   <div class="jumbotron">
			            <p> Dashboard View </p>				        
		            </div>
                `,
styles: [`
           
        `]
})

export class DashboardComponent implements OnInit {

    @Input() watchlists: Watchlist[] = [];

    constructor (private watchlistService: WatchlistService,
                 private quoteService: QuoteService
                ) {

    }

    ngOnInit() {}   
      
}
