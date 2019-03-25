// Objet Compte à rebours.
function Chrono (duration, displaychrono, displaytexteres) {
    this.start = function () {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            // On convertit le paramètre duration en un format minutes + secondes.
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            // On rajoute un 0 si les minutes ou secondes sont inf à 10 pour avoir un format 00:00.
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            // On positionne les durées dans une phrase.
            displaychrono.textContent = " pour " + minutes + ":" + seconds + ' minutes.';
            displaytexteres.textContent = "réservé à la station ";
            // décrémente le timer toutes les 1000 millisec jusqu'à 0.
            if (--timer < 0) {
                timer = duration;
            }
            else if (timer === 0){
                document.getElementById("recap").innerHTML = "Votre réservation a expiré.";
            }
        }, 1000);
    }
}