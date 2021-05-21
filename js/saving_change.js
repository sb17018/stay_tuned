

function saveChangeBtnActivate(){
    var firstTone = sessionStorage.getItem("firstChord");
    var currentChord = document.querySelector(".the-chord-current");
    var saveChangeBtn = document.querySelector("#saveChangeBtn");
    if(currentChord != null){
        if(currentChord.textContent != firstTone){
            saveChangeBtn.className = 'save-change-btn-active';
            saveChangeBtn.setAttribute('onclick' , 'saveChange()');
        }
        else{
            saveChangeBtn.className = "save-change-btn-inactive";
            saveChangeBtn.removeAttribute('onclick');
        }
    }
}