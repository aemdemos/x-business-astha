/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const rows = [];

  // Extract headline and insert as a new section
  const headline = element.querySelector('.b01__headline')?.textContent.trim();

  if (headline) {
    rows.push([document.createElement('hr')]);
  }

  // Process accordion items dynamically
  const accordionItems = element.querySelectorAll('.ct05-content-dropdown');

  accordionItems.forEach((item) => {
    const title = item.querySelector('.ct05__headline h3')?.textContent.trim(); // Extract title dynamically
    const contentElement = item.querySelector('.ct05__content_inner');

    const content = [];
    if (contentElement) {
      Array.from(contentElement.children).forEach((child) => {
        content.push(child.cloneNode(true)); // Clone child nodes dynamically
      });
    }

    if (title && content.length) {
      rows.push([title, content]); // Push title and content dynamically
    }
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block); // Replace element with block table
}