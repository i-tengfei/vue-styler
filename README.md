# vue-styler

## Installation

Install via NPM...

```sh
$ npm install vue-styler
```

...and require the plugin like so:

```js
import VueStylerPlugin from 'vue-styler'
Vue.use(VueStylerPlugin)
```

## Usage

```html
<template>
  <div>
    <span :style="{
      x: 10,
      y: 10,
      top: 30,
      left: 30,
      scale: 0.9
    } | styler" />
    <!--span style="top:30px;left:30px;transform:translateX(10px) translateY(10px) scale(0.9);" /-->

    <span :style="{
      x: 10,
      y: 10,
      top: 30,
      left: 30,
      scale: 0.9,
      rotateX: 30
    } | styler(valueTypes, true)" />
    <!--span style="top: 30%; left: 30px; transform: translateX(10%) translateY(10px) translateZ(0) scale(0.9) rotateX(30deg);" /-->
  </div>
<template>

<script>
import { valueTypes } from 'vue-styler'

export default {
  data() {
    valueTypes: {
      x: valueTypes.percent,
      top: valueTypes.percent
    }
  }
}
</script>
```

```
styler (
  values:State,                                       // { x: 1, y: 10 }
  types:{ [key: string]: valueTypes.ValueType } = {}, // { x: valueTypes.percent }
  enableHardwareAcceleration:boolean = false          // enable hardware acceleration
): {[key: string]: string | number}
```
