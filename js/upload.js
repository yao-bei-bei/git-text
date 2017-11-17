// //上传图片
// var fileUpload = {
//     //dom元素
//     dom: {
//         chooseFile: document.getElementById('myFile'),
//         showFile: document.getElementById('showFile'),
//         upLoadBtn: document.getElementById('upLoadBtn')
//     },
//     //选择的图片文件
//     files: undefined
// };
// //选择文件之后 onchange
// var red=[];
// fileUpload.dom.chooseFile.onchange = function() {
//     fileUpload.files = this.files[0];
//     red=this.files[0];
//     readFile(fileUpload.files);
// };
//
// //上传按钮点击
// fileUpload.dom.upLoadBtn.onclick = function() {
//     var datares={};
//     var data = new FormData();
//     console.log(data);
//     if(!fileUpload.files) {
//         return;
//     };
//     data.append('file', fileUpload.files);
//     var promise = ajax({
//         method: 'post',
//         url: '/carrots-admin-ajax/a/u/img/task',
//         data: data
//     });
//     promise.then(function(res) {
//         if(res.code === 0 && res.message == 'success') {
//             console.log(res.data);
//             var datares=res.data;
//             console.log(datares)
//         } else {
//             console.log(res.message);
//         }
//     }, function(e) {
//         alert(e);
//     })
// };
// //FileReader本地预览文件
// var readFile = function(file) {
//     var instance = new FileReader();
//     instance.readAsDataURL(file);
//     instance.onload = function() {
//         var resUrl = this.result;
//         fileUpload.dom.showFile.appendChild(createElement('img', { 'src': resUrl }));
//     }
// };
// //创建dom元素
// var createElement = function(tagName, property) {
//     //property为obj
//     var Node = document.createElement(tagName);
//     for(var i in property) {
//         Node.setAttribute(i, property[i]);
//     }
//     return Node;
// };
// //封装ajax
// var ajax = function(config) {
//     var xhr = new XMLHttpRequest();
//     xhr.open(config.method, config.url, config.async || true);
//     return new Promise(function(resolve, reject) {
//         xhr.onreadystatechange = function() {
//             if(xhr.status === 200 && xhr.readyState === 4) {
//                 resolve(JSON.parse(xhr.responseText));
//                 console.log(xhr)
//             }
//         };
//         xhr.onerror = function(e) {
//             reject(e);
//         };
//         xhr.send(config.data || '');
//     })
// }
//
