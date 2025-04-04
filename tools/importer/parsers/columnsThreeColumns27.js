/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the content dynamically
  const column1Content = element.querySelector('.ct01__column:nth-child(1) .b02__rich-text p')?.innerHTML || '';
  const column2Header = element.querySelector('.ct01__column:nth-child(3) .b02__rich-text:nth-child(1) h6')?.innerHTML || '';
  const column2Statistic = element.querySelector('.ct01__column:nth-child(3) .b16__text')?.innerHTML || '';
  const column2Footer = element.querySelector('.ct01__column:nth-child(3) .b02__rich-text:nth-child(3) h6')?.innerHTML || '';

  // Create the cells array for the table
  const cells = [
    ['Columns'],
    [
      column1Content,
      `${column2Header}<br>${column2Statistic}<br>${column2Footer}`,
    ],
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}