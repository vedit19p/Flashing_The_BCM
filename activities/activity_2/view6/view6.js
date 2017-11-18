var wrongAnswerCounter = 0;

$(function() {
	$("#toolTrayIcon").hide();
	
	$(".scanner-container").draggable({
		drag: function() {
			drawWire();
		},
		containment: $('#simulationContainer > #dragContainment').show()
	});
	
	/** Checks the id of the drop down menu and gets the value of the selected option **/
	$("select").off("change").change(function(){
		// Remove any highlights from previous drop down menus
		$("select").each(function() {
			$(this).removeClass("highlight");
		});
		
		var dropName = $(this).attr("id");
		var valueCheck = $("#" + dropName + " :selected").attr("class");
		
		/** If selected option is correct, then proceed to next drop down **/
		/** If selected option is incorrect, add to wrong counter and allow user to try again **/
		if (valueCheck === "correctValue") {
			activity.correctAnswer();
			nextDropDown(dropName);
		}
		else if(valueCheck === "correctValueNextTask"){
			/*activity.taskBoxContent = ["That's Correct."];
			activity.audioPlayList = ['assets/audio/ThatsCorrect.mp3'];
			if(audioSequencePlayer || audioPlayer) {
				audioSequencePlayer.pause();
				audioPlayer.pause();
			}
			//Play Audio
			activity.audioBox(activity.audioPlayList, activity.taskBoxContent, function () {
				toggleCCBar('hide');
			});*/
			//Play audio correct
			//$(".selectButton").addClass("enabled").prop("disabled", false);
			vehicleDetails();
		}
		else {
			activity.incorrectAnswer();
			
			if (activity.hinting) {
				//$("#" + dropName).find(".correctValue").attr("selected", true);
				$("#" + dropName + "").children("option.correctValue").attr("selected", "selected");
				$("#" + dropName + "").children("option.correctValueNextTask").attr("selected", "selected");
				$("#" + dropName + "").trigger("change");
				$(this).addClass("highlight");
				//wrongAnswerCounter = 0;
				//activity.correctAnswer();
				//nextDropDown(dropName);
			}
		}
	});

	// $(document).on('click', '.selectButton', function () {
	// 	$("#section1").hide();
	// 	$("#section2").show();
	// 	$("#vin-number").show('slow', function() {
	// 		setTimeout(function() {activity.correctAnswer()}, 1500);
	// 	});
	// });
});

//When engine is selected
//Play correct audio



/** Disable current drop down menu and enable the next one **/
function nextDropDown(dropName) {
	switch(dropName) {
		case "drop1":
			$("#drop1").prop("disabled", true);
			$("#drop2").prop("disabled", false);
			break;
		case "drop2":
			$("#drop2").prop("disabled", true);
			$("#drop3").prop("disabled", false);
			break;
		case "drop3":
			$("#drop3").prop("disabled", true);
			$("#drop4").prop("disabled", false);
			break;
		case "drop4":
			$("#drop4").prop("disabled", true);
			break;
		default:
			break;
	}
}
/** Show correct VIN after pressing the Select Vehicle button **/
function vehicleDetails() {
	$("#section1").hide();
	$("#section2").show();
	$("#vin-number").fadeIn('slow', function() {
		setTimeout(function() {activity.correctAnswer()}, 1500);
	});
}

function drawWire() {
	/** Redraw wire connection while scanner pin is being dragged **/
	var zoomRatio = 1;
    var mainLeft = $("#activity2-view6").offset().left;
    var mainTop = $("#activity2-view6").offset().top;
	
    var startX = ($("#scanToolConnector").offset().left - mainLeft) / zoomRatio;
    startX = startX + $("#scanToolConnector").width() / 2;
    startX = startX - 28;
	
    var startY = ($("#scanToolConnector").offset().top - mainTop) / zoomRatio;
    startY = startY + $("#scanToolConnector").height() - 2;
	startY = startY - 47;
	
	$("#fixedWire").attr("d", "M 361 412 Q 516 563 " + startX + " " + startY);
	
	/** Adjust position of scanner usb connector **/
	var scannerTopPos = $("#scanToolConnector").offset().top + 300;
	var scannerLeftPos = $("#scanToolConnector").offset().left + 214;
	$(".scanner-connection").offset({ top: scannerTopPos, left: scannerLeftPos });
	
	/** Redraw wire connection between scanner and computer **/
	var endX = scannerLeftPos - 107;
    var endY = scannerTopPos - 4;

	$("#positiveWire").attr("d", "M 470 555 Q 295 695 " + endX + " " + endY);
}