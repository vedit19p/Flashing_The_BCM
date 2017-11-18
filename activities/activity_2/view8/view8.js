var rotateIgnSwitchData = [58, 92, 114, 142];
var rotateFanDialData = [0, 45,  92, 100, 121, 150];
 var zoomRatio = 1, xEndPoint = 0, yEndPoint = 0, zoomElem;
 var degree;
  var rotateData = [[295, 335, 370, 45, 79, 113], 
  ['', '', '', '', '', '']];
  var task = 1;
  var badAnswerCounter = 0;


    

     var closest2 = function (closestTo, Arr) {
        var nearest = Arr.reduce(function (prev, curr) {
            return (Math.abs(curr - closestTo) < Math.abs(prev - closestTo) ? curr : prev);
        });
        return nearest;
    }

        

    var setTunerOffset = function (event, ui) {
        console.log('inside setTunerOffset');
        tunerFlag = true;
        $('#dummyTuner').css('transform', 'rotate(0deg)'); //rotate(0deg)
        tunerOffset = $('#dummyTuner').offset();
        zoomElem = $('#dummyPin');
        $('.highlight').hide();

        if (event.target.id == "keyRotate"){
            getL = $('#startKey').offset().left;
            getT = $('#startKey').offset().top;
            getW = document.getElementById("startKey").getBoundingClientRect().width;
            getH = document.getElementById("startKey").getBoundingClientRect().height;
        }
        else {
             getL = $('#ostartKey').offset().left;
            getT = $('#ostartKey').offset().top;
            getW = document.getElementById("ostartKey").getBoundingClientRect().width;
            getH = document.getElementById("ostartKey").getBoundingClientRect().height;
        }
        



    }

    var setFanTunerOffset = function (event, ui) {

            console.log('inside setTunerOffset');
            tunerFlag = true;

            getL = $('#fanObject').offset().left;
            getT = $('#fanObject').offset().top;
            getW = document.getElementById("fanObject").getBoundingClientRect().width;
            getH = document.getElementById("fanObject").getBoundingClientRect().height;

    }

    
   
    


    var isTunerCorrect = function (evt, ui) {
        //console.log(reportData.currentStep,degree);
        //alert('hi');
           //console.log("insde isTunerCorrect888: " + evt.target.id);
           console.log("degree=>" + degree);
            dmmTunerTurned = false;

            if (task == 1){
                if (degree == 58){
                    badAnswerCounter = 0;
                    task = 2;

                    $("#startKey").hide();
                    $("#startKey > #keyRotate").hide();
                    $("#startKey > #igRtHand").hide();

                    $("#ostartKey").show();
                    $("#oigRtHand").show();
                    $("#ostartKey > #okeyRotate").css("transform", "rotate(58deg");
                    

                    $("#ostartKey > #okeyRotate").draggable({ start: setTunerOffset, drag: rotateDegree, handle: '#oigRtHand', stop: isTunerCorrect }).css({ cursor: 'pointer' });
    

                    $("#glowEffect1").hide();
                    activity.correctAnswer();
                }
                else{
                    badAnswerCounter++;

                    if (badAnswerCounter >= 3){
                        $("#glowEffect1").show();
                    }
   
                    activity.incorrectAnswer();
                   
                    
                    
                }
            }
            else if (task == 2){
                if (degree == 114 || degree == 142) { //ON or START position
                    badAnswerCounter = 0;

                    $("#ostartKey").hide();
                    $("#okeyRotate").hide();
                    $("#oigRtHand").hide();

                    $("#startKey").show();
                    $("#igRtHand").show();
                    $("#keyRotate").show();
                    $("#keyRotate").css("transform", "rotate(114deg");

                    $("#keyRotate").draggable({ disabled: true});


                    $("#glowEffect2").hide();

                    activity.correctAnswer();
                }
                else {

                    badAnswerCounter++;

                    if (badAnswerCounter >= 3){
                        $("#glowEffect2").show();
                    }

                    activity.incorrectAnswer();
                   
                }
            }


            /*if (degree == 114 || degree == 142) { //ON or START position
                
                if (task == 2){
                    $("#ostartKey").hide();
                    $("#okeyRotate").hide();
                    $("#oigRtHand").hide();

                    $("#startKey").show();
                    $("#igRtHand").show();
                    $("#keyRotate").show();
                    $("#keyRotate").css("transform", "rotate(114deg");

                    $("#keyRotate").draggable({ disabled: true});
                    activity.correctAnswer();
                }
            

               // activity.correctAnswer();

                
                //alert('got it!');
            }
            else if (degree == 58){ //LOCK
                //activity.correctAnswer();
                task = 2;

                 $("#startKey").hide();
                $("#startKey > #keyRotate").hide();
                $("#startKey > #igRtHand").hide();

                $("#ostartKey").show();
                $("#oigRtHand").show();
                $("#ostartKey > #okeyRotate").css("transform", "rotate(58deg");
                

                $("#ostartKey > #okeyRotate").draggable({ start: setTunerOffset, drag: rotateDegree, handle: '#oigRtHand', stop: isTunerCorrect }).css({ cursor: 'pointer' });
                activity.correctAnswer();
            }
            else{
                //alert('try again.');
                
                if (task == 1){
                    //activity.incorrectAnswer();
                    $("#glowEffect1").show();
                }
                else if (task == 2){
                    //activity.incorrectAnswer();
                    $("#glowEffect2").show();

                }
                
            }   */
    }



    var rotateDegree = function (evt, ui) {
         //$("#fanDial").show();
        console.log("insde rotateDegree: " + evt.target.id);
        dragId = evt.target.id;
        var center_x = getL + ((getW * zoomRatio) / 2);
        var center_y = getT + ((getH * zoomRatio) / 2);
        var rotate_x = evt.pageX;
        var rotate_y = evt.pageY;
        var radians = Math.atan2(rotate_y - center_y, rotate_x - center_x);
        if (dragId == "keyRotate" || dragId == "okeyRotate") {
            degree = (radians * (180 / Math.PI)) + 180;
        }
        if (degree < 0) {
            degree += 360;
        }
        //setrotateData(degree);
        if (dragId == "keyRotate") {
            if (degree < 160 || degree > 20) {
                degree = closest2(degree, rotateIgnSwitchData);
                setrotateData(degree);
            }
        }
        else if (dragId == "okeyRotate"){
            if (degree < 160 || degree > 20) {
                degree = closest2(degree, rotateIgnSwitchData);
               setrotateOtherData(degree);
            }
        }
    }

var changeVoltmeterPos = function (event, ui) {
        //debugger;
        zoomElem = $('#voltmeter');
        var limitX = 780 * zoomRatio;
        var limitY = 140 * zoomRatio;
        if (ui.position.top > limitY) {
            ui.position.top = limitY;
        }
        else if (ui.position.top < 50) {
            ui.position.top = 50;
        }
        if (ui.position.left > limitX) {
            ui.position.left = limitX;
        }
        else if (ui.position.left < 0) {
            ui.position.left = 0;
        }
        ui.position.left = (ui.position.left / zoomRatio);
        ui.position.top = (ui.position.top / zoomRatio);
        $('#voltmeter').css({ top: ui.position.top, left: ui.position.left });
        //drawWire();

    }

    var rotate = function (evt) {
        //debugger;
        console.log('rotate');
        tunerFlag = true;
        var mainLeft = $('#activityContainer').offset().left;
        var mainTop = $('#activityContainer').offset().top;
        var center_x = (tunerOffset.left) + (($('#dummyTuner').width() * zoomRatio) / 2);
        var center_y = (tunerOffset.top) + (($('#dummyTuner').height() * zoomRatio) / 2);
        var rotate_x = evt.pageX; var rotate_y = evt.pageY;
        var radians = Math.atan2(rotate_x - center_x, rotate_y - center_y);
        degree = (radians * (180 / Math.PI) * -1) + 210;
        degree = closest(degree);
        var closestIndex = rotateData[0].indexOf(degree);
        $('#meterReading').html(rotateData[1][closestIndex]);
        setrotateData(degree);
    }

    var rotateDial = function (evt) {
        //debugger;
        console.log('rotate');
        tunerFlag = true;
        var mainLeft = $('#activityContainer').offset().left;
        var mainTop = $('#activityContainer').offset().top;
        var center_x = (tunerOffset.left) + (($('#dummyTuner').width() * zoomRatio) / 2);
        var center_y = (tunerOffset.top) + (($('#dummyTuner').height() * zoomRatio) / 2);
        var rotate_x = evt.pageX; var rotate_y = evt.pageY;
        var radians = Math.atan2(rotate_x - center_x, rotate_y - center_y);
        degree = (radians * (180 / Math.PI) * -1) + 210;
        degree = closest(degree);
        var closestIndex = rotateData[0].indexOf(degree);
        $('#meterReading').html(rotateData[1][closestIndex]);
        setrotateDialData(degree);
    }

    var closest = function (closestTo) {
        var nearest = rotateData[0].reduce(function (prev, curr) {
            return (Math.abs(curr - closestTo) < Math.abs(prev - closestTo) ? curr : prev);
        });
        return nearest;
    }


$(document).ready(function() {
    $('#keyRotate').draggable({ start: setTunerOffset, drag: rotateDegree, handle: '#igRtHand', stop: isTunerCorrect }).css({ cursor: 'pointer' });
    
    $("#ostartKey").hide();
    $("#ostartKey > #igRtHand").hide();

    $("#glowEffect1").hide();
     $("#glowEffect2").hide();
    

    $("#ignitionBtn1").off("click").click(function(){
        console.log("push button rotating...58");
    
        if (task == 1){
           setrotateData(58);
            activity.correctAnswer();

            task = 2;

            $("#startKey").hide();
            $("#startKey > #keyRotate").hide();
            $("#startKey > #igRtHand").hide();

            $("#ostartKey").show();
            $("#oigRtHand").show();
            $("#okeyRotate").show();
            $("#ostartKey > #okeyRotate").css("transform", "rotate(58deg");
            

            $("#ostartKey > #okeyRotate").draggable({ start: setTunerOffset, drag: rotateDegree, handle: '#oigRtHand', stop: isTunerCorrect }).css({ cursor: 'pointer' });


            $("#glowEffect1").hide();
            $("#glowEffect2").hide();

            badAnswerCounter = 0;

        }
        else{
            badAnswerCounter++;

            if (badAnswerCounter >= 3){
                $("#glowEffect1").show();
            }

            activity.incorrectAnswer();
        }

        

    });


    $("#ignitionBtn4").off("click").click(function(){
        console.log("just clicked initition button #4");
    
        badAnswerCounter++;

        if (badAnswerCounter >= 3){
            $("#glowEffect1").show();
            $("#glowEffect2").show();
        }

        activity.incorrectAnswer();
    });

    $("#oignitionBtn4").off("click").click(function(){
        console.log("just clicked initition button o#4");
    
        badAnswerCounter++;

        if (badAnswerCounter >= 3){
            $("#glowEffect2").show();
        }

        activity.incorrectAnswer();
    });


    $("#ignitionBtn2, #ignitionBtn3").off("click").click(function(){
        
        if (task == 2){
            setrotateData(114);
            activity.correctAnswer(); 

             $("#ostartKey").hide();
            $("#okeyRotate").hide();
            $("#oigRtHand").hide();

            $("#startKey").show();
            $("#igRtHand").show();
            $("#keyRotate").show();
            $("#keyRotate").css("transform", "rotate(114deg");

            $("#keyRotate").draggable({ disabled: true});


            $("#glowEffect2").hide();
            $("#glowEffect1").hide();

            $("#ignitionBtn2, #ignitionBtn3").off("click");  
        }
        else{
            badAnswerCounter++;

            if (badAnswerCounter >= 3){
                $("#glowEffect2").show();
            }

            activity.incorrectAnswer();
        }    
         
    });

    
});
   

    var rotateKnob = function(evt, ui){
        var currDeg = getRotationDegrees($("#dummyTuner"));
        var newDeg = currDeg + 20;

        $('#knob').css('-moz-transform', 'rotate(' + deg + 'deg)');
        $('#knob').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $('#knob').css('-o-transform', 'rotate(' + deg + 'deg)');
        $('#knob').css('-ms-transform', 'rotate(' + deg + 'deg)');
        $('#knob').css('transform', 'rotate(' + deg + 'deg)');
    }

    function getRotationDegrees(obj) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");
        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            var a = values[0];
            var b = values[1];
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
        } else { var angle = 0; }
        return (angle < 0) ? angle + 360 : angle;
    }



    var setrotateData = function (deg) {
        console.log('setrottedata->' + deg)
        //$("#ostartKey > #igRtHand").hide();

        $('#startKey > #keyRotate').css('-moz-transform', 'rotate(' + deg + 'deg)');
        $('#startKey > #keyRotate').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $('#startKey > #keyRotate').css('-o-transform', 'rotate(' + deg + 'deg)');
        $('#startKey > #keyRotate').css('-ms-transform', 'rotate(' + deg + 'deg)');
        $('#startKey > #keyRotate').css('transform', 'rotate(' + deg + 'deg)');

        /*$('#ostartKey > #keyRotate').css('-moz-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #keyRotate').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #keyRotate').css('-o-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #keyRotate').css('-ms-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #keyRotate').css('transform', 'rotate(' + deg + 'deg)');*/

       
       /* $("#fanKey > #keyRotate").css('-moz-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-o-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-ms-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('transform', 'rotate(' + deg + 'deg)');*/
    }

    var setrotateOtherData = function (deg) {
        console.log('setrotteotherdata->' + deg)
        //$("#ostartKey > #igRtHand").hide();

        $('#ostartKey > #okeyRotate').css('-moz-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #okeyRotate').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #okeyRotate').css('-o-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #okeyRotate').css('-ms-transform', 'rotate(' + deg + 'deg)');
        $('#ostartKey > #okeyRotate').css('transform', 'rotate(' + deg + 'deg)');

       
       /* $("#fanKey > #keyRotate").css('-moz-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-o-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-ms-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('transform', 'rotate(' + deg + 'deg)');*/
    }

    var setrotateDialData = function (deg) {
        console.log('setrotteDialdata->' + deg)
        //$("#ostartKey > #igRtHand").hide();

        $('#dummyTuner, #tuner').css('-moz-transform', 'rotate(' + deg + 'deg)');
        $('#dummyTuner, #tuner').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $('#dummyTuner, #tuner').css('-o-transform', 'rotate(' + deg + 'deg)');
        $('#dummyTuner, #tuner').css('-ms-transform', 'rotate(' + deg + 'deg)');
        $('#dummyTuner, #tuner').css('transform', 'rotate(' + deg + 'deg)');


         //[295, 335, 370, 45, 79, 113],
        var tempText = "";
        if (deg == 335){
            tempText = "42";
            //setFanDialSpeed(1);
            activity.correctAnswer();
        }
        else if (deg == 370){
            tempText = "44";
            //setFanDialSpeed(2);
            activity.correctAnswer();
        }
        else if (deg == 45){
            tempText = "46";
            //setFanDialSpeed(3);
            activity.correctAnswer();
        }
        else if (deg == 79){
            tempText = "48";
            //setFanDialSpeed(4);
            activity.correctAnswer();
        }
        else if (deg == 113){
            tempText = "50";
            //setFanDialSpeed(5);
            activity.correctAnswer();

            //$('#btnContinue').show();
        }



        
        $("#airOutTempText").html(tempText);
       
       /* $("#fanKey > #keyRotate").css('-moz-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-o-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('-ms-transform', 'rotate(' + deg + 'deg)');
        $("#fanKey > #keyRotate").css('transform', 'rotate(' + deg + 'deg)');*/
    }

    var rotateFanDial = function (deg) {
        console.log('setFANrottedata->' + deg)


        $('#fanRotate').css('-moz-transform', 'rotate(' + deg + 'deg)');
        $('#fanRotate').css('-webkit-transform', 'rotate(' + deg + 'deg)');
        $('#fanRotate').css('-o-transform', 'rotate(' + deg + 'deg)');
        $('#fanRotate').css('-ms-transform', 'rotate(' + deg + 'deg)');
        $('#fanRotate').css('transform', 'rotate(' + deg + 'deg)');

        if (deg == 335){
            setFanDialSpeed(1);
        }
        else if (deg == 370){
            setFanDialSpeed(2);
        }
        else if (deg == 45){
            setFanDialSpeed(3);
        }
        else if (deg == 79){
            setFanDialSpeed(4);
        }
        else if (deg == 113){
            setFanDialSpeed(5);
        }



       

    }

    var setFanDialSpeed = function(speed){
        //return;
        var s1 = 2000;
        var s2 = 1100;
        var s3 = 900;
        var s4 = 700;
        var s5 = 500;

        var p1 = 0;
        var p2 = -124;
        var p3 = -240;
        var p4 = -357;
        var p5 = -472;

        var speeds = [2000,1100, 900, 700, 500];
        //var locations = [0, -124, -240, -357, -472];
        var locations = [0, -150, -300, -450];

        var c = 0;

        if (speed == 1){
        
           /* var fanInterval = setInterval(function() { 
                while (c < 4){
                    $("#blowerImage").css("background-position", locations[c] + "px 0px");
                }
                 if (c >= 4){
                     clearInterval(fanInterval);
                 }
                c = c+1;
            }, s1);*/

            setTimeout(function(){  $("#blowerImage").css("background-position", p1 + "px 0px"); }, s1);
            setTimeout(function(){  $("#blowerImage").css("background-position", p2 + "px 0px"); }, s1 + 500);
            setTimeout(function(){  $("#blowerImage").css("background-position", p3 + "px 0px"); }, s1 + 1000);
            setTimeout(function(){  $("#blowerImage").css("background-position", p4 + "px 0px"); }, s1 + 1500);
            setTimeout(function(){  $("#blowerImage").css("background-position", p5 + "px 0px"); }, s1 + 2000);
        

        }
        else if (speed == 2){
            setTimeout(function(){  $("#blowerImage").css("background-position", p1 + "px 0px"); }, s2);
            setTimeout(function(){  $("#blowerImage").css("background-position", p2 + "px 0px"); }, s2);
            setTimeout(function(){  $("#blowerImage").css("background-position", p3 + "px 0px"); }, s2);
            setTimeout(function(){  $("#blowerImage").css("background-position", p4 + "px 0px"); }, s2);
            setTimeout(function(){  $("#blowerImage").css("background-position", p5 + "px 0px"); }, s2);
        }
        else if (speed == 3){
            setTimeout(function(){  $("#blowerImage").css("background-position", p1 + "px 0px"); }, s3);
            setTimeout(function(){  $("#blowerImage").css("background-position", p2 + "px 0px"); }, s3);
            setTimeout(function(){  $("#blowerImage").css("background-position", p3 + "px 0px"); }, s3);
            setTimeout(function(){  $("#blowerImage").css("background-position", p4 + "px 0px"); }, s3);
            setTimeout(function(){  $("#blowerImage").css("background-position", p5 + "px 0px"); }, s3);
        }
        else if (speed == 4){
            setTimeout(function(){  $("#blowerImage").css("background-position", p1 + "px 0px"); }, s4);
            setTimeout(function(){  $("#blowerImage").css("background-position", p2 + "px 0px"); }, s4);
            setTimeout(function(){  $("#blowerImage").css("background-position", p3 + "px 0px"); }, s4);
            setTimeout(function(){  $("#blowerImage").css("background-position", p4 + "px 0px"); }, s4);
            setTimeout(function(){  $("#blowerImage").css("background-position", p5 + "px 0px"); }, s4);
        }
        else if (speed == 5){
            setTimeout(function(){  $("#blowerImage").css("background-position", p1 + "px 0px"); }, s5);
            setTimeout(function(){  $("#blowerImage").css("background-position", p2 + "px 0px"); }, s5);
            setTimeout(function(){  $("#blowerImage").css("background-position", p3 + "px 0px"); }, s5);
            setTimeout(function(){  $("#blowerImage").css("background-position", p4 + "px 0px"); }, s5);
            setTimeout(function(){  $("#blowerImage").css("background-position", p5 + "px 0px"); }, s5);
        }


        //$("#blowerImage").css("background-position", pixelStart + "px 0px");
    }




// IGNITION SWITCH FUNCTIONS    
/*$('.ignition').on('click', function() {
    $(this).attr('src','activities/activity_5/ignition_on.png');
    activity.correctAnswer();
    $('#fanDial').removeClass('hidden');       
});*/

/*$('.ignitionBtn').off("click").on('click', function (event) {
    var clickedIndex = $(".ignitionBtn").index(this);
    degree = rotateIgnSwitchData[clickedIndex];
    dragId = "keyRotate";
    setrotateData(degree);
    setTimeout(function () { isTunerCorrect(); }, 1000);
}).css("cursor", "pointer"); */

// FAN DIAL FUNCTIONS  
$('.dial-hotspot').off("click").on('click', function() {
        
    var fanPosElID = $(this).attr('id');

    if(fanPosElID == "dialPos_off") {
        $('.knob').css({
            transform: 'rotate(0deg)'
        });
        $('#airOutTemp > span').html('0');
    }
    else if(fanPosElID == "dialPos_1") {
        $('.knob').css({
            transform: 'rotate(35deg)'
        });
        $('#airOutTemp > span').html('42');
    }
    else if(fanPosElID == "dialPos_2") {
        $('.knob').css({
            transform: 'rotate(75deg)'
        });
        $('#airOutTemp > span').html('44');
    }
    else if(fanPosElID == "dialPos_3") {
        $('.knob').css({
            transform: 'rotate(110deg)'
        });
        $('#airOutTemp > span').html('46');
    }
    else if(fanPosElID == "dialPos_4") {
        $('.knob').css({
            transform: 'rotate(145deg)'
        });
        $('#airOutTemp > span').html('48');
    }

    else if(fanPosElID == "dialPos_5") {
        $('.knob').css({
            transform: 'rotate(185deg)'
        });
        $('#airOutTemp > span').html('50');
    }
    
});