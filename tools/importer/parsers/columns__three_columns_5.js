export default function parse(element, { document }) {
  // Extract column elements
  const columns = element.querySelectorAll('.ct01__column');

  // Prepare the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Prepare rows for each column
  const columnData = [];
  const seenTitles = new Set(); // Track seen titles to avoid duplication

  Array.from(columns).forEach((column) => {
    const wrapper = column.querySelector('.ct01__wrapper');
    const items = wrapper.querySelectorAll('.b02-rich-text');

    items.forEach((item) => {
      const title = item.querySelector('h5');
      const paragraph = item.querySelector('p');

      const titleText = title ? title.textContent.trim() : '';
      const paragraphText = paragraph ? paragraph.textContent.trim() : '';

      // Avoid adding rows with missing content or duplicates
      if (titleText && paragraphText && !seenTitles.has(titleText)) {
        const titleElement = document.createElement('h5');
        titleElement.textContent = titleText;

        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraphText;

        columnData.push([titleElement, paragraphElement]);
        seenTitles.add(titleText); // Mark title as seen
      }
    });
  });

  const tableData = [headerRow, ...columnData];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(blockTable);
}