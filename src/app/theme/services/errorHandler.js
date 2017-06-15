(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('errorHandler', errorHandler);

    /** @ngInject */
    function errorHandler(cookieManagement,$location) {

        return {
            handle403: function () {
                console.log('deletingcookie from errorhandler');
                cookieManagement.deleteCookie('TOKEN');
                cookieManagement.deleteCookie('COMPANY');
                $location.path('/login');
            }
        }
    }

})();
