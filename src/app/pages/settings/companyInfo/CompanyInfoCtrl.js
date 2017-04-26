(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('CompanyInfoCtrl', CompanyInfoCtrl);

    /** @ngInject */
    function CompanyInfoCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingCompanyInfo = true;


        vm.getCompanyInfo = function () {
            $http.get(API + '/admin/company/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCompanyInfo = false;
                if (res.status === 200) {
                    $scope.company = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingCompanyInfo = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getCompanyInfo();

    }
})();
