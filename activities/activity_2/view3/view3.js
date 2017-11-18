$(function() {
	$("#toolTrayIcon").show();
	activity.incorrectTaskAmount = 3;
	var dlcScannerMovement = 0;
	
	$('.tools').eq(0).attr("id", "dlcScanner");
	$('#dlcScanner').draggable({
		drag: function() {
			dlcScannerMovement = $("#dlcScanner").offset().left;
			console.log('dlcScannerMovement -> ' + dlcScannerMovement);
			if (dlcScannerMovement < 1286) {
				$('#dlcScanner').click();
			}
		},		
		revert: function(dropped) {
        	if (!dropped) { 
		   		activity.incorrectAnswer();
				incorrectResponse($('#dlcScanner'));
		   	}
           return !dropped;
        },
		containment: $('#simulationContainer > #dragContainment').show()
	});
	
	/** Choose correct tool from the tray container. After 3 incorrect attempts the correct tool is highlighted. **/
	$(".tools").off("click").click(function(e) {
		e.stopPropagation();
        var toolIdx = $('#toolTray #contentInner div').index(this);
		if (toolIdx == 0) {
			$('#dlcScanner').draggable({ disabled: true });
			$('#dlcScanner').removeAttr("id");
			
			$(this).removeClass("highlight");
			$('#toolTray').animate({right:'-186px'}, {queue: false, duration: 500});
			$('#toolTray').removeClass('tray-open').addClass('tray-closed');
			$("#toolTrayIcon").hide();
			
			$('.tools').eq(0).hide();
			activity.correctAnswer();
			openScanTool();
		} else {
			activity.incorrectAnswer();
			incorrectResponse($(".tools").eq(0));
		}
    });
});

function openScanTool() {
	/** Remove tray container and show DLC scanner tool **/
	$("#trayContainer").css("right", "-200px");
	$("#trayContainer").removeClass("visible");	
	$(".lead, .wire, .pin, #scanToolConnector").show();
	$('.lead').draggable({
		drag: function() {
			drawWire();
		},
		containment: $('#simulationContainer > #dragContainment').show()
	});
	connectScanTool();
}

function connectScanTool() {
	/** Drag scanner cord to car port. After 3 incorrect attempts the correct area is highlighted. **/
	setTimeout(function() {	
	$(".pin").draggable({
		drag: function() { 
			$("path").css("transition", "d 0s");
			drawWire();
		},
		revert: function(dropped) {
           if (!dropped) {
			   $("path").attr("d", "M313 447 C 500 730, 158 10, 400 80 S 600 -50, 608 73");
			   $("path").css("transition", "d 1s");
			   activity.incorrectAnswer();
			   incorrectResponse("#dlcConnectorHighlight");
		   }
           return !dropped;
        },
		snapTolerance: 100,
		containment: $('#simulationContainer > #dragContainment').show()
	});
	}, 9000);
	$("#dlcConnector").droppable({
		accept: ".pin",
		drop: function() {
			$(".pin").css("top", "289px");
			$(".pin").css("left", "310px");
			$(".pin").css("transform", "rotate(2deg)");
			$(".pin").draggable("disable");
			$("path").attr("d", "M280 381 C 500 730, 158 10, 400 80 S 600 -50, 608 73");
			$("#dlcConnectorHighlight").removeClass("highlight");

			activity.correctAnswer();
			turnOnScanner();
		}
	});
}
 
function turnOnScanner() {
	/** Click the scanner power button. After 3 incorrect attempts the correct button is highlighted. **/
	$(".scanner-button").show();
	$(".scanner-button").click(function() {
    	var button = $(this).attr("id");
		if (button === "button_1") {
			$("#button_1").removeClass("highlight");
			$("#powerButtGreen").addClass("powerButtGreenAdd");
			activity.correctAnswer();		
			$(".scannerScreen").fadeIn();
		} else {
			activity.incorrectAnswer();
			incorrectResponse("#button_1");
		}
    });
}
 
 function incorrectResponse(element) {
	/** Highlight correct area after 3 incorrect responses **/
	 if (activity.hinting) {
		 $(element).addClass("highlight");
	 }
 }
 
 function drawWire() {
	/** Redraw wire connection while scanner pin is being dragged **/
	var zoomRatio = 1;
    var mainLeft = $("#carContainer").offset().left;
    var mainTop = $("#carContainer").offset().top;
	
    var startX = ($("#positiveLead").offset().left - mainLeft) / zoomRatio;
    startX = startX + $("#positiveLead").width() / 2;
    startX = startX - 106;
	
    var startY = ($("#positiveLead").offset().top - mainTop) / zoomRatio;
    startY = startY + $("#positiveLead").height() - 2;
	startY = startY - 436;
	
    var endX = ($("#positivePin").offset().left - mainLeft) / zoomRatio;
    endX = endX - 29;
	
    var endY = ($("#positivePin").offset().top - mainTop) / zoomRatio;
    endY = endY + 87;
	
	$("#positiveWire").attr("d", "M" + endX + " " + endY + " C 500 730, 158 10, 400 80 S 600 -50, " + startX + " " + startY);
}

/** Lock screen function. I was using that to lock all of view3 dusing narrative time. but which let to locking other views as well.**/
// (function($) {
// 	$.extend({
// uiLock: function(content){
// 			if(content == 'undefined') content = '';
// 			$('<div></div>').attr('id', 'uiLockId').css({
// 				'position': 'absolute',
// 				'top': 0,
// 				'left': 0,
// 				'z-index': 1000,
// 				'opacity': 0.6,
// 				'width':'100%',
// 				'height':'100%',
// 				'color':'white'
// 			}).html(content).appendTo('#contentContainer');
// 		},
// uiUnlock: function(){
// 			$('#uiLockId').remove();
// 		}
// 	});
// })(jQuery);

