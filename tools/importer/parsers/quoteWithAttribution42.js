/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the quote text
  const quoteTextElement = element.querySelector('.b14__quote-text');
  const quoteText = quoteTextElement ? quoteTextElement.textContent.trim() : '';

  // Extract the author name and title
  const authorNameElement = element.querySelector('.b14__author-name');
  const authorName = authorNameElement ? authorNameElement.textContent.trim() : '';

  const authorTitleElement = element.querySelector('.b14__author-title');
  const authorTitle = authorTitleElement ? authorTitleElement.textContent.trim() : '';

  // Combine attribution
  const attribution = `${authorName}${authorTitle ? ', ' + authorTitle : ''}`;

  // Create a table using WebImporter.DOMUtils.createTable
  const headerRow = ['Quote'];
  const cells = [
    headerRow,
    [quoteText],
    [attribution],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}