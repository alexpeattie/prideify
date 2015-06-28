![prideify.js](https://raw.github.com/alexpeattie/prideify/master/logo.png)

Inspired by [facebook.com/celebratepride](https://facebook.com/celebratepride) - a super-lightweight library (< 100 lines of code) to “prideify” any image using the <canvas> element. Licensed under MIT.

There are no external dependencies, although it does integrate with jQuery when it's present :relaxed:.

![Example image](https://raw.github.com/alexpeattie/prideify/master/example.png)

## Live Demo

#### <http://alexpeattie.com/projects/prideify>

## Usage
### Quickstart

~~~html
<img src='/dave.jpg' class='profile-pic'>
<img src='/jenny.jpg' class='profile-pic'>

<script src='prideify.js'></script>
<script>
  Prideify('.profile-pic');
</script>
~~~

**With jQuery**

~~~html
<img src='/dave.jpg' class='profile-pic'>
<img src='/jenny.jpg' class='profile-pic'>

<script src='jquery.js'></script>
<script src='prideify.js'></script>
<script>
  $('.profile-pic').prideify();
</script>
~~~

### More examples

If you call Prideify without any arguments, any image with the `data-prideify` attribute set will be processed:

~~~html
<img src='/jenny.jpg' data-pridefied>
<script>
  Prideify();
</script>
~~~

If you are trying to call Prideify with an image not hosted on your server, you'll probably need to set the `crossOriginProxy` option to true, to avoid browser restrictions regarding the canvas element (see more under [Configuration options](#configuration-options)):

~~~html
<img src='http://example.com/jenny.jpg'>
<script>
  Prideify('img', { crossOriginProxy: true });
</script>
~~~
By default Prideify will add a CSS class 'prideify' after the image is rendered. You can use a different CSS class by setting the `renderedClass` option:

~~~js
Prideify('img', { renderedClass: 'some-custom-class' });
~~~

If you want something to happen after the image has been rendered, you can use the `afterRender` option. The newly rendered image will be passed into the callback function:

~~~js
Prideify('#jenny', { afterRender: function(image) {
  console.log("Image rendered")
} });
~~~

The first argument passed to Prideify can be a selector, image element, array of elements or jQuery collection:

~~~js
Prideify('img.profile-pic');
Prideify($('img.profile-pic'));
Prideify(document.getElementById('jenny'));
~~~

### Arguments

~~~js
Pridefy(target, [options]);
~~~

<hr>

**target (optional)**
<h6>Default: '[date-prideify]'</h6>
*Type: DOMElement, array of DOMElements, jQuery collection or CSS selector*

The image or collection of images you want to prideify. Alternatively you can pass a selector, in which case anything matching the selector will be prideified.

If left blank, all images with `data-prideify` attributes (e.g. it defaults to the CSS selector `'[data-prideify]'`).

<hr>

**options (optional)**
<h6>Default: {}</h6>
*Type: Object*

Additional configuration options - see below.

### Configuration options

<hr>

**renderedClass**
<h6>Default: 'prideified'</h6>
*Type: String*

A class that will be added the the `<img>` element after the image has been rendered successfully.

<hr>

**crossOriginProxy**
<h6>Default: false</h6>
*Type: Boolean or string*

Due to browser restrictions, you won't be able to use prideify normally with most image that are not hosted on your domain (unless the image host has been kind enough to set to *). You can learn more about cross-origin security and the `<canvas>` in this MDN article.

Setting `crossOriginProxy` to true will load the image via <http://crossorigin.me>, thereby avoid cross-origin restrictions. If you want to use a different proxy, you can pass it's URL as a string.

<hr>

**customStripes**
<h6>Default: undefined</h6>
*Type: Array of arrays*

If you don't want to use the default colors, or want extra or fewer stripes, you can set use a `customStripes` array. This is a nested array of arrays, each containing the RGB values of each stripe:

~~~js
Prideify('.profile-pic', { 
  customStripes: [[0, 0, 0], [255, 255, 255]] 
});
~~~

<hr>

**afterRender**
<h6>Default: undefined</h6>
*Type: Function*

A callback function that will run after the image has been rendered. The new image will be passed as the sole argument to the callback function.

The above would overlay two stripes - a black one, and a white one - admittedly not very exciting!

## Todo

Better error handling :innocent:

### Credits

Thanks to Facebook and the LGBT community for the inspiration and to @technoboy10 for the awesome CORS proxy. Example photo credit [Jose Antonio Navas](https://www.flickr.com/photos/joseanavas/5984942462)