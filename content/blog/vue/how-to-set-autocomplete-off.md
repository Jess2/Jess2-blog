---
title: "[Vue.js] input 자동 완성 입력 기능 끄기"
date: 2021-06-19 21:06:51
category: vue
---

![](images/vue.png)

### input autocomplete="off" is not working

```js
<input type="text" autocomplete="off" />
```
로그인을 완료하면 크롬 브라우저의 기능으로 우측 상단에 사용자 정보를 저장하시겠냐는 팝업이 뜬다.

이 때 저장을 완료하면 `autocomplete="off"` 속성을 추가하더라도  
로그인 창에서 입력했던 아이디와 비밀번호가 로그인 페이지가 아닌 다른 페이지의 `input` 창에도 자동으로 완성되어 입력되는 경우가 있다. 

구글링을 해보니 `input` 위에 `가짜 input`을 만들어서 화면단에서 사용자에게 보이지 않게 처리하면 된다는 글이 많이 있어서
따라해보았지만 원하는 방식으로 동작하지 않았다.

`autocomplete` 속성에 `off` 대신 `nope`이나 다른 값을 입력해보는 방법도 소용 없었다.

#### 결국 찾아낸 방법은 readonly 속성을 사용하는 것!

1. `input` 속성의 기본값으로 `readonly true`로 설정한다.  
2. focus in 되면 `readonly false`로 설정해서 입력 가능한 상태로 만든다.  
3. focus out 되면 다시 `readonly true`로 설정한다.

```js
// vue
<template>
  <input type="text" :readonly="!isFocused" @focus="isFocused = true" @blur="isFocused = false" />
</template>
```

크롬 브라우저는 입력 가능 상태의 입력창에 자동 완성 입력 기능을 주기 때문에  
처음에는 기본적으로 `readonly true`로 설정하면 해당 `input`은 입력 불가능 상태라서 브라우저에서 자동으로 입력하지 못한다.

*이 기능은 크롬 브라우저에서만 확인 했기 때문에 다른 브라우저에서는 별도로 확인을 해봐야 한다.