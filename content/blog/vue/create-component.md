---
title: "[Vue.js] 컴포넌트 생성"
date: 2020-03-30 20:03:60
category: vue
---

![](images/vue.png)

vue-cli로 프로젝트를 생성하면 src 폴더 안에 components 폴더가 기본으로 존재한다. 이 components 폴더 안에는 여러 페이지에서 공용으로 쓰이는 popup이나 header, footer 같은 컴포넌트들을 모아 놓을 것이다.

이제 src 폴더 안에 pages라는 폴더를 새로 생성하자. 이 pages 폴더 안에는 실제 페이지 단위로 쓰이는 컴포넌트들을 모아 놓을 것이다.

그러면 본격적으로 컴포넌트를 하나 만들어보자. 로그인 페이지를 만들 것이다. 아래와 같이 pages 폴더 안에 login 폴더를 만들고 그 안에 Login.vue 파일과 Login.scss 파일을 만들자.

![](images/bc.png)

파일을 다 만들었다면 Login.vue 에 아래와 같이 코드를 작성하자.

```html
<template>
  <div class="login">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login Page'
    }
  }
}
</script>

<style scoped lang="scss">
  @import "Login";
</style>
```

vue 파일은 크게 세 부분으로 나뉜다. template, script, style.

- **template** : html 코드를 작성
- **script** : JavaScript 코드를 작성
- **style** : css 코드를 작성. (보통 style 태그 안에 직접 css 코드를 작성하진 않고 별도로 만든 css 파일을 import 시킨다.)

그럼 방금 만든 Login 컴포넌트의 라우터 설정을 해보자. 라우터 설정 방법은 [여기](https://jess2.xyz/vue/npm-router)에 정리되어 있다.

src/router/index.js 에 아래와 같이 라우터 설정을 하면 된다.

```js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/pages/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
```

라우터 설정까지 마쳤다면, 터미널을 열어 `npm run dev` 명령어를 입력한다. 그러면 [http://localhost:8080/#/](http://localhost:8080/#/) 페이지가 자동으로 열리고 기본적으로 HelloWorld 컴포넌트가 렌더링된다.

브라우저 주소창에 [http://localhost:8080/#/login](http://localhost:8080/#/login) 을 입력하여 접속하면 Login 컴포넌트가 렌더링 되는 것을 확인할 수 있다.