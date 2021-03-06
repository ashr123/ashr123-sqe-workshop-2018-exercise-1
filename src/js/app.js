import $ from 'jquery';
import * as codeAnalyzer from './code-analyzer';

function createTable(tableData) {
    const table = document.createElement('table'), tableBody = document.createElement('tbody');
    let row = document.createElement('tr');
    table.border = 1;
    for (const element of ['Line', 'Type', 'Name', 'Condition', 'Value']) {
        const header = document.createElement('th');
        header.appendChild(document.createTextNode(element));
        row.append(header);
    }
    tableBody.append(row);
    for (const rowData of tableData) {
        row = document.createElement('tr');
        for (const cell of Object.values(rowData)) {
            const data = document.createElement('td');
            data.appendChild(document.createTextNode(cell));
            row.appendChild(data);
        }
        tableBody.appendChild(row);
    } table.appendChild(tableBody); $('#myTable').empty(); $('#myTable').append(table);
}

$(document).ready(() => {
    $('#codeSubmissionButton').click(() => {
        const codeToParse = $('#codePlaceholder').val(),
            parsedCode = codeAnalyzer.parseCode(codeToParse);
        createTable(parsedCode.table);
        $('#parsedCode').val(JSON.stringify(parsedCode.code, null, 2));
    });
});