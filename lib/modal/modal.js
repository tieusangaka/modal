/**
 * Created by Warren Xia on 2015/7/3.
 * @website http://www.focalhot.com
 */
(function() {
    // 定义构造函数
    this.Modal = function (options) {
        this.settings = {
            title: null,
            width: 400,
            height: 300,
            html: null,
            src: null,
            okValue: null,
            okBefore: null,
            okAfter: null,
            cancelValue: null,
            cancelBefore: null,
            cancelAfter: null
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

        // 绑定resize事件
        addHandler(window,'resize',function () {
            that.center();
        });

        // 点击遮罩层
        addHandler(that.overlay, isMobile(navigator.userAgent) ? 'touchstart' : 'click', function () {
            that.close();
        });

        // 点击关闭按钮
        if (that.settings.title) {
            addHandler(document.getElementsByClassName('focalhot-modal-close')[0], isMobile(navigator.userAgent) ? 'touchstart' : 'click', function () {
                that.close();
            });
        }

        // 点击确定按钮
        if (that.settings.okValue) {
            addHandler(document.getElementsByClassName('focalhot-modal-ok')[0], isMobile(navigator.userAgent) ? 'touchstart' : 'click', function () {
                if (typeof that.settings.okBefore === 'function') {
                    that.settings.okBefore.call(this);
                }
                that.close();
                if (typeof that.settings.okAfter === 'function') {
                    that.settings.okAfter.call(this);
                }
            });
        }

        // 点击取消按钮
        if (that.settings.cancelValue) {
            addHandler(document.getElementsByClassName('focalhot-modal-cancel')[0], isMobile(navigator.userAgent) ? 'touchstart':'click', function () {
                if (typeof that.settings.cancelBefore === 'function') {
                    that.settings.cancelBefore.call(this);
                }
                that.close();
                if (typeof that.settings.cancelAfter === 'function') {
                    that.settings.cancelAfter.call(this);
                }
            })
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
            iframe.width = '100%';
            iframe.height = (that.settings.height - 100) + 'px';
            iframe.src = that.settings.src;
            that.modal.appendChild(iframe);
        }

        // 如果设置了OK或者Cancel
        if (that.settings.okValue || that.settings.cancelValue) {
            var footer = document.createElement('div');
            footer.className = 'focalhot-modal-footer';

            if (that.settings.okValue) {
                var ok = document.createElement('button');
                ok.setAttribute('type','button');
                ok.className = 'focalhot-modal-ok';
                ok.innerHTML = that.settings.okValue;
                footer.appendChild(ok);
            }

            if (that.settings.cancelValue) {
                var cancel = document.createElement('button');
                cancel.setAttribute('type','button');
                cancel.className = 'focalhot-modal-cancel';
                cancel.innerHTML = that.settings.cancelValue;
                footer.appendChild(cancel);
            }
            that.modal.appendChild(footer);
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