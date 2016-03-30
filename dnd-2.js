$( document ).ready(function() {
 
  $('#collapse1').html( '' );
  $('#collapse2').html( '' );
  $('#collapse3').html( '' );
  $('#dropzone').html( '' );
 

  var segmentList = [ 'CD', 'WU', '60J', '60F', '60S', 'L1', 'L60S', 'L60N', 'SW1', 'HRP' ];

 
  for ( var i=0; i<segmentList.length; i++ ) {
	var temp = '#collapse' + (i%3+1);
    $('<div class="panel-body">' + segmentList[i] + '</div>').data( 'segment', segmentList[i] ).attr( 'id', 'card'+segmentList[i] ).appendTo( temp ).draggable({
		cursor: 'move',
		revert: true,
		revertDuration: 200
	});
  }
  

  $('<div>Drop Here!</div>').data( 'number', i ).attr('id', 'marker1').appendTo( '#dropzone' ).droppable( {
	//accept: '#collapse1 div',
    hoverClass: 'hovered',
    drop: dropToList
  });
});

var count = 0;
function dropToList( event, ui ) {
  
  var slotNumber = $(this).data( 'number' );
  var segment = ui.draggable.data( 'segment' );
  var parentElement = ui.draggable.parent()
  if(ui.draggable.parent('.draglist').length){
	var test = $(this).attr('id');
	if($('#marker1').length != 0){
		$('#marker1').remove();
		$('<div class="panel-body clickable">' + segment + '</div>').data('segment', segment).attr('id', 'drop'+count).appendTo('#dropzone').draggable({
			cursor: 'move',
			revert: true,
			revertDuration: 0
		}).droppable({
			accept: '.draglist div, #dropzone div',
			drop: dropToList
		});
		count++;
		
		
	} else {
		$('<div class="panel-body clickable">' + segment + '</div>').data('segment', segment).attr('id', 'drop'+count).insertAfter('#'+test).draggable({
			cursor: 'move',
			revert: true,
			revertDuration: 0
		}).droppable({
			accept: '.draglist div, #dropzone div',
			drop: dropToList
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

function updateDetails($element){
	$('#timeframe').val($element.data('segment'));

}

var finalList;
function updateList(){
	finalList = [];

	$('#dropzone').children().each(function (){
		if($(this).attr('id')!='marker1' && $(this).attr('id')!='marker2'){
			//$('<p>'+$(this).attr('id')+'</p>').appendTo('#dialog');)
			finalList.push($(this).data('segment'));
		}
	});
	
	$('.clickable').each(function() {
		var $this = $(this);
		$this.on("click", function(){
			updateDetails($this);
		});
	}); 
}