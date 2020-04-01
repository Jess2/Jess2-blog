---
title: "[Vue.js] 라우터 설정"
date: 2020-02-10 00:02:11
category: vue
---

![](images/vue.png)

vue-cli로 생성한 vue.js 프로젝트의 App.vue 파일의 html 코드 부분을 보면 기본적으로 아래와 같이 작성되어 있다.

* App.vue

    ```html
    <template>
        <div id="app">
            <img src="./assets/logo.png">
            <router-view/>
        </div>
    </template>
    ```

위 코드에서 `<router-view/>` 부분에는 `src/router/index.js`의 라우터 설정에 따라 다른 컴포넌트가 보여지게 된다.

그렇다면 src/router/index.js를 살펴보자.

* src/router/index.js

    ```js
    import Vue from 'vue'
    import Router from 'vue-router'
    import HelloWorld from '@/components/HelloWorld'
    
    Vue.use(Router)
    
    export default new Router({
      routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        }
      ]
    })
    ```

기본적으로 `path`가 `/`일 경우에는 HelloWorld 컴포넌트를 렌더링하도록 설정되어 있다.

만약, base url이 [http://localhost:8080/#/](https://localhost:8080/#/) 이라면 [http://localhost:8080/#/](https://localhost:8080/#/) 에 접속했을 때 최상위 vue 파일인 App.vue의 `<router-view/>` 부분에 HelloWorld 컴포넌트가 렌더링된다.

그렇다면 List라는 컴포넌트가 있다고 가정하고 아래와 같이 라우터 설정을 해보자.

* src/router/index.js
    
    ```js
    import Vue from 'vue'
    import Router from 'vue-router'
    import HelloWorld from '@/components/HelloWorld'
    import List from '@/components/List' // List 컴포넌트 import
    
    Vue.use(Router)
    
    export default new Router({
      routes: [
        {
          path: '/',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '/list',
          name: 'List',
          component: List
        }
      ]
    })
    ```

base url이 [http://localhost:8080/#/](http://localhost:8080/#/) 이라면 [http://localhost:8080/#/list](http://localhost:8080/#/list) 에 접속했을 때 App.vue 의`<router-view/>` 부분에 List 컴포넌트가 렌더링된다.