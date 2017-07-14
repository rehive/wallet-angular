(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountSettingsCtrl', AccountSettingsCtrl);

    /** @ngInject */
    function AccountSettingsCtrl($scope,cookieManagement,$stateParams,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.reference = $stateParams.reference;
        $scope.currencyCode = $stateParams.currencyCode;
        $scope.settingView = 'controls';

        $scope.goToSetting = function(path){
            $location.path('/account/'+ $scope.reference +'/settings/' + $scope.currencyCode + '/' + path);
        };

    }
})();
