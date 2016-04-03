$( document ).ready(function() {
 
  $('#collapse1').html( '' );
  $('#collapse2').html( '' );
  $('#collapse3').html( '' );
  $('#dropzone').html( '' );
 

  var segmentList = [ 'CD', 'WU', '60J', '60F', '60S', 'L1', 'L60S', 'L60N', 'SW1', 'HRP' ];

 
  for ( var i=0; i<segmentList.length; i++ ) {
	var temp = '#collapse' + (i%3+1);
    $('<div class="panel-body">' + segmentList[i] + '</div>')
	.data( 'segment', {segmentId: segmentList[i], reapeatTime: 100, isTime: true, isStory: false, storyDelay: 0} )
	.attr( 'id', 'card'+segmentList[i] )
	.appendTo( temp )
	.draggable({
		cursor: 'move',
		revert: true,
		revertDuration: 200
	});
  }
  

  $('<div>Drop Here!</div>').attr('id', 'marker1').appendTo( '#dropzone' ).droppable( {
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
		$('<div class="panel-body clickable">' + segment.segmentId + '</div>')
			.data('segment', segment)
			.attr('id', 'drop'+count)
			.appendTo('#dropzone')
			.draggable({
				cursor: 'move',
				revert: true,
				revertDuration: 0
		}).droppable({
			accept: '.draglist div, #dropzone div',
			drop: dropToList
		});
		count++;
		
		
	} else {
		$('<div class="panel-body clickable">' + segment.segmentId + '</div>')
		.data('segment', segment)
		.attr('id', 'drop'+count)
		.insertAfter('#'+test)
		.draggable({
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

var $selectedElement = null;
var finalList;
function updateList(){
	finalList = [];

	$('#dropzone').children().each(function (){
		if($(this).attr('id')!='marker1'){
			finalList.push($(this));
		}
	});
	
	$('.clickable').each(function() {
		var $this = $(this);
		$this.on("click", function(){
			if($selectedElement == $this){
				$(this).removeClass("panel-footer").addClass("panel-body");
				$selectedElement = null;
			} else {	
				$($selectedElement).removeClass("panel-footer").addClass("panel-body");
					
				$selectedElement = $this;
				$($selectedElement).removeClass("panel-body").addClass("panel-footer");
				$('#timeframe').val($this.data('segment').segmentId)
			}
		});
	}); 
}

$(function() {
    $( "#btnSet" ).button().click(function( event ) {
        event.preventDefault();
		$selectedElement.data('segment', $('#timeframe').val());
		alert($selectedElement.data('segment').segmentId);
    });
});

$(function() {
	$("#btnDelete").button().click(function( event ) {
		event.preventDefault();
		$selectedElement.remove();
		updateList();
		if(finalList.length == 0){
			$('<div>Drop Here!</div>').attr('id', 'marker1').appendTo( '#dropzone' ).droppable( {
				hoverClass: 'hovered',
				drop: dropToList
			});
		}
	})
})
