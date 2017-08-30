import { amount } from '../common/format';

const Details = (data) => {
  const { strings } = data;
  let html = `<table>`;

  if (strings.message) {
    html += `<tr><td colspan="2">${strings.message}</td></tr>`;
  }

  if (data.total) {
    html += `
      <tr class="receipt-strong">
        <td class="">${strings.charged}</td>
        <td class="align-right">${data.currencySymbol} ${amount(data.total)}</td>
      </tr>
    `;
  }
  if (data.id) {
    html += `
      <tr>
        <td class="">${strings["order-number"]}</td>
        <td class="align-right">#${data.id}</td>
      </tr>
    `;
  }
  if (data.date) {
    html += `
      <tr>
        <td class="">${strings.date}</td>
        <td class="align-right">${new Date(data.date).toLocaleString(strings.langCode)}</td>
      </tr>
    `;
  }

  html += `</table>`;
  return html;
}

export default Details;
