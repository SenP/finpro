import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Quote } from '../common/quote.model';
import { WatchlistItem } from './watchlist.model';

@Injectable()

export class QuoteService {

    private base_url = 'https://query.yahooapis.com/v1/public/yql';
    private quoteScheduler: Observable<number>;
    quotePublisher: Subject<any>;
    private quotesMap: Map<string, Quote>;

    constructor(private jsonp: Jsonp, private http: Http) {
        this.quotesMap = new Map<string, Quote>();
        this.quotePublisher = new Subject();
        this.quoteScheduler = Observable.timer(0, 3000);
        this.quoteScheduler
            .subscribe(
            () => this.refreshQuotes()
            );
    }

    // Return the quotes publisher subject to the subscriber
    init() {
        return this.quotePublisher;
    }

    // Add instrument to the quotes map
    register(stock) {
        if (!this.quotesMap.get(stock)) {
            this.quotesMap.set(stock, new Quote());
        }
    };

    // Remove instrument from the quotes map
    deregister(stock) {
        this.quotesMap.delete(stock);
    };

    // Clear the quotes map
    reset() {
        this.quotesMap.clear();
    };

    // Refresh the quotes map with latest quotes from API
    refreshQuotes() {
        if (this.quotesMap.size > 0) {
            var stockcodes = '';

            this.quotesMap.forEach((value, key) => {
                stockcodes += "'" + key + "',";
            });
            stockcodes = stockcodes.slice(0, stockcodes.length - 1);

            let query = `select * from yahoo.finance.quotes where symbol in (${stockcodes})`;
            const env = 'http://datatables.org/alltables.env';

            let params = new URLSearchParams();
            params.set('q', query);
            params.set('format', 'json');
            params.set('diagnostics', 'true');
            params.set('env', env);
            params.set('callback', 'JSONP_CALLBACK');

            this.jsonp
                .get(this.base_url, { search: params })
                .map(response => response.json())
                .subscribe(response => {
                    let newquotes = response.query.count > 1 ? response.query.results.quote : [response.query.results.quote];
                    this.updateQuotes(newquotes);
                    // Publish new quotes
                    this.quotePublisher.next(this.quotesMap);
                });
        }
    }

    // Update the quotes map with the new quote values from API (called from refreshQuotes method)
    updateQuotes(newquotes) {
        newquotes.forEach(newquote => {
            let stock = this.quotesMap.get(newquote.symbol);
            if (stock) {
                stock.lastPrice = parseFloat(newquote.LastTradePriceOnly); // * (Math.random() + 0.5);
                stock.change = parseFloat(newquote.Change); // * (Math.random() - 0.5);
                stock.percentChange = parseFloat(newquote.ChangeinPercent); // * (Math.random() - 0.5);
            }
        });
    };


}

