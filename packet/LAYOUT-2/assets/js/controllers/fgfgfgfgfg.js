 buttons: [{
                extend: 'alert',
                text: 'Add to print queue',
                className: 'btn btn-wide-40 btn-transparent',

                enabled: true
            }, {
                text: 'Select all',
                action: function(row) {
                    table.rows().select();
                    $(row).addClass('selected');
                    var data = table.rows('.selected').select().data();
                    /*
                      var dataaa = table.rows().select().length;
                                        for (var i = 0; i < aTrs.length; i++) {
                                           var b  = aTrs[i]['DT_RowId']
                    console.log(b);
                                        }
                                        var aReturn = new Array();
                                        var aTrs = table.rows('.selected').nodes();
                                        var test = table.rows('.selected').data();*/
                    for (var i = 0; i < data.length; i++) {
                        dataarr.push(data[i]['DT_RowId']);
                    }
                    return dataarr;
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                text: 'Select none',
                action: function() {
                    table.rows().deselect();
                    dataarr = [];
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }, {
                text: 'Non-Print Label',
                action: function(e, dt, button, config) {
                    $state.go("app.report.form_printlabel")
                },
                className: 'btn btn-wide-40 btn-transparent',
                enabled: true
            }]