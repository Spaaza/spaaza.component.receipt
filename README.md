# Spaaza Receipt Component

A web component that renders a Spaaza Receipt.

### About

The main goal is to provide an easy way to render a Receipt in a web context.
The component uses the [CustomElements API](https://w3c.github.io/webcomponents/spec/custom/) and the [ShadowDOM API](https://w3c.github.io/webcomponents/spec/shadow/).

## Development

To install project dependencies run:

``` yarn ```

### Run development flow

To run development with webpack and hot reload:

``` yarn start ```

### Test

Run tests

``` yarn test ```

### Build production bundle

Will minimize and optimize the bundle for live environments

``` yarn build ```

### How to use

```
<script src="http://my-domain/js/receipt-v1.2.0.js"></script>
```
Get receipt data from the Spaaza API and provide it inside a spaaza-receipt component:
```
<spaaza-receipt>
  <script id="data" type="application/json">
    {
      ... INSERT RECEIPT API JSON RESPONSE HERE ...
    }
  </script>
</spaaza-receipt>
```
