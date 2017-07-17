(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.subtypes')
        .controller('SubtypeModalCtrl', SubtypeModalCtrl);

    function SubtypeModalCtrl($scope,$uibModalInstance,subtype,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.subtype = subtype;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingSubtype = false;

        $scope.deleteSubtype = function () {
            $scope.deletingSubtype = true;
            $http.delete(API + '/admin/subtypes/' + $scope.subtype.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingSubtype = false;
                if (res.status === 200) {
                  toastr.success('You have successfully deleted the subtype!');
                  $uibModalInstance.close($scope.subtype);
                }
            }).catch(function (error) {
                $scope.deletingSubtype = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
