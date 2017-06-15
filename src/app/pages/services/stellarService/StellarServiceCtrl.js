(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService')
        .controller('StellarServiceCtrl', StellarServiceCtrl);

    /** @ngInject */
    function StellarServiceCtrl($scope) {

        $scope.defaultImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

    }

})();
