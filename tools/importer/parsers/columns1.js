export default function parse(element, { document }) {
  // Helper function to create a text cell
  const createTextCell = (text) => {
    const cell = document.createElement('div');
    cell.innerHTML = text; // Change from textContent to innerHTML to render DOM elements
    return cell;
  };

  // Create the header row with "Columns" block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract the first column content (image)
  const imageElement = element.querySelector('.b04__img');

  // Extract the Website button
  const websiteButton = element.querySelector('a[href="http://adaptly.com/solutions/"]');

  // Extract the Twitter handle button
  const twitterButton = element.querySelector('a[href="https://twitter.com/adaptly"]');

  // Extract the badge image
  const badgeImage = element.querySelector('.b04__img[src*="ads-badge-black"]');

  // Extract the headline text
  const headlineElement = element.querySelector('h2.b01__headline');
  const headlineText = headlineElement ? createTextCell(headlineElement.textContent) : '';

  // Extract Helps, Service Model, and Region text
  const helpsElement = element.querySelector('div[data-twtr-scribe-element="9WXF"] p');
  const helpsText = helpsElement ? createTextCell(helpsElement.innerHTML) : '';

  const serviceModelElement = element.querySelector('div[data-twtr-scribe-element="FIR0"] p');
  const serviceModelText = serviceModelElement ? createTextCell(serviceModelElement.innerHTML) : '';

  const regionElement = element.querySelector('div[data-twtr-scribe-element="X7LS"] p');
  const regionText = regionElement ? createTextCell(regionElement.innerHTML.replace(/<br>/g, '<br/>')) : '';

  // Extract the long description
  const descriptionElement = element.querySelector('div[data-twtr-scribe-element="6NQU"]');
  const descriptionText = descriptionElement ? createTextCell(descriptionElement.innerHTML) : '';

  // Create table structure with consistent formatting
  const cells = [
    headerRow,
    [imageElement, websiteButton, twitterButton, badgeImage],
    [headlineText, helpsText, serviceModelText, regionText],
  ];

  // Insert horizontal rule between sections logically
  const hr = document.createElement('hr');
  cells.push([hr]);

  // Add the description row as separate content
  const descriptionRow = ['Description', descriptionText];
  cells.push(descriptionRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}