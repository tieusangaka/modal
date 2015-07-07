/**
 * Created by Warren Xia on 2015/7/3.
 * @website http://www.focalhot.com
 */
(function() {
    // 定义构造函数
    this.Modal = function (options) {
        this.settings = {
            width: 300,
            height: 300
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
        this.overlay = document.createElement('div');
        this.modal = document.createElement('div');
        this.overlay.className = 'focalhot-overlay';
        this.modal.className = 'focalhot-modal';
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);
        this.center();
        // 绑定事件
        addHandler(window,'resize',function () {
            that.center();
        });
        addHandler(that.overlay, isMobile(navigator.userAgent) ? 'touchstart' : 'click', function () {
            that.close();
        });
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
}());