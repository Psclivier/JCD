var MarkerCluster = {
	// Création de l'objet MarkerCluster
	init: function() {
		 var markerCluster = new MarkerClusterer(MyMap.map, MyMarker.location,
           {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
		 return markerCluster;
	}
};