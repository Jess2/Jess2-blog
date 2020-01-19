---
title: "[Vue.js] 프로젝트 생성 및 환경 설정"
date: 2020-01-19 20:01:73
category: vue
---

![](images/vue.png)

Vue.js 프레임워크를 사용한 **프로젝트 생성 방법**에 대해 알아보고, 추가적으로 함께 설치하면 좋은 **라이브러리**와 **환경 설정**에 대해 알아보자.

### 1. Node.js 설치

[https://nodejs.org/ko/](https://nodejs.org/ko/) 링크로 접속하여 LTS버전의 Node.js를 설치한다. Vue의 다양한 프로토타이핑 프로젝트를 CLI로 생성하기 위해서는 반드시 Node.js 설치가 필요하다.

### 2. Vue.js 프로젝트 생성

Vue.js 프로젝트 생성 방법은 아래와 같다. 터미널을 열어서 원하는 저장경로에 아래와 같이 차례대로 입력한다.

```bash
npm install -g @vue/cli
vue init webpack <projectname>
cd <projectname>
npm run dev
```

- `npm install -g @vue/cli` : Vue Cli를 설치한다. Vue Cli란, 뷰 코어팀에서 제공하는 일종의 터미널용 도구이다. Vue Cli를 설치하면 터미널에서 간단한 명령어를 통해서 프로토타입 프로젝트를 쉽게 만들 수 있다.
- `vue init webpack-simple <projectname>` : Vue Cli 프로젝트 생성 명령어 중 하나로, 웹팩 최소 기능을 활용한 구성 방식이다. 빠른 화면 프로토타이핑용이다.
- `vue init webpack <projectname>` : Vue Cli 프로젝트 생성 명령어 중 하나로, 고급 웹팩 기능을 활용한 구성 방식이다. 테스팅, 문법 검사 등을 지원한다.
- `cd <projectname>` : 프로젝트 경로로 이동한다.
- `npm run dev` : webpack-dev-server(node 기반 웹서버)가 자동으로 동작하며 프로젝트가 브라우저에서 열린다(localhost:8080)

### 3. Vuex 설치

Vuex는 Vue.js 애플리케이션에 대한 **상태 관리 패턴 + 라이브러리** 이다. 애플리케이션의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할을 하며 상태를 변경할 수 있다. Vue.js 프로젝트에 Vuex를 함께 사용하려면 아래의 명령어를 통해 Vuex를 설치한다. 

```bash
npm install vuex --save
```

### 4. Sass/Scss 설치

CSS Preprocessor인 Scss를 Vue.js와 함께 사용하기 위해서는 아래의 명령어를 입력한다.

```bash
npm i vue-style-loader css-loader sass-loader@7.3.1 style-loader
npm i node-sass
```

### 5. 빌드 버전 Console.log 지우기

개발을 하다보면 Console.log 출력을 하기도 하는데, 빌드 버전에서는 Console.log 출력이 안되도록 설정할 수 있다. **webpack.prod.conf.js** 파일 내에 아래와 같이 두가지를 추가한다.

- drop_debugger: ture
- drop_console: ture

```js
plugins: [
    ...
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_debugger: true,
              drop_console: true
            }
          },
    ...
]
```