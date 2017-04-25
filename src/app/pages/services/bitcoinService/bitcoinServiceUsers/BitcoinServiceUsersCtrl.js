(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceUsers')
        .controller('BitcoinServiceUsersCtrl', BitcoinServiceUsersCtrl);

    /** @ngInject */
    function BitcoinServiceUsersCtrl($scope,API,$http,cookieManagement,$uibModal,errorToasts,$window,stringService) {
              var vm = this;
              vm.token = cookieManagement.getCookie('TOKEN');
              vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList);

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

              $scope.pick = function(){
                  console.log($scope.usersSearchParams.searchCountry);
              }
    }
})();
