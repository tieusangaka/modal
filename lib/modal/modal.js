/**
 * Created by Warren Xia on 2015/7/3.
 * @website http://www.focalhot.com
 */
function Modal() {
    this.settings = {
        width: 300,
        height: 300
    };
    this.overlay = null;
    this.modal = null;
}

// 初始化
Modal.prototype.init = function(options) {
    var _this = this;
    for(var key in options) {
        if(options.hasOwnProperty(key)) {
            _this.settings[key] = options[key];
        }
    }
    _this.open();
}

// 弹出窗口
Modal.prototype.open = function() {
    var _this = this;
    _this.overlay = document.createElement('div');
    _this.modal = document.createElement('div');
    _this.overlay.className = 'focalhot-overlay';
    _this.modal.className = 'focalhot-modal';
    document.body.appendChild(_this.overlay);
    document.body.appendChild(_this.modal);
    _this.center();
    // 绑定事件
    _this.addHandler(window,'resize',function() {
        _this.center();
    });
    _this.addHandler(_this.overlay,'click',function() {
        _this.close();
    });
}

// 窗口居中
Modal.prototype.center = function() {
    var _this = this;
    _this.modal.style.width = _this.settings.width + 'px';
    _this.modal.style.height = _this.settings.height + 'px';
    _this.modal.style.left = (document.documentElement.clientWidth - _this.modal.offsetWidth) / 2 + 'px';
    _this.modal.style.top = (document.documentElement.clientHeight - _this.modal.offsetHeight) / 2 + 'px';
}

// 关闭窗口
Modal.prototype.close = function() {
    var _this = this;
    document.body.removeChild(_this.overlay);
    document.body.removeChild(_this.modal);
    this.overlay = null;
    this.modal = null;
}

// 绑定事件
Modal.prototype.addHandler = function(element, type, handler) {
    if (element.addEventListener){
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent){
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}