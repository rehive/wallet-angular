(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($scope,cookieManagement,$location) {
        $scope.companyName = cookieManagement.getCookie('COMPANY');
        $scope.currencies = ['$XBR','$ZER','$EUR'];

        $scope.logout = function(){
            cookieManagement.deleteCookie('TOKEN');
            cookieManagement.deleteCookie('COMPANY');
            $location.path('/login');
        };
    }

})();