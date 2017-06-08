(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceUsers')
        .controller('BitcoinServiceUsersCtrl', BitcoinServiceUsersCtrl);

    /** @ngInject */
    function BitcoinServiceUsersCtrl($scope,$http,cookieManagement,$uibModal,errorToasts,$window,stringService) {
              var vm = this;
              vm.token = cookieManagement.getCookie('TOKEN');
              vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList);

        ////dummy data
        //
        //$scope.usersData ={
        //    'data':{
        //        'count':2,
        //        'next':null,
        //        'previous':null,
        //        'results':[
        //            {
        //                'crypto':{
        //                    'address':'12313123',
        //                    'payment_uri':'bitcoin:12313123',
        //                    'qr_code':'https://chart.googleapis.com/chart?chs=300&cht=qr&chl=bitcoin%3A12313123&choe=UTF-8'
        //                },
        //                'email':'connor@rehive.com',
        //                'identifier':'1231312'
        //            },
        //            {
        //                'crypto':{
        //                    'address':'123131312',
        //                    'payment_uri':'bitcoin:123131312',
        //                    'qr_code':'https://chart.googleapis.com/chart?chs=300&cht=qr&chl=bitcoin%3A123131312&choe=UTF-8'
        //                },
        //                'email':'connor+2@rehive.com',
        //                'identifier':'123131231'
        //            }
        //        ]
        //    },
        //    'status':'success'
        //};
        //
        //$scope.users = $scope.usersData.data.results;
        //
        //console.log($scope.users);
        //
        //// dummy data

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

        $scope.users = [];
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
            //+ '&currency=' + ($scope.usersSearchParams.searchCurrency.code ?  $scope.usersSearchParams.searchCurrency.code : '');
            //+ '&created__gt=' + ($scope.usersSearchParams.searchDateFrom? Date.parse($scope.usersSearchParams.searchDateFrom) : '')
            //+ '&created__lt=' + ($scope.usersSearchParams.searchDateTo? Date.parse($scope.usersSearchParams.searchDateTo) : '')
            //+ '&user=' + ($scope.usersSearchParams.searchUser? $scope.usersSearchParams.searchUser : '')
            //+ '&orderby=' + ($scope.usersSearchParams.searchOrderBy == 'Latest' ? '-created' : $scope.usersSearchParams.searchOrderBy == 'Largest' ? '-amount' : $scope.usersSearchParams.searchOrderBy == 'Smallest' ? 'amount' : '')
            //+ '&status=' + ($scope.usersSearchParams.searchStatus == 'Status' ? '' : $scope.usersSearchParams.searchStatus)

            return 'https://rehive.com/services/bitcoin/users/' + vm.filterParams;
        };

        $scope.getAllUsers = function(applyFilter){
            $scope.usersStateMessage = '';
            $scope.loadingUsers = true;

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
        $scope.getAllUsers();

         $scope.pick = function(){
                  console.log($scope.usersSearchParams.searchCountry);
              }
    }
})();
