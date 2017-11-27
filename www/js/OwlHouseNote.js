document.body.className += ' fade-out';


var CurrentNoteSideFront = true;

//******************************************************************************************************
// This will fire after the entire page is loaded, including images. 
// Note that this call is JQuery vers 3 compliant. 
$(window).on("load", function(e) {
    //// Correct the height of the main note container which will be collapsed. Set its height to mirror the height of the note when the browser first starts
    var imgHeight = $(".front img").height();
    $(".rotatingNoteContainer").css("height", imgHeight);

    imgHeight = $(".imgFeatureWith2ImageCrossfade img").height();
    $(".imgFeatureWith2ImageCrossfade").css("height", imgHeight);


    $('body').removeClass('fade-out');
    
});

$(document).ready(function(e) {
    //
    // Setup a handler to cope with the rotate button
    $("#clickToRotate").click(function(event) {
        if (CurrentNoteSideFront) {
            $("#imgBack").removeClass("rotateBackImageToShowFrontOfNote");
            $("#imgFront").removeClass("rotateFrontImageToShowFrontOfNote");
            //
            $("#imgBack").addClass("rotateBackImageToShowBackOfNote");
            $("#imgFront").addClass("rotateFrontImageToShowBackOfNote");
            CurrentNoteSideFront = false;
        }
        else {
            $("#imgBack").removeClass("rotateBackImageToShowBackOfNote");
            $("#imgFront").removeClass("rotateFrontImageToShowBackOfNote");
            //
            $("#imgBack").addClass("rotateBackImageToShowFrontOfNote");
            $("#imgFront").addClass("rotateFrontImageToShowFrontOfNote");
            CurrentNoteSideFront = true;
        }
    });

    //
    // There is a problem with IE11 - a known bug which means that when backface hidden is set to on and a note is animated
    // the note will be hidden until the animation is complete. Its a known problem, MS have fixed it in edge, but will not
    // be fixing it in IE. IE11 is being sidelined and only security problems are now being fixed. As such - we need to remove
    // the transition animation of the note if IE11 is being used by the client
    if (!!navigator.userAgent.match(/Trident\/7\./)) {
        $(".rotatingNoteContainer div").css("transition", "none");
        $(".rotatingNoteContainer div").css("-ms-transition", "none");
        $(".rotatingNoteContainer div").css("-webkit-transition", "none");
        $(".rotatingNoteContainer div").css("-moz-transition", "none");
        $(".rotatingNoteContainer div").css("-o-transition", "none");
        //
        $("#IE11Warning").removeClass("IE11WarningHide");
        $("#IE11Warning").addClass("IE11WarningShow");
    }


});


// Correct the height of the main note container which will be collapsed whenever the browser
// is resized. Set the container height to mirror the height of the note floated inside
$(window).resize(function() {
    var imgHeight = $(".front img").height();
    $(".rotatingNoteContainer").css("height", imgHeight);


    imgHeight = $(".imgFeatureWith2ImageCrossfade img").height();
    imgHeight = imgHeight + 4;
    $(".imgFeatureWith2ImageCrossfade").css("height", imgHeight);

});


//*******************************************************************************************************************
// Users need to be able to move the main note display under mouse control but we don't want windows to think a drag
// is starting, cos if it does, it will add a shadow image of the note. Most browsers accept "draggable=false" in the
// image tag markup - but firefox won't. So we need to link a function to any image where a mouse down occurs - so that
// dragging is blocked. Start by registering the windows onLoad event with an anonymous function
window.onload = function(e) {
    var evt = e || window.event,    // define event (cross browser)
        imgs,                       // images collection
        i;                          // used in local loop
    // if preventDefault exists, then define onmousedown event handlers
    if (evt.preventDefault) {
        // collect all images on the page
        imgs = document.getElementsByTagName('img');
        // loop through fetched images
        for (i = 0; i < imgs.length; i++) {
            // and define onmousedown event handler
            imgs[i].onmousedown = disableDragging;
        }
    }
};


// disable image dragging
function disableDragging(e) {
    e.preventDefault();
}



