$(document).ready(function () {
var map;

  function initMap(cor1,cor2,cor3,cor4) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 28.644800,
        lng: 77.216721
      },
      zoom: 8,
	  mapTypeId: google.maps.MapTypeId.SATELLITE
    });
    var rectangle = new google.maps.Rectangle({
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.2,
      map: map,
      bounds: {
        north: cor1,
        south: cor2,
        east: cor3,
        west: cor4
      }
    });
    var kmlAreaData = [
      [76.8559524, 28.400185],
      [76.8696144, 28.3854157],
      [76.8796311, 28.3957333],
      [76.8671319, 28.4182734],
      [76.869179, 28.4060588],
      [76.8559524, 28.400185]
    ];
    var coords = buildCoordinatesArrayFromString(kmlAreaData);

    function buildCoordinatesArrayFromString(MultiGeometryCoordinates) {
      var finalData = [];
      MultiGeometryCoordinates.forEach(function(item, i) {
        finalData.push({
          lng: parseFloat(item[0]),
          lat: parseFloat(item[1])
        });
      });
      return finalData;
    }
    var polygon = new google.maps.Polygon({
      paths: coords,
      strokeColor: '#0037FF',
      strokeOpacity: 0.8,
      strokeWeight: 3
    });
    //polygon.setMap(map);
    drawRects(rectangle.getBounds(), 3, 3);
    map.fitBounds(rectangle.getBounds());
    // find boundary squares
   /*  for (var i = 0; i < polygons.length; i++) {
      var hidePoly = true;
      for (var j = 0; j < polygon.getPath().getLength(); j++) {
        if (google.maps.geometry.poly.containsLocation(polygon.getPath().getAt(j), polygons[i])) {
          console.log("polygons[" + i + "] contains " + polygon.getPath().getAt(j));
          hidePoly = false
          break;
        }
      }
      if (hidePoly) polygons[i].setMap(null);
    } */
    // find internal squares
    /* for (var j = 0; j < polygon.getPath().getLength(); j++) {
      for (var i = 0; i < polygons.length; i++) {
        for (var k = 0; k < polygons[i].getPath().getLength(); k++) {
          if (google.maps.geometry.poly.containsLocation(polygons[i].getPath().getAt(k), polygon)) {
            console.log("polygon contains polygons[" + i + "]=" + polygons[i].getPath().getAt(k));
            polygons[i].setMap(map)
            break;
          }
        }
      }
    } */
  }
  var polygons = [];

  function drawRects(bounds, verticalBlocks, horizontalBlocks) {
    var startingLatLng = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng());
    var NWcorner = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng());
    var SWcorner = bounds.getSouthWest();
    var verticalBlockSize = google.maps.geometry.spherical.computeDistanceBetween(NWcorner, SWcorner) / verticalBlocks;
    var NEcorner = bounds.getNorthEast();
    var horizontalBlockSize = google.maps.geometry.spherical.computeDistanceBetween(NWcorner, NEcorner) / verticalBlocks;

    // modified from https://stackoverflow.com/questions/38493098/grid-on-top-of-google-maps-produces-gaps-in-squares/38494172#38494172
    var NW = startingLatLng;
    // define horizontal lines
    var longitudes = [];
    longitudes.push(NW.lng());
    for (var i = 0; i < verticalBlocks; i++) {
      var longitude = google.maps.geometry.spherical.computeOffset(NW, horizontalBlockSize, 90).lng();
      longitudes.push(longitude)
      NW = new google.maps.LatLng(NW.lat(), longitude);
    }
    var NW = startingLatLng;
    // for each longitude, make a column of squares
    for (var i = 0; i < longitudes.length - 1; i++) {
      NW = new google.maps.LatLng(startingLatLng.lat(), longitudes[i]);
      for (var j = 0; j < horizontalBlocks; j++) {
        var north = NW.lat();
        var south = google.maps.geometry.spherical.computeOffset(NW, verticalBlockSize, 180).lat();
        var east = longitudes[i + 1];
        var west = longitudes[i];
        var corner1 = new google.maps.LatLng(north, east); // NE
        var corner2 = new google.maps.LatLng(south, east); // SE
        var corner3 = new google.maps.LatLng(south, west); // SW
        var corner4 = new google.maps.LatLng(north, west); // NW

        var polygon = new google.maps.Polygon({
          strokeColor: "#FF0000",
          strokeOpacity: 0.25,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.1,
          map: map,
          paths: [corner1, corner2, corner3, corner4]
        });
       
		google.maps.event.addListener(polygon, 'click', function() {
		//var	polygonArea = google.maps.geometry.spherical.computeArea(rectangle.getBounds());
		console.log('test');
		});
		 polygons.push(polygon);
        NW = new google.maps.LatLng(south, longitudes[i]);
      }
    }
  }
  google.maps.event.addDomListener(document.getElementById('CoordsButton1'), 'click', initMap);
});