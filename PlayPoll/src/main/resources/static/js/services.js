'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var pollService = angular.module('pollServices', ['ngResource']);

pollService.value('version', '0.1');

pollService.factory('Survey', [ '$resource', function($resource) {
  return $resource('rest/survey/:surveyId');
}]);

pollService.factory('Question', [ '$resource', function($resource) {
  return $resource('rest/survey/:surveyId/question/:questionId', {
    surveyId : '@surveyId'
  });
}]);

pollService.factory('Answer', [ '$resource', function($resource) {
  return $resource('rest/answer/:surveyId', {
    surveyId : '@surveyId'
  });
}]);
