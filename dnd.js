$( document ).ready(function() {
 
  $('#segmentlist').html( '' );
  $('#droplist').html( '' );
 

  var segmentList = [ 'CD', 'WU', '60J', '60F', '60S', 'L1', 'L60S', 'L60N', 'SW1', 'HRP' ];

 
  for ( var i=0; i<segmentList.length; i++ ) {
    $('<div>' + segmentList[i] + '</div>').data( 'segment', segmentList[i] ).attr( 'id', 'card'+segmentList[i] ).appendTo( '#segmentlist' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true,

    } );
  }
  
  var def = [ 'front', 'back' ];
  for ( var i=1; i<=def.length; i++ ) {
    $('<div>' + def[i-1] + '</div>').data( 'number', i ).attr('id', 'marker'+i).appendTo( '#droplist' ).droppable( {
      accept: '#segmentlist div',
      hoverClass: 'hovered',
      drop: handleDrop
    } );
  } 
 
});

var count = 0;
function handleDrop( event, ui ) {
  
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
  updateList();
}
var finalList;
function updateList(){
	finalList = [];

	$('#droplist').children().each(function (){
		if($(this).attr('id')!='marker1' && $(this).attr('id')!='marker2'){
			//$('<p>'+$(this).attr('id')+'</p>').appendTo('#dialog');)
			finalList.push($(this).data('segment'));
		}
	});
}