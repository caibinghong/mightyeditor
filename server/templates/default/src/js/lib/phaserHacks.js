/*
 * do not edit this file directly - as it will get updated automatically width MightyEditor update
 */

(function(){
	"use strict";
	// fix align by wordWrapWidth
	Phaser.Text.prototype.updateText = function () {
		if(!this || !this.texture){
			return;
		}
		this.texture.baseTexture.resolution = this.resolution;

		this.context.font = this.style.font;

		var outputText = this.text;

		if (this.style.wordWrap)
		{
			outputText = this.runWordWrap(this.text);
			maxLineWidth = this.wordWrapWidth;
		}

		//split text into lines
		var lines = outputText.split(/(?:\r\n|\r|\n)/);

		//calculate text width
		var lineWidths = [];
		var maxLineWidth = 0;
		var fontProperties = this.determineFontProperties(this.style.font);

		for (var i = 0; i < lines.length; i++)
		{
			var lineWidth = this.context.measureText(lines[i]).width;
			lineWidths[i] = lineWidth;
			maxLineWidth = Math.max(maxLineWidth, lineWidth);
		}

		var width = maxLineWidth + this.style.strokeThickness;

		this.canvas.width = (width + this.context.lineWidth) * this.resolution;

		//calculate text height
		var lineHeight = fontProperties.fontSize + this.style.strokeThickness;

		var height = lineHeight * lines.length;

		this.canvas.height = height * this.resolution;

		this.context.scale(this.resolution, this.resolution);

		if (navigator.isCocoonJS)
		{
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

		this.context.fillStyle = this.style.fill;
		this.context.font = this.style.font;
		this.context.strokeStyle = this.style.stroke;
		this.context.textBaseline = 'alphabetic';
		this.context.shadowOffsetX = this.style.shadowOffsetX;
		this.context.shadowOffsetY = this.style.shadowOffsetY;
		this.context.shadowColor = this.style.shadowColor;
		this.context.shadowBlur = this.style.shadowBlur;
		this.context.lineWidth = this.style.strokeThickness;
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';

		var linePositionX;
		var linePositionY;

		this._charCount = 0;

		//draw lines line by line
		for (i = 0; i < lines.length; i++)
		{
			linePositionX = this.style.strokeThickness / 2;
			linePositionY = (this.style.strokeThickness / 2 + i * lineHeight) + fontProperties.ascent;

			if (this.style.align === 'right')
			{
				linePositionX += maxLineWidth - lineWidths[i];
			}
			else if (this.style.align === 'center')
			{
				linePositionX += (maxLineWidth - lineWidths[i]) / 2;
			}

			linePositionY += this._lineSpacing;

			if (this.colors.length > 0)
			{
				this.updateLine(lines[i], linePositionX, linePositionY);
			}
			else
			{
				if (this.style.stroke && this.style.strokeThickness)
				{
					this.context.strokeText(lines[i], linePositionX, linePositionY);
				}

				if (this.style.fill)
				{
					this.context.fillText(lines[i], linePositionX, linePositionY);
				}
			}
		}

		this.updateTexture();
	};
	
	
	/*Phaser.Text.prototype.updateText = function () {
		this.context.font = this.style.font;

		var outputText = this.text;
		var maxLineWidth = 0;

		// word wrap
		// preserve original text
		if (this.style.wordWrap)
		{
			outputText = this.runWordWrap(this.text);
			maxLineWidth = this.wordWrapWidth;
		}

		//split text into lines
		var lines = outputText.split(/(?:\r\n|\r|\n)/);

		//calculate text width
		var lineWidths = [];
		
		for (var i = 0; i < lines.length; i++)
		{
			var lineWidth = this.context.measureText(lines[i]).width;
			lineWidths[i] = lineWidth;
			maxLineWidth = Math.max(maxLineWidth, lineWidth);
		}

		this.canvas.width = maxLineWidth + this.style.strokeThickness;

		//calculate text height
		var lineHeight = this.determineFontHeight('font: ' + this.style.font + ';') + this.style.strokeThickness + this._lineSpacing + this.style.shadowOffsetY;

		this.canvas.height = lineHeight * lines.length;

		if (navigator.isCocoonJS)
		{
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}

		//set canvas text styles
		this.context.fillStyle = this.style.fill;
		this.context.font = this.style.font;

		this.context.strokeStyle = this.style.stroke;
		this.context.lineWidth = this.style.strokeThickness;

		this.context.shadowOffsetX = this.style.shadowOffsetX;
		this.context.shadowOffsetY = this.style.shadowOffsetY;
		this.context.shadowColor = this.style.shadowColor;
		this.context.shadowBlur = this.style.shadowBlur;

		this.context.textBaseline = 'top';
		this.context.lineCap = 'round';
		this.context.lineJoin = 'round';
		
		
		var linePosition = new PIXI.Point(0, 0);
		//draw lines line by line
		for (i = 0; i < lines.length; i++)
		{
			linePosition.x = this.style.strokeThickness / 2;
			linePosition.y = this.style.strokeThickness / 2 + i * lineHeight + this._lineSpacing;

			if (this.style.align === 'right')
			{
				linePosition.x += maxLineWidth - lineWidths[i];
			}
			else if (this.style.align === 'center')
			{
				linePosition.x += (maxLineWidth - lineWidths[i]) / 2;
			}

			if (this.style.stroke && this.style.strokeThickness)
			{
				this.context.strokeText(lines[i], linePosition.x, linePosition.y);
			}

			if (this.style.fill)
			{
				this.context.fillText(lines[i], linePosition.x, linePosition.y);
			}
		}

		this.updateTexture();
	};
	*/
	// add scaleX/Y and anchorX/Y - so we can skip extra tweens
	(function(){
		
		Object.defineProperty(Phaser.Sprite.prototype, "scaleX", {
			set: function(val){
				this.scale.x = val;
			},
			get: function(){
				return this.scale.x;
			}
		});
		
		Object.defineProperty(Phaser.Sprite.prototype, "scaleY", {
			set: function(val){
				this.scale.y = val;
			},
			get: function(){
				return this.scale.y;
			}
		});
		
		Object.defineProperty(Phaser.Sprite.prototype, "anchorX", {
			set: function(val){
				this.anchor.x = val;
			},
			get: function(){
				return this.anchor.x;
			}
		});
		
		Object.defineProperty(Phaser.Sprite.prototype, "anchorY", {
			set: function(val){
				this.anchor.y = val;
			},
			get: function(){
				return this.anchor.y;
			}
		});
		
		Object.defineProperty(Phaser.Group.prototype, "scaleX", {
			set: function(val){
				this.scale.x = val;
			},
			get: function(){
				return this.scale.x;
			}
		});
		
		Object.defineProperty(Phaser.Group.prototype, "scaleY", {
			set: function(val){
				this.scale.y = val;
			},
			get: function(){
				return this.scale.y;
			}
		});
		
	})();
	
})();


