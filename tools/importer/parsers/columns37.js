export default function parse(element, { document }) {
  // Extract and create the table header
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract content from the first column (text content)
  const headlineElement = element.querySelector('h2.b01__headline');
  const headline = headlineElement ? headlineElement.cloneNode(true) : document.createTextNode('');

  const richTextElement = element.querySelector('div.b02__rich-text');
  const richText = richTextElement ? richTextElement.cloneNode(true) : document.createTextNode('');

  const column1 = document.createElement('div');
  column1.append(headline, richText);

  // Extract content from the second column (image)
  const imageElement = element.querySelector('img.b06__image');
  const image = imageElement ? imageElement.cloneNode(true) : document.createTextNode('');

  const column2 = document.createElement('div');
  column2.append(image);

  // Create the table rows and cells
  const cells = [
    headerRow,
    [column1, column2],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}