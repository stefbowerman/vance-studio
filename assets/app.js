!function(t,i,r){window.Vance={},Vance.isTouch=function(){console.log("checking if touch");var t=navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i);return console.log(t),t},t(function(){i.svg||t('img[src*=".svg"]').remove();t(".article img").load(function(){var i=t(this).attr("src").replace(/_grande\.|_large\.|_medium\.|_small\./,"."),r=t(this).width();t(this).attr("src",i).attr("width",r).removeAttr("height")});t(".cart-table").on("focus",".cart-row__qty input",function(){var i=t(this),r=i.val();i.one("blur",function(n){r!=i.val()&&t('form[action="/cart"]').submit()})})})}(jQuery,Modernizr);