/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const headerRow = ['Quote'];
  const quoteContent = element.querySelector('.b02__rich-text');

  // Ensure quoteContent exists before accessing its properties
  const quoteText = quoteContent ? Array.from(quoteContent.querySelectorAll('p')).map(p => p.outerHTML).join('') : '';

  // Create table structure based on extracted content
  const cells = [
    headerRow,
    [quoteText] // Content row
  ];

  // Use WebImporter.DOMUtils.createTable to create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}