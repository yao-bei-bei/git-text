app.controller('siteCtrl', function ($scope, $http, $state,$filter) {
    //列表
    $scope.demoLists = [];
    $scope.pagination = [];

    $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search'
    }).then(function (response) {
        //列表
        $scope.demoLists = response.data.data.articleList;//表格
        console.log($scope.demoLists)
        $scope.pagination=response.data.data;
        $scope.size=$scope.pagination.size;
        $scope.pagina = Math.ceil($scope.pagination.total / 10);//页数量
        $scope.pagination.page = $scope.pagina;
        //按照每页显示10个数据，得到总页数
        $scope.pageNum = [];                                //生成页码，在 html里 ng-repeat 出来
        for (var i = 1; i <= $scope.pagina; i++) {
            $scope.pageNum.push(i);
        };

        $scope.currentPage =1;
        console.log( $scope.pageNum)
        //设置当前页是 0
        $scope.pickerParams= {
            startAt :"",
            updateAt:'',
        };
            $scope.params={
                page:$scope.currentPage,
                startAt :'',
                endAt :'',
                type:'',
                status:''
            };

        $scope.res= function () {
            var promise= $http({
                method: 'GET',
                url: '/carrots-admin-ajax/a/article/search',
                params:$scope.params,
            });

            promise.then(function (response) {
                if (response.data.code == 0) {
                    $scope.demoLists = response.data.data.articleList;//表格
                }
            }, function () {
                alert('错误')
            })
        };
        $scope.res();
        $scope.setPage = function (nam) {             // 当点击页码数字时执行的函数
            $scope.params.page = nam;
            if (nam <= $scope.pagina) {
                $scope.demoLists = response.data.data.articleList;//表格
            } else {
                return;
            };
            // alert(nam)//将当前页 设置为 页码数
            $scope.res();
        };
        $scope.prevPage = function () {               //点击上一页执行的函数
            if ($scope.params.page > 0) {
                $scope.params.page--;
                $scope.num = $scope.params.page;
                $scope.res();
            }
        };
        $scope.nextPage = function () {              //点击下一页执行的函数
            if ($scope.params.page < $scope.pagina) {
                $scope.params.page++;
                $scope.num = $scope.params.page;
                $scope.res();
            }
        }
        //搜索
        $scope.search =function () {
            $scope.params.startAt=$scope.pickerParams.startAt && Date.parse($scope.pickerParams.startAt );
            $scope.params.endAt =$scope.pickerParams.endAt &&Date.parse($scope.pickerParams.endAt );

            $scope.res();
        }
        $scope.searching=function () {
            $scope.params=null;
            $scope.demoLists = response.data.data.articleList;//表格
        }
    }, function (response) {
        alert(1)
    });

});

//字段 类别 type  0-首页banner 1-找职位banner  2-找精英banner 3-行业大图
app.filter('type', function () {
    return function (input) {
        if (input == 0) {
            input = "首页banner"
        } else if (input == 1) {
            input = "找职位banner"
        } else if (input == 2) {
            input = "找精英banner"
        } else if (input == 3) {
            input = "行业大图"
        }
        return input
    }
});
app.filter('status', function () {
    return function (input) {
        if (input == 1) {
            input = "草稿"
        } else if (input == 2) {
            input = "上线 "
        }
        return input
    }
});


