$(document).ready(function() { 

    

    // Set the start time
    reportData.startTime = new Date().getTime();

    // Hide the score display
    toggleScoreArea('hide');
    // Turn on Closed Caption
    toggleCCBar('show');
    //Active ccTask Box
    //$('#ccIcon').addClass('active');    
    
    // Set Student info from parent appliation
    secondName = window.parent.LisPersonNameFamily;
	firstName = window.parent.LisPersonNameGiven;
	studentName = firstName+' '+secondName;
});