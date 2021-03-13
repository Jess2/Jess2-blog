---
title: "[WEB] Webpack"
date: 2021-03-10 22:03:75
category: web
---

![](images/web.png)

# 0. Index
1. [Node.js와 NPM](#1-nodejs와-npm)
2. [Webpack](#2-webpack)
3. [Babel과 ES6 모듈 문법](#3-babel과-es6-모듈-문법)
4. [webpack.config.js 설정 더 자세히 살펴보기](#4-webpackconfigjs-설정-더-자세히-살펴보기)
5. [Webpack Dev Server](#5-webpack-dev-server)

<br />

# 1. Node.js와 NPM

### 1. Node.js / NPM 설치

- 먼저 Node.js를 설치해야 한다.
    - [https://nodejs.org/ko/](https://nodejs.org/ko/) (LTS 버전 설치)
    - Node.js를 설치하면 npm이 함께 설치된다.
- 아래의 명령어로 node.js와 npm이 잘 설치되었는지 version을 확인해볼 수 있다.

    ```bash
    $ node -v
    $ npm -v
    ```

<br />

### 2. NPM 초기화

- 아래의 명령어로 npm을 기본값으로 초기화할 수 있다.

    ```bash
    $ npm init -y
    ```

- 그러면 아래와 같은 내용을 포함한 package.json 파일이 자동으로 생성된다.

    ```json
    {
      "name": "프로젝트 이름",
      "version": "1.0.0",
      "description": "",
      "main": "main.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
    ```

<br />

### 3. NPM 특정 라이브러리 설치 명령어

- 아래의 명령어로 npm 특정 라이브러리를 설치할 수 있다.

    ```bash
    $ npm install {라이브러리 이름}
    ```

- 라이브러리 설치가 완료되면 node_modules라는 폴더가 생성되고 그 안에 라이브러리가 설치된다.

    package.json 에 아래의 내용이 추가된다. 예를 들어 `jquery` 라는 라이브러리를 설치했을 경우 아래와 같이 `dependencies` 속성으로 라이브러리 이름과 설치된 버전이 추가된다.

    ```json
    "dependencies": {
      "jquery": "^3.6.0"
    }
    ```

    만약 명령어 뒤에 `--save-dev` 를 함께 붙여서 설치한다면 `dependencies`가 아니라 `devDependencies` 속성으로 추가된다.

<br />

### 4. NPM을 사용하는 이유와 장점

- NPM은 자바스크립트 라이브러리를 설치하고 관리할 수 있는 패키지(라이브러리) 매니저로, 전 세계 JS 개발자들이 모두 라이브러리를 공개된 저장소에 올려놓고 npm 명령어로 편하게 다운로드 받을 수 있다.
- 라이브러리들의 버전과 의존성이 편하게 관리된다.
- cdn을 일일이 들고오는 것보다 npm install로 설치하면 편리하게 설치할 수 있다.

<br />

### 5. NPM 명령어

- 설치
    - dependencies

        ```bash
        $ npm install {라이브러리 이름}
        # or
        $ npm i {라이브러리 이름}
        ```

    - devDependencies

        ```bash
        $ npm install {라이브러리 이름} --save-dev
        # or
        $ npm i {라이브러리 이름} -D
        ```

- 제거

    ```bash
    $ npm uninstall {라이브러리 이름}
    ```

- 전역 설치

    ```bash
    $ npm install {라이브러리 이름} --global
    # or
    $ npm install {라이브러리 이름} -g
    ```

    - 해당 프로젝트 node_modules 폴더 안에 설치 되지 않는다.
    - 어느 위치에서 해당 명령어를 실행하든 그 위치에 설치가 되는 것이 아니라 아래의 폴더에 설치된다. (시스템 레벨의 전역으로 설치되는 것)

        ```bash
        # windows
        %USERPROFILE%\AppData\Roaming\npm\node_modules

        # macOS
        /usr/local/lib/node_modules
        ```

<br />

### 6. dependencies와 devDependencies의 차이점

- dependencies
    - `npm i {라이브러리 이름}`
    - 애플리케이션 로직과 연관이 있는 배포용 라이브러리
    - 예를 들어, `jQuery`는 화면의 DOM을 조작하기 위한 유틸성 라이브러리이기 때문에 배포용 라이브러리이다.
    - ex) `react`, `angular`, `chart`
- devDependencies
    - `npm i {라이브러리 이름} -D`
    - 개발을 할 때 도움을 주는 개발용 라이브러리
    - ex) `webpack`, `js-compression`, `sass`

<br />

# 2. Webpack

### 1. 모듈과 웹팩 그리고 번들링

- 모듈 : 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위
- 웹팩 : 최신 FE 프레임워크에서 가장 많이 사용되는 모듈 번들러
- 웹팩에서의 모듈 : 웹 애플리케이션을 구성하는 모든 자원 (HTML, CSS, JS, Images, Font 등.. 파일 하나하나가 모두 모듈이다.)
- 모듈 번들러 : 웹 애플리케이션을 구성하는 자원(HTML, CSS, JS, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구
- 모듈 번들링 : 몇십, 몇백개의 자원들을 하나의 파일로 합쳐준다.

    ![](images/webpack.png)

<br />

### 2. 웹팩 튜토리얼

1. npm 초기화

    ```bash
    $ npm init -y
    ```

2. webpack 설치

    ```bash
    $ npm i webpack webpack-cli -D
    ```

3. lodash 설치 (JS 유틸리티 라이브러리)

    ```bash
    $ npm i lodash
    ```

4. index.html 생성

    ```html
    <html>
    <head>
      <title>Webpack Demo</title>
      <script src="https://unpkg.com/lodash@4.16.6"></script>
    </head>
    <body>
      <script src="src/index.js"></script>
    </body>
    </html>
    ```

5. src/index.js 생성

    ```jsx
    function component() {
      var element = document.createElement('div');

      /* lodash is required for the next line to work */
      element.innerHTML = _.join(['Hello','webpack'], ' ');

      return element;
    }

    document.body.appendChild(component());
    ```

6. 웹팩 빌드 결과물로 실행하기 위해 아래와 같이 수정
    - index.html

        ```html
        <html>
          <head>
            <title>Webpack Demo</title>
          </head>
          <body>
            <script src="dist/main.js"></script>
          </body>
        </html>
        ```

    - src/index.js 에 lodash 라이브러리 import 문 추가

        ```jsx
        import _ from 'lodash';

        //...
        ```

7. 웹팩 빌드 명령어를 실행하기 위해 package.json 파일에 커스텀 명령어 추가

    ```json
    "scripts": {
    	//...
    	"build": "webpack"
    }
    ```

8. 마지막으로 `npm run build` 명령어를 실행하면 dist 폴더에 번들링 결과물이 생성된다.

<br />

### 3. 웹팩 설정

- 루트 경로에 webpack.config.js 추가

    ```jsx
    // `webpack` command will pick up this config setup by default
    var path = require('path');

    module.exports = {
      mode: 'none',
      entry: './src/index.js',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
      }
    };
    ```

    - `var path = require('path');` : node.js의 모듈 문법이라고 보면 된다. path 라이브러리를 들고 와서 `path`라는 변수에 담는다. 그래서 이 `path`의 `resolve`라는 api 를 사용하게 된다.
    - 빌드 모드는 `development`, `production`, `none` 총 3가지로 지정할 수 있다. `none`을 설정하지 않으면 빌드 결과물이 난독화 되어 나온다.
- 빌드(번들링) 결과물 경로 변경 방법
    - 아무런 설정을 하지 않으면 src/index.js 파일 번들링 된 결과물이 기본적으로 dist 폴더 밑에 main.js 파일명으로 추가된다. (dist/main.js)
    - 만약 이 폴더 경로와 파일명을 public/output.js 와 같이 변경하고 싶다면 webpack.config.js 파일에서 아래와 같이 수정해주면 된다.

        ```jsx
        //..
        module.exports = {
          //..
          output: {
            filename: 'output.js',
            path: path.resolve(__dirname, 'public')
          }
        };
        ```

<br />

### 4. 웹팩 소개 추천 영상

- [Front End Center — Webpack from First Principles](https://www.youtube.com/watch?v=WQue1AN93YU)

<br />

### 5. 웹팩 등장 배경

- 파일 단위의 자바스크립트 모듈 관리
    - 모듈 개념이 없었을 때는 파일 단위로 스코프가 정해지지 않아서 `a.js` 에서 선언한 변수를 `b.js` 에서 사용할 수 있고 수정할 수 있어서 문제가 있었다.
    - 파일 단위로 기능이 구분되어야 하는 필요성 때문에 ES6+에 `modules`라는 문법으로 import, export 개념이 언어 레벨까지 들어오게 되었다.
- 웹 개발 작업 자동화 도구
    - 코드를 수정하고 저장한뒤 브라우저에서 새로고침을 해야 화면에서 변경된 내용을 볼 수 있었다.
    - 웹 서버에 배포할 때 HTML, CSS, JS, 이미지 압축, CSS 전처리기 변환을 해줘야 했는데 이러한 일을 자동화 해주는 도구가 필요했다.
- 웹 애플리케이션의 빠른 로딩 속도와 높은 성능
    - 로딩 속도를 높이려고 서버로 요청하는 파일 수를 줄이기 위해서 웹 태스크 매니저를 이용해 파일을 압축하고 병합하는 작업을 했었다.
    - 웹팩은 파일을 압축하는 작업을 해줄 뿐만 아니라 초기 페이지 로딩 속도를 높이기 위해 나중에 필요한 자원들은 필요할 때 요청하는 레이지 로딩 기능을 제공한다.

<br />

# 3. Babel과 ES6 모듈 문법

### 1. Babel

- [https://babeljs.io/docs/en/learn](https://babeljs.io/docs/en/learn)
- JS의 최신 문법들을 최대한 많은 브라우저에서 호환될 수 있도록 변환해주는 도구
- Babel 설치

    ```bash
    $ npm i @babel/core @babel/preset-env babel-loader -D
    ```

<br />

### 2. ES6 Modules

- export
    - 다른 파일에서 가져다 쓸 변수나 함수 앞에 `export` 키워드를 붙인다.

        ```jsx
        export var name = 'Jessie';
        export function sum(a, b) {
          return a + b;
        }
        ```

- import
    - export된 변수나 함수를 `{ }` 안에 선언하여 사용한다.

        ```jsx
        import { name, sum } from '파일 경로';

        console.log(name); // Jessie
        console.log(sum(10, 20)); // 30
        ```

<br />

### 3. sourcemap - 빌드 결과물 분석

- webpack.config.js 파일에 `devtool: 'source-map'` 속성을 추가해주면 빌드되기 전의 원본 파일을 개발자도구에서 볼 수 있다.
- 웹 애플리케이션은 빌드(번들링)된 파일로 동작하지만, 개발자도구 Sources 탭에서 빌드하기 전의 원본 파일을 볼 수 있게 되는 것이다. (sourcemap)
- 이 기능을 이용하면 개발을 하다가 디버깅이 필요할 때 개발자도구에서 원본 파일을 볼 수 있기 때문에 편리하다.
- 하지만 이 소스 맵이 켜져 있으면 프로젝트 전체 소스가 다 보이기 때문에 실서버에 실제 배포할 때는 끄는 것이 좋다.

<br />

# 4. webpack.config.js 설정 더 자세히 살펴보기

```jsx
var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
```

### 1. mode

- 웹팩 버전 4부터 mode 가 추가되었다.
- 실행 모드 3가지 : `production`, `development`, `none`
- `development` : 개발자들이 좀 더 보기 편하게 웹팩 로그나 결과물이 보여진다.
- `production` : 성능 최적화를 위해 기본적인 파일 압축 등의 빌드 과정이 추가된다.
- `none` : 난독화 되지 않고 번들링된다.
- mode 값을 설정하지 않으면 `production`으로 자동 설정된다.

<br />

### 2. entry

- 빌드를 할 대상 파일(최초 진입점) 지정

<br />

### 3. output

- 빌드를 하고 난 결과물에 대한 정보를 정의
- `filename`: 빌드 결과물 파일 이름 지정
- 파일 내부 내용이 변하더라도 이 `filename`이 동일하면, 브라우저 캐싱 때문에 같은 파일을 화면에 뿌려주기 때문에 강제 새로고침을 해야 한다.
- `filename`을 `'[name].[hash].bundle.js'` 와 같이 정의하면, 웹팩이 해시 값을 이용해서 빌드를 할 때마다 고유 값들을 붙여준다. 이렇게 되면 filename이 변경되기 때문에 브라우저 캐싱이 되지 않고 변경된 파일을 사용자가 정상적으로 볼 수 있도록 해준다.

    ```jsx
    output: {
      //...
      filename: '[name].[hash].bundle.js'
    },
    ```

<br />

### 4. module

- `entry`에서 `output`으로 변환을 할 때 중간에 개입하는 Loader.
- 웹팩이 웹 애플리케이션 내 파일간의 관계를 파악하고 해석할 때 JS 파일이 아닌 웹 자원(HTML, CSS, Images, Font, ...)들을 변환해주어 번들링된 파일 안에 들어갈 수 있도록 도와준다.
- `rules`: 웹팩으로 변환할 때 적용될 로더들을 배열 안 객체 형태로 추가한다.
- `test`: 로더를 적용할 파일의 확장자 지정
- `use`: 로더 지정
- example

    ```jsx
    module: {
      rules: [{
    		test: /\.css$/,
    		use: ['style-loader', 'css-loader']
    	}]
    },
    ```

    - `.css` 확장자를 가진 모든 파일을 대상으로 `style-loader`,`css-loader` 로더를 적용
- 만약 `index.js` 에 `base.css` 라는 파일을 import한 상태에서 위의 설정처럼 필요한 로더를 정의하지 않고 빌드를 하면 어떻게 될까?
    - 에러 발생!
    - 처음에 `index.js` 를 가지고 해석을 시작하는데 `index.js` 안에 있는 `base.css` 를 보고 이걸 빌드 결과물에 css 코드를 넣으려고 할 때 fail 이 뜬다.
    - 사실 원래 JS 파일 안에 CSS를 넣을 수 없다. 그래서 로더를 설정해야 한다는 에러가 발생하는 것.

        `ERROR in ./base.css
        Module parse failed: Unexpected token
        You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.`

- 아래와 같이 `css-loader` 만 로더로 지정해주고 빌드를 하면 어떻게 될까?

    ```jsx
    module: {
      rules: [{
    		test: /\.css$/,
    		use: ['css-loader']
    	}]
    },
    ```

    - 에러는 발생하지 않는다!
    - 하지만 `base.css` 파일에서 지정한 스타일이 적용되지 않는다!
- 만약 아래와 같이 `css-loader`를 먼저 로더로 지정해주고, `style-loader`를 그 다음에 로더로 지정해주면 어떻게 될까?

    ```jsx
    module: {
      rules: [{
    		test: /\.css$/,
    		use: ['css-loader', 'style-loader']
    	}]
    },
    ```

    - 에러 발생!
    `ERROR in ./base.css
    Module build failed (from ./node_modules/css-loader/dist/cjs.js): CssSyntaxError`
    - **로더는 오른쪽에서 왼쪽 순서로 거꾸로 적용된다!!!**
- 아래와 같이 순서를 꼭 지켜줘야 한다.

    ```jsx
    module: {
      rules: [{
    		test: /\.css$/,
    		use: ['style-loader', 'css-loader']
    	}]
    },
    ```

    1. `css-loader`: 빌드 결과물에 css 코드를 포함시켜준다.
    2. `style-loader`: 스타일 코드를 `<head>` 태그 안에 인라인 스타일로 넣어 주는 역할을 한다.
- scss도 아래와 같이 설정할 수 있다.

    ```jsx
    module: {
      rules: [{
    		test: /\.scss$/,
    		use: ['style-loader', 'css-loader', 'sass-loader']
    	}]
    },
    ```

    1. `sass-loader`: sass 를 먼저 css 파일로 바꾸고
    2. `css-loader`: 빌드 결과물에 css 코드를 포함시켜주고
    3. `style-loader`: 빌드 결과물 내 스타일 코드를 <head> 태그 안에 인라인으로 넣어준다

<br />

### 5. plugins

- 웹팩 기본 동작에 추가적인 기능을 제공하는 속성
- 로더는 파일을 해석하고 변환하는 과정에 관여하지만, 플러그인은 해당 결과물의 형태를 바꾸는 역할
- example : `html-webpack-plugin`

    ```jsx
    // webpack.config.js
    var HtmlWebpackPlugin = require('html-webpack-plugin');

    //...
    module.exports = {
    	//...
    	plugins: [
    	  new HtmlWebpackPlugin({
    	    template: 'index.html',
    	  })
    	],
    	//...
    }
    ```

    - `index.html` template 기반으로 빌드 결과물을 추가해준다.
    - 만약에 template 지정을 해주지 않으면 웹팩 빌드 결과물에 대해서 html 파일을 만들어주고 그 다음에 그 안에 빌드 내용물들을 담는다.

<br />

### 6. 기타 Loader/Plugin들 사용할 때 참고할 수 있는 링크

- 필요한 로더/플러그인들은 아래의 링크에서 확인하고 가져다가 쓸 수 있다. 어떤식으로 쓰면 되는지 다 문서화가 되어 있다.
- [https://webpack.js.org/loaders/](https://webpack.js.org/loaders/)
- [https://webpack.js.org/plugins/](https://webpack.js.org/plugins/)

<br />

# 5. Webpack Dev Server

### 1. 웹팩 데브 서버가 필요한 이유

- 코드를 수정하고 변경된 내용을 화면에서 보기 위해서는 다시 빌드를 해야 한다.
- 웹팩 데브 서버는 이러한 번거로움을 해결해준다.
- 웹 애플리케이션을 개발하는 과정에서 유용하게 쓰인다.
- 웹팩의 빌드 대상 파일이 변경 되었을 때 매번 웹팩 명령어를 실행하지 않아도 된다.
- 코드만 변경하고 저장하면 웹팩으로 빌드한 후 브라우저 화면을 자동으로 갱신해준다.

<br />

### 2. 웹팩 데브 서버 빌드

- 웹팩 데브 서버는 일반 웹팩 빌드와 다르다.
- package.json에 아래와 같이 dev 명령어를 추가해준다.

    ```json
    "scripts": {
    	//...
    	"dev": "webpack-dev-server",
    	"build": "webpack"
    }
    ```

- 웹팩 데브 서버로 빌드한 결과물은 별도 파일로 생성되지 않고 **"메모리에 저장된다"**
- 따라서 컴퓨터 내부적으로는 접근할 수 있지만 사람이 직접 파일을 조작할 수는 없다.

<br />

### 3. 웹팩 데브 서버 빌드를 위해 필요한 라이브러리 설치

```bash
$ npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

<br />

# Reference

- [https://www.inflearn.com/course/프런트엔드-웹팩](https://www.inflearn.com/course/%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%ED%8C%A9)
- [https://joshua1988.github.io/webpack-guide/guide.html](https://joshua1988.github.io/webpack-guide/guide.html)