import maplibregl from "maplibre-gl";

export default class MapService {

  static getGeojson(data: any[]): any {
    const geojson: any = [];
    Array.prototype.forEach.call(data , (item: any) => {
      geojson.push({
        'id': item.id,
        'properties': {
          'id': item.id,
          'name': item.name,
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [item.coords.long, item.coords.lat]
        }
      })
    })

    return {
      'type': 'FeatureCollection',
      'features': geojson
    };
  }

  static getBounds (features: any) {
    const coordinates = features.map((f: any) => f.geometry.coordinates)
    return coordinates.reduce((bounds: any, coord: any) => {
        return bounds.extend(coord);
    }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
  }
}