/*  ADD ICON BAR ICON
 *  Generates all the required icons for this module based on the configured data.
 *  
 *  iconBarIcons is populated by the SimGenerator, we then loop over the icon data
 *  and append the icon element to the iconbar.
*/
var addIconBarIcons = function() {
    var icon = '';
    var iconBar = '';
    iconBar += '<ul class="icon-bar">';
    iconBar += '<li class="optional-icons" style="width:auto; margin-right:-6px;">';    
    $.each(iconBarIcons[0].optional, function(index, value){
        if(value.active === true) {            
           iconBar += '<div id="'+ value.id +'" title="'+ value.title +'" class="optional-icon"></div>';
        }        
    });
    iconBar += '</li>';
    $.each(iconBarIcons[0].standard, function(index, value) {                   
           iconBar += '<li><div id="'+ value.id +'" title="'+ value.title +'"></div></li>';
    });   
    iconBar += '</ul>';
    $('#iconBar > #icons').append(iconBar);
}

/*  BUILD VIDEO SUBMENU
 *  Generates all the video submenu items available for this module, based on the configured data.
 * 
 *  module.videos is populated by the SimGenerator, we then loop over the video data. If the item is the first item
 *  we use the element which has the dropdown arrow for the menu flyout, otherwise we use the element without it.
 *  after all the items have been added, we append them to the Video submenu.
*/
var buildVideoSubMenu = function() {
    var submnuItems = '';
    $.each(videos, function(index, value) {
        if(index == 0) {
            submnuItems += '<li id="vidUseSimulation" data-video="'+ value.src +'" class="vidSubmnuItem">';
            submnuItems += '<span class="litext1 videoTitle">'+ value.title +'</span>';
            submnuItems += '<span class="darrow"></span>';
            submnuItems += '</li>';
        }
        else {
            submnuItems += '<li id="vidUseSimulation" data-video="'+ value.src +'" class="vidSubmnuItem">';
            submnuItems += '<span class="litext1 videoTitle">'+ value.title +'</span>';            
            submnuItems += '</li>';
        }
    });
    $('#menu > #videos > .submenuVideos').append(submnuItems);
};



/*  BUILD ACTIVITY SUBMENU
 *  Generates all the activityo submenu items available for this module, based on the configured data.
 * 
 *  module.activity is populated by the SimGenerator, we then loop over the activity data. If the item is the first item
 *  we use the element which has the dropdown arrow for the menu flyout, otherwise we use the element without it.
 *  after all the items have been added, we append them to the Activity submenu.
*/
var buildActivitySubMenu = function() {
    //Empty and rebuild
   $('#menu > #activities > .submenuActivites').empty(); 
    var submnuItems = '';
    $.each(module.activity, function(index, value) {
        if(index == 0) {
            submnuItems += '<li id="'+value.id+'" class="actSubmnuItem">';

            $.each(activity.completedActivites, function(i, v) {      

                if(value.id == v.id) {
                    submnuItems += '    <div class="activity-tick-container"><img src="assets/images/icons/tick.png" class="activity-tick"></div>';
                }
                else {
                    submnuItems += '    <div class="activity-tick-container"></span></div>';
                }
            });           
            
            submnuItems += '    <div class="litext1 activityTitle" data-id="'+ value.id +'">'+ value.title +'</div>';
            submnuItems += '    <span class="darrow"></span>';
            submnuItems += '</li>';
        }
        else {
            submnuItems += '<li id="'+value.id+'" class="actSubmnuItem">';
            
            $.each(activity.completedActivites, function(i, v) {            
                if(value.id == v.id) {
                    submnuItems += '    <div class="activity-tick-container"><img src="assets/images/icons/tick.png" class="activity-tick"></div>';
                }
                else {
                    submnuItems += '    <div class="activity-tick-container"></div>';
                }
            });

            submnuItems += '    <div class="litext1 activityTitle" data-id="'+ value.id +'">'+ value.title +'</div>';            
            submnuItems += '</li>';            
        }
    });
    $('#menu > #activities > .submenuActivites').append(submnuItems);
}


/*  BUILD SERVICE INFORMATION MENU 
*/
var buildServiceInformationMenu = function() {    
    var siMenuItems = '';         
    siMenuItems += '<li id="'+ siMenuData[0].id +'" class="txt" data-content="'+ siMenuData[0].img +'">';
    siMenuItems += '     <span class="litext" style="padding-left:10px">'+ siMenuData[0].item +'</span>';
    siMenuItems += '</li>'; 
    $('#siMenu').append(siMenuItems); 
};



/*  PLAY VIDEO
 *  Displays a video player above the current activity.
*/
var playVideo = function(src) {
    $('#menu').hide();
    $('#popupVideoPlayer').show();
    $('#popupVideoPlayer > #videoPlayer > #videoFrame ').attr("src","assets/videos/"+ src +".html"); 
};

/*  CLOSE VIDEO
 *  Closes the open video player.
*/
var closeVideo = function() {
    $('#popupVideoPlayer > #videoPlayer > #videoFrame ').attr("src","");
    $('#popupVideoPlayer').hide();
    $('#menuLightbox').hide();
};



/*  
 *  INITILIZE SIMULATION SHELL FEATURES 
 *  We need to add all the icons, menu items and other UI features before
 *  we load the activity.
*/
var simShellInit = function() {    
    // Add IconBar Icons
    addIconBarIcons();    

    // Build the Video Sub Menu
    buildVideoSubMenu();            
}

/***************************************************************************************
 * 
 * 
 * ICON BAR ICONS
 * 
 * 
 ***************************************************************************************/

// Parts Department Toggle event handler
$(document).on('click', '#iconBar > #icons > ul > li > #partsDepartmentIcon', function() {
    // Hide the wholeContainer
    $('#wholeContainer').hide();

    // Close the CCBar
    toggleCCBar('off');    

    // Show the Parts Department Conatiner
    $('#partsDepartment').show();    

    // Deactivate Parts Department Icon
    $(this).css({
        'background': 'url("assets/images/icons/parts_dep_inactive.png") no-repeat',
        'background-size': '18px 18px',
        'cursor': 'default'
    });
});

// Tool Tray Toggle event handler
$(document).on('click', '#iconBar > #icons > ul > li > #toolTrayIcon', function() {    
    
    if($('#toolTray').hasClass('tray-closed')) {
        $(this).css({ 
            'width': '18px',
            'height': '18px',
            'background': 'url("assets/images/icons/tools_icon.png") 0% 0% / 100% 100%',
            'background-size': '18px 18px',
            'cursor': 'pointer'
         }); 
        
        $('#toolTray').animate({right:'-10px'}, {queue: false, duration: 500});
        $('#toolTray').removeClass('tray-closed').addClass('tray-open');
    }
    else if($('#toolTray').hasClass('tray-open')) {
        $(this).css({ 
            'width': '18px',
            'height': '18px',
            'background': 'url("assets/images/icons/tools_icon_inactive.png") 0% 0% / 100% 100%',
            'background-size': '18px 18px',
            'cursor': 'pointer'
        });
        
        $('#toolTray').animate({right:'-186px'}, {queue: false, duration: 500});
        $('#toolTray').removeClass('tray-open').addClass('tray-closed');
    }
});


/***************************************************************************************
 * ZOOM & PAN FUNCTIONS
 ***************************************************************************************/
var activity_OuterContainer = '#zoomWrapper';
var activity_InnerContainer = '#panWrapper';

// Default Zoom Level
var zoomLevel = '1';

/**
 * ZOOM IN
 * Sets the CSS properties on the outer and inner containers
 * 
 * @param {*} level 
 */
var zoomIn = function(level) {  
    // Outer Container
    $(activity_OuterContainer).css({ 
        'overflow': 'hidden',
        'display': 'block',
        'cursor': 'move',
        'padding': '0'
    });
    // Inner Container
    $(activity_InnerContainer).css({ 
        'transform': 'scale('+ level +')',
        'transform-origin': 'top left',
        'display': 'block',
        'padding': '0'
    });     
};


/**
 * ZOOM OUT
 * * Sets the CSS properties on the outer and inner containers
 * 
 * @param {*} level 
 */
var zoomOut = function(level) {    
    // Outer Container
    $(activity_OuterContainer).css({ 
        'overflow-': 'auto',
        'cursor': 'default'
    });
    // Inner Container
    $(activity_InnerContainer).css({ 
        'transform': 'scale('+ level +')',
        'transform-origin': 'top left'
    }); 
};

// Zoom In & Out Vars
var contentTop = 0;
var contentLeft = 0;


/**
 * Zoom In Click event handler
 */
$(document).on('click', '#iconBar > #icons > ul > li > #zoomInIcon', function() {     
    
    // zoom in from 1 to 1.5
    if(zoomLevel == '1') { 
        zoomIn('1.5');        
        zoomLevel = '1.5';        
        $('#zoomOutIcon').css('background','url(assets/images/icons/zoom_out.png)'); 
        contentTop = $(activity_OuterContainer).position().top;
        contentLeft = $(activity_InnerContainer).position().left;
        $(activity_InnerContainer).draggable({
            containment: '#activity2Container',
            scroll: false
        });              
    } 
    // zoom in from 1.5 to 2
    else if(zoomLevel == '1.5') {  
        zoomIn('2');  
        zoomLevel = '2';
        $(this).css('background', 'url(assets/images/icons/zoomin_inactive.png)');
    }
});

/**
 * Zoom Out Click event handler
 */
$(document).on('click', '#iconBar > #icons > ul > li > #zoomOutIcon', function() { 

    // zoom out from 1.5 to 1
    if(zoomLevel == '1.5') {  
        zoomOut('1');  
        zoomLevel = '1';        
        $(this).css('background', 'url(assets/images/icons/zoomin_inactive.png)');        
        $(activity_InnerContainer).css({
            'top': contentTop -25,
            'left': contentLeft
        }).draggable('destroy');
    }
    // zoom out from 2 to 1.5
    else if(zoomLevel == '2') {  
        zoomOut('1.5');  
        zoomLevel = '1.5';
        //$('#zoomInIcon').attr('src','assets/images/icons/zoom_in.png');
        $('#zoomInIcon').css({
            'cursor': 'pointer',
            'background': 'url(assets/images/icons/zoom_in.png)'
        });                
    }    
});


/***************************************************************************************
 * SERVICE INFORMATION ICON
 ***************************************************************************************/
$(document).on('click', '#serviceInfoIcon', function() {
    
    togglePauseAudio();

    // Get the position of SI Icon
    var rightPos = 1000 - $(this).offset().left;
    var siMenuWidth = $('#siMenu').width() - 50;
    var siMenuOffset = rightPos - siMenuWidth;
   
    // Make sure the menu aligns with icon
    $('#siMenu').css({
        //right: siMenuOffset + "px"
    }); 

    // Close main menu if its open
    if($('#menu').is(':visible')) {
        $('#menu').hide();
        toggleLightBox('hide');
    }

    $('#siMenu').empty();
    buildServiceInformationMenu();
    toggleLightBox('hide');
    //$('#menuLightbox').hide();
    //$('#siMenu').show();
    toggleSiMenu();   
});

/***************************************************************************************
 * MUTE AUDIO ICON
 ***************************************************************************************/
$(document).on('click', '#muteIcon', function() {       
    toggleAudio();
});

/***************************************************************************************
 * REPEAT AUDIO ICON
 ***************************************************************************************/
$(document).on('click', '#audioRepeatIcon', function() {
    toggleRepeatAudio();    
});

/***************************************************************************************
 * CLOSED CAPTION ICON
 ***************************************************************************************/
$(document).on('click', '#ccIcon', function() {     
    $('#ccIcon').toggleClass("active"); 
    if($('#ccIcon').hasClass("active"))
    {
        activity.ccState = 'off';
        toggleCCBar('hide');
    } else {
        activity.ccState = 'on'
        toggleCCBar('show'); 
    }
});

/***************************************************************************************
 * MENU ICON
 ***************************************************************************************/
$(document).on('click', '#menuIcon', function() {    
    toggleMenu();
});

/***************************************************************************************
 * CLOSE SIMULATION ICON
 ***************************************************************************************/
$(document).on('click', '#iconBar > #icons > ul > li > #closeIcon', function() {
    
    if($('#alertBox').is(':visible')) {
        // Global Function (global.js)
        toggleAlertBox('hide', '');
    } else {        
        
        // Determine which activities are incomplete
        var completedActivites = activity.completedActivites;
        var totalActivities = parseInt(module.activity.length + 1);
        var incompleteActivities = [];

        for(var i = 1; i < totalActivities; i++) {
            
            if(activity.completedActivites.length < 1) {
                incompleteActivities.push(module.activity[(i - 1)].title);
            }
            else {
                $.each(activity.completedActivites, function(index, value) {                    
                    if(value.id !== i) {
                        incompleteActivities.push(module.activity[(i - 1)].title);
                    }
                });
            }
            
        }           

        // Load alertbox content
        var closeActivityContent = '';
        
        // Alert Text
        closeActivityContent += '<div class="alert-text">You have not completed the following activities in the simulation:</div><br>';
        
        // Get list of activities not completed
        closeActivityContent += '<div id="activityNames" class="alert-text">';
        
        $.each(incompleteActivities, function(ind, val) {
            closeActivityContent += val + '<br>';
        });
        
        closeActivityContent += '</div><br>';
        
        // Confirmation text
        closeActivityContent += '<div class="alert-text confirmation-text">Are you sure you want to close the simulation? All unsaved work on this activity will be lost and your scores will reflect only those activities you have completed in this session.</div>';    

        // Function to perform if stundent selects YES   
        var yesFunction = function() {
            // This functionality is handled by the client to close the iframe that the module loads into.
        }

        // Global Function (global.js) 
        toggleAlertBox('show', closeActivityContent, yesFunction);
    }   
           
});


/*********************************************************************************
 * LIGHT BOX
 ********************************************************************************/
$(document).on('click','#menuLightbox', function() {        
    toggleLightBox('hide');
    toggleMenu('hide');
});

/*******************************************************************************
 * DROP DOWN MENU: SubMenu Event Handlers   
 ******************************************************************************/

// DropDown Menu Item: Tasks click event handler
$('ul#menu li#tasks').on('click', function() {
	activity.taskList = true;
    // Global Functions (global.js)
    toggleMenu('hide');        
    toggleLightBox('hide');

    // Gets data for task list window from Global Function (global.js)
    var data = getActivityTasks(parseInt(activity.currentActivity + 1));
    
    // Set title and content from returned data array
    var title = data[0];
    var content = [data[1], data[2]];
    
    // Global Function (global.js)
    // open the float window set its type to task and pass in title 
    // and content(taskListDesciption, taskListItem)
    toggleFloatWindow('task', title , content);         
});    

// DropDown Menu Item: Videos click event handler
$('ul#menu li#videos').on('click', function() {        
    $('.submenuVideos').toggle();    
    $('.submenuActivites').hide();   
});

// DropDown Menu Item: Videos SubMenu click event handler
$(document).on('click', '.vidSubmnuItem', function() {
    playVideo($(this).attr('data-video'));
});

// Close Popup Video Player
$('#popupVideoPlayer > #videoClose').on('click', function(){
    closeVideo();
});

// DropDown Menu Item: Activities SubMenu click event handler
$('ul#menu li#activities').on('click', function() { 
     buildActivitySubMenu();
    $('.submenuActivites').toggle();    
    $('.submenuVideos').hide();

    // Set the width of the submenu based on length of sub items 
    var activityArray = [];    
    
    // Loop through each activity submenu item
    $('.activityTitle').each(function(index, value){
       activityArray.push($(value).text());
    });
    
    // Get the length of the longest activity submenu item
    var maxLength = Math.max.apply(Math, $.map(activityArray, function (el) { return el.length }));
    
    // Multiple the maxLenght by 8 pixels to get the width needed for the menu
    var width = parseInt(maxLength * 12);

    // Set the width of the menu
    $('ul#menu li ul.submenuActivites').css('width', width + 'px');    
});

// DropDown Menu Item: Activities SubMenu click event handler
$(document).on('click', '.actSubmnuItem', function(evt) {
    /*skipping = true;
     // The id of the submenu li
     var elID = $(this).attr('id'); 
    
    // Confirmation text
    var switchActivityContent = '<div class="alert-text confirmation-text" style="text-align:center">Are you sure you want to skip this activity? <br> Any progress on this activity will not be saved.</div>';    

    toggleAlertBox('show', switchActivityContent, elID);*/

    

    // The id of the submenu li
    var elID = $(this).attr('id'); 
    skipToFolderNumber = elID;

    if (elID == 1 && globalAct1Finished === true){
        evt.stopPropagation();

        $('#activityDoneScr').show();
        toggleAlertBox('hide');
        $('#simulationPage > #iconBar > #icons > #menu').hide();

        return;
    }
    else if (elID == 2 && globalAct2Finished === true){
        evt.stopPropagation();

        $('#activityDoneScr').show();
        toggleAlertBox('hide');
        $('#simulationPage > #iconBar > #icons > #menu').hide();
        
        return;
    }

    skipping = true;
   
    // Confirmation text
    var switchActivityContent = '<div class="alert-text confirmation-text" style="text-align:center">Are you sure you want to skip this activity? <br> Any progress on this activity will not be saved.</div>';    
    
    toggleAlertBox('show', switchActivityContent, elID);

    $("#menu, #menuLightbox").hide();
    $("#alertBox").show();

    if (activity.pauseTask == true){
        $("#alertBox").css({ "position": "absolute", top:"0px" });

    }
	
});


/*******************************************************************************
 * TASK FLOAT WINDOW
 ******************************************************************************/
$('#closeFloatWindow').on('click', function() {
    // Global Function (global.js)
    closeFloatWindow();
});


/*******************************************************************************
 * SERVICE INFORMATION WINDOW
 ******************************************************************************/

$("#serviceInformationWindow").resizable({
    resize: function(event, ui) {
        $(this).resizable( "option", "minWidth", 350 );
        $('#serviceInformationContent').css({
            'height': $(this).height() - 30
        });
    }
});

// Service Information Window: Zoom In & Out Vars
var si_contentTop;
var si_contentLeft;

// This starts the image zoomed-in at 1.5x
//siZoomIn('1.5');
//siZoomLevel = '1.5';  


$('#serviceInformationZoomOut').attr('src','assets/images/icons/zoomout.png');        
si_contentTop = $('#serviceInformationInnerContent').position().top;
si_contentLeft = $('#serviceInformationInnerContent').position().left;

$('#serviceInformationInnerContent').css({
    'margin-left': '0px'
});

$("#serviceInformationWindow").on('resize', function() {
    $('#serviceInformationContent').height($('#serviceInformationInnerContent').height());
});

$('#serviceInformationInnerContent').draggable({
    containment: $('#serviceInformationContent')
});

// Service Information Window: Zoom In
$(document).on('click', '#serviceInformationZoomIn', function() { 
    // zoom in from 1 to 1.5
    if(siZoomLevel == '1') { 
        siZoomIn('1.5');        
        siZoomLevel = '1.5';        
        $('#serviceInformationZoomOut').attr('src','assets/images/icons/zoomout.png');        
        si_contentTop = $('#serviceInformationInnerContent').position().top;
        si_contentLeft = $('#serviceInformationInnerContent').position().left;
        $('#serviceInformationInnerContent').draggable({
            containment: $('#serviceInformationContent')
        }); 
        $('#serviceInformationInnerContent').css({
            'margin-left': '-190px'
        });      
    } 

    // zoom in from 1.5 to 2
    else if(siZoomLevel == '1.5') {  
        siZoomIn('2');  
        siZoomLevel = '2';
        $(this).attr('src', 'assets/images/icons/zoomin_inactive.png');
        
        $('#serviceInformationWindow').css({
            'overflow': 'hidden'
        });
        $("#serviceInformationWindow").on('resize', function() {
            $('#serviceInformationContent').height($('#serviceInformationInnerContent').height());
        });
        $('#serviceInformationInnerContent').draggable({
            containment: $('#serviceInformationContent')
        });
        $('#serviceInformationInnerContent').css({
            'margin-left': '-190px'
        });
              
    }
});

// Service Information Window: Zoom Out
$(document).on('click', '#serviceInformationZoomOut', function() {
    // zoom out from 1.5 to 1
    if(siZoomLevel == '2') {  
        siZoomOut('1.5');  
        siZoomLevel = '1.5';        
        //$(this).attr('src', 'assets/images/icons/zoomin_inactive.png');       
        
        $('#serviceInformationWindow').css({
            'overflow': 'hidden'
        });
        $("#serviceInformationWindow").on('resize', function() {
            $('#serviceInformationContent').height($('#serviceInformationInnerContent').height());
        });
        $('#serviceInformationInnerContent').draggable({
            containment: $('#serviceInformationContent')
        });
        $('#serviceInformationInnerContent').css({
            'margin-left': '-190px'
        });
        $('#serviceInformationInnerContent').css({
            'top': si_contentTop -25,
            'left': si_contentLeft
        });
    }
    // zoom out from 2 to 1.5
    else if(siZoomLevel == '1.5') {  
        siZoomOut('1');  
        siZoomLevel = '1';
        $('#serviceInformationZoomOut').attr('src','assets/images/icons/zoomout_inactive.png');
        $('#serviceInformationZoomOut').css({'cursor': 'pointer'}); 
        $('#serviceInformationInnerContent').draggable({
            containment: $('#serviceInformationContent')
        }); 
        $('#serviceInformationInnerContent').css({
            'margin-left': '-190px'
        }); 
               
    }
});

// Service Information: Download
$(document).on('click', '#serviceInformationDownload', function() {    
    // Get content to download
    //var imgSrc = $(document).find('#si-image').attr('src');
    // USE ONLY FOR EE_16
    var imgSrc = 'activities/activity_2/images/Automotive_Repair_Order_Large.png';    
    var x=new XMLHttpRequest();
	x.open("GET", imgSrc, true);
	x.responseType = 'blob';
	x.onload=function(e){download(x.response, "downloaded_work_order.png", "image/png" ); }
	x.send();
});

// Service Information Window: Minimize or Maximize
$(document).on('click', '#serviceInformationMinMax', function() {
    if($(this).hasClass("max")) {
        $('#serviceInformationWindow').animate({"height": "30px"});
        $(this).attr('src','assets/images/icons/down_icon.png').removeClass("max").addClass('min');
        $('#serviceInformationInnerContent > img').hide();
    } 
    else if($(this).hasClass("min")) {
        $('#serviceInformationWindow').animate({"height": "400px"});
        $(this).attr('src','assets/images/icons/up_icon.png').removeClass("min").addClass('max');
        $('#serviceInformationInnerContent > img').show();
    }
});

// Service Information: Close Window
$('#serviceInformationClose').on('click', function() {
    // Global Function (global.js)
    closeServiceInformationWindow();
});

// Service Information: SubMenu Links
$(document).on('click', '#siMenu > li.txt', function() {
    var content = $(this).data('content');    
    toggleServiceInformationWindow(content);
    $('#siMenu').hide();
    toggleLightBox('hide'); 
});



/*******************************************************************************
 * AUTOMOTIVE SHOP  
 ******************************************************************************/
$('#closeShop').on('click', function() {
    closeAutomotiveShop();
});


/*******************************************************************************
 * PARTS DEPARTMENT  
 ******************************************************************************/
$('#closePartsDepartment').on('click', function() {
    closePartsDepartment();
});


/*******************************************************************************
 * TOOL TRAY  
 ******************************************************************************/
// Tool Tray: Close
$('#toolTray > #toolTrayHeader > #closeTray').on('click', function() {
    $('#toolTrayIcon').css({ 
        'width': '18px',
	    'height': '18px',
        'background': 'url("assets/images/icons/tools_icon.png")  0% 0% / 100% 100%',
        'background-size': '18px 18px',
        'cursor': 'pointer'
    });
        
    $('#toolTray').animate({right:'-186px'}, {queue: false, duration: 500});
    $('#toolTray').removeClass('tray-open').addClass('tray-closed');
}); 

// Tool Tray Scroll: Up
$('#toolTray > #toolTrayHeader > #scrollUp').on('click', function() { 
    $('#toolTray > #toolTrayContent').animate({scrollTop: '+=150px'}, 1000);
});

// Tool Tray Scroll: Down
$('#toolTray > #toolTrayFooter > #scrollDown').on('click', function() { 
    $('#toolTray > #toolTrayContent').animate({scrollTop: '-=150px'}, 1000);
});

/*******************************************************************************
 * MODULE VERSION  
 ******************************************************************************/
if(versionActive === true)
{
    $('#versionText').text("Version: " + versionText);
}
else
{
    $('#version').remove();
}
