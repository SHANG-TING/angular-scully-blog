import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WebShellModule } from '@web/shell/feature';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, WebShellModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
