var playback_token = "GCNVc2V4_____2R2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbnBvbGFyLWVzY2FycG1lbnQtNTc4Ny5oZXJva3VhcHAuY29tX5h-UYi3_C4BMzoNllEIfw=="
var domain = "polar-escarpment-5787.herokuapp.com";

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

/* Search */

function callback( obj ) {
    var html='';
    try {
        var data = obj.query.results.json.data;
        for (var i = 0; i < 10; i++) {
            html += '<tr><td><img src="' + data[i].icon + '"></td><td>' + data[i].name + '</td><td>' +
						     data[i].id + '</td><td>' + "<a class='play'>" + "Play</a>" + '</td><td>' + 
								 data[i].length + " minutes" + '</td></tr>';
        }
        html = '<table>' + html + '</table>';
    }
    catch(e) {
        html = 'No search results.' 
    }
    document.getElementById('output').innerHTML = html;
}

// cross-domain ajax via proxy 
function search() {
    var keyword = document.getElementById('keyword').value;
    keyword     = keyword.replace(/\s/g,'+');
    var proxy   = 'https://query.yahooapis.com/v1/public/yql';
    var query   = "?q=" + encodeURIComponent( "select * from json where url='http://rdio-service.herokuapp.com//search?q=" + keyword + "'" ); 
    var options = '&diagnostics=true&format=json&callback=callback';
    var head    = document.head
    var script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = proxy + query + options;
    head.appendChild(script);
}
 
var button = document.getElementById("get-albums");
button.addEventListener("click", function() {
		window.setTimeout(function() {
				var links = document.querySelectorAll("td > a");
				for (var i = 0; i < 10; i++) {
						links[i].addEventListener("click", function() {
								apiswf.rdio_play(this.parentNode.previousSibling.innerHTML);
					})
				}
		},4000);
});
 
$(document).ready(function() {
		$("#album-header").hide();
		$("#get-albums").click(function() {
				$("#album-header").show(2400);
		});
});
