function getMyId(element){
    var theId = element.id;
    var clickedDrag = document.getElementById(theId);
    dragElement(clickedDrag);
}

//Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // console.log(elmnt.id);
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  var nextTonePosition, previousTonePosition;

  function checkPositionOfNextTone(elmnt){
    // var theVerses = document.getElementsByClassName("verse-section");
    var theVerse = elmnt.parentElement;
    // var theTones = theVerses[0].getElementsByClassName("tone-over-lyrics");
    var theTones = theVerse.getElementsByClassName("tone-over-lyrics");
    if(elmnt==theTones[0]){
      // previousTonePosition = theVerses[0].offsetLeft;
      previousTonePosition = theVerse.offsetLeft;
      // previousTonePosition = 100;
    }
    else{
      previousTonePosition = elmnt.previousElementSibling.offsetLeft + elmnt.offsetWidth;
      // previousTonePosition = 200;
    }
    
    if(elmnt==theTones[theTones.length-1]){
      // nextTonePosition = theVerses[0].offsetLeft + theVerses[0].clientWidth - elmnt.offsetWidth;
      nextTonePosition = theVerse.offsetLeft + theVerse.clientWidth - elmnt.offsetWidth;
      // nextTonePosition = 1000;
    }
    else{
      nextTonePosition = elmnt.nextElementSibling.offsetLeft - elmnt.offsetWidth;
      // nextTonePosition = 2000;
    }
    // console.log("x, y, z: "+ previousTonePosition + ", " + nextTonePosition);
  }

  function elementDrag(e) {
    checkPositionOfNextTone(elmnt);
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if(((elmnt.offsetLeft - pos1) < nextTonePosition) && ((elmnt.offsetLeft - pos1) > previousTonePosition)){
      // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    setSelectionElement(elmnt);
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//later on it's defined by clicked verse
function defineSelectionPlaceholderId(elmnt){
  var theToneLine = $(elmnt).siblings('.tone-line').last().attr('id');
  // console.log("bleee");
  return theToneLine;
}

function createSelectionElement(elmnt){
  // console.log("The elem:" + $(elmnt).siblings('.tone-line').last().attr('id'));
  // var theSelectionPlaceholder = defineSelectionPlaceholderId(elmnt);
  // console.log(defineSelectionPlaceholderId(elmnt));
  // defineTheCelectionPlaceholder(elmnt);
  // var theSelectionPlaceholder = document.getElementById("toneLine_1");
  var theSelectionPlaceholder = document.getElementById(defineSelectionPlaceholderId(elmnt));
  var theId = 'toneSelection_'+ elmnt.id.substring(15);
  var selectElement = document.createElement('select');
  selectElement.setAttribute('id', theId);
  selectElement.setAttribute('class', "tone-selection-options");
  selectElement.innerHTML = 
    '<option value="A">A</option>'+
    '<option value="B">B</option>'+
    '<option value="C">C</option>'+
    '<option value="D">D</option>'+
    '<option value="Em">Em</option>'+
    '<option value="F">F</option>'+
    '<option value="G">G</option>'+
    '<option value="H">H</option>';

    var theArrowHeadId = 'theArrowhead_'+ elmnt.id.substring(15);
    var theArrowHead = document.createElement('div');
    var theTriangle = document.createElement('div');
    var theTriangleShadow = document.createElement('div');
    theArrowHead.setAttribute('class', 'the-arrowhead');
    theArrowHead.setAttribute('id', theArrowHeadId);
    theTriangleShadow.setAttribute('class', 'triangle-down-shadow');
    theTriangle.setAttribute('class', 'triangle-down');

  theSelectionPlaceholder.appendChild(selectElement);
  theArrowHead.appendChild(theTriangleShadow);
  theArrowHead.appendChild(theTriangle);
  theSelectionPlaceholder.appendChild(theArrowHead);

  theArrowHead.style.left = (elmnt.offsetLeft) + "px";
  theArrowHead.style.top = (elmnt.offsetTop + 52) + "px";
  selectElement.style.left = (elmnt.offsetLeft) + "px";
  selectElement.style.top = (elmnt.offsetTop + 20) + "px";
}

function setSelectionElement(elmnt){
  var theArrowHeadId = 'theArrowhead_'+ elmnt.id.substring(15);
  var theId = 'toneSelection_'+ elmnt.id.substring(15);
  document.getElementById(theArrowHeadId).style.left = (elmnt.offsetLeft) + "px";
  document.getElementById(theArrowHeadId).style.top = (elmnt.offsetTop + 52) + "px";
  document.getElementById(theId).style.left = (elmnt.offsetLeft) + "px";
  document.getElementById(theId).style.top = (elmnt.offsetTop + 20) + "px";
}