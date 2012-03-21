/*
* Vinlinedit jQuery Plugin v1.0.0
*
* Copyright (c) 2012 Samuel ROZE
* Licensed under the GPLv3 license.
*
*/
(function($){
	$.fn.vinlinedit = function(options) {
		// Merge options with defaults
		var settings = jQuery.extend({
			// A prefix for content to edit
			// @var string
			prefix: '',
			
			// A callback before keypress processing
			// @var function(keypressEvent) which returns true if catch the event
			callback_pre_keypress: null,
			
			// A callback after keypress processing
			// @var function(keypressEvent)
			callback_post_keypress: null
		}, options);
		
		// For each element, add features.
		return this.each(function(){
			var span = $(this).attr('tabindex', '0').focus();
			var rcc_id = null;
			var initial_content = span.text();
			
			// Init required Async Queue to sync
			// the keyboard events.
			var queue = new AsyncQueue({name : 'keyboard-events'});
			
			// Toogle the cursor color.
			var initToggleCursorColor = function () {
				if (rcc_id != null) {
					clearInterval(rcc_id);
					$('span.cursor', span).addClass('selected');
				}
				rcc_id = setInterval(function(){
					$('span.cursor', span).toggleClass('selected');
				}, 650);
			};
			
			// Create all functions.
			var functions = {
				// Add clear function
				clear: function (content) {
					if (content == null || content == undefined) {
						content = initial_content;
					}
					
					span.html('<pre><span class="prefix">'+settings.prefix+'</span><span class="lp">'+content+'</span><span class="cursor"> </span><span class="ln"></span></pre>');
				},
				// Get content function
				getContent: function () {
					return $('span.lp', span).text() + $('span.cursor').text() + $('span.ln').text();
				}
			};
			
			// Store the function object as data of DOM element.
			$(this).data('vinlinedit', functions);
			
			// Add keyboard events
			span.keypress(function (e) {
				// Synchronous call of the event trigger
				queue.push({
					fn: function (e) {
						// Call the pre operating callback
						if (typeof settings.callback_pre_keypress == "function" && settings.callback_pre_keypress(e, span.data('vinlinedit'))) {
							return;
						}
						
						// Fetch actual values
						var lp_content = $('span.lp', span).text(), new_lp_content = lp_content,
							ln_content = $('span.ln', span).text(), new_ln_content = ln_content,
							cr_content = $('span.cursor', span).text(), new_cr_content = cr_content;
						
						switch (e.keyCode) {
						/**
						 * Navigation keys.
						 * 
						 */
						case 37: // Left key
							// If there isn't any content before, don't move
							if (lp_content == '') {
								return;
							}
							
							new_lp_content = lp_content.substring(0, lp_content.length-1);
							new_cr_content = lp_content.substring(lp_content.length-1, lp_content.length);
							new_ln_content = cr_content + ln_content;
							break;
						case 39: // Right key
							// If there isn't any content after, don't move
							if (ln_content == '') {
								return;
							}
							
							new_lp_content = lp_content + cr_content;
							new_cr_content = ln_content.substring(0, 1);
							new_ln_content = ln_content.substring(1);
							break;
						/**
						 * Content deletion keys.
						 * 
						 */
						case 8: // Return key
							if (lp_content == '') {
								return;
							}
							new_lp_content = lp_content.substring(0, lp_content.length-1);
							break;
						case 46: // Suppr key
							if (ln_content == '') {
								return;
							}
							new_cr_content = ln_content.substring(0, 1);
							new_ln_content = ln_content.substring(1);
							break;
						/**
						 * Content addition keys and other keys.
						 * 
						 */
						default:
							var appendString = '';
							if (e.which == null) {
								// old IE
								appendString = String.fromCharCode(e.keyCode);
							} else if (e.which != 0 && e.charCode != 0) {
								// All others
								appendString = String.fromCharCode(e.which);
							} else {
								// It's a special key
								// We doesn't have something to do.
							}
							
							new_lp_content += appendString;
							break;
							
						}
						
						// Update content
						$('span.lp', span).text(new_lp_content);
						$('span.ln', span).text(new_ln_content);
						$('span.cursor', span).text(new_cr_content);
						
						// Reset cursor color
						initToggleCursorColor();
						
						// Call the post operating callback
						if (typeof settings.callback_post_keypress == "function") {
							settings.callback_post_keypress(e, span.data('vinlinedit'));
						}
					},
			        args: [e]
				});
			});
			
			// Init the editor
			functions.clear(initial_content);
			initToggleCursorColor();
		});
	};
})(jQuery);
