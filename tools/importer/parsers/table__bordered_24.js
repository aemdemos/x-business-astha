export default function parse(element, { document }) {
  // Helper function to create table cells
  const createHeader = (text) => {
    const strongElement = document.createElement('strong');
    strongElement.textContent = text;
    return strongElement;
  };

  const createCell = (content) => {
    if (typeof content === 'string') {
      const span = document.createElement('span');
      span.textContent = content;
      return span;
    } 
    return content;
  };

  // Extract data
  const headerRow = [createHeader('Table (bordered)')];

  const rows = [];

  const listItems = element.querySelectorAll('.ct12__list-item a');
  listItems.forEach((linkElement) => {
    if (linkElement) {
      rows.push([createCell(linkElement.textContent)]);
    }
  });

  // Create table
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element
  element.parentNode.replaceChild(table, element);
}