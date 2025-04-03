export default function parse(element, { document }) {
  const rows = [];

  // Add the header row with the block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract accordion items
  const accordionSections = element.querySelectorAll('.ct05');
  accordionSections.forEach((section) => {
    const title = section.querySelector('.ct05__headline h3');
    const content = section.querySelector('.ct05__content_inner');

    if (title && content) {
      const titleCell = document.createElement('div');
      titleCell.appendChild(title.cloneNode(true));

      const contentCell = document.createElement('div');
      contentCell.appendChild(content.cloneNode(true));

      rows.push([titleCell, contentCell]);
    } else {
      // Handle edge cases with missing data by creating placeholders
      const titleCell = document.createElement('div');
      titleCell.textContent = 'Untitled';

      const contentCell = document.createElement('div');
      contentCell.textContent = 'No content available';

      rows.push([titleCell, contentCell]);
    }
  });

  // Generate the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}