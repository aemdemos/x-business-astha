export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const headlineElement = element.querySelector('h5.b01__headline');
  const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

  const buttonElement = element.querySelector('a.b03__button');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = buttonElement ? buttonElement.href : '';

  // Prepare the table rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentCell = document.createElement('div');

  // Add headline to the content cell
  if (headlineText) {
    const headline = document.createElement('h1');
    headline.textContent = headlineText;
    contentCell.appendChild(headline);
  }

  // Add button to the content cell if available
  if (buttonText && buttonLink) {
    const button = document.createElement('a');
    button.href = buttonLink;
    button.textContent = buttonText;
    contentCell.appendChild(button);
  }

  const contentRow = [contentCell];

  // Create the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}