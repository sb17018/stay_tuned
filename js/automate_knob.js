//Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = pos2 = 0;
  var theChordMarks = document.getElementsByClassName('the-chord');
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos1 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // checkPositionOfNextTone(elmnt);
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position
    // pos1 = pos2 - e.clientY;
    // set the element's new position:
    pos2 = e.clientY;
    //console.log("pos2="+pos2);
    if((pos2 <= 380) && (pos2 >= 160)){
      //console.log("pos2_3="+pos2);
      elmnt.style.top = (pos2-70) + "px";
      //console.log("elmnt.style.top="+(elmnt.style.top));
      //console.log("elmnt.offsetTop="+(elmnt.offsetTop));
    }
    colorChosenChord(theChordMarks, elmnt.offsetTop-90);
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
    // console.log("chordPositionTop: " + chordPositionTop);
    // console.log("chordPositionBottom: " + chordPositionBottom);
    // console.log("knobPosition+17: " + (knobPosition+17));
    if(((knobPosition+17)>chordPositionTop)&&((knobPosition+17)<chordPositionBottom)){
      theChordMarks[i].setAttribute('class', 'the-chord the-chord-current');
      adjustChords(theChordMarks[i].innerHTML);
    }
    else{
      theChordMarks[i].setAttribute('class', 'the-chord');
    }
  }
}

function adjustChords(chord){
  var chords = document.getElementsByTagName('span');
  // //console.log("chord 1: " + chords[0].innerHTML);
  chords[0].innerHTML = chord;
  var firstChordPosInTable = chordsTable.indexOf(sessionStorage.getItem("firstChord"));
  var chosenChordPosInTable = chordsTable.indexOf(chord);
  var chordsDistance = chosenChordPosInTable - firstChordPosInTable;
  console.log("firstChordPosInTable: " + firstChordPosInTable);
  console.log("chosenChordPosInTable: " + chosenChordPosInTable);
  console.log("chordsDistance: " + chordsDistance);
  // for(i = 1; i < chords.length; i++){
  //       var chordPos = chordsTable.indexOf(chords[i].innerHTML);
  //       chords[i].textContent = 
  // }
}

chordsTable = ['A', 'B', 'C', 'D', 'E', 'Em', 'F','G','H'];