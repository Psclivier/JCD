var MyMarker = {
    location: [],
    // Observateur de click sur un marker pour ouvrir la fenètre d'info.
    click: function (marker) {
        marker.addListener('click', function () {
            MyInfo.createBlock(marker);
        });
    },

    //Création des markers avec l'objet google
    initMarker: function() {
        JcdData.location.forEach(function(m, index) {
            this.marker = new google.maps.Marker({
                position: {
                    lat: m.position['lat'],
                    lng: m.position['lng']
                },
            	address: m.address,
                name: m.name,
                available_bike_stands: m.available_bike_stands,
                available_bikes: m.available_bikes,
                bike_stands: m.bike_stands,
                status: m.status,
                number: m.number,
                banking: m.banking,
                bonus: m.bonus,
                index: index
                });
            MyMarker.click(this.marker);
            MyMarker.location.push(this.marker);

        })
        MarkerCluster.init();
    }
};

