define("tips-simple/1.0.0/tips-simple", [ "jquery/1.10.2/jquery-1.10.2.cmd" ], function(require, exports, module) {
    var $ = require("jquery/1.10.2/jquery-1.10.2.cmd");
    var tips = function(el, options) {
        var options = $.extend({
            msg: "",
            // prompt message
            position: "right",
            //the position tips wrapper relate the  text input , the value must is the one of (top, right, bottom, left), the default value is left
            vernier: "",
            // setting position on the basis of  default setting
            closeAble: true,
            //if show the button on close. default show
            tipsTimeout: "infinite",
            //tips auto hide delay time
            left: 0,
            top: 0,
            width: 200
        }, options || {});
        var tmpl = '<div style="width:' + options.width + 'px;" class="tips-simple-box">' + '<div nam="arrow" class="arrow-${ arrow-position }">&nbsp;</div>' + (options.closeAble ? '<div name="close" class="close-${ close-position }">&nbsp;</div>' : "") + '<div name="content" class="tips-content">${ msg }</div>' + "</div>", timer = null;
        /**
      format string using the Object or JSON
      
      @method format 
      @param {String} txt the formated string
      @param {Object | JSON} data use for formating
      @return {String} txt
      */
        var format = function(txt, data) {
            var pattern = null;
            $.each(data, function(key, value) {
                txt = txt.replace(new RegExp("\\${\\s*" + key + "\\s*}", "g"), value);
            });
            return txt;
        };
        /**
      build the tips wraper
      
      @method build 
      
      
      */
        var build = function() {
            var data = {};
            data["arrow-position"] = options.position;
            data["msg"] = options.msg;
            if (options.position == "left") {
                data["close-position"] = "left";
            } else {
                data["close-position"] = "right";
            }
            tmpl = $(format(tmpl, data));
            this.panel = tmpl;
        };
        /**
      bind event to wraper
      
      @method attachEvents 
      */
        var attachEvents = function() {
            var self = this;
            if (options.closeAble) {
                this.panel.find(":nth-child(2)").click(function() {
                    self.destroy();
                });
            }
        };
        var setPosition = function() {
            var offset = $(el).offset();
            var cssObj = {};
            console.log(offset);
            console.log(this.panel.outerWidth());
            console.log(this.panel.outerHeight());
            switch (options.position) {
              case "top":
                cssObj.left = offset.left + options.left;
                cssObj.top = offset.top - (this.panel.outerHeight() + 7) + options.top;
                break;

              case "bottom":
                cssObj.left = offset.left + options.left;
                cssObj.top = offset.top + ($(el).outerHeight() + 7) + options.top;
                break;

              case "left":
                cssObj.left = offset.left - (this.panel.outerWidth() + 7) + options.left;
                cssObj.top = offset.top - 16 + $(el).outerHeight() / 2 + options.top;
                break;

              case "right":
                cssObj.left = offset.left + ($(el).outerWidth() + 7) + options.left;
                cssObj.top = offset.top - 16 + $(el).outerHeight() / 2 + options.top;
                break;
            }
            this.panel.css(cssObj);
            return this;
        };
        // init
        build.call(this, options);
        attachEvents.call(this);
        $("body").append(tmpl);
        setPosition.call(this);
        if (options.tipsTimeout != "infinite") {
            ~function(self) {
                timer = setTimeout(function() {
                    self.destroy();
                }, options.tipsTimeout);
            }(this);
        }
    };
    var proto = tips.prototype;
    proto.destroy = function() {
        this.panel.remove();
        delete this.panel;
    };
    var tipsSimple = function(el, options) {
        return new tips(el, options);
    };
    module.exports = tipsSimple;
});