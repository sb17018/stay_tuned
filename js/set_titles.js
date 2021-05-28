function changeTitleBackground(elmt){
    var chosenTitleBackground = document.querySelector('.song-title-chosen');
    var chosenTitleUnderline = document.querySelector('.red-underline');
    if(chosenTitleBackground != null){
        // console.log(chosenTitleBackground);
        chosenTitleBackground.classList.remove('song-title-chosen');
        chosenTitleUnderline.classList.remove('red-underline');
    }
    var titleBackground = elmt.querySelectorAll('div')[2];
    var titleUnderline = elmt.querySelectorAll('div')[3];
    // console.log(titleBackground);
    titleBackground.classList.add('song-title-chosen');
    titleUnderline.classList.add('red-underline');
}

function changeCircleColor(elmt){
    var brightCircle = elmt.getElementsByClassName('red-circle-icon')[0];
    brightCircle.style.backgroundImage = 'radial-gradient(farthest-corner at 40% 40%, white, rgb(250, 74, 74), rgb(250, 74, 74))';
}

function resetCircleColor(elmt){
    var brightCircle = elmt.getElementsByClassName('red-circle-icon')[0];
    brightCircle.style.backgroundImage = 'radial-gradient(farthest-corner at 20% 20%, white, red, red)';
}
