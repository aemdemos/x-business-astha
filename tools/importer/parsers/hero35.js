export default function parse(element, { document }) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';

    const contentArray = [];

    // Extract the title
    const titleElement = element.querySelector('.c01__headline');
    if (titleElement) {
        const titleHeading = document.createElement('h1');
        titleHeading.textContent = titleElement.textContent.trim();
        contentArray.push(titleHeading);
    }

    // Extract the subtitle
    const subtitleElement = element.querySelector('.c01__subtitle');
    if (subtitleElement) {
        const subtitleParagraph = document.createElement('p');
        subtitleParagraph.textContent = subtitleElement.textContent.trim();
        contentArray.push(subtitleParagraph);
    }

    // Extract the call-to-action button
    const ctaElement = element.querySelector('.b03__button');
    if (ctaElement) {
        const ctaLink = document.createElement('a');
        ctaLink.textContent = ctaElement.textContent.trim();
        ctaLink.href = ctaElement.href;
        contentArray.push(ctaLink);
    }

    // Generate the table
    const cells = [headerRow, [contentArray]];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}