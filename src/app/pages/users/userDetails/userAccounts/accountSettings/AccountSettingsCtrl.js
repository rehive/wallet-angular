(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountSettingsCtrl', AccountSettingsCtrl);

    /** @ngInject */
    function AccountSettingsCtrl($scope,cookieManagement,$stateParams) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.currencyCode = $stateParams.currencyCode;
        $scope.settingView = 'controls';

        $scope.goToSetting = function(view){
            $scope.settingView = view;
        };

    }
})();
