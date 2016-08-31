import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { WatchlistService } from '../common/watchlist.service';
import { Watchlist } from '../common/watchlist.model';
import { QuoteService } from '../common/quote.service';

@Component({
    selector: 'fp-watchlists',
    templateUrl: 'app/watchlist/watchlists.component.html',
    styles: [`      
            .msg {
                    font-style: italic;
                    font-size: 1.25em;
                }   
            
        `]
})

export class WatchlistsComponent {

    @Input() watchlists: Watchlist[] = [];
    selectedWatchlist: Watchlist;
    @Output() changeSelection = new EventEmitter();
    editedItem: Watchlist;
    isEditing: boolean = false;
    isAdding: boolean = false;
    isDeleting: boolean = false;
    msg: string = null;
    msgClass: string;
    msgClasses = {
        error: "msg text-danger",
        info: "msg text-info"
    }

    @ViewChild('editName') editName;

    constructor(private watchlistService: WatchlistService,
        private quoteService: QuoteService) { }

    onChangeSelection(wl) {
        this.selectedWatchlist = wl;
        this.changeSelection.emit(wl);
    }

    addWatchlist() {
        this.editedItem = new Watchlist();
        this.isAdding = true;
        setTimeout(() => this.editName.nativeElement.focus(), 100);
    }

    editWatchlist(wl) {
        this.editedItem = Object.assign(new Watchlist(), wl);
        this.isEditing = true;
        setTimeout(() => this.editName.nativeElement.focus(), 100);
    }

    saveWatchlist() {
        this.msg = "Saving...please wait."
        this.msgClass = this.msgClasses.info;
        this.watchlistService
            .saveWatchlist(this.editedItem)
            .then(res => {
                if (res.status === "error") {
                    this.msg = res.msg;
                    this.msgClass = this.msgClasses.error;
                }
                else {
                    this.cancelEdit();
                    this.onChangeSelection(res.data);
                }
            });
    }

    cancelEdit() {
        this.editedItem = null;
        this.isEditing = false;
        this.isAdding = false;
        this.msg = "";
        this.msgClass = "";
    }

    deleteWatchlist(wlist) {
        this.isDeleting = true;
        this.msg = "Deleting...please wait.";
        this.msgClass = this.msgClasses.info;
        this.watchlistService
            .deleteWatchlist(wlist)
            .then(res => {
                //deregister instrument from quote service
                if (wlist.instruments.length > 0) {
                    wlist.instruments.forEach(ins => {
                        this.quoteService.deregister(ins.instrument);
                    })
                }
                this.isDeleting = false;
                this.msg = "";
                this.msgClass = "";
                //reset watchlist selection if currently selected watchlist is the one being deleted
                if (this.selectedWatchlist === wlist) {
                    this.onChangeSelection(null);
                }
            });
    }
}
