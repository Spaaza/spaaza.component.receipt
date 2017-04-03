# Spaaza Receipt Component

Render a Spaaza Receipt

### About

The main goal is to provide an easy way to render a Receipt in a web context.

The component was build using [CustomElements API](https://w3c.github.io/webcomponents/spec/custom/) and [ShadowDOM API](https://w3c.github.io/webcomponents/spec/shadow/). It uses [Handlebars](http://handlebarsjs.com/) for templating.

### Demo

There is available a [live demo](https://s3-eu-west-1.amazonaws.com/receipt-component-test01-spaaza-com/index.html) of the component.

### How to use

First need to include the component source code:
`TODO: Provide a better URL through CDN`

```
<script src="https://s3-eu-west-1.amazonaws.com/receipt-component-test01-spaaza-com/receipt-v1.0.0.js"></script>
```
Get receipt data from Spaaza API `TODO: Add reference to API`
Then in your HTML site or app use:
```
<spaaza-receipt>
  <code id="data">
    {
      ... INSERT RECEIPT API RESPONSE HERE ...
    }
  </code>
</spaaza-receipt>
```

#### Full example
```
<spaaza-receipt>
  <code id="data">
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
  </code>
</spaaza-receipt>
```


## Development

To install project dependencies run:

``` npm install ```

### Run development flow

To run development with webpack and hot reload:

``` npm run dev ```

### Test

Run karma tests

``` npm run test ```

### Build production bundle

Will minimize and optimize the bundle for live environments

``` npm run build ```
