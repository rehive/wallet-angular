(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentIDSelfie', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verifyDocumentIDSelfie', {
                url: '/document/verify/IDSelfie',
                // views:{
                //     'admin':{
                        templateUrl: 'app/pages/register/verifyDocumentIDSelfie/verifyDocumentIDSelfie.html',
                        controller: 'VerifyDocumentIDSelfieCtrl'
                //     }
                // }
            });
    }

})();
