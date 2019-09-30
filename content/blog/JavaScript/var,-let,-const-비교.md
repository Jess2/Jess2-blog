---
title: var, let, const 비교
date: 2019-09-22 12:09:37
category: JavaScript
---

JavaScript에서 사용하는 변수 선언 키워드 `var`, `let`, `const`의 차이점에 대해서 알아보고 그 차이점을 알기 위해 필요한 개념인 선언, 할당, Scope에 대해서 알아보자.

### var, let, const 비교
|키워드|재선언|재할당|Scope|
|------|---|---|---|
|var|가능|가능|Function Scope|
|let|불가능|가능|Block Scope|
|const|불가능|불가능|Block Scope|

먼저 `var`, `let`, `const`를 비교하면 위와 같다. 위의 표를 보고 무슨 말인지 모르겠다면 선언, 할당, Scope 개념에 대해서 알아볼 필요가 있다.

### 선언과 할당
선언은 말 그대로 변수를 선언하는 것이고 변수에 값을 넣는 것을 할당이라고 한다.

우리는 어떠한 값을 사용할 때 변수에 값을 저장해놓고 그 변수 값을 사용할 수 있다. 변수를 사용하려면 변수를 선언(declaration)해야 해야 하는데, JavaScript에서는 변수 선언 키워드로 `var`, `let`, `const`를 사용할 수 있다.

C나 Java 같은 다른 언어에서 사용하는 `int`, `char` 처럼 변수의 타입을 따로 지정하지 않기 때문에 타입 변경(형변환)이 자유롭다. 예를 들어 아래와 같이 변수에 숫자를 넣었다가 문자로 바꿔도 아무 문제가 없다. 

```javascript
var variable = 10;
console.log(variable); // 10 (숫자)
variable = 'Jess2';
console.log(variable); // Jess2 (문자)
```
첫 줄의 `var variable`은 `var`라는 변수 선언 키워드로 `variable`이라는 변수를 **'선언'**한 것이다. 그리고 이 변수에 10을 저장한 것을 보고 변수에 값을 **'할당'**했다고 표현한다.

### 재선언과 재할당
재선언과 재할당은 말 그대로 각각 선언을 다시, 할당을 다시 한다는 것이다.
```javascript
var a; // 선언
a = 10; // 할당
a = 20; // 재할당
var a = 30; // 재선언과 재할당
```

### var
`var`는 재선언과 재할당이 모두 자유롭다.
```javascript
var a = 10;
console.log(a); // 10

var a = 20; // 재선언과 재할당
console.log(a); // 20
```

### let
`let`은 재선언은 불가능하고 재할당은 가능하다.
```javascript
let b = 10;
console.log(b); // 10

let b = 20; // 재선언과 재할당
console.log(b); // ERROR! Identifier 'b' has already been declared

b = 20; // 재할당
console.log(b); // 20
```
`let`으로 이미 선언한 변수 `b`를 재선언하면 이미 선언된 변수라며 `SyntaxError` 에러가 발생한다.

### const
`const`는 말 그대로 변하지 않는 '상수'를 지정하고 싶을 때 사용하는 키워드이기 때문에 재선언과 재할당이 모두 불가능하다.
```javascript
const c = 10;
console.log(c); // 10

const c = 20; // 재선언과 재할당
console.log(c); // ERROR! Identifier 'c' has already been declared

c = 20; // 재할당
console.log(c); // ERROR! Assignment to constant variable.
```
`const`로 이미 선언한 변수 `c`를 재선언하면 이미 선언된 변수라며 `SyntaxError` 에러가 발생한다. 그리고 이미 할당도 되어 있기 때문에 재할당을 시도하면 `TypeError` 에러가 발생한다.

### Block Scope
그렇다면 이제 Scope 개념에 대해서 알아보자. Scope란, 변수의 **유효 범위**를 뜻한다.

Block Scope는 말 그대로 한 Block 안에서 선언된 변수는 해당 Block 안에서만 유효(사용)할 수 있다는 것이다. C나 Java는 일반적으로 Block Scope이다.

예를 들어, for문 안에서 사용한 변수는 for문 안에서만 사용이 가능하다. 아래의 Java 코드를 보자.
```java
for (int a = 0; a < 5; a++) {
    System.out.println(a); // 0, 1, 2, 3, 4
}
System.out.println(a); // ERROR!
```
for문 안에서 선언된 변수 `a`를 for문 밖에서 사용하면 에러가 발생한다. Block Scope라서 for문 안에서만 유효하기 때문이다.

### Function Scope
그렇다면 Function Scope는 무엇인가? 말 그대로 한 Function 안에서 선언된 변수는 해당 Function 안에서 유효(사용)할 수 있다는 것이다. JavaScript의 `var` 키워드는 Function Scope이다. 아래의 JavaScript 코드를 보자.

```javascript
(function scopeTest () {
    for (var a = 0; a < 5; a++) {
        console.log(a); // 0, 1, 2, 3, 4
    }
    console.log(a); // 5
}());
```
for문 안에서 선언된 변수 `a`를 for문 밖에서 사용해도 에러가 발생하지 않는다. `var`는 Function Scope라서 같은 함수 안에 있다면 변수의 유효 범위에 속하기 때문이다.

그런데 이러한 Function Scope를 사용하면 아래와 문제가 발생할 수 있다. 일단 코드를 보자.

```javascript
(function scopeTest() {
    var arr = [];

    for (var a = 0; a < 5; a++) {
        arr[a] = function () {
            console.log(a);
        };
    }

    arr[0](); // 0?
    arr[1](); // 1?
    arr[2](); // 2?
    arr[3](); // 3?
    arr[4](); // 4?
}());
```
먼저 `scopeTest`라는 함수 안에 `arr`이라는 변수를 선언하고 빈 배열을 할당했다.<br>
그 다음, 반복문을 돌면서 `arr` 배열의 인덱스 값을 출력하는 함수를 할당한다. 예를 들어 `arr[0]`에 할당된 함수를 호출하면 0이 출력되고 `arr[1]`에 할당된 함수를 호출하면 1이 출력되도록 하는 함수이다.

이제 우리는 `arr[0]()`부터 `arr[4]()`까지 각각 0, 1, 2, 3, 4가 출력될 거라고 예상하겠지만 전부 5가 출력된다. Scope 안의 최종 `a`인 5를 참조하기 때문이다.

이러한 문제는 Function Scope라서 같은 Scope 안에 있기 때문에 발생한다. 따라서 `a`가 참조할 Scope를 다르게 해줘야 한다.
> **즉시 실행 함수(IIFE, Immediately Invoked Function Expression)**를 사용하여 해결할 수 있다.

```js
(function scopeTest() {
    var arr = [];

    for (var a = 0; a < 5; a++) {
        (function(_a) {
            arr[a] = function () {
                console.log(_a);
            };
        }(a));
    }

    arr[0](); // 0
    arr[1](); // 1
    arr[2](); // 2
    arr[3](); // 3
    arr[4](); // 4
}());
```
배열에 값을 할당하는 부분만 즉시 실행 함수를 사용하는 방식으로 바꿨다. `a`값이 반복문을 돌면서 즉시 실행 함수의 매개변수로 들어가고 `_a` 값은 Function Scope이기 때문에 이 즉시 실행 함수 안에서만 유효하다.

이제 우리는 `arr[0]()`부터 `arr[4]()`까지 각각 0, 1, 2, 3, 4가 출력되는 것을 확인할 수 있다.

이렇게 Function Scope의 문제점을 즉시 실행 함수를 사용해서 해결할 수 있지만, 애초에 `a`라는 변수가 for문 안에서만 유효한 Block Scope 였다면 이렇게 복잡하게 해결할 필요가 없을 것이다. 이러한 문제는 `var` 키워드 대신에 `let` 키워드를 사용하여 변수를 선언하면 쉽게 해결된다.

### let, const는 Block Scope
`let`과 `const`는 Function Scope인 `var`와는 다르게 Block Scope이다.

따라서 아래와 같이 `var` 대신에 `let`을 사용한다면 즉시 실행 함수를 사용할 필요 없이 쉽게 원하는 결과를 얻을 수 있다.

```js
(function scopeTest() {
    var arr = [];

    for (let a = 0; a < 5; a++) {
        arr[a] = function () {
            console.log(a);
        };
    }

    arr[0](); // 0
    arr[1](); // 1
    arr[2](); // 2
    arr[3](); // 3
    arr[4](); // 4
}());
```

### 마무리
글 앞부분에 소개했던 변수 선언 키워드 비교표를 다시 한 번 살펴보면서 정리를 해보자.

|키워드|재선언|재할당|Scope|
|------|---|---|---|
|var|가능|가능|Function Scope|
|let|불가능|가능|Block Scope|
|const|불가능|불가능|Block Scope|

### Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures