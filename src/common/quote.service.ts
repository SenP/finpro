import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Quote } from '../common/quote.model';
import { WatchlistItem } from './watchlist.model';

@Injectable()

export class QuoteService {

    private base_url = 'http://finance.google.com/finance/info';

    private quoteScheduler: Subscription;
    quotePublisher: Subject<any>;
    private quotesMap: Map<string, Quote>;

    tickers = [];

    constructor(private jsonp: Jsonp, private http: Http) {
        this.quotesMap = new Map();
        this.quotePublisher = new Subject();
    }

    // Initialize the scheduler, Return the quotes publisher subject to the subscriber
    init(refInterval) {

        this.quoteScheduler = Observable.timer(0, refInterval)
            .subscribe(
            () => this.refreshQuotes()
            );
        return this.quotePublisher;
    }

    // Method to get the timer
    getTimer() {
        return this.quotePublisher;
    }

    // Reset the scheduler to the given interval
    resetTimer(refInterval) {
        this.quoteScheduler.unsubscribe();
        this.quoteScheduler = Observable.timer(0, refInterval)
            .subscribe(
            () => this.refreshQuotes()
            );
    }

    // Add instrument to the quotes map
    register(stock, exchg) {
        if (!this.quotesMap.get(exchg + ':' + stock)) {
            this.quotesMap.set(exchg + ':' + stock, new Quote());
        }
    };

    // Remove instrument from the quotes map
    deregister(stock, exchg) {
        this.quotesMap.delete(exchg + ':' + stock);
    };

    // Clear the quotes map
    reset() {
        this.quotesMap.clear();
    };

    // Refresh the quotes map with latest quotes from API
    refreshQuotes() {
        if (this.quotesMap.size > 0) {
            let stockcodes = '';

            //create stock codes list
            this.quotesMap.forEach((value, key) => {
                stockcodes += key + ',';

            });
            let params = new URLSearchParams();

            params.set('client', 'ig');
            params.set('q', stockcodes);
            params.set('format', 'json');
            params.set('callback', 'JSONP_CALLBACK');

            this.jsonp
                .get(this.base_url, { search: params })
                .map(response => response.json())
                .subscribe(newquotes => {
                    this.updateQuotesMap(newquotes);
                    // Publish new quotes
                    this.quotePublisher.next(this.quotesMap);
                });
        }
    }

    // Update the quotes map with the new quote values from API (called from refreshQuotes method)
    updateQuotesMap(newquotes) {
        newquotes.forEach(newquote => {
            let quote = this.quotesMap.get(newquote.e + ':' + newquote.t);
            if (quote) {
                quote.lastPrice = parseFloat((newquote.l).replace(',', '')) * (1 + (Math.random() > 0.5 ? 1 : -1) * 0.1);
                quote.change = parseFloat((newquote.c).replace(',', '')) + (Math.random() - 0.5);
                quote.percentChange = parseFloat(newquote.cp) + (Math.random() - 0.5);
            }
        });
    };

    // Utility method to get list of tickers
    getTickers() {
        if (this.tickers.length === 0) {
            this.http
                .get("app/tickers-nasdaq.json")
                .map(response => response.json())
                .subscribe(tickers => {
                    this.tickers = tickers;
                });
        }
        return this.tickers;
    }
}

