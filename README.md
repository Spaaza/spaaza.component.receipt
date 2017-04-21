# Spaaza Receipt Component

Render a Spaaza Receipt

### About

The main goal is to provide an easy way to render a Receipt in a web context.

The component was build using [CustomElements API](https://w3c.github.io/webcomponents/spec/custom/) and [ShadowDOM API](https://w3c.github.io/webcomponents/spec/shadow/).

* Test01: http://receipt-test01.component.spaaza.com/v1.1.0
* Prod: http://receipt.component.spaaza.com/v1.1.0


## Development

To install project dependencies run:

``` npm install ```

### Run development flow

To run development with webpack and hot reload:

``` npm run dev ```

### Test

Run tests

``` npm run test ```

### Build production bundle

Will minimize and optimize the bundle for live environments

``` npm run build ```

### Demo

There is available a [live demo](http://receipt-test01.component.spaaza.com/1.1.0) of the component.

### How to use

First need to include the component source code: `@TODO: Provide a better URL through CDN`

```
<script src="http://receipt-test01.component.spaaza.com/1.1.0/receipt-v1.1.0.js"></script>
```
Get receipt data from Spaaza API `@TODO: Add reference to API`
Then in your HTML site or app use:
```
<spaaza-receipt>
  <data>
    {
      ... INSERT RECEIPT API RESPONSE HERE ...
    }
  </data>
</spaaza-receipt>
```

#### Example
```
<!-- define component -->
<spaaza-receipt>
  <data>
    {
    "id": "123456",
    "timestamp": "2017-02-08T12:26:01",
    "quantity": 3,
    "subtotal": 500,
    "total_value": 499.99,
    "payment_method": "PIN",
    "line_items": [
      {
        "name": "Lee Jeans",
        "description": "Limited edition 2017",
        "type": "",
        "original_price": 144.99,
        "quantity": 1,
        "sale_price": 144.99,
        "vouchers": 0,
        "metadata": {
          "color": "blue",
          "size": "44",
          "image": "http://images.lee.com/is/image/Lee/2011264-ALT5"
        },
        "sale_discount": ""
      },
      {
        "name": "Necklace",
        "description": "Golden",
        "type": "",
        "original_price": 49.99,
        "quantity": 1,
        "sale_price": 49.99,
        "vouchers": 0,
        "metadata": {
          "color": "gold",
          "size": "M",
          "image": ""
        },
        "sale_discount": ""
      },
      {
        "name": "Cotton T-Shirt",
        "description": "100% Natural",
        "type": "",
        "original_price": 94.99,
        "quantity": 1,
        "sale_price": 94.99,
        "vouchers": 0,
        "metadata": {
          "color": "white",
          "size": "S",
          "image": ""
        },
        "sale_discount": ""
      }
    ],
    "tax_lines": [
      {
        "tax_value": 30.25,
        "order_value": 100.99,
        "rate": 0.21
      },
      {
        "tax_value": 20.55,
        "order_value": 99.99,
        "rate": 0.06
      },
      {
        "tax_value": 19.99,
        "order_value": 200,
        "rate": 1.5
      }
    ],
    "chain": {
      "id": 8989898,
      "name": "Vera Moda",
      "email": "info@spaaza.com",
      "logo_url": "https://www.placemontrealtrust.com/media/stores/logos/VeroModa-vetements-femmes-women-clothing-logo.svg",
      "website_url": "http://www.veramoda.com",
      "currency": "Euro",
      "currency_symbol": "€",
      "business": {
        "id": 77666525,
        "name": "Vera Moda Herengracht",
        "address": {
          "address_1": "Herengracht 504",
          "address_2": "",
          "address_3": "",
          "towncity": "Amsterdam",
          "postal_code": "1011AB",
          "country_code": "",
          "location": {
            "lat": 0,
            "lon": 0
          }
        },
        "phone_number": "+312773874",
        "email": "herengracht@veramoda.com",
        "website_url": "http://www.veramod.com/herengracht"
      }
    },
    "shopper": {
      "id": 9877111,
      "user_name": "",
      "entity_code": "",
      "first_name": "hossein",
      "last_name": "kazemi",
      "country_code": "NL",
      "gender": "M",
      "birthday": "10/10/74",
      "total_points_balance": 0,
      "email": "hossein.kazemi@spaaza.com",
      "shipping_address": {
        "address_1": "Vijzelstraat 221",
        "address_2": "",
        "address_3": "",
        "towncity": "Amsterdam",
        "postal_code": "1222AB",
        "country_code": "",
        "location": {
          "lat": 0,
          "lon": 0
        }
      },
      "billing_address": {
        "address_1": "Vijzelstraat 221",
        "address_2": "",
        "address_3": "",
        "towncity": "Amsterdam",
        "postal_code": "1222AB",
        "country_code": "",
        "location": {
          "lat": 0,
          "lon": 0
        }
      }
    },
    "Receipt": {
      "download_url": "https://s3-eu-west-1.amazonaws.com/spaaza-events-service-dev/receipts/123456.pdf",
      "template_content": {
        "subject": "",
        "background_color": ""
      }
    }
  }
  </data>
</spaaza-receipt>

<!-- attach component -->
<script src="http://receipt-test01.component.spaaza.com/1.1.0/receipt-v1.1.0.js"></script>
```
