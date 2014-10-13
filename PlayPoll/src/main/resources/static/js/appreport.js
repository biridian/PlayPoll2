'use strict';
console.log("here2");

// Declare app level module which depends on filters, and services
angular.module('pollApp', [
  'ngRoute',
  'ngTouch',
  'ngGrid',
  'myApp.filters',
  'pollServices',
  'myApp.directives',
  'surveyControllers',
  'ui.bootstrap',
  'googlechart'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/sharedreport/#/sharedreport/:surveyId' ,
			          {templateUrl: '../partials/sharedreport.html', 
		              controller: 'SharedReportController', 
		  
		  resolve: {
		     survey: function ($route, Survey) {
		    	  console.log("FOCUS");
		   	  console.log($route.current.params.surveyId);
		   	console.log($route.current);
		       return Survey.get({surveyId: $route.current.params.surveyId}).$promise;
		     },
		     questions: function ($route, Question) {
		      return Question.query({surveyId : $route.current.params.surveyId}).$promise;
		     },
		     answers: function ($route, Answer) {
		      return Answer.query({surveyId: $route.current.params.surveyId}).$promise;
		     }
		    }
		  });

	  $routeProvider.otherwise({redirectTo: '/sharedreport'});

	}])
	.directive('kakaoLink', function() {
	  return {
	    restrict : 'A',
	    scope: {
	      webUrl: '=kakaoLink'
	    },
	    link : function(scope, element, attrs) {
	      
	      console.log(attrs.kakaoLink);
	      
	      Kakao.Link.createTalkLinkButton({
	       container: element[0],
	    	// container: '#kakao-link-btn',
	    	  label: 'PlayPoll에서 설문 요청이 도착했습니다. 답변 부탁드립니다!',
	        image: {
	          src: 'http://dn.api1.kage.kakao.co.kr/14/dn/btqaWmFftyx/tBbQPH764Maw2R6IBhXd6K/o.jpg',
	          width: '100',
	          height: '60'
	        },
	        webButton: {
	          text: '설문 답변하기',
	          url: 'http://54.68.13.217:8080/request/2c9f985c48ddc6260148ddccec910000' 
	          // url: scope.webUrl
	        }
	      });
	      
	      element.on('$destroy', function() {
	        Kakao.Link.cleanup();
	      });
	    }
	  };
	})
	.run(function($rootScope) {
	 Kakao.init('257cefb61c7f912a4e696470b82afccf');  //없애면 안됨
	  
	  $rootScope.questionTypes = [
	    {text:'단답',value:'TEXT'},
	    {text:'서술',value:'PARAGRAPH_TEXT'},
	    {text:'보기선택',value:'MULTIPLE_CHOICE'},
	    {text:'복수선택',value:'CHECKBOXES'},
	    {text:'목록',value:'DROPDOWN'}
	  ];
	});