export default function parse(element, { document }) {
  // Extract column data from the HTML structure
  const columns = element.querySelectorAll('.ct01__column');

  const columnData = Array.from(columns).map((column) => {
    const wrapper = column.querySelector('.ct01__wrapper');
    const richText = wrapper.querySelector('.b02-rich-text');
    const statistic = wrapper.querySelector('.b16__text');

    const content = [];

    if (richText) {
      const richTextContent = richText.innerHTML.trim();
      const divElem = document.createElement('div');
      divElem.innerHTML = richTextContent;
      content.push(divElem);
    }

    if (statistic) {
      const statisticText = statistic.textContent.trim();
      const divElem = document.createElement('div');
      divElem.textContent = statisticText;
      content.push(divElem);
    }

    return content.length > 0 ? content : [document.createElement('div')]; // Ensure meaningful placeholder content
  });

  // Ensure the table has exactly three columns
  while (columnData.length < 3) {
    const emptyCell = document.createElement('div');
    emptyCell.textContent = 'Content not available'; // Meaningful placeholder for missing columns
    columnData.push([emptyCell]);
  }

  // Create the table structure with correct header row
  const headerRow = ['Columns']; // Use plain text for the header row

  const cells = [
    headerRow,
    columnData,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}