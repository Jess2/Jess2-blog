---
title: "[JavaScript] 변수, 객체와 배열"
date: 2021-03-16 22:03:15
category: javascript
---

![](images/javascript.png)

# 1. 변수

### 1. 변수 정의 키워드

- ES5까지는 var 키워드로 변수를 정의하는 것이 유일한 방법이었다.
- ES6(2015년에 나온 자바스크립트 표준)부터는 const와 let을 이용하는 새로운 변수 정의 방법이 생겼다.

<br />

### 2. var의 문제점

- var로 정의된 변수는 함수 스코프를 가진다는 것이 문제다.
함수를 벗어난 영역에서 사용하면 에러가 발생하고 함수 내에서는 어디서든 그 변수를 사용할 수 있다.

    ```js
    function foo() {
      var age = 20;
    }

    console.log(age); // ReferenceError: age is not defined
    ```

<br />

- var로 함수 내부가 아닌 프로그램의 가장 바깥에 정의하면 전역 변수가 된다. 
프로그램 전체를 감싸는 하나의 함수가 있다고 생각하면 된다.
그런데, 함수 안에서 var 키워드를 사용하지 않고 변수를 정의하면 그 변수는 전역 변수가 된다. 따라서 아래의 코드에서는 에러가 발생하지 않는다.

    ```js
    function foo() {
      age = 20; // 정상
    }

    function bar() {
      console.log(age); // 20
    }

    foo();
    bar();
    ```

<br />

- use strict : 위와 같이 var 키워드를 사용하지 않을 경우 전역 변수가 되는 것을 방지하기 위해서 파일의 최상단에 use strict를 선언할 수 있다.

    ```js
    'use strict';

    function foo() {
      age = 20; // ReferenceError: age is not defined
    }

    function bar() {
      console.log(age);
    }

    foo();
    bar();
    ```

<br />

- var는 함수 스코프이기 때문에 for문에서 정의된 변수가 반복문이 끝난 이후에도 계속 남아 있는 문제가 있다.

    ```js
    for (var i = 0; i < 10; i++) {
      console.log(i);
    }

    console.log('last:', i); // last: 10
    ```

<br />

- var의 스코프를 제한하기 위해 즉시실행함수를 사용하기도 한다.
var는 함수 스코프를 가지기 때문에 즉시실행**함수** 로 스코프를 제한하는 방법이다.
아래의 코드에서 i는 함수로 감싸져있기 때문에 함수 밖에서 이 변수를 사용할 수 없게 되는 것이다.

    ```js
    (function() {
      for (var i = 0; i < 10; i++) {
        console.log(i);
      }
    })();

    console.log('last:', i); // ReferenceError: i is not defined
    ```

<br />

- var 키워드로 정의된 변수는 "선언 부분이" 그 변수가 속한 스코프의 최상단으로 Hoisting된다.
그래서 변수를 미리 사용해도 에러가 발생하지 않는다.
이러한 호이스팅 기능은 직관적이지 않고 보통의 프로그래밍 언어에서 찾아보기 힘들다.

    ```js
    console.log(myVar); // undefined
    var myVar = 1;
    ```

    위의 코드는 아래의 코드와 동일하다고 보면 된다.

    ```js
    var myVar = undefined;
    console.log(myVar); // undefined
    myVar = 1;
    ```

<br />

- var 키워드로 정의된 변수는 다시 재선언, 재할당 할 수 있다.

    ```js
    var num = 1;
    var num = 2;

    console.log(num); // 2
    ```

<br />

### 3. const, let

- const와 let은 블록 스코프를 가진다.
- 함수 스코프가 가진 대부분의 단점이 블록 스코프에는 없다.
- 많은 언어에서 블록 스코프를 사용한다.
- 예를 들어, if문 안에서 변수를 정의하면 if문 밖에서는 그 변수를 사용할 수 없다.

    ```js
    if (true) {
      const i = 0;
    }

    console.log(i); // ReferenceError: i is not defined
    ```

<br />

- 심지어 그냥 블록으로 감싸주기만 해도 해당 블록 밖에서는 변수를 사용할 수 없다.

    ```js
    {
      const i = 0;
    }

    console.log(i); // ReferenceError: i is not defined
    ```

<br />

- 같은 이름의 변수를 정의하는 경우 → 감싸고 있는 블록 안에서 먼저 변수를 찾고 없으면 그 바깥의 블록 안에서 변수를 찾는다.

    ```js
    let nickname = 'Jessie';
    let age = 20;

    console.log(nickname, age); // Jessie 20

    if (true) {
      let nickname = 'Lia';
      console.log(nickname, age); // Lia 20
    }

    console.log(nickname, age); // Jessie 20
    ```

<br />

- const, let으로 정의된 변수도 호이스팅이 된다.
var와 차이점은, var는 호이스팅 된 후에 undefined가 할당되는 반면, const와 let은 호이스팅 된 후에 아무런 값도 할당되지 않는다는 것이다. 따라서 const, let의 경우에는 에러가 발생한다.

    ```js
    console.log(foo); // ReferenceError: foo is not defined
    const foo = 1;
    ```

<br />

- 호이스팅이 된다는 또 다른 예시를 한 번 보자.
아래의 코드에서 만약 블록 안의 foo가 호이스팅 되지 않았다면 참조 에러는 발생하지 않고 1이 출력될 것이다. 하지만 호이스팅이 되기 때문에 블록 안의 foo에 접근하고 이 foo에는 아무런 값도 할당되지 않았기 때문에 참조 에러가 발생한다.

    ```js
    const foo = 1;

    {
      console.log(foo); // ReferenceError: foo is not defined
      const foo = 2;
    }
    ```

- let은 재선언은 안되고, 재할당만 가능하다.
- const 는 재선언, 재할당 모두 안되고 '상수' 처럼 사용된다.
하지만, const 로 만든 객체의 내부 속성 값은 수정 가능하다. 이미 존재하는 속성값을 수정하거나 새로운 속성값을 추가하는 것 모두 가능하다.
- 만약 객체 내부 속성도 수정 못하도록 하고 싶다면 Object.freeze 와 같은 자바스크립트 내장 함수를 이용하면 된다.

<br />

# 2. 객체와 배열

### 1. 단축 속성명

```js
const name = 'Jessie';
const obj = {
	age: 21,
	name,
	getName() {
      return this.name;
	}
};
```

- 단축 속성명을 이용하면 객체 리터럴 코드를 간편하게 작성할 수 있다.
- 위의 코드에서는 name과 getName이라는 속성을 단축 속성명으로 입력했다.
- 기존에 있던 name이라는 변수를 객체 내에서 속성으로 그대로 입력하면 변수 이름 그대로 속성 이름이 되고 값은 변수가 갖고 있던 값이 그대로 할당된다.
- 위의 코드는 아래의 코드와 동일하다고 보면 된다.

    ```js
    const name = 'Jessie';
    const obj = {
      age: 21,
      name: name,
      getName: function getName() {
          return this.name;
      }
    };
    ```

<br />

- 단축 속성명은 디버깅할 때도 유용하게 사용된다.

    ```js
    const name = 'Jessie';
    const age = 20;

    console.log(name, age); // Jessie 20
    console.log({ name, age }); // { name: 'Jessie', age: 20 }
    ```

<br />

### 2. 계산된 속성명

```js
function makeObj1(key, value) {
  const obj = {};
  obj[key] = value;
  return obj;
}

function makeObj2(key, value) {
	return { [key]: value };
}
```

- 계산된 속성명을 이용하면 객체의 속성명을 동적으로 결정할 수 있다.
- `{ [key]: value }`: 객체를 만들면서 동시에 동적으로 속성 이름을 결정할 수 있다.

<br />

### 3. 전개 연산자 (Spread Operator)

```js
const arr1 = [1,2,3];
const obj1 = { age: 23, name: 'Jessie' };
const arr2 = [...arr1];
const obj2 = { ...obj1 };

arr2.push(4);
obj2.age = 80;

console.log(arr1); // [1,2,3]
console.log(obj1); // [1,2,3,4]
console.log(arr2); // { age: 23, name: 'Jessie' }
console.log(obj2); // { age: 80, name: 'Jessie' };
```

- 전개 연산자는 배열이나 객체의 모든 속성을 풀어 놓을 때 사용한다.
- 배열이나 객체를 복사할 때도 유용하다. (주의: deep copy는 되지 않는다)

<br />

```js
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1, y: 10 };

console.log(obj1); // { x: 1, y: 2 }
console.log(obj2); // { x: 1, y: 10 }
```

- 객체 리터럴에서 중복된 속성명을 사용했을 때 최종적으로는 마지막 속성명의 값을 가진다.
- 중복된 속성명과 전개 연산자를 이용하면 객체의 특정 속성값을 변경할 때 이전 객체에 영향을 주지 않고 새로운 객체를 만들 수 있다.

<br />

### 4. 비구조화 문법

```js
const arr = [1, 2];
const [a, b] = arr; // 비구조화 문법

console.log(a); // 1
console.log(b); // 2
```

- 배열과 객체 모두 비구조화 문법을 가지고 있다
- 비구조화는 배열이나 객체의 여러 속성값을 변수로 쉽게 꺼낼 수 있는 문법이다.

<br />

```js
let a, b;
[a, b] = [1, 2];
```

- 기존에 존재하는 변수에도 비구조화 문법을 이용해서 할당할 수 있다.

<br />

```js
const arr = [1];
const [a = 10, b = 20] = arr;

console.log(a); // 1
console.log(b); // 20
```

- 위의 코드와 같이 기본값을 할당할 수도 있다.

<br />

```js
let a = 1;
let b = 2;
[a, b] = [b, a];

console.log(a); // 2
console.log(b); // 1
```

- 비구조화 문법을 사용하면 두 변수의 값을 쉽게 맞바꿀 수 있다.

<br />

```js
const obj = { age: 21, name: 'Jessie' };
const { age, name } = obj;
const { name, age } = obj;
const { a, b } = obj;
```

- 배열에서의 비구조화 문법은 순서가 중요했지만 객체에서는 순서가 중요하지 않다.
- 위의 코드에서 2행과 3행은 같은 역할을 한다.
- 4행의 a와 b는 각각 undefined가 할당된다.

<br />

### 5. Optional Chaining

```js
const person = null;
const name = person.name; // TypeError: Cannot read property 'name' of null
```

- 위의 코드에서는 person이 null이고 이 null에서 name 속성값을 찾기 때문에 에러가 발생한다.

<br />

```js
const person = null;
const name = person && person.name;
const name2 = person?.name; // Optional Chaining
```

- 에러가 발생하지 않도록 하기 위해서 위와 같은 방법을 사용할 수 있다.
- `person?.name` : 자동으로 person을 검사해준다.
- `(person === null || person === undefined) ? undefined : person.name` 와 동일한 역할을 한다.

<br />

```js
const person = {
  getName: () => 'abc',
};

const name = person.getName?.();
console.log(name); // abc
```

- 함수를 호출할 때도 optional chaining을 사용할 수 있다.
- `person`의 속성으로 `getName`이 존재하지 않을 경우, `console.log(name)` 값으로 `undefined`가 출력된다.

<br />

```js
function loadData(onComplete) {
  console.log('loading...');
  onComplete?.();
}

loadData();
```

- 함수 호출 시에 optional chaning을 사용하는 것은 함수를 매개변수로 받아서 호출할 때 유용하다.

<br />

```js
const person = { friends: null, myInfo: null };

const firstFriend = person.friends?.[0];

const prop = 'name';
const name = person.myInfo?.[prop];
```

- 배열의 아이템에 접근할 때도 사용될 수 있다.
- 객체에서 동적인 속성값에 접근할 때도 사용될 수 있다.

<br />

### 6. Nullish Coalescing

```js
const person = {};
const name = person?.friends?.[0]?.mother?.name ?? 'default name';
```

- 기본값을 지정해줄 때 사용된다.
    
<br>

### Reference
- [https://www.inflearn.com/course/실전-자바스크립트](https://www.inflearn.com/course/%EC%8B%A4%EC%A0%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)