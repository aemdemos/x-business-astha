export default function parse(element, { document }) {
  const blockName = "Embed";

  // Find all slides in the carousel
  const slides = Array.from(element.querySelectorAll('.ct06__slide'));

  const rows = slides.map(slide => {
    const titleElement = slide.querySelector('h5');
    const imageElement = slide.querySelector('img');

    // Extract title
    const title = titleElement ? titleElement.textContent.trim() : "";
    
    // Extract image URL
    const imageUrl = imageElement ? imageElement.getAttribute('data-src') || imageElement.getAttribute('src') : "";

    // Build the content for this slide
    const content = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;

    const imageDiv = document.createElement('img');
    imageDiv.src = imageUrl;

    content.appendChild(titleDiv);
    content.appendChild(imageDiv);

    return [content];
  });

  // Create header row with exact header text
  const headerCell = document.createElement('strong');
  headerCell.textContent = blockName;
  const headerRow = [headerCell];
  rows.unshift(headerRow);

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}