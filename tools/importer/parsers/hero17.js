/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as specified
  const headerRow = ['Hero'];

  // Extract relevant elements from the provided HTML
  const backgroundImage = element.querySelector('picture img');
  const title = element.querySelector('.b01__headline');
  const subheading = element.querySelector('.b01__eyebrow');

  // Initialize the content cell array
  const contentCell = [];

  // Add background image to the content cell if it exists
  if (backgroundImage) {
    const imgElement = document.createElement('img');
    imgElement.src = backgroundImage.src;
    imgElement.alt = backgroundImage.alt || '';
    contentCell.push(imgElement);
  }

  // Add title to the content cell if it exists
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title.textContent.trim();
    contentCell.push(titleElement);
  }

  // Add subheading to the content cell if it exists
  if (subheading) {
    const subheadingElement = document.createElement('p');
    subheadingElement.textContent = subheading.textContent.trim();
    contentCell.push(subheadingElement);
  }

  // Prepare the table structure
  const tableCells = [
    headerRow,  // Header row
    [contentCell],  // Content row
  ];

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}