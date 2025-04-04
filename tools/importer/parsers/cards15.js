/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];
  const rows = [];

  // Loop through all cards in the element
  const cardElements = element.querySelectorAll('.ct01__column');
  cardElements.forEach(card => {
    const imageElement = card.querySelector('.t03__image img');
    const titleElement = card.querySelector('.t03__label p');
    const descriptionElement = card.querySelector('.t03__body-content');
    const linkElement = card.querySelector('a.t03__card-link');

    // Extract card components
    const image = document.createElement('img');
    image.src = imageElement?.getAttribute('data-src') || '';
    image.alt = imageElement?.getAttribute('alt') || '';

    const title = document.createElement('h3');
    title.textContent = titleElement?.textContent.trim() || '';

    const description = document.createElement('p');
    description.textContent = descriptionElement?.textContent.trim() || '';

    const link = document.createElement('a');
    link.href = linkElement?.href || '#';
    link.textContent = linkElement?.href || 'No link';

    // Create the content cell
    const contentCell = document.createElement('div');
    if (title.textContent) contentCell.appendChild(title);
    if (description.textContent) contentCell.appendChild(description);
    if (link.href !== '#') contentCell.appendChild(link);

    // Add row to the table
    rows.push([image, contentCell]);
  });

  // Create table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}