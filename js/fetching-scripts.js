var titles, titleOptions = "", myArr,  theLyrics, i, theTonesInLine, verseTopPosition, toneInSongOriginal = [];

function fetchTitles(){
    var openingTitleInList = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        titles = JSON.parse(this.responseText);
        for(n in titles.titles){
            if(openingTitleInList === ""){
                openingTitleInList = titles.titles[n].value;
                fetchLyrics(openingTitleInList);
            }
            titleOptions += '<div class="song-title" onmouseover="fetchLyrics(\'' + titles.titles[n].value + '\')">' + titles.titles[n].title + '</div>';
        }
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        theLyrics = JSON.parse(this.responseText);
        for(n in theLyrics.verses){
            songLyrics += '<p class="lyrics-tones">';
            for(m in theLyrics.verses[n].tones){
                songLyrics += '<span style="position:relative;left:'+ theLyrics.verses[n].tones[m].position + 'px;">' + theLyrics.verses[n].tones[m].tone + '</span>';
            }
            songLyrics += '</p><p class="lyrics-verse">' + theLyrics.verses[n].lyrics + '</p>';
        }
        document.getElementById("centerPart").innerHTML = songLyrics;
        setFirstChord();
        setChordMarks();
        resetKnobPosition();
      }
    };
    xmlhttp.open("GET", "json/" + title + ".txt", true);
    xmlhttp.send();
}

function setFirstChord(){
    sessionStorage.clear();
    sessionStorage.setItem("firstChord", theLyrics.verses[0].tones[0].tone);
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
}

function resetKnobPosition(){
    document.getElementById('mainKnob').style.top = '200px';
}

chordsTable = ['A', 'B', 'C', 'D', 'E', 'Em', 'F','G','H'];