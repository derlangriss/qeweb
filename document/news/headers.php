<?php
function header_html()
{ 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
	<head>
	<title>QSBG insects</title>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" href="/css/style.css" type="text/css" media="screen"/>
       	<script type="text/javascript" src="/js/jquery-1.3.2.js"></script>
	<link rel="shortcut icon" type="image/x-icon" href="/css/images/iconweb.ico" />
	
	<link href="/css/article.css" rel="stylesheet" type="text/css" />
	
	<link rel="stylesheet" href="/css/style_menu.css" type="text/css" media="screen"/>
	

<link rel="stylesheet" type="text/css" href="/css/content_slider_style.css" />

<script type="text/javascript" src="/js/jquery-ui.min.js" ></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("#featured > ul").tabs({fx:{opacity: "toggle"}}).tabs("rotate", 4000, true);
	});
</script>



	<!--
	jQuery start-stop slider
	-->
	<script type="text/javascript" src="/js/startstop-slider.js"></script>
	<!--
	jCarousel vertical news
	-->
	<script src="/js/jcarousellite_1.0.1.pack.js" type="text/javascript"></script>
	<script src="/js/vertical-slider.js" type="text/javascript"></script>
	
	<!--
	jCarousel gallerylist&database menu
	-->
	<script type="text/javascript" src="/js/jquery.jcarousel.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/gallerylist.css" />
	
	
	<!--
	jCarousel gallerylist scripts
	-->
	<script type="text/javascript">

	jQuery(document).ready(function() {
	jQuery('#mycarousel').jcarousel({
    	wrap: 'circular'
	 });
	});

	</script>
	
	
	
	
	<!-- photo mainpage -->
	<link href="/css/stylesmetro.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="/js/jquery.coda-slider-2.0.js"></script>
	
	<!-- scripts for photo slider header-->
	<script type="text/javascript">
	$().ready(function() {
        $('#coda-slider-2').codaSlider({
           autoSlide: true,
           autoSlideInterval: 6000,
           autoSlideStopWhenClicked: true	
			   
         });
         });
        </script>
	
	
	<!--
	jCarousel database menu
	-->
        <link rel="stylesheet" type="text/css" href="/css/styledatabase.css" />
	<!--
	jCarousel popup
	-->
	<script type="text/javascript" src="/js/top_up-min.js"></script>
	

	
		
		
		
		
		
		
	<!--
	jQuery header
	-->
		
		
	<script type="text/javascript">
			$( function() {
				var d=300;
				$('#navigation a').each( function() {
					$(this).stop().animate({
						'marginTop':'-60px'
					},d+=150);
				});
				$('#navigation > li').hover( function () {
					$('a',$(this)).stop().animate({
						'marginTop':'-2px'
					},150);
				}, function () {
					$('a',$(this)).stop().animate({
						'marginTop':'-60px'
					},150);
				}
				);
			});
	</script>
	
	
       <link rel="stylesheet" type="text/css" media="screen" href="/css/css-table.css" />
	<script type="text/javascript" src="/js/style-table.js"></script>
	
	<link rel="stylesheet" href="/css/reset.css" type="text/css" media="all">
<link rel="stylesheet" href="/css/prettyPhoto.css" type="text/css" media="all">
<link rel="stylesheet" href="/css/layout.css" type="text/css" media="all">




<script type="text/javascript" src="/js/atooltip.jquery.js"></script>
<script src="/js/roundabout.js" type="text/javascript"></script>


<script type="text/javascript" src="/js/jquery.prettyPhoto.js"></script>
<script type="text/javascript" src="/js/hover-image.js"></script>
<script type="text/javascript" src="/js/tabs.js"></script>

<!--[if lt IE 9]>
	<script type="text/javascript" src="/js/html5.js"></script>
	<style type="text/css">
		.bg {behavior:url(js/PIE.htc)}
	</style>
<![endif]-->
<!--[if lt IE 7]>
	<div style='clear:both;text-align:center;position:relative'>
		
	</div>
<![endif]-->






<script type="text/javascript">
	$(document).ready(function() {
		$('#myRoundabout').roundabout({
			 shape: 'square',
			 minScale: 0.93, // tiny!
			 maxScale: 1, // tiny!
			 easing:'easeOutExpo',
			 clickToFocus:'true',
			 focusBearing:'0',
			 duration:800,
			 reflect:true
		});
		tabs.init();
		// for lightbox
		if ($("a[rel^='prettyPhoto']").length) {
			$(document).ready(function() {
				// prettyPhoto
				$("a[rel^='prettyPhoto']").prettyPhoto({theme:'light_square'});
			});
		} 
	});
</script>

<!--
Main Menu
-->
<script type="text/javascript">
        $(function() {
            $('#mainmenu > li').hover(
                function () {
                    var $this = $(this);
                    $('a',$this).stop(true,true).animate({
                            'bottom':'-55px'
                        }, 300);
                    $('i',$this).stop(true,true).animate({
                            'top':'-10px'
                        }, 400);
                },
                function () {
                    var $this = $(this);
                    $('a',$this).stop(true,true).animate({
                            'bottom':'-90px'
                        }, 300);
                    $('i',$this).stop(true,true).animate({
                            'top':'50px'
                        }, 400);
                }
            );
        });
        </script>
<?php
}
?>
	</head>