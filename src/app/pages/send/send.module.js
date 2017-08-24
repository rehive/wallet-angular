(function () {
  'use strict';

  angular.module('BlurAdmin.pages.send', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('send', {
          url: '/send',
          templateUrl: 'app/pages/send/send.html',
          controller: 'SendCtrl',
          title: 'Send',
          sidebarMeta: {
            order: 0
          }
        });
  }

})();
