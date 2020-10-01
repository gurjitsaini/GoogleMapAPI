$(document).ready(function () {
   


    //var latlng = new google.maps.LatLng(19.107961,72.883558);
	var latlng = new google.maps.LatLng(19.10863493187921,72.88462646907773);
    var myOptions = {
        zoom: 16,
        center: latlng,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE 
    };
	
	 map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	var CenterPoint = {
            lat: 19.108139476768965,
            lng: 72.8837599392403
          };
		  
// Create the initial InfoWindow.
        var infoWindow = new google.maps.InfoWindow(
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
        });
    
});