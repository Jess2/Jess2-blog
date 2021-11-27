---
title: "[JavaScript] 깊은복사(Deep Copy)와 얕은복사(Shallow Copy)"
date: 2021-07-30 10:07:62
category: javascript
---

![](images/javascript.png)

# 1. 참조 할당

```jsx
const p1 = {
	name: 'jessie',
	age: 20,
};

const p2 = p1;
p1.age = 30;

console.log(p1); // { name: "jessie", age: 30 }
console.log(p2); // { name: "jessie", age: 30 }
```

- `p2`에 `p1`을 할당할 때, 주소값이 할당되는 것이기 때문에 한 객체의 값을 수정하면 다른 객체의 값 또한 동일하게 변한다.

<br />

# 2. 얕은 복사 - Shallow Copy

## 2-1. Object.assign()

> `Object.assign(target, ...sources)` 메소드는 열거할 수 있는 하나 이상의 출처 객체(source)로부터 대상 객체(target)로 속성을 복사할 때 사용하고 대상 객체(target)를 반환한다.

```jsx
const p1 = {
	name: 'jessie',
	age: 20,
};

const target = {
	position: 'Frontend',
};

const p2 = Object.assign(target, p1);

console.log(p1); // { name: "jessie", age: 20 }
console.log(target); // { position: "Frontend", name: "jessie", age: 20 }
console.log(p2); // { position: "Frontend", name: "jessie", age: 20 }

p2.age = 30

console.log(p1); // { name: "jessie", age: 20 }
console.log(target); // { position: "Frontend", name: "jessie", age: 30 }
console.log(p2); // { position: "Frontend", name: "jessie", age: 30 }
```

- `p2`의 `age`를 변경하더라도 `p1`의 `age`가 변경되지 않는다.

<br />

```jsx
const p1 = {
	age: 20,
	name: {
		first: 'Jessie',
		last: 'Jung'
	}
};

const p2 = Object.assign({}, p1);

p1.age = 30;
p1.name.first = 'Justin';

console.log(p1); // { age: 30, name: { first: "Justin", last: "Jung" } };
console.log(p2); // { age: 20, name: { first: "Justin", last: "Jung" } };
```

- **얕은 복사의 문제점 :** 복사하려는 객체의 내부에 존재하는 객체는 완전한 복사가 이루어지지 않는다.
- `p1`의 `age`를 변경하더라도 `p2`의 `age`가 변경되지 않았지만 `p1.name.first`를 변경하니 `p2.name.first`도 변경되었다.

<br />

## 2-2. ES6 Spread Operator

```jsx
const p1 = {
	age: 20,
	name: {
		first: 'Jessie',
		last: 'Jung'
	}
};

const p2 = { ...p1 };

p1.age = 30;
p1.name.first = 'justin';

console.log(p1); // { age: 30, name: { first: "Justin", last: "Jung" } };
console.log(p2); // { age: 20, name: { first: "Justin", last: "Jung" } };
```

- `Object.assign()` 과 동일하게 얕은 복사의 문제점을 가지고 있다.

<br />

# 3. 깊은 복사 - Deep Copy

## 3-1. JSON.parse(JSON.stringify(object))

```jsx
const p1 = {
	age: 20,
	name: {
		first: 'Jessie',
		last: 'Jung'
	},
	sayHello: () => {
		console.log('hello world!');
	},
};

const p2 = JSON.parse(JSON.stringify(p1));

p1.age = 30;
p1.name.first = 'justin';

console.log(p1); // { age: 30, name: { first: "Justin", last: "Jung" }, sayHello: f };
console.log(p2); // { age: 20, name: { first: "Jessie", last: "Jung" } };
```

- JSON 객체의 메소드를 이용해서 Deep Copy를 할 수 있다.
- `JSON.stringify` : 자바스크립트 객체를 JSON 문자열로 변환
- `JSON.parse` : JSON 문자열을 자바스크립트 객체로 변환
- JSON 문자열로 변환했다가 다시 객체로 변환해주기 때문에 객체에 대한 참조가 없어지는 것이다.
- 이 방법의 문제점
    - 다른 방법에 비해서 성능적으로 느리다
    - `JSON.stringify` 메소드가 function을 undefined로 처리한다. 따라서 `p2`에서는 `sayHello` 라는 함수가 복사되지 않았다.

<br />

## 3-2. Lodash - clonedeep 함수

```jsx
const clonedeep = require("lodash.clonedeep");

const p1 = {
	age: 20,
	name: {
		first: 'Jessie',
		last: 'Jung'
	},
	sayHello: () => {
		console.log('hello world!');
	},
}

const p2 = clonedeep(p1);

p1.age = 30;
p1.name.first = 'justin';

console.log(p1); // { age: 30, name: { first: "Justin", last: "Jung" }, sayHello: f };
console.log(p2); // { age: 20, name: { first: "Jessie", last: "Jung" }, sayHello: f };
p2.sayHello(); // hello world!
```

- Lodash의 clonedeep 메소드를 이용하면 Deep Copy가 가능하다.
- `JSON.parse(JSON.stringify())` 방법의 문제점이였던 함수 복사도 가능하다.