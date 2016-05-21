var playing = false;

var myPlayer;
var currentVideo;
var slider;
var button;
var uiTime;
var uiRow;
var fullscreen = 0;

function setup() {
    noCanvas();

    //// BS FLUID CONTAINER
    myPlayer = createContainer("myPlayer").id("playerContainer");

    // ROW 01 VIDEO
    vrow = createRow("videoFrame").parent(myPlayer);

    //video elt
    currentVideo = createVideo([
            'media/loop.mp4',
            'media/loop.webm',
            'media/loop.ogv'],
        videoReady);
    currentVideo.style("width", "100%").id("videoElt").parent(vrow);
    currentVideo.pause();

    // ROW 02 UI BAR

    uiRow = createRow("uibar").parent(myPlayer);

    //play-pause button
    aCol = createCol('col-xs-1', uiRow);
    button = createButton('').parent(aCol).addClass("fa fa-play-circle playButton");
    button.mousePressed(togglePlay);

    //current time
    cCol = createCol('col-xs-1', uiRow);
    uiTime = createElement("p", "current time").parent(cCol).addClass("playerCurrentTime");

    //duration
    //bCol = createCol('col-xs-1', uiRow);
    //uiDur = createElement("p", "duration").parent(bCol).addClass("playerDuration");

    //fullscreen
    bCol = createCol('col-xs-1', uiRow);
    uiFs = createElement("p").parent(bCol).addClass("fa fa-arrows-alt").addClass("fullscreen");
    uiFs.mousePressed(toggleFullScreen);


}
function keyPressed() {
  if (keyCode == ESCAPE) {
      fullscreen=0;

  }
  }
function toggleFullScreen() {
    videoElt = document.getElementById("videoElt");

  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    if (videoElt.requestFullscreen) {
      videoElt.requestFullscreen();
    } else if (videoElt.mozRequestFullScreen) {
      videoElt.mozRequestFullScreen();
    } else if (videoElt.webkitRequestFullscreen) {
      videoElt.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
      fullscreen=1;
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
      fullscreen=0;
  }
}

function videoReady() {

    var len = currentVideo.duration();
    dCol = createCol('col-xs-9', uiRow);
    slider = createSlider(0, len, 0, 0.1).parent(dCol);
    slider.input(scrub);
}

/* SCRUB FROM THUMB*/
function scrub() {
    currentVideo.time(slider.value());
}

/*SIMPLE BOOTSTRAP SHORTCUT FUNCTIONS.*/
function createContainer(aClass) {
    a = createElement("div").addClass('container-fluid').addClass(aClass).style("text-align", "center");
    return a

}

function createCol(colsettings, parent) {
    a = createElement("div").addClass(colsettings).parent(parent).style("text-align", "center");
    return a
}

function createRow(customClass) {
    a = createElement("div").addClass("row").addClass(customClass);
    return a
}


/*PLAY TOGGLE (with FontAwesome Icons)*/
function togglePlay() {
    if (playing) {
        currentVideo.pause();
        try {
            button.removeClass("fa fa-pause-circle");
        }
        catch (e) {
            println(e);
        }
        button.addClass("fa fa-play-circle");
    } else {
        try {
            button.removeClass("fa fa-play-circle");
        }
        catch (e) {
            println(e);
        }

        currentVideo.loop();
        button.addClass("fa fa-pause-circle");
    }
    playing = !playing;
}

/*DRAW TO GET CURRENT TIME AND MOVE THE THUMB OF THE SLIDER AND TO ADJUST THE PLAYER IN FULLSCREEN*/
function draw() {
    if (playing) {
        slider.value(currentVideo.time());
    }

    if (
	document.fullscreenEnabled ||
	document.webkitFullscreenEnabled ||
	document.mozFullScreenEnabled ||
	document.msFullscreenEnabled){



    }



    uiTime.html(Math.floor(currentVideo.time()) + "/" + Math.floor(currentVideo.duration()));


}
