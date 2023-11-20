import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskRepository } from './core/tasks/interfaces/task.repository';
//import { TaskStorageService } from './infrastructure/tasks/task-storage.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TaskTrelloService } from './infrastructure/task-trello.service';
import { TokenInterceptorService } from './infrastructure/token-interceptor.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: TaskRepository, useClass: TaskTrelloService},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
