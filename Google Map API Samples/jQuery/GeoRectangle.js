$(document).ready(function () {
   InitMapDemo();
/* var sel = document.getElementById("pincode");
			var selPoint= sel.value;
			var selPointArray=selPoint.split(',');
			var CenterPoint = {
            lat: parseFloat(selPointArray[0]),
            lng: parseFloat(selPointArray[1])
          };
//times suare 19.108139476768965,72.8837599392403
	//other 19.125543705348232, 72.86827572292296)
	


    //var latlng = new google.maps.LatLng(19.107961,72.883558);
	var latlng = new google.maps.LatLng(CenterPoint.lat,CenterPoint.lng);
    var myOptions = {
        zoom: 16,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    };
	var Lat=latlng.lat();
	var Lng=latlng.lng();

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); */
	
	
      
});
function InitMapDemo(){
	var sel = document.getElementById("pincode");
			var selPoint= sel.value;
			var selPointArray=selPoint.split(',');
			var CenterPoint = {
            lat: parseFloat(selPointArray[0]),
            lng: parseFloat(selPointArray[1])
          };
//times suare 19.108139476768965,72.8837599392403
	//other 19.125543705348232, 72.86827572292296)
	


    //var latlng = new google.maps.LatLng(19.107961,72.883558);
	var latlng = new google.maps.LatLng(CenterPoint.lat,CenterPoint.lng);
    var myOptions = {
        zoom: 16,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    };
	var Lat=latlng.lat();
	var Lng=latlng.lng();

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
}

function Showmap() {
			InitMapDemo();
			var sel = document.getElementById("pincode");
			var selPoint= sel.value;
			var selPointArray=selPoint.split(',');
			var CenterPoint = {
            lat: parseFloat(selPointArray[0]),
            lng: parseFloat(selPointArray[1])
          };
	 var marker = new google.maps.Marker({
            position: CenterPoint,
            map: map,
            title: "CenterPoint!"
          });
		  
	
	var r_earth = 6378;
    var pi = Math.PI;
	var km=0.867300
	//var km=1
    var new_latitude1 = CenterPoint.lat + (km / r_earth) * (180 / pi);
	var new_latitude2 = CenterPoint.lat - (km / r_earth) * (180 / pi);
    //var new_latitude3 = CenterPoint.lat - (km / r_earth) * (180 / pi);
		
	var new_longitude1 = CenterPoint.lng + (km / r_earth) * (180 / pi) / Math.cos(CenterPoint.lat * pi / 180);
	var new_longitude2 = CenterPoint.lng - (km / r_earth) * (180 / pi) / Math.cos(CenterPoint.lat * pi / 180);
	//var new_longitude3 = CenterPoint.lng - (km / r_earth) * (180 / pi) / Math.cos(CenterPoint.lat * pi / 180);
	

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
	 var bounds = rectangle.getBounds();
	var NE = bounds.getNorthEast();
	var SW = bounds.getSouthWest();
	var southWest = new google.maps.LatLng(SW.lat(), SW.lng());
	var northEast = new google.maps.LatLng(NE.lat(), NE.lng());
	var southEast = new google.maps.LatLng(SW.lat(), NE.lng());
	var northWest = new google.maps.LatLng(NE.lat(), SW.lng());
	var rectarea=google.maps.geometry.spherical.computeArea([northEast, northWest, southWest, southEast])/ (1000000);
	console.log('area:' + rectarea);
	 drawRects(rectangle.getBounds(), 3, 3);
}


function drawRects(bounds, verticalBlocks, horizontalBlocks) {
    var startingLatLng = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng());
    var NWcorner = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng());
    var SWcorner = bounds.getSouthWest();
    var verticalBlockSize = google.maps.geometry.spherical.computeDistanceBetween(NWcorner, SWcorner) / verticalBlocks;
    var NEcorner = bounds.getNorthEast();
    var horizontalBlockSize = google.maps.geometry.spherical.computeDistanceBetween(NWcorner, NEcorner) / verticalBlocks;

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
	var concat="";
	var sqtcnt= 0;
    // for each longitude, make a column of squares
    for (var i = 0; i < longitudes.length - 1; i++) {
      NW = new google.maps.LatLng(startingLatLng.lat(), longitudes[i]);
      for (var j = 0; j < horizontalBlocks; j++) {
		  sqtcnt++
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
		
		concat=concat + "<br>"+  "Square" + sqtcnt + ":" + corner4 + "|" + corner1 + "|" + corner2 + "|" + corner3 + "|";
		
		
	   
		//polygons.push(polygon);
        NW = new google.maps.LatLng(south, longitudes[i]);
      }
    }
	$("#lblCoord1").html(concat);
  }