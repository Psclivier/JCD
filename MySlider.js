function MySlider(selector) {
    // Définit la première image.
    var slideIndex = 1;

    // Next et Prev appellent plusDiv pour ajouter ou soustraire 1 à l'index.
    this.plusDivs = function (n) {
        this.showDivs(slideIndex += n);
    };

    //
    this.showDivs = function (n) {
        var i;
        var x = selector;
        // Si on est sur la derniere image et que l'on fait Next on retourne à la première image
        if (n > x.length) {
            slideIndex = 1
        }
        // Si on est sur la premiere image et que l'on fait Prev on retourne à la dernière image.
        if (n < 1) {
            slideIndex = x.length
        }
        // Toutes les images qui n'ont pas le bon Index sont cachés.
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        
        document.onkeydown = function (e) {
            e = e || window.event;
            if (e.keyCode == '37')  {
                si.plusDivs(-1)
            } else if (e.keyCode == '39') {
                si.plusDivs(1)
            }
        };
        x[slideIndex - 1].style.display = "block";
    };
    this.showDivs(slideIndex);
}






