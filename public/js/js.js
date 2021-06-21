const likeButton = document.getElementById('like');
const dislikeButton = document.getElementById('dislike');
const personProfile = document.getElementById('userPf');
const likeForm = document.getElementById('likeForm');
const dislikeForm = document.getElementById('dislikeForm');
const snap = document.getElementById('snapHet');
const hulp = document.getElementById('hulp');
const hulpPic = document.getElementById('hulp-picture');

function openHulp() {
    hulp.classList.remove('none');
    personProfile.classList.add('infoAnimation');
}

function closeHulp() {
    hulp.classList.add('none');
    personProfile.classList.remove('infoAnimation');
}

function likeUser() {
    personProfile.classList.add('right');
    likeForm.submit();
};

function dislikeUser() {
    personProfile.classList.add('left');
    dislikeForm.submit();
};

likeButton.addEventListener('click', likeUser);
dislikeButton.addEventListener('click', dislikeUser);
snap.addEventListener('click', closeHulp);
hulpPic.addEventListener('click', openHulp);

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

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            dislikeUser(); // swipe naar links
        } else {
            likeUser(); // swipe naar rechts
        }                       
    } 
    
    /* De value wordt reset op opnieuw gebruikt te kunnen worden */
    xDown = null;
    yDown = null;                                             
};