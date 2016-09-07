import { Observable, Subscription, Subject } from 'rxjs/Rx';
import { Component, OnChanges, Input } from '@angular/core';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { WatchlistService } from '../common/watchlist.service';
import { FilterArrPipe } from '../common/filterArr.pipe';

@Component({
    selector: 'fp-topstocks',
    templateUrl: 'app/dashboard/topstocks.component.html',
    styles: [`
                .number-field {
                    text-align: center
                }                
                .topTable {
                    background: white
                }                
        `]
})

export class TopstocksComponent implements OnChanges {

    @Input('stocks') allStocks: WatchlistItem[];
    @Input() title;
    @Input() orderBy;
    @Input() numRequired;
    @Input() sortOrder;

    topStocks: WatchlistItem[] = [];

    constructor(private watchlistService: WatchlistService,
        private filterList: FilterArrPipe) { }

    ngOnInit() {
        this.topStocks = this.filterList.transform(this.allStocks, this.orderBy, this.numRequired, this.sortOrder);
    }

    ngOnChanges() {
        this.topStocks = this.filterList.transform(this.allStocks, this.orderBy, this.numRequired, this.sortOrder);
    }
    
}
