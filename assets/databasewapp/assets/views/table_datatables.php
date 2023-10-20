<!-- start: BREADCRUMB -->
<div class="breadcrumb-wrapper">
    <h4 class="mainTitle no-margin" translate="sidebar.nav.tables.DYNAMIC">DYNAMIC TABLES</h4>
    <div ncy-breadcrumb class="pull-right"></div>
</div> 
<!-- end: BREADCRUMB -->
<!-- start: DYNAMIC TABLE -->
<div class="container-fluid container-fullw">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-white">
                <div class="panel-body">
                    <p>
                        <a ui-sref="app.form.gridform_collection" class="btn btn-primary btn-outline btn-sm btn-dark-purple">ADD</a>
                        <a id="delete" class="btn btn-primary btn-outline btn-sm btn-dark-purple">DELETE</a>
                        <a id="edit" class="btn btn-primary btn-outline btn-sm btn-dark-purple">Edit</a>
                    </p>
                    <div ng-controller="datatablesCtrl">
                        <table id="example01" class="table compact table-striped table-condensed nowrap" cellspacing="0" width="100%" >
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Collection No.</th>
                                    <th>Trap</th>
                                    <th>Amphur</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>specific locality</th>
                                    <th>habittat</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
<!-- end: DYNAMIC TABLE -->