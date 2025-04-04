/* global WebImporter */
export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract relevant content
    const headlineElement = element.querySelector('.b01__headline');
    const headline = headlineElement ? headlineElement.textContent.trim() : '';

    const richTextElement = element.querySelector('.b02__rich-text');
    const richTextContent = richTextElement ? richTextElement.innerHTML.trim() : '';

    const imageElement = element.querySelector('img[data-src]');
    const imageSrc = imageElement ? imageElement.getAttribute('data-src') : '';
    const imageAlt = imageElement ? imageElement.getAttribute('alt') || '' : '';

    // Create structured table
    const headerRow = ['Carousel'];
    const contentRows = [
        [
            createImageCell(imageSrc, imageAlt, document),
            createRichTextCell(headline, richTextContent, document),
        ]
    ];

    const tableData = [headerRow, ...contentRows];
    const blockTable = createTable(tableData, document);

    // Replace original element
    element.replaceWith(blockTable);

    function createImageCell(src, alt, doc) {
        if (!src) return '';
        const img = doc.createElement('img');
        img.src = src;
        img.alt = alt;
        return img;
    }

    function createRichTextCell(title, content, doc) {
        const wrapper = doc.createElement('div');

        if (title) {
            const heading = doc.createElement('h5');
            heading.textContent = title;
            wrapper.appendChild(heading);
        }

        if (content) {
            const contentParagraph = doc.createElement('div');
            contentParagraph.innerHTML = content;
            wrapper.appendChild(contentParagraph);
        }

        return wrapper;
    }
}