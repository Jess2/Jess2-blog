---
title: "[TypeScript] 제네릭"
date: 2021-05-31 21:05:88
category: typescript
---

![](images/typescript.png)

# 제네릭

- 타입 정보가 동적으로 결정되는 타입
- 제네릭을 통해 같은 규칙을 어러 타입에 적용할 수 있기 때문에 타입 코드를 작성할 수 있는 중복 코드를 제거할 수 있다.

<br />

### 단순히 타입만 다르고 로직은 동일할 때

```tsx
function makeNumberArray(defaultValue: number, size: number): number[] {
	const arr: number[] = [];
	for (let i = 0; i < size; i++) {
		arr.push(defaultValue);
	}
	return arr;
}

function makeStringArray(defaultValue: string, size: number): string[] {
	const arr: string[] = [];
	for (let i = 0; i < size; i++) {
		arr.push(defaultValue);
	}
	return arr;
}

const arr1 = makeNumberArray(1, 10);
const arr2 = makeStringArray('empty', 10);
```

- `makeNumberArray`와 `makeStringArray` 함수가 하는 일의 로직은 거의 동일하다. 이럴 때 제네릭을 사용하면 중복 코드를 줄일 수 있다.
- 아래의 코드를 보자

<br />

### 제네릭을 이용해서 타입 정보를 동적으로 결정

```tsx
function makeArray<T>(defaultValue: T, size: number): T[] {
	const arr: T[] = [];
	for (let i = 0; i < size; i++) {
		arr.push(defaultValue);
	}
  return arr;
}

const arr1 = makeArray<number>(1, 10);
const arr2 = makeArray<string>('empty', 10);
const arr2 = makeArray<boolean>(false, 10);
```

- 제네릭을 이용해서 함수를 호출할 때 타입 정보를 지정해서 호출할 수 있다.
- 사실 타입스크립트는 똑똑하기 때문에 `makeArray<number>(1, 10);` 대신 `makeArray(1, 10);` 와 같이 타입 정보를 지정하지 않아도 알아서 타입을 파악한다.

<br />

### 타입의 종류를 제한하는 extends

```tsx
function identity<T extends number | string>(p1: T): T {
	return p1;
}

identity(1);
identity('a');
identity([]); // 컴파일 에러 발생
```

- `extends`를 함께 사용하면 타입의 종류를 제한할 수 있다.
- 참고로, `A extends B` : `A`가 `B`에 할당 가능해야 한다는 뜻이다.
즉, `T extends number | string` : `T`가 `number`나 string에 할당 가능해야 한다는 뜻.
- 위의 코드에서는 number와 string 타입만 지정할 수 있도록 제한했기 때문에 `identity([]);` 에서는 컴파일 에러가 발생한다.

<br />

### extends 더 자세히 알아보기

```tsx
interface Person {
	name: string;
	age: number;
}

interface Korean extends Person {
	liveInSeoul: boolean;
}

function swapProperty<T extends Person, K extends keyof Person>(
	p1: T,
	p2: T,
	key: K
): void {
	const temp = p1[key];
	p1[key] = p2[key];
	p2[key] = temp;
}

const p1: Korean = {
	name: 'jessie',
	age: 23,
	liveInSeoul: false,
};

const p2: Korean = {
	name: 'kevin',
	age: 30,
	liveInSeoul: true,
};

swapProperty(p1, p2, 'age');
swapProperty(p1, p2, 'job'); // 컴파일 에러 발생
```

- `swapProperty` 함수에서 두 개의 제네릭 변수를 사용했는데, `T extends Person` 는 Person에 할당 가능한 타입으로 정의한 것이고 `K extends keyof Person` 는 `keyof Person`에 할당 가능한 타입으로 정의한 것이다.
- `keyof` : 인터페이스의 모든 속성 이름을 나열한 것
- 위 코드에서 `keyof Person` 이란 `"name" | "age"` 타입을 뜻한다.

<br />

### Reference
- [타입스크립트 시작하기](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/dashboard)
