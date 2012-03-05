/*
 * jQuery flexAccord Plugin 1.0
 * Copyright 2012, Cypress Interactive
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * Requires jQuery 1.4+
*/

/* 	
 * OPTIONS
 *
 * active_item_width: '400' - The width the item should be when hovered over.
 * easing: ['swing', 'swing'] - The easing methods that should be envoked on mouse over and mouse out. 
 * speed: [400, 400] - The speed that should be envoked on mouse over and mouse out.
 *
 * 	
 * METHODS
 *
 * duringMouseOver() - Run some custom JS during the mouse over
 * duringMouseOut() - Run some custom JS during the mouse out
*/

(function($){
	var flexAccord = function(element, options, callback) {
	    var element = $(element);
	    var obj = this;
		var opts = $.extend({}, $.fn.flexAccord.defaults, options);	
		
		// Private Function: __init()
		this.init = function() {
			
			opts.container_width 			= $(element).width();
			opts.item_amount 				= $(element).children().length;
			opts.item_width 				= opts.container_width / opts.item_amount;
			opts.active_item_width 			= opts.active_item_width;
			opts.active_width_others 		= (opts.container_width - opts.active_item_width) / (opts.item_amount-1);
			
			// Set initial width to each item
			$(element).children().width(opts.item_width);
			
			// Set event handlers
			$(element).children().hover(obj.itemMouseOver, obj.itemMouseOut);
			
		}
		
		this.itemMouseOver = function(event) {
			$(this).addClass('active');
			
			// Run any manual written functions during this time
			obj.duringMouseOver(opts);
						
			// Change width of all sibblings
			$(element).children().stop(true).animate({ width: opts.active_width_others }, opts.speed[0], opts.easing[0]);
			
			// Change width of active item
			$(this).stop(true).animate({ width: opts.active_item_width }, opts.speed[0], opts.easing[0]);
			
		}

		this.itemMouseOut = function(event) {
			$(this).removeClass('active');
			
			// Run any manual written functions during this time
			obj.duringMouseOut(opts);
			
			// Set all items back to default width
			$(element).children().stop(true).animate({ width: opts.item_width }, opts.speed[1], opts.easing[1]);
		}
		
		this.duringMouseOver = function() {
			return this;
		}	
		
		this.duringMouseOut = function() {
			return this;
		}
		
		this.destroy = function() {
			$(element).removeData('flexAccord');
			$(element).children().unbind();
			$(element).children().removeAttr('style');
		}
		
		this.init();				
			
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
	
	$.fn.flexAccord.defaults = {
		active_item_width: '400',
		easing: ['swing', 'swing'],
		speed: [400, 400]
	};		
	
})(jQuery);
