(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentID', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('verifyDocumentID', {
                url: '/document/verify/ID',
                views:{
                    'admin':{
                        templateUrl: 'app/pages/register/verifyDocumentID/verifyDocumentID.html',
                        controller: 'VerifyDocumentIDCtrl'
                    }
                }
            });
    }

})();
