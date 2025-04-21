import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {jsPlumbToolkitModule} from '@jsplumbtoolkit/browser-ui-angular'

import { AppComponent } from './app.component';
import {PersonComponent} from "./person.component"
import {OrgChartInspectorComponent} from "./inspector.component"
import {InspectorPersonComponent} from "./inspector-person.component"

@NgModule({
  declarations: [
    AppComponent, PersonComponent, OrgChartInspectorComponent, InspectorPersonComponent
  ],
  imports: [
    BrowserModule, jsPlumbToolkitModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
