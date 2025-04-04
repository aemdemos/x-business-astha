/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title from the button
  const titleElement = element.querySelector('.ct05__headline h3');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the content from the inner div
  const contentElement = element.querySelector('.ct05__content_inner');
  const content = contentElement ? contentElement.cloneNode(true) : document.createElement('div');

  // Prepare the table data
  const tableData = [
    ['Accordion'], // Header row indicating block type
    [title, content] // First accordion item
  ];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}