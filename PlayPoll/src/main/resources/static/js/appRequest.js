'use strict';


// Declare app level module which depends on filters, and services
angular.module('pollApp', [
  'ngRoute',
  'myApp.filters',
  'pollServices',
  'myApp.directives',
  'surveyControllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:surveyId', {templateUrl: 'partials/survey-request.html', controller: 'SurveyRequestController'}); 
  $routeProvider.otherwise({redirectTo: '/:surveyId'});
}]);