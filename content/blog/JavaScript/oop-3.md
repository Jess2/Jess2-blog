---
title: "[JavaScript] OOP - 3. Prototypes"
date: 2021-10-22 21:10:79
category: javascript
---

![](images/javascript.png)

## 0. Table of Contents

1. [What is OOP](/JavaScript/oop-1/) 
2. [Objects](/JavaScript/oop-2/)
3. **[Prototypes](/JavaScript/oop-3/)** ***👉 Current Page***
4. Prototypical Inheritance *(TBD)*
5. ES6 Classes *(TBD)*
6. ES6 Modules *(TBD)*

<br />

## 1. 상속 (Inheritance)

상속은 객체가 다른 객체의 속성과 메서드를 사용할 수 있도록 하는 OOP의 핵심 개념 중 하나다.  
상속을 이용하면 애플리케이션의 다른 부분에서 코드를 쉽게 재사용할 수 있다.

<br />

- Bad Example
    - `Circle` Class가 있고 이 Class는 `computeOptimumLocation()` 이라는 메소드를 가진다고 하자.
    - 그리고 `Square` Class가 있고 이 Class도 마찬가지로 `computeOptimumLocation()` 이라는 메소드를 가진다고 하자.
    - `Circle` Class와 `Square` Class가 똑같은 역할을 하는 메소드를 각각 따로 가지고 있는 셈이다.
    - 그런데 만약에 `computeOptimumLocation`에 버그가 있거나 코드를 개선하고 싶으면 동일한 코드를 여러 번 변경해야 한다.
    - 이런 문제는 상속을 이용하면 해결할 수 있다. 아래의 Good Example을 보자.

<br />

- Good Example
    - `Shape`라는 Class를 생성하고 이 Class에 `computeOptimumLocation()` 이라는 메소드를 정의한다.
    - `Circle`, `Square` Class가 이를 상속받도록 한다.
    - 여기에서 `Shape` Class는 Base/Super/Parent Class 로 여긴다.
    - `Circle`, `Square` Class는 Derived/Sub/Child Class로 여긴다.
    - 이러한 상속 관계를 IS-A 관계라고 한다.

<br />
    
지금까지 위에서 설명한 것은 Class 상속에 대한 정의다.  
하지만, 자바스크립트에서는 사실 Class가 없고 Object만 존재한다. Prototype 상속에 대해서 알아보자. 

<br />

## 2. Prototypes and Prototypical Inheritance

### 2-1. 프로토타입?

- example
    - circle 객체, shape 객체가 있다고 가정한다.
    - 모든 공통 메소드를 shape 객체에 추가한다. ex) `computeOptimumLocation()`
    - circle 객체를 shape 객체에 연결한다. → shape 객체를 circle 객체의 프로토타입으로 여긴다.
- prototype은 본질적으로 다른 객체의 **부모**이다.
- 자바스크립트의 모든 객체(싱글 객체를 제외하고)는 프로토타입을 가진다.

### 2-2. Prototypical Inheritance

- example
    - `let x = {};` 를 선언,할당한 후 `x` 를 찍어보면 `__proto__` 속성을 갖고 있는 것을 확인할 수 있다.
    - `__proto__` 는 여러 properties와 methods를 가지고 있다. ex) `constructor`, `toString`
    - `x.__proto__.toString()` 으로 접근할 수 있지만, `x.toString()` 으로 바로 접근할 수 있다.
    - 모든 객체는 `constructor` 속성에 접근할 수 있게 된다. 이 `constructor`속성은 해당 객체를 생성하는 데 사용된 함수를 참조한다.
    - 우리는 `x` 객체를 메모리에 갖고있고 `x` 객체는 또 다른 객체를 향한 링크를 갖고 있다. 이를 프로토타입이라 한다.
    
- `x`는 빈 객체인데 어떻게 `x.toString()` 과 같이 접근할 수 있을까?
    - 자바스트립트 엔진이 처음에는 `x`의 property와 method를 찾는다.
    - 찾지 못하면, 해당 객체인 `x`의 프로토타입에서 찾는다.
    - 프로토타입에서도 계속 찾지 못하면 프로토톼입의 프로토타입에서 찾는다. 최상위 루트 객체까지 올라가며 찾는다.
    - 이것이 Prototypical Inheritance 이다.
    
- 자바스크립트에서는 객체의 속성 또는 메서드에 접근하려 할 때, 프로토타입 체인을 이용해서 해당 속성 또는 메서드를 찾는다.
- 프로토타입은 평범한 하나의 객체일 뿐이다.
- 자바스크립트에서의 상속은 "연결"이다
    ```js
    let person = { name: 'Jessie' };
    
    console.log(person.toString()); // [object Object]
    
    for (let key in person) {
      console.log(key); // name
    }
    
    console.log(Object.keys(person)); // ["name"]
    ```
    - `person` 에는 속성으로 `name`만 가지고 있지만, `__proto__` 를 통해 `toString()` 메서드를 사용할 수 있다.
    - 그러나 for-in 문으로 `person`이 가진 key를 출력해보면 `name` 만 출력된다. 여기서는 `person`이 직접적으로 가지고 있는 속성만 출력되기 때문이다.
    - `console.log(Object.keys(person));` 도 이와 마찬가지로 직접적으로 가지고 있는 속성만 출력되어 ["name"] 이 출력된다.
    - 자바스크립트의서의 상속 개념은 부모의 것을 그대로 상속으로 받아와서 가져오는 것이 아니라 "연결"의 개념이다

<br />

## 3. Constructor Prototypes

- TBD

<br />

## 4. Prototype vs. Instance Members

- TBD

<br />

## 5. Iterating Instance and Prototype Members

- TBD

<br />

## 6. Avoid Extending the Built-in Objects

- TBD

<br />

## Reference

- [Udemy - Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)