---
title: "[Vue.js] Axios를 이용하여 서버와 통신하기"
date: 2020-04-01 20:17:15
category: vue
---

![](images/vue.png)

클라이언트에서 서버와의 통신이 필요할 때 Ajax나 XML을 이용할 수 있는데,  
**Axios는 Ajax 요청을 하도록 도와주는 라이브러리다.**

### 1. NPM 으로 Axios 설치

```shell script
$ npm i axios
```

### 2. main.js 에 import 및 설정

```js
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 100000;
axios.defaults.baseURL = '{url}'

// 캐싱 방지
axios.defaults.headers.get['Cache-Control'] = 'no-cache';
axios.defaults.headers.get['Pragma'] = 'no-cache';

Vue.prototype.$http = axios;
```

### 3. GET - 서버로 부터 데이터 Read 요청하기

```js
// 연락처 리스트 가져오기
getContacts () {
  this.$http.get(`/contacts`, {
  }).then(result => {
    this.targets = result.data;
  }).catch(error => {
    console.log(error);
  })
}
```

### 4. POST - 서버로 데이터 Create 요청하기

```js
// 연락처 추가하기
postContact () {
  this.$http.post(`/contacts`, {
    "name": "Jess2",
    "phone": "010-2222-3333"
  }).then(result => {
    this.targets = result.data;
  }).catch(error => {
    console.log(error);
  })
}
```

### 5. PUT - 서버로 데이터 Update 요청하기

```js
// 연락처 추가하기
putContact () {
  this.$http.post(`/contacts/${id}`, {
    "name": "Jess2",
    "phone": "010-2222-3333"
  }).then(result => {
    this.targets = result.data;
  }).catch(error => {
    console.log(error);
  })
}
```

### 6. DELETE - 서버로 데이터 Delete 요청하기

```js
// 연락처 추가하기
deleteContact () {
  this.$http.delete(`/contacts/${id}`, {
  }).then(result => {
    this.targets = result.data;
  }).catch(error => {
    console.log(error);
  })
}
```
