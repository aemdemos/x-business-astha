export default function parse(element, { document }) {
  const cardsData = [];

  // Extract chapters and sections
  const chapters = element.querySelectorAll('.ct07__content-item');

  chapters.forEach((chapter) => {
    const cards = chapter.querySelectorAll('.ct01__column');

    cards.forEach((card) => {
      const cardContent = [];

      // Extract title
      const titleElement = card.querySelector('.b01__headline');
      const title = titleElement ? titleElement.textContent.trim() : '';
      if (title) {
        const titleNode = document.createElement('strong');
        titleNode.textContent = title;
        cardContent.push(titleNode);
      }

      // Extract description
      const descriptionElement = card.querySelector('.b02__rich-text');
      const description = descriptionElement ? descriptionElement.textContent.trim() : '';
      if (description) {
        const descriptionNode = document.createElement('p');
        descriptionNode.textContent = description;
        cardContent.push(descriptionNode);
      }

      // Extract call-to-action link and text
      const callToActionElement = card.querySelector('.b03__button');
      const callToActionLink = callToActionElement ? callToActionElement.href : '';
      const callToActionText = callToActionElement ? callToActionElement.textContent.trim() : '';
      if (callToActionLink && callToActionText) {
        const callToActionNode = document.createElement('a');
        callToActionNode.href = callToActionLink;
        callToActionNode.textContent = callToActionText;
        cardContent.push(callToActionNode);
      }

      // Add non-empty rows only
      if (cardContent.length > 0) {
        cardsData.push(cardContent); // Fix structure to include all content in one row per card
      }
    });
  });

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];

  // Combine header and rows into table content
  const tableContent = [headerRow, ...cardsData.map(row => [row])];

  // Use the helper function to create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}