;(function() {
	$(function () {

		$.fn.interactiveBaner = function (options) {

			var defaults = {
				'prevuSelector' : '.bnr-prevu',
				'prevSelector' : '.bnr-prev',
				'nextSelector' : '.bnr-next',
				'thumbnailsSelector' : '.bnr-tumbnails li',
				'activeClass': 'active'
			};

			options = $.extend(options, defaults);

			var retArr = [];
			 $(this).each(function () {
				retArr.push(new interactiveBaner(this, options) );
			});

			return retArr;


		};

		function interactiveBaner (element, options) {
			this.el = element;
			this.$el = $(this.el);
			this.$el.self = this;
			this.options = options;

			this.initialize();
		}

		interactiveBaner.prototype.initialize = function () {
			this.$thumbs = this.$el.find(this.options.thumbnailsSelector);
			this.$prevu = this.$el.find(this.options.prevuSelector);

			this.activeThumb = 0;
			this.setPrevu(false);

			this.$el.on('click', '.bnr-prev', { self: this }, this.prevNextClick);
			this.$el.on('click', this.options.nextSelector, { self: this }, this.prevNextClick);
			this.$el.on('click', this.options.thumbnailsSelector, { self: this }, this.thumbClick);
		};	

		interactiveBaner.prototype.thumbClick = function (e) {
			e.preventDefault();
			var $this = $(e.currentTarget);
			var self = e.data.self;
			
			if ( $this.hasClass(self.options.activeClass) )
				return;
			
			self.activeThumb = $this.index();
			self.setPrevu();
		};

		interactiveBaner.prototype.prevNextClick = function (e) {
			e.preventDefault();
			var $this = $(e.currentTarget);
			var self = e.data.self;

			if ( $this.is(self.options.prevSelector) ) 
				self.activeThumb = self.activeThumb == 0  ? self.$thumbs.size() - 1 : self.activeThumb - 1;
			else 
				self.activeThumb = self.activeThumb == self.$thumbs.size() - 1  ? 0 : self.activeThumb + 1;
			
			self.setPrevu();

		};

		interactiveBaner.prototype.setPrevu = function (animation) {
			var self = this;
			animation = (animation === undefined) ? true : false;
			
			this.$thumbs.eq(this.activeThumb).addClass(this.options.activeClass)
				.siblings('.'+ this.options.activeClass).removeClass(this.options.activeClass);

			this.$prevu.fadeOut (animation ? 200: 0, function () {
				self.$prevu.html( self.$thumbs.eq(self.activeThumb).html() );
				self.$prevu.fadeIn(animation ? 200: 0);
			});
		} 
		

	});
})();