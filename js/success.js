
app.controller('siteCtrl', function($scope, $http) {
	$scope.article={
		ajaxData:[]
	}
	$http({
		method: 'GET',
		url: '/carrots-admin-ajax/a/article/search'
	}).then(function(response) {
			$scope.article.ajaxData = response.data.data.articleList;
			console.log($scope.article.ajaxData)
		}, function(response) {
			alert(1)
	});

});
//	app.config(['$routeProvider', function($routeProvider) {
//		$routeProvider
//			.when('/computers', {
//				templateUrl: 'page.html'
//			})
//			.when('/Article', {
//				templateUrl: 'Article.html',
//				controller:'siteCtrl'
//			})
//			.when('/add', {
//				templateUrl: 'Add.html'
//			})
//			.otherwise({
//				templateUrl: 'page.html'
//			});
//	}]);
	//字段 类别 type  0-首页banner 1-找职位banner  2-找精英banner 3-行业大图
	app.filter('type',function(){
		return function(input){
			if (input==0) {
				input="首页banner"
			} else if(input==1){
				input="找职位banner"
			}else if(input==2){
				input="找精英banner"
			}else if(input==3){
				input="行业大图"
			}
			return input
		}
	});
	app.filter('status',function(){
		return function(input){
			if(input==1){
				input="草稿"
			}else if(input==2){
				input="上线 "
			}
			return input
		}
	});
