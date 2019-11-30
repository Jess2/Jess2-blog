---
title: "[JavaScript] onclick과 addEventListener 비교"
date: 2019-09-30 21:09:70
category: javascript
---

![](images/javascript.png)

자바스크립트에서 클릭 이벤트를 줄 때 어떤 방식을 사용하는가?
`onclick`을 사용할 수도, `addEventListener`를 사용할 수도 있지만, 어떤 것을 사용하든 이 두 가지가 서로 어떻게 다른 지 알고 있어야 한다.

### onclick은 하나만, addEventListener는 여러 개를.

`onclick`에는 하나의 콜백만 지정할 수 있지만, `addEventListener`를 사용하면 여러 개의 이벤트 리스너를 추가할 수 있다.

따라서 만약 `onclick` 이벤트 핸들러를 두 번 이상 사용한다면 기존 이벤트 핸들러를 덮어쓰기 때문에 **가장 아래에 추가한 핸들러**만 제대로 작동한다.

반면, `addEventListener`는 기존 이벤트 핸들러를 덮어 쓰지 않고 얼마든지 계속해서 핸들러를 추가해도 **모든 핸들러**가 정상적으로 작동한다.

아래의 JavaScript 코드를 보자.

```js
var btn = document.getElementById('btn');

btn.onclick = function() {
  alert('onclick-1'); // 실행 안 됨
}

btn.onclick = function() {
  alert('onclick-2'); // 실행 됨
}

btn.addEventListener('click', function() {
  alert('addEventListener-1'); // 실행 됨
});

btn.addEventListener('click', function() {
  alert('addEventListener-2'); // 실행 됨
});
```

`btn`에 `onclick`과 `addEventListener` 이벤트 핸들러를 각각 두 개씩, 총 네 개의 핸들러를 만들었다.

이 네 개의 이벤트 핸들러 중 `alert('onclick-1')`는 실행되지 않고 나머지 세 개만 실행되는 것을 확인할 수 있다.

### 그럼 onclick은 왜 있는거야?

이쯤 되면 이런 의문이 들 수 있다. 클릭 이벤트를 주고 싶으면 그냥 `addEventListener`를 사용하면 되지, `onclick`은 굳이 왜 만든 것일까?

`onclick`은 초기 DOM Level-0에서 제공하던 기능이고 그 이후 버전인 Level-2에서 추가된 것이 `addEventListener`이다.

`addEventListener`는 이벤트 캡쳐링, 버블링 같은 이벤트 방식을 설정할 수 있기 때문에 이벤트 제어에 있어서 더욱 유용하지만, `addEventListener`는 IE8 이하에서는 작동을 하지 않는다. 그래서 구형 브라우저 지원이 필요하면 `onclick`을 사용하거나 다른 방법을 찾아야 한다.

### Reference 
- https://stackoverflow.com/questions/6348494/addeventlistener-vs-onclick