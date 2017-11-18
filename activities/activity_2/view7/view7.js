var counter = 0;


toggleServiceInformationIcon('hide');


/*
activity.correctAnswer(false);
$('#ccContent > #cctxt').html(module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task[0]);
audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + (self.currentTask + 1) + ".mp3", function() {
    toggleCCBar('hide');
});
*/

$(".scanner-container").draggable({
	drag: function() {
		drawWire();
	},
	containment: $('#simulationContainer > #dragContainment').show()
});
	
// $('.wrongaud').off("click").click(function() {   
$('.wrongaud').off('click'); 
$('.wrongaud').on('click', function(event) {
    event.stopPropagation();    
    event.preventDefault();
    activity.incorrectAnswer();
    if (activity.hinting) {
        $('.correctSel').addClass('highlight');
    }
});

// $('#calibration .wrongaud').click(function() {
//     activity.incorrectAnswer();
//     if (activity.hinting) {
//         $('.correctSel').addClass('highlight');
//     }
// });

/***************************************************************************************
 * 
 * 
 * TASK 1
 * 
 * 
 ***************************************************************************************/


$('#module .correctSel').off("click").click(function(){

    $(this).removeClass('highlight');
    activity.correctAnswer();

    $('#secContent').css('display', 'block');
    setTimeout(function(){
        counter = 0;//Reset Counter
        $('.correctSel').removeClass('highlight');
        $('#module').css('display', 'none');
        $('#calibration').css('display', 'block');
		
		$(".scanner-menu.text1").hide();
		$(".scanner-menu.text2").show();
    },1000);
});


/***************************************************************************************
 * 
 * 
 * TASK 2
 * 
 * 
 ***************************************************************************************/

//Below Function is Dropdown Menu selection function.
$('#selectFix2').off('change'); 
$('#selectFix2').change(function(event) { 
//$('#selectFix2').change(function(evt) {
    event.stopPropagation();    
    event.preventDefault();
    if ($('#selectFix2 option:selected').val() == 111111) {
		$('#selectFix2').removeClass("highlight");
        $('.section3').css('visibility', 'visible');
        $('#selectFix2').attr('disabled', 'disabled');
        activity.correctAnswer();
    } else {
		activity.incorrectAnswer();
		if (activity.hinting) {
			$('#selectFix2').addClass("highlight");
			$("#selectFix2").val("111111");
			$('.section3').css('visibility', 'visible');
        	$('#selectFix2').attr('disabled', 'disabled');
			activity.correctAnswer();
		}
        //$('.section3').css('visibility', 'hidden');
    }
});


/***************************************************************************************
 * 
 * 
 * TASK 3
 * 
 * 
 ***************************************************************************************/

// $('.section3 li').off("click").click(function() {
//     $('#selectFix2').removeClass("highlight");
// });

$('#calibration .correctSel').off("click").click(function(){
    $('.nextBtn').prop('disabled', false);
        activity.correctAnswer();
        counter = 0;//Reset Counter
        $('.correctSel').removeClass('highlight');
        $('#orgPgm').css('display','block');
        $('#calibration .correctSel').off("click");

});

$('.section3 .correctSel').click(function(){
    $('.section3').hide()
    $('.section3a').show()
    $('#calSelect .nextBtn').addClass('correctSel')
});






// $('#calibration').click(function(evt){
//     //activity.correctAnswer();
//     $('#calibration').css('display', 'none');
//     $('#progress').css('display', 'block');
//     move(evt);

// });

/***************************************************************************************
 * 
 * 
 * TASK 4
 * 
 * 
 ***************************************************************************************/



$('.nextBtn').off("click").click(function(){
     $(this).removeClass('highlight');
     $('#calibration').css('display', 'none');
     $('#progress').css('display', 'block');
     move();
    activity.correctAnswer();
});

var width = 10;
function move(event){
    //activity.correctAnswer();
    $('#calibration').css('display', 'none');
    $('#progress').css('display', 'block');
    //activity.correctAnswer();
    
    $(".scanner-menu.text2").hide();
    $(".scanner-menu.text1").show();

    var elem = document.getElementById('myBar');
    var id = setInterval(frame,10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);


            //show/hide next button for assessment
            $('#nextProgress, #progress .nextBtn').hide();
            //activity.correctAnswer();
            $('.nextBtnAssessment').show();
            

        }else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
        }
    }
}




/***************************************************************************************
 * 
 * 
 * TASK COMPLETED
 * 
 * 
 ***************************************************************************************/


$('#progress .nextBtnAssessment').off("click").click(function(){
    activity.correctAnswer();
    $('.nextBtnAssessment').prop('disabled', true);
});



function drawWire() {
	/** Redraw wire connection while scanner pin is being dragged **/
	var zoomRatio = 1;
    var mainLeft = $("#activity2-view7").offset().left;
    var mainTop = $("#activity2-view7").offset().top;
	
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

	$("#positiveWireContainer path").attr("d", "M 470 555 Q 295 695 " + endX + " " + endY);
}