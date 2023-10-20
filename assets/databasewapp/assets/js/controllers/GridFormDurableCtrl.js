'use strict';
/** 
 * controllers for GoogleMap  
 * AngularJS Directive 
 */
app.controller("GridFormDurableCtrl", ["$scope", "$http", "$timeout", "$stateParams", "SweetAlert", "test",
    function($scope, $http, $timeout, $stateParams, SweetAlert, test) {
        var selected = [];
        var dt = $('#durable_list').DataTable({
            "processing": true,
            "serverSide": true,
            "ajax": "assets/scripts/server_processing_durable.php",
            "columns": [{
                "class": "details-control",
                "orderable": false,
                "data": null,
                "defaultContent": "",
                "width": "10px"
            }, {
                "data": "1"
            }, {
                "data": "2"
            }, {
                "data": "3"
            }, {
                "data": "5"
            }, {
                "data": "6"
            }, {
                "data": "7"
            }, {
                "data": "8"
            }, {
                "data": "9"
            }, {
                "data": "10"
            }, {
                "data": "12"
            }],
            "columnDefs": [{
                // The `data` parameter refers to the data for the cell (defined by the
                // `data` option, which defaults to the column being worked with, in
                // this case `data: 0`.
                "render": function(url, type, full) {
                    return '<img width="80px" src="' + full[9] + '"/>';
                },
                "width": "20%",
                "data": "img",
                "targets": 8 // column index 
            }],
            "dom": '',
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            dom: 'Blfrtip',
            buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
            "scrollX": true,
            "scrollY": "400px",
            "order": [
                [1, 'asc']
            ]
        });
        // Array to track the ids of the details displayed rows
        var detailRows = [];
        $('#durable_list tbody').on('click', 'tr td.details-control', function() {
            var tr = $(this).closest('tr');
            var row = dt.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);
            if (row.child.isShown()) {
                tr.removeClass('details');
                row.child.hide();
                // Remove from the 'open' array
                detailRows.splice(idx, 1);
            } else {
                tr.addClass('details');
                row.child(format(row.data())).show();
                // Add to the 'open' array
                if (idx === -1) {
                    detailRows.push(tr.attr('id'));
                }
            }
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            var testedit = table.row('.selected').data();
            $.ajax({
                url: "assets/views/action/returnTableDurableDetails.php",
                type: "POST",
                data: {
                    sCode: testedit[0]
                }
            }).success(function(result) {
                var obj = jQuery.parseJSON(result);
                if (obj == '') {
                    alter
                    $('input[type=text]').val('');
                } else {
                    $.each(obj, function(key, inval) {
                        $("#txtdurablelistid").val(inval["DURABLELIST_ID"]);
                        $("#txtdurable_numberid").val(inval["DURABLE_NO_ID"]);
                        $('#txtDurableName').val(inval["DURABLE_NAME_ID"]);
                        $('#txtDurablePrice').val(inval["PRICE"]);
                        $('#txtPlaceAlways').val(inval["PLACE_ALWAYS_ID"]);
                        $('#txtRoom').val(inval["ROOM_ID"]);
                        $('#txtPlace').val(inval["PLACE_ID"]);
                        $('#txtOwner').val(inval["OWNER_ID"]);
                        $('#txtNote').val(inval["NOTE"]);
                    });
                }
            })
        });
    }
])