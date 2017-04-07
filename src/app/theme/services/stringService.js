(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('stringService', stringService);

    /** @ngInject */
    function stringService() {

        return {
            capitalizeWord: function (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        }
    }

})();