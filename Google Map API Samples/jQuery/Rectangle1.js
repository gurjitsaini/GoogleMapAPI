$(document).ready(function () {
   


    //var latlng = new google.maps.LatLng(19.107961,72.883558);
	var latlng = new google.maps.LatLng(19.10863493187921,72.88462646907773);
    var myOptions = {
        zoom: 16,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    };
	var Lat=latlng.lat();
	var Lng=latlng.lng();

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	
	var CenterPoint = {
            lat: 19.108139476768965,
            lng: 72.8837599392403
          };
	
	var TopLeft = {
            lat: 19.114778247456638,
            lng: 72.87660129970519
          };
	


	var BottomLeft = {
            lat: 19.103545741856546,
            lng: 72.87600048488585
          };	
	
	
	var TopRight = {
            lat: 19.114967782991947,
            lng: 72.89171283764797
          };
		  
	var BottomRight = {
            lat: 19.104261876555295,
            lng: 72.89202966331587
          };
	//19.114778247456638, 72.87660129970519)
	//(19.103545741856546, 72.87600048488585), , , )
	 var marker = new google.maps.Marker({
            position: CenterPoint,
            map: map,
            title: "Times Square!"
          });
		  
	
	
		var meters = 1000;
		var coef = meters * 0.0000089;

		var new_lat = 19.108139476768965 + coef;

		// pi / 180 = 0.018
		var new_long = 72.8837599392403 + coef / Math.cos(19.108139476768965 * 0.018);
	
	var TopLeft1 = {
            lat: new_lat,
            lng: new_long
          };
	
	
	var r_earth = 6378;
    var pi = Math.PI;
    var new_latitude1 = 19.108139476768965 + (1 / r_earth) * (180 / pi);
	var new_latitude2 = 19.108139476768965 - (1 / r_earth) * (180 / pi);
   var new_latitude3 = 19.108139476768965 - (1 / r_earth) * (180 / pi);
		
	var new_longitude1 = 72.8837599392403 + (1 / r_earth) * (180 / pi) / Math.cos(19.108139476768965 * pi / 180);
	var new_longitude2 = 72.8837599392403 - (1 / r_earth) * (180 / pi) / Math.cos(19.108139476768965 * pi / 180);
	var new_longitude3 = 72.8837599392403 - (1 / r_earth) * (180 / pi) / Math.cos(19.108139476768965 * pi / 180);
	
	 console.log('new_latitude1:' + new_latitude1);
	 console.log('new_latitude2:' + new_latitude2);
	 console.log('new_latitude1:' + new_longitude1);
	 console.log('new_longitude2:' + new_longitude2);
	 //console.log('new_long:' + new_long);
	 var bounds = new google.maps.LatLngBounds()
	bounds.extend(CenterPoint);
	
	var Point1 = {
            lat: new_latitude1,
            lng: new_longitude1
          };
	
	var Point2 = {
            lat: new_latitude2,
            lng: new_longitude2
          };
	
	
	var Point3= {
            lat: new_latitude1,
            lng: new_longitude2
          };
	
	var Point4= {
            lat: new_latitude2,
            lng: new_longitude1
          };
	
	 var startingLatLng = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng());
	  
	 console.log('startingLatLng:' + startingLatLng);
    var NWcorner = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng());
	  console.log('NWcorner:' + NWcorner);
    var SWcorner = bounds.getSouthWest();
	console.log('SWcorner:' + SWcorner);
    var verticalBlockSize = google.maps.geometry.spherical.computeDistanceBetween(NWcorner, SWcorner) / 1;
    var NEcorner = bounds.getNorthEast();
    var horizontalBlockSize = google.maps.geometry.spherical.computeDistanceBetween(NWcorner, NEcorner) / 1;
	console.log('verticalBlockSize:' + verticalBlockSize);
	console.log('horizontalBlockSize:' + horizontalBlockSize);
    // modified from https://stackoverflow.com/questions/38493098/grid-on-top-of-google-maps-produces-gaps-in-squares/38494172#38494172
    var NW = startingLatLng;
    // define horizontal lines
    var longitudes = [];
    longitudes.push(NW.lng());
	  for (var i = 0; i < longitudes.length - 1; i++) {
		  
      NW = new google.maps.LatLng(startingLatLng.lat(), longitudes[i]);
      for (var j = 0; j < 5; j++) {
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
				
		//polygons.push(polygon);
        NW = new google.maps.LatLng(south, longitudes[i]);
      }
    }
	 
	console.log(bounds.getNorthEast());
	/* var marker = new google.maps.Marker({
            position: TopLeft,
            map: map,
            title: "TopLeft!"
          }); */
		  
	/* var marker = new google.maps.Marker({
            position: BottomLeft,
            map: map,
            title: "BottomLeft!"
          });
		  
	var marker = new google.maps.Marker({
            position: TopRight,
            map: map,
            title: "TopRight!"
          }); */
	var marker = new google.maps.Marker({
				position: Point1,
				map: map,
				title: "Point1!"
			  });


var marker = new google.maps.Marker({
				position: Point2,
				map: map,
				title: "Point2!"
			  });
			  
			  
var marker = new google.maps.Marker({
				position: Point3,
				map: map,
				title: "Point3!"
			  });	


var marker = new google.maps.Marker({
				position: Point4,
				map: map,
				title: "Point4!"
			  });	

var rectangle = new google.maps.Rectangle({
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.2,
      map: map,
      bounds: {
        north: new_latitude1,
        south: new_latitude2,
        east: new_longitude1,
        west: new_longitude2
      }
    });			  
// Create the initial InfoWindow.
       /*  var infoWindow = new google.maps.InfoWindow(
            {content: 'Click the map to get Lat/Lng!', position: CenterPoint});
        infoWindow.open(map);

        // Configure the click listener.
        map.addListener('click', function(mapsMouseEvent) {
          // Close the current InfoWindow.
          infoWindow.close();

          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({position: mapsMouseEvent.latLng});
          infoWindow.setContent(mapsMouseEvent.latLng.toString());
          infoWindow.open(map);
        }); */
    
});