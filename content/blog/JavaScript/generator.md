---
title: "[JavaScript] 제너레이터"
date: 2021-03-27 19:03:13
category: javascript
---

![](images/javascript.png)

# 1. 제너레이터란?

- 함수의 실행을 중간에 멈추고 재개할 수 있는 기능
- 실행을 멈출 때 값을 전달할 수 있음
- 반복문에서 제너레이터가 전달하는 값을 하나씩 꺼내서 사용할 수 있음 (배열과 비슷)
- 제너레이터는 배열과 달리 값을 미리 만들어 놓지 않는다.
- 값을 미리 만들어놓으면 불필요하게 메모리를 사용하는 단점이 있다.
- 제너레이터를 사용하면 필요한 순간에 값을 계산해서 전달할 수 있기 때문에 메모리 측면에서 효율적이다.

<br />

# 2. 제너레이터 사용법

### 1. yield 키워드

```js
function* f1() {
  yield 10;
  yield 10;
  return 'finished';
}

const gen = f1();
```

- 제너레이터는 `*` 문자와 함께 정의된 함수와 그 함수가 반환하는 제너레이터 객체로 구성된다.
- 제너레이터 함수 안에서 `yield` 키워드를 사용하면 함수의 실행을 멈출 수 있다.

<br />

### 2. next 메서드

```js
function* f1() {
  console.log('f1-1');
  yield 10;
  console.log('f1-2');
  yield 20;
  console.log('f1-3');
  return 'finished';
}

const gen = f1(); // 제너레이터 객체 생성, 함수 실행되지 않는다.
console.log(gen.next()); // f1-1 { value: 10, done: false }
console.log(gen.next()); // f1-2 { value: 20, done: false }
console.log(gen.next()); // f1-3 { value: 'finished', done: true }
```

- 제너레이터 객체는 `next`라는 메서드를 갖고 있다.
- `const get = f1()` : `f1()` 제너레이터 함수를 실행해서 제너레이터 객체를 생성한다. 이 때, `f1()` 함수를 호출할 때 함수 내부가 전혀 실행되지 않는다. 그래서 `f1-1` 로그 조차도 출력되지 않는다.
- **제너레이터 객체가 만들어진 상태에서 `next` 메서드를 호출해야 함수가 실행이 된다. (단, `yield`를 만날 때까지만 실행한다.)**
- `yield` 키워드를 만나면 그 값을 반환한다.
- `next` 메서드가 반환하는 값은 `value`와 `done`이라는 속성값을 가진 객체이다.
- `return` 키워드를 만나면 `done` 속성을 `true`로 만든다.

<br />

### 3. throw 메서드

```js
function* f1() {
  try {
    console.log('f1-1');
    yield 10;
    console.log('f1-2');
    yield 20;
  } catch(e) {
    console.log('f1-catch', e);
    yield 30;
    console.log('f1-3');
    yield 40;
    console.log('f1-4');
  }
}

const gen = f1();
console.log(gen.next());
console.log(gen.throw('some error'));
console.log(gen.next());

/*
f1-1
{ value: 10, done: false }
f1-catch some error
{ value: 30, done: false }
f1-3
{ value: 40, done: false }
f1-4
*/
```

- 첫 번째 `next` 호출 시 : `f1-1` 로그 출력, `yield 10` 에서 실행 멈춤.
- `throw` 호출 시 : 예외가 발생했기 때문에 `catch` 문으로 들어와서 `f1-catch` 로그 출력, `yield 30` 에서 실행 멈춤.
- 두 번째 `next` 호출 시 : `f1-3` 로그 출력, `yield 40` 에서 실행 멈춤
- 세 번째 `next` 호출 시 : `f1-4` 로그 출력, 종료

<br />

# 3. iterator / iterable

### 1. iterator 조건
- `next` 메서드를 갖고 있다.
- `next` 메서드는 `value`와 `done` 속성값을 가진 객체를 반환한다.
- `done` 속성값은 작업이 끝났을 때 참이 된다.

<br />

### 2. iterable 조건
- `Symbol.iterator` 속성값으로 함수를 갖고있다.
- 해당 함수를 호출하면 iterator 를 반환한다.
- 배열이 대표적인 iterable이다.

    ```js
    const arr = [10, 20, 30];
    const iter = arr[Symbol.iterator]();
    console.log(iter.next()); // { value: 10, done: false }
    console.log(iter.next()); // { value: 20, done: false }
    console.log(iter.next()); // { value: 30, done: false }
    console.log(iter.next()); // { value: undefined, done: true }
    ```

<br />

### 3. iterator이자 iterable한 제너레이터 객체

```js
function* f1() {
  // ...
}

const gen = f1(); // 제너레이터 객체 생성
console.log(gen[Symbol.iterator]() === gen); // true
```

- 제너레이터 객체 안에 `Symbol.iterator`라는 속성 값이 있고 그것을 실행시켰을 때 iterator가 반환되는데 이 iterator는 자기 자신이다.
- 즉, 제너레이터 객체는 iterator 이면서 iterable이다.

<br />

### 4. for-of, 전개연산자에서 유용하게 쓰이는 iterable

```js
function* f1() {
  yield 10;
  yield 20;
  yield 30;
}

for (const v of f1()) {
  console.log(v); // 10 20 30
}

const arr = [...f1()]; 
console.log(arr); // [10, 20, 30]
```

- for-of 문에서 of 오른쪽에 iterable 을 입력할 수 있다. 그러면 내부적으로 iterable로부터 iterator를 얻을 수 있다. 그리고 iterator의 `next` 메서드를 호출하면서 `done` 속성값이 참이 될 때까지 반복한다.
- 마찬가지로 전개연산자에서도 iterable을 입력하면 `done` 속성값이 참이될 때까지 값을 펼친다.

<br />

# 4. 제너레이터를 이용하여 메모리를 좀 더 효율적으로 사용하기

- iterable, iterator, 제너레이터를 이용하면 함수형 프로그래밍에서 많이 쓰이는 `map`, `filter`, `take`와 같은 함수들을 구현할 수 있다.
- 제너레이터 덕분에 새로운 배열 객체를 생성하지 않아도 되어서 메모리를 좀 더 효율적으로 사용할 수 있다. (기존 `map`, `filter` 같은 것들은 새로운 배열 객체가 생성이 되어 반환된다.)
- 연산이 필요한 순간에만 실행이 된다.
- Example

    ```js
    function* map(iter, mapper) {
      for (const v of iter) {
        yield mapper(v);
      }
    }

    function* filter(iter, test) {
      for (const v of iter) {
        if (test(v)) {
          yield v;
        }
      }	
    }

    function* take(n, iter) {
      for (const v of iter) {
        yield v;
        if (--n <= 0) return;
      }
    }

    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const result = take(
      3,
      map(
        filter(values, n => n % 2 === 0),
        n => n * 10,
      ),
    );

    console.log([...result]); // [ 20, 40, 60 ]
    ```

    - 제너레이터 함수를 호출하면 함수가 실행되는 것이 아니고 제너레이터 객체만 생성된다.
    - `console.log([...result])` 부분과 같이 값이 필요한 순간에만 필요한 연산을 수행한다.
    - 제너레이터를 이용하면 필요한 연산만 수행된다는 점이 장점이다.

<br />

# 5. 외부로부터 데이터를 받아서 사용하기

- Example

    ```js
    function* f1() {
      const data1 = yield;
      console.log(data1);
      const data2 = yield;
      console.log(data2);
    }

    const gen = f1();
    gen.next();
    gen.next(10); // 10
    gen.next(20); // 20
    ```

    - `next` 메서드의 인수로 값을 입력하면 `yield`의 반환값이 된다.

<br />

# 6. 다른 함수와 협업 멀티태스킹이 가능한 제너레이터 함수

- 협업 멀티태스킹은 여러 개의 태스크를 실행할 때 하나의 태스크가 종료되기 전에 멈추고 다른 태스크가 실행되는 것을 말한다.
- 제너레이터는 실행을 멈추고 재개할 수 있기 때문에 멀티태스킹이 가능하다.
- 협업이라는 단어가 붙는 이유는 제너레이터가 실행을 멈추는 시점을 자발적으로 선택하기 때문이다. (참고로, 실행을 멈추는 시점을 자발적으로 선택하지 못하는 경우 선점형 멀티태스킹이라고 부른다)
- 제너레이터에서는 yield 키워드를 통해서 자발적으로 자신의 실행을 멈춘다.
- Example

    ```js
    function* jessie() {
      const myMessages = [
        'Hello',
        'My name is Jessie',
        'I am FE Developer',
        'Wow!',
      ];
    
      for (const msg of myMessages) {
        console.log('Laura: ', yield msg);
      }
    }

    function laura() {
      const myMessages = [
        '',
        'Hi',
        'I am Laura',
        'Me too',
      ];

      const gen = jessie(); // 제너레이터 객체 생성

      for (const msg of myMessages) {
        console.log('Jessie: ', gen.next(msg).value);
      }
    }

    laura();

    /*
    Jessie: Hello
    Laura: Hi
    Jessie: My name is Jessie
    Laura: I am Laura
    Jessie: I am FE Developer
    Laura: Me too
    Jessie: Wow!
    */
    ```

    - 일반 함수인 `laura` 함수에서 제너레이터 객체를 만들어서 `next` 메서드를 호출하고 있다.
    1. `gen.next('').value` : `Hello` 반환 →`Jessie: Hello` 출력
    2. `gen.next('Hi')` 호출 → `next` 메서드의 인수로 값을 입력하면 `yield`의 반환값이 된다.
    3. `Laura: Hi` 출력
    4. 이런식으로 순차적으로 서로의 데이터를 전달하면서 값을 출력한다.
    
<br>

### Reference
- [https://www.inflearn.com/course/실전-자바스크립트](https://www.inflearn.com/course/%EC%8B%A4%EC%A0%84-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)