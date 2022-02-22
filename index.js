/*
 * ls-plugin-markdown (https://www.wpvs.de)
 * © 2022  Dennis Schulmeister-Zimolong <dennis@pingu-mail.de>
 * License of this file: BSD 2-clause
 */
"use strict";

import MarkdownIt from "markdown-it/dist/markdown-it";
import MarkdownIt_Attrs from "markdown-it-attrs";
import MarkdownIt_Anchor from "markdown-it-anchor";
import slugify from "@sindresorhus/slugify";

import { removeSurroundingWhitespace } from "@dschulmeis/ls-utils/string_utils.js";

/**
 * This is a simple HTML plugin for `@dschulmeis/lecture-slides.js` and
 * `@dschulmeis/mini-tutorial.js` to enable the usage of markdown syntax
 * in a document. The content of any HTML block element with the `markdown`
 * class and any inline element with the `md` class is considered to be in
 * markdown syntax to be rendered to plain HTML.
 *
 * The constructor takes an optional configuration object with the following
 * property:
 *
 *   * markdownIt: Configuration values for the `markdown-it` library.
 *     Default: {html: true, linkify: true, typographer: true}
 */
export default class LS_Plugin_Markdown {
    /**
     * Constructor to configure the plugin.
     * @param {Object} config Configuration values
     */
    constructor(config) {
        // Interpret configuration values
        this._config = config || {};
        this._config.markdownIt = this._config.markdownIt || {html: true, linkify: true, typographer: true};

        // Initialize markdown-it
        this.markdownIt = MarkdownIt(this._config.markdownIt);
        this.markdownIt.use(MarkdownIt_Attrs);
        this.markdownIt.use(MarkdownIt_Anchor, {slugify: s => slugify(s)});
    }

    /**
     * This function replaces all custom HTML tags with standard ones.
     * @param {Element} html DOM node with the slide definitions
     */
    preprocessHtml(html) {
        for (let element of html.querySelectorAll(".markdown")) {
            try {
                let markdown = removeSurroundingWhitespace(element.innerHTML);
                element.innerHTML = this.markdownIt.render(markdown);
            } catch(error) {
                console.warn("@dschulmeis/ls-plugin-markdown:", error);
            }
        }

        for (let element of html.querySelectorAll(".md")) {
            try {
                let markdown = removeSurroundingWhitespace(element.innerHTML);
                element.innerHTML = this.markdownIt.renderInline(markdown);
            } catch(error) {
                console.warn("@dschulmeis/ls-plugin-markdown:", error);
            }
        }
    }
}
