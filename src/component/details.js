import { amount, entities } from '../common/format';

/**
 * Show an overview of the receipt as a header.
 * @type {Component}
 */
const Details = (data, strings, langCode) => {
  let html = `<table>`;

  if (strings.message) {
    html += `<tr><td colspan="2">${strings.message}</td></tr>`;
  }

  if (data.total) {
    html += `
      <tr class="receipt-strong">
        <td class="">${strings.charged}</td>
        <td class="align-right">${amount(data.total, data.currencySymbol)}</td>
      </tr>
    `;
  }
  if (data.id) {
    html += `
      <tr>
        <td class="">${strings["order-number"]}</td>
        <td class="align-right">#${entities(data.id)}</td>
      </tr>
    `;
  }
  if (data.date) {
    html += `
      <tr>
        <td class="">${strings.date}</td>
        <td class="align-right">${entities(new Date(data.date).toLocaleString(langCode))}</td>
      </tr>
    `;
  }

  html += `</table>`;
  return html;
}

export default Details;
