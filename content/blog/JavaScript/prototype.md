---
title: "[JavaScript] 프로토타입(Prototype)"
date: 2019-10-27 17:10:17
category: javascript
---

![](images/javascript.png)

자바스크립트에는 기본적으로 클래스라는 개념이 없기 때문에 상속 기능도 없지만 Prototype을 이용해서 상속 기능을 흉내낼 수는 있다.

객체는 속성을 가질 수 있는데, prototype이라는 속성은 그 용도가 약속되어 있는 특수한 속성이다. prototype에 저장된 속성들은 생성자를 통해서 객체가 만들어질 때 그 객체에 연결된다.

자바스크립트의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갖는다.

### 이 때, 자기 자신을 생성하기 위해 사용된 객체 원형을 프로토타입이라 한다.

자바스크립트의 모든 객체는 Object 객체의 프로토타입을 기반으로 확장되었기 때문에 이 연결의 끝은 Object 객체의 프로토타입 Object이다.

> 어떠한 객체가 만들어지기 위해 그 객체의 모태가 되는 것을 프로토타입이라고 한다.

```js
function Ultra(){}
Ultra.prototype.ultraProp = true;
 
function Super(){}
Super.prototype = new Ultra();
 
function Sub(){}
Sub.prototype = new Super();
 
var obj = new Sub();
console.log(o.ultraProp); // 출력결과 > true
```

생성자 `Sub`를 통해서 만들어진 객체 `obj`에는 `ultraProp`이라는 속성이 존재하지 않는다. 그런데 어떻게 `true` 값이 출력될까?

객체 `obj`가 `Ultra`의 속성인 `ultraProp`에 접근이 가능한 이유는 **prototype 체인**으로 `Sub`와 `Ultra`가 연결되어있기 때문이다.

 내부적으로는 아래와 같은 일이 일어난다.

1. `obj.ultraProp`을 찾는다.
2. 없다면 `Sub.prototype.ultraProp`을 찾는다.
3. 없다면 `Super.prototype.ultraProp`을 찾는다.
4. 없다면 `Ultra.prototype.ultraProp`을 찾는다.

아래의 코드도 보자.

```js
function Person(name) {
    this.name = name;
}
Person.prototype.name = null;
Person.prototype.introduce = function() {
    return 'My name is ' + this.name;
}
 
function Programmer(name) {
    this.name = name;
}
Programmer.prototype = new Person(); //상속
Programmer.prototype.coding = function() {
    return "hello world";
}
 
var p1 = new Programmer('jessie');
console.log(p1.introduce()); //출력결과 : My name is jessie
console.log(p1.coding()); //출력결과 : hello world
```
`Programmer`는 `Person`을 상속받았기 때문에 `introduce`라는 속성을 갖고 있지 않아도 `Person`의 속성인 `introduce`에 접근이 가능하기 때문에 `p1.introduce()`가 정상적으로 호출되어 출력이 된다.

### 프로토타입으로 메소드 생성 -> 공간 절약
우리는 아래와 같은 방법으로 생성자 함수와 인스턴스 객체를 만들 수 있다.

```js

function Character(name, job) {
    this.name = name;
    this.job = job;
    this.move = function() {
        console.log(`${this.name} ${this.job} 캐릭터 이동`);
    }
}
 
var c1 = new Character('Jessie', '개발자');
c1.move();
```
위의 코드에서 `Character`는 생성자 함수이며, `c1`은 인스턴스 객체다. `Character`생성자 함수 내에 존재하는 `name`과 `job`은 속성이고, `move()`는 메소드이다.

이 때 속성은 생성되는 인스턴스마다 다른 값을 적용해야 하므로 개별 영역이 필요하다. 하지만 메소드는 모든 인스턴스가 함께 쓰는 ‘공용체’이기 때문에 인스턴스의 속성으로 상속받기 보다는 별도 공간인 프로토타입에 정의하는 것이 좋다.

프로토타입 속성으로 정의하면 모든 인스턴스에서 하나의 프로토타입 속성만을 참조하기 때문에 인스턴스별로 중복되는 공간을 낭비하지 않을 수 있다.

**따라서 속성은 ‘생성자 함수’에, 메소드는 ‘프로토타입 속성’으로 정의하는 것이 좋다.**

위의 코드를 아래와 같이 수정하자.

```js
//생성자 함수
function Character(name, job) {
    this.name = name;
    this.job = job;
}
 
//프로토타입으로 메소드 생성
Character.prototype.move = function() {
    console.log(`${this.name} ${this.job} 캐릭터 이동`);
}
 
//객체 인스턴스
var c1 = new Character('루이스', '기사');
 
//메소드 실행
c1.move();
```
그런데 추가해야 할 메소드가 많을 경우, 함수식으로 작성하면 너무 장황해진다. 메소드가 많을 경우에는 아래와 같이 작성하자.

```js
//생성자 함수
function Character(name, job) {
    this.name = name;
    this.job = job;
}
 
//프로토타입으로 메소드 생성
Character.prototype = {
  move: function() {
    console.log(`${this.name} ${this.job} 캐릭터 이동`);
  },
  attack: function() {
    console.log(`${this.name} ${this.job} (이)가 공격`);
  },
  escape: function() {
    console.log(`${this.name} ${this.job} (이)가 도망`);
  },
  dead: function() {
    console.log(`${this.name} ${this.job} (이)가 사망`);
  }
}
 
//객체 인스턴스
var c1 = new Character('루이스', '기사');
 
//메소드 실행
c1.move();
c1.attack();
c1.escape();
c1.dead();
```
