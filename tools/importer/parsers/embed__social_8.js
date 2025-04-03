export default function parse(element, { document }) {
  // Helper function to extract iframe URLs from tweets
  const extractTweetUrl = (tweetElement) => {
    const iframe = tweetElement.querySelector('iframe');
    return iframe ? iframe.src : null;
  };

  // Find all tweet elements in the given element
  const tweetElements = element.querySelectorAll('.tw10-embedded-tweet__item');

  // Create table rows
  const rows = [];

  // Add the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Add rows for each tweet URL
  tweetElements.forEach((tweetElement) => {
    const url = extractTweetUrl(tweetElement);
    if (url) {
      rows.push([url]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}