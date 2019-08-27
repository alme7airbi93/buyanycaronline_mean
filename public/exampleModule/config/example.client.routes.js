
console.log("example route");
angular.module('example').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/exampleModule/views/example.client.view.html'
    }).otherwise({
      redirectTo: '/'
    });
  }
]);
