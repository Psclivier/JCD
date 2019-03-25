var JcdData = {
    // Requete API et push des donnees dans un tableau.
    url : 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=669c914f26dea6b3eac1b4d98f8d05de70453a90',
    location: [],
    getData: function (){
            $.getJSON(JcdData.url, function(data) {
                $.each(data, function(key, value ) {

                    JcdData.location.push(value);
                });
                MyMarker.initMarker();
            })
        }
    };


