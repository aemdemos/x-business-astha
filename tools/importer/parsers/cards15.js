export default function parse(element, { document }) {
  // Extract data from the input element
  const cards = element.querySelectorAll('.ct01__item .t03');

  const rows = [];

  // Header row for the block
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Process each card and extract relevant details
  cards.forEach((card) => {
    const imageElement = card.querySelector('.t03__img');
    const imageSrc = imageElement ? imageElement.getAttribute('data-src') : '';
    const imageAlt = imageElement ? imageElement.getAttribute('alt') : '';

    const titleElement = card.querySelector('.t03__label p');
    const titleText = titleElement ? titleElement.textContent.trim() : '';

    const descriptionElement = card.querySelector('.t03__body-content div');
    const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

    const linkElement = card.closest('.t03__card-link');
    const linkHref = linkElement ? linkElement.getAttribute('href') : '';

    // Create the card content
    const image = imageSrc ? document.createElement('img') : document.createTextNode('');
    if (imageSrc) {
      image.src = imageSrc;
      image.alt = imageAlt;
    }

    const title = titleText ? document.createElement('strong') : document.createTextNode('');
    if (titleText) {
      title.textContent = titleText;
    }

    const description = descriptionText ? document.createElement('p') : document.createTextNode('');
    if (descriptionText) {
      description.textContent = descriptionText;
    }

    const link = linkHref ? document.createElement('a') : document.createTextNode('');
    if (linkHref) {
      link.href = linkHref;
      link.textContent = linkHref;
    }

    rows.push([image, [title, description, link]]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}