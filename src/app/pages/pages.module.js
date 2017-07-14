/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',
    'BlurAdmin.pages.changePassword',
    'BlurAdmin.pages.twoFactorAuth',
    'BlurAdmin.pages.settings',
    'BlurAdmin.pages.addCurrency',
    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.transactions',
    'BlurAdmin.pages.currency',
    'BlurAdmin.pages.users',
    'BlurAdmin.pages.userDetails',
    'BlurAdmin.pages.services',
    'BlurAdmin.pages.login',
    'BlurAdmin.pages.register',
    'BlurAdmin.pages.resetPassword',
    'BlurAdmin.pages.resetPasswordConfirmation',
    'BlurAdmin.pages.verifyAdminEmail',
    'BlurAdmin.pages.accountSettings',
    'BlurAdmin.pages.verification',
    'BlurAdmin.pages.companyNameRequest'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');
  }

})();
