
var MyInfo = {
    // On ne fait apparaitre que un blockinfo à la fois.
    checkBlock : function (){
        if ($("#blockinfo").length > 0){
            $("#blockinfo").remove();
        }
    },


    // On traduit les valeurs en français: Ouverte/fermée.
    checkStatus : function(marker){
        if (marker.status === "OPEN") {
            marker.status="Ouverte";
        }
        else if (marker.status === "CLOSED"){
            marker.status = "Fermée";
        }
    },

    // On traduit les valeurs en français: Présence d'un terminale de paiment ou non. Marche pas.
    checkBanking : function (marker){
        if (marker.banking === "true"){
            marker.banking = "Terminal de Paiement : Oui"
        }
        else marker.banking = "Terminal de Paiement : Non"
    },

    // Création de blockinfo: div d'information de la station ciblee.
    createBlock : function (marker){
        this.checkBlock();
        this.checkStatus(marker);
        this.checkBanking(marker);
        var block = '<div id="blockinfo"><h1>Informations</h1>' +
            '<ul>' +
            '<li>'+ ' Station n° ' + marker.name + '</li>' +
            '<li>'+ marker.address + '</li>' +
            '<li>'+ marker.available_bike_stands + ' Places disponibles' + '</li>' +
            '<li>' + '<span id="idstatus">' + marker.available_bikes + '</span>' + ' Vélos disponibles' + '</li>' +
            '<li>'+ marker.status + '</li>' +
            '<li>'+ marker.banking + '</li>' +
            '</ul>' +
            '</div>';
        $('#myMap').after(block);
        this.availableBooking(marker);
    },

    // On configure la possibilité de réserver en fonction du status de la station.
    availableBooking : function (marker){
        if (marker.status === "Ouverte" && marker.available_bikes >0) {
            MyInfo.createButton(marker);

        } else if (marker.status === "Ouverte" && marker.available_bikes === 0) {
            this.messageUnavailable();

        } else {
            this.messageClosed();
        }
    },

    // Création d'un bouton de réservation.
    createButton : function(marker){
        var validation = '<button id="test">Je réserve un vélo !</button>';
        $("#blockinfo").append(validation);
        this.reservation(marker);
    },

    //Apparition de la div de réservation sur un click.
    reservation: function (marker){
        var button = document.getElementById("test");
        button.addEventListener('click', function(){
            if ($("#blockreservation").length > 0) {
                $("#blockreservation").remove();
            }
            MyInfo.createBankingBlock(marker);
        });
    },

    // Création d'un message en cas d'abscence de vélo.
    messageUnavailable : function () {
        var p ="Il n\'a aucun vélo disponible";
        $("#blockinfo").append(p);
    },

    //Création d'un message en cas de station fermée.
    messageClosed : function(){
        var p ="Cette station est momentanément fermée"
        $("#blockinfo").append(p);
    },

    // Propriété du bouton de validation.
    startStorage : function (marker){
        var buttonval = document.getElementById("startClock");
        buttonval.addEventListener('click', function () {
        if ((Canvas.empty) === false) {
            var c1 = new Chrono(1200, document.getElementById("time"), document.getElementById("texteres"));
            c1.start();
            MyStorage.storageInit();
            var startingChrono = MyStorage.dateIntoMilliseconds(MyStorage.chronoStartingDate);
            MyStorage.setStorage('startingChrono', startingChrono);
            MyStorage.setStorage('address', marker.name);
            var blockres = document.getElementById("blockreservation");
            var wrapper = document.getElementById("wrapper");
            var removeWrapper = blockres.removeChild(wrapper);
            MyInfo.substractOne(marker);

            }
        })
    },

    // Soustrait 1 vélo au nombre de vélos disponibles.
    substractOne : function (marker){
        var plusOne = 1;
        var numberOfBike = marker.available_bikes;
        var substractBike = numberOfBike - plusOne;
        MyMarker.location[marker.index].available_bikes = substractBike;
        document.getElementById("idstatus").innerText = substractBike;
    },


    // Création de bankingblock: div de réservation: adresse + canvas.
    createBankingBlock : function (marker) {
        var bankingblock = '<div id="blockreservation">' +
            '<p id="recap">' + '1 vélo ' + '<span id="texteres">' + ' en cours de réservation à la station  ' + '</span>'  + marker.name +  '<span id="time"></span>' + '</p>' +
            '<div id="wrapper">' +
            '<div id="canvas">' +
            'Canvas is not supported.' +
            '</div>' +
            '<script>' +
            'Canvas.capture()' +
            '</script>' +
            '<button type="button" id="erasecanvas" onclick="Canvas.clear()">Effacer</button>' +
            '<button type="button" id="startClock">Valider</button>' +
            '</div>' +
            '</div>';
        $("#blockinfo").after(bankingblock);
        this.startStorage(marker);

    },
    // Phrase de récupitulation des info de réservation.
    createInfoPhrase : function (address) {
        var block = '<div id="blockinfo"></div>'
        $('#myMap').after(block);
        var infoPhrase = '<p id="recap">' + '1 vélo ' + '<span id="texteres">' + ' en cours de réservation à la station  ' + '</span>' + address + '<span id="time"></span>' + '</p>'
        $("#blockinfo").after(infoPhrase);

    }

};
