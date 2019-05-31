jQuery(document).ready(function() {
	
	/*
	    Navigation
	*/
	// toggle "navbar-no-bg" class
	$('.top-content .text').waypoint(function() {
		$('nav').toggleClass('navbar-no-bg');
	});
	
    /*
        Background slideshow
    */
    
    /*
        Wow
    */
    new WOW().init();
	
});
