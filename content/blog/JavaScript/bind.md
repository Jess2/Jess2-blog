---
title: "[JS] bind"
date: 2019-11-06 21:11:41
category: javascript
---

![](images/javascript.png)

bind는 새로운 바인딩한 함수를 만든다. 바인딩한 함수는 원본 함수 객체를 감싸는 함수이다.  
Function 객체에서 기본적으로 가지고 있는 메소드 call, apply와 비교하며 알아보자.

우선 call과 apply는 **함수를 "즉시" 호출하고 컨텍스트를 수정**할 때 사용된다.  
(더 자세한 설명은 [여기](https://jess2.xyz/JavaScript/call-apply/)에서 확인할 수 있다.)

그러나 bind는 **해당 함수를 "나중에" 이벤트에서 유용한 특정 컨텍스트로 호출**할 때 사용된다.

#### 비교
- call과 apply
    - 즉시 함수를 호출
- bind
    - 나중에 실행될 때 함수를 호출하기 위한 올바른 컨텍스트를 갖게되는 함수를 반환

#### 구문
```js
func.bind(thisArg[, arg1[, arg2[, ...]]])
```

### Example 

```js
function Button (content) {
  this.content = content;
};

Button.prototype.click = function () {
  console.log(this.content + ' clicked');
};

// #1
var myButton = new Button('OK');
myButton.click(); // OK clicked
 
// #2
var looseClick = myButton.click;
looseClick(); // undefined clicked
 
// #3
var boundClick = myButton.click.bind(myButton);
boundClick(); // OK clicked
```

#### \#1
- **var myButton = new Button('OK')** : `Button`형 객체인 `myButton`를 만들었고, 인자 값은 `OK`이다.
- **myButton.click()** : `myButton` 객체에는 `click` 메소드가 속성으로 존재하지 않지만 프로토타입 체인에 의해서 `OK clicked`가 정상적으로 출력이 된다.

그렇다면 myButton 객체에서 호출할 수 있는 click 메소드를 다른 변수에 저장했다가 호출할 수도 있을까? **=> NO!**

#### \#2
- **var looseClick = myButton.click** : `myButton.click`을 `looseClick` 변수에 담았다.
- **looseClick()** : 이전 줄에서 `click` 함수가 종료되었기 때문에 여기서는 `this.content`를 찾을 수 없게 되어 `undefined`가 출력된다.

bind 메소드는 이와 같은 문제를 해결해준다.

#### \#3
- **var boundClick = myButton.click.bind(myButton)** : bind 메소드는 특정 함수에 대해 원본 함수와 동일한 본문을 갖는 바인딩된 함수를 만든다
- **boundClick()** : 바인딩된 함수를 만들어 `boundClick` 변수에 새롭게 저장했기 때문에 정상적으로 `OK clicked`가 출력이 된다.

### bind의 인자 추가 기능

```js
var sum = function (a, b) {
  return a + b;
};
 
// #1 일반적인 함수 호출 방법
var add1 = sum(10, 5);
console.log(add1); // 15
 
// #2 bind를 이용한 호출 방법
var add2 = sum.bind(null, 5);
console.log(add2(10)); // 15
```

#### \#1
일반적인 함수 호출방법이다. `sum`이라는 함수에 인자를 전달하여 `return`된 값을 `add1`에 저장하고 출력한다.

#### \#2
인자로 `null`과 `5`가 주어졌고 이후에 9행에서 `add2`의 인자값으로 `10`이 주어졌다.

이렇게 bind를 사용하면 **나중에 인자값을 추가할 수 있으며** 이 인자는 원래 함수의 매개변수로 전달한다. 나중에 바인딩 된 함수에 전달하는 모든 추가 매개변수는 바인딩된 매개변수 다음에 전달된다.

### 요약
bind를 사용하여 비동기 콜백 및 이벤트에서 컨텍스트를 유지 관리할 수 있고, 특정 함수에 대해 원본 함수와 동일한 본문을 갖는 바인딩된 함수를 만든다.

### Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind