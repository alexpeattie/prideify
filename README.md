<p align='center'>
  <img src='https://raw.github.com/alexpeattie/prideify/master/logo.png'>
</p>

Inspired by [facebook.com/celebratepride](https://facebook.com/celebratepride) - a super-lightweight library (< 100 lines of code) to “prideify” any image using the `<canvas>` element. Licensed under MIT.

There are no external dependencies, although it does integrate with jQuery when it's present :relaxed:.

<p align='center'>
  <img src='https://raw.githubusercontent.com/alexpeattie/prideify/master/example.png'>
</p>

## Live Demo

#### https://codepen.io/alexpeattie/full/RwrbRdr

## Usage

The library does its magic using the `<canvas>` API - no trickery with CSS semi-transparent `<div>`s or anything like that :smile:. After being processed, the image is turned back to a normal `<img>` element.

### Quickstart

```html
<img src="/dave.jpg" class="profile-pic" />
<img src="/jenny.jpg" class="profile-pic" />

<script src="prideify.js"></script>
<script>
  Prideify('.profile-pic')
</script>
```

**With jQuery**

```html
<img src="/dave.jpg" class="profile-pic" />
<img src="/jenny.jpg" class="profile-pic" />

<script src="jquery.js"></script>
<script src="prideify.js"></script>
<script>
  $('.profile-pic').prideify()
</script>
```

### More examples

If you call Prideify without any arguments, any image with the `data-prideify` attribute set will be processed:

```html
<img src="/jenny.jpg" data-pridefied />
<script>
  Prideify()
</script>
```

By default Prideify will add a CSS class `'prideify'` after the image is rendered. You can use a different CSS class by setting the `renderedClass` option:

```js
Prideify('img', { renderedClass: 'some-custom-class' })
```

If you want something to happen after the image has been rendered, you can use the `afterRender` option. The newly rendered image will be passed into the callback function:

```js
Prideify('#jenny', {
  afterRender: function (image) {
    console.log('Image rendered')
  }
})
```

The first argument passed to Prideify can be a selector, image element, array of elements or jQuery collection:

```js
Prideify('img.profile-pic')
Prideify($('img.profile-pic'))
Prideify(document.getElementById('jenny'))
```

### Cross origin restrictions

Due to browser restrictions, you won't be able to use prideify normally with most image that are not hosted on your domain (unless the image host has been kind enough to set `Access-Control-Allow-Origin` to `*`). You can learn more about cross-origin security and the `<canvas>` in [this MDN article](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).

If you need to use the plugin with an external image, you'll have to load the image via a CORS proxy, see https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141.

### Arguments

```js
Pridefy([target] [, options]);
```

#### `target`

- Type: `Element`, `Element[]`, jQuery collection or `String` (selector)
- Default: `'[date-prideify]'`

The image or collection of images you want to prideify. Alternatively you can pass a selector, in which case anything matching the selector will be prideified.

If left blank, all images with data-prideify attributes will be targeted (e.g. it defaults to the CSS selector '[data-prideify]').

#### `options`

- Type: `Object`

Configurations options to customize the rendering of the image (see below).

### Configuration options

#### `renderedClass`

- Type: `String`
- Default: `'prideified'`

A class that will be added the the `<img>` element after the image has been rendered successfully.

#### `customStripes`

- Type: `Array[Array(Number, Number, Number)]`
- Default: `undefined`

If you don't want to use the default colors, or want extra or fewer stripes, you can set use a `customStripes` array. This is a nested array of arrays, each containing the RGB values of each stripe:

```js
Prideify('.profile-pic', {
  customStripes: [
    [0, 0, 0],
    [255, 255, 255]
  ]
})
```

The above would overlay two stripes - a black one, and a white one - admittedly not very exciting!

#### `afterRender`

- Type: `Function`
- Default: `undefined`

A callback function that will run after the image has been rendered. The new image will be passed as the sole argument to the callback function.
