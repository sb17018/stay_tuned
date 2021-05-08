var titles, titleOptions = "", myArr,  theLyrics, i, theTonesInLine, verseTopPosition, toneInSongOriginal = [];

function fetchTitles(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    console.log("AJAX");
    if (this.readyState == 4 && this.status == 200) {
      console.log("Ckkeee");
      titles = JSON.parse(this.responseText);
      for(n in titles.titles){
        console.log("tree");
        titleOptions += '<option class="opt" value="' + titles.titles[n].value +'">' + titles.titles[n].title + '</option>';
      }
      console.log(titleOptions);
      document.getElementById("theTitleSelect").innerHTML = titleOptions;
      fetchLyrics();
    }
    else{
      document.getElementById("demo").innerHTML = "blieee";
    }
  };
  xmlhttp.open("GET", "json/_song_titles.txt", true);
  xmlhttp.send();
}

function fetchLyrics(){
  var theTitleChosen =  $('#theTitleSelect').val();
  getLyricsFile(theTitleChosen);
  $('#theToneSelect').val("original");
}

function getLyricsFile(title){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    console.log("AJAX");
    if (this.readyState == 4 && this.status == 200) {
      console.log("Ckkeee");
      myArr = JSON.parse(this.responseText);
      setVerses(myArr);
      document.getElementById("demo").innerHTML = theLyrics;
    }
    else{
      document.getElementById("demo").innerHTML = "blieee";
    }
  };
  xmlhttp.open("GET", "json/" + title + ".txt", true);
  xmlhttp.send();
}

function setVerses(myArr){
  theLyrics = "";
  verseTopPosition = 15;
  for(i in myArr.verses){
    // console.log('A');
    theTonesInLine = "";
    for(x in myArr.verses[i].tones){
      theTonesInLine += '<div class="tone-over-verse" style="left: ' + myArr.verses[i].tones[x].position + 'px">' + myArr.verses[i].tones[x].tone + '</div>';
      toneInSongOriginal.push(myArr.verses[i].tones[x].tone);
    }

    theLyrics += '<div class="tone-above-lyrics" style="top: ' + (verseTopPosition-22) + 'px">' + theTonesInLine + '</div>' +
    '<p style="top: ' + verseTopPosition +'px">'+ myArr.verses[i].lyrics +'</p>';
    verseTopPosition+=40;
  }
  $('#verseSectionNumber_z').css('height', verseTopPosition);
}

function changeTone(){
    var index = 0;
    switch($('#theToneSelect').val()){
        case 'original': index = 0;
        break;
        case 'up': index = 1;
        break;
        case 'down': index = -1;
        break;
    }
    adjustTones(index);
    setTonePosition();
}

var tonesSet = ["Z", "A", "B", "C", "D", "Em", "G", "H"];

var toneInSong = [];

function adjustTones(i){
    var indexInOriginal = 0;
    toneInSong = [];
    $(toneInSongOriginal).each(function(){
        toneInSong.push(tonesSet[tonesSet.indexOf(toneInSongOriginal[indexInOriginal])+i]);
        indexInOriginal++;
    });
    return toneInSong;
}

function setTonePosition(){
    var positionInArray = 0;
    var toneOverLyrics = $('.tone-over-verse');
    $(toneOverLyrics).each(function(){
        $(this).html(toneInSong[positionInArray]);
        positionInArray++;
    });
    $('#verseSectionNumber_z').css('height', verseTopPosition);
}

$('#theToneSelect').on('change', changeTone);
$('#theTitleSelect').on('change', fetchLyrics);
fetchTitles();