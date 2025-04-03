export default function parse(element, { document }) {
  // Helper function to find the headline
  const headlineElement = element.querySelector('.b01__headline');
  const buttonElement = element.querySelector('.b03__button');

  if (!headlineElement || !buttonElement) {
    return;
  }

  const headlineText = headlineElement.textContent.trim();
  const buttonUrl = buttonElement.href;

  // Create the table for the block
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  const contentRow = [document.createElement('span')];
  contentRow[0].textContent = `${headlineText} `;

  const linkElement = document.createElement('a');
  linkElement.href = buttonUrl;
  linkElement.textContent = buttonUrl;
  contentRow[0].appendChild(linkElement);

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}