/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const paragraphs = Array.from(element.querySelectorAll('p'));
  const listItems = Array.from(element.querySelectorAll('ul > li'));
  const link = element.querySelector('a');

  // Create an array representing the table structure
  const headerRow = ['Embed'];
  const contentCell = [];

  // Add paragraphs to the content cell
  paragraphs.forEach((p) => {
    contentCell.push(p.cloneNode(true));
  });

  // Add link if available
  if (link) {
    contentCell.push(link.cloneNode(true));
  }

  // Add list items to the content cell
  if (listItems.length > 0) {
    const list = document.createElement('ul');
    listItems.forEach((li) => {
      list.appendChild(li.cloneNode(true));
    });
    contentCell.push(list);
  }

  // Create the table using the helper function
  const tableData = [
    headerRow,
    [contentCell]
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}