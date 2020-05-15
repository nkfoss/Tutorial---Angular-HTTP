import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InterceptorService } from './interceptor.service';
import { SecondInterceptorService } from './second-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule], // The HttpClientModule is needed to send requests
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: SecondInterceptorService, 
      multi: true
    }
    // The order in which you delcare the interceptors is the order they are run in.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
