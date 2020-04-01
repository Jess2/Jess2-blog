---
title: "[Vue.js] refs로 DOM 직접 접근하기"
date: 2020-04-01 20:04:85
category: vue
---

![](images/vue.png)

순수 JavaScript나 jQuery로 DOM에 직접 접근할 수도 있지만, refs를 사용할 수도 있다.

컴포넌트가 mounted될 때, `input`에 focus를 줘보자. 

### 방법 1. jQuery

아래와 같이 jQuery로 `input`에 focus를 줄 수 있다.

#### HTML

```html
<input type="text" id="idInput" />
```

#### JavaScript

```js
mounted () {
    $('#idInput').focus()
}
```

### 방법 2. refs

아래와 같이 refs를 사용하여 `input`에 focus를 줄 수도 있다.

#### HTML

```html
<input type="text" ref="idRef" />
```

#### JavaScript

```js
mounted () {
    this.$refs.idRef.focus()
}
```
