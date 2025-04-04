/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  const fieldsets = element.querySelectorAll('fieldset');

  fieldsets.forEach((fieldset) => {
    const title = fieldset.querySelector('legend');
    const tagWrap = fieldset.querySelector('.sp05__filter-tag-wrap');

    if (title && tagWrap) {
      const titleCell = document.createElement('p');
      titleCell.textContent = title.textContent.trim();

      const contentCell = document.createElement('div');

      const tags = tagWrap.querySelectorAll('.sp05__filter-tags');
      tags.forEach((tag) => {
        const label = tag.querySelector('label');
        if (label) {
          const tagElement = document.createElement('p');
          tagElement.textContent = label.textContent.trim();
          contentCell.appendChild(tagElement);
        }
      });

      rows.push([titleCell, contentCell]);
    }
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}