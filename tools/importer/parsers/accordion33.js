export default function parse(element, { document }) {
  const headerRow = ["Accordion"];

  const rows = [];
  rows.push(headerRow);

  const fieldsets = element.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    const titleEl = fieldset.querySelector('legend');
    const titleCell = titleEl.textContent.trim();

    const tagsWrap = fieldset.querySelector('.sp05__filter-tag-wrap');
    const tags = tagsWrap ? tagsWrap.querySelectorAll('.sp05__filter-tags') : [];
    const contentCell = [];

    tags.forEach((tag) => {
      const labelEl = tag.querySelector('label');
      if (labelEl) {
        const labelClone = labelEl.cloneNode(true);
        contentCell.push(labelClone);
      }
    });

    rows.push([titleCell, contentCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}