(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocument', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verifyDocument', {
                url: '/document/verify',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/verifyDocument/verifyDocument.html',
                        controller: 'VerifyDocumentCtrl'
                    }
                }
            });
    }

})();
