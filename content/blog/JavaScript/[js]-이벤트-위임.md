---
title: "[JS] 이벤트 위임"
date: 2019-10-05 20:10:26
category: javascript
---

**이벤트 위임**은 자바스크립트 언어를 사용하는 개발자라면 반드시 알아야 할 개념이다.<br>
그러나 이벤트 위임에 대해서 알아보기 전에 [여기](https://jess2.xyz/JavaScript/event-bubbling%EA%B3%BC-event-capturing/)에서 **이벤트 버블링과 이벤트 캡쳐링**부터 알아보자.

### 이벤트 위임
하위 요소들 각각에 이벤트를 붙이지 않고 **상위 요소에 이벤트를 붙여서** 하위 요소들 각각에 이벤트를 붙인 것과 같은 효과를 낸다.

만약 이벤트 위임을 사용하지 않고 하위 요소들 각각에 이벤트를 붙이면 **새로운 하위 요소**가 생겼을 경우 그 요소에는 이벤트가 발생하지 않는 문제가 있기 때문에 우리는 이벤트 위임을 사용해야 한다.

아래와 같이 리스트를 만들고 각 항목을 클릭하면 알림창을 띄우도록 해보자. 여기에서 `ul`태그가 상위 요소이고 `li`태그가 하위 요소이다.

#### 
```html
<ul>
  <li>사과</li>
  <li>바나나</li>
  <li>포도</li>
</ul>
```

```js
/* 목록 내 항목을 클릭하면 알림창 띄움 */
let list = document.querySelectorAll('li');
list.forEach(li => {
  li.addEventListener('click', e => {
    alert(e.target.innerText + ' is clicked');
  })
})

/* 목록에 '감귤' 항목 추가 */
let li = document.createElement('li');
li.appendChild(document.createTextNode("감귤"));
document.querySelector('ul').appendChild(li);
```

기존의 항목을 클릭하면 알림창이 뜨지만 새롭게 추가된 항목은 클릭해도 알림창이 뜨지 않는다.

클릭 이벤트 리스너를 추가하는 시점에 항목은 `사과`, `바나나`, `포도` 이렇게 세 개였기 때문에 새롭게 추가된 항목인 `감귤`에는 클릭 이벤트 리스너가 등록되지 않았다. 따라서 `감귤`을 클릭해도 알림창이 뜨지 않는 것이다.

#### 실행 결과
<iframe height="265" style="width: 100%;" scrolling="no" title="wvvvgmx" src="https://codepen.io/je_ss2/embed/wvvvgmx?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/je_ss2/pen/wvvvgmx'>wvvvgmx</a> by SoyeonJung
  (<a href='https://codepen.io/je_ss2'>@je_ss2</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

이와 같은 문제는 항목이 새롭게 추가될 때마다 이벤트 리스너를 새롭게 달아줘도 해결할 수 있지만, 우리는 **이벤트 위임**으로 쉽게 해결할 수 있다.


### 상위 요소에 이벤트 리스너를 등록하자
> 하위 요소들 각각에 이벤트를 붙이지 않고 **상위 요소에 이벤트를 붙여서** 하위 요소들 각각에 이벤트를 붙인 것과 같은 효과를 낸다.

상위 요소인 `ul`태그에 클릭 이벤트 리스너를 등록하고 하위 요소인 `li`태그를 클릭하면 어떻게 될까?

```js
/* 목록 내 항목을 클릭하면 알림창 띄움 */
let ul = document.querySelector('ul');

ul.addEventListener('click', e => {
  alert(e.target.innerText + ' is clicked');
})

/* 목록에 '감귤' 항목 추가 */
let li = document.createElement('li');
li.appendChild(document.createTextNode("감귤"));
document.querySelector('ul').appendChild(li);
```

이벤트 버블링 때문에 하위 요소인 `li`태그를 클릭해도 `ul`태그에 클릭 이벤트가 전달된다.<br>
따라서 이제는 새롭게 추가된 항목인 `감귤`을 클릭해도 알림창이 뜬다.

#### 실행 결과
<iframe height="265" style="width: 100%;" scrolling="no" title="MWWWJLW" src="https://codepen.io/je_ss2/embed/MWWWJLW?height=265&theme-id=0&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/je_ss2/pen/MWWWJLW'>MWWWJLW</a> by SoyeonJung
  (<a href='https://codepen.io/je_ss2'>@je_ss2</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>









