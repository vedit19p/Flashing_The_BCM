/**
 *  Audio Player 
 **/
var audioPlayer = document.createElement('audioActivity');
var audioSequencePlayer = document.createElement('audioSequenceActivity');
audioPlayer = new Audio();
audioSequencePlayer = new Audio();

var playListIndex = 0;  

function audioPlay(filePath, callback) {

    console.log('filePath = ', filePath);

    audioPlayer.pause();
	if (!$('#muteIcon').hasClass('active')) {
		audioSequencePlayer.muted = false;
		audioPlayer.muted = false;
  	}
	
	audioPlayer.src = filePath;
    audioPlayer.play();
    toggleCCBar('show');

    audioPlayer.onended = function() {
     if(callback){
       callback();
      }
    }
};

function audioSequence(playListArr) {


    //console.log('playListIndex = ', playListIndex);
    //console.log('playListArr = ', playListArr);
    toggleCCBar('show');

    audioSequencePlayer.pause();
    if (playListIndex < playListArr.length) {
        audioSequencePlayer.src = playListArr[playListIndex];
		audioSequencePlayer.play();
        playListIndex++;
    } else {
        audioSequencePlayer.pause();
        playListIndex = 0
            toggleCCBar('hide');

        return false;
    }
}