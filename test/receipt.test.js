import Receipt from '../src/receipt.js'
import ReceiptData from './mock/Receipt.json'

describe('Test Receipts WebComponent', function() {

  it('should get working with no object', function() {
    var spaazaReceipt = document.createElement('spaaza-receipt');
    expect(spaazaReceipt.innerHTML).toEqual('<div>working....</div>');
  });

  it('should show data if we assign a value.', function() {

    let dataElement = document.createElement('pre');
    dataElement.id = "data";
    dataElement.innerHTML = ReceiptData;

    let spaazaReceipt = document.createElement('spaaza-receipt');
    spaazaReceipt.appendChild(dataElement);

    const spans = spaazaReceipt.getElementsByTagName('table');
    expect(spans.length).toEqual(6);
  });

});
