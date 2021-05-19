const likeButton = document.getElementById('like');
const dislikeButton = document.getElementById('dislike');
const personProfile = document.getElementById('userPf');
const matchScreen = document.getElementById('matchScreen');
const kruisje = document.getElementById('kruisje');
const imgLeft = document.getElementById('imgLeft');
const imgRight = document.getElementById('imgRight');

function likeUser() {
    personProfile.classList.add('right');
    setTimeout(matchMade, 300);
};

function dislikeUser() {
    personProfile.classList.add('left');
};

function matchMade() {
    matchScreen.classList.remove('displayNone')
    imgLeft.classList.add('rolNaarRechts');
    imgRight.classList.add('rolNaarLinks');
}

function schermWeg() {
    matchScreen.classList.add('displayNone');
    imgLeft.classList.remove('rolNaarRechts');
    imgRight.classList.remove('rolNaarLinks');
}


likeButton.addEventListener('click', likeUser);
dislikeButton.addEventListener('click', dislikeUser);
kruisje.addEventListener('click', schermWeg);

var touchstartX = 0;
var touchstartY = 0;
var touchendX = 0;
var touchendY = 0;

matchScreen.addEventListener('touchstart', function(event) {
    touchstartX = event.screenX;
    touchstartY = event.screenY;
}, false);

matchScreen.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
}, false); 

function handleGesure() {
    var swiped = 'swiped: ';
    if (touchendX < touchstartX) {
        console.log(swiped + 'left!');
    }
    if (touchendX > touchstartX) {
        console.log(swiped + 'right!');
    }
    if (touchendY < touchstartY) {
        console.log(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
        console.log(swiped + 'up!');
    }
    if (touchendY == touchstartY) {
        alert('tap!');
    }
}