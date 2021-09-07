---
title: "[JavaScript] OOP - 1. What is OOP"
date: 2021-09-06 21:09:47
category: javascript
---

![](images/javascript.png)

# 0. Table of Contents

1. **[What is OOP *(Current Page)*](/JavaScript/oop-1/)** 
2. Objects *(TBD)*
3. Prototypes *(TBD)*
4. Prototypical Inheritance *(TBD)*
5. ES6 Classes *(TBD)*
6. ES6 Modules *(TBD)*

<br />

# 1. What is OOP?

- OOP(객체 지향 프로그래밍)란, 함수보다는 **객체를 중심**으로 하는 프로그래밍 스타일, 프로그래밍 패러다임이다.
- OOP는 새로운 것이 아니라, 70년대부터 존재했던 스타일이다.
- 자주 변화하는 tools와 frameworks와는 달리, OOP는 프로그래밍 언어나 Tool이 아니기 때문에 아직까지도 여전히 적합하다.
- C#, Java, Ruby, Python, JavaScript와 같은 언어에서 OOP 스타일로 개발할 수 있다. (JavaScript는 약간 논란의 여지가 있지만 나중에 다룰 예정)
- 많은 프레임워크가 실제로 객체 지향 프로그래밍으로 설계되었다. (ex. Angular)

<br />

### 1-1. 절차 지향 프로그래밍 방식

- 객체 지향 프로그래밍을 하기 전에는 프로그램을 함수로 나누는 **절차적 프로그래밍**을 가졌다.
- 변수와 함수에 데이터를 저장하는 프로그래밍 스타일은 매우 간단하지만 이러한 방식은 여러 곳에 많은 함수들이 흩어지게 된다.
- 절차 지향 프로그래밍은 상호 의존적이라 코드가 복잡해지면 개발자가 직접 코드를 Copy & Paste하면서 얽혀 있는 함수 중 하나의 함수가 바뀌면 다른 함수도 변경해줘야 한다.
- 객체 지향 프로그래밍 방식은 위와 같은 문제를 해결할 수 있다.

<br />

### 1-2. 객체 지향 프로그래밍 방식

- 관련이 있는 변수들과 함수들의 그룹을 하나의 단위로 묶는다.
- 이 하나의 단위를 객체라고 부른다.
- 객체 내의 변수는 속성(Properties)이라고 하고, 객체 내의 함수는 메서드(methods)라고 한다.

<br />

# 2. OOP의 4가지 핵심 개념

1. 캡슐화 (Encapsulation)
2. 추상화 (Abstraction)
3. 상속 (Inheritance)
4. 다형성 (Polymorphism)

<br />

### 2-1. 캡슐화

- 객체 지향 프로그래밍에서 관련이 있는 변수 및 함수를 객체로 그룹화하는 것을 캡슐화라고 한다.
- example - 절차 지향 방식

    ```js
    let baseSalary = 3000;
    let overtime = 10;
    let rate = 20;

    function getWage(baseSalary, overtime, rate) {
      return baseSalaray + (overtime * rate);
    }
    ```

    - 위 코드와 같은 구현 방식을 절차적 구현이라고 한다.
    - 한 쪽에는 변수가 있고 다른 쪽에는 함수가 있기 때문에 분리하기 어렵다.
    - getWage : 많은 매개변수를 갖게된다.
- example - 객체 지향 방식

    ```js
    let employee = {
      baseSalary: 3000,
      overtime: 10,
      rate: 20,
      getWage: function() {
        return this.baseSalary + (this.overtime * this.rate);
      }
    }
    ```

    - employee라는 객체가 존재하고 이 객체 안에는 세 개의 속성(baseSalary, overtime, rate)이 있고 한 개의 메서드(getWage)가 있다.
    - getWage : 절차 지향 방식과는 달리 객체 지향 방식에서는 **매개변수가 없고 this.baseSalary와 같이 this를 통해 변수(속성)에 접근한다.**
    - Uncle Bob says, The best functions are those with no parameters.
    - 함수 내 매개변수의 개수가 적을 수록 해당 함수를 사용하고 유지하기가 더 쉽다.
    - 객체 내의 속성과 메서드는 밀접한 관계를 가진다.

<br />

### 2-2. 추상화

- 객체 내의 속성과 메서드를 외부로부터 숨길 수 있다.
- 복잡한 내용과 상세 내용은 숨기고 필수 내용만 보여준다.
- 이러한 숨김 기능은 여러 가지 이점이 있다.
- 추상화를 통해 간단해지는 인터페이스
    - 객체 내의 일부 속성과 일부 메서드만 사용함으로써 객체의 인터페이스를 간단하게 만들 수 있다.
- 추상화를 통해 변화의 영향을 줄임
    - inner or private 메서드를 변경한다고 해도 변경 사항은 외부로 누출되지 않는다.
    - 왜냐하면 그 메서드를 객체 외부에서 건드리는 코드가 없기 때문이다.

<br />

### 2-3. 상속

- 상속은 중복 코드를 제거할 수 있는 메커니즘이다.
- 반복되는 기능을 매번 새로 작성하지 않고 기능을 상속받아서 사용하면 중복 코드를 줄일 수 있다.

<br />

### 2-4. 다형성

- 다형성 (Polymorphism) 에서 Poly는 "많은"이라는 뜻이고 morph는 "형태"라는 뜻이다.
- 즉, 다형성은 "많은 형태"라는 뜻.
- 다형성은 if, switch와 같은 조건문을 제거할 수 있게 해준다.
- example - 절차 지향 방식

    ```js
    switch(...) {
      case 'select':
        renderSelect();
        break;
      case 'text':
        renderTextBox();
        break;
      case 'checkbox':
        renderCheckBox();
        break;
      default:
        break;
    }
    ```

- example - 객체 지향 방식

    ```js
    element.render();
    ```

    - 각 객체에 render 메서드를 구현할 수 있고 render 메서드는 참조하는 객체의 유형에 따라 다르게 작동한다.
    - 따라서 객체 유형에 따라 다른 각각의 render 함수를 호출하지 않아도 된다.
    
<br />

# Reference

- [Udemy - Object-oriented Programming in JavaScript](https://www.udemy.com/course/javascript-object-oriented-programming/)