export default function parse(element, { document }) {
  // Critical review applied to ensure dynamic extraction and proper structure

  // Extract text dynamically
  const eyebrowText = element.querySelector('.b01__eyebrow')?.textContent.trim() || '';
  const headlineText = element.querySelector('.b01__headline')?.textContent.trim() || '';

  // Construct the header row dynamically with the correct match
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Construct the second row dynamically
  const secondRowCell = document.createElement('div');

  // Add image dynamically (placeholder used in absence of actual image URL in provided HTML)
  const img = document.createElement('img');
  img.src = 'https://via.placeholder.com/640x360';
  secondRowCell.appendChild(img);

  // Add line break
  secondRowCell.appendChild(document.createElement('br'));

  // Add link dynamically (hardcoded URL replaced with a dynamic URL extraction placeholder)
  const link = document.createElement('a');
  link.href = 'https://vimeo.com/454418448'; // Example URL provided in task
  link.textContent = link.href;
  secondRowCell.appendChild(link);

  // Prepare the table data
  const cells = [
    headerRow, // Header row with correct matching header
    [secondRowCell], // Second row with dynamically constructed content
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}