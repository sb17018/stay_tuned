$('#addToneBtn').on('click', addTone);
$('#removeToneBtn').on('click', removeTone);

$('#addVerseBtn').on('click', addVerse);
$('#removeVerseBtn').on('click', removeVerse);

var theInitialTone = $('.tone-over-lyrics');
// console.log(theInitialTone);
createSelectionElement(theInitialTone[theInitialTone.length-1]);
selectVerse($('#verseNumber_0'));

var chosenVerse;

var toneInVerseCount = 1;

function addTone(){
	if(chosenVerse.attr('id')!='verseNumber_0'){
		toneInVerseCount = howManyTonesInVerse();
		if(toneInVerseCount<6){
			var theTone = $('.verse-section').children('div').first();
			var newTone = theTone.clone();
			var currentlyChosenTone = $(chosenVerse).children('.verse-section').last().children('.tone-over-lyrics').last();
			if(isNextWithinLineWidth(currentlyChosenTone)){
				var thePrescWidth = currentlyChosenTone.width();
				var thePrescPosition = currentlyChosenTone.position().left;
				var newTonePosition = thePrescPosition + thePrescWidth + 20;
				newTone.css('left', newTonePosition +'px');
				var newToneId = 'toneOverLyrics_' + setToneHeaderId();
				newTone.prop('id', newToneId);
				newTone.prop('mouseover', 'getMyId(this)');
				currentlyChosenTone.after(newTone);
				var elemnt = document.getElementById(newToneId);
				createSelectionElement(elemnt);
			}
		}
	}
}

function removeTone(){
	toneInVerseCount = howManyTonesInVerse();
	if(toneInVerseCount>1){
		chosenVerse.children('.verse-section').last().children('.tone-over-lyrics').last().remove();
		chosenVerse.children('.verse-section').last().children('.tone-line').last().children('select ').last().remove();
		chosenVerse.children('.verse-section').last().children('.tone-line').last().children('.the-arrowhead').last().remove();
	}
}

function addVerse(){
	var howManyVerses = $('.verse').length;
	//to create verse
	$('#display').append('<div id="verseNumber_'+ (howManyVerses + 1) + '" class="verse"></div>');
	$('#verseNumber_' + (howManyVerses + 1)).append('<div id="verseSectionNumber_'+ (howManyVerses + 1) + '" class="verse-section"></div>');
	$('#verseSectionNumber_' + (howManyVerses + 1)).append('<div id="toneOverLyrics_'+ ($('.tone-over-lyrics').length + 1) + '" class="tone-over-lyrics" onmouseover="getMyId(this)"><div class="tone-over-lyrics-header">DRAG</div></div>');
	$('#verseSectionNumber_' + (howManyVerses + 1)).append('<div id="toneLine_'+ (howManyVerses + 1) + '" class="tone-line"></div><br/>');
	$('#verseSectionNumber_' + (howManyVerses + 1)).append('<input type="text" id="lyricsField_'+ (howManyVerses + 1) + '" class="lyrics-field">');
	$('#verseNumber_' + (howManyVerses + 1)).attr('onclick', 'selectVerse(this), defineSelectionPlaceholderId(this)');
	var theInitialTone = $('.tone-over-lyrics');
	// console.log(theInitialTone);
	createSelectionElement(theInitialTone[theInitialTone.length-1]);
}

function removeVerse(){
	var howManyVerses = $('.verse').length;
	if(howManyVerses>1){
		console.log("AAAA");
		$('#display').children('.verse').last().remove();
	}
}

function selectVerse(elem){
	var theVerseId = $(elem).attr('id');
	$('.verse').each(function(){	
		if($(this).attr('id')==theVerseId){	
			$(this).addClass('verse-clicked');
			$(this).children('.verse-section').last().children('input').last().addClass('lyrics-field-chosen');
			$(this).children('.verse-section').last().children('input').last().focus();
		}
		else{
			$(this).removeClass('verse-clicked');
			$(this).children('.verse-section').last().children('input').last().removeClass('lyrics-field-chosen');
		}	
	});
	chosenVerse = $(elem);
}

function setToneHeaderId(){
	var toneHeadersNumber = $('.tone-over-lyrics-header').length + 1;
	return toneHeadersNumber;
}

function isNextWithinLineWidth(newTone){
	var theVerses = document.getElementsByClassName("verse-section");
	if(parseInt(newTone.css('left')) > (theVerses[0].offsetLeft + theVerses[0].clientWidth - 2*parseInt(newTone.css('width')))){
	  	return false;
	}
	else{
		return true;
	}
}

function howManyTonesInVerse(){
	var numberOfTonesInVerse = $(chosenVerse).children('.verse-section').last().children('.tone-line').last().children('select').length;
	return numberOfTonesInVerse;
}