---
title: "[JS] 호이스팅(Hoisting)"
date: 2019-09-30 21:09:74
category: javascript
---

**Hoisting**이란, 선언을 현재 스크립트 또는 현재 함수의 맨 위로 이동시키는 JavaScript의 기본 동작이다.

- 변수가 함수 내에서 정의되었을 경우 : 선언이 **함수 내부의 최상위**로 Hoisting 됨.
- 변수가 함수 밖에 정의되었을 경우 : 선언이 **전역 컨텍스트의 최상위**로 Hoisting 됨.

### 호이스팅 때문에 변수를 선언하기 전에 사용할 수 있다.

JavaScript에서는 변수를 선언하기 전에 사용할 수 있다. 아래에 선언을 해도 선언한 것이 Hoisting 되어 위로 끌어올려지기 때문이다. 아래의 Code-1과 Code-2는 동일한 코드라고 보면 된다.

#### Code-1
```js
x = 5; // x에 값을 할당
 
console.log(x); // 5
 
var x; // x 선언
```

#### Code-2
```js
var x; // x 선언
x = 5; // x에 값을 할당
 
console.log(x); // 5
```
### 할당은 호이스팅하지 않고, 선언만 호이스팅한다.

JavaScript는 Hoisting을 할 때, 할당은 Hoisting을 하지 않고 선언만 Hoisting하고, 다음 Code-3과 Code-4는 동일한 코드라고 보면 된다.

#### Code-3
```js
var x = 5; // x를 선언하고 x에 5를 할당

console.log(x, y); // 5 undefined
 
var y = 7; // y를 선언하고 y에 7을 할당
```

#### Code-4
```js
var x = 5; // x를 선언하고 x에 5를 할당
var y; // y를 선언
 
console.log(x, y); // 5 undefined

y = 7; // y에 7을 할당
```
위의 Code-3과 Code-4에서 `y`에 할당된 값인 `7`이 출력되지 않고 `undefined`가 출력되는 이유는, 선언만 위쪽으로 끌어 올려지고(Hoisting), 할당은 위로 끌어 올려지지 않기 때문이다.

Hosting으로 인해 `y`는 사용되기 전에 선언은 되었지만, 할당이 수행되지 않았기 때문에 `y`값은 `undefined`가 되는 것이다.

### 함수 호이스팅

#### Code-5
```js
foo(); // Hello world!
function foo () {
    console.log('Hello world!');
}
```
위의 Code-5에서 foo 함수에 대한 선언을 호이스팅하기 때문에 정상 동작한다.

#### Code-6
```js
foo(); // ERROR! foo is not a function
var foo = function () {
    console.log('Hello world!');
}
```
위의 Code-6에서는 변수에 함수리터럴(이름 없이 몸체만 있는 함수)을 할당하고 있기 때문에 변수 선언만 호이스팅 되고 변수에 할당된 함수는 호이스팅 되지 않아 에러가 발생한다.