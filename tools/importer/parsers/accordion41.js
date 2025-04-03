export default function parse(element, { document }) {
  // Helper function to cleanly extract text, clone elements, and sanitize attributes
  const extractContent = (el) => {
    if (!el) return '';
    return Array.from(el.childNodes).map((node) => {
      if (node.nodeType === document.TEXT_NODE) {
        const cleanedText = node.textContent.trim();
        return cleanedText ? cleanedText : null;
      } else if (node.nodeType === document.ELEMENT_NODE) {
        // Clone the node for sanitization
        const clonedNode = node.cloneNode(true);
        // Remove unnecessary attributes
        clonedNode.removeAttribute('style');
        clonedNode.removeAttribute('class');
        clonedNode.removeAttribute('data-twtr-scribe-section');
        clonedNode.removeAttribute('data-twtr-scribe-element');
        clonedNode.removeAttribute('aria-hidden');
        clonedNode.removeAttribute('focusable');
        return clonedNode;
      }
      return null;
    }).filter(Boolean);
  };

  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  // Initialize the rows array for storing accordion items
  const rows = [];

  // Extract accordion items with their title and content
  const items = element.querySelectorAll('.ct05');
  items.forEach((item) => {
    const titleElement = item.querySelector('.ct05__headline h3');
    const contentElement = item.querySelector('.ct05__content_inner');

    const title = extractContent(titleElement);
    const content = extractContent(contentElement);

    if (title.length > 0 && content.length > 0) {
      rows.push([title, content]);
    }
  });

  // Combine header row with data rows
  const tableData = [headerRow, ...rows];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}