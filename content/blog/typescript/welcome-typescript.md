---
title: "[TypeScript] 타입스크립트 소개 및 주요 개념"
date: 2020-04-11 11:04:82
category: typescript
---

![](images/typescript.png)

자바스크립트는 현재 세 가지 종류가 있다.

웹 브라우저에서 동작하는 표준 자바스크립트인 ES5, 2015년부터 매년 새로운 버전을 발표하는 ESNext, 그리고 ESNext에 타입 기능을 추가한 타입스크립트.

ESNext는 ES5의 모든 문법을 포함하고, 타입스크립트는 ESNext의 모든 문법을 포함한다. 따라서 타입스크립트로 개발했더라도 타입 기능을 사용하지 않는다면 ESNext 소스나 마찬가지다.

타입스크립트는 마이크로소프트가 개발하고 유지하고 있는 오픈소스 프로그래밍 언어로, 2012년 말 처음 발표 되었다. 구글의 Angular.js 팀이 앵귤러 버전 2를 만들면서 타입스크립트를 채택한 이후부터 널리 알려졌다. 요즘에는 리액트나 뷰도 타입스크립트를 사용해 개발되고 있다.

### 자바스크립트에 타입 기능이 있으면 좋은 이유

타입스크립트의 타입 기능을 이용해 구현하면 타입스크립트 컴파일러(TSC)는 문제의 원인이 무엇인지 친절하게 알려주기 때문에 오류의 원인을 쉽게 알 수 있다.

```typescript
function makePerson(name, age) {}

makePerson(32, "Jessie")

function makePerson(name: string, age: number) {}
```


### 트랜스파일

ESNext 자바스크립트 소스코드는 바벨(Babel)이라는 트랜스파일러(transpiler)를 거치면 ES5 자바스크립트 코드로 변환된다.

바벨과 유사하게 타입스크립트 소스코드는 TSC(TypeScript Compiler)라는 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환된다.

여기서 트랜스 파일러란, 어떤 프로그래밍 언어로 작성된 소스코드를 또 다른 프로그래밍 언어로 된 소스코드로 바꿔주는 프로그램이다. 트랜스파일러는 텍스트로 된 소스코드를 바이너리 코드로 바꿔주는 컴파일러와 구분하기 위해 생긴 용어이다.

타입스크립트는 ESNext 문법을 대부분 지원하므로 타입스크립트를 다루려면 ESNext 문법을 알아야 한다. 그리고 타입스크립트에만 고유한 문법도 있다.

### ESNext 주요 문법

1. 비구조화 할당
2. 화살표 함수
3. 클래스
4. 모듈
5. 생성기
6. Promise와 async/awiat 구문

### 타입스크립트 고유 문법

1. 타입 주석과 타입 추론
2. 인터페이스
3. 튜플
4. 제네릭 타입
5. 대수 타입

### 1. 타입 주석과 타입 추론

```typescript
let n: number = 1;
let m = 2;
```

- 타입 주석(type annotation) : 변수 `n`뒤의 콜론(:)과 타입 이름
- 타입 추론(type inference) : 2행처럼 타입 부분을 생략할 수도 있다. 타입스크립트는 변수와 타입부분이 생략되면 대입 연산자의 오른쪽 값을 분석해 왼쪽 변수의 타입을 결정한다.
   
타입스크립트의 타입 추론 기능은 자바스크립트 소스코드와 호환성을 보장하는 데 큰 역할을 한다. 타입 추론 덕분에 자바스크립트로 작성된 `.js` 파일을 확장자만 `.ts`로 바꾸면 타입스크립트 환경에서도 바로 동작한다.

```typescript
let n: number = 1;
let b: boolean = true;
let s: string = "hello";
let o: object = {};

n = "world"; // 타입 불일치 오류 발생
b = 1; // 타입 불일치 오류 발생
s = false; // 타입 불일치 오류 발생
```

타입스크립트는 자바스크립트와 다르게 `let`으로 선언한 변숫값은 타입 주석으로 명시한 타입에 해당하는 값으로만 바꿀 수 있다.

#### any 타입

타입스크립트는 자바스크립트와 호환을 위해 `any`라는 이름의 타입을 제공한다. 다음 코드에서 변수 `a`는 타입이 `any`이므로 값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있다.

```typescript
let a: any = 0;
a = "hello"; // 가능
a = true; // 가능
a = {}; // 가능
```

### 2. 인터페이스

타입스크립트는 객체의 타입을 정의할 수 있게 해주는 `interface`라는 키워드를 제공한다. 인터페이스는 객체의 타입을 정의하는 것이 목적이므로 다음처럼 객체를 의미하는 중괄호 {} 로 속성과 속성의 타입 주석을 나열하는 형태로 사용한다.

```typescript
interface Person {
    name: string
    age: number
};

let person: Person = { name: "Jessie", age: 29 };
```

인터페이스 속성에 맞지 않으면 아래와 같이 오류가 발생한다.

```typescript
interface IPerson {
    name: string
    age: number
}

let good: IPerson = { name: 'Jessie', age: 29 };

let bad1: IPerson = { name: 'Jessie' }; // age 속성이 없으므로 오류
let bad2: IPerson = { age: 29 }; // name 속성이 없으므로 오류
let bad3: IPerson = {}; // name과 age 속성이 없으므로 오류
let bad4: IPerson = { name: 'Jessie', age: 29, etc: true }; // etc 속성이 있어서 오류
```

#### 선택 속성 구문

인터페이스를 설계할 때 어떤 속성은 반드시 있어야 하지만, 어떤 속성은 있어도 되고 없어도 되는 형태로 만들고 싶을 때가 있다. 이러한 속성을 선택 속성(optional property)이라고 한다.

```typescript
interface IPerson2 {
    name: string // 필수 속성
    age: number // 필수 속성
    etc?: boolean // 선택 속성
}
let good1: IPerson2 = { name: 'Jessie', age: 29 };
let good2: IPerson2 = { name: 'Jessie', age: 29, etc: true };
```

#### 익명 인터페이스

타입스크립트는 `interface` 키워드도 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있다. 이를 익명 인터페이스(anonymous interface)라고 한다.

```typescript
let ai: {
    name: string
    age: number
    etc?: boolean
} = {name: 'Jessie', age: 29}

function printMe(me: {name: string, age: number, etc?: boolean}) {
    console.log(me.etc ? `${me.name} ${me.age} ${me.etc}` : `${me.name} ${me.age}`)
}
printMe(ai); // Jessie 29
```

### 3. 튜플

튜플은 물리적으로는 배열과 같다. 다만, 배열에 저장되는 아이템의 데이터 타입이 모두 같으면 배열, 다르면 튜플이다.

- 배열 : 저장되는 아이템의 데이터 타입이 모두 같을 경우
- 튜플 : 저장되는 아이템의 데이터 타입이 다를 경우

```typescript
let numberArray: number[] = [1,2,3]; // 배열
let tuple: [boolean, number, string] = [true, 1, 'Ok']; // 튜플
```

### 4. 제네릭 타입

다양한 타입을 한꺼번에 취급할 수 있게 해준다.

```typescript
class Container<T> {
    constructor(public value: T) { }
}
let numberContainer: Container<number> = new Container<number>(1);
let stringContainer: Container<string> = new Container<string>('Hello world');
```

`Container` 클래스는 `value` 속성을 포함한다. 이 클래스는 `Container<number>`, `Container<string>`, `Container<number[]>`, `Container<boolean>`처럼 여러가지 타입을 대상으로 동작할 수 있다.

이것을 제네릭 타입(generic type)이라고 한다.

### 5. 대수 타입

다른 자료형의 값을 가지는 자료형을 의미한다.

대수 타입에는 크게 합집합 타입과 교집합 타입 두 가지가 있다. 합집합 타입은 `|` 기호를, 교집합 타입은 `&` 기호를 사용한다.

```typescript
type NumberOrString = number | string;
type AnimalAndPersion = Animal & Persion;
```
