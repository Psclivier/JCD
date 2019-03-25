var MyMap = {
	zoom: 13,
	lat: 45.751921,
	lng: 4.838803,
	location: [],
	initMap: function () {
		MyMap.map = new google.maps.Map(document.getElementById('myMap'), {
			zoom: MyMap.zoom,
		    center: {
		    	lat: MyMap.lat,
		    	lng: MyMap.lng
		    }
		});
		return MyMap.map;
	},
};