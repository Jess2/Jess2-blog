---
title: "[JavaScript] 함수와 콜 스택"
date: 2021-03-20 23:01:18
category: javascript
---

![](images/javascript.png)

# 1. 함수도 다른 변수처럼 취급된다

```js
const add10 = function(a) { // 함수를 변수에 담을 수 있다.
  return 10 + a;
}

function apply(arr, op) {
  return arr.map(op);
}

apply([1,2,3], add10); // 함수를 매개변수로 전달할 수 있다.

function makeAdd(v1) {
  return function(v2) { // 함수 안에서 또 다른 함수를 반환할 수 있다.
    return v1 + v2;
  }
}

const add3 = makeAdd(3); // 반환된 함수를 변수에 할당하여 사용할 수 있다.
console.log(add3(10)); // 13

const add7 = makeAdd(7);
console.log(add7(10)); // 17
```

- 함수를 변수에 담을 수 있다.
- 함수를 매개변수로 전달할 수 있다.
- 함수 안에서 또 다른 함수를 반환할 수 있다.
- 반환된 함수를 변수에 할당하여 사용할 수 있다.
- 위와 같은 특징들은 자바스크립트에서 함수가 다른 변수처럼 취급되기 때문에 가능하다.

<br />

# 2. Closure (클로저)

```js
function makeAdd(v1) {
  return function(v2) {
    return v1 + v2;
  }
}

const add3 = makeAdd(3);
console.log(add3(10)); // 13
```

- 클로저란, 함수와 그 함수를 둘러싸고 있는 주변의 상태를 기억하는 기능이다.
- 위의 코드에서 함수 안에 또 다른 함수가 있는데 이 때 클로저의 기능을 사용할 수 있다.
- 클로저 덕분에 내부 함수는 외부 함수의 지역변수와 매개변수에 접근할 수 있다.
- 많은 언어에서 함수의 지역변수와 매개변수는 함수가 실행되는 동안에만 존재한다. 하지만 자바스크립트에서는 그렇지 않다. 클로저가 있기 때문.
- `makeAdd(3)` : `makeAdd` 함수를 호출할 때 매개변수로 `3`을 전달했기 때문에 이 때 `v1`은 `3`이 되고 이 함수는 또 다른 함수를 반환하고 실행을 끝낸다.
`add3` 변수에는 함수가 할당되고 그 아래 행에서 `add3`에 할당된 함수를 실행한다.

    ```js
    function(v2) {
      return v1 + v2;
    }
    ```

    이 때 `v1`을 사용하고 있다.
    이 `v1`은 이전에 실행했던 함수에서 사용했던 매개변수이다. 클로저가 없었다면 `makeAdd(3)` 함수가 호출되고 실행을 종료하면서 `v1`은 사라졌을텐데 클로저 덕분에 `add3` 함수를 실행할 때에도 `v1` 값을 사용할 수 있는 것이다.

<br />

# 3. 콜 스택

- 자바스크립트에서 함수가 실행이 될 때 자바스크립트 엔진에서 내부적으로 어떻게 처리가 되는지 알아보자.
- 모든 언어에서는 함수의 실행 정보를 관리하기 위해서 콜 스택(Call Stack)을 관리한다.
- 함수가 실행될 때마다 현재까지 실행하던 함수의 정보를 콜 스택에 저장하고 함수가 실행을 종료하면 콜스택에서 이전에 마지막으로 실행했던 그 함수의 정보를 꺼내온다. 그래서 이전에 멈췄던 부분부터 다시 실행을 하는 것이다.
- 자바스크립트에서는 콜 스택에 담기는 함수 실행 정보를 execution context라고 부른다.
- Example

    ```js
    function f1() {
      const v1 = 123;
      console.log(v1); // 123
    }

    const v2 = 456;

    function f2() {
      f1();
      console.log(v2); // 456
    }

    f2();
    ```

    1. 먼저, 전체를 감싸고 있는 하나의 커다란 함수가 있다고 생각하자. 이를 global execution context 라고 부르자. 이것이 처음에 생성된다.
    2. global execution context가 만들어진 상태에서 마지막 줄에서 `f2()` 함수 실행을 만난다. 그러면 지금까지 갖고있던 현재의 global execution context를 콜 스택에 넣는다. 
    3. `f2()` 함수 호출을 위한 새로운 execution context가 생성된다.
    4. `f2` 함수 내부 로직이 실행된다.
    5. `f1()` : 또 다른 함수의 실행을 만난다.
    6. 지금까지 갖고 있던 execution context를 콜 스택에 넣는다.
    7. `f1()` 함수 호출을 위한 새로운 execution context가 생성된다.
    8. `f1` 함수 내부 로직이 실행된다.
    9. execution context 안에 lexical environment가 있고 `v1: 123`이라는 정보를 가지고 있다.
    10. `console.log(v1)` : `v1` 변수가 사용될 때 먼저 lexical environment에서 찾는다.
    11. `f1` 함수의 실행이 끝나고 현재 갖고 있는 execution context는 삭제된다. 콜스택에서 마지막에 저장된 것을 하나 꺼내온다. 그러면 이전에 `f1` 함수실행한 부분 그 다음부터 다시 실행을 한다.
    12. 현재 execution context의 lexical environment는 비어있는 상태 (지역변수가 없기 때문)에서 `console.log(v2)`로 `v2`를 찾으려고 하는데 `v2`가 없다.
    이 경우, 글로벌 영역에서 `456`을 가져오는데, 이는 함수가 생성될 때 부모 함수의 lexical environment를 기억하기 때문이다. 그리고 그 함수가 호출될 때 부모 함수의 lexical environment를 체인으로 연결한다.
    13. `f2` 함수의 실행이 끝나고 현재 갖고 있는 execution context는 삭제하고 콜스택에 담겨있는 execution context를 하나 꺼내온다. (global execution context) 그러면 이전에 `f2`함수를 실행한 부분 그 다음부터 다시 실행을 한다. 
    14. 이 글로벌 영역에 `v2` 변수가 있다. global execution context 안에 있는 lexical environment에 `v2: 456` 이라는 값이 있는 것이다.

<br />

# 4. 함수 정의 방법

### 1. 매개변수 기본값 입력

```js
function printLog(a = 1) {
  console.log({ a });
}

printLog(); // { a: 1 } 기본값이 사용되었다.
printLog(3); // { a: 3 }
```

<br />

### 2. 매개변수 기본값으로 함수 입력

```js
function getDefault() {
  console.log('called getDefault');
  return 1;
}

function printLog(a = getDefault()) {
  console.log({ a });
}

printLog(); // { a: 1 } getDefault 함수가 호출되고 기본값 사용되었다.
printLog(3); // { a: 3 } getDefault 함수가 호출되지 않는다.
```

<br />

### 3. 매개변수 기본값 함수를 이용해서 매개변수 입력을 필수로 처리하기

```js
function required() {
  throw new Error('no parameter');
}

function printLog(a = required()) {
  console.log({ a });
}

printLog(); // 에러 발생!
printLog(3); // { a: 3 } 정상 출력
```

<br />

### 4. Rest Parameter : 나머지 매개변수

```js
function printLog(a, ...rest) {
  console.log({ a, rest });
}

printLog(1,2,3); // { a: 1, rest: [ 2, 3 ] }
```

- 첫번째 `1`을 제외한 나머지는 `rest`라는 매개변수에 배열 형태로 담긴다.
- 입력될 수 있는 매개변수의 개수를 제한하지 않는 것이다.

<br />

### 5. Named Parameter : 명명된 매개변수

```js
function getValues1(numbers, greaterThan, lessThan) {
  return numbers.filter(item => greaterThan < item && item < lessThan);
}

function getValues2({numbers, greaterThan, lessThan}) {
  return numbers.filter(item => greaterThan < item && item < lessThan);
}

const numbers = [10, 20, 30, 40];
const result1 = getValues1(numbers, 5, 25);
const result2 = getValues2({ numbers, greaterThan: 5, lessThan: 25 });
```

- 함수 호출시에 매개변수의 이름과 값을 동시에 적을 수 있어서 가독성이 높다.
- `getValues1` 처럼 명명된 매개변수를 사용하지 않을 경우, 각각의 값이 어떤 것을 의미하는지 알기 힘들다.
- `getValues2` 처럼 명명된 매개변수를 사용할 경우, 각각의 값이 어떤 것을 의미하는지 알기 쉽다.
- 명명된 매개변수에서는 매개변수를 입력하는 위치는 중요하지 않다. 이름이 중요하다.
- 만약 명명된 매개변수를 사용하지 않을 경우, 순서가 중요하기 때문에 일부 매개변수를 입력하지 않을 때는 `getValues(numbers, undefined, 25)` 이런식으로 중간에 `undefined`를 입력해야 한다.
- 명명된 매개변수에서는 `getValues({ numbers, lessThan: 25 })` 이런식으로 입력하고 싶은 매개변수만 입력할 수 있다.
- 매개변수 기본값 사용하는 방법은 기존과 똑같다.
- Rest Parameter 사용하는 방법도 기존과 똑같다. 나머지 매개변수가 객체 형태로 담긴다. 만약에 나머지 매개변수가 없다면 빈 객체가 담긴다.

<br />

### 6. Arrow Function : 화살표 함수

```js
const add = (a, b) => a + b;
const add5 = a => a + 5;
const addAndReturnObject = (a, b) => ({ result: a + b });

const add = (a, b) => {
  if (a <= 0 || b <= 0) {
    throw new Error('must be positive number');
  }

  return a + b;
}
```

- 함수를 간결하게 작성할 수 있다.
- 기존 일반 함수와의 다른 점은 this와 arguments가 바인딩되지 않는다는 것이다. 따라서 화살표 함수에서 arguments가 필요하다면 나머지 매개변수를 이용하면 된다.