export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract background image source
  const pictureElement = element.querySelector('.ct01__background picture');
  const backgroundImg = pictureElement?.querySelector('source:last-of-type')?.srcset || 
                        pictureElement?.querySelector('img')?.dataset.src;
  const bgImage = backgroundImg ? document.createElement('img') : null;
  if (bgImage) {
    bgImage.src = backgroundImg;
    bgImage.alt = '';
  }

  // Extract title/headline
  const headlineElement = element.querySelector('.b01__headline');
  const headline = headlineElement ? document.createElement('h1') : null;
  if (headline && headlineElement.textContent.trim()) {
    headline.textContent = headlineElement.textContent.trim();
  }

  // Extract call-to-action buttons
  const buttons = [];
  element.querySelectorAll('.b03__button').forEach((buttonElement) => {
    const button = document.createElement('a');
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent.trim();
    buttons.push(button);
  });

  // Combine extracted elements into a single cell
  const contentRow = [document.createElement('div')];
  if (bgImage) contentRow[0].append(bgImage);
  if (headline) contentRow[0].append(headline);
  buttons.forEach((button) => contentRow[0].append(button));

  // Create table data
  const tableData = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}