export default function parse(element, { document }) {
  const columns = element.querySelectorAll('.ct01__column');

  // Create the header row with the exact required formatting
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract content for each column
  const contentRow = Array.from(columns).map((column) => {
    const textElement = column.querySelector('.b02__rich-text h3');
    const buttonElement = column.querySelector('.b03__button');

    const text = textElement ? textElement.textContent.trim() : '';
    const button = buttonElement ? buttonElement.cloneNode(true) : null;

    const cellContent = [];
    if (text) {
      const heading = document.createElement('p');
      heading.textContent = text;
      cellContent.push(heading);
    }
    if (button) {
      cellContent.push(button);
    }

    return cellContent;
  });

  // Create the table data
  const tableData = [headerRow, contentRow];

  // Use the helper function to create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}