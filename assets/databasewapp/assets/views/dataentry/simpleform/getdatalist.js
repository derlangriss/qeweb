function colectionmethodlist(){
		$.ajax({
			  url: "views/dataentry/simpleform/getcollectionmethodlist.php",
			  global: false,
			  type: "GET",
			  dataType: "JSON",

			  success: function(methodlist) {
							var opt="<option value=\"0\" selected=\"selected\">---collectionmethod---</option>";
							$.each(methodlist, function(key, val){
								opt +="<option value='"+ val["idcollectionmethods"] +"'>"+val["collectionmethodsdetails"]+"</option>"
    						});
							$("#txtcollection_method_ID").html( opt );
		   	  }
		});
            
}
function collectorlist(){
    $.ajax({
			  url: "views/dataentry/simpleform/getcollectorlist.php",
			  global: false,
			  type: "GET",
			  dataType: "JSON",

			  success: function(collectlist) {
							var opt="<option value=\"0\" selected=\"selected\">---collector---</option>";
							$.each(collectlist, function(key, val){
								opt +="<option value='"+ val["idcollectors"] +"'>"+val["collectorsen"]+"</option>"
    						});
							$("#txtcollector_ID").html( opt );
		   	  }
		});
    }