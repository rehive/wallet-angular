(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security')
        .controller('DeleteTokenModalCtrl', DeleteTokenModalCtrl);

    function DeleteTokenModalCtrl($scope,token,$http,environmentConfig,cookieManagement,errorToasts,toastr) {

        var vm = this;

        $scope.token = token;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingToken = false;

        vm.findIndexOfToken = function(element){
            return $scope.token.token_key == element.token_key;
        };

        $scope.deleteToken = function (tokenKey) {
            if(vm.token) {
                $scope.deletingToken = true;
                $http.delete(environmentConfig.API + '/auth/tokens/' + tokenKey, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.deletingToken = false;
                    if (res.status === 200) {
                        var index = $scope.tokensList.findIndex(vm.findIndexOfToken);
                        $scope.tokensList.splice(index, 1);
                        toastr.success('You have successfully deleted the Token!');
                        $scope.$dismiss();
                    }
                }).catch(function (error) {
                    $scope.deletingToken = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();
