export default function parse(element, { document }) {
  // Critical review applied

  // Create header row matching the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Tabs';
  const headerRow = [headerCell];

  // Dynamically extract paragraph content from the given element
  const paragraphs = [...element.querySelectorAll('p')];

  // Handle edge case: no paragraphs found
  if (paragraphs.length === 0) {
    console.error('No paragraphs found in the provided element.');
    return;
  }

  // Map paragraph elements into table rows dynamically
  const rows = paragraphs.map((p, index) => {
    const tabLabel = document.createElement('strong');
    tabLabel.textContent = `Tab ${index + 1}`;

    return [tabLabel, p];
  });

  // Combine header and rows into table cells
  const cells = [headerRow, ...rows];

  // Create block using createTable API
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}