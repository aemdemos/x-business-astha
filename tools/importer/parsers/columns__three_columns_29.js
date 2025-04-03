export default function parse(element, { document }) {
  // Extract columns from the footer
  const columns = Array.from(element.querySelectorAll('.src__Column-kRPWVl'));

  // Prepare the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract content for each column
  const contentRow = columns.map((column) => {
    const titleElement = column.querySelector('h2');
    const title = document.createElement('h2');
    title.textContent = titleElement ? titleElement.textContent : '';

    const links = Array.from(column.querySelectorAll('a')).map((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      return linkElement;
    });

    const cellContent = [title, ...links];
    return cellContent;
  });

  // Ensure the number of cells matches the number of columns (edge case handling)
  const contentRowWithPlaceholders = contentRow.length ? contentRow : [['No content available']];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRowWithPlaceholders], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}