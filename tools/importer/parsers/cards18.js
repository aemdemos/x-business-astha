/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Add header row
  const headerRow = ['Cards'];
  cards.push(headerRow);

  // Process all partner cards
  const partnerElements = element.querySelectorAll('.sp05__partner');
  partnerElements.forEach(partner => {
    const cardData = [];

    // Extract image
    const imageElement = partner.querySelector('.sp07__media-image');
    if (imageElement) {
      const image = document.createElement('img');
      image.src = imageElement.src;
      image.alt = imageElement.alt || ''; // Handle missing alt attribute
      image.title = imageElement.title || ''; // Handle missing title attribute
      cardData.push(image);
    }

    // Extract text content
    const textCellContent = [];

    // Extract headline
    const headlineElement = partner.querySelector('.sp07__headline');
    if (headlineElement) {
      const headline = document.createElement('h3');
      headline.textContent = headlineElement.textContent.trim();
      textCellContent.push(headline);
    }

    // Extract description
    const descriptionElement = partner.querySelector('.sp07__copy > p');
    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent.trim();
      textCellContent.push(description);
    }

    // Extract CTA
    const ctaElement = partner.querySelector('.sp07__cta-copy a');
    if (ctaElement) {
      const ctaLink = document.createElement('a');
      ctaLink.href = ctaElement.href;
      ctaLink.textContent = ctaElement.textContent.trim();
      textCellContent.push(ctaLink);
    }

    cardData.push(textCellContent);

    // Add card to table
    cards.push(cardData);
  });

  const block = WebImporter.DOMUtils.createTable(cards, document);
  element.replaceWith(block);
}