(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .controller('UsersCtrl', UsersCtrl);

    /** @ngInject */
    function UsersCtrl($rootScope,$scope,API,$http,cookieManagement,errorToasts,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList || '[]');
        $scope.usersStateMessage = '';
        $scope.users = [];

        $scope.usersPagination = {
            itemsPerPage: 25,
            pageNo: 1,
            maxSize: 5
        };

        $scope.usersSearchParams = {
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

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.getCompanyCurrencies();
                $scope.getAllUsers();
            }
        });

        vm.getCompanyCurrencies = function(){
            //adding currency as default value in both results array and ng-model of currency
            $scope.usersSearchParams.searchCurrency.code = $rootScope.selectedCurrency.code;
            $scope.currencyOptions = vm.currenciesList;
        };

        vm.getUsersUrl = function(){
            vm.filterParams = '?page=' + $scope.usersPagination.pageNo + '&page_size=' + $scope.usersPagination.itemsPerPage
            + '&currency=' + ($scope.usersSearchParams.searchCurrency.code ?  $scope.usersSearchParams.searchCurrency.code : '');
                //+ '&created__gt=' + ($scope.usersSearchParams.searchDateFrom? Date.parse($scope.usersSearchParams.searchDateFrom) : '')
                //+ '&created__lt=' + ($scope.usersSearchParams.searchDateTo? Date.parse($scope.usersSearchParams.searchDateTo) : '')
                //+ '&user=' + ($scope.usersSearchParams.searchUser? $scope.usersSearchParams.searchUser : '')
                //+ '&orderby=' + ($scope.usersSearchParams.searchOrderBy == 'Latest' ? '-created' : $scope.usersSearchParams.searchOrderBy == 'Largest' ? '-amount' : $scope.usersSearchParams.searchOrderBy == 'Smallest' ? 'amount' : '')
                //+ '&status=' + ($scope.usersSearchParams.searchStatus == 'Status' ? '' : $scope.usersSearchParams.searchStatus)

            return API + '/admin/users/' + vm.filterParams;
        };

        $scope.getAllUsers = function(applyFilter){
            $scope.usersStateMessage = '';
            $scope.loadingUsers = false;

            if(applyFilter){
                $scope.usersPagination.pageNo = 1;
            }

            if($scope.users.length > 0 ){
                $scope.users.length = 0;
            }

            var usersUrl = vm.getUsersUrl();

            $http.get(usersUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingUsers = false;
                if (res.status === 200) {
                    $scope.usersData = res.data.data;
                    $scope.users = res.data.data.results;
                    if($scope.users.length == 0){
                        $scope.usersStateMessage = 'No Users Have Been Found';
                        return;
                    }
                    $scope.usersStateMessage = '';
                }
            }).catch(function (error) {
                $scope.loadingUsers = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                $scope.usersStateMessage = 'Failed To Load Data';
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
