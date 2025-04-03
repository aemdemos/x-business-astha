export default function parse(element, { document }) {
  // Helper Function to create a new table block
  const createTableBlock = (dataRows) => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Source Information';
    const headerRow = [headerCell];

    const tableData = [headerRow, ...dataRows];

    return WebImporter.DOMUtils.createTable(tableData, document);
  };

  // Extracts the content from the rich-text section
  const richTextElement = element.querySelector('.b02__rich-text');
  const paragraphs = richTextElement ? Array.from(richTextElement.querySelectorAll('p')) : [];

  // Prepare data rows for the table
  const dataRows = paragraphs.map((p) => {
    const supElement = p.querySelector('sup');
    const supText = supElement ? supElement.outerHTML : '';
    const content = p.innerHTML.replace(supText, '').trim();
    const span = document.createElement('span');
    span.innerHTML = supText + ' ' + content;
    return [span];
  });

  // Create the new table block
  const newTableBlock = createTableBlock(dataRows);

  // Replace the original element with the new table block
  element.replaceWith(newTableBlock);
}