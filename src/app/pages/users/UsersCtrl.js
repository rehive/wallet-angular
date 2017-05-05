(function () {
    'use strict';

    angular.module('BlurAdmin.pages.users')
        .controller('UsersCtrl', UsersCtrl);

    /** @ngInject */
    function UsersCtrl($scope,API,$http,cookieManagement,errorToasts,$window) {

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

        vm.getCompanyCurrencies = function(){
            //adding currency as default value in both results array and ng-model of currency
            vm.currenciesList.splice(0,0,{code: 'Currency'});
            $scope.usersSearchParams.searchCurrency.code = 'Currency';
            $scope.currencyOptions = vm.currenciesList;
        };
        vm.getCompanyCurrencies();

        vm.getUsersUrl = function(){
            vm.filterParams = '?page=' + $scope.usersPagination.pageNo + '&page_size=' + $scope.usersPagination.itemsPerPage;
                //+ '&created__gt=' + ($scope.searchParams.searchDateFrom? Date.parse($scope.searchParams.searchDateFrom) : '')
                //+ '&created__lt=' + ($scope.searchParams.searchDateTo? Date.parse($scope.searchParams.searchDateTo) : '')
                //+ '&currency=' + ($scope.searchParams.searchCurrency.code ? ($scope.searchParams.searchCurrency.code == 'Currency' ? '' : $scope.searchParams.searchCurrency.code) : '')
                //+ '&from_reference=' + $scope.searchParams.searchUserFrom
                //+ '&to_reference=' + $scope.searchParams.searchUserTo
                //+ '&orderby=' + ($scope.searchParams.searchOrderBy == 'Latest' ? '-created' : $scope.searchParams.searchOrderBy == 'Largest' ? '-amount' : $scope.searchParams.searchOrderBy == 'Smallest' ? 'amount' : '')
                //+ '&tx_code=' + $scope.searchParams.searchTxCode
                //+ '&tx_type=' + ($scope.searchParams.searchType == 'Type' ? '' : $scope.searchParams.searchType.toLowerCase())
                //+ '&status=' + ($scope.searchParams.searchStatus == 'Status' ? '' : $scope.searchParams.searchStatus)
                //+ '&subtype=' + $scope.searchParams.searchSubType; // all the params of the filtering

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
                    console.log(res);
                    $scope.usersData = res.data.data;
                    $scope.users = res.data.data.results;
                    if($scope.users.length == 0){
                        $scope.usersStateMessage = 'No Users Have Been Found';
                        return;
                    }
                    $scope.usersStateMessage = '';
                }
            }).catch(function (error) {
                console.log(error);
                $scope.loadingUsers = false;
                $scope.usersStateMessage = 'Failed To Load Data';
                errorToasts.evaluateErrors(error.data);
            });
        };
        $scope.getAllUsers();

    }
})();