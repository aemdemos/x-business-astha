export default function parse(element, { document }) {
  const extractCards = (container) => {
    const cards = [];
    container.querySelectorAll('div.card').forEach((card) => {
      const image = card.querySelector('img');
      const title = card.querySelector('h3');
      const description = card.querySelector('p');

      const cardContent = [];
      if (title) {
        const titleElem = document.createElement('strong');
        titleElem.textContent = title.textContent;
        cardContent.push(titleElem);
      }
      if (description) {
        cardContent.push(document.createTextNode(description.textContent));
      }
      cards.push([image, cardContent]);
    });
    return cards;
  };

  const blockHeader = [document.createElement('strong')];
  blockHeader[0].textContent = 'Cards';

  const cardsData = extractCards(element);
  const tableData = [blockHeader, ...cardsData];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}