// fancy text feature, props to typed.js because i am too much of a newbie to have done this all by myself //

!function($){

	"use strict";

	var Typed = function(el, options){

		// chosen element to manipulate text
		this.el = $(el);
		// options
		this.options = $.extend({}, $.fn.typed.defaults, options);

		// text content of element
		this.text = this.el.text();

		// typing speed
		this.typeSpeed = this.options.typeSpeed;
		
		// add a delay before typing starts
		this.startDelay = this.options.startDelay;

		// amount of time to wait before backspacing
		this.backDelay = this.options.backDelay;

		// input strings of text
		this.strings = this.options.strings;

		// character number position of current string
		this.strPos = 0;

		// current array position
		this.arrayPos = 0;

		// current string based on current values[] array position
		this.string = this.strings[this.arrayPos];

		// number to stop backspacing on.
		// default 0, can change depending on how many chars
		// you want to remove at the time
		this.stopNum = 0;

		// Looping logic
		this.loop = this.options.loop;
		this.loopCount = this.options.loopCount;
		this.curLoop = 1;
		if (this.loop === false){
			// number in which to stop going through array
			// set to strings[] array (length - 1) to stop deleting after last string is typed
			this.stopArray = this.strings.length-1;
		}
		else{
			this.stopArray = this.strings.length;
		}

		
		this.build();
	}

		Typed.prototype =  {

			constructor: Typed

			, init: function(){
				// begin the loop w/ first current string (global self.string)
				// current string will be passed as an argument each time after this
				var self  = this;
			  	setTimeout(function() {
			  		// Start typing
					self.typewrite(self.string, self.strPos)
			  	}, self.startDelay);
			}

			, build: function(){
				// Insert cursor
				this.el.after("<span id=\"typed-cursor\">|</span>");
				this.init();
			}

			// pass current string state to each function
			, typewrite: function(curString, curStrPos){

				// varying values for setTimeout during typing
				// can't be global since number changes each time loop is executed
				var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
				var self = this;

				// ------------- optional ------------- //
				// backpaces a certain string faster
				// ------------------------------------ //
				// if (self.arrayPos == 1){
				// 	self.backDelay = 50;
				// }
				// else{ self.backDelay = 500; }

				// containg entire typing function in a timeout
				setTimeout(function() {

					// make sure array position is less than array length
					if (self.arrayPos < self.strings.length){

						// start typing each new char into existing string
						// curString is function arg
						self.el.text(self.text + curString.substr(0, curStrPos));

						// check if current character number is the string's length
						// and if the current array position is less than the stopping point
						// if so, backspace after backDelay setting
						if (curStrPos > curString.length && self.arrayPos < self.stopArray){
							clearTimeout(clear);
							var clear = setTimeout(function(){
								self.backspace(curString, curStrPos);
							}, self.backDelay);
						}

						// else, keep typing
						else{
							// add characters one by one
							curStrPos++;
							// loop the function
							self.typewrite(curString, curStrPos);
							// if the array position is at the stopping position
							// finish code, on to next task
							if (self.loop === false){
								if (self.arrayPos === self.stopArray && curStrPos === curString.length){
									// animation that occurs on the last typed string
									// fires callback function
									var clear = self.options.callback();
									clearTimeout(clear);
								}
							}
						}
					}
					// if the array position is greater than array length
					// and looping is active, reset array pos and start over.
					else if (self.loop === true && self.loopCount === false){
						self.arrayPos = 0;
						self.init();
					}
						else if(self.loopCount !== false && self.curLoop < self.loopCount){
							self.arrayPos = 0;
							self.curLoop = self.curLoop+1;
							self.init();
						}

				// humanized value for typing
				}, humanize);

			}

			, backspace: function(curString, curStrPos){

				var self = this;
                
                self.el.fadeOut(function(){
                    self.el.text("");
                });
                

				setTimeout(function() {

                    curStrPos = 0;
                    self.el.fadeIn();
					
					if (curStrPos <= self.stopNum){
						clearTimeout(clear);
						var clear = self.arrayPos = self.arrayPos+1;
						
						self.typewrite(self.strings[self.arrayPos], curStrPos);
					}

				}, 1000);

			}

		}

	$.fn.typed = function (option) {
	    return this.each(function () {
	      var $this = $(this)
	        , data = $this.data('typed')
	        , options = typeof option == 'object' && option
	      if (!data) $this.data('typed', (data = new Typed(this, options)))
	      if (typeof option == 'string') data[option]()
	    });
	}

	$.fn.typed.defaults = {
		strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
		// typing and backspacing speed
		typeSpeed: 0,
		// time before typing starts
		startDelay: 0,
		// time before backspacing
		backDelay: 1000,
		// loop
		loop: false,
		// false = infinite
		loopCount: false,
		// ending callback function
		callback: function(){ null }
	}


}(window.jQuery);

$(function(){
        $(".element").typed({
        strings: ["All your social media profiles in one place", "No need to add friends on separate platforms", "Accessibility and convenience, all in one app", "Your one-stop shop for digital connectivity."],
  	typeSpeed: 60
        });
    });
    
