---
title: "[Vue.js] 프로젝트 추천 구조"
date: 2020-02-09 23:02:20
category: vue
---

![](images/vue.png)

프로젝트 구조에는 정답이 없다고 생각하지만, 아래와 같은 구조를 추천한다.

### Vue.js 프로젝트 추천 구조

        ├── build
        |    ├── build.js
        |		 ├── check-versions.js
        |		 ├── logo.png
        |		 ├── utils.js
        |		 ├── vue-loader.conf.js
        |		 ├── webpack.base.conf.js
        |		 ├── webpack.dev.conf.js
        |		 └── webpack.prod.conf.js
        |
        ├── config
        |		 ├── dev.env.js
        |		 ├── index.js
        |		 └── prod.env.js
        |
        ├── dist
        |		 ├── static
        |		 └── index.html
        |
        ├── node_modules
        |
        ├── src   
        | 	 ├── assets
        |	 	 |    ├── css
        |		 |    |   └── App.scss
        |		 |    ├── font 
        |		 |    └── images
        |		 ├── components
        |		 |    ├── RangeCustom
        |		 |    |    ├── RangeCustom.scss
        |		 |    |    └── RangeCustom.vue
        |		 |    └── Sidebar
        |		 |         ├── Sidebar.scss
        |		 |         └── Sidebar.vue 
        |		 ├── pages
        |		 |    ├── Login
        |		 |    |    ├── components
        |		 |    |    ├── Login.scss
        |		 |    |    └── Login.vue
        |		 |    └── Products 
        |		 |         ├── components
        |		 |         ├── Products.scss
        |		 |         └── Products.vue
        |		 ├── router
        |		 |    └── index.js
        |		 ├── store
        |		 |    ├── modules 
        |		 |    └── store.js
        |		 ├── App.vue
        |		 └── main.js
        |
        ├── static
        |		 └── favicon.ico
        |
        ├── index.html
        ├── package-lock.json
        └── package.json


1. **build**
    - 배포시 관련 설정들이 들어있는 폴더.
    - webpack.config.js : webpack 설정 파일. webpack 빌드를 위해 필요한 로직들을 정의 하는 파일이다. webpack의 핵심 파일이라고 생각하면 된다. 이 파일에는 webpack의 core인 entry, output, loaders, plugins의 정보가 들어간다.
2. **config**
    - 프로젝트에서 사용되는 설정이 모여 있는 폴더.
    - dev.env.js : `npm run dev` 명령어를 입력하면 적용되는 설정이다.
    - prod.env.js : `npm run build` 로 배포 버전에 적용되는 설정이다.
3. **dist**
    - `npm run build` 명령어를 입력하면 dist 폴더가 자동으로 생성되며, webpack이 dist 폴더에 빌드 결과물을 생성한다.
4. **node_modules** : npm으로 설치되는 서드파트 라이브러리들이 모여있는 폴더.
5. **src** 
    - assets : 공용 css 파일이나 이미지 파일 등을 모아놓는 폴더
    - shared-components : 여러 페이지에서 공용으로 사용하는 컴포넌트를 모아놓는 폴더
    - pages : Single Application Page
    - router : 라우터 설정 관리
    - store: Vue.js 상태 관리
    - App.vue : 최상위 vue 파일
    - main.js : vue 인스턴스를 새로 만들고 시작하는 부분으로, 전역으로 처리해야 할 일이 있으면 여기서 처리한다.
6. **static**
7. **index.html**
    - HTML 시작 페이지이다.
8. **package.json**
    - npm 의존성 모듈 목록 및 프로젝트 기본 설정들이 포함되어 있다. 개발모드로 실행하는 것과 배포를 할 수 있는 명령어들이 정의되어 있다.