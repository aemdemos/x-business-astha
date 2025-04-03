/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import columns1Parser from './parsers/columns1.js';
import tabs4Parser from './parsers/tabs4.js';
import columns__three_columns_5Parser from './parsers/columns__three_columns_5.js';
import accordion6Parser from './parsers/accordion6.js';
import hero7Parser from './parsers/hero7.js';
import embed__social_8Parser from './parsers/embed__social_8.js';
import hero9Parser from './parsers/hero9.js';
import columns__three_columns_10Parser from './parsers/columns__three_columns_10.js';
import hero12Parser from './parsers/hero12.js';
import accordion13Parser from './parsers/accordion13.js';
import cards14Parser from './parsers/cards14.js';
import cards15Parser from './parsers/cards15.js';
import embed__video_16Parser from './parsers/embed__video_16.js';
import hero17Parser from './parsers/hero17.js';
import cards18Parser from './parsers/cards18.js';
import embed__video_19Parser from './parsers/embed__video_19.js';
import embed__social_20Parser from './parsers/embed__social_20.js';
import columns22Parser from './parsers/columns22.js';
import cards23Parser from './parsers/cards23.js';
import table__bordered_24Parser from './parsers/table__bordered_24.js';
import embed__social_25Parser from './parsers/embed__social_25.js';
import columns__three_columns_27Parser from './parsers/columns__three_columns_27.js';
import table__bordered_28Parser from './parsers/table__bordered_28.js';
import columns__three_columns_29Parser from './parsers/columns__three_columns_29.js';
import cards30Parser from './parsers/cards30.js';
import embed__video_31Parser from './parsers/embed__video_31.js';
import accordion32Parser from './parsers/accordion32.js';
import accordion33Parser from './parsers/accordion33.js';
import columns__three_columns_34Parser from './parsers/columns__three_columns_34.js';
import hero35Parser from './parsers/hero35.js';
import embed__video_36Parser from './parsers/embed__video_36.js';
import columns37Parser from './parsers/columns37.js';
import quote38Parser from './parsers/quote38.js';
import hero39Parser from './parsers/hero39.js';
import cards__no_images_40Parser from './parsers/cards__no_images_40.js';
import accordion41Parser from './parsers/accordion41.js';
import quote__with_attribution_42Parser from './parsers/quote__with_attribution_42.js';
import hero43Parser from './parsers/hero43.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
  Metadata: metadataParser,
      'Columns 1': columns1Parser,
    'Tabs 4': tabs4Parser,
    'Columns (three columns) 5': columns__three_columns_5Parser,
    'Accordion 6': accordion6Parser,
    'Hero 7': hero7Parser,
    'Embed (social) 8': embed__social_8Parser,
    'Hero 9': hero9Parser,
    'Columns (three columns) 10': columns__three_columns_10Parser,
    'Hero 12': hero12Parser,
    'Accordion 13': accordion13Parser,
    'Cards 14': cards14Parser,
    'Cards 15': cards15Parser,
    'Embed (video) 16': embed__video_16Parser,
    'Hero 17': hero17Parser,
    'Cards 18': cards18Parser,
    'Embed (video) 19': embed__video_19Parser,
    'Embed (social) 20': embed__social_20Parser,
    'Columns 22': columns22Parser,
    'Cards 23': cards23Parser,
    'Table (bordered) 24': table__bordered_24Parser,
    'Embed (social) 25': embed__social_25Parser,
    'Columns (three columns) 27': columns__three_columns_27Parser,
    'Table (bordered) 28': table__bordered_28Parser,
    'Columns (three columns) 29': columns__three_columns_29Parser,
    'Cards 30': cards30Parser,
    'Embed (video) 31': embed__video_31Parser,
    'Accordion 32': accordion32Parser,
    'Accordion 33': accordion33Parser,
    'Columns (three columns) 34': columns__three_columns_34Parser,
    'Hero 35': hero35Parser,
    'Embed (video) 36': embed__video_36Parser,
    'Columns 37': columns37Parser,
    'Quote 38': quote38Parser,
    'Hero 39': hero39Parser,
    'Cards (no images) 40': cards__no_images_40Parser,
    'Accordion 41': accordion41Parser,
    'Quote (with attribution) 42': quote__with_attribution_42Parser,
    'Hero 43': hero43Parser,
};

const pageElements = [
  {
    name: 'Metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // get dom elements for each block on the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });

  // remove fragment elements from the current page
  fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath))
    .forEach((element) => {
      element.remove();
    });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = cluster ? `${name} ${cluster}` : name;
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    let items = null;
    try {
      items = parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
    // remove empty items
    if (Array.isArray(items)) {
      items = items.filter((item) => item);
    }
    if (!WebImporter.Import.isEmpty(items)) {
      // create the block
      const block = WebImporter.Blocks.createBlock(document, {
        name,
        cells: items,
      });
      if (block) {
        // add block to DOM
        main.append(block);
      }
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
