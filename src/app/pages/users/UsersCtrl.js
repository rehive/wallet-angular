(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .controller('UsersCtrl', UsersCtrl);

    /** @ngInject */
    function UsersCtrl($rootScope,$scope,API,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $rootScope.usersPagination = {
            itemsPerPage: 25,
            pageNo: 1,
            maxSize: 5
        };

        $rootScope.usersSearchParams = {
            searchUser:'',
            searchDateFrom: '',
            searchDateTo: '',
            searchStatus: 'KYC',
            searchCurrency: {},
            searchCountry: '',
            searchOrderBy: 'Order By'
        };

        $scope.statusOptions = ['KYC','Declined','Pending','Verified'];
        $scope.currencyOptions = [];
        $scope.orderByOptions = ['Order By','Join Date','Balance','User'];

        $scope.$on("$destroy", function( event ) {
            delete $rootScope.usersPagination;
            delete $rootScope.usersSearchParams;
        });

        vm.getCompanyCurrencies = function(){
            $http.get(API + '/company/currencies/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    //adding currency as default value in both results array and ng-model of currency
                    res.data.data.results.splice(0,0,{code: 'Currency'});
                    $rootScope.usersSearchParams.searchCurrency.code = 'Currency';
                    $scope.currencyOptions = res.data.data.results;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data.data);
            });
        };
        vm.getCompanyCurrencies();

        $scope.pick = function(){
            console.log($scope.usersSearchParams.searchCountry);
        }

    }
})();