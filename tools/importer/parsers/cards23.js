export default function parse(element, { document }) {
  const cardsContent = [];

  // Extracting cards
  element.querySelectorAll('.src__DropShadow-cBpPHk').forEach(card => {
    const image = card.querySelector('.src__BgImageElement-fYJUKT') || card.querySelector('img');
    const title = card.querySelector('h3')?.textContent;
    const description = card.querySelector('p')?.textContent;

    if (image && title && description) {
      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';

      const titleElement = document.createElement('strong');
      titleElement.textContent = title;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;

      cardsContent.push([imageElement, [titleElement, descriptionElement]]);
    }
  });

  // Create table data
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const tableData = [
    [headerCell],
    ...cardsContent
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element
  element.replaceWith(blockTable);
}