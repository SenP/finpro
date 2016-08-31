import { Component, OnChanges, Input, ViewChild } from '@angular/core';
import { WatchlistService } from '../common/watchlist.service';
import { Watchlist, WatchlistItem } from '../common/watchlist.model';

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
                .msg {
                    font-style: italic;
                    font-size: 1.2em;
                }
            `]
})

export class WatchlistComponent implements OnChanges {

    @Input() watchlist: Watchlist = null;

    editedItem: WatchlistItem;
    isEditing: boolean = false;
    isAdding: boolean = false;
    isDeleting: boolean = false;

    msg: string = "";
    msgClass: string;
    msgClasses = {
        error: " msg text-center text-danger",
        info: "msg text-center text-info"
    }

    @ViewChild('editCode') editCode;
    @ViewChild('editUnits') editUnits;

    constructor(private watchlistService: WatchlistService) { }

    ngOnChanges() {
        this.isEditing = false;
        this.isAdding = false;
        this.isDeleting = false;
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
        let valid = this.validateWatchlistItem();
        if (valid.status === "error") {
            this.msg = valid.msg;
            this.msgClass = this.msgClasses.error;
        }
        else {
            this.msg = "Saving...please wait.";
            this.msgClass = this.msgClasses.info;
            this.watchlistService
                .saveWatchlistItem(this.watchlist, this.editedItem)
                .then(res => {
                    this.actionDone();
                });
        }
    }    

    //validate edited watchlist item
    validateWatchlistItem() {
        let wli = this.editedItem;
        let result = { status: "success", msg: "success" };

        //validate instrument
        if (wli.instrument.length < 1 || wli.instrument.length > 10) {
            result.status = "error";
            result.msg = "Stock code should be between 3 to 10 characters";
            return result;
        }
        if (this.isAdding && this.watchlist.instruments.findIndex(w => w.instrument === wli.instrument) !== -1) {
            result.status = "error";
            result.msg = "'" + wli.instrument + "' already exists in this watchlist";
            return result;
        }
        //validate quantity
        if (isNaN(wli.unitsOwned)) {
            result.status = "error";
            result.msg = "'Units owned' should be a number between 1 to 99,999,999,999";
            return result;
        }
        if (wli.unitsOwned < 1 || wli.unitsOwned > 99999999999) {
            result.status = "error";
            result.msg = "'Units owned' should be between 1 to 99,999,999,999";
            return result;
        }
        //validate avg price
        if (isNaN(wli.avgPrice)) {
            result.status = "error";
            result.msg = "'Avg buy price' should be a number";
            return result;
        }
        if (wli.avgPrice <= 0 || wli.avgPrice >= 10000) {
            result.status = "error";
            result.msg = "'Avg buy price' should be more than 0 and less than 10000";
            return result;
        }
        return result;
    }

    deleteWatchlistItem(stock) {
        if (confirm('Delete ' + stock.instrument + ' from watchlist?')) {
            this.isDeleting = true;
            this.msg = "Deleting...please wait.";
            this.msgClass = this.msgClasses.info;

            this.watchlistService
                .deleteWatchlistItem(this.watchlist, stock)
                .then(res => {
                    this.actionDone();
                });
        }
    }

    actionDone() {
        this.editedItem = null;
        this.isEditing = false;
        this.isAdding = false;
        this.isDeleting = false;
        this.msg = "";
        this.msgClass = "";
    }

}
