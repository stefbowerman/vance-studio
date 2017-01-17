/* jshint ignore:start */

/*!
  Zoom 1.7.18
  license: MIT
  http://www.jacklmoore.com/zoom
*/
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,a,r,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(r=c,a=u):(r=d.outerWidth(),a=d.outerHeight()),m=(e.width-c)/r,l=(e.height-u)/a,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,a),0),t=Math.max(Math.min(t,r),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),a=document.createElement("img"),r=o(a),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,a.onload=null,r.remove()}.bind(this,i.style.position,i.style.overflow)),a.onload=function(){function t(t){f.init(),f.move(t),r.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(a):!1)}function n(){r.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(a):!1)}var f=o.zoom(i,u,a,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(a)},a.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);

/* jshint ignore:end */

// Start Product Page
;(function($, Modernizr, undefined){
  
  var KEY_LEFT  = 37;
  var KEY_RIGHT = 39;

  var $productPhotoMain = $('.product-photo__main');
  var $productThumbs = $('.product-photo-thumbs');
  var $productThumb = $('.product-photo-thumb');

  function enableHoverZoom(){

    $productPhotoMain.zoom({
      url: $productPhotoMain.find('a').attr('href'),
      magnify: 0.8,
      on: 'click',
      duration: 100,
      touch: false,
      callback: function(){
        $productPhotoMain.addClass('is-zoomable'); // Let the dom know that zoom is enabled
      },
      onZoomIn: function(){
        $productPhotoMain.addClass('is-zoomed');
      },
      onZoomOut: function(){
        $productPhotoMain.removeClass('is-zoomed');
      }
    });
  }

  function disableHoverZoom(){
    $productPhotoMain.trigger('zoom.destroy');
  }

  function enableTouchZoom(){
    // Do iScroll tap panned scrolling for touch devices
  }

  $(function(){

    $productThumb.on('click', function(e){
      e.preventDefault();

      var $thumb = $(this);
      var $thumbLink = $thumb.find('a');
      var srcRegular = $thumbLink.attr('href');
      var srcFullSize = $thumbLink.attr('data-fs');

      var $link = $productPhotoMain.find('a');
      var $img  = $productPhotoMain.find('img');

      disableHoverZoom();

      $link.attr('href', srcFullSize);
      $img.attr('src', srcRegular);

      enableHoverZoom();
      
    });

    if(!Modernizr.touchevents) {
      enableHoverZoom();
    }
    else {
      enableTouchZoom();
    }

  });

})(jQuery, Modernizr);