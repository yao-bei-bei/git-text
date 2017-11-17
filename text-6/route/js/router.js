app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider) {
        $urlRouterProvider.when('', 'login');
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'parent': {
                        templateUrl: 'login.html',
                        controller: 'loginCtrl'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            [

                                'css/ajax.css',
                                'css/demo.css',
                                'http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css',
                                'js/login.js',
                                '//cdn.bootcss.com/oclazyload/1.0.9/ocLazyLoad.js',
                                '//cdn.bootcss.com/angular-ui-router/1.0.0/angular-ui-router.js',
                                'https://cdn.bootcss.com/angular.js/1.6.3/angular.min.js',
                                '//cdn.bootcss.com/oclazyload/1.0.9/ocLazyLoad.js',
                                'js/variable.js',
                                ]);
                    }]
                }
            })
            .state('success', {
                url: '/success',
                views: {
                    'parent': {
                        templateUrl: 'ajaxsuccess.html',
                        controller: 'successCtrl'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            [
                                'css/ajax.css',
                                'css/demo.css',
                            ]);
                    }]
                }
            })
            .state('success.computers', {
                url: '/computers',
                views: {
                    'child': {
                        templateUrl: 'page.html',
                    }
                },
            })
            .state('success.article', {
                url: '/article/{page}/{size}?status&startAt&endAt&type&title',
                views: {
                    'child': {
                        templateUrl: 'Article.html',
                        controller: 'siteCtrl'
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            [
                                'js/success.js',
                                '../../../locales/bootstrap-datepicker.js',
                                '../../../locales/bootstrap-datepicker.js'
                            ]);
                    }]
                }

            })
            .state('success.add', {
                url: '/add?id',
                views: {
                    'child': {
                        templateUrl: '../text-6/Add.html',
                        controller: 'myTestCtrl',
                    }
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            [
                                'js/preview.js',
                                 'wangEditor/bootbox.min.js',
                                 'wangEditor/wangEditor.js',
                                 'wangEditor/richText.js'
                            ]);
                    }]
                }
            })
    }])

app.controller('successCtrl', ['$scope', function ($scope) {
    $scope.name = 'loginCtrl';
}])