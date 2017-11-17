//定义“上传”指令，修改后也可用于上传其他类型的文件
app.directive("imgUpload", function () {
    return {
        //通过设置项来定义
        restrict: 'AE',
        scope: false,
        templateUrl: "file.html",  //name:testReport 与接口字段相对应。
        replace: true,
        link: function (scope, ele, attrs) {
            ele.bind('click', function () {
                $('#file').val('');
            });
            ele.bind('change', function () {
                scope.file = ele[0].children[1].files;
                scope.isShow = true;
                scope.ishide = "开始上传";
                scope.size = scope.file[0].size;
                console.log(scope.size)
                if (scope.file[0].size > 52428800) {
                    alert("图片大小不大于50M");
                    scope.file = null;
                    return false;
                }
                scope.fileName = scope.file[0].name;
                var postfix = scope.fileName.substring(scope.fileName.lastIndexOf(".") + 1).toLowerCase();
                if (postfix != "jpg" && postfix != "png") {
                    alert("图片仅支持png、jpg类型的文件");
                    scope.fileName = "";
                    scope.file = null;
                    scope.$apply();
                    return false;
                }
                scope.$apply();
                scope.reader = new FileReader();    //创建一个FileReader接口
                console.log(scope.reader);

                if (scope.file) {
                    //获取图片（预览图片）
                    scope.package = function () {
                        scope.reader.readAsDataURL(scope.file[0]);    //FileReader的方法，把图片转成base64
                        scope.reader.onload = function (ev) {
                            scope.$apply(function () {
                                scope.thumb = {
                                    imgSrc: ev.target.result       //接收base64，scope.thumb.imgSrc为图片。
                                };
                            });
                        };
                    };

                } else {
                    alert('上传图片不能为空!');
                }
            });
        }
    };
});


app.controller("myTestCtrl", function ($scope, $http, $state, $stateParams, $filter) {
    $scope.data = {};
    $scope.isShow = false;
    //新增上传图片
    $scope.a = 0;
    $scope.saveClick = function () {
        $http({
            method: 'POST',
            url: '/carrots-admin-ajax/a/u/img/task',
            headers: {
                'Content-Type': undefined
            },
            transformRequest: function () {
                var formData = new FormData();
                formData.append('file', $scope.file[0]);
                return formData;
            }
        }).then(function (res) {
            console.log(res);
            //控制上传按钮
            //进度条方法
            ~function () {
                $scope.a = 0;
                var timer = setInterval(function () {
                    $scope.a = $scope.a + 0.5;
                    if ($scope.a >= 100) {
                        clearInterval(timer);
                        $scope.ishide="上传成功"
                        $scope.package();
                    }else{
                        $scope.ishide="上传中"
                    }
                    $scope.$apply();
                }, 0.1)
            }();

            //添加图片
            if (res.data.code == 0) {
                $scope.data.img = res.data.data.url;
            }
        }, function () {
            alert("错误");
        });

    };

    //新增删除
    $scope.toggle = function () {
        $scope.data = {};
        $scope.isShow = false;
    };
    //判断编辑 还是新增   请求单个
    if ($stateParams.id) {
        $scope.receivedId = $stateParams.id;
        console.log($scope.receivedId);
        $http({
            method: "get",
            url: '/carrots-admin-ajax/a/article/' + $scope.receivedId,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (res) {
            $scope.data = res.data.data.article;
            console.log($scope.data)
        }, function (res) {
            console.log(res.data.message);
        })
    }

    // 判断上下线 新增article
    $scope.addArticl = function (status) {
        $scope.data.status = status;
        if($stateParams.id){
            //编辑单个发送请求
                $http({
                    method: 'put',
                    url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                    params :$scope.data
                }).then(function (res) {
                    if (res.data.code == 0) {
                        $state.go('success.article', {reload: true})
                    }
                }, function (res) {
                    alert(res.data.message)
                })
        }else{
            $http({
                'method': 'post',
                'url': '/carrots-admin-ajax/a/u/article',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                'transformRequest': function (data) {
                    return $.param(data);
                },
                'data': $scope.data
            }).then(function (res) {
                if (res.data.code == 0) {
                    $state.go('success.article', {reload: true})
                }
            }, function (res) {
                alert(res.data.message)
            })
        }

    };
});