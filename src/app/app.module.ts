import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {OsmMapComponent} from "./osm-map/osm-map.component"
import { AppComponent } from './app.component';
import {NgxLeafletFullscreenModule} from '@runette/ngx-leaflet-fullscreen'
import {NgxLoadingControlModule} from '@runette/ngx-leaflet-loading'
import {NgxLeafletLocateModule} from '@runette/ngx-leaflet-locate'

@NgModule({
  imports:      [ BrowserModule, FormsModule, LeafletModule,
                  NgxLeafletFullscreenModule, NgxLoadingControlModule,
                  NgxLeafletLocateModule ],
  declarations: [ AppComponent, OsmMapComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
