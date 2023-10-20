function colectionlist(){
		$.ajax({
			  url: "views/dataentry/simpleform/getlistbox.php",
			  global: false,
			  type: "GET",
			  data: ({ID : $("#District").val(),TYPE : "Proviance"}),
			  dataType: "JSON",
			  async:false,
			  success: function(jd) {
							var opt="<option value=\"0\" selected=\"selected\">---collectionmethod---</option>";
							$.each(jd, function(key, val){
								opt +="<option value='"+ val["idcollectionmethods"] +"'>"+val["collectionmethodsdetails"]+"</option>"
    						});
							$("#Proviance").html( opt );
		   	  }
		});
}
