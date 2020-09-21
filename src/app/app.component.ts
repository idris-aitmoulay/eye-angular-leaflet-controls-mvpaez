/// <reference types='leaflet.locatecontrol' />
/// <reference types='@runette/leaflet-fullscreen' />
import { Component, OnInit } from '@angular/core';
import {Map, Control, DomUtil, MapOptions, tileLayer, latLng, FullscreenOptions, LocationEvent} from 'leaflet';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  private map: Map[] = [];
  private zoom: number[] = [];
  public location = 'No Data'
  private map1Options: MapOptions = {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:1,
                      center:latLng(0,0)
  };
  private map2Options: MapOptions = {
                      layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 19,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:3,
                      center:latLng(0,0)
  }
  public locateOptions: Control.LocateOptions= {
    flyTo: false,
    keepCurrentZoomLevel: true,
    locateOptions: {
                 enableHighAccuracy: true,
               },
    icon: 'material-icons md-18 target icon',
    clickBehavior: {inView: 'stop',
                    outOfView: 'setView',
                    inViewNotFollowing: 'setView'}
  };
  private fullscreenOptions: FullscreenOptions = {
    position: 'topleft',
    pseudoFullscreen: false,
    title: {true:'Exit Fullscreen',
            false: 'View Fullscreen',
            }
  };

  ngOnInit() {
  }
  
  receiveMap(map: Map, id: number) {
    this.map[id] = map;
  }

  receiveZoom(zoom: number, id: number) {
    this.zoom[id] = zoom;
  }

  onNewLocation(location: LocationEvent){
    this.location=location.latlng.toString();
  }
}
