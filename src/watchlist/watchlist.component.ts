import { Observable, Subscription, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Component, OnChanges, OnDestroy, Input, ViewChild } from '@angular/core';
import { WatchlistService } from '../common/watchlist.service';
import { QuoteService } from '../common/quote.service';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';
import { Quote } from '../common/quote.model';

@Component({
    selector: 'fp-watchlist',
    templateUrl: 'app/watchlist/watchlist.component.html',
    styles: [`           
                .number-field {
                    text-align: right
                }

                .panel-heading {
                    font-size: 2em;
                }
            `]
})

export class WatchlistComponent implements OnChanges, OnDestroy {

    @Input() watchlist: Watchlist = null;
    qsub: Subscription;
    editedItem: WatchlistItem;
    isEditing: boolean = false;
    isAdding: boolean = false;
    isDeleting: boolean = false;
    msg: string = null;

    @ViewChild('editCode') editCode;
    @ViewChild('editUnits') editUnits;

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService
    ) {

        this.qsub = this.quoteService
            .init()
            .subscribe(qmap => {
                this.watchlistService.updateQuotes(qmap, this.watchlist);
            });
    }

    ngOnChanges() {
        this.isEditing = false;
        this.isAdding = false;
    }

    ngOnDestroy() {
        this.qsub.unsubscribe();
    }

    addWatchlistItem() {
        this.editedItem = new WatchlistItem();
        this.isAdding = true;
        setTimeout(() => this.editCode.nativeElement.focus(), 100);
    }

    editWatchlistItem(stock) {
        this.editedItem = Object.assign(new WatchlistItem(), stock);
        this.isEditing = true;
        setTimeout(() => this.editUnits.nativeElement.focus(), 100);
    }

    saveWatchlistItem() {
        this.msg = "Saving...please wait."
        this.watchlistService
            .saveWatchlistItem(this.watchlist, this.editedItem)
            .then(res => {
                this.quoteService.register(this.editedItem.instrument);
                this.cancelEdit();
            });
    }

    cancelEdit() {
        this.editedItem = null;
        this.isEditing = false;
        this.isAdding = false;
        this.msg = "";
    }

    deleteWatchlistItem(stock) {
        this.isDeleting = true;
        this.watchlistService
            .deleteWatchlistItem(this.watchlist, stock)
            .then(res => {
                this.quoteService.deregister(stock.instrument);
                this.isDeleting = false;
            });
    }
    //utility method for getting font color based on positive/negative change
    getChangeColor(val: number) {
        if (!val || isNaN(val) || val === 0) return 'black';
        return (val > 0 ? 'green' : 'red');
    }
}
