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

- TBD

<br />

## 3. Multi-level Inheritance

- TBD

<br />

## 4. Property Descriptors

- TBD

<br />

## 5. Constructor Prototypes

- TBD

<br />

## 6. Prototype vs. Instance Members

- TBD

<br />

## 7. Iterating Instance and Prototype Members

- TBD

<br />

## 8. Avoid Extending the Built-in Objects

- TBD

<br />

## Reference

- [Udemy - Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)