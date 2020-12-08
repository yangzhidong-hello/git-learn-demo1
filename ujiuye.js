var ujiuye = (function () {
    /* 
 * 获取元素样式
 * @parm {Object}  elemObj : 标签
 * @parm {string}  attr : 属性
 */
    function getStyle(elemObj, attr) {//attribute
        //标准浏览器：  getComputedStyle(元素).属性名
        //ie浏览器： 元素.currentStyle.属性名
        if (window.getComputedStyle) { //有
            return getComputedStyle(elemObj)[attr];
        } else {
            return elemObj.currentStyle[attr];
        }

    }



    /* 
     * 运动函数
     * @parm {Object}  elemObj : 标签
     * @parm {string}  attr : 属性
     * @parm {number}  step : 步长
     * @parm {number}  target : 目标值
     */

    function move(elemObj, attr, step, target) {
        //右     当前值  目标值
        //           8    500 
        //           500    0
        step = parseInt(getStyle(elemObj, attr)) < target ? step : -step;
        //6.在下一个定时器开启之前，停止定时器
        clearInterval(elemObj.timer); //自定义属性
        elemObj.timer = setInterval(function () {
            //4.在之前的基础+10
            var l = parseInt(getStyle(elemObj, attr)) + step;

            //5.在500的位置停止
            if ((l >= target && step > 0) || (l <= target && step < 0)) { //从左往右
                l = target;
                clearInterval(elemObj.timer);
            }

            //3.移动div 改变left值
            elemObj.style[attr] = l + "px";
        }, 30);
    }

    /* 
    *声明一个函数，对字符串进行补0操作
    *@parm {number}  num : 数值
    */
    //声明一个函数，对字符串进行补0操作
    function toTwo(num) {
        return num < 10 ? "0" + num : num;
    }


    /* 
    *生成某个范围的随机数
    *@parm {number}  min : 最小值
    *@parm {number}  max : 最大值
    */
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    /* 
    *绑定事件
    *@parm {object}  elem : 标签
    *@parm {string}  type : 事件类型
    *@parm {function}  fun : 事件处理函数
    */
    function bind(elem, type, fun) {//elem:标签 type：事件类型,fun:事件处理函数
        if (elem.addEventListener) {
            elem.addEventListener(type, fun);
        } else {
            elem.attachEvent("on" + type, function () {
                fun.call(elem);
            });
        }
    }
    /* 
    *取消绑定事件
    *@parm {object}  elem : 标签
    *@parm {string}  type : 事件类型
    *@parm {function}  fun : 事件处理函数
    */
    function unbind(elem, type, fun) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, fun);
        } else {
            elem.detachEvent("on" + type, fun);
        }
    }


    /* 
     *ajax
     *@parm {object}  reqObj : 请求数据对象
     */
    function ajax(reqObj){
        //1.创建请求对象
        var req = new XMLHttpRequest();

        //2.建立链接
        if(reqObj.type.toLowerCase() == "get"){
            //如果有请求参数就拼接，没有就不拼接
            var url = reqObj.data ? reqObj.url+"?"+reqObj.data :reqObj.url;
            req.open("get",url,true);

            //3.发送请求
            req.send();
        }else{
            req.open("post",reqObj.url,true);
            //post设置请求头
            req.setRequestHeader("Content-type","application/x-www-form-urlencoded");

              //3.发送请求
              req.send(reqObj.data);
        }

        //4.监听结果
        req.onreadystatechange = function(){
            if(req.readyState == 4){
                if(req.status == 200){
                    reqObj.success(JSON.parse(req.responseText));
                }
            }
        }
        
    }        
    /* 
     *有缓冲的运动 
     *@parm {Object}  elem : 标签
     *@parm {Object}  props : 运动属性对象
     *@parm {number}  time : 运动时间
     *@parm {Function}} fun：回调函数
     */
    function bufferMove(elem, props, time,fun) { //elem:oDiv[0]
        props.opacity ? props.opacity = props.opacity*100:"";
        clearInterval(elem.timer);
        elem.timer = setInterval(function () {
            //假设都到达了目标点  tag = true;
            var tag = true;

            //遍历对象，每一组值都需要运动
            for (var attr in props) {
                //2.获取当前值
                if (attr == "opacity") {
                    var cur = parseInt(getStyle(elem, attr) * 100);
                } else {
                    var cur = parseInt(getStyle(elem, attr)); //101 175
                }

                //3.计算速度
                var speed = (props[attr] - cur) / time;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                //只要有属性没有达到目标点，假设不成立  tag = false
                if (cur != props[attr]) {
                    tag = false;
                }

                //1.div移动  left
                if (attr == "opacity") {
                    elem.style[attr] = (cur + speed) / 100;
                } else {
                    elem.style[attr] = cur + speed + "px";
                }
            }

            if(tag == true){
                clearInterval(elem.timer);
                //两真为真，如果第一个值为假，第二就不会再看
                //
                fun&&fun();
            }
        }, 30);
    }


    return {
        "getStyle":getStyle,
        "move":move,
        "toTwo":toTwo,
        "random":random,
        "bind":bind,
        "unbind":unbind,
        "ajax":ajax,
        "bufferMove":bufferMove
    }
})()