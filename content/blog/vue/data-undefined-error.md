---
title: "[Vue.js] ❗️TypeError: Cannot read property of undefined"
date: 2020-05-31 11:05:54
category: vue
---

![](images/vue.png)

### ~~TypeError: Cannot read property of undefined~~

분명히 데이터가 있는데 undefined 의 속성을 찾을 수 없다고 에러가 발생할 때가 있다.

> 왜? 분명히 데이터가 있는데?! 왜 undefined 라는 거야?

<br>
아래의 예시를 보자.

### Example

나의 정보를 화면에 보여줄 것이며 나의 정보(`myInfo`)의 데이터 구조는 아래와 같다.
```js
myInfo = {
  name: "",
  age: 0,
  company: {
    location: ""
  }
}
```

<br>

이제 아래의 HTML 코드를 보자.  
`myInfo.name`, `myInfo.age`, `myInfo.company.location` 정보를 출력하는 코드이다.

```html
<div id="app">
  <h2>My Info</h2>
  <ul>
    <li>Name: {{ myInfo.name }}</li>
    <li>Age : {{ myInfo.age }}</li>
    <li>Company Location : {{ myInfo.company.location }}</li>
  </ul>
</div>
```

<br>

다음은 Vue.js 코드이다.

```js
new Vue({
  el: "#app",
  data: {
    myInfo: {},
  },
  mounted () {
  	this.getMyInfo();
  },
  methods: {
  	getMyInfo () {
      this.myInfo = { 
        name: "Jessie",
        age: 29, 
        company: {
          location: "Gangnam-gu"
        } 
      }
    }
  }
})
```
mounted 되면 `getMyInfo()` 함수를 실행하여 `myInfo` 데이터에 값을 넣는다.

바로 여기에서 문제가 된다.

mounted 훅은 vue 객체를 DOM에 붙인 시점이다.  
그런데 우리는 mounted 되면 `myInfo`에 `name`, `age`, `company` 속성을 추가하고 있다.

다시 말해서 `myInfo`에 아직 `name`, `age`, `company` 데이터가 없는 상태에서 HTML 코드에서 해당 데이터를 읽으려고 하기 때문에 에러가 나는 것이다.
사실 `myInfo.name`, `myInfo.age`, `myInfo.company`와 같은 데이터를 읽으려 할 때는 에러가 발생하지 않는다.  
각각의 정보는 undefined 이지만 undefined 라고 에러가 발생하지는 않기 때문이다.

하지만 `myInfo.company.location`처럼 **undefined의 속성에 접근**하려 할 때는 에러가 발생한다.  
`myInfo.company`는 undefined 이고 그 undefined 의 `location` 값을 읽으려고 하니 에러가 발생하는 것이다.

### 실행 결과
실행 결과는 정상적으로 나오는 것처럼 보인다.  
양방향 데이터 바인딩 이라서 `getMyInfo` 함수를 통해 `myInfo` 값을 변형시키면 그 값을 즉각 업데이트 하기 때문이다.

![](images/undefined-result.png)

### Error
하지만 `myInfo`에 값이 들어가기 전에 아래와 같이 Error가 발생하는 것이다.

![](images/undefined-error.png)

### 그러면 mounted 되기 전에 myInfo 데이터를 가져오면 되잖아?

vue 객체를 DOM에 붙이기 전에, 즉 created 훅에서 `getMyInfo`를 하면 어떻게 될까?

created 훅에서 `myInfo`를 가져오고 그 다음에 렌더링을 진행하면 에러가 발생할 일이 없지 않을까?  
아래와 같이 말이다.

```js
new Vue({
  el: "#app",
  data: {
    myInfo: {},
  },
  created () {
  	this.getMyInfo();
  },
  methods: {
  	getMyInfo () {
      this.myInfo = { 
        name: "Jessie",
        age: 29, 
        company: {
          location: "Gangnam-gu"
        } 
      }
    }
  }
})
```

### 예상이 맞았다! 에러는 발생하지 않는다! 그러나 ...

보통 우리는 서버에서 정보를 가져온다.  
AJAX 호출은 비동기로 이뤄지며, 콜 스택에 바로 담기지 않고 일단 태스크 큐에 추가된다.  

**렌더링이 완료된 다음에 태스크 큐에 담겨져 있던 AJAX 호출이 실행되는 것이다.**

지금은 테스트 서버가 없기 때문에 AJAX 호출과 마찬가지로 비동기로 이루어지는 Timer 를 이용해서 어떻게 동작하는지 살펴보자.

```js
new Vue({
  el: "#app",
  data: {
    myInfo: {},
  },
  created () {
  	this.getMyInfo();
  },
  methods: {
  	getMyInfo () {
      setTimeout(() => {
        this.myInfo = { 
          name: "Jessie",
           age: 29, 
           company: {
            location: "Gangnam-gu"
          } 
        }
      }, 0);
    }
  }
})
```

### 역시 "TypeError: Cannot read property 'location' of undefined" 에러가 발생한다.

### 해결 방법

결국 문제가 되는 건 undefined의 속성에 접근할 수 없는 것이기 때문에 우리는 렌더링 전에 undefined 의 속성에 접근하려 하는 것을 막으면 된다.

#### 1. data 정의할 때 처리하기 
아래와 같이 data 정의 부분에 `myInfo: {}` 부분을 `myInfo: { company: {} }` 로 초기화하면, `myInfo.company`가 undefined 는 아니기 때문에 `myInfo.company.location`에서 에러가 발생하지 않는다.

```js
data: {
  myInfo: {
    company: {}
  },
},
```

#### 2. v-if 로 조건문 걸기
아래와 같이 html 부분에서 렌더링 조건문을 걸면 에러가 발생하지 않는다.
```html
<li v-if="myInfo.company">
  Company Location : {{ myInfo.company.location }}
</li>
```

#### 3. Optional Chaining 사용하기 (ECMAScript2020에 도입됨)
[Optional Chaining](https://jess2.xyz/JavaScript/ecmascript-2020/#1-optional-chaining-code-classlanguage-textcode)을 이용해서도 해결할 수 있다.   

예를 들어 `data.prop`에 접근한다고 했을 때, 존재하지 않은 값(`data`)의 속성(`prop`)에 접근하려 하면 에러가 발생하는데   

`data?.prop`와 같이 Optional Chaining을 사용하면 왼쪽 연산자 값(`data`)이 `null`이나 `undefined`일 경우 실행을 멈추고 `undefined`를 return 하기 때문에 존재하지 않을 수 있는 값에 대한 예외 처리에 이용할 수 있다.

`myInfo.company.location` 의 예제에서도 아래와 같이 Optional chaining을 이용해 작성하면 `TypeError: Cannot read property 'location' of undefined` 에러를 막을 수 있다.

```html
<li>
  Company Location : {{ myInfo?.company?.location }}
</li>
```
- `myInfo`가 `null`이거나 `undefined`이면 `myInfo.company` 에 접근하지 않고 `undefined`를 return함.
- `myInfo.company`가 `null`이거나 `undefined`이면 `myInfo.company.location` 에 접근하지 않고 `undefined`를 return함.