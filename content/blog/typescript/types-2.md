---
title: "[TypeScript] 함수 타입과 인터페이스"
date: 2021-05-22 22:05:43
category: typescript
---

![](images/typescript.png)

# 함수 타입

### this 의 타입

```ts
function getParam(index: number): string {
	const params = this.splt(','); // this에서 컴파일 에러 발생

	if (index < 0 || params.length <= index) {
		return '';
	}

	return this.split(',')[index]; // this에서 컴파일 에러 발생
}
```

- this의 타입을 정의하지 않으면 컴파일 에러가 발생한다.
- 2행의 `this.splt(',')` 에서 `splt`이 오타가 났는데도 `splt`에서는 컴파일 에러가 발생하지 않는다.
- 아래와 같이 this의 타입을 정의할 수 있다.

<br />

```ts
function getParam(this: string, index: number): string {
	const params = this.splt(','); // splt에서 컴파일 에러 발생

	if (index < 0 || params.length <= index) {
		return '';
	}

	return this.split(',')[index];
}
```

- 타입스크립트는 맨 앞에 this가 사용되면 이것을 this의 타입이라고 인식하고, 이 함수의 매개변수는 두 번째부터 시작된다고 본다.
- this의 타입을 정의했기 때문에 `this.splt(',')` 의 `splt`에서 컴파일 에러가 발생한다.

<br />

### 내장 타입에 기능 주입하기

```ts
function getParam(this: string, index: number): string {
	// ...
}

String.prototype.getParam = getParam; // getParam에서 컴파일 에러 발생
console.log('asdf, 1234, ok '.getParam(1)); // getParam에서 컴파일 에러 발생
```

- 자바스크립트에 내장된 타입에 기능을 주입하고 싶을 때는 prototype을 이용해서 주입할 수 있는데, 지금은 `getParam`이라는 속성이 String 타입에 정의되어있지 않기 때문에 에러가 발생한다.
- String이라는 내장 타입에 속성을 추가하고 싶을 때는 아래와 같이 interface를 이용할 수 있다.

<br />

```ts
function getParam(this: string, index: number): string {
	// ...
}

interface String {
	getParam(this: string, index: number): string;
}

String.prototype.getParam = getParam; // OK
console.log('asdf, 1234, ok '.getParam(1)); // OK
```

<br />

### 함수 오버로드

```ts
// 두 매개변수가 모두 문자열 -> 문자열 반환
// 두 매개변수가 모두 숫자 -> 숫자 반환
// 두 매개변수는 서로 다른 타입으로 입력하면 안됨
function add(x: number | string, y: number | string): number | string {
	if (typeof x === 'number' && typeof y === 'number') {
		return x + y;
	} else {
		const result = Number(x) + Number(y);
		return result.toString();
	}
}

const v1: number = add(1, 2); // v1에서 컴파일 에러
console.log(add(1, '2')); // OK이면 안되는데 OK
```

- v1 컴파일 에러 : Type 'string | number' is not assignable tot type 'number'. Type 'string' is not assignable to type 'number'. 즉, 함수가 string 또는 number를 반환하기 때문에 만약 string을 반환하게 되면 number가 아니기 때문에 에러가 발생하는 것이다.
- 위 코드에서 정의된 타입으로 보면, 두 매개변수가 모두 number 타입일 때 반드시 number가 반환된다는 보장이 없다.
- `console.log(add(1, '2'));` 에서는 두 매개변수가 서로 다른 타입으로 입력이 되었는데도 불구하고 문제 없이 호출을 하고 있다. 두 매개변수가 다른 타입으로 입력되면 안된다는 정의를 하지 않았기 때문이다.
- 이러한 문제들은 함수 오버로드를 사용하면 해결할 수 있다. 아래의 코드를 보자.

<br />

```ts
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: number | string, y: number | string): number | string {
	if (typeof x === 'number' && typeof y === 'number') {
		return x + y;
	} else {
		const result = Number(x) + Number(y);
		return result.toString();
	}
}

const v1: number = add(1, 2); // OK
console.log(add(1, '2')); // add(1, '2')에서 컴파일 에러 발생
```

- 함수를 정의한 코드 위에 같은 이름으로 타입을 정의한다.
- `function add(x: number, y: number): number;` : 두 매개변수가 number 타입일 때는 number 타입을 반환
- `function add(x: string, y: string): string;` : 두 매개변수가 string 타입일 때는 string 타입을 반환
- 이제 두 매개변수가 number 타입일 때에는 number 타입을 반환한다는 것이 보장되기 때문에 `v1`에서는 더이상 컴파일 에러가 발생하지 않는다.
- 그리고 이제 `add(1, '2')` 에서 컴파일 에러가 발생한다.

<br />

### Named Parameters

```ts
function getText({
	name,
	age = 15,
	language
}: {
	name: string,
	age?: number;
	language?: string;
}): string {
	const nameText = name.substr(0, 10);
	const ageText = age >= 35 ? 'senior' : 'junior';
	return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}

getText({name: 'jessie', language: 'javascript'});
```

- 파라미터 전체를 객체로 감싸주고 그 뒤에 타입을 정의해준다.
- 이 함수를 호출할 때 인자로 값을 넘길 때는 매개변수의 이름을 적어서 사용할 수 있다.
- 이렇게 하면 Optional Parameter가 여러 개 존재하더라도 어떤 파라미터를 받은 건지 알 수가 있다.

<br />

### Interface로 Named Parameters의 타입 정의

```ts
interface TextParam {
	name: string,
	age?: number;
	language?: string;
}

function getText({ name, age = 15, language }: TextParam): string {
	const nameText = name.substr(0, 10);
	const ageText = age >= 35 ? 'senior' : 'junior';
	return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}

getText({name: 'jessie', language: 'javascript'});
```

- Named Parameters의 타입을 다른 곳에서도 사용하고 싶다면 interface로 정의를 하면 된다.

<br />

# Interface

- Java와 같은 다른 언어에서 Interface는 Class를 구현하기 전에 필요한 메서드를 정의하는 용도로 사용된다.
- TypeScript에서 Interface는 좀 더 다양한 것들을 정의하는데 사용된다.
- TypeScript에서 Interface로 정의할 수 있는 타입의 종류와 타입을 정의하는 방법을 알아보자.

### Interface로 객체의 타입 정의하는 방법

```ts
interface Person {
	name: string;
	age: number;
	language?: string;
}

const p1: Person = { name: 'jessie', age: 23 };
const p2: Person = { name: 'kevin', age: 'eight' }; // age에서 컴파일 에러 발생
```

- interface 키워드 오른쪽에 타입의 이름을 적어준다.
- 괄호 안에 필요한 속성을 입력하고 각 속성의 타입을 적어준다.
- 속성명 오른쪽에 `?` 기호를 입력하면 선택 속성이 된다. 즉, 객체에서 없어도 되는 속성.
- 만약 `language?: string` 과 같은 형태가 아니라 `language: string | undefined` 와 같이 정의를 한다면 `p1`과 `p2`에서 컴파일 에러가 발생한다. (Property 'language' is missing in type '{ name: string, age: number }' but required in type 'Person'.) 이것은 선택 속성과 다르다. `language`을 항상 입력을 해야 하고 string이나 undefined로 정의를 해야한다.

<br />

### readonly

```ts
interface Person {
	name: string;
	age: number;
	readonly address: string;
}

const p1: Person = { name: 'jessie', age: 23, address: 'suji' };

p1.age = 25; // OK
p1.address = 'yongin'; // address에서 컴파일 에러 발생
```

- readonly는 읽기 전용이기 때문에 `p1.address = 'yongin'`과 같이 값을 변경하려고 하면 컴파일 에러가 발생한다.

<br />

### 인덱스 타입

```ts
interface Person {
	readonly name: string;
	age: number;
	[key: string]: string | number;
}

const p1: Person = {
	name: 'jessie',
	age: '25', // 컴파일 에러 발생
	birthday: '1997-01-01',
}
```

- `[key: string]: string | number;` : interface에서 속성 이름을 정의하지 않고 속성 값의 타입만 정의하는 것을 인덱스 타입이라고 한다. (여기에서 `key`는 아무렇게나 입력해도 된다.)
- `p1`은 `birthday`라는 속성을 가지고 있는데 이는 `Person` 타입에 구체적으로 명시된 속성은 아니지만 인덱스 타입 정의로 인해 컴파일 에러가 발생하지 않는다.
- 하지만 `age`에서는 컴파일 에러가 발생하는데, 이 `age`도 `birthday`와 같이 인덱스 타입에 정의된 `string | number` 타입에 속하지만, `Person` 타입에서 `age`라는 속성을 명시적으로 정의했고 그 타입을 `number`로 정의했기 때문에 문자열로 입력된 `p1`의 `age`에서 컴파일 에러가 발생하는 것이다.

<br />

### Interface 확장

```ts
interface Person {
	name: string;
	age: number;
}

interface Developer extends Person {
	language: string;
	position: string;
	isJunior: boolean;
}

interface FrontendDeveloper extends Person, Developer {
	hasTypeScriptSkill: boolean;
}
```

- `extends`라는 키워드를 이용하면 Interface를 확장해서 새로운 Interface를 만들 수 있다.
- 한 개의 interface를 확장할 수도 있고, 여러 개의 interface를 확장할 수도 있다.

<br />

### 교차 타입과 Interface

```ts
interface Person {
	name: string;
	age: number;
}

interface Korean {
	isLivingInSeoul: boolean;
}

type KoreanPerson = Person & Korean;

const p1: KoreanPerson = {
	name: 'jessie',
	age: 20,
	isLivingInSeoul: false,
}
```

- 교차타입(intersection)을 interface에서 사용을 하면 여러 interface를 하나로 합칠 수가 있다.
- `KoreanPerson` 타입은 `Person`과 `Korean`의 모든 속성값을 포함한다.

<br />

### Reference
- [타입스크립트 시작하기](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/dashboard)