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
                console.log($scope.demoLists)
                $scope.pagina = Math.ceil($scope.pagination.total / $scope.params.size);//页数量
                //生成页码，在 html里 ng-repeat 出来
                $scope.pageNum = [];
                for (var i = 1; i <=$scope.pagina; i++) {
                    $scope.pageNum.push(i);
                };
                $scope.params.page=$scope.pagination.page;
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
    $scope.prevPage = function () {               //点击上一页执行的函数
        if ($scope.params.page >=1) {
            $scope.params.page--;
            $scope.num= $scope.params.page;
            $scope.res();
        }else{
            return;
        }
    };
    $scope.nextPage = function () {              //点击下一页执行的函数
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
    //清空
    $scope.searching=function () {
        $scope.params ={
            type:'',
            status:'',
        }
        $scope.pickerParams={
            startAt:'',
            endAt:''
        }
        angular.forEach( $scope.params, function(data){
            console.log($scope.params.type);
        });
        angular.forEach( $scope.pickerParams, function(data){
            console.log($scope.pickerParams);
        });
        $scope.res();

    }
    //修改上下线
    //1-草稿 2-上线
    $scope.off =function (id,status) {
        if(status==1){
            status=2;
        }else {
            status=1;
        };
        bootbox.confirm({
            title: "提示",
            message: "<a>下线后该图片将不会在轮播banner中展示<br>是否执行下线操作？</a>",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> 确定'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> 取消'
                }
            },
            callback: function (result) {
                if(result==true){
                    bootbox.alert({
                        title: "提示",
                        message: "已取消",
                        className: 'bb-alternate-modal'
                    });
                    return
                }else{
                    $scope.of();
                    bootbox.alert({
                        title: "提示",
                        message: "上线成功",
                        className: 'bb-alternate-modal'
                    });
                }
            }
        });
        $scope.of=function () {
            $http({
                method:"put",
                url:"/carrots-admin-ajax/a/u/article/status",
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                params:{
                    id:id,
                    status:status
                }
            }).then(function (data) {
                console.log(data.data.message);
                if(data.data.code==0){
                    $state.go($state.current,{},{reload:true})
                }
            },function (data){
                console.log("请求失败")
            });
        }

    };
    //编辑删除
    $scope.delete=function (id) {
        bootbox.confirm({
            title: "提示",
            message: "<a>是否删除</a>",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> 确定'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> 取消'
                }
            },
            callback: function (result) {
                if (result === true) {
                    bootbox.alert({
                        title: "提示",
                        message: "已取消",
                        className: 'bb-alternate-modal'
                    });
                } else {
                    $http({
                        method:"delete",
                        url:'/carrots-admin-ajax/a/u/article/'+id,
                        headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                        params:{
                            id:id
                        }
                    }).then(function (res) {
                        $state.go($state.current,{},{reload:true});
                        console.log(res.data.message);
                    },function (res) {
                        console.log(res.data.message);
                    });
                    bootbox.alert({
                        title: "提示",
                        message: "删除成功",
                        className: 'bb-alternate-modal'
                    });
                }
            }
        });
    };
//url路由传参id编辑
    $scope.edit=function (id) {
        $state.go('success.add',{id:id});
    };
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
app.filter('off', function () {
    return function (status) {
        if (status == 1) {
            status = "上线"
        } else if (status == 2) {
            status = "下线 "
        }
        return status
    }
});

