(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,$window,errorHandler,_) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.user = {first_name: 'Marcus',last_name: 'Dold'};

        $scope.logout = function(){
            $rootScope.selectedCurrency = null;
            $rootScope.newUser = false;
            $rootScope.gotToken = false;
            $rootScope.securityConfigured = true;
            $rootScope.companyName = null;
            $rootScope.haveCompanyName = false;
            cookieManagement.deleteCookie('TOKEN');
            $location.path('/login');
        };
    }

})();
