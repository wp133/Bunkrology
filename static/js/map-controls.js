L.control.zoom({
  position: 'topright'
}).addTo(map);

var lc = L.control.locate({
  position: 'topright',
  drawCircle: true,
  follow: true,
  setView: 'untilPanOrZoom',
  keepCurrentZoomLevel: false,
  strings: {
    title: "Pokaż moją lokalizację",
    metersUnit: "metrów",
    feetUnit: "stóp",
    popup: "Jesteś w promieniu {distance} {unit} od tego punktu",
    outsideMapBoundsMsg: "Wykryto lokalizację poza granicami mapy"
  },
  circleStyle: {
      className: "leaflet-control-locate-circle",
      color: "#136AEC",
      fillColor: "#136AEC",
      fillOpacity: 0.15,
      weight: 0
  },
  markerStyle: {
      className: "leaflet-control-locate-marker",
      color: "#fff",
      fillColor: "#2A93EE",
      fillOpacity: 1,
      weight: 3,
      opacity: 1,
      radius: 9
  },
  icon: 'bi bi-crosshair',
  iconElementTag: 'svg',
  iconLoading: 'bi bi-crosshair',
  locateOptions: {
      maxZoom: 19,
      watch: true,
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000
  },
  onLocationError: function(err) {
    var message;

    // GeolocationPositionError codes:
    // 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
    switch (err ? err.code : 0) {
      case 1:
        message = 'Brak uprawnień do odczytu lokalizacji.';
        break;
      case 2:
        message = 'Nie można ustalić lokalizacji urządzenia.';
        break;
      case 3:
        message = 'Przekroczono limit czasu podczas ustalania lokalizacji.';
        break;
      default:
        message = 'Wystąpił błąd podczas ustalania lokalizacji.';
        break;
    }

    alert(message);
  }
}).addTo(map);

// Dla dużego ekranu podziałka liniowa na dole po prawej, a dla małego ekranu na dole po lewej.

var controlScalePosition = 'bottomleft';
if ($(window).width() > 991) {
  controlScalePosition = 'bottomright';
}

var scale = L.control.scale({
  position: controlScalePosition,
  imperial: false,
  maxWidth: 180
}).addTo(map);



$('.leaflet-control-locate a').css({
  'display': 'flex',
  'align-items': 'center',
  'justify-content': 'center'
}).html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-crosshair" viewBox="0 0 16 16" style="margin-top: -2px;">
  <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
</svg>`);


function selectImage(imageId) {
  $('.selectable').removeClass('selected');
  $('#' + imageId).addClass('selected');
  mapLayersSelectedImageId = imageId;
  loadMap();
}

$('.selectable').on('click', function() {
  selectImage($(this).attr('id'));
});

$('#layer-btn').on('click', function(e) {
  e.stopPropagation();
  $('#layer-popup').toggle();
});

$(document).on('click', function(event) {
  if (!$(event.target).closest('#layer-popup, #layer-btn').length) {
    $('#layer-popup').hide();
  }
});

$('#layer-checkbox-1').on('change', function() {
  areHikingTrailsSelected = $(this).prop('checked');
  loadMap();
});

$('#layer-checkbox-2').on('change', function() {
  areCyclingTrailsSelected = $(this).prop('checked');
  loadMap();
});

$('#layer-checkbox-3').on('change', function() {
  areTrainsTrailsSelected = $(this).prop('checked');
  loadMap();
});

$(document).ready(function() {
  selectImage('classicMapBaseLayer');
  
  if ($(window).width() <= 991) {
    const $mapOptions = $('.map-options');
    const $locateControl = $('.leaflet-control-locate');
    
    if ($mapOptions.length && $locateControl.length) {
      const locateControl = document.querySelector('.leaflet-control-locate');

      if (locateControl) $mapOptions.prepend(locateControl);
    }
  }
});

