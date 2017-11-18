/** 
 *  MISC APPLICATION SETTINGS
 */

var versionActive = true;
var versionText = "Beta";
var safetyScreen = true;
var audioDirectory = 'assets/audio/';
var activityAudioIntro = 'intro.mp3';
var activityAudioSafety = 'safety.mp3';


/** 
 * VIDEOS  
 */
var videos = [
    {
        id: 'vid1',
        title: 'Using the Simulation',
        src: 'intro_video'
    },
    {
        id: 'vid2',
        title: 'Understanding the Equipment',
        src: 'act_video'            
    }
];


/*  
 *  ICON BAR ICONS
 *  Generates all the required icons for this module based on the configured data. 
*/
var iconBarIcons = [
    { 
        optional: [
            { id: "partsDepartmentIcon", title: "Parts Department", active: true },
            { id: "toolTrayIcon", title: "Tool Tray", active: true },
            { id: "serviceInfoIcon", title: "Service Information", active: true },           
            { id: "zoomInIcon", title: "Zoom In", active: false },
            { id: "zoomOutIcon", title: "Zoom Out", active: false }   
        ],
        standard: [    
            { id: "muteIcon", title: "Mute On/Off" },
            { id: "audioRepeatIcon", title: "Repeat Audio" },
            { id: "ccIcon", title: "Closed Caption" },
            { id: "menuIcon", title: "Menu" },
            { id: "closeIcon", title: "close" }
        ]
    }
];

// SI Menu Data
siMenuData = [ 
    {
        item: 'Automotive Repair Order',

        img: 'activities/activity_2/images/Automotive_Repair_Order_Large.png',
        id: 's1',
        activity: '2'
    }
];