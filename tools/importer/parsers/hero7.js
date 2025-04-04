/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Hero'];

    // Safely extracting title
    const titleElement = element.querySelector('.b02-rich-text p');
    const title = document.createElement('h1');
    if (titleElement) {
        title.innerHTML = titleElement.innerHTML;
    }

    // Safely extracting button
    const buttonElement = element.querySelector('.b03__button');
    const buttonLink = document.createElement('a');
    if (buttonElement) {
        buttonLink.href = buttonElement.getAttribute('href') || '#';
        buttonLink.textContent = buttonElement.textContent.trim();
    }

    // Building content row
    const contentRow = [];
    if (title.innerHTML) {
        const combinedContent = document.createElement('div');
        combinedContent.appendChild(title);
        if (buttonLink.textContent) combinedContent.appendChild(buttonLink);
        contentRow.push(combinedContent);
    }

    const cells = [headerRow, contentRow];
    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
}