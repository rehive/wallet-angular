/**
 * @author a.demeshko
 * created on 23.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('userWebhookEventParse', userWebhookEventParse);

    /** @ngInject */
    function userWebhookEventParse() {
        return function(text) {
            var textArray = text.split('.');
            if(textArray.length == 2){
                return textArray[0].charAt(0).toUpperCase() + textArray[0].slice(1) + ' ' + textArray[1].charAt(0).toUpperCase() + textArray[1].slice(1);
            } else {
                return text;
            }
        };
    }

})();
