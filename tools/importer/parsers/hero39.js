export default function parse(element, { document }) {
  // Create header row for the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract content dynamically from the provided HTML element
  const webinarEyebrowElem = element.querySelector('.b01__eyebrow');
  const headlineElem = element.querySelector('.b01__headline');
  const descriptionElem = element.querySelector('.b02__rich-text');
  const buttonElem = element.querySelector('.b03__button');

  // Guard against missing elements
  const webinarEyebrow = webinarEyebrowElem ? webinarEyebrowElem.textContent.trim() : '';
  const headline = headlineElem ? headlineElem.textContent.trim() : '';
  const description = descriptionElem ? descriptionElem.textContent.trim() : '';
  const buttonElement = document.createElement('a');

  if (buttonElem) {
    buttonElement.href = buttonElem.getAttribute('href');
    buttonElement.textContent = buttonElem.textContent.trim();
  }

  // Combine extracted content into a single cell
  const contentCell = document.createElement('div');

  const eyebrowParagraph = document.createElement('p');
  eyebrowParagraph.textContent = webinarEyebrow;
  const headlineHeader = document.createElement('h2');
  headlineHeader.textContent = headline;
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.textContent = description;

  contentCell.appendChild(eyebrowParagraph);
  contentCell.appendChild(headlineHeader);
  contentCell.appendChild(descriptionParagraph);
  if (buttonElem) contentCell.appendChild(buttonElement);

  // Assemble content row dynamically
  const contentRow = [contentCell];

  // Assemble table data
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the parsed block table
  element.replaceWith(blockTable);
}