export default function parse(element, { document }) {
  // Helper function to create a table
  const createTable = WebImporter.DOMUtils.createTable;

  // Validate required elements exist within the input element
  const headline = element.querySelector('.ct05__headline h3');
  const richText = element.querySelector('.b02__rich-text');

  if (!headline || !richText) {
    console.warn('Required elements not found in the provided HTML element');
    return;
  }

  // Dynamically extract header content
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Source Information';
  const headerRow = [headerCell];

  // Clone rich text content dynamically
  const contentRow = [richText.cloneNode(true)];

  // Create the structured table
  const table = createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}