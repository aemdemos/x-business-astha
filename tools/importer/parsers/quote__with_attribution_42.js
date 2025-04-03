export default function parse(element, { document }) {
  const quoteTextElement = element.querySelector('.b14__quote-text');
  const authorNameElement = element.querySelector('.b14__author-name');
  const authorTitleElement = element.querySelector('.b14__author-title');

  const quoteText = quoteTextElement ? quoteTextElement.textContent.trim() : '';
  const authorName = authorNameElement ? authorNameElement.textContent.trim() : '';
  const authorTitle = authorTitleElement ? authorTitleElement.textContent.trim() : '';

  // Create structured content
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  const contentCell = document.createElement('p');
  contentCell.textContent = quoteText;
  const contentRow = [contentCell];

  const attributionCell = document.createElement('p');
  attributionCell.innerHTML = `${authorName}, <em>${authorTitle}</em>`;
  const attributionRow = [attributionCell];

  const cells = [
    headerRow,
    contentRow,
    attributionRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}