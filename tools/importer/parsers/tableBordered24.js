/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Table (bordered)'];

    const listItems = Array.from(element.querySelectorAll('.ct12__list-item a'));

    const rows = listItems.map((item) => {
        const linkText = item.textContent.trim();
        const linkElement = document.createElement('a');
        linkElement.href = item.href;
        linkElement.textContent = linkText;

        return [linkElement];
    });

    const tableData = [
        headerRow,
        ...rows,
    ];

    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table);
}