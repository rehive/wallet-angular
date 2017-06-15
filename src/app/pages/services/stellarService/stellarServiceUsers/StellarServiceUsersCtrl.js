(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceUsers')
        .controller('BitcoinServiceUsersCtrl', BitcoinServiceUsersCtrl);

    /** @ngInject */
    function BitcoinServiceUsersCtrl($scope,$http,cookieManagement,$uibModal,errorToasts,$location) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.usersPagination = {
            itemsPerPage: 25,
            pageNo: 1,
            maxSize: 5
        };

        $scope.usersSearchParams = {
            searchEmail:'',
            searchIdentifier: '',
            searchAddress: ''
        };

        $scope.users = [];
        $scope.loadingUsers = true;

        vm.getUsersUrl = function(){
            vm.filterParams = '?page=' + $scope.usersPagination.pageNo + '&page_size=' + $scope.usersPagination.itemsPerPage
            + '&email=' + $scope.usersSearchParams.searchEmail
            + '&identifier=' + $scope.usersSearchParams.searchIdentifier
            + '&address=' + $scope.usersSearchParams.searchAddress;

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
                    $location.path('/services');
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
