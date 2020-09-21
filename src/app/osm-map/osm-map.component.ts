/// <reference types='leaflet-loading' />
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, LoadingOptions } from 'leaflet';

declare module 'leaflet' {
  interface Control {
     _addTo(map: Map): Control;
  }
  interface Map {
    _leaflet_id: number;
    _container: HTMLElement;
  }
}

@Component({
  selector: 'app-osm-map',
  templateUrl: './osm-map.component.html',
  styleUrls: ['./osm-map.component.css',]
})
export class OsmMapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions;
  private map: Map;
  private zoom: number;
  private loadingOptions: LoadingOptions={
    position: 'topleft',
  };


  constructor() { 
  }

  ngOnInit() {
  // Use a compact attribution control for small map container widths
    if (! Control.Attribution.prototype._addTo) {
    Control.Attribution.prototype._addTo = Control.Attribution.prototype.addTo;

    Control.Attribution.prototype.addTo = function(map) {
      Control.Attribution.prototype._addTo.call(this, map);

      // use the css checkbox hack to toggle the attribution
      const parent     = this._container.parentNode;
      const checkbox   = document.createElement('input');
      const label      = document.createElement('label');
      const checkboxId = 'attribution-toggle-' + map._leaflet_id;  // unique name if multiple maps are present

      checkbox.setAttribute('id', checkboxId);
      checkbox.setAttribute('type', 'checkbox');
      checkbox.classList.add('leaflet-compact-attribution-toggle');
      parent.insertBefore(checkbox, parent.firstChild);

      label.setAttribute('for', checkboxId);
      label.classList.add('leaflet-control');
      label.classList.add('leaflet-compact-attribution-label');
      parent.appendChild(label);

      // initial setup for map load
      if (map._container.offsetWidth <= 600) {
        DomUtil.addClass(this._container, 'leaflet-compact-attribution');
      }

      // update on map resize
      map.on('resize', function() {
        if (map._container.offsetWidth > 600) {
          DomUtil.removeClass(this._container, 'leaflet-compact-attribution');
        } else {
          DomUtil.addClass(this._container, 'leaflet-compact-attribution');
        }
      }, this);
      return this;
    };
    }
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }
}
