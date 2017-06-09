(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('DeleteTokenModalCtrl', DeleteTokenModalCtrl);

    function DeleteTokenModalCtrl($scope,token,$http,API,cookieManagement,errorToasts,toastr) {

        var vm = this;

        $scope.token = token;
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.findIndexOfToken = function(element){
            return $scope.token.token_key == element.token_key;
        };

        $scope.deleteToken = function (tokenKey) {
            if(vm.token) {
                $scope.loadingAPITokens = true;
                $http.delete(API + '/auth/tokens/' + tokenKey, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAPITokens = false;
                    if (res.status === 200) {
                        var index = $scope.tokensList.findIndex(vm.findIndexOfToken);
                        $scope.tokensList.splice(index, 1);
                        toastr.success('You have successfully deleted the Token!');
                        $scope.$dismiss();
                    }
                }).catch(function (error) {
                    $scope.loadingAPITokens = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();
