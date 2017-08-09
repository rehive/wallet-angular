(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl);

    /** @ngInject */
    function PageTopCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,$window,errorHandler,_) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

    }

})();
