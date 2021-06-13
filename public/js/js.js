const likeButton = document.getElementById('like');
const dislikeButton = document.getElementById('dislike');
const personProfile = document.getElementById('userPf');
const matchScreen = document.getElementById('matchScreen');
const kruisje = document.getElementById('kruisje');
const imgLeft = document.getElementById('imgLeft');
const imgRight = document.getElementById('imgRight');
const likeForm = document.getElementById('likeForm');
const dislikeForm = document.getElementById('dislikeForm');

function likeUser() {
    personProfile.classList.add('right');
    likeForm.submit();
};

function dislikeUser() {
    personProfile.classList.add('left');
    dislikeForm.submit();
};

function schermWeg() {
    matchScreen.classList.add('displayNone');
    imgLeft.classList.remove('rolNaarRechts');
    imgRight.classList.remove('rolNaarLinks');
}


likeButton.addEventListener('click', likeUser);
dislikeButton.addEventListener('click', dislikeUser);
kruisje.addEventListener('click', schermWeg);

personProfile.addEventListener('touchstart', handleTouchStart, false);        
personProfile.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             
         evt.originalEvent.touches; 
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            dislikeUser();
        } else {
            likeUser();
        }                       
    } 
    /* reset values */
    xDown = null;
    yDown = null;                                             
};