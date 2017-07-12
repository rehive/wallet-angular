(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tiers')
        .controller('TiersCtrl', TiersCtrl);

    function TiersCtrl($rootScope,$scope,$uibModal,$http,cookieManagement,API,toastr,errorToasts,$window) {

      var vm = this;
      vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingTiers = true;
        $scope.newTier = {level: 1};
        $scope.tierLevels = [1,2,3,4,5,6,7];
        vm.updatedTier = {};

      $rootScope.$watch('selectedCurrency',function(){
          if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
            $scope.newTier.currency = $rootScope.selectedCurrency.code;
              vm.getTiers();
          }
      });

      $scope.toggleTierEditView = function(tier){
          if(tier){
              $scope.editTier = tier
          } else {
              $scope.editTier = {};
              vm.getTiers();
          }
          $scope.editingTiers = !$scope.editingTiers;
      };

      vm.getTiers = function(){
          if(vm.token) {
              $scope.loadingTiers = true;
              $http.get(API + '/admin/tiers/?currency=' + $rootScope.selectedCurrency.code, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': vm.token
                  }
              }).then(function (res) {
                $scope.loadingTiers = false;
                  if (res.status === 200) {
                    $scope.tiersList = res.data.data;
                  }
              }).catch(function (error) {
                  $scope.loadingTiers = false;
                  errorToasts.evaluateErrors(error.data);
              });
          }
      };

      $scope.addTier = function(){
          if(vm.token) {
              $scope.loadingTiers = true;
              $http.post(API + '/admin/tiers/', $scope.newTier ,{
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': vm.token
                  }
              }).then(function (res) {
                $scope.loadingTiers = false;
                  if (res.status === 201) {
                    $scope.newTier = {currency: $rootScope.selectedCurrency.code,level: 1};
                    toastr.success('You have successfully added a tier!');
                      vm.getTiers();
                  }
              }).catch(function (error) {
                console.log(error);
                  $scope.loadingTiers = false;
                  errorToasts.evaluateErrors(error.data);
              });
          }
      };

      $scope.tierChanged = function(field){
          vm.updatedTier[field] = $scope.editTier[field];
      };

      $scope.updateTier = function(){
          if(vm.token) {
            $window.scrollTo(0, 0);
            $scope.editingTiers = !$scope.editingTiers;
            $scope.loadingTiers = true;
              $http.patch(API + '/admin/tiers/' + $scope.editTier.id + '/', vm.updatedTier, {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': vm.token
                  }
              }).then(function (res) {
                $scope.loadingTiers = false;
                  if (res.status === 200) {
                      vm.updatedTier = {};
                      $scope.newTier = {currency: $rootScope.selectedCurrency.code};
                      toastr.success('You have successfully updated a tier!');
                      vm.getTiers();
                  }
              }).catch(function (error) {
                  vm.updatedTier = {};
                  vm.getTiers();
                  errorToasts.evaluateErrors(error.data);
              });
          }
      };

      vm.findIndexOfTier = function(element){
          return this.id == element.id;
      };

      $scope.openTierModal = function (page, size,tier) {
          vm.theModal = $uibModal.open({
              animation: true,
              templateUrl: page,
              size: size,
              controller: 'TierModalCtrl',
              scope: $scope,
              resolve: {
                  tier: function () {
                      return tier;
                  }
              }
          });

          vm.theModal.result.then(function(tier){
              var index = $scope.tiersList.findIndex(vm.findIndexOfTier,tier);
              $scope.tiersList.splice(index, 1);
          }, function(){
          });
      };
    }
})();
