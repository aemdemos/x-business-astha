export default function parse(element, { document }) {
  // Step 1: Dynamically create and set the header row
  const blockName = document.createElement('strong');
  blockName.textContent = 'Quote'; // Ensure the header matches the example

  // Step 2: Extract content from the element dynamically
  const contentElement = element.querySelector('.b02__rich-text');
  const paragraphs = contentElement ? [...contentElement.querySelectorAll('p')] : []; // Handle edge cases for missing content

  // Step 3: Combine the extracted paragraphs into a single container
  const quoteContent = document.createElement('div');
  paragraphs.forEach(p => quoteContent.appendChild(p.cloneNode(true)));

  // Step 4: Construct the table structure
  const cells = [
    [blockName], // Header row
    [quoteContent] // Content row
  ];

  // Step 5: Use the helper function to create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Step 6: Replace the original element with the new structured block
  element.replaceWith(blockTable);
}