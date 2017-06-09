(function () {
    'use strict';

    angular.module('BlurAdmin.pages.companyNameRequest')
        .controller('CompanyNameRequestCtrl', CompanyNameRequestCtrl);

    /** @ngInject */
    function CompanyNameRequestCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location,errorToasts,stringService) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.company = {
            name: ''
        };

        $scope.updateCompanyInfo = function () {
            $scope.loadingCompanyInfo = true;
            $http.patch(API + '/admin/company/',{name: $scope.company.name}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCompanyInfo = false;
                if (res.status === 200) {
                    cookieManagement.setCookie('COMPANY',res.data.data.name);
                    $location.path('/dashboard');
                    toastr.success('You have successfully updated the company info!');
                }
            }).catch(function (error) {
                $scope.loadingCompanyInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
