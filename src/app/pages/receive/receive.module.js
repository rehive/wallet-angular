(function () {
  'use strict';

  angular.module('BlurAdmin.pages.receive', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('receive', {
          url: '/receive',
          templateUrl: 'app/pages/receive/receive.html',
          controller: 'ReceiveCtrl',
          title: 'Receive',
          sidebarMeta: {
            order: 0
          }
        });
  }

})();
