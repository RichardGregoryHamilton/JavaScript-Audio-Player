var playback_token = "GCNVc2V4_____2R2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbnBvbGFyLWVzY2FycG1lbnQtNTc4Ny5oZXJva3VhcHAuY29tX5h-UYi3_C4BMzoNllEIfw=="
var domain = "polar-escarpment-5787.herokuapp.com";

var apiswf = null;

$(document).ready(function() {

    var flashvars = { 'playbackToken': playback_token,
                      'domain': domain,
                      'listener': 'callback_object'
                    };
      
    var params = { 'allowScriptAccess': 'always' };
    
    var attributes = {};
    swfobject.embedSWF('http://www.rdio.com/api/swf/', 'apiswf', 1, 1, '9.0.0',
                       'expressInstall.swf', flashvars, params, attributes);


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
    
    $("#mute").click(function() {
        text = $(this).text();
        $(this).text(text == " Mute" ? " Un-mute" : " Mute");
        $(this).children().toggleClass("fa-volume-off");
        apiswf.rdio_setVolume(0);
    });
});

var callback_object = {};

callback_object.ready = function ready(user) {

  apiswf = $('#apiswf').get(0);

  apiswf.rdio_startFrequencyAnalyzer({ frequencies: '10-band',
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

callback_object.positionChanged = function positionChanged(position) {
    $('#position').text(position);
}

callback_object.updateFrequencyData = function updateFrequencyData(arrayAsString) {

    var arr = arrayAsString.split(',');

    $('#freq div').each(function(i) {
        $(this).width(parseInt(parseFloat(arr[i])*500));
    })
}

/* Search */

function callback( obj ) {
    var html = '';
    try {
        var data = obj.query.results.json.data;
        for (var i = 0; i < 10; i++) {
            html += '<tr><td><img src="' + data[i].icon + '"></td><td>' + "<a class='play'>" + data[i].name + '</a></td><td>' +
                 data[i].id + '</td><td>' + data[i].length + " minutes" + '</td></tr>';
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
 
function showAlbums() {
    $("#album-header").show(2000);
    search();
}

$(document).ready(function() {
    
    $("#album-header").hide();
    
    $("#get-albums, #keyword").on("click blur", function() {
        window.setTimeout(function() {
            links = $("td > a");
            for (var i = 0; i < 10; i++) {
                $(links).eq(i).on("click", function() {
                    apiswf.rdio_play($(this).parent().next().text());
                })
            }
        },4000);
    })
    
    $("#get-albums").on("click", function() {
        showAlbums();
    });
    
    $("#keyword").on("focus", function(){
        $(this).on("keypress", function(event){
            if (event.which === 13) {
                showAlbums();
                $("#keyword").blur();
            }
        });
    });
    $("#album-label").on("click", function() {
      $("#get-albums").text("Get Albums");
      $("#get-albums").removeClass("btn-success")
                      .addClass("btn-primary");
    })
    $("#artist-label").on("click", function() {
        $("#get-albums").text("Get Artists");
        $("#get-albums").removeClass("btn-primary")
                        .addClass("btn-success");
    })
});
