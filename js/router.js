   app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.when('', 'login');
	$stateProvider
		.state('login', {
			url: '/login',
			views: {
				'parent': {
					templateUrl: 'login.html',
					controller: 'loginCtrl'
				}
			}
		})
		.state('success', {
			url: '/success',
			views: {
				'parent': {
					templateUrl: 'ajaxsuccess.html',
					controller: 'successCtrl'
				}
			}
		})
		.state('success.computers', {
			url: '/computers',
			views: {
				'child': {
					templateUrl: 'page.html',
				}
			}
		})
		.state('success.article', {
			url: '/article',
			views: {
				'child': {
					templateUrl: 'Article.html',
					controller: 'siteCtrl'
				}
			}
		})
		.state('success.add', {
			url: '/add',
			views: {
				'child': {
					templateUrl: '../text-6/Add.html',
				}
			}
		})
}])
   
app.controller('successCtrl',['$scope',function($scope){
	$scope.name='loginCtrl';
}])