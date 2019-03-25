// Instanciation Objet JcdData
var openData = Object.create(JcdData);
openData.getData();


// Utiliser les flèches du slider
document.getElementById('prev').addEventListener('click', function () {
  si.plusDivs(-1)
});
document.getElementById('next').addEventListener('click', function () {
  si.plusDivs(1)
});


// Instanciation Objet Slider
var si = new MySlider(document.getElementsByClassName("mySlides"));



// Récupération des info du sessionStorage
var startingChrono = MyStorage.getStorageValue('startingChrono');
var address = MyStorage.getStorageValue('address');

// Si sessionStorage existe déjà => c'est un rafraichissement.
if (startingChrono && address) {
  startingChrono = parseInt(startingChrono, 10);
  // Date du refresh
  var refreshDate = new Date();
  // On obtient la date du refresh en ms
  refreshDate = MyStorage.dateIntoMilliseconds(refreshDate);
  // On calcule la différence de secondes entre les deux dates enregistrées.
  var leftSeconds = (startingChrono + 1200000 - refreshDate) / 1000;
  MyInfo.createInfoPhrase(address);
  // instanciation Objet Chrono après rafraichissement.
  var c2 = new Chrono(leftSeconds, document.getElementById("time"), document.getElementById("texteres"));
  c2.start()
}





