(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentResidence', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verifyDocumentResidence', {
                url: '/document/verify/residence',
                // views:{
                //     'admin':{
                        templateUrl: 'app/pages/register/verifyDocumentResidence/verifyDocumentResidence.html',
                        controller: 'VerifyDocumentResidenceCtrl'
                //     }
                // }
            });
    }

})();
