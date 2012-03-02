(function($){
	var flexAccord = function(element, options, callback) {
	    var element = $(element);
	    var obj = this;
		var opts = $.extend({}, $.fn.flexAccord.defaults, options);	
		
		// Private Function: __init()
		var __init = function() {
			
			obj.container_width 			= $(element).width();
			obj.item_amount 				= $(element).children().length;
			obj.item_width 					= obj.container_width / obj.item_amount;
			obj.active_item_width 			= opts.active_item_width;
			obj.active_item_width_others 	= (obj.container_width - obj.active_item_width) / (obj.item_amount-1);
			obj.speed 						= opts.speed;
			obj.easing 						= opts.easing;
			
			// Set initial width to each item
			$(element).children().width(obj.item_width);
			
			// Set event handlers
			$(element).children().hover(obj.itemMouseOver, obj.itemMouseOut);
			
		}
		
		this.itemMouseOver = function(event) {
			$(this).addClass('active');
			
			// Change width of all sibblings
			$(element).children().stop(true, false).animate({ width: obj.active_item_width_others }, obj.speed[0], obj.easing[0]);
			
			// Change width of active item
			$(this).stop(true, false).animate({ width: obj.active_item_width }, obj.speed[0], obj.easing[0]);
			
		}

		this.itemMouseOut = function(event) {
			$(this).removeClass('active');
			
			// Set all items back to default width
			$(element).children().stop(true, false).animate({ width: obj.item_width }, obj.speed[1], obj.easing[1]);
		}
		__init();				
			
	};
	
	
	$.fn.flexAccord = function(options, callback) {
	    this.each(function() {
	        var element = $(this);

	        // Return early if this element already has a plugin instance
	        if (element.data('flexAccord')) return;

	        var flexAccord_obj = new flexAccord(element, options, callback);

	        // Store plugin object in this element's data
	        element.data('flexAccord', flexAccord_obj);
						
	    });	
		
		return this.data('flexAccord');
	};	
			
})(jQuery);
