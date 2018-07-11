/*@Author Dinesh Kumar A
*
*/

(function ( $ ) {
  function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
      }
      return false;
  }
    $.fn.bindEvents = function(options) {
      var tapEnd = options.tap || function(){ };
      var parentElement = this;
      var touchMoved = false;
      var co_ordinates = { startX:0,startY:0 };
      var touchFeedBackClass = options.touchFeedBackClass || 'touch-feedback';
      this.on('touchstart',function(e){
        touchMoved = false;
        $(this).addClass(touchFeedBackClass);
        co_ordinates.startX = e.originalEvent.touches[0].pageX
        co_ordinates.startY = e.originalEvent.touches[0].pageY;
      });
      this.on('touchmove',function(e){
        var element = document.elementFromPoint(e.originalEvent.touches[0].pageX,e.originalEvent.touches[0].pageY);
            if(touchMoved || Math.abs(co_ordinates.startX - e.originalEvent.touches[0].pageX) > 10 || Math.abs(co_ordinates.startY-e.originalEvent. touches[0].pageY) > 10) {
              $(this).removeClass(touchFeedBackClass);
              touchMoved = true;
              return;
            }
              if(element == this || isDescendant(this,element)){
                $(this).addClass(touchFeedBackClass);
                touchMoved = false;
              } else {
                $(this).removeClass(touchFeedBackClass);
                touchMoved = true;
            }
      });
      this.on('touchend',function(e){
        $(this).removeClass(touchFeedBackClass);
        if (touchMoved) {
              return;
          }
          tapEnd.apply(this);
      });
      return this;
    }
}( jQuery ));