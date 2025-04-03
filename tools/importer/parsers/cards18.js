export default function parse(element, { document }) {
  // Create the header row dynamically
  const blockHeader = [document.createElement('strong')];
  blockHeader[0].textContent = 'Cards';

  // Generate rows by iterating over each partner element
  const rows = Array.from(element.querySelectorAll('.sp05__partner')).map((partnerElement) => {
    // Extract image dynamically
    const imgElement = partnerElement.querySelector('.sp07__media img');
    const img = document.createElement('img');
    img.src = imgElement ? imgElement.getAttribute('src') : '';
    img.alt = imgElement ? imgElement.getAttribute('alt') : '';

    // Extract title dynamically
    const titleElement = partnerElement.querySelector('.sp07__headline');
    const title = document.createElement('strong');
    title.textContent = titleElement ? titleElement.textContent : '';

    // Extract description dynamically
    const descriptionElement = partnerElement.querySelector('.sp07__copy p');
    const description = document.createElement('p');
    description.textContent = descriptionElement ? descriptionElement.textContent : '';

    // Extract link dynamically and fix newlines issue
    const linkElement = partnerElement.querySelector('.sp07__cta-copy a');
    const link = document.createElement('a');
    if (linkElement) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent.trim(); // Remove extra newlines or spaces
    }

    // Combine title, description, and link into text cell
    const textCell = [title, description, linkElement ? link : ''];

    // Return the row with image and text cell
    return [img, textCell];
  });

  // Combine header and rows into table structure
  const tableData = [blockHeader, ...rows];

  // Create the block table using createTable function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}