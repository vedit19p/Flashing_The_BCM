(function() {
    //$('body').off("click").on('click', '#PwrSupply', function () {
	$('#PwrSupply').off("click").on("click", function() {
        $('#PwrSupply').removeClass('highlight_1');
        $('#PowerSupplyId').removeClass('PowerSupplyBlock').addClass('PowerSupplyResult');
        $("#PowerSupplyId").show();
        $('#charGing, #batterySupply, #arrows, #powerSupplyBtn, #PwrSupply').hide();
    	activity.correctAnswer();
    });

    //$('body').off("click").on('click', '#charGing, #batterySupply, #arrows, #powerSupplyBtn', function () {
	$('#charGing, #batterySupply, #arrows, #powerSupplyBtn').off("click").on("click",function() {
        activity.incorrectAnswer();
        if(activity.hinting){
            $('#PwrSupply').addClass('highlight_1').hide().show();
        }
    });
})($);