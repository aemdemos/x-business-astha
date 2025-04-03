export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRow = [];

  // Create a single cell to combine all content
  const contentCell = document.createElement('div');

  // Extract the headline
  const headlineElement = element.querySelector('.b02__rich-text p');
  if (headlineElement) {
    const heading = document.createElement('h1');
    heading.textContent = headlineElement.textContent.trim();
    contentCell.appendChild(heading);
  } else {
    console.warn('Headline element is missing!');
  }

  // Extract the CTA
  const ctaElement = element.querySelector('.b03__button');
  if (ctaElement) {
    const link = document.createElement('a');
    link.href = ctaElement.href;
    link.textContent = ctaElement.textContent.trim();
    contentCell.appendChild(link);
  } else {
    console.warn('CTA element is missing!');
  }

  // Validate contentCell is not empty
  if (!contentCell.hasChildNodes()) {
    console.error('No content found to populate the table cell!');
  }

  contentRow.push(contentCell);

  const cells = [headerRow, contentRow];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}