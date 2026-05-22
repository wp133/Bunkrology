// Konfiguracja mapy
const MAP_SETTINGS = {
  initialView: {
    center: [50.05, 19.9],
    zoom: 12
  },
  zoom: {
    min: 5
  },
  tileProviders: {
    classic: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: 18
    },
    topographic: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      maxZoom: 17
    }
  },
  overlays: {
    hiking: {
      url: 'https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png',
      attribution: 'Hiking data © waymarkedtrails.org (CC-BY-SA)',
      maxZoom: 18
    },
    cycling: {
      url: 'https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png',
      attribution: 'Cycling data © waymarkedtrails.org (CC-BY-SA)',
      maxZoom: 18
    },
    trains: {
      url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
      attribution: 'Railway data © OpenRailwayMap (CC-BY-SA)',
      maxZoom: 19
    }
  }
};

// Inicjalizacja mapy
const map = L.map('main-map', {
  zoomControl: false
}).setView(MAP_SETTINGS.initialView.center, MAP_SETTINGS.initialView.zoom);

// Geocoder czyli lupa w prawym górnym rogu
const geocoder = L.Control.geocoder({
  geocoder: L.Control.Geocoder.arcgis(),
  position: 'topright',
  defaultMarkGeocode: false,
  placeholder: 'Szukaj lokalizacji...',
  collapsed: true
}).on('markgeocode', (e) => {
  map.setView(e.geocode.center, 15);
}).addTo(map);

// Zmienne globalne dla warstw
let currentTileLayer;
let WaymarkedTrails_hiking;
let WaymarkedTrails_cycling;
let OpenRailwayMap;

// Moduł zarządzania warstwami mapy
const MapLayerManager = {
  clearAllLayers() {
    const layers = [
      currentTileLayer, 
      WaymarkedTrails_hiking, 
      WaymarkedTrails_cycling, 
      OpenRailwayMap
    ];
    
    layers.forEach(layer => {
      if (layer) map.removeLayer(layer);
    });
  },
  
  getBaseLayerConfig() {
    const layerMap = {
      'classicMapBaseLayer': 'classic',
      'sateliteMapBaseLayer': 'satellite',
      'topographicMapBaseLayer': 'topographic'
    };
    
    const configKey = layerMap[mapLayersSelectedImageId];
    return MAP_SETTINGS.tileProviders[configKey];
  },
  
  calculateMaxZoom() {
    const maxZooms = [];
    const config = this.getBaseLayerConfig();
    
    maxZooms.push(config.maxZoom);
    
    if (areHikingTrailsSelected) maxZooms.push(MAP_SETTINGS.overlays.hiking.maxZoom);
    if (areCyclingTrailsSelected) maxZooms.push(MAP_SETTINGS.overlays.cycling.maxZoom);
    if (areTrainsTrailsSelected) maxZooms.push(MAP_SETTINGS.overlays.trains.maxZoom);
    
    return Math.min(...maxZooms);
  },
  
  addBaseLayer(maxZoom) {
    const config = this.getBaseLayerConfig();
    
    currentTileLayer = L.tileLayer(config.url, {
      maxZoom: maxZoom,
      minZoom: MAP_SETTINGS.zoom.min,
      maxBoundsViscosity: 1.0,
      attribution: config.attribution,
      ext: 'jpg'
    }).addTo(map);
  },
  
  addOverlayLayer(type, maxZoom) {
    const config = MAP_SETTINGS.overlays[type];
    
    return L.tileLayer(config.url, {
      maxZoom: maxZoom,
      minZoom: MAP_SETTINGS.zoom.min,
      attribution: config.attribution
    }).addTo(map);
  }
};

function loadMap() {
  MapLayerManager.clearAllLayers();
  
  const maxZoom = MapLayerManager.calculateMaxZoom();
  
  MapLayerManager.addBaseLayer(maxZoom);
  
  if (areHikingTrailsSelected) {
    WaymarkedTrails_hiking = MapLayerManager.addOverlayLayer('hiking', maxZoom);
  }
  
  if (areCyclingTrailsSelected) {
    WaymarkedTrails_cycling = MapLayerManager.addOverlayLayer('cycling', maxZoom);
  }
  
  if (areTrainsTrailsSelected) {
    OpenRailwayMap = MapLayerManager.addOverlayLayer('trains', maxZoom);
  }
  
  map.setMaxZoom(maxZoom);
}

//     Narzędzie pomiaru odległości (PPM) 
const MeasureTool = (() => {
  const state = {
    points: [],
    markers: [],
    lines: []
  };

  function formatDistance(meters) {
    if (meters < 1000) return `${Math.round(meters)} m`;
    return `${(meters / 1000).toFixed(2).replace('.', ',')} km`;
  }

  function totalDistance() {
    let dist = 0;
    for (let i = 1; i < state.points.length; i++) {
      dist += state.points[i - 1].distanceTo(state.points[i]);
    }
    return dist;
  }

  function updateHint() {
    const $hint = $('#measure-hint');
    if ($hint.length === 0) return;
    if (state.points.length === 0) {
      $hint.hide();
    } else {
      const distPart = state.points.length > 1 ? ` · ${formatDistance(totalDistance())}` : '';
      $hint.text(`Pomiar odległości${distPart} · PPM: dodaj punkt · ESC: wyczyść`).show();
    }
  }

  function addPoint(latlng) {
    const isFirst = state.points.length === 0;
    state.points.push(latlng);

    const marker = L.circleMarker(latlng, {
      radius: 5,
      color: '#999999',
      fillColor: '#999999',
      fillOpacity: 1,
      weight: 2
    }).addTo(map);

    const label = isFirst ? 'Start' : formatDistance(totalDistance());
    marker.bindTooltip(label, {
      permanent: true,
      direction: 'top',
      className: 'measure-tooltip',
      offset: [0, -5]
    }).openTooltip();

    state.markers.push(marker);

    if (!isFirst) {
      const line = L.polyline(
        [state.points[state.points.length - 2], latlng],
        { color: '#999999', weight: 2, dashArray: '6, 5', interactive: false }
      ).addTo(map);
      state.lines.push(line);
    }

    updateHint();
  }

  function clear() {
    state.markers.forEach(m => map.removeLayer(m));
    state.lines.forEach(l => map.removeLayer(l));
    state.points = [];
    state.markers = [];
    state.lines = [];
    updateHint();
  }

  return { addPoint, clear };
})();

map.on('contextmenu', function(e) {
  MeasureTool.addPoint(e.latlng);
});

$(document).on('keydown', function(e) {
  if (e.key === 'Escape') MeasureTool.clear();
});