 
var correctCards = 0;
$( init );
 
function init() {
 
  $('#segmentlist').html( '' );
  $('#droplist').html( '' );
 
  // Create the pile of shuffled cards
  var numbers = [ 'CD', 'WU', '60J', '60F', '60S', 'L1', 'L60S', 'L60N', 'SW1', 'HRP' ];

 
  for ( var i=0; i<numbers.length; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'segment', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#segmentlist' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true,
	  //helper: 'clone'
    } );
  }
 
 
  // Create the card slots
  /*$('<div>Drop Here!</div>').data('segment', 'none').appendTo('#droplist').droppable({
	accept: '#segmentlist div',
	//hoverClass: 'hovered',
	drop: handleDrop
  })*/
  
  var words = [ 'front', 'back' ];
  for ( var i=1; i<=words.length; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).attr('id', 'marker'+i).appendTo( '#droplist' ).droppable( {
      accept: '#segmentlist div',
      hoverClass: 'hovered',
      drop: handleDrop
    } );
  } 
 
}

var count = 0;
function handleDrop( event, ui ) {
  //var dragData = ui.draggable.data( 'segment' );
  
  var slotNumber = $(this).data( 'number' );
  var segment = ui.draggable.data( 'segment' );
  
  if(ui.draggable.parent('#segmentlist').length){
	var test = $(this).attr('id');
	if(test != 'marker1'){
		$('<div>' + segment + '</div>').data('segment', segment).attr('id', 'drop'+count).insertBefore('#'+test).draggable({
			containment: '#content',
			stack: '#cardPile div',
			cursor: 'move',
			revert: true,
			revertDuration: 0
		}).droppable({
			accept: '#segmentlist div, #droplist div',
			hoverClass: 'hovered',
			drop: handleDrop
		});
	count++;
	} else {
		$('<div>' + segment + '</div>').data('segment', segment).attr('id', 'drop'+count).insertAfter('#'+test).draggable({
			containment: '#content',
			stack: '#cardPile div',
			cursor: 'move',
			revert: true,
			revertDuration: 0
		}).droppable({
			accept: '#segmentlist div, #droplist div',
			hoverClass: 'hovered',
			drop: handleDrop
		});
	count++;
	}
  } else {
	var prevId = $(this).attr('id');
	var currId = ui.draggable.attr('id');
	
	$('#'+prevId).before($('#'+currId));
  }
  theTest();
}
var finalList;
function theTest(){
	finalList = [];

	$('#droplist').children().each(function (){
		if($(this).attr('id')!='marker1' && $(this).attr('id')!='marker2'){
			//$('<p>'+$(this).attr('id')+'</p>').appendTo('#dialog');)
			finalList.push($(this).data('segment'));
		}
	});
	
	// **********
	//displays the finalList-- debug only!
	$('#dialog').empty();
	$('<p>List Order:</p>').appendTo('#dialog');
	finalList.forEach(function(entry){
		$('<p>'+entry+'</p>').appendTo('#dialog');
	});
}