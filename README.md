# Spaaza Receipt Component

The receipt component is a standard way to render a receipt using data from the Spaaza receipts service.

## Development

To install project dependencies run:

``` yarn ```

Open receipt.html in a browser to test. No hot-reload right now.

### Build production bundle

``` yarn build ```

### How to use

Include the receipt JS in your site:

``` <script src="https://my-domain/js/spaaza-receipt.js"></script> ```

Then when you get receipt data from the Spaaza API, provide it to a spaaza-receipt component:

```
<spaaza-receipt>
  <script type="application/json" data-receipt>
    Insert the receipt JSON here as the only contents of this script element.
  </script>
</spaaza-receipt>
```

Note the `data-receipt` attribute on the script element, it is mandatory.

### Setting the Language

You can specify the language the component should use by adding a `language` attribute to the component:

```
<spaaza-receipt language="nl">...</spaaza-receipt>
```

You may specify a language by its country code or a full language code like `nl-NL`.

The default language is `en-GB`. Currently `en-GB` and `nl-NL` are provided.

### Overriding Specific Strings

If you wish you can further customize the language used in the component by providing an optional second
JSON script element with any overrides. For the format of the strings JSON see the src/lang directory.

```
<spaaza-receipt language="en">
  <script type="application/json" data-receipt>...</script>
  <script type="application/json" data-strings>
  {
    "brand": { "title": "My Receipt" }
  }
  </script>
</spaaza-receipt>
```

Note again the special mandatory attribute on the script element, this time: `data-strings`.
You can override as few or as many of the pre-provided strings as needed.
