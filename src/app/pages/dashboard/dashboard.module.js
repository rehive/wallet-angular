(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          controller: 'DashboardCtrl',
          title: 'Dashboard',
          sidebarMeta: {
            order: 0
          }
        });
  }

})();
