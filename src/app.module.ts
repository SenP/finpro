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

//chart component
import { FPChartComponent } from './dashboard/fpchart.component';

@NgModule({
    imports: [HttpModule, JsonpModule, BrowserModule, FormsModule],
    declarations: [AppComponent, NavbarComponent, CHART_DIRECTIVES, SignDirective,
                    WatchlistsComponent, WatchlistComponent, DashboardComponent, FPChartComponent],
    providers: [WatchlistService, QuoteService],
    bootstrap: [AppComponent]
})
export class AppModule {

}