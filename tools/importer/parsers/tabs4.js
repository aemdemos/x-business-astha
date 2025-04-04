/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['<strong>Tabs</strong>'];

    // Extract relevant paragraphs and links
    const paragraphs = Array.from(element.querySelectorAll('p'));

    // Handle edge cases for missing paragraphs
    const tabOneContent = paragraphs[0] ? paragraphs[0] : document.createElement('p');
    const tabTwoContent = paragraphs[1] ? paragraphs[1] : document.createElement('p');

    // Prepare tab content
    const tabOne = document.createElement('div');
    tabOne.appendChild(tabOneContent);

    const tabTwo = document.createElement('div');
    tabTwo.appendChild(tabTwoContent);

    const cells = [
        headerRow,
        ['Tab One', tabOne],
        ['Tab Two', tabTwo],
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}