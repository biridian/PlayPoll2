'use strict';

/* Controllers */
var surveyControllers = angular.module('surveyControllers', []);


surveyControllers.controller('SurveyController', ['$scope', '$rootScope', '$location', '$modal', 'Survey',
  function($scope, $rootScope, $location, $modal, Survey) {
    $scope.spinner = new Spinner({}).spin(angular.element('#spinner')[0]);
    
    $scope.createSurveyModal = angular.element('#create-poll-modal');
    $scope.createSurveyModal.on('hidden.bs.modal', function(e) {
      if ($scope.loading) {
        $rootScope.$apply(function() {
          console.log('redirect to /survey/' + $scope.survey.surveyId);
          $location.path('/survey/' + $scope.survey.surveyId);
        });
      }
    });

    $scope.openCreateSurveyModal = function() {
      $scope.loading = false;
      $scope.surveyTitle = null;
      $scope.createSurveyModal.modal('show');
    }

    $scope.createSurvey = function() {
      $scope.loading = true;
      Survey.save({
        title : $scope.surveyTitle,
        result :  $scope.surveyresult,
        subject : $scope.surveysubject,
        status : '01'
      }, function(data) {
        console.log('saved survey');
        console.log(data);
        $scope.survey = data;
        $scope.createSurveyModal.modal('hide');
      });
      $scope.surveyTitle = angular.element('#poll-title'); //없어도 문제 없어보임
      $scope.surveysubject = angular.element('#subject'); 
    }

    $scope.openSendSurveyModal = function(surveyId) {
      var modalInstance = $modal.open({
        templateUrl : 'partials/send-survey-dialog.html',
        controller : 'SendSurveyModalController',
        scope : $scope,
        resolve : {
          surveyId : function() {
            return surveyId;
          }
        }
      });
    };

    $scope.changeSurveyStatus = function(survey, status) {
      survey.status = status;

      Survey.save(survey, function(data) {
        console.log(data);
      });
    }

    $scope.surveys = Survey.query();
    
    $scope.deleteSurvey = function(surveyId) {
    	Survey.remove({surveyId: surveyId}, function() {
    		$scope.surveys = Survey.query();
    	});
      }
  }
]);


surveyControllers.controller('SendSurveyModalController', ['$scope', '$routeParams', '$location', '$modalInstance', '$http', 'surveyId',
  function($scope, $routeParams, $location, $modalInstance, $http, surveyId) {

	  $scope.checkMobile = function() {
      var check = false;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
            .test(a)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
                .test(a.substr(0, 4)))
          check = true
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }

    $scope.request = {
      link : $location.protocol() + '://' + $location.host()
          + ($location.port() != 80 ? ':' + $location.port() : '')
          + '/request/' + surveyId,
      email : ''
    };
  
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    }
  
    $scope.sendByEmail = function() {
        $scope.emails = [];
        
        $scope.emailResults = [];
        
    	var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    	    	
    	var emailData = $scope.request.email.split('\n');
    	
    	angular.forEach(emailData, function(value, key){
    		if(value != null && value != ''){
    			if(EMAIL_REGEXP.test(value)){
    				$scope.emails.push({
    					message: value,
    					isNotValid: false,
    				});
    			}
    			else{
    				$scope.emails.push({
    					message: value,
    					isNotValid: true,
    				});
    				$scope.emails.isNotValid = true;
    			}
    		}
    	});
    	
    	if(!$scope.emails.isNotValid && $scope.emails != ''){
    		angular.forEach($scope.emails, function(value, key){
    			$http.post('/rest/survey/' + surveyId + '/send', $.param({email: value.message}), { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).success(function(response){
    				console.log(response);
    			}).error(function(err){
    				console.log(err);
    				$scope.emailResults.push({
    					isError: true,
    					message: value.message
    				})
    				$scope.emailResults.isError = true;
    			});
    		});
    		if($scope.emailResults.isError != true){
    	    	$scope.emailResults.isSuccess = true;
    		}
    		$scope.request.email = '';
    	}
    }
    
    
    $scope.sendBykakao = function() {
    	
    Kakao.Link.createTalkLinkButton({
        container: '#kakao-link-btn',
        label: 'Any play poll! 설문에 참여해주세요',
        image: {
            src: 'http://www.123contactform.com/images3/new/free-online-poll-maker.png',
            width: '300',
            height: '200'
        },
        webButton: {
         text: '설문 참여하기',
          url: $scope.request.link // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
        }
      });
    }
    
	}
]);


surveyControllers.controller('SurveyRequestController', ['$scope', '$routeParams', '$timeout', '$modal', 'Survey', 'Question',
  function($scope, $routeParams, $timeout, $modal, Survey, Question) {
	console.log('SurveyRequestController!');
  
  	$scope.surveyId = $routeParams.surveyId;
  	$scope.survey = Survey.get({
  		surveyId : $scope.surveyId
  	});
  	$scope.questions = Question.query({
  		surveyId : $scope.surveyId
  	}, function(data) {
  		angular.forEach(data, function(value, key) {
  			if (value.options != null) {
  				value.options = JSON.parse(value.options);
  			} else {
  				value.options = [];
  			}
  		});
  	});
	



}
]

);


surveyControllers.controller('SurveyDetailController', ['$scope', '$routeParams', '$timeout', '$modal', 'Survey', 'Question',
  function($scope, $routeParams, $timeout, $modal, Survey, Question) {
	
  	$scope.surveyId = $routeParams.surveyId;
  	$scope.survey = Survey.get({surveyId: $scope.surveyId});
  
  	$scope.questionLabel = {
        "TEXT": '단답',
        "PARAGRAPH_TEXT": '서술',
        "MULTIPLE_CHOICE": '보기선택',
        "CHECKBOXES": '복수선택',
        "DROPDOWN": '목록'
  	};
  	
  	$scope.updatePoll = function() {
  		console.log($scope.pollDetailForm);
  		var pollForm = $scope.pollDetailForm;
  		
  		if (pollForm.$dirty && pollForm.$valid) {
  			$scope.saving = true;
  			Survey.save($scope.survey, function(data) {
  				$scope.saving = false;
  				angular.element('#poll-saved').show();
  				$timeout(function() {
  					angular.element('#poll-saved').fadeOut('slow');
  				}, 1000);
  			});
  			pollForm.$setPristine();
  		}
  	};
	
  	$scope.questions = Question.query({surveyId: $scope.surveyId});
  	
    $scope.deleteQuestion = function(questionId) {
    	Question.remove({surveyId: $scope.surveyId, questionId: questionId}, function() {
    		$scope.questions = Question.query({surveyId: $scope.surveyId});
    	});
      }
  	
  	$scope.openModal = function() {
  	  var modalInstance = $modal.open({
  	    templateUrl: 'partials/create-question-dialog.html',
  	    controller: 'QuestionModalController',
  	    scope: $scope,
  	    resolve: {
  	      surveyId: function() {
  	        return $scope.surveyId;
  	      }
  	    }
  	  });
  	  
  	  modalInstance.result.then(function(data) {
  	    $scope.questions = Question.query({surveyId: $scope.surveyId});
  	  });
  	};
  		
  	$scope.openSendSurveyModal = function() {
  	  var modalInstance = $modal.open({
        templateUrl : 'partials/send-survey-dialog.html',
        controller : 'SendSurveyModalController',
  	    scope: $scope,
  	    resolve: {
  	      surveyId: function() {
  	        return $scope.surveyId;
  	      }
  	    }
  	  });
  	};
  }
]);


surveyControllers.controller('QuestionModalController', ['$scope', '$modalInstance', 'Question', 'surveyId', 
  function($scope, $modalInstance, Question, surveyId) {
      
    $scope.question = {type: 'TEXT'};
    
    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    }
  
    $scope.create = function() {
      Question.save({surveyId: surveyId}, {title: $scope.question.title, type: $scope.question.type}, function(data) {
        $scope.question = data;
        $modalInstance.close(data);
      });
    }
  }
]);


surveyControllers.controller('QuestionController', ['$scope', '$routeParams', '$timeout', 'Survey', 'Question', 
  function($scope, $routeParams, $timeout, Survey, Question) {
  
  $scope.surveyId = $routeParams.surveyId;
  $scope.questionId = $routeParams.questionId;
  $scope.question = {
      options: []
  };
  
  $scope.question = Question.get({surveyId: $scope.surveyId, questionId: $scope.questionId}, function(data) {
    console.log(data);
    if (data.options != null) {
      $scope.question.options = JSON.parse(data.options);  
    } else {
      $scope.question.options =  [];
    }
  });
  
  $scope.addOption = function() {
    console.log('add option!');
    $scope.question.options.push({
        sequence: $scope.question.options.length + 1,
        text: ''
    });
    $scope.save();
    console.log($scope.question.options);
  }
  
  $scope.deleteOption = function(index) {
    $scope.question.options.splice(index, 1);
    $scope.save();
  }
  
  $scope.save = function() {
    console.log($scope.question.options);
    console.log(JSON.stringify($scope.question.options));
    Question.save({
      surveyId : $scope.surveyId
    }, {
      questionId : $scope.questionId,
      title : $scope.question.title,
      description: $scope.question.description,
      type : $scope.question.type,
      options: JSON.stringify($scope.question.options)
    }, function(data) {
      $scope.question = data;
      if (data.options != null) {
        $scope.question.options = JSON.parse(data.options);  
      } else {
        $scope.question.options =  [];
      }
    });
  }
  
}]);


surveyControllers.controller('PreviewController', ['$scope', '$routeParams', '$timeout', 'Survey', 'Question', 
  function($scope, $routeParams, $timeout, Survey, Question) {
    $scope.surveyId = $routeParams.surveyId;
    $scope.survey = Survey.get({surveyId: $scope.surveyId});
    $scope.questions = Question.query({surveyId: $scope.surveyId}, function(data){
  
	  angular.forEach(data, function(value, key){
		  if(value.options != null){
			  value.options = JSON.parse(value.options);
		  }else{
			  value.options = [];
		  }
		  console.log(value);
      });
    });
  
  }
]);


surveyControllers.controller('ReportController', [ '$scope', '$routeParams','$location', '$filter', '$http', 'survey', 'questions', 'answers',
  function($scope, $routeParams, $location, $filter,$http, survey, questions, answers) {
  	 
	console.log("hi controller");
	
	
    $scope.survey = survey;
    $scope.questionColumns = [];
    $scope.answerData = [];
    $scope.resultyn = survey.result;
    var chartQuestions = [];
	var chartAnswers = [];
	var tempArray = [];
	var tempAnswerCount = [];
	var tempAnswers = [];
	var tempSplitData = [];
	var questionTitle;
    
	$scope.selectQuestionOptions = [];
	$scope.selectedQuestion;
	
    var emailist = "";
    
    // 컬럼 정의
    $scope.questionColumns.push({
      field: 'num',
      displayName: '순번',
      width: 45
    });
    
    $scope.questionColumns.push({
      field: 'createdDate',
      displayName: '응답시간',
      width: 160
    });
    
    $scope.graghisrequired = false; //질문 타입에 따라 그래프  출력 여부 결정
	angular.forEach(questions, function(question, key) {
    	
		$scope.questionColumns.push({
			field: "q" + question.questionId,
			displayName: question.title
		});
		questionTitle = question.title;
		if (question.options != null) {
			question.options = JSON.parse(question.options);
			if((question.type == "MULTIPLE_CHOICE") || (question.type == "CHECKBOXES") || (question.type == "DROPDOWN")){
				$scope.graghisrequired = true;
				$scope.selectQuestionOptions.push({name:question.title});
				tempArray = question.options;
			}
		}
	});
    
	for(var i=0;i<tempArray.length;i++){
		tempAnswerCount.push(0);
	}
	
    // 데이터 정의
    angular.forEach(answers, function(answer, key) {
      
      var answerRow = {
          num: key + 1,
          createdDate: $filter('date')(answer.createdDate, 'yyyy-MM-dd HH:mm:ss')
      };

      angular.forEach(answer.result, function(value, key) {  
        var keyString = "q" + key;
        answerRow[keyString] = value;
        
        for(var i=0;i<tempAnswerCount.length;i++){
        	tempSplitData = value.split(',');
			for(var j=0;j<tempSplitData.length;j++){
				if(tempArray[i].text==tempSplitData[j]){
					tempAnswerCount[i]++;
				}
			}
		}
      });
      
   
      
      
      angular.forEach(answer.emailid, function(value, key) { 

    	emailist = emailist + value +  "\n" ;
        });

      
      
      $scope.answerData.push(answerRow);
    }); 

    for(var i=0;i<tempAnswerCount.length;i++){
		tempAnswers.push({
			v: tempArray[i].text
		});
		tempAnswers.push({
			v: tempAnswerCount[i]
		});
		
		chartAnswers.push({
			c: tempAnswers
		});
		tempAnswers = [];
	}
  
    var csvOpts = { columnOverrides: { obj: function(o) { return o.a + '|' +  o.b; } } };
    var hgtOpts = { minHeight: 200 };
    
    $scope.gridOptions = { 
      data: 'answerData',
      columnDefs: $scope.questionColumns,
      plugins: [new ngGridCsvExportPlugin(csvOpts),new ngGridFlexibleHeightPlugin(hgtOpts)],
      showGroupPanel: true,
      showFooter: true
    };

    var chart1 = {};
	chart1.type = "AreaChart";
	chart1.cssStyle = "height:300px; width:500px;";
    
    chartQuestions = [
                      {id: questionTitle, label: questionTitle, type: "string"},
                      {id: questionTitle, label: questionTitle, type: "number"}
                     ];
    
    chart1.data = {"cols": chartQuestions, "rows": chartAnswers};

    var gridlineCount=0;
    for(var i=0;i<tempAnswerCount.length;i++){
    	if(gridlineCount<tempAnswerCount[i]){
    		gridlineCount=tempAnswerCount[i];
    	}
    }
    
    var gridlines = {"count": gridlineCount+1};
    
    chart1.options = {
        "title": $scope.survey.title,
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Count", "gridlines": gridlines
        },
        "hAxis": {
            "title": chartQuestions[0].title
        }
    };

    chart1.formatters = {};

    $scope.chart = chart1;
    
    var tempQuestion;
    var tempQuestionId;
    
    $scope.chartChange = function(selectedQuestion){
    	tempAnswerCount = [];
        tempAnswers = [];
        chartAnswers = [];
    	tempQuestion = this.selectedQuestion;
    	if(tempQuestion != null) {
	    	angular.forEach(questions, function(question, key) {
	    		if (tempQuestion.name == question.title) {
	    			tempArray = question.options;
	    			tempQuestionId = question.questionId;
	    		}
	    		
	    	});
	    	
	    	for(var i=0;i<tempArray.length;i++){
	    		tempAnswerCount.push(0);
	    	}
	    	
	    	angular.forEach(answers, function(answer, key) {
	    		angular.forEach(answer.result, function(value, key) {
	    			if(tempQuestionId == key){
	    				for(var i=0;i<tempAnswerCount.length;i++){
	    					tempSplitData = value.split(',');
	    					for(var j=0;j<tempSplitData.length;j++){
	    						if(tempArray[i].text==tempSplitData[j]){
		    						tempAnswerCount[i]++;
		    					}
	    					}
	    				}
	    			}
	    		});
	    	});
    	
	    	for(var i=0;i<tempAnswerCount.length;i++){
	    		tempAnswers.push({
	    			v: tempArray[i].text
	    		});
	    		tempAnswers.push({
	    			v: tempAnswerCount[i]
	    		});
	    		
	    		chartAnswers.push({
	    			c: tempAnswers
	    		});
	    		tempAnswers = [];
	    		
	    	}
    	
	    	chartQuestions = [
	                             {id: questionTitle, label: questionTitle, type: "string"},
	                             {id: questionTitle, label: tempQuestion.name, type: "number"}
	                         ];
	    	
	    	chart1.data = {"cols": chartQuestions, "rows": chartAnswers};
    	
	    	gridlineCount=0;
	        for(var i=0;i<tempAnswerCount.length;i++){
	        	if(gridlineCount<tempAnswerCount[i]){
	        		gridlineCount=tempAnswerCount[i];
	        	}
	        }
	        
	        gridlines = {"count": gridlineCount+1};
	        
	        
	        chart1.options = {
	                "title": $scope.survey.title,
	                "isStacked": "true",
	                "fill": 20,
	                "displayExactValues": true,
	                "vAxis": {
	                    "title": "Count", "gridlines": gridlines
	                },
	                "hAxis": {
	                    "title": chartQuestions[0].title
	                }
	            };
    	}
    }
    
    $scope.request = {
    	      link : $location.protocol() + '://' + $location.host()
    	          + ($location.port() != 80 ? ':' + $location.port() : '')
    	          + '/request/' + $scope.survey.surveyId, //suervy 1111 surveyId 들어가야 함
    	      email : ''
    	    };
    
       
	$scope.resultlink = {
			link : $location.protocol()
					+ '://'
					+ $location.host()
					+ ($location.port() != 80 ? ':'
							+ $location.port() : '')
					+ '/sharedreport#/sharedreport/'
					+ $scope.survey.surveyId
				

		};
	
	//http://54.68.13.217:8080/sharedreport#/sharedreport/4028808348ddd4bd0148ddd987a10000
    
    $scope.checkMobile = function() {
        var check = false;
        (function(a) {
          if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
              .test(a)
              || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
                  .test(a.substr(0, 4)))
            check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
      }
    
    
    $scope.sendByEmail = function() {
    	
        $scope.emails = [];
        
        $scope.emailResults = [];
        
    	var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
    	    	
    	
    	var emailData = emailist.split('\n');
    	
    	
    	angular.forEach(emailData, function(value, key){
    		if(value != null && value != ''){
    			if(EMAIL_REGEXP.test(value)){
    				$scope.emails.push({
    					message: value,
    					isNotValid: false,
    				});
    			}
    			else{
    				$scope.emails.push({
    					message: value,
    					isNotValid: true,
    				});
    				$scope.emails.isNotValid = true;
    			}
    		}
    	});
    	
    	if(!$scope.emails.isNotValid && $scope.emails != ''){
    		angular.forEach($scope.emails, function(value, key){
    			$http.post('/rest/survey/' + $scope.survey.surveyId + '/send', $.param({email: value.message}), { headers: { "Content-Type": "application/x-www-form-urlencoded" } }).success(function(response){
    			}).error(function(err){
    				$scope.emailResults.push({
    					isError: true,
    					message: value.message
    				})
    				$scope.emailResults.isError = true;
    			});
    		});
    		if($scope.emailResults.isError != true){
    	    	$scope.emailResults.isSuccess = true;
    		}
    		$scope.request.email = '';
    	}
    }
    
    $scope.sendBykakao = function() {
    	
        Kakao.Link.createTalkLinkButton({
            container: '#kakao-link-btn',
            label: 'Any play poll! 참여하신 설문의 결과 입니다',
            image: {
            	 src: 'http://www.phyast.pitt.edu/~zov1/gnuplot/png/pieslice2.png',
              width: '300',
              height: '200'
            },
            webButton: {
             text: '설문 결과 보러가기',
              url: $scope.resultlink.link // 앱 설정의 웹 플랫폼에 등록한 도메인의 URL이어야 합니다.
            }
          });
        }
    
   
  


  } 
]);


surveyControllers.controller('SharedReportController', [
                                                		'$scope',
                                                		'$routeParams',
                                                		'$location',
                                                		'$filter',
                                                		'$http',
                                                		'survey',
                                                		'questions',
                                                		'answers',
                                                		function($scope, $routeParams, $location, $filter, $http, survey,
                                                				questions, answers) {

                                                			console.log("hi controller");
                                                			
                                                			
                                                		    $scope.survey = survey;
                                                		    $scope.questionColumns = [];
                                                		    $scope.answerData = [];
                                                		    $scope.resultyn = survey.result;
                                                		    var chartQuestions = [];
                                                			var chartAnswers = [];
                                                			var tempArray = [];
                                                			var tempAnswerCount = [];
                                                			var tempAnswers = [];
                                                			var tempSplitData = [];
                                                			var questionTitle;
                                                		    
                                                			$scope.selectQuestionOptions = [];
                                                			$scope.selectedQuestion;
                                                			
                                                		    var emailist = "";
                                                		    
                                                		    // 컬럼 정의
                                                		    $scope.questionColumns.push({
                                                		      field: 'num',
                                                		      displayName: '순번',
                                                		      width: 45
                                                		    });
                                                		    
                                                		    $scope.questionColumns.push({
                                                		      field: 'createdDate',
                                                		      displayName: '응답시간',
                                                		      width: 160
                                                		    });
                                                		    
                                                		    $scope.graghisrequired = false; //질문 타입에 따라 그래프  출력 여부 결정
                                                			angular.forEach(questions, function(question, key) {
                                                		    	
                                                				$scope.questionColumns.push({
                                                					field: "q" + question.questionId,
                                                					displayName: question.title
                                                				});
                                                				questionTitle = question.title;
                                                				if (question.options != null) {
                                                					question.options = JSON.parse(question.options);
                                                					if((question.type == "MULTIPLE_CHOICE") || (question.type == "CHECKBOXES") || (question.type == "DROPDOWN")){
                                                						$scope.graghisrequired = true;
                                                						$scope.selectQuestionOptions.push({name:question.title});
                                                						tempArray = question.options;
                                                					}
                                                				}
                                                			});
                                                		    
                                                			for(var i=0;i<tempArray.length;i++){
                                                				tempAnswerCount.push(0);
                                                			}
                                                			
                                                		    // 데이터 정의
                                                		    angular.forEach(answers, function(answer, key) {
                                                		      
                                                		      var answerRow = {
                                                		          num: key + 1,
                                                		          createdDate: $filter('date')(answer.createdDate, 'yyyy-MM-dd HH:mm:ss')
                                                		      };

                                                		      angular.forEach(answer.result, function(value, key) {  
                                                		        var keyString = "q" + key;
                                                		        answerRow[keyString] = value;
                                                		        
                                                		        for(var i=0;i<tempAnswerCount.length;i++){
                                                		        	tempSplitData = value.split(',');
                                                					for(var j=0;j<tempSplitData.length;j++){
                                                						if(tempArray[i].text==tempSplitData[j]){
                                                							tempAnswerCount[i]++;
                                                						}
                                                					}
                                                				}
                                                		      });
                                                		      
                                                		   
                                                		      
                                                		      
                                                		      angular.forEach(answer.emailid, function(value, key) { 

                                                		    	emailist = emailist + value +  "\n" ;
                                                		        });

                                                		      
                                                		      
                                                		      $scope.answerData.push(answerRow);
                                                		    }); 

                                                		    for(var i=0;i<tempAnswerCount.length;i++){
                                                				tempAnswers.push({
                                                					v: tempArray[i].text
                                                				});
                                                				tempAnswers.push({
                                                					v: tempAnswerCount[i]
                                                				});
                                                				
                                                				chartAnswers.push({
                                                					c: tempAnswers
                                                				});
                                                				tempAnswers = [];
                                                			}
                                                		  
                                                		    var csvOpts = { columnOverrides: { obj: function(o) { return o.a + '|' +  o.b; } } };
                                                		    var hgtOpts = { minHeight: 200 };
                                                		    
                                                		    $scope.gridOptions = { 
                                                		      data: 'answerData',
                                                		      columnDefs: $scope.questionColumns,
                                                		      plugins: [new ngGridCsvExportPlugin(csvOpts),new ngGridFlexibleHeightPlugin(hgtOpts)],
                                                		      showGroupPanel: true,
                                                		      showFooter: true
                                                		    };

                                                		    var chart1 = {};
                                                			chart1.type = "AreaChart";
                                                			chart1.cssStyle = "height:300px; width:500px;";
                                                		    
                                                		    chartQuestions = [
                                                		                      {id: questionTitle, label: questionTitle, type: "string"},
                                                		                      {id: questionTitle, label: questionTitle, type: "number"}
                                                		                     ];
                                                		    
                                                		    chart1.data = {"cols": chartQuestions, "rows": chartAnswers};

                                                		    var gridlineCount=0;
                                                		    for(var i=0;i<tempAnswerCount.length;i++){
                                                		    	if(gridlineCount<tempAnswerCount[i]){
                                                		    		gridlineCount=tempAnswerCount[i];
                                                		    	}
                                                		    }
                                                		    
                                                		    var gridlines = {"count": gridlineCount+1};
                                                		    
                                                		    chart1.options = {
                                                		        "title": $scope.survey.title,
                                                		        "isStacked": "true",
                                                		        "fill": 20,
                                                		        "displayExactValues": true,
                                                		        "vAxis": {
                                                		            "title": "Count", "gridlines": gridlines
                                                		        },
                                                		        "hAxis": {
                                                		            "title": chartQuestions[0].title
                                                		        }
                                                		    };

                                                		    chart1.formatters = {};

                                                		    $scope.chart = chart1;
                                                		    
                                                		    var tempQuestion;
                                                		    var tempQuestionId;
                                                		    
                                                		    $scope.chartChange = function(selectedQuestion){
                                                		    	tempAnswerCount = [];
                                                		        tempAnswers = [];
                                                		        chartAnswers = [];
                                                		    	tempQuestion = this.selectedQuestion;
                                                		    	if(tempQuestion != null) {
                                                			    	angular.forEach(questions, function(question, key) {
                                                			    		if (tempQuestion.name == question.title) {
                                                			    			tempArray = question.options;
                                                			    			tempQuestionId = question.questionId;
                                                			    		}
                                                			    		
                                                			    	});
                                                			    	
                                                			    	for(var i=0;i<tempArray.length;i++){
                                                			    		tempAnswerCount.push(0);
                                                			    	}
                                                			    	
                                                			    	angular.forEach(answers, function(answer, key) {
                                                			    		angular.forEach(answer.result, function(value, key) {
                                                			    			if(tempQuestionId == key){
                                                			    				for(var i=0;i<tempAnswerCount.length;i++){
                                                			    					tempSplitData = value.split(',');
                                                			    					for(var j=0;j<tempSplitData.length;j++){
                                                			    						if(tempArray[i].text==tempSplitData[j]){
                                                				    						tempAnswerCount[i]++;
                                                				    					}
                                                			    					}
                                                			    				}
                                                			    			}
                                                			    		});
                                                			    	});
                                                		    	
                                                			    	for(var i=0;i<tempAnswerCount.length;i++){
                                                			    		tempAnswers.push({
                                                			    			v: tempArray[i].text
                                                			    		});
                                                			    		tempAnswers.push({
                                                			    			v: tempAnswerCount[i]
                                                			    		});
                                                			    		
                                                			    		chartAnswers.push({
                                                			    			c: tempAnswers
                                                			    		});
                                                			    		tempAnswers = [];
                                                			    		
                                                			    	}
                                                		    	
                                                			    	chartQuestions = [
                                                			                             {id: questionTitle, label: questionTitle, type: "string"},
                                                			                             {id: questionTitle, label: tempQuestion.name, type: "number"}
                                                			                         ];
                                                			    	
                                                			    	chart1.data = {"cols": chartQuestions, "rows": chartAnswers};
                                                		    	
                                                			    	gridlineCount=0;
                                                			        for(var i=0;i<tempAnswerCount.length;i++){
                                                			        	if(gridlineCount<tempAnswerCount[i]){
                                                			        		gridlineCount=tempAnswerCount[i];
                                                			        	}
                                                			        }
                                                			        
                                                			        gridlines = {"count": gridlineCount+1};
                                                			        
                                                			        
                                                			        chart1.options = {
                                                			                "title": $scope.survey.title,
                                                			                "isStacked": "true",
                                                			                "fill": 20,
                                                			                "displayExactValues": true,
                                                			                "vAxis": {
                                                			                    "title": "Count", "gridlines": gridlines
                                                			                },
                                                			                "hAxis": {
                                                			                    "title": chartQuestions[0].title
                                                			                }
                                                			            };
                                                		    	}
                                                		    }
                                                		    
                                                		
                                                		    
                                                		       
                                                	
                                                			
                                                		
                                                		    
                                                	
                                                		    

                                                		} ]);
