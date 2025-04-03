export default function parse(element, { document }) {
  // Extract content dynamically
  const paragraphs = Array.from(element.querySelectorAll('p'));
  const paragraphTexts = paragraphs.map(p => p.innerHTML.trim());

  const ul = element.querySelector('ul');
  const listItems = ul ? Array.from(ul.querySelectorAll('li')).map(li => li.textContent.trim()) : [];

  // Create the header row matching the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Create the content rows
  const paragraphContentRow = [document.createElement('div')];
  paragraphContentRow[0].innerHTML = paragraphTexts.join('<hr>');

  const listContentRow = [document.createElement('div')];
  listContentRow[0].innerHTML = listItems.join('<hr>');

  // Combine rows into table format
  const tableData = [
    headerRow,
    paragraphContentRow,
    listContentRow
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const tableElement = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(tableElement);
}