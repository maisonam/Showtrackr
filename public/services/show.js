angular.module('MyApp')
  .factory('createSurvey', ['$resource', function($resource) {
    return $resource('/api/surveys/csp/start');
  }])
  .factory('Survey', ['$resource', function($resource) {
    return $resource('/api/surveys/responses/:key', { key: '@key' }, {
    query:{method:'GET',isArray:false},
    update: {method: 'PUT'}
  });
  }]);


  