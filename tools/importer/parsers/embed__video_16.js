export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Dynamically extract the video URL and image source from the element
  const videoLinkElement = element.querySelector('a');
  const videoImageElement = element.querySelector('img');

  const image = videoImageElement ? videoImageElement.cloneNode(true) : document.createElement('img');
  image.alt = videoImageElement ? videoImageElement.alt || 'Video thumbnail' : 'Video thumbnail';

  const link = videoLinkElement ? document.createElement('a') : document.createElement('span');
  link.href = videoLinkElement ? videoLinkElement.href : '#';
  link.textContent = videoLinkElement ? videoLinkElement.href : 'No link available';

  // Build the table data array
  const tableData = [
    headerRow,
    [image, link],
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, { document });

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}