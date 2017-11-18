var task12 = function () {

    /*$('body').off('click').on('click', '.trunk-btn', function () {
        
    });*/

    $(".trunk-btn").off("click").on("click", function(){
        $('#activity2-view9 .car').addClass('open-trunk');
        $(".lock-btn, .open-btn, .panic-btn, .trunk-btn").off("click");
        $('trunk-btn').hide();
        setTimeout(function () {
            $('.trunk-btn').removeClass('highlight');
            activity.correctAnswer();
        }, 1000);
    });

    $(".lock-btn, .open-btn, .panic-btn").off("click").on("click", function () {
        activity.incorrectAnswer();
        if(activity.hinting){
            $('.trunk-btn').addClass('highlight');
        }
    });

};


(function () {

    toggleToolTrayIcon('hide');
    togglePartsDepartmentIcon('hide');
    task12();
    
})($)
