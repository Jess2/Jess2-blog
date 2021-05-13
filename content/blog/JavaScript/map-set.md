---
title: "[JavaScript] ES6 : Map과 Set 익히기"
date: 2021-05-13 23:05:55
category: javascript
---

![](images/javascript.png)

무조건 Object와 Array를 사용하는 것보다, Map과 Set을 사용하는 것이 더 적합하고 코드도 간결해지는 경우가 있다.

ES6의 기능인 Map과 Set에 대해서 알아보자. 

# Map
> 객체와 유사한 콜렉션

- key와 value를 같이 저장하는 객체와 같은 형태이다.
- 객체와 유사하지만 더 많은 기능을 제공한다.

<br />

### 자주 쓰이는 Map의 메소드
- `set(key, value)` : Map 객체에 key와 value를 넣고 그 객체를 반환한다. (값 설정하기)
- `get(key)` : 주어진 키에 해당하는 값을 반환한다.
- `size` : Map 객체에 들어있는 key/value pair의 수를 반환한다.
- `clear()` : Map 객체의 모든 key/value pair를 제거한다.
- `delete(key)` : 주어진 키(Key)와 해당되는 값(Value)를 제거한다.
- `has(key)` : Map 객체 안에 주어진 key/value pair가 있는지 검사하고 Boolean 값을 반환한다.
- `keys()` : Map 객체 안의 모든 키(Key)들을 집어넣은 순서대로 가지고 있는 Iterator 객체를 반환한다.
- `values()` : Map 객체 안의 모든 값(Value)들을 집어넣은 순서대로 가지고 있는 Iterator 객체를 반환한다.

<br />

### Example

```js
let myInfo = new Map();

myInfo.set('name', 'Jessie');
myInfo.set('age', 29);
myInfo.set('job', 'FE Developer');

console.log(myInfo); // {"name" => "Jessie", "age" => 29, "job" => "FE Developer"}
console.log(myInfo.get('name')); // Jessie
console.log(myInfo.size); // 3

myInfo.delete('age')
console.log(myInfo); // {"name" => "Jessie", "job" => "FE Developer"}
console.log(myInfo.has('age')); // false

console.log(myInfo.keys()); // {"name", "job"}
console.log(myInfo.values()); // {"Jessie", "FE Developer"}
```

<br />

### for-of 문으로 Map 순회하기

```js
let score = new Map();

score.set('국어', 90);
score.set('수학', 85);
score.set('영어', 70);

for (let [key, value] of score) {
  console.log(key + ':' + value);
}
/*
국어:90
수학:85
영어:70
*/

for (let i of score) {
  console.log(i);
}
/*
['국어', 90]
['수학', 85]
['영어', 70]
*/
```

<br />

# Set
> 중복 값을 제외한 배열과 유사

- 배열을 Set으로 변환하면 중복값이 제거된 상태로 만들어진다.

<br />

### 자주 쓰이는 Set의 메소드
1. `add(value)` - 새로운 요소 추가하기
2. `delete(value)` - 해당 요소 삭제하기
3. `has(value)` - 특정 값을 가지고 있는지 확인하기
4. `clear()` - 모든 요소 제거하기
5. `size` - set의 크기

<br />

### Example
```js
var arr = [1,1,2,3,4];
var set = new Set(arr);

console.log(arr); // [1, 1, 2, 3, 4]
console.log(set); // {1, 2, 3, 4}
console.log(set.size === arr.length); // false
console.log(set.has(1)); // true
```