---
title: "[JavaScript] 주요 메소드 정리 - String"
date: 2020-06-07 18:06:78
category: javascript
---

![](images/javascript.png)

### 1. concat() - 문자열 합치기

- `str.concat(string2, string3[, ..., stringN])`
- 매개 변수로 전달된 모든 문자열을 호출 문자열에 붙인 새로운 문자열을 반환한다.
- 기존 문자열을 변경시키지 않는다.

```js
let str1 = 'Hello,';
let str2 = 'world!';

console.log(str1.concat(str2)); // Hello,world!
console.log(str1); // Hello,
console.log(str2); // world!
```

<br>

### 2. includes() - 문자열에 특정 문자열 포함 여부 확인하기

`str.includes(searchString[, position])`

- `position` : 이 문자열에서 검색을 시작할 위치. 기본값은 `0`.

```js
let sentence = 'Hello. My name is Jessie';

console.log(sentence.includes('Jessie')); // true
console.log(sentence.includes('Hello', 10)); // false
```

<br>

### 3. split() - 배열로 만들기

- `str.split([separator[, limit]])`
- 문자열을 지정된 구분자로 나눈 후 배열로 반환한다.
- `limit` : 배열의 원소를 limit 개까지 처리한다.
- 기존 문자열을 변형시키지 않는다.

```js
let str = '프론트엔드 개발을 해봐요.';

console.log(str.split(' ')); // ["프론트엔드", "개발을", "해봐요."]
console.log(str.split(' ', 2)); // ["프론트엔드", "개발을"]
console.log(str); // "프론트엔드 개발을 해봐요."
```

<br>

### 4. replace() - 특정 문자열 교체하기

- `str.replace(regexp|substr, newSubstr|function)`
- 어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환한다.
- 기존 문자열을 변형시키지 않는다.
- 정규식을 이용한 문자열 교체와 관련해서는 [여기](https://jess2.xyz/JavaScript/variable-regex/)에서 더 자세히 살펴볼 수 있다.

```js
let str = 'HELLO, My name is Jessie.';

// 최초 등장하는 패턴 한 번만 찾음
console.log(str.replace('e', '_')); // HELLO, My nam_ is Jessie.

// 모든 패턴 찾음
console.log(str.replace(/e/g, '_')); // HELLO, My nam_ is J_ssi_.

// 대소문자 구분 없이 모든 패턴 찾음
console.log(str.replace(/e/gi, '_')); // H_LLO, My nam_ is J_ssi_.

// 기존 문자열은 변형시키지 않음
console.log(str); // HELLO, My name is Jessie.
```

<br>

### 5. slice() - 문자열 일부분으로 새로운 문자열 구하기

- `str.slice(beginIndex[, endIndex])`
- 문자열의 `beginIndex`부터 `endIndex - 1`까지의 문자열을 추출하여 새로운 문자열을 반환한다.
- `Index` 값이 음수라면, `strLength`(문자열 길이) + `Index`값으로 처리한다
- 기존 문자열을 변형시키지 않는다.

```js
let str = 'I am Frontend Developer!';

console.log(str.slice(5, 13)); // Frontend
console.log(str.slice(5)); // Frontend Developer!
console.log(str.slice(5, -3)); // Frontend Develop
console.log(str.slice(-5)); // oper!
```

<br>

### 6. indexOf() - 주어진 문자열과 첫 번째로 만나는 문자열의 인덱스 구하기

- `str.indexOf(searchValue[, fromIndex])`
- `fromIndex` : 문자열에서 찾기 시작하는 위치를 나타내는 인덱스 값
- 존재하지 않을 경우 `-1` 을 반환한다.

```js
let str = 'I love JavaScript and TypeScript';

console.log(str.indexOf('Script')); // 11
console.log(str.indexOf('Script', 20)); // 26
console.log(str.indexOf('Script', 30)); // -1
```

<br>

### 7. match() - 문자열에서 정규식과 매치되는 모든 부분을 검색하여 배열로 만들기

- `str.match(regexp)`

```js
let str = 'I love JAVASCRIPT and TypeScript';
let pattern = /script/gi; // 전역에서 대소문자 구별하지 않고 찾겠다는 뜻

console.log(str.match(pattern)); // ["SCRIPT", "Script"]
```

<br>

### 8. toUpperCase() / toLowerCase() - 각각 대문자 / 소문자로 변환하기

- `str.toUpperCase()`
- `str.toLowerCase()`
- 기존 문자열을 변형시키지 않는다.

```js
let str = 'AbCdEfG';

console.log(str.toUpperCase()); // ABCDEFG
console.log(str.toLowerCase()); // abcdefg
console.log(str); // AbCdEfG
```