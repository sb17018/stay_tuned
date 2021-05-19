var titles, titleOptions = "", myArr,  theLyrics, i, theTonesInLine, verseTopPosition, toneInSongOriginal = [];

function fetchTitles(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        titles = JSON.parse(this.responseText);
        for(n in titles.titles){
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
    const firstChord = sessionStorage.getItem("firstChord");
    var chordMarks = document.getElementsByClassName('the-chord');
    var chordsToChose = limitChordsToChanges();
    for(i = 0; i < chordMarks.length; i++){
        if(chordsToChose[i] == "♪"){
            chordMarks[i].setAttribute('class', 'the-chord empty-chord');
        }
        else if(chordsToChose[i] == firstChord){
            chordMarks[i].setAttribute('class', 'the-chord not-empty-chord the-chord-current');
        }
        else{
            chordMarks[i].setAttribute('class', 'the-chord not-empty-chord');
        }
        chordMarks[i].textContent = chordsToChose[i];
    }
}

function limitChordsToChanges(){
    const range = 2;
    const chordsOverLyrics = document.querySelectorAll('.lyrics-tones span');
    var firstChordPosInTable = chordsTable.indexOf(sessionStorage.getItem("firstChord"));
    var minChordPos = chordsTable.length -1, maxChordPos = 0;
    chordsOverLyrics.forEach(elmnt => {
        var chordPosInTable = chordsTable.indexOf(elmnt.textContent);
        if(chordPosInTable < minChordPos){
            minChordPos = chordPosInTable; 
        }
        if(chordPosInTable > maxChordPos){
            maxChordPos = chordPosInTable; 
        }
    });

    var availableChords = [];
    for(i = firstChordPosInTable - range; i <= firstChordPosInTable + range; i++){
        if(firstChordPosInTable - i > minChordPos || i - firstChordPosInTable > chordsTable.length - 1 - maxChordPos){
            availableChords.push("♪");
        }else
        {
            availableChords.push(chordsTable[i]);
        }
    }
    return availableChords;
}

function getEmptyChords(){
    var emptyChordsAfterMainChord = document.querySelectorAll('.the-chord-current~.empty-chord').length;
    var emptyChordsBeforeMainChord = document.querySelectorAll('.empty-chord:not(.the-chord-current~.empty-chord)').length;
    return [emptyChordsBeforeMainChord, emptyChordsAfterMainChord];
}

function resetKnobPosition(){
    document.getElementById('mainKnob').style.top = '200px';
}

chordsTable = ['A','B','C','D','E','Em','F','G','H'];