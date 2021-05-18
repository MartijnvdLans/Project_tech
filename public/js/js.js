var likeButton = document.getElementsByClassName('like');
var dislikeButton = document.getElementsByClassName('dislike');
var personProfile = document.getElementsByClassName('userPf');

function likeUser() {
    for(var i = 0; i < personProfile.length; i++)
{
    this.personProfile.classList.add('right');
}
};

function dislikeUser() {
    for(var i = 0; i < personProfile.length; i++)
{
    this.personProfile.classList.add('left');
}
};

for (var i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', likeUser, false);
}
for (var i = 0; i < dislikeButton.length; i++) {
    dislikeButton[i].addEventListener('click', dislikeUser, false);
}