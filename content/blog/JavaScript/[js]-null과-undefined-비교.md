---
title: "[JS] null과 undefined 비교"
date: 2019-10-06 11:10:50
category: javascript
---

![](images/javascript.png)

`null`과 `undefined`는 비슷해 보이지만 엄연히 다르다. 이 두 개의 개념 차이를 명확히 알아두자.

### undefined
먼저 `undefined`에 대해 알아보자. `undefined`는 변수를 선언만 하고 값을 할당하지 않은 것.<br>
즉, 자료형이 결정되지 않은 상태이다.

```js
var a;
console.log(a); // 출력결과 > undefined
console.log(typeof a); // 출력결과 > undefined
```

위의 코드를 보면 `a`라는 변수를 선언만하고 값을 할당하지 않았기 때문에 변수 `a`를 출력하면 `undefined`이 출력되고 변수 `a`의 자료형 역시 결정되지 않은 상태이기 때문에 변수 `a`의 type을 출력하면 `undefined`가 출력된다.

### null
반면에 `null`은 변수를 선언한 뒤 `null`이라는 빈 값을 할당한 것이다.

```js
var b = null; // null 이라는 빈 값을 할당했다.
console.log(b); // 출력결과 > null
console.log(typeof b); // 출력결과 > object
```
위의 코를 보면 `b`라는 변수를 선언한 후 `null`이라는 값을 할당했기 때문에 변수 `b`를 출력하면 `null`이 출력되고 `null`값은 **객체**로 취급되기 때문에 변수 `b`의 type을 출력하면 `object`가 출력된다.

### null == undefined의 결과는 true

아니 지금까지 `null`과 `undefined`는 다른 것이라고 설명해 놓고 `null == undefined`의 결과는 왜 `true`인가?

```js
console.log(null == undefined); // 출력결과 > true
console.log(null === undefined); // 출력결과 > false
```
비교 연산자 `==`는 자료형이 다르면 **자료형을 강제로 맞춰서 비교**한다.

따라서 `undefined`와 `null`은 자료형이 다르니 자바스크립트 엔진에서 자동으로 자료형을 강제로 맞춘 후, 둘 다 **값이 없는 것**이라는 사실을 확인하기 때문에 `true`를 반환한다.

반면에 비교 연산자 `===`는 **자료형까지 동일한지 비교**하기 때문에 `null === undefined`는 `false`를 반환한다.