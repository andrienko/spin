Spin
===
Spin is the kind of a script to provide a new input type. It is supported only by modern browsers.

Usage
---

All you gotta do is add spin.js to your page:

    <script type="text/javascript" src="spin.js"></script>

And then you create an input element with type = "spin"

    <input type="spin" step="1"/>

Now, if you scroll wheel up or down or drag the element up or down - the contents of this field will be increased or
decreased by 1 respectively.

Features
---
 - If "step" attribute of an element is not specified - it will be equal to 5
 - If an element has "change" attribute - its 'onchange' event will be fired every change
 - Step can be float and/or negative number
 - The type="spin" changes to type="text" after script is initialized. This may change in future