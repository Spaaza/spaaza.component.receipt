# Receipt component

### Install

  `npm install spaaza-receipt --save`

### Use

```
<link href="path/to/component/receipt.html" />
```

```
<spaaza-receipt>
  <pre id="data">
    {
      "Id": "13245678",
      "Timestamp": "2017-02-08 12:26:01",
      "DownloadUrl": "https://sercives.spaaza.com/dowload?receipt_id=13245678",
      "Quantity": 2,
      "Subtotal": 140,
      "TotalValue": 141.96,
      "PaymentMethod": "MasterCard **** 3401",

      "Currency": "EUR",
      "CurrencySymbol": "€",

      "LineItems": [
        {
          "Name": "Anvil with box",
          "Description": "Best anvil is ACME, comes with original wooden box and instructions in all cristian languages.",
          "DistinguisherType": "id",
          "DistinguisherValue": "123456789",
          "OriginalPrice": 84,
          "Quantity": 1,
          "SalePrice": 60,
          "Points": 6,
          "Vouchers": 0,
          "Currency": "EUR",
          "CurrencySymbol": "€",
          "Metadata": {
            "Color": "Metal",
            "Size": "Medium",
            "Image": "https://s-media-cache-ak0.pinimg.com/736x/c9/21/f5/c921f5b5e2f84ea22ccae85e0fad9a72.jpg"
          }
        }, {
          "Name": "Rocket powered rollerskates",
          "Description": "Why rollerskate when you can rocketskate! Ideal to jump over cliffs or over hard/sharp objects.",
          "DistinguisherType": "id",
          "DistinguisherValue": "234567891",
          "OriginalPrice": 110,
          "Quantity": 1,
          "SalePrice": 80,
          "Points": 8,
          "Vouchers": 0,
          "Currency": "EUR",
          "CurrencySymbol": "€",
          "Metadata": {
            "Color": "Red",
            "Size": "Medium",
            "Image": "https://img1.etsystatic.com/051/0/8917543/il_570xN.665890621_50he.jpg"
          }
        }
      ],
      "LineTaxes": [
        {
          "Currency": "EUR",
          "CurrencySymbol": "€",
          "Rate": "10%",
          "OrderValue": 100,
          "TaxCalue": 10
        }, {
          "Currency": "EUR",
          "CurrencySymbol": "€",
          "Rate": "",
          "OrderValue": 196.70,
          "TaxValue": 1.96
        }, {
          "Currency": "EUR",
          "CurrencySymbol": "€",
          "Rate": "",
          "OrderValue": 296.70,
          "TaxValue": 11.96
        }
      ],

      "ChainId": 12345678,
      "ChainName": "ACME",
      "Address1": "Herengratch 504",
      "Address2": "",
      "Address3": "",
      "Towncity": "Amsterdam",

      "CustomerId": "1",
      "FirstName": "Bugs",
      "LastName": "Bunny",
      "CustomerEmail": "bugsbunny@looneytunes.com"

    }
  </pre>
</spaaza-receipt>
```


## Dev

  `npm run dev`

## Build

  `npm run build`

## Test

  `npm run test`
