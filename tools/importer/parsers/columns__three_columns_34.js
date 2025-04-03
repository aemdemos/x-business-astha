export default function parse(element, { document }) {
  // Extract relevant content
  const columns = [...element.querySelectorAll('.ct01__column')];

  const columnData = columns.map((col) => {
    const texts = [...col.querySelectorAll('div.b02__rich-text')];
    const extractedContent = [];

    texts.forEach((textBlock) => {
      const titleElement = textBlock.querySelector('h5');
      const paragraphElement = textBlock.querySelector('p');

      if (titleElement) {
        const title = document.createElement('h5');
        title.innerHTML = titleElement.innerHTML.trim();
        extractedContent.push(title);
      }

      if (paragraphElement) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = paragraphElement.innerHTML.trim();
        extractedContent.push(paragraph);
      }
    });

    return extractedContent;
  });

  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  const tableData = [
    headerRow,
    columnData.map((content) => {
      const cell = document.createElement('div');
      cell.append(...content);
      return cell;
    }),
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}