import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
//Highcharts directives
import { CHART_DIRECTIVES } from 'angular2-highcharts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WatchlistsComponent } from './watchlist/watchlists.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WatchlistService } from './common/watchlist.service';
import { QuoteService } from './common/quote.service';
import { SignDirective } from './common/sign.directive';
import { FilterArrPipe } from './common/filterArr.pipe';
//chart component
import { FPChartComponent } from './dashboard/fpchart.component';
//topstocks component
import { TopstocksComponent } from './dashboard/topstocks.component';
//NG2 Bootstrap module
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [HttpModule, JsonpModule, BrowserModule, FormsModule, TypeaheadModule],
    declarations: [AppComponent, NavbarComponent, CHART_DIRECTIVES, SignDirective, FilterArrPipe,
        WatchlistsComponent, WatchlistComponent, DashboardComponent, FPChartComponent, TopstocksComponent],
    providers: [WatchlistService, QuoteService, FilterArrPipe],
    bootstrap: [AppComponent]
})
export class AppModule {

}