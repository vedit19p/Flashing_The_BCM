$(document).ready(function() {           
    

    /*****************************************************************
     *  VIDEO PAGE FUNCTIONS
     */

    // Setup the page header
    $('#pageHeader > .series').append(module.seriesName); 


    /** VIDEO BUTTONS *************************************/
    // BTN: Using the Simulation
    buildRoundButton('vbtnUseSimulation','Using the Simulation','vbtnUseSimulationImage','vbtnUseSimulationText','Using the<br/>Simulation','videoButtons');
    $('#vbtnUnderstandEquipment').hide();
    $('#vbtnUseSimulation').on('click', function() {
        $("#pageHeader .module-activity").html(module.moduleTitle.toUpperCase() + ' / ' + videos[0].title);
        $("#videoFrame").attr("src","assets/videos/intro_video.html");
        $("#vbtnUnderstandEquipment").show();
        $("#vbtnUseSimulation").hide();               
    });

    
    // BTN: Understanding the Equipment
    buildRoundButton('vbtnUnderstandEquipment','Understanding the Equipment','vbtnUnderstandEquipmentImage','vbtnUnderstandEquipmentText','Understanding<br/>the Equipment','videoButtons');  
    $('#vbtnUseSimulation').hide();
    $('#vbtnUnderstandEquipment').on('click', function() {
        $("#pageHeader .module-activity").html(module.moduleTitle.toUpperCase() + ' / ' + videos[1].title);
        $("#videoFrame").attr("src","assets/videos/act_video.html");
        $("#vbtnUnderstandEquipment").hide();
        $("#vbtnUseSimulation").show();               
    });
    

    // BTN: Home 
    buildRoundButton('vbtnHome','Home','vbtnHomeImage','vbtnHomeText','Home','videoButtons');
    $('#vbtnHome').on('click', function() {
        $('#homePage').fadeIn("slow");
        $('#videoPage, #pageHeader').fadeOut("fast");
        $('#pageHeader .module-activity').text('');
        $("#videoFrame").attr("src","");                
    });

    // BTN: Enter Simulation
    buildRoundButton('vbtnSimulation','Enter Simulation','vbtnSimulationImage','vbtnSimulationText','Enter<br/>Simulation','videoButtons');
    $('#vbtnSimulation').on('click', function(){
        $("#videoPage").fadeOut("fast");
        $("#simulationPage, #pageHeader, #footer").fadeIn("slow");
        $("#pageHeader .module-activity").html(module.moduleTitle.toUpperCase() + ' / ' + module.activity[0].title); 

        //Lanuch Activity on Screen
        activity.launchActivity();

        // lazy load the functions for the simulation shell
        head.load("assets/js/sim-shell.js", function() {
            simShellInit();
        });       
    });    
});