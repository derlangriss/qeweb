"use strict";
jwplayer.key="Dtw8XIrirt0jOoDeYv+GewD2piVCeaDQezuMKg==";

/* -------------------------------------------------------------------------*
 * 						POST LIKES
 * -------------------------------------------------------------------------*/
 	jQuery(document).ready(function(jQuery){
		var adminUrl = ot.adminUrl;
		jQuery('.ot-like-button').click(function() {
		var postID = jQuery(this).data("id");
		jQuery.ajax({
			url:adminUrl,
			type:"POST",
			data:"action=OT_setPostLike&post_ID="+postID,
			success:function(results) {
				if(jQuery.cookie(ot.THEME_NAME+'_post_likes_count_'+postID)!=1 && results==1){
					jQuery.cookie(ot.THEME_NAME+'_post_likes_count_'+postID, 1, { path: ot.themeUrl, expires: 258 }); 
				} else {
					jQuery.cookie(ot.THEME_NAME+'_post_likes_count_'+postID, null, { path: ot.themeUrl }); 
				}
			}
		});
		return false;

		});


		jQuery(".video-slider").on("ot-slider-change", function(event, elementID, elementHREF, elementREL) {

			var postID = elementREL;
			jQuery.ajax({
				url:adminUrl,
				type:"POST",
				data:"action=OT_next_slider_video&post_ID="+postID,
				success:function(results) {
					jQuery("#ot-video-slider-content").html(results);
				}
			});
		});



		return false;


	});


