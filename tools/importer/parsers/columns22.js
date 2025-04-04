/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract slide contents dynamically
  const slides = element.querySelectorAll('.ct06__slide-content .b04__img');

  const rows = Array.from(slides).map((img) => {
    const imageElement = document.createElement('img');
    const dataSrc = img.getAttribute('data-src');
    const altText = img.getAttribute('alt');

    if (dataSrc) {
      imageElement.src = dataSrc;
    } else {
      console.warn('Image data-src missing for slide:', img);
    }

    imageElement.alt = altText || '';
    return [imageElement];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}