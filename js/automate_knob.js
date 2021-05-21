//Make the DIV element draggable:
function dragElement(elmnt){
  var pos1 = pos2 = 0;
  var allowedKnobPositionDown = 505 - getEmptyChords()[1]*54;
  var allowedKnobPositionUp = 285 + getEmptyChords()[0]*54;
  var theChordMarks = document.getElementsByClassName('not-empty-chord');
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e){
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos1 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
    
  function elementDrag(e){
    e = e || window.event;
    e.preventDefault();
    // set the element's new position:
    pos2 = e.clientY;
    if((pos2 <= allowedKnobPositionDown) && (pos2 >= allowedKnobPositionUp)){
      elmnt.style.top = (pos2 - 200) + "px";
    }
    colorChosenChord(theChordMarks, elmnt.offsetTop - 90);
    adjustChords();
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//to color chosen chord
function colorChosenChord(theChordMarks, knobPosition){
  for(i = 0; i < theChordMarks.length; i++){
    var chordPositionTop = theChordMarks[i].offsetTop;
    var chordPositionBottom = theChordMarks[i].offsetTop + 54;
    if(((knobPosition + 17) > chordPositionTop) && ((knobPosition + 17) < chordPositionBottom)){
      theChordMarks[i].setAttribute('class', 'the-chord not-empty-chord the-chord-current');
    }
    else{
      theChordMarks[i].setAttribute('class', 'the-chord not-empty-chord');
    }
  }
}

function adjustChords(){
  var chordsOverLyrics = document.querySelectorAll('.lyrics-tones span');
  var lyricsFirstChordPositionInAllChords = chordsTable.indexOf(chordsOverLyrics[0].textContent);
  var chosenChord = document.querySelector('.the-chord-current');
  if(chosenChord != null && chosenChord.textContent != chordsOverLyrics[0].textContent){
    var chosenChordPositionInAllChords = chordsTable.indexOf(chosenChord.textContent);
    var diffInChords = chosenChordPositionInAllChords - lyricsFirstChordPositionInAllChords;
    chordsOverLyrics.forEach(e => {
      var chordPositionInAllChords = chordsTable.indexOf(e.textContent);
      e.textContent = chordsTable[chordPositionInAllChords + diffInChords];
    });
  }
}

chordsTable = ['A', 'B', 'C', 'D', 'E', 'Em', 'F','G','H'];