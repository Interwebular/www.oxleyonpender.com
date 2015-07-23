(function( $ ){

	var documentHeight = $(window).height();
	var documentWidth  = $(window).width();

	var squareSmall    = $('.component-square_sm');
	var squareLarge    = $('.component-square_lg');
	var heroUnit       = $('.component-hero-unit');
	var imagePanel     = $('.component-image-panel');
	var fitWindowFull  = $('.component-fit-window_full');
	var fitWindowHalf  = $('.component-fit-window_half');



	function setDimensions() {

		var $currentDocumentHeight  = $(window).height(),
			$currentDocumentWidth   = $(window).width(),
			$squareSmallWidth       = fitWindowHalf.width(),
			$squareLargeWidth       = fitWindowFull.width();

		squareLarge.css('height', $squareLargeWidth + 'px');
		squareSmall.css('height', ($squareLargeWidth / 2) + 'px');
		heroUnit.css('height', ($currentDocumentHeight * 0.95) + 'px');
		imagePanel.css('height', ($currentDocumentHeight * 0.6) + 'px');
		fitWindowFull.css('height', $currentDocumentHeight + 'px');
		fitWindowHalf.css('height', ($currentDocumentHeight / 2) + 'px');

		$('[data-height]').each(function(){
			if( $(this).data('height') === 'multi' ) {
				var newHeight = 0;
				var add = $(this).data('height-add').split(',');
				var minus = $(this).data('height-minus').split(',');
				for(var i=0; i<add.length; i++){
				    newHeight += $(add[i]).height();
				}
				for(var i=0; i<minus.length; i++){
				    newHeight-= $(minus[i]).height();
				}
				$(this).css('height', newHeight + 'px');
			}
			else {
				$(this).css('height', $($(this).data('height')).height() + 'px');
			}
		});
	}

	function setBackgroundImages() {
		$('[data-bg]').each(function(){
			var $this  = $(this),
				$bg    = $this.data('bg'),
				$pos1  = $this.data('bg-pos-one'),
				$pos2  = $this.data('bg-pos-two'),
				$pos3  = $this.data('bg-pos-three'),
				$extraClasses;

			if( $pos1 === 'top' ) {
				$extraClasses += ' component-background-top20';
			}
			else if( $pos1 === 'bottom' ) {
				$extraClasses += ' component-background-bottom20';
			}
			if( $pos2 === 'left' ) {
				$extraClasses += ' component-background-left20';
			}
			else if( $pos2 === 'right' ) {
				$extraClasses += ' component-background-right20';
			}
			if( $pos3 === 'right' ) {
				$extraClasses += ' component-background-right20';
			}

			$this.append('<div class="component-background '+$extraClasses+'" style="background-image: url('+$bg+')"></div>');
		});
	}

	function smoothScrolling() {
		var $window = $(window);
		var scrollTime = .5;
		var scrollDistance = 90;
		$window.on("mousewheel DOMMouseScroll", function(event){
			event.preventDefault();
			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);
			TweenMax.to($window, scrollTime, {
			scrollTo : { y: finalScroll, autoKill:true },
				ease: Power1.easeOut,
				overwrite: 5
			});
		});
	}



	$(document).ready(function(){
		setDimensions();
		setBackgroundImages();
		smoothScrolling();
	});
	$(window).resize(function(){
		setDimensions();
	});



	$('.open-menu').click(function(event){
		$('.mobile-nav-wrapper').fadeIn();
		event.preventDefault();
	});
	$('.close-menu').click(function(event){
		$('.mobile-nav-wrapper').fadeOut();
		event.preventDefault();
	});

	// SMOOTH SCROLL TO
	$('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 2500);
                return false;
            }
        }
    });
	// END: SMOOTH SCROLL TO


	$('form').submit(function(){

	        var valid = true;

	        $('.error-message').hide();
	        $('.submit-error').hide();
	        $('input').removeClass('input-error');
	        $('select').removeClass('input-error-select');


	        if( ! $('#FirstName').val() ) {
	            $('#FirstName').addClass('input-error');
	            valid = false;
	        }
	        if( ! $('#LastName').val() ) {
	            $('#LastName').addClass('input-error');
	            valid = false;
	        }
	        if( ! $('#Phone_1').val() ) {
	            $('#Phone_1').addClass('input-error');
	            valid = false;
	        }
	        if( ! $('#Email').val() ) {
	            $('#Email').addClass('input-error');
	            valid = false;
	        }
	        if( ! $('#Source').val() ) {
	            $('#Source').addClass('input-error-select');
	            valid = false;
	        }


	        if( ! valid ) {
	            $('.submit-error').show();
	            return false;
	        }
	        else { return true; }

	    });

})( jQuery );
