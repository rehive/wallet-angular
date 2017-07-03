(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency', [
            'BlurAdmin.pages.currency.overview',
            'BlurAdmin.pages.currency.settings'
        ])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('currency', {
                url: '/currency',
                template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Currency',
                sidebarMeta: {
                    order: 100
                }
            });
    }

})();