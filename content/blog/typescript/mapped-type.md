---
title: "[TypeScript] 맵드 타입"
date: 2021-06-30 21:06:31
category: typescript
---

![](images/typescript.png)

> 맵드 타입을 이용해서 인터페이스에 있는 속성을 optional로 바꾸거나 readonly로 바꿀 수 있다.

### Example

```tsx
type T1 = { [K in 'prop1' | 'prop2' ]: boolean };
```

- 맵드 타입으로 만들어지는 것은 객체 타입이기 때문에 중괄호로 감싸준다.
- 대괄호로 감싼 `[K in 'prop1' | 'prop2' ]` 은 key를 나타낸다. 여기에서 `in`키워드의 오른쪽에 `'prop1' | 'prop2'` 와 같이 유니온 타입으로 나열되는데 이것들이 `T1`이라는 전체 객체의 속성으로 만들어진다.
위 코드에서 T1에 마우스를 올려보면 아래와 같이 나타난다.

    ```tsx
    type T1 = {
    	prop1: boolean;
    	prop2: boolean;
    }
    ```

<br />

### 인터페이스의 모든 속성을 boolean 타입으로 만들어주는 맵드 타입

```tsx
interface Person {
	name: string;
	age: number;
}

type MakeBoolean<T> = { [P in keyof T]?: boolean };
const pMap: MakeBoolean<Person> = {};
pMap.name = true;
pMap.age = false;

pMap.age = undefined; // OK : 선택속성이기 때문
pMap.age = 3; // ERROR! : boolean 타입이기 때문
```

- `MakeBoolean` 이라는 타입은 제네릭으로 만들었다. `T`를 입력받아서 맵드 타입을 적용했다.
- `keyof T` : `T`로 받은 객체의 모든 속성명이 유니온 타입으로 나열된다.
- `[P in keyof T]?: boolean : T` 의 모든 속성에 대해서 boolean 타입으로 만들어주고 이 때 `?:` 를 사용했기 때문에 선택 속성으로 만들어준다.

<br />

### Readonly

```tsx
interface Person {
	name: string;
	age: number;
}

type T1 = Person['name'];
type Readonly<T> = { readonly [P in keyof T]: T[P] }; // 타입스크립트에 내장된 기능이기 때문에 주석 처리해도 사용할 수 있다
type Partial<T> = { [P in keyof T]?: T[P] }; // 타입스크립트에 내장된 기능이기 때문에 주석 처리해도 사용할 수 있다
type T2 = Partial<Person>;
type T3 = Readonly<Person>;
```

- `Person['name']` : 인터페이스에 속성 이름을 적어주면 그 속성의 값의 타입을 의미한다. 따라서 `T1`은 string 타입이 된다.
- `readonly [P in keyof T]` : `T`로 받은 객체의 모든 속성명이 유니온 타입으로 나열되고 그 모든 속성에 대해서 readonly를 붙여준다.
- `readonly [P in keyof T]: T[P]` : 모든 속성에 대해 각 속성의 원래 값의 타입을 지정해준다. (값의 타입을 변화시키지 않겠다는 것)
- `T2` 위에 마우스를 올려보면 아래와 같이 나타난다.

    ```tsx
    type T2 = {
    	name?: string | undefined;
    	age?: number | undefined;
    }
    ```

- `T3` 위에 마우스를 올려보면 아래와 같이 나타난다.

    ```tsx
    type T3 = {
    	readonly name: string;
    	readonly age: number;
    }
    ```

- 이와 같이 맵드 타입을 이용하면 마치 함수를 사용하는 것처럼 사용을 할 수 있다.
- `Readonly<T>`, `Partial<T>` 는 타입스크립트에 내장된 기능이기 때문에 이 타입 정의 부분은 주석 처리해도 사용할 수 있다

<br />

### Pick

```tsx
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

interface Person {
	name: string;
	age: number;
	language: string;
}

type T1 = Pick<Person, 'name' | 'language'>;
```

- `T`와 `K extends keyof T` 라는 두 개의 제네릭을 입력 받고 있다.
- `K extends keyof T` : `K`는 인터페이스 `T`에 있는 모든 속성 이름을 나열한 것인 `keyof T` 에 할당 가능해야 한다.
- 위 코드에서는 `T`로 `Person`을 넘기기 때문에 `keyof T`는 `name | age | language`가 되고 `K`는 keyof T에 할당 가능해야 하기 때문에 `name, age, language` 중에 일부분만 입력하거나 세 가지 전부를 입력할 수 있다.
- `[P in K]: T[P]` : 입력된 `K` 속성들로 이루어진 인터페이스를 만들고 각 값의 타입은 원래의 타입을 사용하겠다는 뜻이다.
- `T1` 위에 마우스를 올려보면 아래와 같이 나타난다. 원래 타입에서 `age`가 제외가 되었다.

    ```tsx
    type T1 = {
    	name: string;
    	language: string;
    }
    ```

- `Pick<T, K extends keyof T>` 는 타입스크립트에 내장된 기능이기 때문에 이 타입 정의 부분은 주석 처리해도 사용할 수 있다

<br />

### Record

```tsx
interface Person {
	name: string;
	age: number;
	language: string;
}

type Record<K extends string, T> = { [P in K]: T };
type T1 = Record<'p1' | 'p2', Person>;
type T2 = Record<'n1' | 'n2', number>;
```

- `Record`는 `문자열로 이루어진 K`와 `T`를 입력받는다.
- `[P in K]: T` : `K` 속성들로 이루어진 인터페이스를 만들고 값의 타입은 `T`로 한다는 뜻.
- `Record<'p1' | 'p2', Person>` : `p1`과 `p2` 속성으로 이루어진 인터페이스를 만드는데 값의 타입은 `Person`으로 하겠다는 뜻
- `T1` 위에 마우스를 올려보면 아래와 같이 나타난다.

    ```tsx
    type T1 = {
    	p1: Person;
    	p2: Person;
    }
    ```

- `T2` 위에 마우스를 올려보면 아래와 같이 나타난다.

    ```tsx
    type T2 = {
    	n1: number;
    	n2: number;
    }
    ```

- `Record`도 타입스크립트에 내장된 기능이기 때문에 이 타입 정의 부분은 주석 처리해도 사용할 수 있다

<br />

### 맵드 타입을 이용하여 enum 타입의 활용도 높이기

```tsx
enum Fruit {
	Apple,
	Banana,
	Orange,
}

const FRUIT_PRICE = {
	[Fruit.Apple]: 1000,
	[Fruit.Banana]: 1500,
	[Fruit.Orange]: 2000,
}
```

- Fruit라는 enum 타입이 있고 모든 과일의 가격을 맵으로 관리
- 만약 enum 타입에 변화가 있을 때 `FRUIT_PRICE` 정의 부분에도 수정이 필요하게 된다.
- 위 코드를 아래와 같이 맵드 타입을 이용한 방식으로 변경할 수 있다.

    ```tsx
    enum Fruit {
    	Apple,
    	Banana,
    	Orange,
    }

    const FRUIT_PRICE: { [key in Fruit]: number } = {
    	[Fruit.Apple]: 1000,
    	[Fruit.Banana]: 1500,
    }
    ```

    - `[key in Fruit]: number` : in 오른쪽에 enum 타입을 작성해주면 enum에 있는 모든 아이템을 나열해줘야 한다. 그런데 위 코드에서는 `Orange`가 없기 때문에 `FRUIT_PRICE` 부분에서 컴파일 에러가 발생한다.
    - 컴파일 에러가 발생하기 때문에 실수없이 모든 가격 정의가 가능하게 된다.

<br />

### Reference
- [타입스크립트 시작하기](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0/dashboard)
