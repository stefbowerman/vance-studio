/* jshint ignore:start */

/*! fastclick.js */
!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;u>s;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n?!0:!1},t.prototype.onTouchMove=function(t){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return o&&!i&&(s=l.fastClickScrollParent,s&&s.fastClickLastScrollTop!==s.scrollTop)?!0:(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return this.targetElement?t.forwardedTouchEvent?!0:t.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1):!0:!0},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail?!0:(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction?!0:(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===t.style.touchAction||"manipulation"===t.style.touchAction?!0:!1)},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/* 
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 */
+function(t){"use strict";function e(e,i){return this.each(function(){var s=t(this),n=s.data("bs.modal"),a=t.extend({},o.DEFAULTS,s.data(),"object"==typeof e&&e);n||s.data("bs.modal",n=new o(this,a)),"string"==typeof e?n[e](i):a.show&&n.show(i)})}var o=function(e,o){this.options=o,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};o.VERSION="3.3.7",o.TRANSITION_DURATION=300,o.BACKDROP_TRANSITION_DURATION=150,o.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},o.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},o.prototype.show=function(e){var i=this,s=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(s),this.isShown||s.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){i.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(i.$element)&&(i.ignoreBackdropClick=!0)})}),this.backdrop(function(){var s=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),i.adjustDialog(),s&&i.$element[0].offsetWidth,i.$element.addClass("in"),i.enforceFocus();var n=t.Event("shown.bs.modal",{relatedTarget:e});s?i.$dialog.one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(n)}).emulateTransitionEnd(o.TRANSITION_DURATION):i.$element.trigger("focus").trigger(n)}))},o.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(o.TRANSITION_DURATION):this.hideModal())},o.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},o.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},o.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},o.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},o.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},o.prototype.backdrop=function(e){var i=this,s=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&s;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+s).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;n?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},o.prototype.handleUpdate=function(){this.adjustDialog()},o.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},o.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},o.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},o.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},o.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},o.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var i=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=o,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(o){var i=t(this),s=i.attr("href"),n=t(i.attr("data-target")||s&&s.replace(/.*(?=#[^\s]+$)/,"")),a=n.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(s)&&s},n.data(),i.data());i.is("a")&&o.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),e.call(n,a,this)})}(jQuery);

/*!
 * JavaScript Cookie v2.0.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
!function(e){if("function"==typeof define&&define.amd)define(e);else if("object"==typeof exports)module.exports=e();else{var n=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=n,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var t=arguments[e];for(var o in t)n[o]=t[o]}return n}function n(t){function o(n,r,i){var c;if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var s=new Date;s.setMilliseconds(s.getMilliseconds()+864e5*i.expires),i.expires=s}try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(a){}return r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=encodeURIComponent(String(n)),n=n.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),n=n.replace(/[\(\)]/g,escape),document.cookie=[n,"=",r,i.expires&&"; expires="+i.expires.toUTCString(),i.path&&"; path="+i.path,i.domain&&"; domain="+i.domain,i.secure?"; secure":""].join("")}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],u=/(%[0-9A-Z]{2})+/g,d=0;d<p.length;d++){var f=p[d].split("="),l=f[0].replace(u,decodeURIComponent),m=f.slice(1).join("=");'"'===m.charAt(0)&&(m=m.slice(1,-1));try{if(m=t&&t(m,l)||m.replace(u,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(a){}if(n===l){c=m;break}n||(c[l]=m)}catch(a){}}return c}return o.get=o.set=o,o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(n,t){o(n,"",e(t,{expires:-1}))},o.withConverter=n,o}return n()});


/* jshint ignore:end */

;(function($, Modernizr, FastClick, Cookies, undefined){

  // Global Namespace
  window.Vance = {};

  Vance.isTouch = function(){
    return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || Modernizr.touchevents;
  };

  Vance.isMobile = function(){
    return /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
  };

  Vance.isRetina = function(){
    return window.hasOwnProperty('devicePixelRatio') && window.devicePixelRatio >= 1.5;
  };

  Vance.isThemeEditor = function(){
    return location.href.match(/myshopify.com/) && location.href.match(/theme_id/);
  };

  // Contains cookies and logic stuff pertaining to the current user.
  // Mostly used for checking how many times they've visited the site, if they've subscribed to the newsletter, etc..
  Vance.User = {
    firstPageOfVisit: false,
    cookies: {
      emailCollected : {
        name : 'vance-email-collected',
        value : "true",
        expiration : 365 * 10 // Really far into the future
      },
      // Not quite sure if we need to use this cookie?
      subscribeModalSeenDuringSession : {
        name : "vance-subscribe-modal-seen-during-session",
        value : "true"
        // Expires when the session is over
      },
      subscribeModalSeen : {
        name : "vance-subscribe-modal-seen",
        value : "true",
        expiration : 7 // 1 week, adjust as needed
      },
      session : {
        name : "vance-session",
        value : "true"
        // Expires when the session is over
      },
      visits : {
        name : "vance-visits",
        value : 1,
        expiration : 365 * 10 // Really far into the future
      },
    },
    // Removes any cookie already present with the same name.
    setCookie: function(cookie){
      
      if(this.hasCookie(cookie)){
        this.removeCookie(cookie);
      }

      var opts = cookie.hasOwnProperty('expiration') ? { expires : cookie.expiration } : {};
      Cookies.set( cookie.name, cookie.value, opts);

      return this;
    },
    hasCookie: function(cookie){
      return typeof Cookies.get(cookie.name) !== "undefined";
    },
    getCookie: function(cookie){
      return Cookies.get( cookie.name );
    },
    removeCookie: function(cookie){
      Cookies.remove( cookie.name );
      return this;
    },
    logic: {
      emailHasBeenCollected : function(){
        return Vance.User.hasCookie( Vance.User.cookies.emailCollected );
      },
      userFirstPageOfVisit : function(){
        return Vance.User.firstPageOfVisit;
      },
      userFirstVisit : function(){ 
        // They don't have a visits cookie yet, or they do and the value is 1
        return (!Vance.User.hasCookie( Vance.User.cookies.visits ) || parseInt(Vance.User.getCookie( Vance.User.cookies.visits )) === 1);
      },
      userSecondVisit : function(){
        var kookie = Vance.User.getCookie( Vance.User.cookies.visits );
        return (kookie && parseInt(kookie) === 2);
      },
      subscribeModalSeenDuringSession : function(){
        return Vance.User.hasCookie( Vance.User.cookies.subscribeModalSeenDuringSession );
      },
      subscribeModalSeenHasExpired : function(){
        return !Vance.User.hasCookie( Vance.User.cookies.subscribeModalSeen );
      }
    },
    init: function(){
      // Set session cookie if they don't already have one
      var c = this.cookies.session;
      if(!this.hasCookie( c )){

        this.setCookie( c );
        this.firstPageOfVisit = true;

        // If this is a new session (if we're inside this block)
        // lets update the visits cookie to reflect the new visit
        
        var visitsCookie = this.cookies.visits;
        
        if( this.hasCookie(visitsCookie) ){ // If they have the cookie
          visitsCookie = jQuery.extend({}, visitsCookie); // Make a copy
          visitsCookie.value = parseInt(visitsCookie.value) + 1; // Increment the visits value
        }

        this.setCookie(visitsCookie);
      }
    }
  };

  Vance.sectionManager = function(){
    this.constructors = {};
    this.instances = [];

    $(document)
      .on('shopify:section:load',     this._onSectionLoad.bind(this))
      .on('shopify:section:unload',   this._onSectionUnload.bind(this))
      .on('shopify:section:select',   this._onSelect.bind(this))
      .on('shopify:section:deselect', this._onDeselect.bind(this))
      .on('shopify:block:select',     this._onBlockSelect.bind(this))
      .on('shopify:block:deselect',   this._onBlockDeselect.bind(this));
  };

  Vance.sectionManager.prototype = {
    _createInstance: function(container, constructor) {
      var $container = $(container);
      var id         = $container.attr('data-section-id');
      var type       = $container.attr('data-section-type');

      constructor = constructor || this.constructors[type];

      if (constructor === undefined) {
        return;
      }

      var instance = new constructor(container);

      instance.id        = id;
      instance.type      = type;
      instance.container = container;

      this.instances.push(instance);
    },

    _getInstanceById: function(id){
  
      for (var i = this.instances.length - 1; i >= 0; i--) {
        var instance = this.instances[i];
        if(instance.id === id){
          return instance;
        }
      }

    },

    _onSectionLoad: function(evt) {
      var container = $('[data-section-id]', evt.target)[0];
      if (container) {
        this._createInstance(container);
      }
    },

    _onSectionUnload: function(evt) {

      for (var i = this.instances.length - 1; i >= 0; i--) {
        var instance = this.instances[i];

        if(instance.id === evt.detail.sectionId){
          if(typeof instance.onUnload == "function"){
            instance.onUnload(evt);
          }

          this.instances.splice(i, 1); // remove the instance from our cache
        }
      }

    },

    _onSelect: function(evt) {
      var instance = this._getInstanceById(evt.detail.sectionId);

      if (instance !== undefined && typeof instance.onSelect == "function") {
        instance.onSelect(evt);
      }
    },

    _onDeselect: function(evt) {
      var instance = this._getInstanceById(evt.detail.sectionId);

      if (instance !== undefined && typeof instance.onDeselect == "function") {
        instance.onDeselect(evt);
      }
    },

    _onBlockSelect: function(evt) {
      var instance = this._getInstanceById(evt.detail.sectionId);

      if (instance !== undefined && typeof instance.onBlockSelect == "function") {
        instance.onBlockSelect(evt);
      }
    },

    _onBlockDeselect: function(evt) {
      var instance = this._getInstanceById(evt.detail.sectionId);

      if (instance !== undefined && typeof instance.onBlockDeselect == "function") {
        instance.onBlockDeselect(evt);
      }
    },

    register: function(type, constructor) {
      this.constructors[type] = constructor;

      $('[data-section-type=' + type + ']').each(function(index, container) {
        this._createInstance(container, constructor);
      }.bind(this));
    }
  };

  Vance.AjaxChimp = function($form, options){

    if($form.length === 0){
      return false;
    }

    var _this = this;
    var defaults = {
      onInit:       $.noop,
      onBeforeSend: $.noop,
      onSubmitDone: $.noop,
      onSubmitFail: $.noop
    };

    this.$form    = $form;
    this.$input   = this.$form.find('input[type="email"]');
    this.$submit  = this.$form.find('[type="submit"]');
    this.settings = $.extend({}, defaults, options);

    this.$form.on('submit', this.handleOnSubmit.bind(_this));
    this.$input.on('focus', function(){
      $(this).parents('.form-group').removeClass('has-error');
    });

    this.settings.onInit();

    return this;
  };

  Vance.AjaxChimp.prototype = {
    regexes: {
      error: {
        1: /Please enter a value/,
        2: /An email address must contain a single @/,
        3: /The domain portion of the email address is invalid \(the portion after the @: (.+)\)/,
        4: /The username portion of the email address is invalid \(the portion before the @: (.+)\)/,
        5: /This email address looks fake or invalid. Please enter a real email address/,
        6: /.+\#6592.+/,
        7: /(.+@.+) is already subscribed to list (.+)\..+<a href.+/
      }
    },
    responses: {
      success: 'Thank you for subscribing!',
      error: {
        1: 'Please enter an email address',
        2: 'There was a problem with your entry. Please check the address and try again.',
        3: 'There was a problem with your entry. Please check the address and try again.',
        4: 'There was a problem with your entry. Please check the address and try again.',
        5: 'There was a problem with your entry. Please check the address and try again.',
        6: 'Too many subscribe attempts for this email address. Please try again in about 5 minutes.',
        7: 'You\'re already subscribed. Thank you!'
      }
    },
    getRegexMatch : function(string, stringKey){
      var regexPatterns = this.regexes[stringKey];
      var matchedId;
      $.each(regexPatterns, function(id, regexPattern) {
        if (string.match(regexPattern) !== null){
          matchedId = id;
          return false;
        }
      });
      return matchedId;
    },
    getMessageForResponse : function(response){
      var msg;
      if(response.result === 'success') {
        msg = this.responses.success;
      } 
      else {
        var index = -1;
        try {
          var parts = response.msg.split(' - ', 2);
          if (parts[1] === undefined) {
            msg = response.msg;
          } else {
            msg = parts[1];
          }
        }
        catch (e) {
          msg = response.msg;
        }

        // Now that we have the relevant part of the message, lets get the actual string for it
        var regexPattern = this.regexes.error;
        var matchedId = this.getRegexMatch(msg, 'error');
        if(matchedId && regexPattern[matchedId] && this.responses.error[matchedId]){
          return msg.replace(regexPattern[matchedId], this.responses.error[matchedId]);
        }
      }

      return msg;
    },
    destroy: function(){
      this.$form.off('submit');
      this.$input.off('focus');
    },
    onBeforeSend : function(){
      this.settings.onBeforeSend();
      if(this.$input.val() && this.$input.val().length){
        this.$submit.prop('disabled', true);
        return true;
      }
      else {
        this.$input.parents('.form-group').addClass('has-error');
      }
      return false;
    },
    onSubmitDone : function(response){
      var success = response.result === 'success';
      var rspMsg  = this.getMessageForResponse(response);

      if(success){
        // Set cookie that they've seen submitted their email
        Vance.User.setCookie(Vance.User.cookies.emailCollected);
      }

      this.$submit.prop('disabled', false);
      this.settings.onSubmitDone(success, rspMsg);
    },
    onSubmitFail : function($form){
      this.settings.onSubmitFail();
    },
    handleOnSubmit: function(e){
      e.preventDefault();
      var _this = this;
      var $form = this.$form;
      var data = {};
      var dataArray = $form.serializeArray();
      
      // See - https://github.com/scdoshi/jquery-ajaxchimp/blob/master/jquery.ajaxchimp.js
      $.each(dataArray, function(index, item) {
        data[item.name] = item.value;
      });
      
      $.ajax({
        url: $form.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
        dataType: 'jsonp',
        data: data,
        beforeSend: _this.onBeforeSend.bind(_this)
      })
      .done( function(response){
        _this.onSubmitDone(response);
      })
      .fail( function(){
        _this.onSubmitFail();
      });

      return false;
    }
  };

  Vance.emailSignup = {
    $form          : $('form.mc-ajax-form'),
    $input         : $('form.mc-ajax-form').find('input[type="email"]'),
    $modal         : $('#modal-newsletter-subscribe'),
    $modalSuccess  : $('.modal-newsletter-success'),
    $modalError    : $('.modal-newsletter-error'),
    $modalErrorMsg : $('.modal-newsletter-error__message'),
    onSubmitDone: function(success, message){
      if(success){
        this.$input.val('');
        this.$modalSuccess.show();
        this.$modalError.hide();
      } else {
        this.$modalErrorMsg.empty().html(message);
        this.$modalSuccess.hide();
        this.$modalError.show();
      }

      this.$modal.modal('show');
    },
    init: function(){

      if(this.$form.length === 0){
        return false;
      }

      this.$input.on('focus', function(){
        $(this).parents('.form-group').removeClass('has-error');
      }.bind(this));

      // Add some AJAX
      this.ajaxForm = new Vance.AjaxChimp(this.$form, {
        onSubmitDone: this.onSubmitDone.bind(this)
      });

      return this;
    }
  };

  Vance.sections = {};

  Vance.sections.ModalSubscribe = function(section){
    this.$section  = $(section);

    this.$form     = this.$section.find('form');
    this.$input    = this.$form.find('input[type="email"]');
    this.$modal    = this.$section.find('.modal');
    this.$response = this.$section.find('.response-message');

    this.$modal.on('show.bs.modal',   this.onShow.bind(this))
               .on('shown.bs.modal',  this.onShown.bind(this))
               .on('hidden.bs.modal', this.onHidden.bind(this));

    this.$input.on('focus', function(){
      this.$response.hide();
    }.bind(this));

    // Add some AJAX
    this.ajaxForm = new Vance.AjaxChimp(this.$form, {
      onSubmitDone: this.onSubmitDone.bind(this)
    });

    if(this.shouldShow()){
      setTimeout(function(){
        this.$modal.modal('show');  
      }.bind(this), 2000);      
    }

  };
  
  Vance.sections.ModalSubscribe.prototype = {
    onSubmitDone: function(success, message){
      this.$response.html(message).show();
      if(success){
        this.$input.val('');
        setTimeout(function(){
          this.$modal.modal('hide');
        }.bind(this), 2000);
      }
    },
    shouldShow: function(){
      // Don't show it by default if we're inside the theme editor
      // let it popup when the section is selected
      if(Vance.isThemeEditor()){
        return false;
      }

      // Don't show the popup if it isn't enabled
      if(!this.$section.data('enabled')){
        return false;
      }
  
      if(Vance.User.logic.emailHasBeenCollected()){
        return false;
      }

      if(Vance.User.logic.userFirstPageOfVisit() && (Vance.User.logic.userFirstVisit() || Vance.User.logic.userSecondVisit())){
        return true;
      }

      if(Vance.User.logic.subscribeModalSeenHasExpired()){
        return true;
      }

      // Default is to not show it
      return false;

    },
    onShow: function(){
      if(!Vance.isThemeEditor()){
        Vance.User.setCookie(Vance.User.cookies.subscribeModalSeen);
        Vance.User.setCookie(Vance.User.cookies.subscribeModalSeenDuringSession);
      }
    },
    onShown: function(){
      this.$input.first().focus();
    },
    onHidden: function(){
      this.$response.empty().hide();
    },
    // Theme editor events below
    onSelect: function(){
      if(this.$section.data('enabled')){
        this.$modal.modal('show');
      }
    },
    onDeselect: function(){
      this.$modal.modal('hide');
    },
    onLoad: function(){},
    onUnload: function() {
      this.$modal.modal('hide');
      this.ajaxForm.destroy();
    }
  };

  $(function(){

    /* Remove SVG images to avoid broken images in all browsers that don't support SVG. */
    /*==========================*/
    if (!Modernizr.svg) {
      $('img[src*=".svg"]').remove();
    }

    if(Vance.isMobile) {
      FastClick.attach(document.body);
    }

    Vance.User.init();

    // Generic email signup form (see sections/page-about-template.liquid)
    Vance.emailSignup.init();

    var sectionManager = new Vance.sectionManager();
        sectionManager.register('modal-subscribe-section', Vance.sections.ModalSubscribe);
    
    /* Prepare to have floated images fill the width of the design on blog pages on small devices. */
    /*==========================*/ 
    var images = $('.article img').load(function() {
      var src = $(this).attr('src').replace(/_grande\.|_large\.|_medium\.|_small\./, '.');
      var width = $(this).width();
      $(this).attr('src', src).attr('width', width).removeAttr('height');
    });

    /* Mobile menu toggle K.I.S.S */
    /*==========================*/ 
    $('.header-nav-mobile__toggle').on('click', function(){
      $('.header-nav-mobile').toggleClass('is-open');
      return false;
    });

    /* Update cart page on blur of quantity input only if the quantity gets changed */
    /*==========================*/ 
    $('.cart-table').on('focus', '.cart-row__qty input', function(){
      var $this = $(this);
      var ogQty = $this.val();

      $this.one('blur', function(event) {
        if(ogQty != $this.val()){
          $('form[action="/cart"]').submit();  
        }
      });
    });

    /* Remove Banner video if we have a touch device and it's a small screen */
    var $bannerVideo = $('.banner-video-wrapper');
    if($bannerVideo.length && Vance.isMobile() && Vance.isTouch()){
      $bannerVideo.remove();
    }

  });

})(jQuery, Modernizr, FastClick, Cookies);