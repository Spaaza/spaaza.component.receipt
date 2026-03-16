# Spaaza Receipt Component

A web component that renders a receipt using data from the Spaaza receipts service. Built with Svelte 5 and compiled as a custom element (`<spaaza-receipt>`).

## Development

Install dependencies:

```
pnpm install
```

Build:

```
pnpm build
```

Build with watch mode:

```
pnpm dev
```

Open the test HTML files in `test/` in a browser to verify the component visually.

## Usage

Include the receipt JS in your site:

```html
<script src="https://my-domain/js/spaaza-receipt.js"></script>
```

Add a `<spaaza-receipt>` element and set its `receipt` and optionally `strings` properties via JavaScript:

```html
<spaaza-receipt id="receipt" language="en"></spaaza-receipt>
<script>
    const el = document.getElementById("receipt");
    el.receipt = { /* receipt JSON from the Spaaza API */ };
    el.strings = { "brand": { "title": "My Receipt" } };
</script>
```

### Attributes

| Attribute | Type | Default | Description |
|---|---|---|---|
| `language` | string | `"en-GB"` | Language code (e.g. `"nl"`, `"nl-NL"`, `"en-GB"`) |
| `showpoints` | string | `"true"` | Set to `"false"` to hide the points wallet |
| `walletpointsratio` | string | `""` | Ratio to convert monetary wallet values to points |
| `customnotes` | string | `""` | Custom notes to display on the receipt |

### Properties

| Property | Type | Description |
|---|---|---|
| `receipt` | object | Receipt data from the Spaaza API |
| `strings` | object | Optional language string overrides (see `src/lang/` for format) |

### Setting the language

You can specify the language via the `language` attribute:

```html
<spaaza-receipt id="receipt" language="nl"></spaaza-receipt>
```

You may use a country code or a full language code like `nl-NL`. The default is `en-GB`. Currently `en-GB` and `nl-NL` are provided.

### Overriding specific strings

Provide a `strings` object to customize any of the built-in language strings. See the `src/lang/` directory for the full string format.

```html
<script>
    el.strings = {
        "brand": { "title": "Mijn Bonnetje" }
    };
</script>
```

You can override as few or as many of the pre-provided strings as needed.
