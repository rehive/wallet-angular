(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ethereumAddress', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('ethereumAddress', {
                url: '/ethereum/address',
                // views:{
                // 'admin':{
                templateUrl: 'app/pages/register/ethereumAddress/ethereumAddress.html',
                controller: 'EthereumAddressCtrl'
                    //     }
                    // }
                });
            }

})();
