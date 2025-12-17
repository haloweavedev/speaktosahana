declare module 'react-map-gl' {
    import * as React from 'react';
    import { MapboxEvent } from 'mapbox-gl';

    export interface ViewState {
        latitude: number;
        longitude: number;
        zoom: number;
        bearing?: number;
        pitch?: number;
        padding?: any;
    }

    export interface ViewStateChangeEvent {
        viewState: ViewState;
    }

    export interface MapLayerMouseEvent {
        originalEvent: any;
        // add other properties as needed
    }

    export const Marker: React.FC<any>;
    export const Popup: React.FC<any>;
    export const NavigationControl: React.FC<any>;
    export const GeolocateControl: React.FC<any>;
    
    const Map: React.FC<any>;
    export default Map;
}
