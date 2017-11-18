//alert('activity 1.js');

var activityInstallingBCM = function(){
  activity.incorrectTaskAmount = 3;
  //Write your function inside here to keep from leaking

  var badClickCounter = 0;
  var currentTask = 1;
  var showingPartsDept = false;

  $("#partsDepartmentIcon").hide();
  $("#toolTrayIcon").hide();
  $("#serviceInfoIcon").hide();
   
  setTimeout(function () { $("#btnContinueToNextTask").show(); }, 35000); //roughly 35000 in real life
  $("#divActivity1_2").hide();

  $("#partsDepartment").click(function(e){
    console.log('clicked parts dept');
    activity.incorrectAnswer();

    badClickCounter++;

    if (badClickCounter >= 3){
      $("#tmpBCMHotspot").addClass("highlight");
    }

    
  });

  $("#divActivity1_2").click(function(e){
     //console.log("positon.top => " + ui.position.top + " --- position.left => " + ui.position.left);

      var offset = $(this).offset();
      var x = e.clientX - offset.left;
      var y = e.clientY - offset.top;

      console.log("clicked... X => " + x + " -- Y => " + y);

      if ((x >= 18 && x <= 242) && (y >= 161 && y <= 215) && (currentTask == 1)){  //54...231.....&&&   ...85...140
        //likely for task #1

       /* $("#bcmHandle").removeClass("highlight-square");
        badClickCounter = 0;*/
      }
      /*else if ((x >= 54 && x <= 231) && (y >= 85 && y <= 280)){
        //likely for task #1

        $("#bcmHandle").removeClass("highlight");
        badClickCounter = 0;
      }*/
      else if ((x >= 10 && x <= 250) && (y >= 148 && y <= 237) && (currentTask == 2)){
         $("#bcmHandle").removeClass("highlight-square");
        badClickCounter = 0;
        $("#bcmConnector").show();
        $("#bcmVoid").show();

        activity.correctAnswer();

        //stubFunctionToShowPartsImage();
        $("#partsDepartmentIcon").show();
        currentTask = 3;

        $("#bcmHandle").draggable( { disabled: true });

        $("#tmpBCMHotspot").show();
        $("#tmpBCMHotspot").on("click", tmpStubDrag);

        e.stopPropagation();
      }
      else if (currentTask == 3){
        //this would be from after the drag event has been performed..just swallow it and don't allow it to be a negative reponse
      }
      else{
        badClickCounter++;
        activity.incorrectAnswer();
        if (badClickCounter >= 3){
          if (currentTask == 1 || currentTask == 2){
               if (!$("#bcmHandle").hasClass("highlight-square")) {
                  $("#bcmHandle").addClass("highlight-square");

                }
          }
          
         
        }
        
       

      }
  });
 
  $("#btnContinue").click(function() {
    
    //alert('next part of task');
    $("#divActivity1_2").show();
    $("#divActivity1BG").hide();
    
  });

  //$(document).on("click", "#bcmHandle", function(e) {
  $("#bcmHandle").click(function(e){

    $("#bcmHandle").removeClass("highlight-square");
    badClickCounter = 0;
    //alert("entering bcmHandle click event..");
    activity.correctAnswer();
    currentTask = 2;


    //$("#divActivity1_2").stop(true,true).addClass("noConnectors", 500);
    //$("#divActivity1_2").stop(true,true).removeClass("withConnectors", 500);
    $("#bcmNoConnectors").show();


    //$("#divActivity1_2").css("background", "url('/activities/activity_1/dashboard_BCM_noconnectors.png')");


    $("#bcmHandle").draggable( { start: function() { $("#bcmHandle").removeClass("highlight");}, drag: handleDrag });
    $("#bcmHandle").unbind("click");
    e.stopPropagation();
  });



  var handleDrag = function(evt, ui) {
    $("#bcmHandle").removeClass("highlight");
    badClickCounter = 0;
    $("#bcmConnector").show();
    $("#bcmVoid").show();

    activity.correctAnswer();

    //stubFunctionToShowPartsImage();
    $("#partsDepartmentIcon").show();
    currentTask = 3;

    $("#bcmHandle").draggable( { disabled: true });

    $("#tmpBCMHotspot").show();
    $("#tmpBCMHotspot").on("click", tmpStubDrag);

    evt.preventDefault();

  }

  var stubFunctionToShowPartsImage = function(){
    $("#divActivity1_2").removeClass("noConnectors");
    $("#divActivity1_2").addClass("partsDepartmentTemp");
    showingPartsDept = true;
    $("#bcmConnector").hide();
    $("#tmpBCMHotspot").show();
    $("#tmpBCMHotspot").draggable( { drag: tmpStubDrag });
  }

  var tmpStubDrag = function(evt, ui) {
    $("#divActivity1_2").addClass("noConnectors");
    //$("#divActivity1_2").removeClass("partsDepartmentTemp");
    closePartsDepartment();
    showingPartsDept = false;

    activity.correctAnswer();

    $("#tmpBCMHotspot").draggable( { disabled: true });
    $("#bcmConnector").show();
    $("#bcmConnector").draggable({ drag: handleConnectorInBetween, stop: handleConnectorDrag });
    badClickCounter = 0;

    $("#partsDepartmentIcon").hide();

    evt.stopPropagation();
  }

  var handleConnectorInBetween = function (evt, ui){
    console.log("inBetween=> positon.top => " + ui.position.top + " --- position.left => " + ui.position.left);
    if (ui.position.left <= -34){
      ui.position.left = -34;
      //$("#bcmConnector").css("left", "34px");
    }
    if (ui.position.left >= 706){
      //$("#bcmConnector").css("left", "706px"); 
      ui.position.left = 706;
    }
    if (ui.position.top <= -46){
      //$("#bcmConnector").css("top", "-46px");
      ui.position.top = -46;
    }
    if (ui.position.top >= 449){
      //$("#bcmConnector").css("top", "449px");
      ui.position.top = 449;
    }
    //if (ui.position.top )
  }

  var handleConnectorDrag = function(evt, ui){
    

    console.log("positon.top => " + ui.position.top + " --- position.left => " + ui.position.left);
    if ((ui.position.top >= 80 && ui.position.top <= 140) && (ui.position.left >= -90 && ui.position.left <= 20)) {
      console.log('installed!');
      $("#bcmConnector").draggable({ disabled: true }).css("z-index", "-5");
       $("#partsDepartmentIcon").hide();
       $("#bcmVoid").hide();
      activity.correctAnswer();
      
    }
    else{
      activity.incorrectAnswer();
      badClickCounter++;
      
      if (badClickCounter >= 3){
        $("#bcmVoid").addClass("highlight");
      }
    }
  }


};

(function() {
	activityInstallingBCM();
})($);