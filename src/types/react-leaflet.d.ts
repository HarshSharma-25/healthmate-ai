declare module 'react-leaflet' {
  import { LatLngExpression, Map as LeafletMap } from 'leaflet';
  import { ReactNode, CSSProperties, RefAttributes } from 'react';

  export interface MapContainerProps {
    center?: LatLngExpression;
    zoom?: number;
    style?: CSSProperties;
    children?: ReactNode;
  }

  export interface TileLayerProps {
    url: string;
    attribution?: string;
  }

  export interface MarkerProps {
    position: LatLngExpression;
    children?: ReactNode;
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export const MapContainer: React.ForwardRefExoticComponent<MapContainerProps & RefAttributes<LeafletMap>>;
  export const TileLayer: React.FC<TileLayerProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Popup: React.FC<PopupProps>;
}
