import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { WordpressService } from './wordpress.service';
import { PricesService } from './prices.service';
import { PricesComponent } from './prices/prices.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { BlogComponent } from './blog/blog.component';
import { EditPricesComponent } from './edit-prices/edit-prices.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { SidebarComponent } from './blog/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { PriceAnalysisComponent } from './price-analysis/price-analysis.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import * as firebase from 'firebase';

const appRoutes: Routes = [
    { path: '', component: PricesComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: EditPricesComponent },
    { path: 'edit-stocks', component: EditStockComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'blog/:id', component: BlogSingleComponent },
];
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        PricesComponent,
        BlogComponent,
        SidebarComponent,
        EditPricesComponent,
        AboutComponent,
        ContactComponent,
        LoginComponent,
        BlogSingleComponent,
        DashboardComponent,
        EditStockComponent,
        PriceAnalysisComponent,
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatCardModule,
        HttpModule,
        FormsModule,
        ChartsModule,
        RouterModule.forRoot(appRoutes),
    ],
    providers: [
        AngularFireAuth,
        WordpressService,
        PricesService,
        AuthService,
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
