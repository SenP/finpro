// Modules
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WatchlistsComponent } from './watchlist/watchlists.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FPChartComponent } from './dashboard/fpchart.component';
import { TopstocksComponent } from './dashboard/topstocks.component';
// Directives
import { SignDirective } from './common/sign.directive';
import { FilterArrPipe } from './common/filterArr.pipe';
import { CHART_DIRECTIVES } from 'angular2-highcharts';
// Services
import { WatchlistService } from './common/watchlist.service';
import { QuoteService } from './common/quote.service';

@NgModule({

    imports: [HttpModule,
        JsonpModule,
        BrowserModule,
        FormsModule,
        TypeaheadModule],

    declarations: [AppComponent,
        NavbarComponent,
        WatchlistsComponent,
        WatchlistComponent,
        DashboardComponent,
        FPChartComponent,
        TopstocksComponent,
        CHART_DIRECTIVES,
        SignDirective,
        FilterArrPipe],

    providers: [WatchlistService,
        QuoteService,
        FilterArrPipe],

    bootstrap: [AppComponent]
})

export class AppModule { }