/**
 * @author a.demeshko
 * created on 23.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('capitalizeWord', capitalizeWord);

    /** @ngInject */
    function capitalizeWord() {
        return function(text) {
            text = text.toString();
            return  text ? text.charAt(0).toUpperCase() + text.slice(1): text;
        };
    }

})();
