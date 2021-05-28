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