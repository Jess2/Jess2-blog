---
title: "[JavaScript] 주요 메소드 정리 - Array"
date: 2020-05-24 13:05:86
category: javascript
---

### 1. concat() - 배열 합치기

`array.concat([value1[, value2[, ...[, valueN]]]])`

- 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다.
- 기존 배열이나 값을 변경시키지 않는다.

```js
let arr1 = [1, 2, 3, 4];
let arr2 = [5, 6];
let arr3 = [7, 8];

console.log(arr1.concat(arr2)); // [1, 2, 3, 4, 5, 6];
console.log(arr1.concat(arr2, arr3)); // [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [5, 6]
console.log(arr3); // [7, 8]
```

### 2. push, unshift - 배열에 항목 추가하기 

- `push()` : 배열 끝에 항목 추가
- `unshift()` : 배열 앞에 항목 추가
- 반환 값 : 호출한 배열의 새로운 length 속성
- 기존 배열을 변경시킨다.

```js
let arr = ['가', '나', '다'];

console.log(arr.push('라')); // 4
console.log(arr); // ['가', '나', '다', '라']

console.log(arr.unshift('마')); // 5
console.log(arr); // ['마', '가', '나', '다', '라']
```

### 3. pop, shift - 배열에서 항목 제거하기

- `pop()` : 배열 끝에 항목 제거
- `shift()` : 배열 앞에 항목 제거
- 반환 값 : 제거한 항목
- 기존 배열을 변경시킨다.

```js
let arr = ['가', '나', '다'];

console.log(arr.pop()); // 다
console.log(arr); // ['가', '나']

console.log(arr.shift()); // 가
console.log(arr); // ['가']
```

### 4. splice() - 배열 요소를 삭제 또는 교체하거나 추가하기

`array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

- `start` : 배열의 변경을 시작할 인덱스
- `deleteCount` : 배열에서 삭제할 요소의 수
- `item1, item2, ...` : 배열에 추가할 요소 (아무 요소도 지정하지 않으면 배열에 추가하지 않고 삭제만 한다)
- 반환 값 : 제거한 요소를 담은 배열
- 기존 배열을 변경시킨다.

```js
let arr = ['가', '나', '다', '라'];

// 삭제 후 추가
console.log(arr.splice(2, 1, '마')); // ['다']
console.log(arr); // ['가', '나', '마', '라']

// 추가만
console.log(arr.splice(1, 0, '바')); // []
console.log(arr); // ['가', '바', '나', '마', '라']

// 삭제만
console.log(arr.splice(0, 2)); // ['가', '바']
console.log(arr); // ['나', '마', '라']
```

### 5. slice() - 배열의 일부분으로 새로운 배열 만들기

`arr.slice([begin[, end]])`

- 배열의 `begin`부터 `end - 1`까지에 대한 얕은 복사본을 새로운 배열 객체로 반환한다.
- 기존 배열을 변경시키지 않는다.

```js
let arr = [1, 2, 3, 4, 5];

console.log(arr.slice(2, 5)); // [3, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

### 6. length - 배열의 길이

```js
let arr = [1, 2, 3, 4, 5];

console.log(arr.length); // 5
```

### 7. fill() - 특정 값으로 배열 채우기

`arr.fill(value[, start[, end]])`

- 배열의 `start` 인덱스부터 `end - 1` 인덱스까지 정적인 값 하나로 채웁니다.
- `start`, `end` 값이 없을 경우 `value` 값으로 배열을 채운다.
- 기존 배열을 변경시킨다.

```js
let arr = [1, 2, 3, 4, 5];

console.log(arr.fill(0)); // [0, 0, 0, 0, 0];
console.log(arr.fill(1, 1, 3)); // [0, 1, 1, 0, 0];
console.log(arr.fill(5, 2)); // [0, 1, 5, 5, 5];

console.log(arr) // [0, 1, 5, 5, 5];
```

### 8. includes() - 배열에 요소 포함 여부 확인하기

`arr.includes(valueToFind[, fromIndex])`

- `fromIndex` : 이 배열에서 검색을 시작할 위치. 기본값은 `0`.

```js
let names = ['Jessie', 'Justin', 'Leah'];

console.log(names.includes('Jessie')); // true
console.log(names.includes('Eddy')); // false
console.log(names.includes('Jessie', 1)); // false
```

### 9. join() - 배열을 문자열로 결합하기

`arr.join([separator = ',']);`

- separator : 배열을 문자열로 결합할 때 이어 붙일 값 (기본값은 `,`)
- 기존 배열을 변경시키지 않는다.

```js
let arr = [1, 2, 3, 4, 5];

console.log(arr.join()); // 1,2,3,4,5
console.log(arr.join('-')); // 1-2-3-4-5
console.log(arr.join('')); // 12345
console.log(arr); // [1, 2, 3, 4, 5]
```

### 10. filter() - 조건을 만족하는 요소들로 새로운 배열 만들기

`arr.filter(callback(element[, index[, array]])[, thisArg])`

- `element` : 처리할 현재 요소
- `index` : 처리할 현재 요소의 인덱스
- `array` : filter를 호출한 배열
- `thisArg` : callback을 사용할 때 this로 사용하는 값
- 배열 내에서 원하는 요소들만 필터링할 수 있는 유용한 메서드다.
- 기존 배열을 변경시키지 않는다.

```js
let scores = [30, 40, 60, 75, 90];
let resultScores = [];

resultScores = scores.filter((score) => {
	return score > 70;
});

console.log(resultScores); // [75, 90]
console.log(scores); // [30, 40, 60, 75, 90]
```

### 11. map() - 함수를 실행한 결과로 새로운 배열 만들기

`arr.map(callback(element[, index[, array]]) [, thisArg])`

- `element` : 처리할 현재 요소
- `index` : 처리할 현재 요소의 인덱스
- `array` : map을 호출한 배열
- `thisArg` : callback을 사용할 때 this로 사용하는 값
- map은 filter와 매우 유사하다. 차이점은 filter는 조건을 만족하는 요소를 필터링할 때 주로 쓰이지만 map은 요소가 아닌 새로운 값을 만들어서 return할 수 있다.
- 기존 배열을 변경시키지 않는다.

```js
let arr = [1, 2, 3, 4, 5];
let resultArr = [];

resultArr = arr.map((item) => {
	return item ** 2;
});

console.log(resultArr); // [1, 4, 9, 16, 25]
console.log(arr); // [1, 2, 3, 4, 5]
```

### 12. sort() - 배열 정렬하기

`arr.sort([compareFunction])`

- `compareFunction` : 정렬 순서를 정의하는 함수. 생략하면 배열은 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 코드 포인트 값에 따라 정렬된다.
- 기존 배열을 변경시킨다.

```js
let arr = [1, 2, 100, 10, 222, 3];

// 유니코드에 따라 정렬
arr.sort();
console.log(arr); // [1, 10, 100, 2, 222, 3]

// 오름차순 정렬
arr.sort((a, b) => {
	return a - b;
});
console.log(arr); // [1, 2, 3, 10, 100, 222]

// 내림차순 정렬
arr.sort((a, b) => {
	return b - a;
});
console.log(arr); // [222, 100, 10, 3, 2, 1]
```

### 13. reverse() - 배열을 역순으로 정렬하기

`arr.reverse()`

- 기존 배열을 변경시킨다.

```js
let arr = [4, 2, 3, 5, 1];

arr.reverse();
console.log(arr); // [1, 5, 3, 2, 4]
```