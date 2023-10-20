//new style
app.controller('loginController', function ($scope, $rootScope,  $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
});




//Old style
/*
angular.module('loginModules', []).controller('loginController', function($scope, $http, $state) {
    $scope.login = function() {
        $scope.message = "";
        var request = $http({
            method: "post",
            url: "assets/views/action/login_action.php",
            data: {
                username: $scope.username,
                last_name: $scope.last_name,
                password: $scope.password
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        request.success(function(data) {
            $scope.message = "Console : " + data;
            if (data == "false") {
                alert("no");
            } else {
                $state.go('app.dashboard')
            }
        });
    }
});
*/