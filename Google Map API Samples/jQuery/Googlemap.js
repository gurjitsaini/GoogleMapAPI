$(document).ready(function () {
    var all_overlays = [];
    var selectedShape;
    var map;
    var drawingManager;
var coordinates;
var coordinates1;
var Polygoneachdata;
        function clearSelection() {
            if (selectedShape) {
                selectedShape.setEditable(false);
                selectedShape = null;
            }
        }

        function setSelection(shape) {
            clearSelection();
            selectedShape = shape;
            shape.setEditable(true);
           
        }

        function deleteSelectedShape() {
            if (selectedShape) {
                selectedShape.setMap(null);
            }
        }

        function deleteAllShape() {
            for (var i = 0; i < all_overlays.length; i++) {
                all_overlays[i].overlay.setMap(null);
            }
            all_overlays = [];
        }


    var latlng = new google.maps.LatLng(19.107961,72.883558);
    var myOptions = {
        zoom: 17,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE]
        },
        polygonOptions: {
            editable: true
        }
    });
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (e) {
        all_overlays.push(e);
        if (e.type != google.maps.drawing.OverlayType.MARKER) {
            // Switch back to non-drawing mode after drawing a shape.
            drawingManager.setDrawingMode(null);

            // Add an event listener that selects the newly-drawn shape when the user
            // mouses down on it.
            var newShape = e.overlay;
            newShape.type = e.type;
            google.maps.event.addListener(newShape, 'click', function () {
                setSelection(newShape);
            });
            setSelection(newShape);
        }
    });
google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
        coordinates = (polygon.getPath().getArray());
        
      });
	  google.maps.event.addListener(drawingManager, 'rectanglecomplete', function (rectangle) {
        coordinates1 = (rectangle.getBounds());	


		
		google.maps.event.addListener(rectangle, 'click', function() {
		//var	polygonArea = google.maps.geometry.spherical.computeArea(rectangle.getBounds());
		console.log(coordinates1);
        var bounds = rectangle.getBounds();
		var NE = bounds.getNorthEast();
		var SW = bounds.getSouthWest();
		// North West
		var NW = new google.maps.LatLng(NE.lat(),SW.lng());
		// South East
		var SE = new google.maps.LatLng(SW.lat(),NE.lng());
		
		var southWest = new google.maps.LatLng(SW.lat(), SW.lng());
  var northEast = new google.maps.LatLng(NE.lat(), NE.lng());
  var southEast = new google.maps.LatLng(SW.lat(), NE.lng());
  var northWest = new google.maps.LatLng(NE.lat(), SW.lng());
  //var rectarea=google.maps.geometry.spherical.computeArea([northEast, northWest, southWest, southEast]) / (1000000);
  var rectarea=google.maps.geometry.spherical.computeArea([northEast, northWest, southWest, southEast])/ (1000000);
		//console.log(NE.lat());
		//console.log(SE);
      $("#lblCoord").html("Area in square km:"+ rectarea + "<br>" +"NE.Latitude:" + NE.lat() + "<br>" + "NE.Longitude:" + NE.lng() + "<br>"+ "SW.Latitude:"+SW.lat()+ "<br>"+ "SW.Longitude:"+ SW.lng());
	  initMap(NE.lat(),SW.lat(),NE.lng(),SW.lng())
        });
        
      });
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    google.maps.event.addListener(map, 'click', clearSelection);
    google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
    google.maps.event.addDomListener(document.getElementById('delete-all-button'), 'click', deleteAllShape);

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
    var kmlAreaData = [[72.842820799999998,19.090471399999998],[72.842840600000002,19.0905904],[72.842873999999995,19.090783299999998]];
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
   // polygon.setMap(map);
    drawRects(rectangle.getBounds(), 5, 5);
	console.log(rectangle.getBounds());
	$("#lblCoord1").html("Data:" + rectangle.getBounds());
    map.fitBounds(rectangle.getBounds());
	
	/*   for (var i = 0; i < polygons.length; i++) {
      var hidePoly = true;
      for (var j = 0; j < polygon.getPath().getLength(); j++) {
        if (google.maps.geometry.poly.containsLocation(polygon.getPath().getAt(j), polygons[i])) {
          //console.log("polygons[" + i + "] contains " + polygon.getPath().getAt(j));
          hidePoly = false
          break;
        }
      }
      if (hidePoly) polygons[i].setMap(null);
    }
	
	for (var j = 0; j < polygon.getPath().getLength(); j++) {
      for (var i = 0; i < polygons.length; i++) {
        for (var k = 0; k < polygons[i].getPath().getLength(); k++) {
          if (google.maps.geometry.poly.containsLocation(polygons[i].getPath().getAt(k), polygon)) {
           // console.log("polygon contains polygons[" + i + "]=" + polygons[i].getPath().getAt(k));
            polygons[i].setMap(map)
            break;
          }
        }
      }
    } */
    // find boundary squares
   
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
		
		//Polygoneachdata = Polygoneachdata+ + "corner1:" + corner1 + " corner2:" + corner2 + "corner3:" + corner3 + " corner4:" + corner4 + "<br>"
		
		//console.log(lat);
		//console.log(lng);
		// $("#lblCoord1").html(Polygoneachdata); 
		//var bounds = polygon.getBounds();
		/* var NE = bounds.getNorthEast();
		var SW = bounds.getSouthWest();
		// North West
		var NW = new google.maps.LatLng(NE.lat(),SW.lng());
		// South East
		var SE = new google.maps.LatLng(SW.lat(),NE.lng());
		
		var southWest = new google.maps.LatLng(SW.lat(), SW.lng());
		var northEast = new google.maps.LatLng(NE.lat(), NE.lng());
		var southEast = new google.maps.LatLng(SW.lat(), NE.lng());
		var northWest = new google.maps.LatLng(NE.lat(), SW.lng());
		  //var rectarea=google.maps.geometry.spherical.computeArea([northEast, northWest, southWest, southEast]) / (1000000);
		var rectarea=google.maps.geometry.spherical.computeArea([northEast, northWest, southWest, southEast])/ (1000000);
		//console.log(NE.lat());
		//console.log(SE);
      $("#lblCoord1").html("Area in square km:"+ rectarea + "<br>" +"NE.Latitude:" + NE.lat() + "<br>" + "NE.Longitude:" + NE.lng() + "<br>"+ "SW.Latitude:"+SW.lat()+ "<br>"+ "SW.Longitude:"+ SW.lng());
	  initMap(NE.lat(),SW.lat(),NE.lng(),SW.lng()) */
	   
		polygons.push(polygon);
        NW = new google.maps.LatLng(south, longitudes[i]);
      }
    }
  }
	
    function getCoordinates() {
		
		//var bounds = coordinates1;
		//var NE = bounds.getNorthEast();
		//var SW = bounds.getSouthWest();
		// North West
		//var NW = new google.maps.LatLng(NE.lat(),SW.lng());
		// South East
		//var SE = new google.maps.LatLng(SW.lat(),NE.lng());
		//console.log(NE.lat());
		//console.log(SE);
      //$("#lblCoord").html("NE.Latitude:" + NE.lat() + "<br>" + "NE.Longitude:" + NE.lng() + "<br>"+ "SW.Latitude:"+SW.lat()+ "<br>"+ "SW.Longitude:"+ SW.lng());
	  var	polygonArea = google.maps.geometry.spherical.computeArea(coordinates);
        console.log(polygonArea);
    }
	
    google.maps.event.addDomListener(document.getElementById('CoordsButton'), 'click', getCoordinates);
});