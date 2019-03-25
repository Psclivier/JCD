var MyStorage =  {
    // Temps T auquel le chrono est lancé
    chronoStartingDate: '',

    // Date au moment de la création du sessionstorage.
    storageInit: function () {
        this.chronoStartingDate = new Date ()
    },
    // Objet date depuis le 1 janvier 1970 en millisec.
    dateIntoMilliseconds: function (date) {
        return date.getTime()
    },
    // Enregistrement en sessionstorage.
    setStorage : function (key, value) {
      sessionStorage.setItem(key, value)
    },

    // Récupération des données du sessionstorage
    getStorageValue : function (key) {
        return sessionStorage.getItem(key);
    },
    // Effacement des données du sessionstorage
    clearsession : function () {
        sessionStorage.clear()
    }
};
