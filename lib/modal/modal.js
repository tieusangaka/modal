/**
 * Created by Warren Xia on 2015/7/3.
 * @website http://www.focalhot.com
 */
(function() {
    // 定义构造函数
    this.Modal = function (options) {
        this.settings = {
            width: 400,
            height: 300,
            html: null,
            src: null,
            title: null
        };
        this.overlay = null;
        this.modal = null;

        for (var key in options) {
            if(options.hasOwnProperty(key)) {
                this.settings[key] = options[key];
            }
        }
    };
    // 弹出窗口
    Modal.prototype.open = function () {
        var that = this;
        this.content();
        this.center();
        // 绑定事件
        addHandler(window,'resize',function () {
            that.center();
        });
        addHandler(that.overlay, isMobile(navigator.userAgent) ? 'touchstart' : 'click', function () {
            that.close();
        });

        if (that.settings.title) {
            // 点击关闭
            addHandler(document.getElementById('focalhot-modal-close'), isMobile(navigator.userAgent) ? 'touchstart' : 'click', function () {
                that.close();
            });
        }
    };

    // 数据处理
    Modal.prototype.content = function () {
        var that = this;
        this.overlay = document.createElement('div');
        this.modal = document.createElement('div');
        this.overlay.className = 'focalhot-overlay';
        this.modal.className = 'focalhot-modal';
        // 如果设置了标题
        if (that.settings.title) {
            var header = document.createElement('div'),
                title = document.createElement('div'),
                close = document.createElement('span');
            title.className = 'focalhot-modal-title';
            title.innerHTML = that.settings.title;
            close.className = 'focalhot-modal-close';
            close.setAttribute('id', 'focalhot-modal-close');
            header.appendChild(title);
            header.appendChild(close);
            header.className = 'focalhot-modal-header';
            that.modal.appendChild(header);


        }
        // 如果设置了html
        if (that.settings.html) {
            that.modal.innerHTML = that.settings.html;
        }
        // 如果设置了src
        if (that.settings.src) {
            var iframe = document.createElement('iframe');
            iframe.frameBorder = 0;
            iframe.src = that.settings.src;
            that.modal.appendChild(iframe);
        }
        // 判断是否已经存在模态框
        if (document.getElementsByClassName('focalhot-overlay').length === 0 && document.getElementsByClassName('focalhot-modal').length === 0) {
            document.body.appendChild(this.overlay);
            document.body.appendChild(this.modal);
        }
    };

    // 窗口居中
    Modal.prototype.center = function () {
        this.modal.style.width = this.settings.width + 'px';
        this.modal.style.height = this.settings.height + 'px';
        this.modal.style.left = (document.documentElement.clientWidth - this.modal.offsetWidth) / 2 + 'px';
        this.modal.style.top = (document.documentElement.clientHeight - this.modal.offsetHeight) / 2 + 'px';
    };

    // 关闭窗口
    Modal.prototype.close = function () {
        document.body.removeChild(this.overlay);
        document.body.removeChild(this.modal);
    };

    // 绑定事件
    function addHandler(element, type, handler) {
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }

    // 判断是否为移动设备
    function isMobile (agent) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    }

    // 处理IE7,8中不支持getElementsByClassName的情况
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function(search) {
            var d = document, elements, pattern, i, results = [];
            if (d.querySelectorAll) { // IE8
                return d.querySelectorAll("." + search);
            }
            if (d.evaluate) { // IE6, IE7
                pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
                elements = d.evaluate(pattern, d, null, 0, null);
                while ((i = elements.iterateNext())) {
                    results.push(i);
                }
            } else {
                elements = d.getElementsByTagName("*");
                pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
                for (i = 0; i < elements.length; i++) {
                    if ( pattern.test(elements[i].className) ) {
                        results.push(elements[i]);
                    }
                }
            }
            return results;
        }
    }
}());