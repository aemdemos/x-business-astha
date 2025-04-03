export default function parse(element, { document }) {
  // Extracting the background image URL dynamically
  const pictureElement = element.querySelector('picture img');
  const backgroundImageUrl = pictureElement ? pictureElement.src : '';

  // Extracting the headline and eyebrow text dynamically
  const eyebrowElement = element.querySelector('.b01__eyebrow');
  const headlineElement = element.querySelector('.b01__headline');

  const eyebrowText = eyebrowElement ? eyebrowElement.textContent.trim() : '';
  const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

  // Creating table header dynamically with exact match "Hero"
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRowElements = [];

  // Adding background image dynamically to content row if available
  if (backgroundImageUrl) {
    const imgElement = document.createElement('img');
    imgElement.src = backgroundImageUrl;
    contentRowElements.push(imgElement);
  }

  // Adding headline dynamically as a heading element
  if (headlineText) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = headlineText;
    contentRowElements.push(headingElement);
  }

  // Adding eyebrow text dynamically
  if (eyebrowText) {
    const eyebrowParagraph = document.createElement('p');
    eyebrowParagraph.textContent = eyebrowText;
    contentRowElements.push(eyebrowParagraph);
  }

  // Creating the table dynamically
  const cells = [
    headerRow, // Matches the required "Hero" header row
    [contentRowElements] // Content dynamically extracted
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}