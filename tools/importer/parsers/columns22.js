export default function parse(element, { document }) {
  const slides = element.querySelectorAll('.ct06__slide');
  const rows = [];

  // Header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';
  rows.push(headerRow);

  slides.forEach(slide => {
    const imgElement = slide.querySelector('picture img');
    if (imgElement) {
      const img = document.createElement('img');
      img.src = imgElement.dataset.src || imgElement.src;
      img.alt = imgElement.alt;
      rows.push([img]);
    }
  });

  // Handling edge cases: Ensure rows are properly populated
  if (rows.length === 1) {
    // No content extracted; add a placeholder row
    const placeholderRow = [document.createElement('span')];
    placeholderRow[0].textContent = 'No content available';
    rows.push(placeholderRow);
  }

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}