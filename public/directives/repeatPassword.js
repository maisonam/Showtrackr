angular.module('MyApp')
  .directive('repeatPassword', function() {
    return {
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        var otherInput = elem.inheritedData("$formController")[attrs.repeatPassword];

        ctrl.$parsers.push(function(value) {
          if (value === otherInput.$viewValue) {
            ctrl.$setValidity('repeat', true);
            return value;
          }
          ctrl.$setValidity('repeat', false);
        });

        otherInput.$parsers.push(function(value) {
          ctrl.$setValidity('repeat', value === ctrl.$viewValue);
          return value;
        });
      }
    };
  })
  .directive('question', function ($compile) {
    
    var optionTemplate = '<label for="{{question.key}}">{{ $index + 1 }}. {{question.text}}</label><select class="form-control" ng-options="option.key as option.text for option in question.answerMeta.options"></select>';
    var fieldTemplate = '<label for="{{question.key}}">{{ $index + 1 }}. {{question.text}}</label><input type="text" class="form-control" name="{{question.key}} id="{{question.key}}" placeholder="">';
    var calendarTemplate = '<label for="{{content.key}}">{{ $index + 1 }}. {{content.text}}</label><input ng-model="{{content.key}}" type="text" class="form-control" id="{{content.key}}" data-autoclose="1" bs-datepicker>';
    var tableTemplate = '<label for="{{content.key}}">{{ $index + 1 }}. {{content.text}}</label><input type="text" class="form-control" name="{{content.key}} id="{{content.key}}" ng-model="ay_lmao.table" placeholder="">';

    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 'option':
                template = optionTemplate;//optionTemplate;
                break;
            case 'field':
                template = fieldTemplate;
                break;
            case 'calendar':
                template = fieldTemplate;//calendarTemplate;
                break;
            case 'table':
                template = fieldTemplate;//tableTemplate;
                break;                
        }

        return template;
    }


    var linker = function(scope, element, attrs) {
        scope.rootDirectory = 'images/';

        element.append(getTemplate(scope.question.answerMeta.type)).show();

        switch(scope.question.answerMeta.type) {
            case 'option':
                  element.find("select").attr({
                    "ng-model": "surveyAnswers."+scope.question.key+".answerKey",
                    "ng-init": "surveyAnswers."+scope.question.key+".answerKey='"+scope.question.answerMeta.options[0].key+"'"
                  });
                break;
            case 'field': 
            case 'calendar':
                  element.find("input").attr("ng-model","surveyAnswers."+scope.question.key+".text");
                break;
            case 'table':
                  element.find("input").attr("ng-model","surveyAnswers."+scope.question.key+".text");
                break;                
        }



        $compile(element.contents())(scope); 



    }

    return {
        restrict: "E",
        link: linker
        // scope: {
        //     content:'=',
        //     index:'@'
        // }
    };
});