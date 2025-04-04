/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const contentRows = [];

  const accordionSections = element.querySelectorAll('.ct05-content-dropdown');

  accordionSections.forEach((section) => {
    const title = section.querySelector('button .ct05__headline h3');
    const content = section.querySelector('.ct05__content_inner');

    if (title && content) {
      const titleText = title.textContent.trim();
      const contentClone = content.cloneNode(true);

      // Handle edge cases for missing or empty content
      if (contentClone.textContent.trim() === '') {
        contentClone.textContent = 'No content available';
      }

      contentRows.push([titleText, contentClone]);
    } else if (title) {
      // Handle case where content is missing
      contentRows.push([title.textContent.trim(), 'No content available']);
    } else {
      // Skip sections with completely missing title and content
    }
  });

  const tableData = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}