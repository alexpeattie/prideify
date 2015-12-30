var Prideify = function(target, options) {
  if(typeof target === 'undefined') target = '[data-pride]';
  if(typeof options === 'undefined') options = {};

  if (!(this instanceof Prideify)) {
    var images;

    if(window.jQuery && target.jquery) images = jQuery.makeArray(target);
    if(typeof target === 'string') {
      var elements = document.querySelectorAll(target) 
      images = Array.prototype.slice.call(elements)
    }

    [].concat(images || target).forEach(function(image) {
      new Prideify(image, options);
    })
  } else {
    this.options = options;
    this.stripes = this.options.customStripes || this.defaultStripes;
    this.options.renderedClass = this.options.renderedClass || 'prideified';

    this.prideifyImage(target);
  }
}

Prideify.prototype.prideifyImage = function(image) {
  if(image.classList.contains(this.options.renderedClass)) return;

  var tmpImage = new Image();
  tmpImage.crossOrigin = 'anonymous'

  tmpImage.src = image.src;
  switch(typeof this.options.crossOriginProxy) {
    case 'string':
      tmpImage.src = this.options.crossOriginProxy + tmpImage.src;
    case 'boolean':
      if(this.options.crossOriginProxy) tmpImage.src = 'http://crossorigin.me/' + tmpImage.src;
  }

  tmpImage.onload = (function() {
    image.src = this.render(tmpImage)
    image.classList.add(this.options.renderedClass);

    tmpImage = null;
    if(typeof this.options.afterRender === 'function') this.options.afterRender(image);
  }).bind(this)
}

Prideify.prototype.render = function(image) {
  this.canvas  = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');

  document.body.appendChild(this.canvas);

  this.width = this.canvas.width = image.width;
  this.height = this.canvas.height = image.height;

  this.context.drawImage(image, 0, 0, this.width, this.height);
  this.addRainbow(image);

  var imageSrc = this.canvas.toDataURL();
  this.removeCanvas();

  return imageSrc;
};

Prideify.prototype.defaultStripes = [
  [255, 62, 24],
  [252, 154, 0],
  [255, 216, 0],
  [57, 234, 124],
  [11, 178, 255],
  [152, 90, 255]
]

Prideify.prototype.removeCanvas = function () {
  this.canvas.parentNode.removeChild(this.canvas);
};

Prideify.prototype.addRainbow = function (image) {
  for (var stripeNum = 0; stripeNum < this.stripes.length; stripeNum++) {
    this.addStripe(image, stripeNum)
  }
}

Prideify.prototype.addStripe = function (image, stripeNum) {
  var stripeThickness = this._stripeThickness(image);
  var stripePosition = stripeNum * stripeThickness;
  var stripeColor = this.stripes[stripeNum].join(', ')

  this.context.fillStyle = 'rgba(' + stripeColor + ', 0.5)';
  var rect = this._rectangle(stripePosition, stripeThickness, this._stripeLength(image))
  this.context.fillRect.apply(this.context, rect);
}

Prideify.prototype._stripeLength = function (image) {
  return this.options.vertical ? image.height : image.width;
}

Prideify.prototype._stripeThickness = function (image) {
  return (this.options.vertical ? image.width : image.height) / this.stripes.length;
}

Prideify.prototype._rectangle = function (position, thickness, length) {
  if(this.options.vertical) {
    return [position, 0, thickness, length];
  } else {
    return [0, position, length, thickness];
  }
}

if(window.jQuery) {
  jQuery.fn.prideify = function(options) { Prideify(this, options) }
}