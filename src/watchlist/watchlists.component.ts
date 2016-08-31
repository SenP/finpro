import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { WatchlistService } from '../common/watchlist.service';
import { Watchlist } from '../common/watchlist.model';

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
    @Output() changeSelection = new EventEmitter();
    @ViewChild('editName') editName;
    
    selectedWatchlist: Watchlist;
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

    constructor(private watchlistService: WatchlistService) { }

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
                    this.actionDone();
                    this.onChangeSelection(res.data);
                }
            });
    }

    deleteWatchlist(wlist) {
        this.isDeleting = true;
        this.msg = "Deleting...please wait.";
        this.msgClass = this.msgClasses.info;
        this.watchlistService
            .deleteWatchlist(wlist)
            .then(res => {
                this.actionDone();
                //reset watchlist selection if currently selected watchlist is the one being deleted
                if (this.selectedWatchlist === wlist) {
                    this.onChangeSelection(null);
                }
            });
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
