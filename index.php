<html>

  <head>
    <title>Rdio Player</title>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="stylesheets/styles.css">
  </head>
  
  <body>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Rdio Player</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="active"><a href="songs.html">Find Songs<span class="sr-only">(current)</span></a></li>
            <li><a href="artists.html">Find Artists</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">+
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <section class="lead">
      <h1 class="text-center">Rdio Player</h1>
    </section>

    <div class="container">

      <div id="upsell" class="alert alert-info alert-dismissable">
        <div id="subscriber">You are an Rdio subscriber. You're awesome.</div>
        <div id="trial">You are an Rdio trial user, Subscribe now!</div>
        <div id="free">You are an Rdio Free user with <span id="remaining"></span>% of your quota remaining, subscribe now!</div>
        <div id="nobody">To hear full tracks subscribe to Rdio.</div>
      </div>

      <div id="apiswf"></div>
        <div class="well" style="overflow: hidden;">
          <div class="row" style="margin-bottom: 10px;">
            <div class="col-md-2">Enter Album Key</div>
            <div class="col-md-10">
              <input id="play_key" class="form-control" value="a594784">
            </div>
          </div>
          <div class="row">
            <div class="col-md-6"> 
              <div class="playControls btn-group">
                <button id="play" class="btn btn-primary"><i class="fa fa-play-circle"></i> Play</button>
                <button id="stop" class="btn btn-danger"><i class="fa fa-stop"></i> Stop</button>
                <button id="pause" class="btn btn-warning"><i class="fa fa-pause"></i> Pause</button>
                <button id="previous" class="btn btn-success"><i class="fa fa-step-backward"></i> Previous</button>
                <button id="next" class="btn btn-success"><i class="fa fa-step-forward"></i> Next</button>
                <button id="mute" class="btn btn-primary"><i class="fa fa-volume-off"></i> Mute</button>
              </div>
            </div>
            <div class="col-md-6"> 
              <div id="freq" class="frequency">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row well">
          <div class="artistAlbumInfo well col-md-6 ">
            <h3><span id="artist"></span> - <span id="track"></span></h3>
            <img src="" id="art" class="albumArt">
          </div>
          <div class="col-md-6">
            <h3 id="album"></h3>
            <h4>Playstate <p id="playState"></p></h4>
            <h4>Position <p id="position"></p></h4>
          </div>
        </div>
  </div>

    <script src="js/jquery-1.5.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    
  </body>
</html>