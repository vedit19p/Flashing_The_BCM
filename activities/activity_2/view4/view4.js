
//var wrongAnswerCounter = 0;

$( function() {
/***************************************************************************************
 * 
 * 
 * Show Service Information
 * 
 * 
 ***************************************************************************************/

toggleServiceInformationIcon('show');


/***************************************************************************************
 * 
 * 
 * Scan Tool DLC
 * 
 * 
 ***************************************************************************************/

    $('#scantool').draggable({
		containment: $('#simulationContainer > #dragContainment').show()
	});
    
    $('#scantool').click(function(){
    	 $('#scanToolDLc, #pin').show();
	});
	
	$('#scanToolDLc').draggable({
		drag: function() {
			drawWire();
		},
		containment: $('#simulationContainer > #dragContainment').show()
	});


 /***************************************************************************************
 * 
 * 
 * Wrong Item Click
 * 
 * 
 ***************************************************************************************/


	$('.wrongItem').off("click").click(function() {
  		activity.incorrectAnswer();
		if (activity.hinting) {
			$(this).parent().find(".hintHighlight").show();
		}
	});
	
	$('.correctItem').off("click").click(function() {
        var itemId = $(this).attr('id');
		correctItem(itemId);
    });



 
});//End Document On Ready


/***************************************************************************************
 * 
 * 
 * Correct Item From Scan List
 * 
 * 
 ***************************************************************************************/	

   
  function correctItem(id) {
  	switch (id) {
		case 'itemOne':
			activity.correctAnswer();
			$('#mainMenu').hide();
			$('#vehicleType').show();
			break;
		case 'itemTwo':
			activity.correctAnswer();
			$('#vehicleType').hide();
			$('#productType').show();
			break;
		case 'itemThree':
			activity.correctAnswer();
			$('#productType').hide(); 
			$('#modelYear').show();       
			break;
		case 'itemFour':
			activity.correctAnswer();
			$('#modelYear').hide(); 
			$('#serviceProgrammingSystem').show();       
			break;
      }
  }

 function drawWire() {
	/** Redraw wire connection while scanner is being dragged **/
	var zoomRatio = 1;
    var mainLeft = $("#carBg").offset().left;
    var mainTop = $("#carBg").offset().top;
	
    var startX = ($("#scanToolDLc").offset().left - mainLeft) / zoomRatio;
    startX = startX + $("#scanToolDLc").width() / 2;
    startX = startX - 106;
	
    var startY = ($("#scanToolDLc").offset().top - mainTop) / zoomRatio;
    startY = startY + $("#scanToolDLc").height() - 2;
	startY = startY - 432;
	
	$("#positiveWire").attr("d", "M 280 381 C 500 730, 158 10, 400 80 S 600 -50, " + startX + " " + startY);
}