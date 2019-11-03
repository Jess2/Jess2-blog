---
title: "[JS] 클로저(Closure)"
date: 2019-10-20 10:49:70
category: javascript
---

![](images/javascript.png)

클로저는 유효범위(Scope)를 기억하는 함수이다. 따라서 내부함수가 외부함수의 지역변수를 기억하여 접근할 수 있다.

클로저에 대해 더 자세히 알아보기 전에 Scope에 대해 알아보자.

### Scope(유효 범위)

Scope는 변수의 **유효 범위**를 뜻한다.

기본적으로 `var`로 선언한 변수는 이 변수를 포함하고 있는 **함수** 내 어디서든 유효하다. 하지만 `let`으로 선언한 변수는 이 변수를 포함하고 있는 **블록** 내에서만 유효하다.

> Scope에 대한 더 자세한 설명은 [여기](https://jess2.xyz/JavaScript/var,-let,-const-%EB%B9%84%EA%B5%90/)에서 확인할 수 있다.

그럼 함수 내에서 유효한 **Function Scope**를 가지도록 `var`로 전역변수와 지역변수를 선언해보자.

```js
var global = 20; // 전역변수
 
function func () {
    var local = 10; // 지역변수
    console.log(global); // 20
    console.log(local); // 10
}
 
func();
console.log(global); // 20
console.log(local); // ERROR!
```
함수 밖의 전역 변수 `global`은 코드 전체에서 값이 유효하지만 함수 내의 지역 변수인 `local`은 함수 밖에서 사용할 수 없다.

**Function Scope**라서 함수가 종료되면 지역 변수의 **Scope가 종료**되기 때문이다.

그러나 함수가 종료되어도 변수의 값을 사용할 수 있는데, 그 방법이 바로 **클로저**이다. 아래의 코드를 보자.

```js
// 외부 함수
function outFunc () {
  var value = 0;
  
  // 내부 함수(클로저)
  function inFunc () {
    return value += 1;
  }
  
  return inFunc; // 클로저 함수를 리턴함
}
 
var result = outFunc();
console.log(result()); // 1
console.log(result()); // 2
console.log(result()); // 3
```
`var result = outFunc();` 부분에서 리턴 값으로 클로저 함수를 받아서 새로운 변수에 대입하면 `outFunc` 함수가 종료된 후에도 해당 함수의 지역변수 값을 계속 참조하고 접근할 수 있다.

아래의 코드도 보자.

```js
function outFunc () {
    var value = 'hello world';
    return function () {
      console.log(value);
    }
}
 
var result = outFunc();
result(); // hello world
```
`var result = outFunc();`에서 `outFunc`함수가 호출되었고, 그 결과가 `result`변수에 담겼다. 

`result();`으로 넘어오면서 `outFunc`함수는 종료되었기 때문에 이 `outFunc`함수의 지역변수인 `value`는 소멸될 것 같지만 `result`함수를 호출했을 때 `hello world`가 잘 출력된다. 이것은 외부함수의 지역변수인 `value`가 소멸되지 않았다는 것이다.

이처럼 내부함수는 외부함수의 지역변수에 접근할 수 있고 **외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는다.**

### 클로저
이쯤에서 클로저에 대해 정리를 해보자면 **클로저는 만들어진 환경을 ‘기억한다’**고 보면 된다.  
예를 들어 어떤 함수의 리턴 값이 함수일 때 이 리턴된 함수가 클로저이다. 이 리턴된 함수는 외부 함수의 환경을 기억한다.

외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수는 외부함수의 지역변수에 접근할 수 있다.  
즉, 클로저란 내부함수가 외부함수의 지역변수에 접근할 수 있고 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특성을 의미한다.

반복문에서도 클로저를 사용할 수 있는데 반복문 안에 익명함수를 만들고 또 그 안에 익명함수를 넣어 사용한다.

### 반복문과 클로저

반복문으로 클로저를 생성할 경우 실수가 빈번하게 발생한다. 다음 코드를 보자.

```js
var arr = [];
 
for (var i = 0; i < 3; i++) {
  arr[i] = function() {
    return i;
  }
}

console.log(arr[0]()); // 3
console.log(arr[1]()); // 3
console.log(arr[2]()); // 3
```
위 코드는 3만 세 번 출력한다. `arr[0]`, `arr[1]`, `arr[2]` 모두 Scope 안의 최종 `i`인 3를 참조하기 때문이다.

이러한 문제는 Function Scope라서 같은 Scope 안에 있기 때문에 발생한다. 따라서 `i`가 참조할 Scope를 다르게 해줘야 한다.

> 클로저와 즉시 실행 함수(IIFE)를 사용하여 해결할 수 있다.

```js
var arr = [];
 
for (var i = 0; i < 3; i++) {
  (function(index){
    arr[index] = function() {
      return index;
    }
  })(i); // 익명 함수
}
 
console.log(arr[0]()); // 0
console.log(arr[1]()); // 1
console.log(arr[2]()); // 2
```
위 코드는 정상적으로 0, 1, 2를 출력한다. for문 안의 처리문을 **즉시 실행 익명 함수**로 분리시키고 **클로저**가 for문의 `i`가 아닌 익명함수의 `index`변수를 참조하도록 했기 때문이다.

### 참고

참고로 ECMAScript 2015 (ES6)의 새로운 변수 선언문인 `let` 키워드로 변수를 선언하면 변수의 스코프가 블록 단위(Block Scope)로 엄격해지므로 이러한 문제가 발생하지 않는다. 아래의 코드를 보자.

```js
let arr = [];
 
for (let i = 0; i < 3; i++) {
  arr[i] = function() {
    return i;
  }
}
 
console.log(arr[0]()); // 0
console.log(arr[1]()); // 1
console.log(arr[2]()); // 2
```
