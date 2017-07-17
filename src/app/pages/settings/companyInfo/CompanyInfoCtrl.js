(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.companyInfo')
        .controller('CompanyInfoCtrl', CompanyInfoCtrl);

    /** @ngInject */
    function CompanyInfoCtrl($scope,API,$rootScope,toastr,$http,cookieManagement,errorToasts,_,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingCompanyInfo = true;
        $scope.company = {};
        vm.updatedCompanyInfo = {};

        $scope.companyInfoChanged = function(field){
            vm.updatedCompanyInfo[field] = $scope.company[field];
        };

        vm.getCompanyInfo = function () {
            if(vm.token) {
                $scope.loadingCompanyInfo = true;
                $http.get(API + '/admin/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyInfo = false;
                    if (res.status === 200) {
                        $scope.company = res.data.data;
                        vm.getCurrencies();
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCompanyInfo();

        vm.getCurrencies = function(){
            $http.get(API + '/admin/currencies/?page_size=250', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if($scope.company.default_currency == null){
                        $scope.company.default_currency = res.data.data.results[0].code;
                    }
                    $scope.currencies = _.pluck(res.data.data.results,'code');
                }
            }).catch(function (error) {
                $scope.loadingCompanyInfo = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.updateCompanyInfo = function () {
            $scope.loadingCompanyInfo = true;
            $http.patch(API + '/admin/company/',vm.updatedCompanyInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCompanyInfo = false;
                if (res.status === 200) {
                    vm.updatedCompanyInfo = {};
                    $scope.company = res.data.data;
                    $rootScope.companyName = res.data.data.name;
                    toastr.success('You have successfully updated the company info!');
                }
            }).catch(function (error) {
                $scope.loadingCompanyInfo = false;
                vm.updatedCompanyInfo = {};
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
