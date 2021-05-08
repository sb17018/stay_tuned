function setVersesData(){
    var theTitle = $('#theTitleField').val();
    var theLyrics = $('.lyrics-field');
    var theLines = $('.tone-line');
    var theVerses = "";
    var versesContent = "";
    var versesTones = "";
    var versesTonesNote = "";
    var versesTonesPosition = "";
    for(var i = 0; i < theLyrics.length; i++){
        versesTones = "";
        var selectElements = $(theLines[i]).children('select');
        for(var j = 0; j < selectElements.length; j++){
            versesTonesNote = $(selectElements[j]).val();
            versesTonesPosition = parseInt($(selectElements[j]).position().left);
            var tonesSeparator = ",";
            if(j == selectElements.length - 1){
                tonesSeparator = "";
            }
            versesTones += '{"tone":"' + versesTonesNote + '", "position":' + versesTonesPosition + '}' + tonesSeparator;
        }
        var tonesLyricsSeparator = ",";
        if(i == theLyrics.length - 1){
            tonesLyricsSeparator = "";
        }
        versesContent = $(theLyrics[i]).val();
        theVerses += '{"tones":[' + versesTones + '], "lyrics":"' + versesContent + '"}' + tonesLyricsSeparator;
    }
    var jsonObj = '{"title":"' + theTitle + '", "verses":[' + theVerses + ']}';
    console.log(jsonObj);
    var titleForFile = titleToFileName(theTitle);
    var titleForJson = ',"{"value":"' + titleForFile + '", "title":"' + theTitle + '"}';
    console.log(titleForJson);
}

function titleToFileName(title){
   title = title.toLowerCase();
   title = title.replace(/, /gi, "_");
   title = title.replace(/ /gi, "_");
   title = title.replace(/ą/gi, "a");
   title = title.replace(/ć/gi, "c");
   title = title.replace(/ę/gi, "e");
   title = title.replace(/ł/gi, "l");
   title = title.replace(/ń/gi, "n");
   title = title.replace(/ó/gi, "o");
   title = title.replace(/ś/gi, "s");
   title = title.replace(/ź/gi, "z");
   title = title.replace(/ż/gi, "z");
   return title;
}

$('#saveNewLyrics').on('click', setVersesData);