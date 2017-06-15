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
            searchIdentifier:'',
            searchEmail:'',
            searchMobileNumber: '',
            searchFirstName:'',
            searchLastName: '',
            searchStatus: 'Status',
            searchCurrency: {},
            searchJoinedDateFrom: '',
            searchJoinedDateTo: '',
            searchLastLoginDateFrom: '',
            searchLastLoginDateTo: ''
        };

        $scope.statusOptions = ['Status','Verified','Pending','Declined','Incomplete'];
        $scope.currencyOptions = [];

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                vm.getCompanyCurrencies();
            }
        });

        vm.getCompanyCurrencies = function(){
            //adding currency as default value in both results array and ng-model of currency
            vm.currenciesList.splice(0,0,{code: 'Currency'});
            $scope.usersSearchParams.searchCurrency.code = 'Currency';
            $scope.currencyOptions = vm.currenciesList;
        };

        vm.getUsersUrl = function(){
            vm.filterParams = '?page=' + $scope.usersPagination.pageNo + '&page_size=' + $scope.usersPagination.itemsPerPage
                + '&identifier__contains=' + ($scope.usersSearchParams.searchIdentifier ?  $scope.usersSearchParams.searchIdentifier : '')
                + '&email__contains=' + ($scope.usersSearchParams.searchEmail ?  encodeURIComponent($scope.usersSearchParams.searchEmail) : '')
                + '&mobile_number__contains=' + ($scope.usersSearchParams.searchMobileNumber ?  encodeURIComponent($scope.usersSearchParams.searchMobileNumber) : '')
                + '&first_name__contains=' + ($scope.usersSearchParams.searchFirstName ?  $scope.usersSearchParams.searchFirstName : '')
                + '&last_name__contains=' + ($scope.usersSearchParams.searchLastName ?  $scope.usersSearchParams.searchLastName : '')
                + '&date_joined__gt=' + ($scope.usersSearchParams.searchJoinedDateFrom? Date.parse($scope.usersSearchParams.searchJoinedDateFrom) : '')
                + '&date_joined__lt=' + ($scope.usersSearchParams.searchJoinedDateTo? Date.parse($scope.usersSearchParams.searchJoinedDateTo) : '')
                + '&last_login__gt=' + ($scope.usersSearchParams.searchLastLoginDateFrom? Date.parse($scope.usersSearchParams.searchLastLoginDateFrom) : '')
                + '&last_login__lt=' + ($scope.usersSearchParams.searchLastLoginDateTo? Date.parse($scope.usersSearchParams.searchLastLoginDateTo) : '')
                + '&verified=' + ($scope.usersSearchParams.searchStatus == 'Status' ? '' : $scope.usersSearchParams.searchStatus);
                //+ '&currency__code=' + ($scope.usersSearchParams.searchCurrency.code ? ($scope.usersSearchParams.searchCurrency.code == 'Currency' ? '' : $scope.usersSearchParams.searchCurrency.code) : '');

            return API + '/admin/users/' + vm.filterParams;
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
                console.log(error);
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
    }
})();
