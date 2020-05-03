---
title: "[JavaScript] ECMAScript2020 소개 및 주요 개념"
date: 2020-05-03 15:05:18
category: javascript
---

![](images/javascript.png)

### 1. Optional Chaining `?.`

존재하지 않은 값의 속성에 접근하려 하면 아래와 같이 에러가 발생한다.

```js
let user = undefined;
console.log(user.name); // Cannot read property 'name' of undefined 

user = null; 
console.log(user.name) // Cannot read property 'name' of null
```

따라서 `user` 값이 없을 경우를 대비해 아래와 같이 예외 처리 해야만 한다.

```js
console.log(user ? user.name : undefined);
```

ECMAScript2020의 **Optional Chaining** 은 이러한 불편함을 해결해준다. 

왼쪽 연산자 값이 `null`이나 `undefined`일 경우 실행을 멈추고 `undefined`를 return 하기 때문에 존재하지 않을 수 있는 값에 대한 예외 처리에 이용할 수 있다.

아래 코드의 1행과 2행은 같은 역할을 한다.

```js
console.log(user?.name);
console.log((user !== undefined && user !== null) ? user.name : undefined);
```

참고로 `const title = data?.article?.title` 와 같이 연달아 사용하는 것도 가능하다.

### 2. Nullish coalescing Operator `??`

`||` 연산자는 왼쪽 피연산자 값이 `true`일 경우 오른쪽 피연산자를 실행하지 않고 왼쪽 피연산자 값이 `false`일 경우 오른쪽 피연산자를 실행하는데, 이러한 특성을 이용하여 어떤 값이 없을 경우 기본 값을 설정할 수 있다. 

아래의 코드를 보자.

```js
let result = data || 'default value';
console.log(result);
```

`data` 값이 존재할 경우 `result` 변수에 `data` 값이 할당되고, 존재하지 않을 경우 `'default value'` 가 할당된다.

그러나 `0`, `''`, `NaN` 과 같은 falsy 값들을 유효한 값으로 판단 해야할 때 `||` 연산자를 쓰면 예기치 않은 결과가 발생할 수 있다. 

**Nullish coalescing Operator** 은 이러한 문제를 해결해준다.

`??` 연산자를 사용하면 왼쪽 피연산자 값이 `null`이나 `undefined`일 경우에만 오른쪽 피연산자를 반환하고 그렇지 않으면 왼쪽 피연산자를 return 하기 때문에 조금 더 안전한 코드를 작성할 수 있다.

아래 코드의 1행과 2행은 같은 역할을 한다.

```js
console.log(data ?? 'default value');
console.log((data !== undefined && data !== null) ? data : 'default value');
```

### 3. globalThis

`globalThis`는 JavaScript 실행 환경에서 어떠한 경우에도 전역 객체를 return한다.

기존에는 JavaScript 실행 환경에 따라서 global 객체에 접근하는 방법이 달랐다.

- 브라우저 환경 : window, self, frames 사용
- 노드 환경 : global 사용
- Web Worker : self 사용

코드가 다양한 실행 환경에서 작동 시 별도의 예외 처리를 해야 하는데 이제는 `globalThis`를 이용하면 손쉽게 접근 가능하다.

```js
// 브라우저 기준으로 아래 3개는 동일
console.log(globalThis);
console.log(window);
console.log(this);
```

### 4. Dynamic import

`import()` 구문은 동적으로 모듈을 불러올 때 사용한다.

`Promise` 객체를 반환하기 때문에 `async/await`이나 `then/catch`를 사용해서 비동기 처리할 수 있다.

```js
const myModule = './module.js';
import(myModule) 
	.then(module => { 
		module.default(); 
	})
	.catch(error => {
      // ... 
	});

// async/await 사용
(async () => {
	try {
		const module = await import('./module.js');
		const total = module.sum(1,1);
	} catch (error) {
		//... 
	} 
})();

```

### 5. BigInt

`BigInt`는 Number 원시 값의 표현 최대치인 `2^53-1` 보다 큰 값을 표현하고 싶을 때 사용할 수 있다.

BigInt를 사용하려면 정수 값 뒤에 n을 붙이거나, BigInt(args)로 인자 값을 넣어서 사용할 수 있다.

단점은 Match 메서드와 함께 사용할 수 없으며, Number 타입의 원시 값과 같이 연산할 수 없다.

### 6. String.prototype.matchAll

**String.prototype.match** 메서드는 정확히 일치하는 결과만을 반환하고 특정 정규 표현식 그룹에 관한 정보는 제공하지 않는 반면, **String.prototype.matchAll** 메서드는 더 많은 정보를 제공한다.

아래의 코드를 보자.

```js
const text = "From 2019.01.29 to 2019.01.30";
const regexp = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/gu;
const results = text.match(regexp);

console.log(results);
// [ '2019.01.29', '2019.01.30' ]

const text = "From 2019.01.29 to 2019.01.30";
const regexp = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/gu;
const results = Array.from(text.matchAll(regexp));

console.log(results);
// [
//   [
//     '2019.01.29',
//     '2019',
//     '01',
//     '29',
//     index: 5,
//     input: 'From 2019.01.29 to 2019.01.30',
//     groups: [Object: null prototype] { year: '2019', month: '01', day: '29' }
//   ],
//   [
//     '2019.01.30',
//     '2019',
//     '01',
//     '30',
//     index: 19,
//     input: 'From 2019.01.29 to 2019.01.30',
//     groups: [Object: null prototype] { year: '2019', month: '01', day: '30' }
//   ]
// ]
```

### 7. Promise.allSettled

Promise.allSettled 메서드는 인자로 받은 배열이나 iterable 객체를 통해 열거된 Promise 객체들이 모두 실행 됐을 때 resolve 하는 Promise 객체를 반환한다.

Promise.allSettled 메서드는 Promise.all 메서드와 유사하지만, Promise.all 메서드는 열거된 Promise 객체들 중 하나라도 reject 되면 자신도 reject 하지만 Promise.allSettled 메서드는 이행 여부와 상관 없이 전부 다 실행되면 resolve 한다.

```js
// 정수 리터럴 방식
const promise1 = Promise.resolve(10);
const promise2 = new Promise((_, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).then(
	results => results.forEach(result => console.log(result.status))
  // "fulfilled", "rejected"
)
```

### Reference

- [https://pawelgrzybek.com/whats-new-in-ecmascript-2020/](https://pawelgrzybek.com/whats-new-in-ecmascript-2020/)
- [https://ui.toast.com/weekly-pick/ko_20200409/](https://ui.toast.com/weekly-pick/ko_20200409/)
- [https://avengersrhydon1121.tistory.com/264](https://avengersrhydon1121.tistory.com/264)