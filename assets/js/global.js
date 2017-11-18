var firstTime = false;
var skipping = false;
var globalAct1Finished = false;
var globalAct2Finished = false;
var skipToFolderNumber = -1;
var globalAct1CurrScore = 0;
var globalAct2CurrScore = 0;
    
    
    /***************************************************************************************
     * 
     * 
     * ACTIVITY OBJECT
     * 
     * 
     ***************************************************************************************/
    var activity = {
    /**
     *  Activity Properties
     * 
     */
    currentActivity: 0,
    currentActivityDirectory: 1,
    synchronizeCCAudio: 0,
    currentTask: 0,
    currentTaskNarrative: 0,
    currentTaskAssessment: 0,
    activityLength: module.activity.length,
    taskScore: 0,
    incorrectTaskCount: 0,
    incorrectTaskAmount: 2,
    skipNarrative: false,
    pauseTask: false,
    audioTracker: 1,
    taskBoxContent: [],
    audioPlayList: [],
    hinting: false,
    activitySkip: false,
    activityTracker: [],
    completedActivites: [],
    ccState:null,
    audioCompleted:false,
    repeatPreviousAudio: [],
    repeatPreviousCC: [],
	repeatTracker: 0,
	repeatPlaylistEnded: false,
	displayContinueButton: false,
	taskStarted: false,
	taskList: false,
	narrativeAudio: false,

    sendPartialDataToLTI: function() {
            console.log("Insdse sendPartialDataToLTI");
            console.log(JSON.stringify(reportData));
            
            if (typeof window.parent.ExitSendDataToLTI === "function"){
                console.log("window.parent.ExitSendDataToLTI DOES EXIST");
                window.parent.ExitSendDataToLTI(reportData);
            }
            else{
                console.log("window.parent.ExitSendDataToLTI IS NOT AVAILABLE");
            }
            
        
    },
    getDataFrmLTI: function (jsonObj) {
        console.log("getDataFrmLTI jsonObj: "+jsonObj);
        if (jsonObj != undefined) {
            if (window.parent.ViewMode == "completed") {//Complete stage.
            reportData = jsonObj;
            console.log("Completed: "+jsonObj);
            }
            else if (window.parent.ViewMode == "resume") {//Incomplete stage.
                reportData = jsonObj;
                console.log("Resumed: "+jsonObj);
            }
        }
    },


    /***************************************************************************************
     * 
     * 
     * LAUNCH ACTIVITY
     * 
     * 
     ***************************************************************************************/

    launchActivity: function(id) {
        var self = this;
        //Load activity had to hide the ccBar instead of this function.
        //toggleCCBar('show');
        toggleScoreArea('show');

        //Get activity index
        for (var i = 0; i < self.activityLength; i++) {
            self.activityTracker.push(i + 1);
        }

        //Show skip screen
        $("#skipIntroCover").show();

        getDataFrmLTI(window.parent.GetInputData);


        ///====================
        /*reportData = {
            "moduleTitle":null,
            "startTime":1501698328561,
            "totalTimeTaken":"",
            "totalPossibleScore":0,
            "totalScore":12,
            "totalScorePercent":0,
            "totalActivities":null,
            "pass":null,
            "activityData":
                [
                    {
                        "id":1,
                        "title":"Installing a BCM",
                        "totalActivityScore":12,
                        "scores":
                            [
                                {
                                    "reportLabel":"Click on the BCM",
                                    "attempts":1,
                                    "score":3
                                },
                                {
                                    "reportLabel":"Remove the BCM",
                                    "attempts":1,
                                    "score":3
                                },
                                {
                                    "reportLabel":"Retrieve the new BCM from the parts department",
                                    "attempts":1,
                                    "score":3
                                },
                                {
                                    "reportLabel":"Install the new BCM",
                                    "attempts":1,
                                    "score":3
                                }
                            ],
                        "totalScore":12
                    }
                ],
            "assessmentData":null,
            "activityTotalScore":0,
            "act1Finished":true,
            "act2Finished":false
        };*/

        ///====================

        if (reportData.activityData.length > 0){
            $("#skipIntroCover").hide();
            toggleIconBar('show');

            if (reportData.act1Finished === false){
                self.currentActivityDirectory = 1;
                self.currentActivity = 0;

               
            }
            else if (reportData.act2Finished === false){
                self.currentActivityDirectory= 2;
                self.currentActivity = 1;
            }

            if (reportData.act1Finished === true){
                globalAct1Finished = true;

                var firstActivity = module.activity[0];
                self.completedActivites.push({ id: firstActivity.id, title: firstActivity.title });

                for(var c = 0; c< self.activityTracker.length; c++){
                    if (self.activityTracker[c] == 1){
                        self.activityTracker.splice(c, 1);
                        break;
                    }
                }
            }
            if (reportData.act2Finished === true){
                globalAct2Finished = true;

                var secondActivity = module.activity[1];
                self.completedActivites.push({ id: secondActivity.id, title: secondActivity.title });

                for(var c = 0; c< self.activityTracker.length; c++){
                    if (self.activityTracker[c] == 1){
                        self.activityTracker.splice(c, 1);
                        break;
                    }
                }
            }

        }
        else{
            firstTime = true;
        }

        var localFirstTime = firstTime;

        //Load Activity Content
        self.loadActivity(self.currentActivityDirectory, self.currentActivity);
        //activity.welcomeIntro();
        $('#scoreArea #scoreval').html(reportData.totalScore);

        if (localFirstTime === true){
            activity.welcomeIntro();
        }
        else{
            self.narrative();
        }

    },

    /***************************************************************************************
     * 
     * 
     * LOAD ACTIVITY
     * 
     * 
     ***************************************************************************************/

    loadActivity: function(currentActivityDirectory, currentActivity) {
        var self = this;

        if(!firstTime){
            self.sendPartialDataToLTI();
        }
        else{
            firstTime = false;
        }
        

        for(var c = 1; c <= 2; c++){
                removeScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".js","js");
                removeScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".css","css");
         }

        $('#contentInnerContainer').load('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + '.html', function() {

            //Load assets
            /*head.load(
                'activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".js",
                'activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".css"
            );*/

            //Load next activity files
              loadScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".js", "js") //dynamically load and add this .js file
              loadScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".css", "css") ////dynamically load and add this .css file


            //ported from hvac2. This needs to load the activity name in th header.
            if(self.currentActivity === 0) {
                $("#pageHeader .module-activity").html(module.moduleTitle.toUpperCase());
            } else {                
                $("#pageHeader .module-activity").html(module.moduleTitle.toUpperCase() + ' / ' + module.activity[self.currentActivity].title);
            }

            // hide the service information icon
            toggleServiceInformationIcon('hide');           
            
        });

        //This creates a custom event that is fired throughout the entire module.
        //$(document).trigger('currentTask_loaded', {activity: self.currentActivity, task: self.currentTask});

        //Create an activity object in reportData activityData array
                
        if (simReport) {
            simReport.startActivity(module.activity[currentActivity]);
        }

        //Divided this functionality into individual functions,
        //therefore the load task wasn't need here.
        //activity.loadTask();
		
		/*if (self.activitySkip === true) {
			activity.narrative();
		}*/
    },

    /***************************************************************************************
     * 
     * 
     * SKIP INTRO
     * 
     * 
     ***************************************************************************************/
    skipIntro: function() {
        var self = this;
        $("#skipIntroCover").hide();
        //toggleIconBar('show');
        audioSequencePlayer.pause();
        self.skipNarrative = true;
        self.audioTracker = 1;
        // Instead of the load task,
        // checks the safetyscreen prop then load safety screen
        // or narrative
        if (safetyScreen === true) {
            self.safetyScreen();
        } else {
            self.narrative();
        }
    },

    /***************************************************************************************
     * 
     * 
     * WELCOME INTRO
     * 
     * 
     ***************************************************************************************/

    welcomeIntro: function() {
        var self = this;
        self.taskBoxContent = [];
        self.audioPlayList = [];
        self.audioTracker = 1;

        //Welcome Intro
        if (module.activity[self.currentActivity].intro.length > 0 && self.skipNarrative !== true) {
            self.taskBoxContent.push(module.activity[self.currentActivity].intro);
            self.audioPlayList.push(audioDirectory + activityAudioIntro);            
        }

        //Play Audio
        self.audioBox(self.audioPlayList, self.taskBoxContent, function() {
            activity.safetyScreen();
        });
    },



    /***************************************************************************************
     * 
     * 
     * SAFETY SCREEN
     * 
     * 
     ***************************************************************************************/

    safetyScreen: function() {
        var self = this;
        $('#safetyScreenCover').show();
        self.taskBoxContent = [];
        self.audioPlayList = [];
        self.audioTracker = 1;


        //Safety Intro
        if (safetyScreen === true) {
            self.taskBoxContent.push("");
            self.audioPlayList.push(audioDirectory + activityAudioSafety);            
        }

        //Play Audio
        self.audioBox(self.audioPlayList, self.taskBoxContent, function() {
            $('#safeStart').show();
        });

        toggleCCBar('hide');        
    },

    /***************************************************************************************
     * 
     * 
     * ACTIVITY NARRATIVE
     * 
     * 
     ***************************************************************************************/

    narrative: function() {
        var self = this;
        self.taskBoxContent = [];
        self.audioPlayList = [];
        self.audioTracker = 1;
        self.pauseTask = true;
		activity.narrativeAudio = true;

        //Get the narrative ccData and push into array to create a synchronize sequence
        if (module.activity[self.currentActivity].cc.narrative.length > 0) {

            for (var i = 0; i < module.activity[self.currentActivity].cc.narrative.length; i++) {
                self.taskBoxContent.push(module.activity[self.currentActivity].cc.narrative[i]);
                self.audioPlayList.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_Narrative" + self.audioTracker + ".mp3");
                self.audioTracker++;
            }

            // Mayor of hack city asked me to drop this code here to fix the title issue ;)
            $("#pageHeader .module-activity").html(module.moduleTitle.toUpperCase() + ' / ' + module.activity[self.currentActivity].title);
            toggleIconBar('show');
        }


        //Play Audio
        self.audioBox(self.audioPlayList, self.taskBoxContent, function() {
            $('#btnContinue').show();
            toggleCCBar('hide');

        });

        setTimeout(function() {
            audioSequencePlayer.play();
        }, 100);
    },

    /***************************************************************************************
     * 
     * 
     * NARRATIVE TASK
     * 
     * 
     ***************************************************************************************/

    narrativeTask: function() {
        // if(typeof $.uiLock == 'function'){
        //     $.uiLock();
        // }
        var self = this;
        self.taskBoxContent = [];
        self.audioPlayList = [];
        self.audioTracker = 1;

        if (module.activity[self.currentActivity].cc.ccTasks[self.currentTask].narrative === '') {

            self.currentTaskNarrative++;
            self.currentTaskAssessment++;
            self.currentTask++;
            activity.loadTask();
            return false;
        } 

        //Get the narrative ccData and push into array to create a synchronize sequence
        if (module.activity[self.currentActivity].cc.ccTasks[self.currentTask].narrative.length > 0) {

            for (var i = 0; i < module.activity[self.currentActivity].cc.ccTasks[self.currentTask].narrative.length; i++) {
                self.taskBoxContent.push(module.activity[self.currentActivity].cc.ccTasks[self.currentTask].narrative[i]);
                self.audioPlayList.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + self.currentTask + "_Narrative" + self.audioTracker + ".mp3");
                self.audioTracker++;
            }
        } 
        //Play Audio

        setTimeout(function(){
        self.audioBox(self.audioPlayList, self.taskBoxContent, function() {
            //toggleIconBar('show');
            //toggleCCBar('hide'); 
            self.currentTaskNarrative++;
            self.currentTaskAssessment++;
            self.currentTask++;
            activity.loadTask();
        });
    }, 1200);
        // setTimeout(function(){
        //     if(typeof $.uiUnlock == 'function'){
        //     $.uiUnlock();
        // }
        // },9000);

    },

    /***************************************************************************************
     * 
     * 
     * SKIP ACTIVITY
     * 
     * 
     ***************************************************************************************/

    skipActivity: function(skipTo) {
        var self = this;
        audioSequencePlayer.pause();
        audioPlayer.pause();
        //Offset skipTo to keep activity id ontrack array 0 to 1
        //skipTo--;
        if (skipTo == 1 && globalAct1Finished === false){
            reportData.totalScore -= globalAct2CurrScore;
        }
        else if (skipTo == 2 && globalAct2Finished === false){
            reportData.totalScore -= globalAct1CurrScore;
        }

        globalAct1CurrScore = 0;
        globalAct2CurrScore = 0;
        $('#scoreArea #scoreval').html(reportData.totalScore);



        self.currentTask = 0;
        self.currentActivityDirectory = skipTo;
        self.currentActivity = skipTo-1;
        //self.audioTracker = 1;
        self.taskBoxContent = [];
        self.audioPlayList = [];
        self.audioTracker = 1;
        self.currentTaskNarrative = 0;
        self.currentTaskAssessment = 0;

        self.activitySkip = false;
        self.nextActivity();
    },

    /***************************************************************************************
     *  Audio Box is a sequence player that takes 3 params.
     *  Playlist array
     *  CCtask array. (Optional)
     *  Callback function.(Optional)
     ***************************************************************************************/

    audioBox: function(arrPlayList, arrTaskCC, callback) {
        var self = this;
        var playListLength = arrPlayList.length;
        var completedCounter = 1;
        self.audioCompleted = false;
        toggleCCBar('show');

        playListIndex = 0;
        self.synchronizeCCAudio = 0;


        if (arrTaskCC === null) { arrTaskCC = '' }

        setTimeout(function() {
            $('#ccContent > #cctxt').html(self.taskBoxContent[self.synchronizeCCAudio]);
        }, 10);

        console.log('arrPlayList =', arrPlayList);
        console.log('arrTaskCC =', arrTaskCC);
        self.repeatPreviousAudio = arrPlayList;
        self.repeatPreviousCC = arrTaskCC;


        audioSequence(arrPlayList);
        audioSequencePlayer.onended = function() {
            self.synchronizeCCAudio++;
            completedCounter++;
            self.repeatTracker++;
            console.log('self.repeatTracker add', self.repeatTracker);

            //Audio done playing flag
            if(playListLength === self.synchronizeCCAudio){
                self.audioCompleted = true;
            }

            $("#skipIntroCover").hide();
            audioSequence(arrPlayList)
            $('#ccContent > #cctxt').html(arrTaskCC[self.synchronizeCCAudio]);

            if (callback && completedCounter > playListLength) {
                callback();

            }

        }
    },
	
	audioBoxRepeat: function(arrPlayList, arrTaskCC, callback) {
		var self = this;
		var completedCounter = 1;
		self.audioCompleted = false;
		toggleCCBar('show');
	
		/*
		if (self.repeatTracker < 0) {
		self.repeatTracker = arrPlayList.length;
		}
		*/
	
		self.synchronizeCCAudio = self.repeatTracker;
		playListIndex = self.repeatTracker;
		console.log('playListIndex', playListIndex)
		console.log("self.repeatPlaylistEnded: ", self.repeatPlaylistEnded);
		
		/*
		if (self.repeatPlaylistEnded === true) {
		playListIndex = 0;
		console.log('playListIndex flag playlist ended', playListIndex)
		self.synchronizeCCAudio = 0;
		}
		*/    
		//if (arrTaskCC === null) { arrTaskCC = '' }
	
		setTimeout(function() {
			$('#ccContent > #cctxt').html(arrTaskCC[self.synchronizeCCAudio]);
		}, 10);
	
		console.log('arrPlayList =', arrPlayList);
		console.log('arrTaskCC =', arrTaskCC);
		//self.repeatPreviousAudio = arrPlayList;
		//self.repeatPreviousCC = arrTaskCC;
		
		audioSequence(arrPlayList);
		audioSequencePlayer.onended = function() {
			if (activity.taskList === false) {
				self.synchronizeCCAudio++;
				completedCounter++;
				self.repeatTracker++;
				console.log('self.repeatTracker add', self.repeatTracker);
			
				//Audio done playing flag
				/*if(playListLength === self.synchronizeCCAudio){
				self.audioCompleted = true;
				}*/
				
				$("#skipIntroCover").hide();
				audioSequence(arrPlayList);
				$('#ccContent > #cctxt').html(arrTaskCC[self.synchronizeCCAudio]);
				
				if (callback && completedCounter > arrPlayList.length) {
					callback();
				}
				/*if (activity.currentActivity === 0 && activity.currentTask === 0 && activity.taskStarted === false) {
					activity.pauseTask = true;
					$('#btnContinue').show();
				}*/
				if (activity.narrativeAudio === true && self.repeatTracker === arrPlayList.length) {
					$('#btnContinue').show();
					activity.narrativeAudio = false;
				}
				activity.taskList = false;
				
				if (activity.currentActivity === 1 && activity.currentTask === 3) {
					self.taskBoxContent = [];
					self.audioTracker = 1;
					self.currentTask++;
					self.currentTaskAssessment++;
					self.checkForTaskAssessment();
				}
			}
		}
	},

    /***************************************************************************************
     *
     *
     * LOAD TASK
     *
     *
     ***************************************************************************************/
    loadTask: function() {
        var self = this;
        var activityTaskLength = module.activity[self.currentActivity].cc.ccTasks.length;
        //May need to add this to a Reset function
        self.taskBoxContent = [];
        self.audioPlayList = [];
        //Reset Score
        self.incorrectTaskCount = 0;
        self.repeatTracker = 0;
        self.hinting = false;
        toggleCCBar('show');

        //TODO: Double check this property to ensure we need to continue using it
        self.audioTracker = 1;

        playListIndex = 0;
        self.synchronizeCCAudio = 0;

        //toggleIconBar('show');
        //taskScore: get possible points
        self.taskScore = module.activity[self.currentActivity].possiblePoints[self.currentTask];

        //May need to add this to a Reset function
        $(".text-btn > button").attr("disabled", false);

        /*
         console.log('--------------- start ****----------------');
         console.log('--------------- ****----------------');
         console.log('--------------- ****----------------');
         console.log('--------------- Task Loaded ----------------');
         console.log('self.taskScore =', self.taskScore);
         console.log('currentActivity =', self.currentActivity);
         console.log('currentActivityDirectory =', self.currentActivityDirectory);
         console.log('synchronizeCCAudio =', self.synchronizeCCAudio);
         console.log('currentTask =', self.currentTask);
         console.log('audioTracker =', self.audioTracker);
         console.log('currentTaskNarrative =', self.currentTaskNarrative)
         console.log('currentTaskAssessment =', self.currentTaskAssessment)
         console.log('--------------- ****----------------');
         console.log('--------------- ****----------------');
         console.log('--------------- end ****----------------');
         console.log('check to see if task completed', self.currentTask, activityTaskLength)
        */

        //ported from hvac2. This needs to load the activity name in th header.
        $(document).trigger('currentTask_loaded', {activity: self.currentActivity, task: self.currentTask});

        //If task is completed
        if (self.currentTask >= activityTaskLength) {
            activity.taskComplete();
            //TODO: check for this functionality for reuse
            //return false;
        } else {
            activity.nextTask();
        }
		activity.narrativeAudio = false;
    },
    /***************************************************************************************
     * 
     * 
     * NEXT TASK
     * 
     * 
     ***************************************************************************************/

    nextTask: function() {
        var self = this;
        var activityId = module.activity[self.currentActivity].id;
        //self.currentTask++;
		activity.taskStarted = true;

        console.log('****** Next Task *******');
        console.log("Task cc Length");
        console.log(module.activity[self.currentActivity]);
        console.log('self.currentTask = ', self.currentTask);
        console.log('self.audioTracker = ', self.audioTracker);
        console.log('self.currentTaskNarrative = ', self.currentTaskNarrative);
        console.log('self.currentTaskAssessment = ', self.currentTaskAssessment);


        //If task has narrative
        if (module.activity[self.currentActivity].cc.ccTasks[self.currentTask].narrative || module.activity[self.currentActivity].cc.ccTasks[self.currentTask].narrative === '') {
            $(".text-btn > button").attr("disabled", true);
            self.narrativeTask()
            return false;
        }

        //If task has assessment
        if (module.activity[self.currentActivity].cc.ccTasks[self.currentTaskAssessment].assessment) {
            $(".text-btn > button").attr("disabled", true);
            self.checkForTaskAssessment();
            return false;
        }

        //If task
        //console.log('Task Length = ', module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task.length);
        if (module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task.length > 1) {
            //console.log('****** multiple ccDate *******');
            for (var i = 0; i < module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task.length; i++) {
                self.taskBoxContent.push(module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task[i]);
                self.audioPlayList.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + self.audioTracker + ".mp3");
                self.audioTracker++
            }

           // console.log(self.taskBoxContent);
           // console.log(self.audioPlayList);
            self.repeatPreviousAudio = self.audioPlayList;
            self.repeatPreviousCC = self.taskBoxContent;


            //Play Audio
            self.audioBox(self.audioPlayList, self.taskBoxContent, function() {
                toggleCCBar('hide');
            });

        } else {

            //console.log('******** single ccDate **********');
            //console.log('self.currentTask =', self.currentTask)
            //console.log(module.activity[self.currentActivity].cc.ccTasks[1].task[0]);
  
            self.repeatPreviousAudio = [];
            self.repeatPreviousCC = [];
            self.repeatPreviousAudio.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + (self.currentTask + 1) + ".mp3");
            self.repeatPreviousCC.push(module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task[0]);
            //self.repeatTracker = self.repeatPreviousAudio.length;

            $('#ccContent > #cctxt').html(module.activity[self.currentActivity].cc.ccTasks[self.currentTask].task[0]);
            audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + (self.currentTask + 1) + ".mp3", function() {
                toggleCCBar('hide');
            });
        }

        //Custom event called for the activity current task.
        $(document).trigger('currentTask_loaded', {activity: self.currentActivity, task: self.currentTask});
    },
    /***************************************************************************************
     * 
     * 
     * TASK COMPLETE
     * 
     * 
     ***************************************************************************************/

    taskComplete: function() {
        var self = this;

        $(".text-btn > button").attr("disabled", true);

        //If taskComplete length 0
        if (module.activity[self.currentActivity].cc.taskComplete.length === 0) {
            $("#btnContinue").show();
            toggleCCBar('hide');

			activity.taskStarted = false;
			
            //Reset for new activity
            self.currentTask = 0;
            //TODO: Check on the purpose for these newer properties.
            self.currentTaskAssessment = 0;
            self.currentTaskNarrative = 0;
            self.audioTracker = 1;
            return false;
        }

        console.log('>>>>>> Task Completed <<<<<<')
        console.log('self.audioTracker = ', self.audioTracker)
        console.log('taskComplete length = ', module.activity[self.currentActivity].cc.taskComplete.length);

        //Get ccData taskComplete and audio
        for (var i = 0; i < module.activity[self.currentActivity].cc.taskComplete.length; i++) {
            self.taskBoxContent.push(module.activity[self.currentActivity].cc.taskComplete[i]);
            self.audioPlayList.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "act" + self.currentActivityDirectory + "_task" + self.audioTracker + ".mp3");
            self.audioTracker++;
        }

        self.audioBox(self.audioPlayList, self.taskBoxContent, function() {
            $("#btnContinue").show();
            toggleCCBar('hide');
        });


        //Restart task counter
        console.log('again self.audioTracker = ', self.audioTracker)

        self.currentTask = 0;
        //TODO: Check on the purpose for these newer properties.
        self.currentTaskAssessment = 0;
        self.currentTaskNarrative = 0;
        self.audioTracker = 1;

    },
    /***************************************************************************************
     * 
     * 
     * CHECK FOR TASK ASSESSMENT
     * 
     * 
     ***************************************************************************************/

    checkForTaskAssessment: function() {
        var self = this;
        var assessmentData = module.activity[self.currentActivity].cc.ccTasks[self.currentTaskAssessment].assessment;

        //Check for assessement question
        if (assessmentData.length > 0) {
            //if (assessmentData.length === 'testing') {
            console.log('>>>>>>>>> Load Task Assessment <<<<<<<<<<<');
            console.log('self.synchronizeCCAudio =', self.synchronizeCCAudio);
            console.log('self.audioTracker = ', self.audioTracker);

            self.audioPlayList = [];
            //Get ccData assessment and audio
            for (var i = 0; i < module.activity[self.currentActivity].cc.ccTasks[self.currentTaskAssessment].assessment.length; i++) {
				$('#ccContent > #cctxt').html(module.activity[self.currentActivity].cc.ccTasks[self.currentTask].assessment[0].question);
                self.audioPlayList.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + self.currentTaskAssessment + "_Q" + self.audioTracker + ".mp3");
                self.audioTracker++;
            }

            //TODO: Check on this functionality
            //Play Audio
            self.audioBox(self.audioPlayList, null, function() {
                self.currentTaskAssessment++;
                self.currentTask++;
            });

            assessment.init(assessmentData);
            assessment.start();
            self.audioTracker = 1;
        }
        //toggleCCBar('hide');
    },

    /***************************************************************************************
     * 
     * 
     * CHECK FOR ASSESSMENT
     * 
     * 
     ***************************************************************************************/


    checkForAssessment: function() {
        var self = this;
        var assessmentData = module.activity[self.currentActivity].assessment;

        //Check for assessement question
        if (assessmentData.length > 0) {
            //if (assessmentData.length === 'testing') {

            toggleCCBar('hide');
            console.log('>>>>>>>>> Load Assessment <<<<<<<<<<<');
            console.log('self.synchronizeCCAudio =', self.synchronizeCCAudio);
            console.log('self.audioTracker = ', self.audioTracker);

            self.audioPlayList = [];
            //Get ccData assessment and audio
            for (var i = 0; i < module.activity[self.currentActivity].cc.assessment.length; i++) {
                self.audioPlayList.push(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "act" + self.currentActivityDirectory + "_assessment" + self.audioTracker + ".mp3");
                self.audioTracker++;
            }

            //Play Audio
            self.audioBox(self.audioPlayList, null);

            assessment.init(assessmentData);
            assessment.start();
            self.audioTracker = 1;
        } else {

            if (module.activity[activity.currentActivity].endScreenText === "") {
                activity.nextActivity();
                return false;
            }

            $("#activityEndScr").show();
            $("#finalCover").html('<span>' + module.activity[activity.currentActivity].endScreenText + '</span>');

            activity.endActivity();

        }
    },
    /***************************************************************************************
     *
     *
     * CORRECT ANSWER
     *
     *
     ***************************************************************************************/


    correctAnswer: function(id, event, score) {
        var self = this;

        if (!self.hinting) {
            self.incorrectTaskCount++;
        }
        //Submit Task Scores
        self.submitTaskScore(score);

        self.incorrectTaskCount = 0;
        self.currentTask++;
        self.currentTaskAssessment++;
        self.currentTaskNarrative++;

        $(".text-btn > button").attr("disabled", true);

        //If audio sequence is playing pause it. 
        audioSequencePlayer.pause();
        audioPlayer.pause();
        audioSequencePlayer.src = "";
        audioPlayer.src = "";
        
        //Check to see if current Activity have Positive Response data
        if (module.activity[self.currentActivity].positiveResponse[self.currentTask - 1].task !== '') {

            $('#ccContent > #cctxt').html(module.activity[self.currentActivity].positiveResponse[self.currentTask - 1].task);
            audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + self.currentTask + "_P" + self.currentTask + ".mp3", function() {
                toggleCCBar('hide');
            });
            audioPlayer.addEventListener('ended', function handler() {
                activity.loadTask();
                this.removeEventListener('ended', handler);
            });
        } else {
            toggleCCBar('hide');
            activity.loadTask();
        }
    },

    /***************************************************************************************
     * 
     * 
     * INCORRECT ANSWER
     * 
     * 
     ***************************************************************************************/

    incorrectAnswer: function(id, hinting) {
        var self = this;
		if (self.hinting != true) {
       		self.hinting = hinting ? true : false;
		}

        var incorrectAudio = self.currentTask + 1;
        audioSequencePlayer.pause();
        audioPlayer.pause();
        audioSequencePlayer.src = "";
        audioPlayer.src = "";

        //Track hot spots
        if (id) {
            $('#ccContent > #cctxt').html(module.activity[self.currentActivity].negitiveResponse[self.currentTask].spot[id - 1].response);
            audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + incorrectAudio + "_N" + id + ".mp3", function() {
                toggleCCBar('hide');
            });
            //I think audioPlayer.addEventListener below can be removed 
            audioPlayer.addEventListener('ended', function handler() {
                this.removeEventListener('ended', handler);
            });

            if (!self.hinting) {
                self.incorrectTaskCount++;
                //Subtract score
                self.taskScore--;
            }

            return false;
        }

        //Track wrong answer
        if (!self.hinting) {
            self.incorrectTaskCount++;
            //Subtract score
            self.taskScore--;
        }


        //console.log('********* inCorrect answer ***********');
        //console.log('self.currentTask = ', self.currentTask);
        //console.log('positive Response Length = ', module.activity[self.currentActivity].positiveResponse.length)

        //If incorrect 3 times show hint
        if (self.incorrectTaskCount !== self.incorrectTaskAmount) {

            //console.log('********* inCorrect Audio Tracker ***********');
            //console.log('self.currentTask = ', incorrectAudio);

            //**** Play Audio
            $('#ccContent > #cctxt').html(module.activity[self.currentActivity].negitiveResponse[self.currentTask].task);
            audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + incorrectAudio + "_N" + incorrectAudio + ".mp3", function() {
                toggleCCBar('hide');
            });
            audioPlayer.addEventListener('ended', function handler() {
                this.removeEventListener('ended', handler);
            });
            self.audioTracker = 1;
        } else {
            //Reset counter
            //**** Play Audio
            $('#ccContent > #cctxt').html(module.activity[self.currentActivity].negitiveResponse[self.currentTask].task);
            audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_T" + incorrectAudio + "_N" + incorrectAudio + ".mp3", function() {
                toggleCCBar('hide');
            });
            self.hinting = true;
            //self.incorrectTaskCount = 0;
        }
    },

    /***************************************************************************************
     * 
     * 
     * SUBMIT TASK SCORE
     * 
     * 
     ***************************************************************************************/

    submitTaskScore: function(score) {
        var self = this;
        var taskScore = {
            reportLabel: module.activity[self.currentActivity].reportLabel[self.currentTask],
            attempts: self.incorrectTaskCount,
            score: (score ? parseInt(score) : parseInt(self.taskScore))
        };

        if (self.currentActivityDirectory === 1){
            globalAct1CurrScore += parseInt(self.taskScore);
        }
        else{
            globalAct2CurrScore += parseInt(self.taskScore);
        }

        if (simReport) {
            simReport.submitTaskScore(taskScore);
        }
    },

    /***************************************************************************************
     * 
     * 
     * CHECK FOR SKIPPED ACTIVITY
     * 
     * 
     ***************************************************************************************/

    checkForSkippedActivity: function() {
        var self = this;

        if (self.activityTracker.length > 0) {

            self.activitySkip = true;

            for (var i = 0; self.activityTracker.length; i++) {

                //Set next activity to pass
                self.currentActivity = self.activityTracker[i] - 1;
                self.currentActivityDirectory = self.activityTracker[i];

                console.log('>>>>>>>>>>', self.currentActivity[i] - 1);
                console.log('>>>>>>>>>>', self.currentActivityDirectory[i]);

                self.loadActivity(self.currentActivityDirectory, self.currentActivity);
                return false;
            }

        } else {

            //Last Activity load assessment question
            $('#wholeContainer').hide();
            $("btnContinue").hide();
            assessment.init(module.finalAssessment);
            assessment.review();
        }

    },
    getNextActivityFolder: function(){
        var self = this;

        if (skipping === true){
            skipping = false;
            return 
        }

        if (reportData.act1Finished === false){
            return 1;
        }
        else if (reportData.act2Finished === false){
            return 2;
        }
        else{
            return -1;
        }

    },
    proceedToFinalAssessment: function(){
            //Last Activity load assessment question
            $('#wholeContainer').hide();
            $("btnContinue").hide();
            assessment.init(module.finalAssessment);
            assessment.review();
    },

    /***************************************************************************************
     * 
     * 
     * NEXT ACTIVITY
     * 
     * 
     ***************************************************************************************/

    nextActivity: function() {
        var self = this;
		self.repeatPlaylistEnded = false;
        //self.sendPartialDataToLTI();

        //Show/Hide activity end screen and continue button
        $("#activityEndScr").hide();
        $("#btnContinue").hide();

        console.log(">>>>> Last Activity Check<<<<<", self.currentActivity, self.activityLength - 1);

        if (skipping){
            //eat it

        }
        else{
            var nextActivityIndex = self.getNextActivityFolder();
            if(nextActivityIndex == -1){
                //we're done...go to Assessment

                self.proceedToFinalAssessment();
                return false; 
            }
            else{
                self.currentActivityDirectory = nextActivityIndex;
                self.currentActivity = nextActivityIndex - 1;
            }
        }

       

        //Check to see if this is the last activity 

        /*if (self.activitySkip === true) {
            self.checkForSkippedActivity();
            return false
        }*/

       // if (self.currentActivity !== self.activityLength - 1) {

            /*if (self.currentActivityDirectory == 1){
                reportData.act1Finished = true;
            }
            else if (self.currentActivityDirectory == 2){
                reportData.act2Finished = true;
                
            }*/

            //Set next activity to pass
           // self.currentActivity++;
            //self.currentActivityDirectory++;
            //Start Narrative
            self.narrative();

            for(var c = 1; c <= 2; c++){
                removeScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".js","js");
                removeScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".css","css");
            }

            //Load content screen
            $('#contentInnerContainer').load('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + '.html', function() {
                /*//Load assets
                head.load(
                    'activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".js",
                    'activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".css"

                );*/

                //Load next activity files
              loadScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".js", "js") //dynamically load and add this .js file
              loadScriptFile('activities/activity_' + self.currentActivityDirectory + '/activity_' + self.currentActivityDirectory + ".css", "css") ////dynamically load and add this .css file

            });

            //Create an activity object in reportData activityData array
            if (simReport) {
                simReport.startActivity(module.activity[self.currentActivity]);
            }

            //self.loadActivity(self.currentActivityDirectory, self.currentActivity);


        /*} else {
            self.checkForSkippedActivity();
        }*/

    },


    /***************************************************************************************
     * 
     * 
     * END ACTIVITY
     * 
     * 
     ***************************************************************************************/

    endActivity: function() {
        var self = this;
        var currentActivity = module.activity[activity.currentActivity];
        self.completedActivites.push({ id: currentActivity.id, title: currentActivity.title });

        if (currentActivity.id == 1){
            reportData.act1Finished = true;
            globalAct1Finished = true;
        }
        else if (currentActivity.id == 2){
            reportData.act2Finished = true;
            globalAct2Finished = true;
        }

        

        //If user skip activities
        if (self.activityTracker.length > 0) {
            removeItem(self.activityTracker, self.currentActivityDirectory);
            console.log('>>>>>>>>> self.activityTracker <<<<<<< array', self.activityTracker);
        }

        simReport.endActivity(module.activity[self.currentActivity]);

        self.sendPartialDataToLTI();

        $("#btnContinue").hide();
        $('#activityAssessmentWindow').hide();

        console.log(module.activity.length, self.completedActivites.length);

        if(self.completedActivites.length == module.activity.length){
            $('#btncon').hide();
            $('#btnReviewQuestions').show();
        } else {
            $('#btncon').show();
        }
        $("#activityEndScr").show();
        $('#dragContainment').hide()
        $("#finalCover").html('<span>' + currentActivity.endScreenText + '</span>');
        audioSequencePlayer.pause();
        audioPlay(audioDirectory + "activity_" + self.currentActivityDirectory + "/" + "A" + self.currentActivityDirectory + "_Summary.mp3", function() {
            toggleCCBar('hide');
        });
        toggleCCBar('hide');
    }


} // End Activity Object

/***************************************************************************************
 * 
 * 
 * EVENT HANDLERS
 * 
 * 
 ***************************************************************************************/


$('#btnContinue').on('click', function() {
    $(this).hide();
    //close activity assessment window
    //even if not visible
    assessment.closeAssessmentWindow();


    if (activity.pauseTask === true) {
        activity.pauseTask = false;
		activity.displayContinueButton = true;
        activity.loadTask();
    } else {
        activity.checkForAssessment();
    }
    self.audioTracker = 1;

});

//End screen continue button
$('#btncon, #btnReviewQuestions').on('click', function() {
    //activity.endActivity();
    audioPlayer.pause();
    audioPlayer.src = "";
    activity.nextActivity();
});


$('#contBtn').on('click', function() {
    $('#activityDoneScr').hide();
    audioPlayer.pause();
    audioPlayer.src = "";
    togglePauseAudio();
});

$('#skipBtn').on('click', function() {
    //activity.loadTask();
    activity.skipIntro();
});


$('#safeStart').on('click', function() {
    $('#safetyScreenCover').hide();
    activity.narrative();
});

//Reusable functions
function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}


/**
 * Get Data From LTI (Parent Application)
 *
 * @param {*} jsonObj
 */
var getDataFrmLTI = function(jsonObj) {
    if (jsonObj != undefined) {
        if (window.parent.ViewMode == "completed") { //Complete stage.
            reportData = jsonObj;
            console.log("Completed: " + jsonObj);
        } else if (window.parent.ViewMode == "resume") { //Incomplete stage.
            reportData = jsonObj;
            console.log("Resumed: " + jsonObj);
        }
    }
}


/**********************************************************************************************
 *
 *   HOME & VIDEO PAGE FUNCTIONS
 *
 **********************************************************************************************/

/**
 * Builds and appends buttons for Home & Video Page
 *
 * @param {*} id
 * @param {*} title
 * @param {*} imageClass
 * @param {*} textClass
 * @param {*} text
 * @param {*} appendTo
 */
var buildRoundButton = function(id, title, imageClass, textClass, text, appendTo) {
    var btn = '';
    btn += '<div id="' + id + '" title="' + title + '">';
    btn += '<div class="' + imageClass + '"></div>';
    btn += '<div class="' + textClass + '">' + text + '</div>';
    btn += '</div>';
    $('#' + appendTo).append(btn);
};



/**********************************************************************************************
 *
 *   SIMULATION SHELL FUNCTIONS
 *
 **********************************************************************************************/


/**
 * Get Activity Tasks
 * This loops through the current activites tasks and creates a list
 */
var getActivityTasks = function(frameNum) {
    var activityTitle = '';
    var taskListDesciption = '';
    var taskListItem = '';
    $.each(module.activity, function(index, value) {
        if (value.id == frameNum) {
            activityTitle = value.title;
            taskListDesciption = value.taskDescription;
            $.each(value.tasks, function(i, v) {
                taskListItem += '<li class="taskListItem">' + v + '</li>';
            });
        }
    });

    var data = [
        activityTitle,
        taskListDesciption,
        taskListItem
    ];

    return data;
}



/**
 * Toggle Icon Bar
 * On or Off
 *
 * @param {*} action
 */
var toggleIconBar = function(action) {
    if (action == "show") {
        // Show the icon bar
        $('#simulationPage > #iconBar').show();
    } else if (action == "hide") {
        // Hides the icon bar
        $('#simulationPage > #iconBar').hide();
    }
};

/**
 * Toggle Closed Caption Bar
 * On or Off
 *
 * @param {*} action
 */
var toggleCCBar = function(action) {

    if (action === "show" && activity.ccState !== 'off') {
        // Sets the closed caption icon to active
        //$('#ccIcon').removeClass('active');

        // Show the closed caption bottom bar
        $('#simulationPage > #footer > #ccContent').show();
    } else if (action === "hide") {
        // Removes the closed cpation icon active class
        //$('#ccIcon').addClass('active');

        // Hides the closed caption bottom bar
        $('#simulationPage > #footer > #ccContent').hide();
    }

};


/**
 * Toggle Score Area
 *
 * @param {*} action
 */
var toggleScoreArea = function(action) {
    if (action == "show") {
        $('#footer > #scoreArea').show();
    } else if (action == "hide") {
        $('#footer > #scoreArea').hide();
    }
};



/**
 * Toggle LightBox
 *
 * @param {*} action
 */
var toggleLightBox = function(action) {

    if (action == "show") {
        $('#menuLightbox').css({
            'display': 'block'
        });
    } else if (action == "hide") {
        $('#menuLightbox').css({
            'display': 'none'
        });
    }
};


/**
 * Toggle DropDown Menu
 *
 * @param {*} action
 */
var toggleMenu = function() {
    if($('#menu').is(':visible')) {
        $('#menu').hide();
        //if(activity.audioCompleted !== true){
            togglePauseAudio();
        //}
        toggleLightBox('hide');
    }
    else {
        $('#menu').show();
        //togglePauseAudio();
        audioSequencePlayer.pause();
        audioPlayer.pause();
        toggleLightBox('show');
    }
};


/**
 * Toggle DropDown Menu
 *
 * @param {*} action
 */
var toggleSiMenu = function() {
    if($('#siMenu').is(':visible')) {
        $('#siMenu').hide();
        if(activity.audioCompleted !== true){
            togglePauseAudio();
        }
        toggleLightBox('hide');
    }
    else {
        $('#siMenu').show();
        //togglePauseAudio();
        audioSequencePlayer.pause();
        audioPlayer.pause();
        toggleLightBox('show');
    }
};





/**
 * Toggle & Load the Float Window
 *
 * Used for list of tasks for the current activity, or
 * Assement questions at the end of an activity.
 *
 * types: task, assessment
 *
 * @param {*} type
 * @param {*} title
 * @param {*} content
 */
var toggleFloatWindow = function(type, title, content) {
    if (type === "task") {

        $('#floatWindow > #floatHeader > .activityTitle').html(title);

        if (content[0] == "") {
            $('.taskListDescription').hide();
            $('ol.taskList').css('margin-top', '-30px');
        } else {
            $('span.taskListDescription').empty();
            $('span.taskListDescription').append(content[0]);
            $('ol.taskList').css('margin-top', '15px;');
        }

        $('#floatWindow').find('ol.taskList').empty();
        $('#floatWindow').find('ol.taskList').append(content[1]);
        $("#floatWindow > #floatContent").mCustomScrollbar();

    } else if (type === "assessment") {

    }

    // Show the float window and make it draggable
    $('#floatWindow').draggable({
        /*containment: $('#simulationContainer > #dragContainment').show()*/
    }).show();
};

/**
 * Close the Float Window & Reset Location
 */
var closeFloatWindow = function() {
    $('#floatWindow').hide().css({
        'left': '750px',
        'top': '96px'
    });
};



/**
 * Toggle & Load the Service Information Window
 *
 * @param {*} content 
 */
var toggleServiceInformationWindow = function(content) {    
    $(document).find('#serviceInfoIcon').css({
        'background': 'url(assets/images/icons/graphic_enable.png) no-repeat',
        'cursor': 'default'
    });

    // Clear content
     $('#serviceInformationWindow > #serviceInformationContent > #serviceInformationInnerContent').empty();

    // Show the float window and make it draggable
    $('#serviceInformationWindow').draggable({
        containment: $('#simulationContainer > #dragContainment').show(),
        handle: '#serviceInformationHeader'
    }).show();   

    // Append content to container
    $('#serviceInformationWindow > #serviceInformationContent > #serviceInformationInnerContent').append('<img id="si-image" src="'+ content +'">');    
}; 


/**
 * Service Information Window Zoom In
 * 
 * @param {leve}
 */
var siZoomLevel = '1';
var siZoomIn = function(siZoomLevel) { 
    
    $('#serviceInformationContent').css(
        { 
            'overflow': 'hidden',
            'display': 'block',
            'cursor': 'move',
            'padding': '0'
        }
    );   
    
    
    $('#serviceInformationInnerContent').css(
        { 
            'transform': 'scale('+ siZoomLevel +')',
            'transform-origin': '0 0',
            'display': 'block'
        }
    );         
};

/**
 * Service Information Window Zoom Out
 */
var siZoomOut = function(siZoomLevel) {
    
    $('#serviceInformationContent').css(
        { 
            'overflow-': 'auto',
            'cursor': 'default'
        }
    );

    $('#serviceInformationInnerContent').css(
        { 
            'transform': 'scale('+ siZoomLevel +')',
            'transform-origin': 'center center'
        }
    ); 
};   

/**
 * Close the Service Information Window & Reset Location
 */
var closeServiceInformationWindow = function() {
    $(document).find('#serviceInfoIcon').css({
        'background': 'url(assets/images/icons/graphic.png) no-repeat',
        'cursor': 'pointer'
    });
    
    $('#serviceInformationWindow').hide().css({
        'left': '200px',
        'top': '96px'
    });
};



/**
 *  Toggle & Load Alert Box*
 *
 * @param {*} action
 * @param {*} content
 */
var toggleAlertBox = function(action, content, id) {
 
    if (action == "show") {
        $('#alertBox > #alertContent').append(content);
        $('#alertBox').show();
        $('#menuLightbox').show();

        // Button: Yes
        $('#alertBox > #buttonBar > #btnYes').off("click").on('click', function() {
           /* if(simReport){
                simReport.resetScoreOnQuitActivity();
            }
            //yesFunction();
            activity.skipActivity(id)
            toggleAlertBox('hide');
            $('#simulationPage > #iconBar > #icons > #menu').hide();*/



            //skipping = false;
        for(var i=0;i<activity.completedActivites.length;i++){
            if(activity.completedActivites[i].id == id){
             toggleAlertBox('hide'); 
             
             audioPlay('./assets/audio/score_recorded.mp3')
             $('#activityDoneScr').show();
             toggleAlertBox('hide');
             $('#simulationPage > #iconBar > #icons > #menu').hide();
             return false;
             }
        }



            toggleAlertBox('hide');
            $("#menu, #menuLightbox").hide();

            if (skipping){
        
                activity.skipActivity(skipToFolderNumber);
                skipping = false;

            }
            else{
                if(simReport){
                    simReport.resetScoreOnQuitActivity();
                }

                $('#simulationPage > #iconBar > #icons > #menu').hide();
                if (typeof window.parent.ReturnToBack == "function"){
                   window.parent.ReturnToBack(); 
                }
                
            }

        });

        // Button: No
        $('#alertBox > #buttonBar > #btnNo').on('click', function() {
            toggleAlertBox('hide');
            skipping = false;
        });
    } else if (action == "hide") {
        $('#alertBox > #alertContent').empty();
        $('#alertBox').hide();
        $('#menuLightbox').hide();

    }
}
/**
 *  Clear Timer
 *
 */
var clearTimer = function() {

};

/************************************************************************
 *  AUDIO FUNCTIONS
 ***********************************************************************/
/* Toggle Audio */
var toggleAudio = function(action) {
	if (audioSequencePlayer.muted === false || audioPlayer.muted === false) {
		audioSequencePlayer.muted = true;
		audioPlayer.muted = true;
		$('#muteIcon').addClass('active');
	} else {
		audioSequencePlayer.muted = false;
		audioPlayer.muted = false;
		$('#muteIcon').removeClass('active');
	}
};

/* Toggle Pause Audio */
var togglePauseAudio = function() {
	if (audioSequencePlayer.paused == false || audioPlayer.paused == false) {
        audioSequencePlayer.pause();
        audioPlayer.pause();
    } else {
        if (audioSequencePlayer.src !== "" && activity.audioCompleted === false) {
			audioSequencePlayer.play();
		}
		
        if (audioPlayer.src !== "" && activity.audioCompleted === true) {
			audioPlayer.play();
		}
    }
};

/* Toggle Repeat Audio */
var toggleRepeatAudio = function() {
	audioSequencePlayer.pause();
    audioPlayer.pause();
	
	audioPlayer.muted = true;
	
    //Subract audio current index and check to make sure index has not reach 0
    if(activity.repeatTracker !== 0){
     activity.repeatTracker--;      
    }

    console.log('activity.repeatTracker subtract', activity.repeatTracker)


    if (reportData.act1Finished === true && activity.currentActivityDirectory === 1){
        return;
    }
    else if (reportData.act2Finished === true && activity.currentActivityDirectory === 2){
        return;
    }
	

	if (activity.repeatTracker === 0) {
		activity.repeatPlaylistEnded = true;
	}
	
    console.log('>>>>>>>> Repeat Audio <<<<<<<<');
    console.log('repeatPreviousAudio =', activity.repeatPreviousAudio);
    console.log('repeatPreviousCC =', activity.repeatPreviousCC);
	console.log('repeatTracker =', activity.repeatTracker);
    console.log('>>>>>>>> Repeat Audio End <<<<<<<<');

   activity.audioBoxRepeat(activity.repeatPreviousAudio, activity.repeatPreviousCC, function() {
      toggleCCBar('hide');

        if (activity.pauseTask === true){
                //activity.pauseTask = true;
                $('#btnContinue').show();
        }
	 /*
      if (activity.pauseTask === false && activity.displayContinueButton === false) {
		  activity.pauseTask = true;
		$('#btnContinue').show();
        alert('con 1');
	  }
     */ 
    });


};


/**
 *  SHOW THE AUTOMOTIVE SHOP
 */
var showAutomotiveShop = function() {
    // Hide the wholeContainer
    $('#wholeContainer').hide();

    // Close the CCBar
    //toggleCCBar('off');

    // Hide the Parts Department Conatiner
    $('#automotiveShop').show();
};

/**
 *  CLOSE THE AUTOMOTIVE SHOP
 */
var closeAutomotiveShop = function() {
    // Show the wholeContainer
    $('#wholeContainer').show();


    // Open the CCBar
    toggleCCBar('show');

    // Hide the Parts Department Conatiner
    $('#automotiveShop').hide();
};



/**
 *  CLOSE THE PARTS DEPARTMENT
 */
var closePartsDepartment = function() {
    // Show the wholeContainer
    $('#wholeContainer').show();

    // Open the CCBar
    toggleCCBar('show');

    // Hide the Parts Department Conatiner
    $('#partsDepartment').hide();

    // Deactivate Parts Department Icon
    $('#iconBar > #icons > ul > li > #partsDepartmentIcon').css({
        'background': 'url("assets/images/icons/parts_dep_active.png")',
        'background-size': '18px 18px',
        'cursor': 'pointer'
    });
};



//Reusable functions
function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
};


/***********************************************************************
 * TOGGLE ICONS
 **********************************************************************/

var togglePartsDepartmentIcon = function(action) {
    if(action === "show") {
        $('#partsDepartmentIcon').show();
    } else if(action === "hide") {
        $('#partsDepartmentIcon').hide();
    }
};


var toggleToolTrayIcon = function(action) {
    if(action === "show") {
        $('#toolTrayIcon').show();
    } else if(action === "hide") {
        $('#toolTrayIcon').hide();
    }
};


var toggleServiceInformationIcon = function(action) {
    if(action === "show") {
        $('#serviceInfoIcon').show();
    } else if(action === "hide") {
        $('#serviceInfoIcon').hide();
    }
};


function loadScriptFile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}       


function removeScriptFile(filename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement)
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
 }
}


function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}
 
removejscssfile("somescript.js", "js") //remove all occurences of "somescript.js" on page
removejscssfile("somestyle.css", "css") //remove all occurences "somestyle.css" on page