   
app.controller('loginCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
	$scope.goPath = function() {
		var data = {
			name: $scope.name,
			pwd: $scope.pwd
		}

		var promise = $http({
			method: 'post',
			url: '/carrots-admin-ajax/a/login',
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			transformRequest: function(data) {
				return $.param(data);
			},
			data:data
		})

		promise.then(function(res) {
			console.log(res)
			if(res.data.code == 0) {
				$state.go('success.computers')
			}
            $scope.code=res.data.code;
            console.log($scope.code)
            $scope.message=res.data.message;
            console.log($scope.message)
		}, function(res) {
			alert('请求失败')
		})
	}
}])

//获取焦点

//失去焦点
//userName.onfocus = function() {
//	userName.className = "text_gain";
//};
//失去焦点
//userName.onblur = function() {
//	userName.className = "text_lose";
//原生的验证
//				var user_info = userName.value;
//				var reg = /^[a-zA-Z]\w{4,16}$/;
//				if(user_info === '') {
//					info.innerHTML = '用户名不能为空';
//				} else if(!reg.test(user_info)) {
//					info.innerHTML = '用戶名格式不正确，字母开头';
//				} else {
//					info.innerHTML = '';
//				}
//}
//获取焦点
//userPwd.onfocus = function() {
//	userPwd.className = "gain";
//};
//失去焦点
//userPwd.onblur = function() {
//	userPwd.className = "lose";
//原生的验证
//				var passwor_info = userPwd.value;
//				var myreg = /^\S{5,18}$/;
//				if(passwor_info === '') {
//					info.innerHTML = '密码不能为空';
//				} else if(!myreg.test(passwor_info)) {
//					info.innerHTML = '密码格式不正确,长度在5-18位之间';
//				} else {
//					info.innerHTML = '';
//				}
//}
//原生
//						btn.onclick = function() {
//							console.log(userName.value)
//							console.log(userPwd.value)
//							var ajax = new XMLHttpRequest();
//							ajax.onreadystatechange = function() {
//								if(ajax.readyState === 4) {
//									if(ajax) {
//										var txt = JSON.parse(ajax.responseText);
//										console.log(txt);
//									}
//									if(txt.message === 'success') {
//										info.innerHTML = '登录成功';
//                                      location.href='ajaxsuccess.html'
//									} else {
//										info.innerHTML = txt.message;
//									}
//								} else {
//									info.innerHTML = "请求错误，代码：" + ajax.status;
//								}
//							}
//			
//							ajax.open('Post', "/carrots-admin-ajax/a/login", true);
//							ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//							ajax.send("name="+userName.value+"&pwd="+userPwd.value);
//						}
//jq
//						btn = $(btn);
//						btn.click(function() {
//							$.ajax({
//								type: "POST",
//								url: "/carrots-admin-ajax/a/login",
//								data: {
//									"name": userName.value,
//									"pwd": userPwd.value
//								},
//								dataType: "json",
//								success: function(data) {
//									if(data.message === "success") {
//										info.innerHTML = "登录成功";
//										location.href = 'ajaxsuccess.html'
//									} else {
//										info.innerHTML = data.message;
//									}
//								}
//							});
//						});

//框架