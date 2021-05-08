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
            titleOptions += '<div class="song-title" onmouseover="fetchLyrics(\'' + titles.titles[n].value + '\')">' + titles.titles[n].title + '</div>';
        }
        console.log(titleOptions);
        document.getElementById("songTitles").innerHTML = titleOptions;
        }
        else{
            document.getElementById("songTitles").innerHTML = "NO SONG YET";
        }
    };
    xmlhttp.open("GET", "json/_song_titles.txt", true);
    xmlhttp.send();
}  

function fetchLyrics(title){
    songLyrics = "";
    // console.log("IIII");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    //   console.log("AJAX");
      if (this.readyState == 4 && this.status == 200) {
        // console.log("JSON");
        theLyrics = JSON.parse(this.responseText);
        setFirstChord();
        setChordMarks();
        // resetKnobPosition();
        for(n in theLyrics.verses){
            songLyrics += '<p class="lyrics-tones">';
            for(m in theLyrics.verses[n].tones){
                songLyrics += '<span style="position:relative;left:'+ theLyrics.verses[n].tones[m].position + 'px;">' + theLyrics.verses[n].tones[m].tone + '</span>';
            }
            songLyrics += '</p><p class="lyrics-verse">' + theLyrics.verses[n].lyrics + '</p>';
          }
          document.getElementById("centerPart").innerHTML = songLyrics;
      }
    };
    xmlhttp.open("GET", "json/" + title + ".txt", true);
    xmlhttp.send();
}

function setFirstChord(){
    sessionStorage.clear();
    sessionStorage.setItem("firstChord", theLyrics.verses[0].tones[0].tone);
    // firstChordPosInTable = sessionStorage.getItem("firstChord");
    // console.log("FCPIT+: " + firstChordPosInTable);
}

function setChordMarks(){
    var chordMarks = document.getElementsByClassName('the-chord');
    var firstChordPosInTable = chordsTable.indexOf(sessionStorage.getItem("firstChord"));
    for(i = 0; i < chordMarks.length; i++){
        if(chordsTable[firstChordPosInTable - 2 + i] == undefined){
            chordMarks[i].setAttribute('class', 'empty-chord');
            chordMarks[i].textContent = "♪";
        }
        else{
            chordMarks[i].setAttribute('class', 'the-chord');
            chordMarks[i].innerHTML = chordsTable[firstChordPosInTable - 2 + i];
        }
    }
    console.log("sdf: " + chordsTable[firstChordPosInTable - 2 + i]);
    // firstChordPosInTable = sessionStorage.getItem("firstChord");
    // console.log("FCPIT+: " + firstChordPosInTable);
}

function resetKnobPosition(){
    document.getElementById('mainKnob').style.top = '200px';
}

chordsTable = ['A', 'B', 'C', 'D', 'E', 'Em', 'F','G','H'];