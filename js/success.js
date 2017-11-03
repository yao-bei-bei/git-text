app.controller('siteCtrl', function ($scope, $http, $state,$filter) {
    //列表
    $scope.demoLists = [];
    $scope.pagination = [];

    $scope.pickerParams= {
        startAt :"",
        updateAt:'',
    };
    $scope.params={
        page:1,
        startAt :'',
        endAt :'',
        type:'',
        status:'',
        size:10,
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
                $scope.pagination=response.data.data;
                $scope.pagina = Math.ceil($scope.pagination.total / $scope.params.size);//页数量
                //生成页码，在 html里 ng-repeat 出来
                $scope.pageNum = [];
                for (var i = 1; i <=$scope.pagina; i++) {
                    $scope.pageNum.push(i);
                };

            }
        }
        , function () {
            alert('错误')
        })
    };

    $scope.res();
    $scope.setPage = function (num) {             // 当点击页码数字时执行的函数
        $scope.params.page = num;
        console.log(num)
        $scope.res();

        if (num <= $scope.pagina && num!=0) {
            $scope.pagination.page=$scope.params.page;
            $scope.res();
        } else {
            return;
        };
        // alert(num)//将当前页 设置为 页码数
    };
    $scope.prevPage = function (num) {               //点击上一页执行的函数
        if ($scope.page >=1) {
            $scope.params.page--;
            $scope.num= $scope.params.page;
            $scope.res();
        }else{
            return;
        }
    };
    $scope.nextPage = function (num) {              //点击下一页执行的函数
        if ($scope.params.page < $scope.pagina) {
            $scope.params.page++;
            $scope.num = $scope.params.page;
            $scope.res();
        }else{
            return;
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
        $scope.res();
    }
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


