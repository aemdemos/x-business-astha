/* global WebImporter */
export default function parse(element, { document }) {
  // Safeguard: Ensure the input element exists
  if (!element || !document) {
    return;
  }

  // Extract header and text content from the first column
  const firstColumn = element.querySelector('.ct01__column:nth-child(1)');
  let headline = '';
  let paragraphs = [];

  if (firstColumn) {
    headline = firstColumn.querySelector('h2')?.textContent.trim() || '';
    paragraphs = Array.from(firstColumn.querySelectorAll('p')).map(p => p.cloneNode(true));
  }

  // Extract image from the second column
  const secondColumn = element.querySelector('.ct01__column:nth-child(2)');
  let img = null;

  if (secondColumn) {
    img = secondColumn.querySelector('img')?.cloneNode(true);
  }

  // Ensure the table header matches the specified block type
  const tableCells = [
    ['Columns'], // Header row (matches the example header exactly)
    [
      headline ? document.createTextNode(headline) : '',
      img || '' // Ensure we handle cases where the image is missing
    ],
    [
      paragraphs.length ? paragraphs : '',
      '' // Keep empty cells as empty strings if no content exists
    ]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the generated block table
  element.replaceWith(blockTable);
}