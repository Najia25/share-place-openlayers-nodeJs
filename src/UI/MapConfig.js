import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

import { fromLonLat } from 'ol/proj';

export default (long, lat, map = null) => {

  const iconGeometry = new Point(fromLonLat([long, lat]));

  const iconFeature = new Feature({
    geometry: iconGeometry
  });

  const source = new VectorSource({
    features: [iconFeature]
  });

  const view = new View({
    center: fromLonLat([long, lat]),
    zoom: 16
  });
  const style = new Style({
    image: new CircleStyle({
      radius: 8,
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)',
      }),
      stroke: new Stroke({
        color: '#FF0000',
        width: 2,
      }),
    })
  });

  iconFeature.setStyle(style);

  const vectorLayer = new VectorLayer({
    source: source
  });

  if( map ) {
    map.getView().setCenter(fromLonLat([long, lat]));
    map.getView().setZoom(16
      );
    map.addLayer(vectorLayer);
  }
  else {
    return new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view
    });
  }
}

