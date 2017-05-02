(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserDetailsCtrl', UserDetailsCtrl);

    /** @ngInject */
    function UserDetailsCtrl($scope,API,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList);
        $scope.userImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.user = {email: 'a@b.com',currency:'USD',balance:3200,joined:'soon', lastTransaction:'hello', lastLogin: 'bye'};

        vm.getCompanyDetails = function(){
            $http.get(API + '/admin/company/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.userImageUrl = res.data.data.logo;
                }
            }).catch(function (error) {
                console.log(error);
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getCompanyDetails();

    }
})();