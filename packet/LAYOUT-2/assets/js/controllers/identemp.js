$('#SpecimensIdList tbody').on('click', '.single-print', function() {
            var tableRow = $(this).closest('tr');
            var dataspecimens = tableSpecIdList.row($(this).parents('tr')).data();
            var rowid = dataspecimens.DT_RowId;
            console.log(dataspecimens)
            var oldorderid = dataspecimens[10];
            var oldfamilyid = dataspecimens[11];
            var oldgenusid = dataspecimens[12];
            var oldspeciesid = dataspecimens[5];
            var specimensid = rowid.substring(4);
            var absolutespecid = getIfNotSet(specimensid, '0', true);
            var container_id = getIfNotSet($scope.BoxShowDetailsBoxid, '0', true);
            var container_type = 1;
            var report_month = getIfNotSet($stateParams.monthid, '0', true);
            var report_year = getIfNotSet($stateParams.yearid, '0', true);
            var userid = getIfNotSet($scope.uid, '0', true);
            var action = 'MOVETOBOX';
            var speciesid = getIfNotSet($scope.specModelSpecies.species_id, 0, true);
            /** New Taxa Series **/
            var tspecies_name = getIfNotSet($scope.specModelSpecies.species_name, 'Unknown', true);
            var tgeuns_name = getIfNotSet($scope.specModelGenus.genus_name, 'Unknown', true);
            var tfamily_name = getIfNotSet($scope.specModelFamily.family_name, 'Unknown', true);
            var torder_name = getIfNotSet($scope.specModelOrder.torder_name, 'Unknown', true);
            var torder_id = getIfNotSet($scope.specModelOrder.torder_id, 0, true);
            var tfamily_id = getIfNotSet($scope.specModelFamily.family_id, 0, true);
            var tgenus_id = getIfNotSet($scope.specModelGenus.genus_id, 0, true);
            data = $.param({
                taction: action,
                tspecimensid: absolutespecid,
                tcontainer_id: container_id,
                tcontainer_type: container_type,
                treport_month: report_month,
                treport_year: report_year,
                tspeciesid: speciesid,
                torderid: torder_id,
                tfamilyid: tfamily_id,
                tgenusid: tgenus_id
            });
            $scope.open = function(size) {
                var modalInstance = $uibModal.open({
                    templateUrl: "assets/views/ModalSelectSpecies.html",
                    controller: function($scope, $uibModalInstance) {

                        $scope.modalTitle = "SELECT DATA";
                        $scope.modalContent = b;
                        /** Old Taxa Series **/
                        $scope.oldspecies = oldspeciesid;
                        $scope.oldspeciesname = tableSpecies;
                        $scope.oldgenusname = tableGenus;
                        $scope.oldfamilyname = tableFamily;
                        $scope.oldordername = tableOrder;
                        /** New Taxa Series **/
                        $scope.newspecies = speciesid;
                        $scope.newspeciesname = tspecies_name;
                        $scope.newgenusname = tgeuns_name;
                        $scope.newfamilyname = tfamily_name;
                        $scope.newordername = torder_name;
                        $scope.SelectData = function(a) {
                            if (a === 'oldspec') {
                                var oldspecdata = $.param({
                                    taction: action,
                                    tspecimensid: absolutespecid,
                                    tcontainer_id: container_id,
                                    tcontainer_type: container_type,
                                    treport_month: report_month,
                                    treport_year: report_year,
                                    tspeciesid: $scope.oldspecies,
                                    torderid: oldorderid,
                                    tfamilyid: oldfamilyid,
                                    tgenusid: oldgenusid
                                });
                                $http({
                                    method: 'POST',
                                    url: "assets/views/action/dbmovespectobox.php",
                                    data: oldspecdata,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                }).success(function(response) {
                                    if (response[0].success == 0) {} else {
                                        $scope.specfullid = response[0].specimens_full_number
                                        dataarr = [];
                                        /* tableSpecReportList.draw();*/
                                        if (response[0].species_id == 0) {
                                            toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                        } else {
                                            toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                        }
                                        tableSpecimensBox.draw();
                                        /*    $scope.GetUserCurrentBox();*/
                                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                        tableSpecIdList.draw()
                                        tableRow.fadeOut(400, "swing", function() {
                                            tableSpecIdList.row(rowid).remove().draw()
                                        });
                                    }
                                })
                            }
                            if (a === 'newspec') {
                                console.log($scope.newspeciesname)
                                console.log($scope.newgenusname)
                                console.log($scope.newfamilyname)
                                console.log($scope.newordername)
                                /*  */
                                console.log(torder_id)
                                console.log(tfamily_id)
                                console.log(tgenus_id)
                                console.log($scope.newspecies)
                                var newspecdata = $.param({
                                    taction: action,
                                    tspecimensid: absolutespecid,
                                    tcontainer_id: container_id,
                                    tcontainer_type: container_type,
                                    treport_month: report_month,
                                    treport_year: report_year,
                                    tspeciesid: $scope.newspecies,
                                    torderid: torder_id,
                                    tfamilyid: tfamily_id,
                                    tgenusid: tgenus_id
                                });
                                $http({
                                    method: 'POST',
                                    url: "assets/views/action/dbmovespectobox.php",
                                    data: newspecdata,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    },
                                }).success(function(response) {
                                    if (response[0].success == 0) {} else {
                                        $scope.specfullid = response[0].specimens_full_number
                                        if (response[0].species_id == 0) {
                                            toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                        } else {
                                            toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                        }
                                        dataarr = [];
                                        /* tableSpecReportList.draw();*/
                                        tableSpecimensBox.draw();
                                        /* $scope.GetUserCurrentBox();
                                         */
                                         $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                        tableSpecIdList.draw(false)
                                        /*tableRow.fadeOut(400, "swing", function() {
                                            tableSpecIdList.row(tableRow).remove().draw()
                                        });*/
                                    }
                                })
                            }
                            $uibModalInstance.close();
                        }
                        $scope.cancel = function() {
                            $uibModalInstance.dismiss("cancel")
                        }
                    },
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.numberofitem;
                        }
                    }
                });
                modalInstance.result.then(function(selectedItem) {
                    $scope.selected = selectedItem
                }, function() {})
            }
            if (typeof absolutespecid !== '0' && container_id !== '0' && userid !== '0') {
                if (speciesid != oldspeciesid) {
                    if (oldspeciesid == 0) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                dataarr = [];
                                /* tableSpecReportList.draw();
                                 tableSpecimensBox.draw();*/
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    } else {
                        $scope.open('md');
                        var data = tableSpecIdList.row($(this).parents('tr')).data();
                        var tableOrder = data[6];
                        var tableFamily = data[7];
                        var tableGenus = data[8];
                        var tableSpecies = data[9];
                        var b = format(data);
                        var forpreinsqty = data[1];
                        var forpreinsid = data.DT_RowId;
                    }
                } else {
                    if (speciesid === 0 && oldspeciesid === 0) {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                if (response[0].species_id == 0) {
                                    toaster.pop('warning', 'SUCCESS', $scope.specfullid);
                                } else {
                                    toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                }
                                dataarr = [];
                                /*       tableSpecReportList.draw();
                                       tableSpecimensBox.draw();*/
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    } else {
                        $http({
                            method: 'POST',
                            url: "assets/views/action/dbmovespectobox.php",
                            data: data,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        }).success(function(response) {
                            if (response[0].success == 0) {} else {
                                $scope.specfullid = response[0].specimens_full_number
                                toaster.pop('success', 'SUCCESS', $scope.specfullid);
                                dataarr = [];
                                /* tableSpecReportList.draw();
                                 tableSpecimensBox.draw();*/
                                $scope.GetUserCurrentBox();
                                $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                                tableRow.fadeOut(400, "swing", function() {
                                    tableSpecIdList.row(tableRow).remove().draw()
                                });
                            }
                        })
                    }
                }
                /*
                var speicmensidsfromall = dataarr;
                var cbox = JSON.stringify(speicmensidsfromall);
                $http({
                    method: 'POST',
                    url: "assets/views/action/dbmovespectobox.php",
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).success(function(response) {
                    if (response[0].success == 0) {} else {
                        $scope.specfullid = response[0].specimens_full_number
                        toaster.pop('success', 'SUCCESS', $scope.specfullid);
                        dataarr = [];
                        tableSpecReportList.draw();
                        tableSpecimensBox.draw();
                        $scope.GetUserCurrentBox();
                        $scope.countSpecimens(monthshow, yearshow, container_type, container_id);
                    }
                })*/
            } else {
                errorMessageNoSelectBox();
            }
        });