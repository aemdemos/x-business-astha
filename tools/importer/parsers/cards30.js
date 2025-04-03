export default function parse(element, { document }) {
  const cards = [];

  // Header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cards.push(headerRow);

  // Extract card data from the element
  const cardElements = element.querySelectorAll('.ct01__wrapper');

  cardElements.forEach((cardElement) => {
    const imageElement = cardElement.querySelector('img');
    const titleElement = cardElement.querySelector('h2');
    const descriptionElement = cardElement.querySelector('p');

    const image = imageElement ? imageElement.cloneNode(true) : null;
    const title = titleElement ? titleElement.textContent : '';
    const description = descriptionElement ? descriptionElement.textContent : '';

    const textContent = document.createElement('div');
    if (title) {
      const titleNode = document.createElement('strong');
      titleNode.textContent = title;
      textContent.appendChild(titleNode);
      textContent.appendChild(document.createElement('br'));
    }
    if (description) {
      const descriptionNode = document.createTextNode(description);
      textContent.appendChild(descriptionNode);
    }

    const cardRow = [image, textContent];
    cards.push(cardRow);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cards, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}