'use strict';
/**    
 * controller for ngImgCrop
 * Simple Image Crop directive for AngularJS.
 */
app.controller('collectorTblCtrl', ["$http", "$scope", "$location", "flowFactory", function($http, $scope, $location, $state, flowFactory) {
    $scope.obj = new Flow();
    $scope.collectordetail = {
        avatar: 'assets/images/avatar-1-xl.jpg'
    };
    $scope.collectorInfo = {
        avatar: 'assets/images/avatar-1-xl.jpg',
    };

    function getIfNotSet(value, newValue, overwriteNull) {
        if (typeof(value) === 'undefined' && overwriteNull === true) {
            return newValue;
        } else if (value === null && overwriteNull === true) {
            return newValue;
        } else if (value === 0 && overwriteNull === true) {
            return newValue;
        } else if (value === '' && overwriteNull === true) {
            return newValue;
        } else {
            return value;
        }
    }
    var dataarr = [];
    var table = $('#collectorTbl').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "assets/scripts/server_processing_collector.php",
            "type": "POST"
        },
        "rowCallback": function(row, data) {
            if ($.inArray(data.DT_RowId, dataarr) !== -1) {
                $(row).addClass('selected');
            }
        },
        "dom": '<"top"lf><"clear">rtp<"bottom"i>',
        "scrollX": true,
        "scrollY": "450px",
        "scrollCollapse": true,
        "order": [
            [0, "asc"]
        ],
        "columns": [{
            "class": "select-checkbox",
            "orderable": false,
            "data": null,
            "defaultContent": ""
        }, {
            "data": "0",
            "width": "20%"
        }, {
            "data": "1",
            "width": "20%"
        }, {
            "data": "2",
            "width": "20%"
        }, {
            "data": "3",
            "width": "20%"
        }, {
            "data": "4",
            "width": "10%"
        }],
        "columnDefs": [{
            render: function(data, type, full, meta) {
                return '<a href="' + "#/app/form/collection_data/" + full[0] + '"' + 'class="btn btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-pencil' + '"></i>' + '</a>' + '<a ' + 'class="delete btn-transparent btn-xs"' + '>' + '<i class="' + 'fa fa-times fa fa-white' + '"></i>' + '</a>';
            },
            targets: 6
        }, {
            "render": function(data, type, full, meta) {
                return '<img width="30px" alt="image"  class="img-circle" src="' + full[4] + '"/>';
            },
            "width": "15%",
            "data": "img",
            "targets": 5 // column index 
        }],
        order: [
            [1, 'asc']
        ]
    });
    $('#collectorTbl tbody').on('click', '.select-checkbox', function(event) {
        var tr = $(this).closest('tr');
        var data = table.row($(this).closest('tr')).data();
        var id = data.DT_RowId;
        var index = $.inArray(id, dataarr);
        var a = data[0];
        var b = data[1];
        var c = data[2];
        var d = data[3];
        var e = data[4];
        var data = $.param({
            collector_id: id
        });
        if (index === -1) {
            dataarr.splice(index, 1);
            dataarr.push(id);
        } else {
            dataarr.splice(index, 1);
        }
        if ($(tr).hasClass('selected')) {
            $(tr).removeClass('selected');
            $http({
                method: 'POST',
                url: "assets/views/action/return_CollectorDetails.php",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.Specdetails = response;
                $scope.resetcollectordetails();
            });
        } else {
            table.$('tr.selected').removeClass('selected');
            $(tr).addClass('selected');
            $http({
                method: 'POST',
                url: "assets/views/action/return_CollectorDetails.php",
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }).success(function(response) {
                $scope.collectorde = response;
                $scope.collectordetail.collector_id = $scope.collectorde[0].collector_id;
                $scope.collectordetail.collectorfirstEN = $scope.collectorde[0].collector_firstname_en;
                $scope.collectordetail.collectorlastEN = $scope.collectorde[0].collector_lastname_en;
                $scope.collectordetail.collectorfirstTH = $scope.collectorde[0].collector_firstname_th;
                $scope.collectordetail.collectorlastTH = $scope.collectorde[0].collector_lastname_th;
                $scope.collectordetail.avatar = $scope.collectorde[0].images_path;
            });
        }
    });
    $scope.upload = function() {
        $scope.obj.flow.opts.target = './assets/views/action/uploadflow.php'
        $scope.obj.flow.opts.testChunks = false
        $scope.obj.flow.upload();
    }
    $scope.collectorIns = function(Mode) {
        var a = $scope.collectordetail.collectorfirstEN;
        var b = $scope.collectordetail.collectorlastEN;
        var c = $scope.collectordetail.collectorfirstTH;
        var d = $scope.collectordetail.collectorlastTH;
        var e = getIfNotSet($scope.collectordetail.collector_id, null, true);
        var data = $.param({
            tcollectorfirstEN: a,
            tcollectorlastEN: b,
            tcollectorfirstTH: c,
            tcollectorlastTH: d,
            tcollectorid: e
        });
        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        /*
        $http.post('assets/views/action/dbinsertMethod.php', data, config).success(function(data, status, headers, config) {
            $scope.PostDataResponse = data;
        })
        */
        $http({
            method: 'POST',
            url: 'assets/views/action/dbinsertCollector.php',
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).success(function(response) {
            $scope.collector_id = response[0].collector_id;
            angular.forEach($scope.obj.flow.files, function(value, key) {
                $scope.imgname = value.name;
            });
            if ($scope.obj.flow.files.length !== 0) {
                $scope.collectorimg($scope.collector_id, $scope.imgname);
            } else {
                $scope.noneimg($scope.collector_id);
            }
            $scope.obj.flow.opts.simultaneousUploads = 1;
            $scope.obj.flow.opts.target = './assets/views/action/uploadflow.php';
            $scope.obj.flow.opts.query = {
                "collector_id": $scope.collector_id
            };
            $scope.obj.flow.opts.testChunks = false
            $scope.obj.flow.upload();
            $(':input', '#collectorform').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
        });
    }
    $scope.uploader = {
        controllerFn: function($flow, $file, $message) {
            table.draw();
            $flow.cancel();
        }
    };
    $("#collectorTbl tbody").on("click", "a.btn02", function(event) {
        var data = table.row($(this).parents('tr')).data();
        var collectorid = data[0];
        $.ajax({
            type: "POST",
            url: "assets/views/action/DeleteDataCollector.php",
            data: {
                "idtable": collectorid
            },
            dataType: "text",
            success: function(data) {
                var asd = document.getElementById("msg");
                if (data.indexOf("ERROR::") == -1) {
                    $('div#msg').removeClass().addClass('success');
                    table.draw();
                } else {
                    $('div#msg').removeClass().addClass('failure');
                    asd.innerHTML = "The User Id(s) you have entered<br/> cannot be Deleted!!</br> " + data;
                    //alert("The User Id(s) you have entered cannot be Deleted!! <br/> "+data);
                    table.draw(false);
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                table.draw();
            }
        });
    })
    $scope.removeImage = function() {
        $scope.noImage = true;
    };
    $scope.obj = {};
    if ($scope.collectorInfo.avatar == '') {
        $scope.noImage = true;
    }
    $scope.noneimg = function(viewValue) {
        return $http.get('./assets/views/action/dbinsertCollector02.php?collector_id=' + viewValue).then(function(res) {
            console.log(res.data);
            table.draw();
        });
    }
    $scope.collectorimg = function(id, filename) {
        return $http.get('./assets/views/action/dbinsertCollector03.php?collector_id=' + id + '&&imgname=' + filename).then(function(res) {
            console.log(res.data);
            table.draw();
        });
    }
    $scope.resetcollectordetails = function() {
        $scope.collectordetail = {};
        $scope.collectordetail.collectorfirstEN = "";
        $scope.collectordetail.collectorlastEN = "";
        $scope.collectordetail.collectorfirstTH = "";
        $scope.collectordetail.collectorlastTH = "";
    }
}]);