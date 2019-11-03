---
title: "[JS] 함수의 호출 방법 - call과 apply"
date: 2019-11-03 21:11:74
category: javascript
---

![](images/javascript.png)

call과 apply는 **함수를 호출**하는데 사용되는 메소드이다.  
더 자세히 알아보기 전에 먼저 **함수의 기본적인 호출 방법**에 대해 알아보자.

```js
function sum (arg1, arg2) {
    return arg1 + arg2;
}
 
console.log(sum(2, 3)); // 5
```

`sum`이라는 함수에 매개변수로 두 개의 값을 받고 있으므로 이 함수를 호출할 때 `sum(2, 3)`과 같은 방식으로 호출할 수 있다. 이 때 함수의 리턴값은 `5`다.

그렇다면 이제 call과 apply로 함수를 호출하는 방법에 대해 알아보자.

### call
#### 구문
```js
fun.call(thisArg[, arg1[, arg2[, ...]]])
```

#### 매개변수
- thisArg
    - 현재 객체로 사용될 객체
- arg1, arg2, ...
    - 메소드에 전달될 인수

### apply
#### 구문
```js
fun.apply(thisArg, [argsArray])
```

#### 매개변수
- thisArg
    - 현재 객체로 사용될 객체
- argsArray
    - 함수에 전달될 인수 집합

### call과 apply 비교
#### 공통점
- call과 apply는 메소드를 한번 작성하면 새 객체를 위한 메소드를 재작성할 필요 없이 **다른 객체에 상속할 수 있다.**

#### 차이점
- call과 apply는 지원되는 인수의 타입만 제외하면 매우 유사하지만 apply는 인수(파라미터)의 리스트 대신 인수들의 배열을 사용할 수 있다. 배열 리터럴이나 Array 객체를 사용할 수 있다.
    - `func.apply(this, ['eat', 'bananas']`
    - `func.apply(this, new Array('eat', 'bananas'))` 

### Example
```js
function sum (arg1, arg2) {
  return arg1 + arg2;
}

console.log(sum(2, 3)); // 5
console.log(sum.call(this, 2, 3)); // 5
console.log(sum.apply(this, [2, 3])); // 5
```

기본적으로 `Function Object`는 `call`과 `apply`메소드를 가지고 있는데 `sum`도 `Function Object`의 인스턴스이기 때문에 `call`과 `apply`를 호출할 수 있다.

`call`과 `apply`는 비슷하지만 매개변수를 전달하는 방식이 다르다.

`arguments 객체`를 그대로 전달해도 되거나 매개변수로 전달할 데이터가 이미 배열 형태로 준비되어 있다면 `apply`가 나을 것이고 그렇지 않다면 `call`이 나을 것이다.

#### 전달할 매개변수가 없다면 두 메소드는 완전히 동일하다.

그런데 왜 굳이 `call`과 `apply`와 같은 방식을 사용하여 함수를 호출해야 하는가?

`call`과 `apply`를 사용하여 함수를 호출하면 **그 함수를 해당 객체의 메소드로 만들어 버린다.**

### Example

```js
o1 = { val1: 1, val2: 2, val3: 3 };
o2 = { v1: 10, v2: 50, v3: 100, v4: 25 };

function sum () {
    var _sum = 0;
    for (name in this) {
        _sum += this[name];
    }
    return _sum;
}

console.log(sum.apply(o1)); // 6
console.log(sum.apply(o2)); // 185
```

`sum.apply(o1)`에서 함수 `sum`을 객체 `o1`의 메소드로 만들고 `sum`을 호출한다. 이렇게 되면 함수 `sum`안에 있는 `this`는 객체 `o1`을 뜻하게 되는 것이다.

함수 `sum`안에서 반복문을 돌면서 객체 `o1`의 키값들 `val1, val2, val3`이 차례대로 `name`이라는 값으로 들어가게 되며 `this[name]`의 값은 해당 키값의 `value`들을 말한다. 그래서 차례대로 `1, 2, 3`이 더해져 `6`이라는 결과가 나온 것이다.

`sum.apply(o2)`도 이와 같은 방식으로 `185`라는 결과가 나온다.

### Example

```js
window.title = "WINDOW";
var obj = {
  title : "OBJECT"
};
 
function func() {
  console.log(this.title);
};
 
func(); // WINDOW
func.call(this); // WINDOW
func.call(obj); // OBJECT
func.apply(this); // WINDOW
func.apply(obj); // OBJECT
```

- **func()**
    - 일반적인 함수 호출 방법으로 함수를 호출했다. `func`함수 내의 `this`는 `window` 객체를 가리키기 때문에 `window.title`인 `WINDOW`가 출력된다.
- **func.call(this)**
    - `call`을 사용하여 함수를 호출했고 인자로 `this`를 넘겼다. 여기서 `this`는 `window` 객체를 가리키기 때문에 **함수 `func`는 `window`의 메소드**가 되는 것이다. 따라서 `func`내의 `this`는 `window` 객체를 가리키기 때문에 `window.title`인 `WINDOW`가 출력된다.
- **func.call(obj)**
    - `call`을 사용하여 함수를 호출했고 인자로 `obj` 객체를 넘겼다. 따라서 함수 `func`는 `obj`객체의 메소드가 되기 때문에 `func`내의 `this`는 `obj` 객체를 가리키므로 `obj.title`인 `OBJECT`가 출력된다.
- **func.apply(this)**
    - `func.call(this)`와 같은 원리로 `WINDOW`가 출력된다.
- **func.apply(obj)**
    - `func.call(obj)`와 같은 원리로 `OBJECT`가 출력된다.


### Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply