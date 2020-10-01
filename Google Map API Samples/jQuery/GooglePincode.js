$(document).ready(function () {
    var all_overlays = [];
    var selectedShape;
    var map;
    var drawingManager;
var coordinates;
var coordinates1;
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
        });
        
      });
    google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
    google.maps.event.addListener(map, 'click', clearSelection);
    google.maps.event.addDomListener(document.getElementById('delete-button'), 'click', deleteSelectedShape);
    google.maps.event.addDomListener(document.getElementById('delete-all-button'), 'click', deleteAllShape);

	function displayinfo(boundaries)
	{
		
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