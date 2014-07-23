# &lt;gaia-drawer&gt;

## Installation

```bash
$ bower install gaia-components/gaia-drawer
```

## Usage

```html
<script src="bower_components/gaia-drawer/script.js"></script>
```

```html
<gaia-drawer>
  <p>Some content hidden in the drawer</p>
</gaia-drawer>
```

## Attributes

- `open` - Forces the drawer open.

## API

### GaiaDrawer#open()

Open the drawer.

### GaiaDrawer#close()

Close the drawer.

### GaiaDrawer#toggle([state])

Toggle the drawer open/closed. Similar `classList.toggle()`, if you pass a boolean, that will override the current state.

```js
drawer.toggle(); //=> will toggle
drawer.toggle(true); //=> will always open
drawer.toggle(false); //=> will always close
```

## Examples

- [Example](http://gaia-components.github.io/gaia-drawer/)
