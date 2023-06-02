'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("testblankCtrl", ["$scope", "$http",
    function($scope, $http) {
        var table = $('#example').dataTable();
        	table.fnAddTr( $('<tr>'+
		       '<td>1</td>'+
		       '<td>2</td>'+
		       '<td>3</td>'+
		       '<td>4</td>'+
		       '<td>5</td>'+
		       '<td>6</td>'+
		    '</tr>')[0]
		  );
    }
])