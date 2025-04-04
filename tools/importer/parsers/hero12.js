/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image
  const imgElement = element.querySelector('img.c01__background-img');
  const backgroundImage = imgElement ? imgElement.getAttribute('src') : '';

  // Extract headline
  const headlineElement = element.querySelector('h1.c01__headline');
  const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

  // Create content for the table
  const headerRow = ['Hero'];
  const contentRow = [];

  const combinedContent = document.createElement('div');

  if (backgroundImage) {
    const imgTag = document.createElement('img');
    imgTag.setAttribute('src', backgroundImage);
    combinedContent.appendChild(imgTag);
  }

  if (headlineText) {
    const headingTag = document.createElement('h1');
    headingTag.textContent = headlineText;
    combinedContent.appendChild(headingTag);
  }

  contentRow.push(combinedContent);

  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(blockTable);
}