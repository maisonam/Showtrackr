angular.module('MyApp')
  .controller('MainCtrl', ['$scope', 'createSurvey', 'Survey', function($scope, createSurvey, Survey) {

    $scope.cspFormAnswers = {};

    $scope.surveyObj = createSurvey.save(function(survey, putResponseHeaders) {
        
        $scope.survey = survey;
        
        $scope.surveyKey = survey.key;

        $scope.surveyTitle = survey.meta.title;
        
        $scope.surveyIntro = survey.meta.intro;

        $scope.surveyAnswers = {};//survey.answers;
        
        $scope.questions = survey.meta.questions;

        var questions = _.forEach(survey.meta.questions, function(question, key) {

          $scope.surveyAnswers[question.key] = {};
          
        });

        console.log(survey);


    });



    $scope.formSubmit = function() {

      $scope.survey.answers = $scope.surveyAnswers;

      var key = $scope.surveyKey;
      var survey = JSON.stringify($scope.survey);

      Survey.update({key: key}, survey);

    };

      
  }]);