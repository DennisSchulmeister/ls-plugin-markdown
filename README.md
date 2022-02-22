lecture-slides.js: Plugin for Markdown Syntax
=============================================

Description
-----------

This plugin allows to use markdown syntax in to `@dschulmeis/lecture-slides.js`
or `@dschulmeis/mini-tutorial.js` projects. Just add the `markdown` class to
a HTML block element or the `md` class to HTML inline elements to render their
content with markdown like this:

```html
<section data-title="Example for markdown syntax" class="markdown">
    # How to use markdown in a presentation

    After enabling the plugin simply add the `markdown` class to any HTML
    block element to render its content with markdown. Use the `md` class
    for inline elements, instead.

     1. Add the plugin to the project.
     1. Instantiate the plugin in `index.js`.
     1. Apply classes `markdown` or `md` in the HTML document.
</section>
```

Internaly, `markdown-it` allong with `markdown-it-attrs` and `markdown-it-anchor`
is used to render the markdown content to plain HTML. This allows to use curly
braces to set CSS clases directly in the markdown code like this:

```markdown
# Example heading with css class {.mt-0}

Paragraph with other CSS classes {.message .warning}
```

Installation
------------

 1. Add the plugin to your project: `$ npm add --save-dev @dschulmeis/ls-plugin-markdown`
 2. Create a plugin instance in `index.js` and pass it to the main object.
 2. Use the `markdown` and `md` classes in the HTML content

Example for `@dschulmeis/lecture-slides.js`:

```javascript
import SlideshowPlayer from "@dschulmeis/lecture-slides.js";
import LS_Plugin_Markdown from "@dschulmeis/ls-plugin-markdown";

window.addEventListener("load", () => {
    let player = new SlideshowPlayer({
        plugins: {
            Markdown: new LS_Plugin_Markdown(),
        }
    });

    player.start();
});
```

Example for `@dschulmeis/mini-tutorial.js`:

```javascript
import MiniTutorial from "@dschulmeis/mini-tutorial.js";
import LS_Plugin_Markdown from "@dschulmeis/ls-plugin-markdown";

window.addEventListener("load", () => {
    let mt = new MiniTutorial({
        plugins: [
            new LS_Plugin_Markdown(),
        ]
    });

    mt.start();
});
```

The constructor of the plugin takes an optional configuration object with
the following properties:

 * `markdownIt`: Configuration values for the `markdown-it` library.
 Default: `{html: true, linkify: true, typographer: true}`

Copyright
---------

lecture-slides.js: https://www.github.com/DennisSchulmeister/lecture-slides.js <br/>
mini-tutorial.js: https://www.github.com/DennisSchulmeister/mini-tutorial.js <br/>
ls-plugin-markdown: https://github.com/DennisSchulmeister/ls-plugin-markdown <br/>
© 2022 Dennis Schulmeister-Zimolong <dennis@pingu-mail.de> <br/>
Licensed under the 2-Clause BSD License.
