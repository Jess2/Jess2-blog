---
title: "[JavaScript] 자바스크립트 변수로 정규식 사용하기"
date: 2020-05-21 20:05:26
category: javascript
---

![](images/javascript.png)

정규표현식(Regular Expression)은 문자열을 처리하는 방법 중의 하나로 특정한 조건의 문자를 '검색'하거나 '치환'하는 과정을 매우 간편하게 처리 할 수 있도록 하는 수단이다.

정규표현식 사용 방법을 간단하게 알아보자.

```js
let pattern1 = /a/;

let variableWord = 'a';
let pattern2 = new RegExp(variableWord);
```

- 위의 예제에서 1행과 같이 정규 표현식을 쓸 수도, 3~4행과 같이 쓸 수도 있다.
- 변하지 않는 특정 문자열을 찾을 때는 1행과 같은 방식을 많이 사용하지만,  
변할 수 있는 문자열을 찾을 때는 3~4행과 같은 방식을 사용할 수 있다.

<br>
아래의 코드를 보자.  

`abcabaAbcabbbcAbc`라는 문자열 중에 `Abc`라는 모든 문자열을 `___`로 바꾸려고 한다.

```js
let pattern = "Abc";
let text = "abcabaAbcabbbcAbc";

console.log(text.replace(/Abc/g, '___')); // abcaba___abbbc___
console.log(text.replace(/pattern/g, '___')); // abcabaAbcabbbcAbc
```

- 4행에서는 `Abc`라는 모든 문자열을 `___`로 잘 치환된다.
- 그러나 5행에서는 `pattern`이라는 변수를 사용하여 `Abc`라는 모든 문자열을 `___`로 치환하고 싶지만, `pattern`이 변수로 인식되지 않고 하나의 문자열 값으로 인식되기 때문에 원하는 결과를 얻을 수 없다.

<br>
변할 수 있는 문자열을 찾을 때는 정규 표현식 객체 생성자를 이용하여 패턴을 정의한다.

```js
let pattern = "Abc";
let text = "abcabaAbcabbbcAbc";

let regexOne = new RegExp(pattern); // 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾음
let regexAll = new RegExp(pattern, "g"); // 모든 패턴을 찾음
let regexAllCase = new RegExp(pattern, "gi"); // 대소문자 구분 없이 모든 패턴을 찾음

console.log(text.replace(regexOne, '___')); // abcaba___abbbcAbc
console.log(text.replace(regexAll, '___')); // abcaba___abbbc___
console.log(text.replace(regexAllCase, '___')); // ___aba___abbbc___
console.log(text); // abcabaAbcabbbcAbc
```
- 8행 : 일치하는 패턴 중 최초 등장하는 패턴 한 번만 찾는다.
- 9행 : 일치하는 모든 패턴을 찾는다.
- 10행 : 대소문자 구분 없이 모든 패턴을 찾는다.
- 11행 : text값 자체는 변경되지 않는다.