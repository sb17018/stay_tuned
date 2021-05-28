theTitle = "";

function saveChangeBtnActivate(){
    var firstTone = sessionStorage.getItem("firstChord");
    var currentChord = document.querySelector(".the-chord-current");
    var saveChangeBtn = document.querySelector("#saveChangeBtn");
    if(currentChord != null){
        if(currentChord.textContent != firstTone){
            saveChangeBtn.className = 'save-change-btn-active';
            saveChangeBtn.setAttribute("onclick" , "saveChange('" + theTitle + "', writeInFile)");
        }
        else{
            saveChangeBtn.className = "save-change-btn-inactive";
            saveChangeBtn.removeAttribute('onclick');
        }
    }
}

function saveChange(title, myCallback){
    // console.log(JSON.stringify(newTones));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("The title" + theTitle);
            var theLyrics = JSON.parse(this.responseText);
            var changedChords = document.querySelectorAll('.lyrics-tones span');
            var changedChordNumberSequence = 0;
            for(n in theLyrics.verses){
                // songLyrics += '<p class="lyrics-tones">';
                for(m in theLyrics.verses[n].tones){
                    theLyrics.verses[n].tones[m].tone = changedChords[changedChordNumberSequence].textContent;
                    changedChordNumberSequence++; 
                }
            }
            myCallback(title, theLyrics);
        }
    };
    xmlhttp.open("GET", "json/" + title + ".txt?nocache=123", true);
    xmlhttp.setRequestHeader("Cache-Control", "no-cache");
    xmlhttp.send();
}

function writeInFile(title, newTones){
    // console.log(JSON.stringify(newTones));
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(theTitle);
            fetchTitles(theTitle);
        }
    };
    xmlhttp.open("POST", "save_change.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("theTitle=" + title + "&changedTones=" + JSON.stringify(newTones));
}

function passTitleToSaveChangeBtn(title){
    theTitle = title;
}

function showTones(myInput){
    console.log(myInput);
}