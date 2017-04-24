(function () {
    'use strict';

    angular.module('BlurAdmin.bitcoinService')
        .controller('BitcoinServiceCtrl', BitcoinServiceCtrl);

    /** @ngInject */
    function BitcoinServiceCtrl($scope) {

        $scope.defaultImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

    }

})();