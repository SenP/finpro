import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { WatchlistService } from '../common/watchlist.service';
import { Watchlist } from '../common/watchlist.model';
import { QuoteService } from '../common/quote.service';

@Component({
    selector: 'fp-watchlists',
    templateUrl: 'app/watchlist/watchlists.component.html',
    styles: [`         
            
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
        this.watchlistService
            .saveWatchlist(this.editedItem)
            .then(res => {
                console.log(res);                
                if (res.status === "error") {
                    this.msg = res.msg;
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
    }

    deleteWatchlist(wlist) {
        this.msg = "Deleting...please wait."
        this.isDeleting = true;
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
                //reset watchlist selection if currently selected watchlist is the one being deleted
                if (this.selectedWatchlist === wlist) {
                    this.onChangeSelection(null);
                }                
            });
    }
}
