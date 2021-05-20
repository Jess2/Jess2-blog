---
title: "[TypeScript] 타입 정의하기 - 기본 타입"
date: 2021-05-19 23:05:95
category: typescript
---

![](images/typescript.png)

### 0. Index
1. [기본 타입, 튜플 타입](#1-기본-타입-튜플-타입)
2. [null, undefined, 유니온 타입](#2-null-undefined-유니온-타입)
3. [숫자와 문자열의 리터럴도 타입으로 지정할 수 있다](#3-숫자와-문자열의-리터럴도-타입으로-지정할-수-있다)
4. [any 타입](#4-any-타입)
5. [함수의 반환 타입 : void, never](#5-함수의-반환-타입--void-never)
6. []()
7. [객체의 타입 : object](#7-객체의-타입--object)
8. [Union 타입과 Intersection 타입](#8-union-타입과-intersection-타입)
9. [타입에 별칭 주기](#9-타입에-별칭-주기)

<br />

### 1. 기본 타입, 튜플 타입

```ts
const size: number = 200;
const isBig: boolean = size > 100;
const msg: string = isBig ? 'big' : 'small';

const ages: number[] = [21, 22, 23];
const ages2: Array<number> = [21, 22, 23];
ages.push('a'); // 컴파일 에러

const person: [string, number] = ['jessie', 21];
person[0].substr(1);
person[1].substr(1); // 컴파일 에러

console.log(typeof 123); // number
console.log(typeof 'jessie'); // string
console.log(typeof [1, 2, 3]); // object
```

- `number` : 숫자
- `boolean` : 불리언
- `string` : 문자열
- `number[]` : 숫자로 이루어진 배열
- `Array<number>` : 숫자로 이루어진 배열
- 위 코드에서 `ages` 변수는 숫자로 이루어진 배열 타입이기 때문에 문자열을 push하면 컴파일 에러가 발생한다.
- `[string, number]` 와 같은 형태로 `tuple` 타입을 정의할 수 있다. 배열처럼 생기긴 했지만, 각 인덱스별로 타입을 미리 정의해놓을 수 있는 타입이다. 여기에서는 첫 번째 인덱스에는 `string` 타입, 두 번째 인덱스에는 `number` 타입만 입력할 수 있다.
- `string`에는 `substr`이라는 메서드가 존재하지만 `number` 에는 `substr`라는 메서드가 없기 때문에 컴파일 에러가 발생한다.
- `typeof [1, 2, 3]` 는 `object`이다. 자바스크립트에서는 `array`라는 타입은 없고 모두 `object`로 인식이 된다. 따라서 타입스크립트를 사용하면 array라는 타입을 관리할 수도 있고 array 안의 원소의 타입도 정의할 수 있고 tuple 같은 것도 정의할 수 있다. ⇒ 기존 자바스크립트보다 훨씬 풍부하게 타입을 정의할 수 있다.

<br />

### 2. null, undefined, 유니온 타입

```ts
let v1: undefined = undefined;
let v2: null = null;
v1 = 123; // 컴파일 에러

let v3: number | undefined = undefined;
v3 = 123;

console.log(typeof undefined); // undefined
console.log(typeof null); // object
```

- `undefined`와 `null`도 각각 타입으로 정의할 수 있다.
- 위의 코드에서 `v1`은 `undefined`만 가능한 타입이기 때문에 `number` 타입으로 값을 할당하려고 해서 컴파일 에러가 발생한다.
- `v3`은 `number`와 `undefined` 두 가지 타입이 가능하기 때문에 `number` 타입으로 값을 할당할 수 있다. `number | undefined` 에서 `|` 기호는 **유니온 타입**을 나타낸다.

<br />

### 3. 숫자와 문자열의 리터럴도 타입으로 지정할 수 있다

```ts
let v1: 10 | 20 | 30;
v1 = 10;
v1 = 15; // 컴파일 에러

let v2: 'jessie' | 'lia';
v2 = 'jin'; // 컴파일 에러
```

- `v1`은 `10` 또는 `20` 또는 `30`을 가질 수 있는 타입이다. 따라서 `15`를 할당하려고 하면 컴파일 에러가 발생한다.
- `v2`는 `jessie` 또는 `lia`를 가질 수 있는 타입이다. 따라서 `jin` 을 할당하려고 하면 컴파일 에러가 발생한다.

<br />

### 4. any 타입

```ts
let value: any;
value = 123; // OK
value = 'jessie'; // OK
value = () => {}; // OK
```

- any 타입은 모든 값을 포함하는 타입이다.
- any 타입은 기존에 자바스크립트 코드로 작성된 프로젝트를 타입스크립트로 포팅하는 경우에 유용하게 사용될 수 있다. 기존 프로젝트의 모든 코드에 타입을 한 번에 정의하는 것은 부담되기 때문에 타입 에러가 나는 부분은 임시로 any 타입으로 정의하면 된다.
- any 타입은 실제로 타입을 알 수 없는 경우나 타입 정의가 안 된 외부 패키지를 사용하는 경우에도 사용하기 좋다.
- 단, any 타입을 남발하면 타입스크립트를 사용하는 의미가 없기 때문에 피하는 게 좋다.

<br />

### 5. 함수의 반환 타입 : void, never

```ts
function f1(): void {
  console.log('hello world');
}

function f2(): never {
  throw new Error('some error');
}

function f3(): never {
  while (true) {
    // ...
  }
}
function f4(): string {
  return 'jessie';
}
function f5(): number {
  return 100;
}
```

- 함수의 반환 타입으로 `void`와 `never`를 사용할 수 있다.
- `void` : 아무 값도 반환하지 않고 종료되는 함수의 반환 타입
- `never` : 항상 예외가 발생해서 비정상적으로 종료되거나 무한루프 때문에 종료되지 않는 함수의 반환 타입 (보통 `never`타입은 사용하는 경우가 거의 없다.)
- 이 외에는 함수의 반환 타입을 적어주면 된다. (만약 함수가 문자열을 반환한다면 함수의 반환 타입은 `string`, 함수가 숫자를 반환한다면 함수의 반환 타입은 `number`.)

<br />

### 6. 함수의 Parameters
#### 6-1. Optional Parameters
```ts
function getText(name: string, age: number, language?: string): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  const languageText = language ? language.substr(0, 10) : '';
  
  return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
}

getText('jessie', 23, 'ko'); // OK
getText('jessie', 23); // OK - language는 undefined가 된다.
getText('jessie', 23, 123); // 123 부분에서 컴파일 에러
```
- 매개변수명 오른쪽에 물음표 기호를 입력하면 선택 매개변수가 된다. 위의 코드에서 `language`는 문자열일 수도 있고 `undefined`일 수도 있다.
- 선택 매개변수 오른쪽에 필수 매개변수를 입력하면 컴파일 에러가 발생한다.
예를 들어, `function getText(name: string, language?: string, age: number)`와 같이 선택 매개변수를 중간에 입력하면 
함수를 호출할 때 입력하는 두 번째 인자가 `language`를 가리키는지 `age`를 가리키는지 알 수 없기 때문이다.
- 매개변수의 개수가 많은 경우에는 비구조화 문법을 이용해서 이름이 있는 Named Parameters로 작성하는 게 좋다. 

<br />

#### 6-2. Default Values

```ts
function getText(name: string, age: number = 15, language = 'korean'): string {
  return `name: ${name}, age: ${age}, language: ${language}`;
}

getText('jessie'); // name: jessie, age: 15, language: korean
getText('jessie', 23); // name: jessie, age: 23, language: korean
getText('jessie', 30, 'english'); // name: jessie, age: 30, language: english
```
- `age`에는 기본값으로 `15`를 입력하고 있고 `language`에는 기본값으로 `korean`을 입력하고 있다.
- `age`는 명시적으로 number 타입을 지정해줬지만 `language`는 타입을 따로 지정하지 않았다. 사실 기본값으로 문자열을 할당해줬기 때문에 `language`의 타입은 자동으로 string이 된다.
- 기본값이 존재한다는 것은 함수를 호출할 때 필수로 인자를 입력하지 않아도 된다는 것이기 때문에 자동으로 Optional Parameters가 된다.

<br />

#### 6-3. Rest Parameters

```ts
function getText(name: string, ...rest: number[]): string {
  return `name: ${name}, rest: ${rest}`;
}

getText('jessie', 1, 2, 3);
getText('jessie', 1, '2', 3); // 컴파일 에러
```
- 함수를 호출할 때 나머지 파라미터들을 `rest` 매개변수에 담는다.
- Rest Parameters 의 타입은 항상 배열로 정의를 해야 한다.
- 이 코드에서는 `rest` 를 `number[]` 타입으로 정의했기 때문에 중간에 다른 타입이 들어가면 컴파일 에러가 발생한다.

<br />

### 7. 객체의 타입 : object

```ts
let myInfo: object;
myInfo = { name: 'jessie' };
console.log(myInfo.name); // 컴파일 에러: Property 'name' does not exist on type 'object
```

- 객체의 타입은 `object`로 표현할 수 있다.
- `myInfo.name` 출력 부분에서는 왜 에러가 날까? `myInfo` 안에 `name`이 있는데? ⇒ `object` 타입 안에는 `name`이라는 속성이 없기 때문이다.
- 위 코드에서는 객체의 속성에 대한 정보가 없기 때문에 특정 속성 값에 접근하면 타입 에러가 발생한다. 속성 정보를 포함하여 타입을 정의하기 위해서는 `interface` 를 사용해야 한다.

<br />

### 8. Union 타입과 Intersection 타입

```ts
let v1: (1 | 3 | 5) & (3 | 5 | 7);
v1 = 3;
v1 = 1; // 컴파일 에러
```

- `|` : Union 타입 ⇒ 합집합
- `&` : Intersection 타입 ⇒ 교집합
- Union 타입과 Intersection 타입을 이용해서 여러 타입의 합집합과 교집합을 표현할 수 있다.
- 위의 코드에서 `v1`은 `3`과 `5`만 가질 수 있는 타입이다. 따라서 `1`을 할당하면 컴파일 에러가 발생한다.

<br />

### 9. 타입에 별칭 주기

```ts
type W = number | string;
let width: W;
width = 100;
width = '100px';
```

- `type` 키워드를 이용해서 타입에 별칭을 줄 수 있다.

<br />

### Reference
- [타입스크립트 시작하기](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/dashboard)