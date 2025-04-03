export default function parse(element, { document }) {
  // Extract the background image
  const backgroundImageElement = element.querySelector('img.c01__background-img');
  const backgroundImageUrl = backgroundImageElement ? backgroundImageElement.src : '';

  // Extract the headline (title)
  const headlineElement = element.querySelector('h1.c01__headline');
  const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

  // Create an <h1> element for the title
  const title = document.createElement('h1');
  title.textContent = headlineText;

  // Create an <img> element for the background image
  const backgroundImage = document.createElement('img');
  backgroundImage.src = backgroundImageUrl;

  // Create the header cell wrapped in <strong>
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';

  // Create the table structure
  const cells = [
    [headerCell], // Header row wrapped in <strong>
    [[backgroundImage, title]], // Content row with the background image and title
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}