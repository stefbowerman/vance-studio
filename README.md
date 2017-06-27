# Vance Studio

Shopify theme for vancestudio.com

Includes a theme option to allow customers to swap between currencies.  In order for this to work, dollar amounts that are displayed to the customer must be wrapped with an element with data attribute ``data-convert-money`` ```i.e. <span data-convert-money>{{ product.price | money }}</span>```.  [Click here for the customization instructions](https://help.shopify.com/themes/customization/currencies/show-multiple-currencies).

### Project Structure
```
├── _js
│   └── Working javascript files.  Compiles and minfies with gulp and exports to assets directory
├── _scss
│   └── Working scss files.  Compiles with gulp and exports to assets directory
├── assets
│   └── Javascript, CSS, and theme images
├── config
│   └── custom Theme Settings
├── layout
│   ├── theme.liquid
│   └── optional alternate layouts
├── snippets
│   └── optional custom code snippets
├── templates
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── index.liquid
│   ├── list-collections.liquid
│   ├── page.liquid
│   ├── product.liquid
│   └── search.liquid

```

### Getting Started

Install project dependencies and run default gulp task to start developing.  This will add the necessary npm modules, start watching files in the ```/_scss``` directory, and recompile them when they change.
```
npm install
.
.
gulp
```

If using the Shopify Theme Gem for development, follow the [setup instructions](https://github.com/Shopify/shopify_theme) and then run ```theme watch``` to start pushing the theme to your store.

### Development

Javascript work is done in the ``_js`` directory.  The gulp scripts task minifies and checks files for errors before exporting them to the assets directory.  We are using jshint for error checking, [see the docs](http://jshint.com/docs/) for more info on how to use it.

Scss work is done in the ``_scss`` directory.  Right now there is a single entry point for the stylesheet called ``app.scss.liquid``. The gulp styles task inlines all ``@import`` directives and exports a single scss file to the assets directory.  Due to the way Shopify compiles scss, we have to use a css inliner for imported files which means we have to use the native css ``@import`` syntax _not_ the scss one.

```scss
// Do this
@import url("theme/_pages.scss");

// Not this
@import "theme/pages"
```

### Theme Features

There are a few things about the theme to be aware of in order to get the most out of it.

##### Favicons

To add favicons, see the snippet ``favicon.liquid``.  There are 4 icon sizes that need to be generated and added to the assets folder.  See [realfavicongenerator.net](http://realfavicongenerator.net) to create these.

##### Font Icons

The site currently uses the Font Awesome font icon library.  To keep the CSS file as lightweight as possible, comment out unused icon rules in ``_scss/font-awesome/_icons.scss``.

##### Open Graph Images

All open graph tags are contained in the snippet ``open-graph-tags.liquid``.  OG images are generated from the store logo, product page images or blog images.  To add default share images, generate them following the [best practice guidelines](https://developers.facebook.com/docs/sharing/best-practices#images) and hard code them in the snippet.

### P.S.

Refer to [thoughtbot shopify starter readme](https://github.com/thoughtbot/shopify-starter) for more info on theme workflow + deployment.