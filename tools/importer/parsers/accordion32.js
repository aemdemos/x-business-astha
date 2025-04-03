export default function parse(element, { document }) {
  // Extract elements from the provided HTML structure
  const accordionItems = [...element.querySelectorAll('.ct05-content-dropdown')];

  // Define the content structure for the table
  const tableData = [];

  // First row with the name of the block
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];
  tableData.push(headerRow);

  // Iterate through each accordion item and extract relevant data
  accordionItems.forEach((item) => {
    const titleElement = item.querySelector('.ct05__headline h3');
    const contentElement = item.querySelector('.ct05__content_inner');

    // Extract title text
    const titleContent = titleElement ? titleElement.textContent.trim() : '';

    // Clone the content element to preserve its structure
    const contentClone = contentElement ? contentElement.cloneNode(true) : document.createElement('div');

    // Push the title and content into the table data
    tableData.push([titleContent, contentClone]);
  });

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}