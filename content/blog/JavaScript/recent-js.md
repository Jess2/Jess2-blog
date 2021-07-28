---
title: "[JavaScript] 자바스크립트 최신 문법 살펴보기"
date: 2021-07-28 13:07:25
category: javascript
---

![](images/javascript.png)

> ES6 이후부터 추가된 많은 문법들이 IE에서는 지원이 되지 않기 때문에 지원 여부를 확인하고 Babel을 이용해야 한다.

### Shorthand Property Names

자바스크립트에서 Object는 key와 value로 이루어져 있는데 key와 value의 이름이 동일한 경우에는 하나로만 축약해서 작성할 수 있다.

```jsx
const name = 'Jessie';
const age = 30;

const myInfo1 = {
  name: name,
  age: age,
};

const myInfo2 = {
  name,
  age,
};
```

<br />

### Destructuring Assignment - Object

```jsx
const student = {
  name: 'jessie',
  age: 30,
};

{
  const name = student.name;
  const age = student.age;
  console.log(name, age); // jessie 30
}

{
  const { name, age } = student;
  console.log(name, age); // jessie 30
}

{
  const { name: newName, age: newAge } = student;
  console.log(newName, newAge); // jessie 30
}
```

object에 있는 key와 동일한 이름을 `{}` 안에 정의해주고 object를 할당하게 되면 object내의 key-value가 각각 할당이 된다.   

만약 다른 이름으로 선언하고 싶다면 `:`을 이용할 수 있다.

<br />

### Destructuring Assignment - Array

```jsx
const animals = ['dog', 'cat'];

{
  const first = animals[0];
  const second = animals[1];
  console.log(first, second);
}

{
  const [first, second] = animals;
  console.log(first, second);
}
```

array에서도 destructuring assignment를 할 수 있는데, `[]` 안에 변수명을 자유롭게 정의해줄 수 있다.

<br />

### Spread Syntax

- Spread Syntax는 배열 내 원소로 존재하는 Object 안에 들어있는 아이들을 모두 다 하나하나씩 복사해오는 것이 아니라 Object가 가리키고 있는 주소의 참조 값만 복사해서 온다.
- 여러 배열들의 원소를 합쳐서 새로운 배열을 만들거나, 여러 객체들의 속성을 합쳐서 새로운 객체를 만들 때 사용할 수 있다.
- example 1 - array

    ```jsx
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };
    const array = [obj1, obj2];

    // array copy
    const arrayCopy = [...array];
    ```

    - `arrayCopy` : 배열 내 원소들을 하나씩 펼쳐서 배열을 만든다

- example 2 - array

    배열 내 원소들을 복사해오면서 새로운 아이템을 추가하고 싶을 경우 아래와 같이 할 수 있다.

    ```jsx
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };
    const array = [obj1, obj2];

    // array copy + add item
    const arrayCopy = [...array, { key: 'value3' }]; // [{ key: 'value1' }, { key: 'value2' }, { key: 'value3' }]
    ```

- example 3 - object

    ```jsx
    const obj1 = { key: 'value1' };
    const obj2 = { key: 'value2' };

    const obj3 = { ...obj1 };
    console.log(obj3); // { key: 'value1' }

    const obj4 = { ...obj1, ...obj2 };
    console.log(obj4); // { key: 'value2' }
    ```

    - array와 마찬가지로 object도 spread syntax를 이용해서 속성들을 복사해올 수 있다.
    - object key 값이 동일할 경우 가장 나중에 추가된 것이 최종 값이 된다.
    
<br />

### Default Parameters

- 함수를 정의할 때 매개변수를 받아오는 경우, 디폴드 값을 지정할 수 있다.

```jsx
function printMessage(message = 'hello') {
  console.log(message); // hello
}

printMessage();
```

- 함수를 호출할 때 인자 값을 넘길 경우에는 해당 인자값을 함수에서 매개변수로 받는다
- 함수를 호출할 때 인자 값을 넘기지 않을 경우에는 default 로 지정한 값이 할당된다.

<br />

### Ternary Operator

```jsx
const isCat = true;
let component;

if (isCat) {
  component = 'kitty';
} else {
  component = 'dooboo';
}

console.log(component); // kitty
```

위의 코드를 Ternary Operator를 이용하면 아래와 같이 간결하게 작성할 수 있다.

```jsx
const component = isCat ? 'kitty' : 'dooboo';
console.log(component); // kitty
```

<br />

### Template Literals

```jsx
console.log('My name is ' + name + ' and I am ' + age + 'years old');
```

위의 코드를 Template Literals를 이용하면 아래와 같이 간결하게 작성할 수 있다.

```jsx
console.log(`My name is ${name} and I am ${age} years old`);
```

<br />

### Optional Chaning (?.)

```jsx
const person1 = {
  name: 'Jessie',
  job: {
    title: 'Frontend Developer',
    years: 3,
  }
}

const person2 = {
  name: 'Lia',
}

function printJobTitle(person) {
  console.log(person.job.title);
}

printJobTitle(person1); // Frontend Developer
printJobTitle(person2); // Uncaught TypeError: Cannot read property 'title' of undefined
```

- `person1`은 `job`도 있고 `job`의 `title`도 가지고 있기 때문에 정상 호출 된다.
- `person2`는 `job`을 가지고 있지 않아서 `printJobTitle` 함수 내에서 `person.job` 부분에서 `undefined` 가 되기 때문에 `person.job.title`은 `undefined.title` 을 찾으려고 해서 에러가 발생한다.

    ⇒ 이 문제는 if문이나 Ternary Operator나 &&를 사용해서 해결할 수 있지만 코드가 너무 길어진다. Optional Chaning을 이용하면 쉽고 간결하게 해결할 수 있다.

    ```jsx
    function printJobTitle(person) {
      console.log(person?.job?.title);
    }
    ```
  
<br />

### Nullish Coalescing Operator (??)

```jsx
const name = 'Jessie';
const userName = name || 'Guest';
console.log(userName);
```

- falsy 한 값 : `false`, `''`, `0`, `null`, `undefined`
- `||` 연산자는 앞에 있는 값이 falsy일 때만 뒤에 있는 것이 실행 되는 성질을 가지고 있다.
- 위에서는 `name`이 `null`이거나 `undefined` 인 경우에만 `Guest`를 할당하고 싶은데 문자열이 비어있는 경우나 다른 falsy한 값으로 존재할 경우에도 `userName`이 `Guest`로 할당이 된다.

    ⇒ 이럴 때는 Nullish Coalescing Operator 를 이용해서 해결할 수 있다.

    ```jsx
    const name = 'Jessie';
    const userName = name ?? 'Guest';
    console.log(userName);
    ```

### Reference

- [자바스크립트 최신 문법 (ES6, ES11)]([https://www.youtube.com/watch?v=36HrZHzPeuY](https://www.youtube.com/watch?v=36HrZHzPeuY))