
var wrongAnswerCounter = 0;
var topPos, leftPos;
var wireTopPos, wireLeftPos;
var newTopPos, newLeftPos;
var newWireTopPos, newWireLeftPos;
var usbX = 0, usbY = 0;
var pinDropped = false;


$(function() {
/***************************************************************************************
 * 
 * 
 * Drag and Drop
 * 
 * 
 ***************************************************************************************/

  $(".scanner-container").draggable({
		drag: function() {
			drawWire();
		},
		containment: $('#simulationContainer > #dragContainment').show()
	});
	
  $("#pin").draggable({ 
  	drag: function() { 
		$("path").css("transition", "d 0s");
		drawPinWire();
	},
  
    revert: function(is_valid_drop){
        if(!is_valid_drop){
          notCorrect('pin');
          activity.incorrectAnswer();
          /*
           console.log("incorrect", is_valid_drop);
		   $("path").attr("d", "M369,392 Q285,382 214,357");
		   $("path").css("transition", "d 0s");
           notCorrect('pin');
           return true;
          */
        } else {
           console.log("correct", is_valid_drop.attr('id'));
        }
      },
    
      snapTolerance:100,
      create: function(){$(this).data('position',$(this).position())},
      containment: $('#simulationContainer > #dragContainment')
  });
    //Drop Zones
   $("#computerConnect").droppable({
    //Correct answer
    accept: '#pin',
    drop: function(event, ui) {
		activity.correctAnswer();
		
		pinTopPos = parseInt($("#computerConnect").offset().top) - 10;
		pinLeftPos = parseInt($("#computerConnect").offset().left) - 65;
		
		//$(ui.draggable).css('top', pinTopPos);
		//$(ui.draggable).css('left', pinLeftPos);
		$(ui.draggable).css('top','304px');
		$(ui.draggable).css('left', '422px');
		
		$('#hintHighlight1').hide();
		$('#usb').draggable("enable");
		
		wireTopPos = pinTopPos + 40;
		wireLeftPos = pinLeftPos + 15;
		
		//$('#positiveWire').attr("d", "M385,510 Q227,663 " + wireLeftPos + "," + wireTopPos);
		$('#positiveWire').attr("d", "M385,510 Q227,663 440,345");
		
		pinDropped = true;
		wrongAnswerCounter = 0;
		$('#pin').draggable("disable");
	 }
});



  $("#usb").draggable({ 
  	drag: function() { 
		$("path").css("transition", "d 0s");
		drawUsbWire();
	},
	revert: function(is_valid_drop) {
		if (!is_valid_drop) {
      notCorrect('usb');
      activity.incorrectAnswer();
      /*
			console.log("incorrect", is_valid_drop);
			$("path").attr("d", "M 399 256 Q253 376 367 377");
			$("path").css("transition", "d 1s");
			notCorrect('usb');
			return true;
      */
		} else {
			console.log("correct", is_valid_drop.attr('id'));
		}
	},
	//snapTolerance:100,
	create: function(){$(this).data('position',$(this).position())},
	containment: $('#simulationContainer > #dragContainment')
  });
    //Drop Zones
   $("#laptopConnect").droppable({
    //Correct answer
    accept: '#usb',
    drop:function(event, ui) {
		activity.correctAnswer();
		
		$(".scanner-container").css({top: '74px', left: '25px'});
 		$("#pin").css({top: '299px', left: '421px'});
 		$('#positiveWire').attr("d", "M585,569 Q227,663 440,345");
		
		$(ui.draggable).css({transform: 'rotate(0deg)', left: '573px', top: '504px'});
		$('#hintHighlight2').hide();
		$(ui.draggable).addClass('in');
	}
});

   $('#usb').draggable( "disable" );


 
});//End Document On Ready

function drawWire() {
	if (pinDropped == false) {
		/** Redraw wire connection while scanner pin is being dragged **/
		var zoomRatio = 1;
		var mainLeft = $("#viewFive").offset().left;
		var mainTop = $("#viewFive").offset().top;
		
		var startX = ($("#scanToolConnector").offset().left - mainLeft) / zoomRatio;
		startX = startX + $("#scanToolConnector").width() / 2;
		startX = startX + 12;
		
		var startY = ($("#scanToolConnector").offset().top - mainTop) / zoomRatio;
		startY = startY + $("#scanToolConnector").height() - 2;
		startY = startY - 73;
		
		$("#fixedWire").attr("d", "M 387 383 Q 516 563 " + startX + " " + startY);
	} else {
		var scannerCurrentTop = parseInt($(".scanner-container").offset().top);
		var scannerCurrentLeft = parseInt($(".scanner-container").offset().left);
		
		newTopPos = scannerCurrentTop + 183;
		newLeftPos = scannerCurrentLeft + 281;
		newWireTopPos = newTopPos + 40;
		newWireLeftPos = newLeftPos + 16;
		
		$("#pin").css("top", newTopPos);
		$("#pin").css("left", newLeftPos);
		
		if (usbX == 0 && usbY == 0) {
			$("#positiveWire").attr("d", "M" + "385" + "," + "510" + " Q227,663 " + newWireLeftPos + " " + newWireTopPos);
		} else {
			$("#positiveWire").attr("d", "M" + usbX + "," + usbY + " Q227,663 " + newWireLeftPos + " " + newWireTopPos);
		}
	}
}

function drawPinWire() {
	/** Redraw wire connection while usb cable is being dragged **/
	var zoomRatio = 1;
    var mainLeft = $("#carBg").offset().left;
    var mainTop = $("#carBg").offset().top;
	
    var endX = ($("#pin").offset().left - mainLeft) / zoomRatio;
    endX = endX + 15;
	
    var endY = ($("#pin").offset().top - mainTop) / zoomRatio;
    endY = endY + 40;
	
	$("#positiveWire").attr("d", "M368,527 Q260,590 " + endX + "," + endY);
}

function drawUsbWire() {
	/** Redraw wire connection while usb cable is being dragged **/
	var zoomRatio = 1;
    var mainLeft = $("#carBg").offset().left;
    var mainTop = $("#carBg").offset().top;
	
    usbX = ($("#usb").offset().left - mainLeft) / zoomRatio;
    usbX = usbX + 4;
	
    usbY = ($("#usb").offset().top - mainTop) / zoomRatio;
	usbY = usbY + 67;
	
	var scannerCurrentTop = parseInt($(".scanner-container").offset().top);
	var scannerCurrentLeft = parseInt($(".scanner-container").offset().left);
	
	newTopPos = scannerCurrentTop + 183;
	newLeftPos = scannerCurrentLeft + 281;
	newWireTopPos = newTopPos + 40;
	newWireLeftPos = newLeftPos + 16;
	
	// $("#positiveWire").attr("d", "M" + usbX + "," + usbY + " Q227,663 " + newWireLeftPos + " " + newWireTopPos);
	$("#positiveWire").attr("d", "M" + usbX + "," + usbY + " Q227,663 440 342");
}

 /***************************************************************************************
 * 
 * 
 * Not Correct
 * 
 * 
 ***************************************************************************************/


 function notCorrect(cable){
    wrongAnswerCounter++;
    console.log(cable, wrongAnswerCounter);
    if(wrongAnswerCounter === 3){
        if(cable === 'pin'){$('#hintHighlight1').show()};
        if(cable === 'usb'){$('#hintHighlight2').show();}
     wrongAnswerCounter = 0;
    }
 }