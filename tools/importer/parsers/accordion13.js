export default function parse(element, { document }) {
  const title = element.querySelector('.ct05__headline h3')?.textContent.trim();
  const contentContainer = element.querySelector('.ct05__content_inner');

  const rows = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Accordion item row
  const titleCell = document.createElement('div');
  titleCell.textContent = title;

  const contentCell = document.createElement('div');
  contentCell.append(...contentContainer.childNodes);

  rows.push([titleCell, contentCell]);

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}