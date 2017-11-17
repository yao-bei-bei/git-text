app
    .directive('richText', function () {
        return {
            restrict: 'A',
            scope: {},
            require: '^ngModel',
            link: function (scope, element, property, ngModelCtrl) {
                var instance = new wangEditor(element[0]);
                instance.customConfig.zIndex = 100;
                instance.customConfig.menus = [
                    'head',  // 标题
                    'bold',  // 粗体
                    'italic',  // 斜体
                    'foreColor',  // 文字颜色
                    'backColor',  // 背景颜色
                    'link',  // 插入链接
                    'list',  // 列表
                    'justify',  // 对齐方式
                    //'quote',  // 引用
                    'emoticon',  // 表情
                    'image',  // 插入图片
                    'code',  // 插入代码
                ];
                //设置初始值
                if (ngModelCtrl) {
                    ngModelCtrl.$render = function () {
                        instance.txt.html(ngModelCtrl.$modelValue);
                        console.log(ngModelCtrl.$modelValue);
                    }
                }
                //内容变化回调函数
                instance.customConfig.onchange = function () {
                    //angular 更新视图值
                    ngModelCtrl.$setViewValue(instance.txt.html())
                }
                //生成
                instance.create();
            }

        }
    })