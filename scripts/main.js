var playback_token = "GAlVagTx_____2R2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbmxvY2FsaG9zdCqGTDpK2YZa4I4Z8Q30yYY=";
var domain = "http://polar-escarpment-5787.herokuapp.com/";

var apiswf = null;

$(document).ready(function() {

  var flashvars = {
    'playbackToken': playback_token,
    'domain': domain,
    'listener': 'callback_object'
    };
		
  var params = {
    'allowScriptAccess': 'always'
  };
	
  var attributes = {};
  swfobject.embedSWF('http://www.rdio.com/api/swf/',
      'apiswf',
      1, 1, '9.0.0', 'expressInstall.swf', flashvars, params, attributes);


  $('#play').click(function() {
    apiswf.rdio_play($('#play_key').val());
  });
  
  $('#stop').click(function() { 
      apiswf.rdio_stop(); 
  });
  
  $('#pause').click(function() { 
      apiswf.rdio_pause(); 
  });
  
  $('#previous').click(function() { 
      apiswf.rdio_previous(); 
  });
  
  $('#next').click(function() { 
      apiswf.rdio_next(); 
  });
  
  var clicks = 0;
  $("#mute").click(function() {
      clicks += 1;
      if (clicks % 2 === 1) {
          $(this).html(" Un-mute");
          $("#mute").chilren()[0].className = "fa fa-volume-up";
          apiswf.rdio_setVolume(0);
      }
      else {
        $(this).html(" Mute");
        $("#mute").children()[0].className = "fa fa-volume-off";
        apiswf.rdio_setVolume(100);
      }
  });
});

var callback_object = {};

callback_object.ready = function ready(user) {

  apiswf = $('#apiswf').get(0);

  apiswf.rdio_startFrequencyAnalyzer({
    frequencies: '10-band',
    period: 100
  });

  if (user == null) {
    $('#nobody').show();
  } else if (user.isSubscriber) {
    $('#subscriber').show();
  } else if (user.isTrial) {
    $('#trial').show();
  } else if (user.isFree) {
    $('#remaining').text(user.freeRemaining);
    $('#free').show();
  } else {
    $('#nobody').show();
  }

  console.log(user);
}

callback_object.freeRemainingChanged = function freeRemainingChanged(remaining) {
    $('#remaining').text(remaining);
}

callback_object.playStateChanged = function playStateChanged(playState) {
    $('#playState').text(playState);
}

callback_object.playingTrackChanged = function playingTrackChanged(playingTrack, sourcePosition) {
    if (playingTrack != null) {
        $('#track').text(playingTrack['name']);
        $('#album').text(playingTrack['album']);
        $('#artist').text(playingTrack['artist']);
        $('#art').attr('src', playingTrack['icon']);
    }
}

callback_object.playingSourceChanged = function playingSourceChanged(playingSource) {

}

callback_object.volumeChanged = function volumeChanged(volume) {

}

callback_object.muteChanged = function muteChanged(mute) {

}

callback_object.positionChanged = function positionChanged(position) {
    $('#position').text(position);
}

callback_object.queueChanged = function queueChanged(newQueue) {
}

callback_object.shuffleChanged = function shuffleChanged(shuffle) {
}

callback_object.repeatChanged = function repeatChanged(repeatMode) {

}

callback_object.playingSomewhereElse = function playingSomewhereElse() {

}

callback_object.updateFrequencyData = function updateFrequencyData(arrayAsString) {

  var arr = arrayAsString.split(',');

  $('#freq div').each(function(i) {
    $(this).width(parseInt(parseFloat(arr[i])*500));
  })
}
