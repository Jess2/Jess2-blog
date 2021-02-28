---
title: "[React] 리액트 기초 개념 정리"
date: 2021-01-28 21:01:27
category: react
---

![](images/react.png)

# 0. Index
1. [리액트란 무엇인가](#1-리액트란-무엇인가)
2. [create-react-app (CRA) 으로 시작하기](#2-create-react-app-cra-으로-시작하기)
3. [CSS 작성 방법 결정하기](#3-css-작성-방법-결정하기)
4. [단일 페이지 어플리케이션 (SPA)](#4-단일-페이지-어플리케이션-spa)
5. [속성값과 상태값](#5-컴포넌트의-속성과-상태값)
6. [컴포넌트 함수의 반환값](#6-컴포넌트-함수의-반환값)
7. [리액트 요소와 가상돔](#7-리액트-요소와-가상돔)
8. [리액트 훅](#8-리액트-훅)
9. [훅 직접 만들기](#9-훅-직접-만들기)
10. [훅 사용 시 지켜야할 규칙](#10-훅-사용-시-지켜야할-규칙)
11. [Context API](#11-context-api)
12. [ref 속성값으로 자식 요소에 접근하기](#12-ref-속성값으로-자식-요소에-접근하기)
13. [리액트 내장 훅](#13-리액트-내장-훅)

<br>

# 1. 리액트란 무엇인가
### 1-1. 리액트 소개
- 리액트는 페이스북에서 개발하고 관리하는 UI 라이브러리
- 앵귤러가 웹 애플리케이션 개발에 필요한 다수의 기능을 제공하는 것과는 달리 리액트는 UI 기능만 제공한다.
따라서 전역 상태 관리나 라우팅, 빌드 시스템을 각 개발자가 직접 구축해야 한다.
리액트 팀에서 `create-react-app` 이라는 툴을 제공하여 직접 구축해야 하는 번거로움을 줄여주고 있다.

### 1-2. 가상돔
- 리액트는 가상 돔을 통해서 UI를 빠르게 업데이트한다.
- 가상 돔은 이전 UI 상태를 메모리에 유지해서 변경된 부분만 실제 돔에 반영 해주는 기술이다.
- 불필요한 업데이트를 줄여서 성능이 좋아진다.

### 1-3. 리액트와 같은 프레임워크나 라이브러리를 사용하는 가장 큰 이유
- UI를 자동으로 업데이트 해주기 때문
- 원래는 dom을 직접 수정해야 하는데 쉽지 않다.

<br>

# 2. create-react-app (CRA) 으로 시작하기
### 2-1. CRA
- CRA는 리액트 개발환경을 구축해주는 도구.
- React 개발 환경을 직접 구축하려면 많은 지식과 노력이 필요하다. (webpack, babel, jest, eslint, polyfill, HMR, CSS 후처리 등) CRA는 이것들을 모두 자동으로 구축해서 제공해준다.
- 초기에 프로젝트를 구축할 때, **CRA를 사용할 수도 있고, Next.js 라는 프레임워크를 사용할 수도 있다.** 서버사이드 렌더링(SSR)의 지원 여부가 차이다.
- CRA는 서버사이드 렌더링을 지원하지 않는다. **서버사이드 렌더링이 필요한 프로젝트라면 Next.js 를 이용하여 구축하는 것이 좋다.**
- 백오피스와 같이 서버사이드 렌더링 필요 없을 때 CRA를 이용하는 것이 적합하다.

<br>

### 2-2. 프로젝트 만들기
```bash
$ npx create-react-app {PROJECT NAME}
```

<br>

### 2-3. scripts 명령어 종류
- package.json

    ```json
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
    ```

    - **start**
      - 개발모드로 실행할 때 사용. 따라서 여러가지 최적화가 되지 않은 상태로 실행이 되기 때문에 배포할 때 사용하면 안된다.
      - http로 실행 된다.
      - 만약에 https로 실행하고 싶을 때는 `HTTPS=true npm start` 명령어 입력하면 된다.
    - **build**
      - 배포할 때 사용하는 명령어.
      - 빌드를 하게 되면 정적 파일이 생성된다.
      - 서버에서는 이렇게 생성된 build 폴더 안에 있는 내용들을 정적 파일로 서비스만 하면 된다.
      - 별도로 서버에 애플리케이션을 실행을 하지 않기 때문에 서버사이드 렌더링으로 동작할 수 없는 것이다.
      - 로컬에서 정적 파일을 서비스 하기 위해서 serve 패키지를 사용하고 build 폴더를 대상으로 정적 파일을 서비스한다. react developer tools 크롬 익스텐션을 이용해서 실행된 페이지가 배포용 파일로 실행 된 것이라는 것을 알 수 있다.
      `npx serve -s build`
    - **test**
      - `npm test` : 테스트 실행 명령어
      - 기본적으로 `App.test.js` 파일이 있는데 이 파일 명을 `App.spec.js` 로 변경해도 테스트가 잘 된다.
      - ``__tests__`` 라는 폴더를 만들면 이 폴더 밑에 있는 모든 파일이 테스트 파일이 된다.
      - 하지만 폴더로 관리하는 것 보다는 `.test.js` 라는 이름으로 관리하는 게 좋다고 생각하는데, 그 이유는 **테스트 하려는 파일이랑 붙어 있으면 여러모로 관리하기가 편리하기 때문.**
    - **eject**
      - react-scripts를 사용하지 않고 모든 설정 파일을 추출하는 명령어다.
      - CRA를 기반으로 직접 개발 환경을 구축하고 싶을 때 사용
      - 추출하지 않으면 CRA의 기능이 추가됐을 때 단순히 react-scripts 버전만 올리면 되는데 추출을 하면 수동으로 설정 파일을 수정해야 하는 단점이 있다. 따라서 꼭 필요한 경우가 아니라면 관리를 위해서 추출을 하지 않는 것을 추천.

<br>

### 2-4. build 폴더
- css
  - 여러 개의 css 파일이 하나로 합쳐짐.
  - 애니메이션 속성 : 컴파일된 결과에는 벤더 접두사가 붙은 코드까지 추가가 된다. 그래서 하위 브라우저까지 잘 지원된다.
- js
  - JSON 파일 등 동적 import 를 사용한 경우에는 별도의 js 파일로 만들어진다.
- media
  - 이미지 파일들이 있다. 이미지 파일은 한 가지 특이한 점이 있는데 이미지 파일의 크기에 따라서 동작이 조금 다르다.
      - 큰 사이즈의 이미지 : media 폴더 밑에 생성된다.
      - 작은 사이즈의 이미지 : 별도의 파일로 생성되는 게 아니라 js 파일 안에 내장이 된다.
      - 그 이유는 http 요청 횟수를 줄이는 그런 목적이 있다. 그렇지만 http 2.0부터는 요청 횟수가 많아도 성능에 영향이 크지 않기 때문에 큰 의미는 없을 것 같다.
      - 또 한가지 이유는 좀 더 빠르게 이미지를 보여줄 수 있다는 그런 이유가 있다. 자바스크립트가 실행되면 바로 이미지를 보여줄 수 있다. JS를 실행한 후에 또 다시 요청을 한 후에 이미지를 가져오는 것보다 JS가 실행될 때 바로 이미지를 보여주는 것이 더 빠르다.

<br>

### 2-5. polyfill
- Internet Explorer 에서 지원하지 않는 기능을 사용하고 싶다면 polyfill을 추가해야 한다.
- 예를 들어서 `padStart`를 사용하고 싶다고 할 때 오래된 브라우저에서는 지원을 하지 않을 수 있다.
브라우저별 지원 여부는 [Can I use](https://caniuse.com/) 에서 확인할 수 있다.
- 보통 core-js를 많이 사용한다. (바벨도 core-js를 사용한다.)
- index.js에서 import해서 포함. `import 'core-js/features/string/pad-start';`
- 원래는 core-js를 설치해서 사용해야겠지만, **CRA에는 기본적으로 core-js가 내장되어 있기 때문에 그냥 import 만 해서 사용하면 된다.**

<br>

### 2-6. 환경 변수

- 개발, 테스트 또는 배포 환경 별로 다른 값을 적용할 때 유용하다.
- 전달된 환경 변수는 코드에서 `process.env.{변수 이름}` 이런식으로 사용할 수 있다.
- CRA에서는 기본적으로 `NODE_ENV` 라는 환경 변수를 갖고 있다. `process.env.NODE_ENV`
    - npm start로 실행하면 `development`
    - npm test로 실행하면 `test`
    - npm run build로 실행하면 `production`
- 환경 변수가 많아지면 .env 파일이라는 것으로 관리하는 것이 좋다.
    - root 경로에 .env.development 파일 생성
    ```text
    REACT_APP_API_URL=api.myapp.com
    REACT_APP_TEMP1=temp_dev1
    ```
    - root 경로에 .env.production 파일 생성
    ```text
    REACT_APP_API_URL=prod.myapp.com
    REACT_APP_TEMP1=temp_prod1
    ```
- 주의 : 리액트 환경 변수는 반드시 `REACT_APP_`로 시작되어야 한다.

<br>

# 3. CSS 작성 방법 결정하기
### 3-1. 일반적인 CSS 파일로 작성하기
- Button.css 파일과 Box.css 파일이 있고 각각의 파일에 **같은 클래스명**에 대한 스타일 정의가 되어 있다면, 원하는 결과가 나오지 않는다. 이것은 **이름이 충돌**해서 발생하는 것.
- 빌드를 해서 css 파일을 한 번 살펴보자. **모든 css 파일이 하나의 빌드 파일**로 합쳐지기 때문에 이름이 충돌되고 나중에 선언된 속성이 적용되는 것이다.
- 일반적인 css 파일로 작성할 때는 이름이 충돌할 수 있는 문제가 있다.

<br>

### 3-2. css-module로 작성하기
- css-module을 사용하면 이름 충돌 문제를 해결할 수 있다.
- Box.module.css, Button.module.css 파일을 만든다.
- import 할 때는 객체 형식으로 내보내기 때문에 **객체 형식으로 받아서 클래스명을 속성 이름으로 입력**해준다.
    ```jsx
    import Style from './Button.module.css';
  
    <button className={`${Style.button} ${Style.big}`)>큰 버튼</button>
    ```

- Style 객체의 각각의 속성 값을 보면 뒤에 **해시 값**이 붙는다. 이 해시 값 덕분에 각 클래스 명은 고유한 이름을 부여 받게 된다. 따라서 이름 충돌 문제도 없게 된다.

- `classnames` 라는 모듈을 이용하면 더 간편하게 입력할 수 있다. (`npm i classnames`로 설치)

    ```jsx
    <button className={cn(Style.Button, Style.big)}>버튼</button>

    <button
        className={cn(Style.Button, {
            [Style.big]: isBig,
            [Style.small]: !isBig,
        })}
    >
        {isBig ? '큰 버튼' : '작은 버튼'}
    </button>
    ```

<br>

### 3-3. Sass로 작성하기
- css와 비슷하지만 **별도의 문법**을 이용해서 생산성이 높은 스타일 코드를 작성할 수 있게 도와준다.
- Sass 문법에 있는 변수나 믹스인 등의 개념을 이용하면 스타일 코드를 재사용 할 수 있다.
- CRA에서 Sass를 이용하려면 필요한 패키지를 설치해야 한다.  
(`npm i node-sass`로 모듈 설치)
- Box.module.scss 와 같은 파일을 만들어서 **sass와 css-module을 같이 사용할 수 있다.**

<br>

### 3-4. css-in-js로 작성하기
> 비교적 최근에 많이 사용하고 있는 방법

- css 코드를 js 파일 안에서 작성하는 방식이다.
- css 코드가 js 파일 안에서 관리되기 때문에 css 코드도 js 코드처럼 얼마든지 재사용 가능한 구조로 관리할 수 있다.
- 또 동적으로 css 코드로 작성하기 쉽다. 자바스크립트로 다 관리할 수 있기 때문.
- 팀에 있는 개발자 대부분이 js와 css 모두 작성할 줄 안다면 css-in-js는 좋은 선택이 될 수 있다.
- 하지만 마크업 개발자가 별도로 있다면 힘들 수 있다고 생각한다.
- 다양한 css-in-js 라이브러리 중에서 `styled-components` 를 사용하는 방법을 알아보자.

#### styled-components

- 모듈 설치
      ```bash
      $ npm i styled-components     
      ```
      
- Example 1

    ```jsx
    import React from 'react';
    import styled from 'styled-components';

    const BoxCommon = styled.div`
        height: 50px;
        backgrouhnd-color: #aaaaaa;
    `;

    const BoxBig = styled(BoxCommon)`
        width: 200px;
    `

    const BoxSmall = styled(BoxCommon)`
        width: 100px;
    `

    export default function Box({ size }) {
        if (size === 'big') {
            return <BoxBig>큰 박스</BoxBig>;
        } else {
            return <BoxSmall>작은 박스</BoxSmall>;
        }
    }
    ```

    - styled-components 에서 styled 라는 객체를 받아온 다음에 .div 로 스타일 코드를 입력하고 있다.
    - `height: 50px; backgrouhnd-color: #aaaaaa;` 를 매개변수로 받아서 실행하는 함수가 있다고 생각하면 된다.
    - `BoxCommon`은 `div`로 이루어진 컴포넌트를 생성한 것이고 이것을 확장해서 또 다른 컴포넌트인 `BoxBig`과 `BoxSmall`을 만들고 있다.
    
- Example 2
    ```jsx
    ...
    const BoxCommon = style.button`
        width: ${props => (props.isBig ? 100 : 50)}px;
        height: 30px;
        background-color: yellow;
    `;

    export default function Box({ size }) {
        const isBig = size === 'big';
        const label = isBig ? '큰 버튼' : '작은 버튼';
        return <BoxCommon isBig={isBig}>{label}</BoxCommon>;
    }
    ```
    - Box 컴포넌트에서 BoxCommon 컴포넌트를 사용할 때, `isBig`이라는 속성값을 넣어주면 BoxCommon 컴포넌트에서 그 속성값을 받아서 동적으로 처리할 수 있다.

<br>

# 4. 단일 페이지 어플리케이션 (SPA)
### 4-1. 멀티 페이지 애플리케이션(전통적인 방식) vs 단일 페이지 애플리케이션
- 멀티 페이지 애플리케이션(MPA)
    - 클라이언트가 초기 요청을 보내면 서버는 html을 내려준다.
    - 이후에 페이지 전환 요청이 있으면 다시 서버로 요청을 보내고 서버는 또 다시 html을 내려준다.
    - 그리고 클라이언트에서는 페이지를 리로드 한다.
- SPA
    - 클라이언트가 초기 요청을 보내면 서버가 html을 내려주는 것 까지는 똑같다.
    - 그리고 이후에 페이지 전환 요청이 있으면 서버로 항상 요청을 하는 것이 아니고 필요할 때만 데이터를 요청해서 받아오는 방식이다.
    - 페이지 전환은 자체적으로 라우팅 처리를 할 수가 있다.

<br>

### 4-2. SPA가 가능하기 위한 조건
- 자바스크립트에서 브라우저로 페이지 전환 요청을 보낼 수가 있어야 한다. 단 브라우저는 서버로 요청을 보내지 않아야 한다.
- 브라우저의 뒤로 가기와 같은 사용자의 페이지 요청을 자바스크립트에서 처리할 수 있어야 한다. 이 때도 브라우저는 서버로 요청을 보내지 않아야 한다.
- 위 조건을 만족시켜주는 브라우저 API
    - pushState, replaceState 함수
    - popState 이벤트

<br>

### 4-3. react-router-dom
- 리액트에서는 이 npm package를 이용해서 라우팅 처리를 할 수가 있다.
- 페이지별 코드 스플리팅 기능이 제공된다.
- example
    ```jsx
    import React from 'react';
    import { BrowserRouter, Router, Link } from 'react-router-dom';
    ...
    
    export default function App() {
        return (
            <BrowserRouter>
                <div>
                    <Link to="/">홈</Link>
                    <Link to="/photo">사진</Link>
                    <Link to="/rooms">방 소개</Link>
                    
                    <Route exact path="/" component={Home} />
                    <Route path="/photo" component={Photo} />
                    <Route path="/rooms" component={Rooms} />
                </div>
    
        );
    }
    
    ```
    - **BrowserRouter**
        - BrowserRouter 컴포넌트에서 현재 페이지의 상태값을 관리해준다.
    - **Link**
        - Link 컴포넌트를 사용하면 이 링크를 클릭했을 때 `to`에 해당하는 경로로 이동시켜준다
    - **Route**
        - Route 컴포넌트를 사용하면 `path` 값에 따라서 어떤 `Component`를 렌더링할지 결정을 해준다.
        - Route 컴포넌트로 렌더링을 하면 해당 컴포넌트의 속성 값으로 `match`라는 속성 값을 넣어준다. 이 `match` 안에는 `url`이라는 속성이 있는데, 이 속성 값이 의미하는 것은 Rooms 컴포넌트가 렌더링될 당시에 매치됐던 그 url의 일부를 의미한다.
            ```jsx
             ...
             export default function Rooms({ match }) {
                return (
                    <div>
                        ...
                        <Link to={`${match.url}/blueRoom`}>파란 방으로 이동하기</Link>
                        <Link to={`${match.url}/greenRoom`}>초록 방으로 이동하기</Link>
                        ...
                    </div>
                );
             }
            ```

<br>

# 5. 컴포넌트의 속성과 상태값
### 5-1. 속성값(Props)과 상태값(State)
리액트 컴포넌트에서는 UI 데이터를 속성값이나 상태값으로 관리를 해야 한다.

#### 상태값으로 관리되지 않은 코드 Example
```js
import React from 'react';

let color = 'red';

export default function App() {
  function onClick() {
    color = 'blue';
  }

  return (
    <button style={{ backgroundColor: color }} onClick={onClick}>
      좋아요
    </button>
  )
}
```
- 외부에 변수를 만들어놓고 그 변수를 수정할 수 있는 구조다.
- 하지만 클릭 이벤트가 발생해서 `onClick` 함수가 실행이 되어도 버튼 색이 파란색으로 변경되지 않는다.
- 이것은 `color` 변수값을 변경은 했지만 **리액트가 이 값이 변경됐다는 사실을 모르기 때문**이다.
- **리액트가 값의 변경 사실을 알려면 상태값으로 관리를 해야 한다.**

#### 상태값으로 관리된 코드 Example
```js
import React from 'react';

export default function App() {
  const [color, setColor] = useState('red');

  function onClick() {
    setColor('blue');
  }

  return (
    <button style={{ backgroundColor: color }} onClick={onClick}>
      좋아요
    </button>
  )
}
```
- `useState` 함수를 호출하면 컴포넌트에 상태값을 추가할 수 있다.
- `useState`의 매개변수인 `red`는 상태값의 초기값을 의미한다.
- `useState`는 배열을 반환한다. 배열의 첫 번째 아이템은 **상태값**이고 두 번째 아이템은 **상태값 변경 함수**이다.
- `const [color, setColor] = useState('red');` 여기서 배열 비구조화 문법이 사용되었다.
- 상태값 변경함수인 `setColor`를 호출해서 상태값인 `color`가 변경되면 **리액트는 자동으로 ui를 변경해준다.**
- 클릭을 하면 버튼 색이 파란색으로 변경된다.
    
        
#### 속성값으로 관리된 코드 Example
- 자식 컴포넌트
    ```js
    import React from 'react';

    export default function Title(props) {
      return <p>{props.title}</p>
    }

    // 위의 코드에서 객체의 비구조화 문법을 이용하면 아래와 같이 작성할 수 있다.
    // export default function Title({ title }) {
    // 	return <p>{title}</p>
    // }
    ```
    - `props` : 부모 컴포넌트로부터 전달 받은 속성값.
    - 객체의 비구조화 문법을 이용하면 사용할 때 `props.{속성명}` 을 입력하지 않고 바로 `{속성명}`으로 사용할 수 있기 때문에 좀 더 간편하게 작성할 수 있다.
    
- 부모 컴포넌트
    ```js
    import React, { useState } from 'react';
    import Title from './Title';

    export default function Counter() {
      const [count, setCount] = useState(0);
  
      function onClick() {
        setCount(count + 1);
      }
  
      return (
        <div>
          <Title title={`현재 카운트: ${count}`} />
          <button onClick={onClick}>증가</button>
        </div>
      );
    }
    ```

    - Counter 라는 컴포넌트에서 Title 컴포넌트를 자식 컴포넌트로 사용하고 있고 `title`이라는 속성값을 내려주고 있다.
    - 이 때 `count`라는 상태값을 기반으로 `title`값을 계산하고 있는데 `count` 값이 변경되면 Counter 컴포넌트는 다시 렌더링이 될거고 Title 컴포넌트도 다시 렌더링 된다. 이 때 새로 생성된 속성값을 받는다.
    - 부모 컴포넌트가 렌더링 될 때마다 자식 컴포넌트도 렌더링이 되는데, **이 때 자식의 속성값이 변경되지 않았을 때도 불필요하게 자식 컴포넌트가 렌더링 된다.**
        
<br>

### 5-2. React.memo

속성값이 변경될 때만 이 컴포넌트가 다시 렌더링 되게 하려면 `React.memo`를 사용할 수 있다.

```js
import React from 'react';

function Title({ title }) {
    return <p>{title}</p>
}

export default React.memo(Title);
```

<br>

### 5-3. 불변 변수로 관리되는 속성값과 상태값 
> 불변 변수란? 변수의 값을 바꿀 수 없는 것

#### 속성값
- 속성값은 불변 변수이기 때문에 값을 변경하려고 시도하면 에러가 발생한다.  
- 자식 컴포넌트에 전달되는 속성값은 상위 컴포넌트에서 관리하기 때문에 수정하지 못하도록 막혀있는 것이다.  

#### 상태값
- 상태값은 불변 변수가 아니지만 불변 변수로 관리하는 것이 좋다.
- 불변 변수로 관리하면 코드의 복잡도도 낮아지는 장점이 있다.
- 상태값을 불변 변수로 관리하지 않은 코드 Example

    ```js
    import React, { useState } from 'react';
    import Title from './Title';

    export default function Counter() {
      const [count, setCount] = useState({ value: 0 });
  
      function onClick() {
        count.value += 1;
        setCount(count);
      }
  
      return (
        <div>
          <Title title={`현재 카운트: ${count.value}`} />
          <button onClick={onClick}>증가</button>
        </div>
      );
    }
    ```

    - 버튼을 클릭해도 값이 증가되지 않는다.
    - 리액트는 상태값 변경 유무를 이전 값과의 단순 비교로 판단을 하는데 **count가 지금 객체고 그런데 여기서 객체의 참조값은 변하지 않았다.** 단순히 내부의 속성값만 변경된 상태다.
    - 그래서 **리액트 입장에서는 이 값이 변경되지 않았다고 판단한다. 그래서 setCount를 호출한 것이 무시된다.**
    - 따라서 상태값도 속성값과 마찬가지로 불변 변수로 관리하는 게 좋다.
    - 객체를 불변 변수로 관리하는 한 가지 방법은 전개 연산자를 이용하는 것이다.
    
- 상태값을 불변 변수로 관리한 코드 Example

    ```js
    import React, { useState } from 'react';
    import Title from './Title';

    export default function Counter() {
      const [count, setCount] = useState({ value: 0 });
  
      function onClick() {
        setCount({ ...count, value: count.value + 1 });
      }
 
      return (
        <div>
          <Title title={`현재 카운트: ${count.value}`} />
          <button onClick={onClick}>증가</button>
        </div>
      );
    }
    ```

    - 전개 연산자 문법에서 객체의 속성 값들을 풀어놓고 변경하고자 하는 값을 덮어 쓰는 방식이다.
    
<br>

# 6. 컴포넌트 함수의 반환값
컴포넌트에서 반환할 수 있는 값은 어떤 것들이 있는지 알아보자.

#### div 리액트 요소
```js
export default function App() {
    return <div>안녕하세요</div>;
}
```

#### 컴포넌트 
```js
export default function App() {
  return <Counter />;
}
```

#### 문자열 / 숫자 
```js
export default function App() {
  return '안녕';
}
```

#### 배열
```js
export default function App() {
  return [<p key={1}>world</p>, <p key={2}>hello</p>];
}
```
- **배열로 반환할 때는 리액트 요소가 항상 `key`를 가지고 있어야 한다.**
- `key`는 렌더링을 효율적으로 하기 위해서 필요하다. 리액트가 이 값을 이용해서 가상돔에서의 연산을 효율적으로 할 수가 있다.

#### Fragment
```js
export default function App() {
  return (
    <React.Fragment>
      <p>Hello</p>
      <p>World</p>
    </React.Fragment>
  );
}
```
- Fragment에서는 내부 요소의 순서가 일종의 `key` 역할을 하기 때문에 `key`를 입력하지 않아도 오류가 나지 않는다.
- **Fragment는 이렇게 여러 개의 요소를 반환할 때 유용하게 사용된다.**
- Fragment 기능은 비교적 최근에 추가된 기능인데, 이 기능이 없을 때는 `div` 태그로 감싸 줬다. 이 경우에는 원치 않는데 이렇게 `div`요소가 추가되는 단점이 있었다.
- 하지만 이렇게 Fragment를 사용하면 실제 dom에는 반영되지 않는다.
- **Fragment를 자주 쓰는 경우에는 아무것도 입력하지 않는 축약형으로 작성을 할 수가 있다. `<></>`**

    
#### null / boolean
```js
export default function App() {
  return (
    <div>
      {null}
      {false}
      {true}
    </div>
  );
}
```
- null 이나 boolean 값은 실제 화면에 출력되지 않는다.
- boolean 값은 아래와 같이 **조건부 렌더링**을 할 때 유용하게 사용된다.

```js
export default function App() {
  return (
    <div>
      {count.value > 0 && <Title title={`현재 카운트: ${count.value}`} />
    </div>
  );
}
```

#### Portal
- 리액트 Portal은 html에서 root 엘리먼트 말고 다른 멀리 떨어진 엘리먼트에 렌더링하고 싶을 때 사용할 수 있다.
- 예를 들어서 index.html이 아래와 같이 존재.

    ```html
    ...
    <body>
      <div id="root"></div>
      <div id="something"></div>
    </body>
    ...
    ```

- App.js

    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Counter from './Counter';

    export default function App() {
      return (
        <>
          <p>안녕</p>
          <Counter />
          {ReactDOM.createPortal(
            <div>
              <p>hello</p>
              <p>world</p>
            </div>,
            document.getElementById('something'),
          )}
        </>
      );
    }
    ```

    - 리액트 Portal을 사용하기 위해서는 react-dom에 있는 함수를 사용해야 한다.
    - createPortal이라는 함수를 사용하고 두 번째 매개변수는 html에 있는 요소를 지정을 해준다. 그러면 렌더링이 `something` 요소 밑에 렌더링이 잘 된다.
    - **리액트 Portal은 보통 모달(Modal)을 위해서 많이 사용되기도 한다.**
    
<br>

# 7. 리액트 요소와 가상돔
- 리액트는 메모리에 가상돔을 올려놓고 이전과 이후의 가상돔을 비교하고 변경된 부분만 실제 돔에 반영한다.

### 7-1. element 구조
- example 1

    ```js
    const element = {
      <a key="key1" style={{ width: 100 }} href="https://google.com">
        Click here
      </a>
    }

    console.log(element);

    // log 출력 결과
    // {
    //   type: 'a',
    //   key: 'key1',
    //   ref: null,
    //   props: {
    //     href: 'https://google.com',
    //     style: {
    //       width: 100,
    //     },
    //     children: 'Click here',
    //   },
    //   ...
    // };
    ```

- example 2

    ```js
    function Title({ title, color }) {
      return <p style={{ color }}>{title}</p>;
    }

    const element = <Title title="hello" color="blue" />;
  
    console.log(element);

    // log 출력 결과
    // {
    //   type: Title,
    //   props: { title: 'hello', color: 'blue' },
    //   ...
    // }
    ```

    - 컴포넌트를 이용해서 리액트 요소를 만드는 경우에는 `type`을 보면 컴포넌트 함수가 입력이 되어 있다. 이 함수를 이용해서 리액트는 렌더링을 위한 충분한 정보를 얻을 수가 있다.
    - 리액트가 이 함수를 실행을 할텐데 그러면 `<p style={{ color }}>{title}</p>;` 이러한 값을 얻어 갈 수가 있다.
       
- 변경된 부분만 실제 돔에 반영 된다는 것을 한 번 확인해보자.
    - Example

        ```js
        import React, { useState, useEffect } from 'react';
        
        export default function App() {
          const [seconds, setSeconds] = useState(0);
        
          useEffect(() => {
            setTimeout(() => {
              setSeconds(v => v + 1);
            }, 1000);
          });
        
          return (
            <div>
              <h1>hello</h1>
              <p>지금까지 {seconds}초가 지났습니다</p>
            </div>
          );
        }
        ```
        
        - `seconds` 값이 1초마다 바뀌는데, `p` 태그 안의 `{seconds}` 부분만 변경된다.
        - 만약에 `div` 태그 `key`값에 `seconds`를 주게되면 `div` 돔 요소가 1초마다 삭제되고 다시 추가된다. 
        - 이렇게 `key`를 변경하면 리액트는 이것을 다른 요소라고 판단을 해서 이전 것을 삭제하고 새로 만들어서 붙인다.
        - 돔 요소 말고 컴포넌트의 `key`를 변경할 때는 어떻게 될까?
            - 컴포넌트의 `key`를 변경하게 되면 해당 컴포넌트는 삭제 되었다가 추가된다.
            - 이렇게 컴포넌트가 삭제되는 것을 Unmount라고 부르고 컴포넌트가 추가되는 것을 Mount라고 부른다.
            - 컴포넌트가 Mount될 때는 `useState`의 첫 번째 매개변수로 입력된 초기값이 상태값으로 할당이 된다. 즉, 초기화가 된다는 것이다. 따라서 1초에 한 번씩 `0`이 새롭게 할당된다.
            - 이렇게 `key`를 변경하면 컴포넌트는 Unmount와 Mount를 반복한다.
        
<br>

### 7-2. 리액트 요소 트리
- 리액트에서 데이터 변경에 의한 화면 업데이트는 랜더 단계와 커밋 단계를 거친다.
    - 랜더 단계 : 실제 돔에 반영할 변경사항을 '파악'하는 단계
    - 커밋 단계 : 파악된 변경 사항을 실제 돔에 '반영'하는 단계
    - 랜더 단계에서는 변경 사항을 파악하기 위해서 가상 돔을 이용한다. 가상돔은 리액트 요소로부터 만들어지고 리액트는 렌더링할 때마다 가상돔을 만들고 이전 가상돔과 비교를 한다.
    - 이는 실제 돔의 변경 사항을 최소화하기 위한 과정이다.

- 하나의 화면을 표현하기 위해서 여러 개의 리액트 요소가 트리 구조로 구성이 된다.
    ```html
    <div>
      <p>안녕하세요</p>
      <div>
        <p>이름: Jess2</p>
        <p>나이: 29</p>
      </div>
    </div>
    ```
    
    ```jsx
    {
      type: 'div',
      props: {
        children: [
          {
            type: 'p',
            props: {
              children: '안녕하세요',	
            },
          },
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'p',
                  props: {
                    children: '이름: Jess2',
                  },
                },
                {
                  type: 'p',
                  props: {
                    children: '나이: 29',
                  },
                },
              ],
            }
          },
        ],
      },
    }
    ```

<br>

# 8. 리액트 훅
### 8-1. 리액트 훅(Hook)이란
- 컴포넌트에 기능을 추가할 때 사용하는 함수
- 예를 들면, 컴포넌트에 상태값을 추가하거나 자식 요소에 접근하는 등의 기능을 추가하고 싶을 때 훅을 사용할 수 있다.
- 리액트 16.8 (2019년 2월)에 새로 추가된 기능이다.
- 그전에는 컴포넌트에 기능을 추가하고 싶을 때 클래스형 컴포넌트를 사용했었다.
- 그런데 이제 훅이 나오면서 클래스형 컴포넌트는 더 이상 사용을 안해도 된다.
- 클래스형 컴포넌트보다 리액트 훅이 장점이 많고 리액트 팀에서도 훅에 집중을 하고 있다. 그래서 새로 리액트 프로그램을 작성한다면 리액트 훅으로 작성하는 것을 추천한다.
    - [Reference 영상](https://mk-v1.kakaocdn.net/dn/if-kakao/conf2019/conf_video_2019/1_104_01_m1.mp4)
    
<br>

### 8-2. useState : 상태값 관리 Hook
```js
import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0); 

  function onClick() {
    setCount(count + 1);
    setCount(count + 1);
  }

  console.log('render called');

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onClick}>증가</button>
    </div>
  );
}
```
- `useState`함수는 초기값을 넣어서 호출한다
- `useState`함수는 배열을 반환하는데 첫번째 아이템은 **상태값**, 두번째 아이템은 **상태값 변경 함수**가 반환된다.
- **상태값 변경 함수는 비동기 이면서 배치(batch)로 처리된다.**
- 리액트는 효율적으로 렌더링 하기 위해서 여러 개의 상태값 변경 요청을 배치로 처리한다.
- 따라서 `onClick` 함수가 호출되어도 `setCount` 는 두 번 작성하였지만 `count` 값은 `1`씩만 증가하고 `console.log('render called');` 로그는 한 번만 출력된다.
- 상태값 변경 요청을 왜 비동기 이면서 배치로 처리할까? 만약에 동기로 처리한다면 상태값 변경 함수가 호출될 때마다 화면을 다시 그리기 때문에 성능 이슈가 생길 수 있다.

#### 해결 방법 - 상태값 변경 함수에 함수를 입력한다.
```js
import React, { useState, useEffect } from 'react';

export default function App() {
    const [count, setCount] = useState(0);

    function onClick() {
        setCount(v => v + 1);
        setCount(v => v + 1);
    }

    console.log('render called');

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onClick}>증가</button>
        </div>
    );
}
```

- **함수로 입력하면 처리되기 직전의 상태값을 매개변수로 받기 때문에 원하는대로 동작한다.**
- 여기서 `onClick` 이벤트 핸들러는 리액트 내부에서 관리되는 리액트 요소에 입력이 되어 있기 때문에 배치로 처리가 된다.
- 리액트 내부에서 관리하지 않는 외부에서 호출을 하는 경우에는 배치로 동작하지 않는다. 즉 그러한 경우에는 상태값 변경 함수를 호출할 때마다 렌더링이 발생한다.

<br>

### 8-3. useEffect : 부수 효과 처리 Hook
> 부수 효과란 외부의 상태를 변경하는 것을 말한다.

- 서버 API호출, 이벤트 핸들러 등록/해제 등의 부수 효과를 처리할 때 사용한다.
- 컴포넌트 렌더링 중에 부수 효과를 발생 시키는 것은 프로그램의 복잡도를 크게 증가 시키고 유닛 테스트를 작성하기 힘들어지는 등 순수 함수가 가지는 여러 장점을 포기하는 것이다.
- useEffect Example

    ```js
    ...
    export default function App() {
        const [count, setCount] = useState(0);
  
        useEffect(() => {
            document.title = `업데이트 횟수: ${count}`;
        });
  
        return <button onClick={() => setCount(count + 1)}>increase</button>;
    }
    ```
    - useEffect 함수의 첫 번째 매개변수로 함수를 입력한다.
    - 이 함수는 컴포넌트가 렌더링된 후에 호출이 된다.
    - 렌더링 결과가 실제 돔에 반영되고나서 비동기로 호출이 되는 것이다.
    - 이 첫 번째 매개변수 함수를 **부수 효과 함수** 라고 부른다
    
<br>

### 8-4. useEffect 와 의존성 배열
- Example - 사용자 정보를 렌더링 해주는 컴포넌트

    ```js
    import React, { useState, useEffect } from 'react';

    export default function Profile({ userId }) {
      const [user, setUser] = useState(null);

      useEffect(() => {
        getUserApi(userId).then(data => setUser(data));
      }, [userId]);

      return (
        <div>
        {!user && <p>사용자 정보를 가져오는 중...</p>}
        {user && (
          <>
            <p>{`name is ${user.name}`}</p>
            <p>{`age is ${user.age}`}</p>
          </>
        )}
        </div>
      );
    }

    const USER1 = { name: 'mike', age: 23 };
    const USER2 = { name: 'jane', age: 31 };

    function getUserApi(userId) {
      return new Promise(result => {
        setTimeout(() => {
          result(userId % 2 ? USER1 : USER2);
        }, 500);
      });
    }
    ```

    - 위의 코드는 `userId`를 속성값으로 받아서 `getUserApi`라는 api 함수를 호출해서 해당 유저의 정보를 가져온 다음에 `user` 상태값을 변경해주는 기능이다.
    - 여기서 API 호출을 시뮬레이션 하기 위해서 `userId`가 홀수, 짝수일 때일 때 각각 다른 값을 리턴해주도록 하는 함수를 작성함.
    - 부수효과 함수는 렌더링이 끝나고 호출이 된다. 그런데 만약 렌더링이 자주 발생한다면 그 때마다 API를 호출하는 것은 비효율적이다.
    - **이럴 때는 두 번째 매개변수에 배열을 입력할 수 있다. 이 배열은 의존성 배열이다. 이 배열의 값이 변경될 때만 부수효과 함수가 실행된다.**
    - 만약 두 번째 매개변수에 빈 배열을 입력하면 부수 효과 함수는 컴포넌트가 마운트된 이후에 한 번만 호출될 것이다.
    - 여기에서는 `userId`를 입력했기 때문에, `userId` 값이 변경될 때 부수효과 함수가 실행된다.
    
<br>

### 8-5. 의존성 배열에 어떤 값을 입력해야 할까
- 부수 효과 함수에서 사용한 변수를 잘 봐야 한다. 컴포넌트의 상태값, 속성값, 컴포넌트 내부에서 정의된 지역변수, 지역함수 같은 것들은 모두 의존성 배열에 작성을 해줘야 한다.
- `getUserApi`는 외부에 있는 함수이기 때문에 입력하지 않아도 된다.
- `userId`는 속성값이기 때문에 입력을 해줘야 한다.
- `setUser` 상태값 변경 함수는 조금 특별한데, 이 함수는 값이 변경되지 않는다는 것이 보장된다. 그래서 상태값 변경함수는 예외적으로 의존성 배열에 입력하지 않아도 된다.
- 의존성 배열은 꼭 필요한 경우에만 입력하는 게 좋다. 예를 들어 새로운 상태값을 추가한 다음에 부수 효과 함수에서 사용을 하면 매번 사용한 변수를 의존성 배열에 추가해야 하는 번거로움이 생긴다.
- 의존성 배열을 잘못 입력하면서 많은 버그가 발생하니 주의하자.

<br>

### 8-6. 부수 효과 함수가 반환하는 값

- Example code

    ```js
    ...
    export default function WidthPrinter() {
      const [width, setWidth] = useState(window.innerWidth);

      useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize); // 이벤트 리스너 등록

        return () => {
          window.removeEventListener('resize', onResize); // 이벤트 리스너 해제
        };
      }, []);

      return <div>{`width is ${width}`}</div>;
    }
    ```

    - 부수 효과 함수에서 반환하는 함수는 다음 부수 효과 함수가 호출되기 직전에 호출된다. 또는 컴포넌트가 언마운트 되기 직전에 마지막으로 호출된다.
    - 의존성 배열로 빈 배열을 입력하면 컴포넌트가 생성될 때만 부수 효과 함수가 호출되고, 부수 효과 함수가 반환하는 함수는 컴포넌트가 사라지기 직전에 한 번만 실행된다.

<br>

# 9. 훅 직접 만들기
### 9-1. 커스텀 훅
- 리액트가 제공하는 훅을 이용해서 커스텀 훅을 만들 수 있다.
- 로직 재사용이 가장 큰 장점.
- 커스텀 훅 만들 때는 훅 이름은 `use`로 시작하는 것이 좋다.
- 훅은 일반적인 함수로 작성할 수 있다.
- 레고 블록처럼 기존 훅을 이용해서 새로운 훅을 만들 수 있다. 

<br>

### 9-2. 예시: useUser 훅 만들기
- `userId`를 입력하면 `user`객체를 가져올 수 있는 커스텀 훅
- `useUser`를 사용하는 쪽에서는 `userId`만 입력해주면 `user`객체가 나오니까 굉장히 편리하고 직관적이다.
- `userId`가 변경되면 훅 내부에서 자동으로 api를 호출해서 사용자 정보를 가져올거고, `useUser` 훅 내부 상태값이 변경되면 자동으로 이 컴포넌트도 같이 새로운 유저와 함께 렌더링이 될 것이다.
- `user` 데이터를 가져오는 것은 비동기이지만 마치 `userId`를 넣으면 `user`가 바로 나오는 것 처럼 (마치 동기 프로그래밍 방식 처럼) 간편하게 작성을 할 수가 있다.

<br>

### 9-3. 예시: useMounted 훅 만들기
- 보통 서버사이드 렌더링을 할 때 많이 쓰는 정보인데 마운트 됐는지 안됐는지에 대한 정보를 알기 위한 훅을 만들면 좋다.
- 상태값 변경 함수는 렌더링이 끝난 다음에 호출되는 것을 이용하는 개념이다.
- 단, 매번 호출될 필요는 없으니까 `useEffect`에 빈 배열을 넣어주어 초기에 한 번만 실행이 되도록 한다.
    
    ```js
    export default function useMounted() {
      const [mounted, setMounted] = useState(false);
      
      useEffect(() => {
        setMounted(true);
      }, []);
    
      return mounted;
    }
    ```

<br>

### 9-4. 기타 커스텀 훅 예시들
- 로그인된 사용자만 접근할 수 있는 페이지다 라고 할 때, 커스텀 훅을 만들어놓고 로그인된 사용자가 아닐 경우에는 얼럿을 띄워 준다던가 아니면 자동으로 로그인 페이지 같은데로 보내줄 수 있다. (`useBlockIfNotLogin()`)
- 어떤 페이지에서 사용자가 작성한 내용이 있을 때, 저장되지 않고 페이지를 벗어나려고할 때 확인 팝업 띄울 때도 커스텀 훅을 만들어서 관리하면 좋을듯. (`useBlockUnsavedChange(description)`)
- `useEffect`를 실행을 하는데 로그인 유저인 경우에만 실행을 하고 싶을 때 (사용법은 `useEffect`와 같은데 콜백을 호출하는 시점이 로그인 유저인 경우에만 호출을 해준다) (`useEffectIfLoginUser(callback, deps)`)
- 로컬 스토리지 사용 커스텀 훅 (`useLocalStorage(key, initalValue) ⇒ [value, setValue]`)

<br>

# 10. 훅 사용 시 지켜야할 규칙
> 아래의 두 가지 규칙을 지켜야 리액트가 각 훅의 상태를 제대로 기억할 수가 있다.

1. 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야 한다.
    - if문 안에서 훅을 사용하면 안된다. if문을 사용하게 되면 조건문에 따라 사용하는 훅이 달라질 수 있기 때문이다.
    - for문 안에서 훅을 사용하면 안된다. 반복문의 조건에 따라서 훅을 사용하는 횟수가 달라질 수 있기 때문이다.
    - 함수 안에서 훅을 사용하면 안된다. 함수가 항상 호출된다는 보장이 없기 때문이다.
2. 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다.
    - 클래스형 컴포넌트의 메소드나 기타 일반 함수에서도 사용할 수 없다.
    - 훅은 함수형 컴포넌트를 위한 기능이기 때문이다.

<br>

# 11. Context API
상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때 속성값(Props)을 사용할 수 있다.
가까운 거리에 있는 몇 개의 컴포넌트로 전달할 때는 속성값으로도 충분하지만 많은 수의 하위컴포넌트로 전달할 때는 속성값을 내려주는 코드를 반복적으로 작성해야 한다.    
특히 멀리 떨어져 있는 컴포넌트에 데이터를 전달할 때는 중간에 있는 컴포넌트들에도 데이터를 전달하는 코드를 작성해야 한다.  

**Context API 를 사용하면 좀 더 간편하게 코드를 작성할 수 있다.**

<br>

### 11-1. Context API 사용하기 - Provider와 Comsumer

```jsx
import React, { createContext } from 'react';

const UserContext = createContext('unknown'); // 초기값을 넣어서 호출을 해주면 객체가 반환이 된다.

export default function App() {
  return (
    <div>
      <UserContext.Provider value="mike">
        <h1>메뉴</h1>
        <Profile />
      </UserContext.Provider>
    </div>
  )
}

function Profile() {
  return (
    <div>
      <Greeting />
    </div>
  )
}

function Greeting() {
  return (
    <UserContext.Consumer>
      {username => <p>{`${username}님 안녕하세요.`}</p>}  {/* mike님 안녕하세요. */}
    </UserContext.Consumer>
  )
}
```

- Context API를 사용하려면 react 에서 `createContext` 를 가져와야 한다.
- 초기값을 넣어서 호출을 해주면 **객체**가 반환이 되는데 **그 객체 안에는 Provider와 Consumer 컴포넌트가 있다.**
- Provider에서 `value`를 넣어주면 Consumer에서 그 값을 받아서 처리할 수 있다.
- Root 까지 올라갔는데 Provider를 찾지 못하면 기본값으로 설정한 `unknown`이 사용된다.
- Provider 컴포넌트의 `value` 값이 변경되면 하위의 모든 Consumer 컴포넌트는 다시 렌더링이 된다.

<br>

### 11-2. Consumer 말고 더 간편한 useContext 훅 이용하기

```js
function Greeting() {
    const username = useContext(UserContext);
    return <p>{`${username}님 안녕하세요.`}</p>
}
```

- useContext를 사용하면 훨씬 간편하게 Context API를 사용할 수 있다.

<br>

### 11-3. 하위 컴포넌트에서 데이터를 수정하는 방법 
- 데이터를 수정할 수 있는 함수를 별도의 Context로 만든다.

```js
import React, { createContext } from 'react';

const UserContext = createContext({ username: 'unknown', count: 0 });
const SetUserContext = createContext(() => {});

export default function App() {
  const [user, setUser] = useState({ username: 'jessie', count: 0 });

  return (
    <div>
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <Profile />
        </UserContext.Provider>
      </SetUSerContext.Provider>
    </div>
  )
}
```

```js
function Greeting() {
  const setUser = useContext(SetUserContext);
  const { username, count } = useContext(UserContext);

  return (
    <>
      <p>{`${username}님 안녕하세요.`}</p>
      <p>{`카운트 : ${count}`}</p>
      <button onClick={() => setUser({ username, count: count + 1 })}>
        인사하기
      </button>
    </>
  )
}
```

<br>

### 11-4. Context API를 사용할 때 주의할 점
1. 만약 `username`과 `count`를 별도의 상태값으로 관리하고 Provider에 `value={{ username, count }}` 이런식으로 넣으면 이 컴포넌트가 렌더링이 될 때마다 매번 새로운 객체가 만들어지게 된다. 그래서 `value`값이 변경되지 않아도 Consumer는 불필요하게 렌더링이 될 수 있다.  
`username`과 `count` 속성을 가진 `user`라는 객체를 상태값으로 관리하고 `value`에는 `value={user}` 이런 식으로 하나의 객체로 넘기면 매번 새로운 객체가 만들어지지 않는다.

2. Consumer 는 Provider 컴포넌트 안에 속해야 한다. Root 까지 올라갔는데 Provider를 찾지 못하면 기본값으로 설정된 값이 사용된다.   
보통 Provider는 루트에서 jsx 부분 전체를 감싸는 방식으로 많이 작성한다. 

<br>

# 12. ref 속성값으로 자식 요소에 접근하기 

**리액트로 작업하다보면 실제 돔 요소에 직접 접근해야할 때가 있다.**   
예를 들어, 돔 요소에 포커스를 주거나 돔 요소 크기나 스크롤 위치를 알아야 하는 경우 등등..  
`ref` 속성값을 이용하면 자식 요소에 직접 접근할 수 있다. 여기에서 자식 요소는 돔 요소나 컴포넌트일 수 있다.

### 12-1. 돔 요소에 접근하기

```js
export default function App() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input type="text" ref={inputRef} />
  )
}
```

- useRef 훅을 사용한다.
- **current 라는 요소는 실제 돔 요소를 가리키게 된다.**
- 돔 요소는 렌더링 결과가 실제 돔에 반영된 후에 접근할 수가 있기 때문에 부수효과 함수 안에서 접근을 할 수 있다.
- `ref` 속성값은 아래와 같이 일반적인 컴포넌트에도 입력할 수 있다.

<br>

### 12-2. 컴포넌트에 접근하기

```js
<Box ref={inputRef} />
```

- 만약에 이 컴포넌트가 클래스형 컴포넌트라면 해당 컴포넌트의 인스턴스를 가리킨다. 따라서 `current` 속성은 해당 클래스의 메서드를 호출할 수 있게 된다.

- 함수형 컴포넌트는 인스턴스로 만들어지지 않지만 `useImperativeHandle` 이라는 훅을 사용하면 함수형 컴포넌트에서도 마치 클래스형 컴포넌트의 멤버 변수나 메서드에 접근하는 것처럼 함수형 컴포넌트의 변수나 함수를 외부로 노출시킬 수 있다.

- **주의: 별다른 처리를 하지 않았다면 함수형 컴포넌트에 `ref` 속성을 입력할 수 없고 아래와 같이 별도의 속성명을 사용하거나 forwardRef 를 사용해야 한다.**

    - 별도의 속성명 사용하기
        ```js
        export default function App() {
          const inputRef = useRef();
          
          useEffect(() => {
            inputRef.current.focus();
          }, []);
        
          return (
            <div>
              <InputAndSave inputRef={inputRef} />
              ...
            </div>
          )
        }
        
        function InputAndSave({ inputRef }) {
          return (
            <div>
              <input type="text" ref={inputRef} />
              ...
            </div>
          )
        }
        ```
    - forwardRef 사용하기 : 두 번째 매개변수로 ref 속성값을 받을 수 있다.
        ```js
        export default function App() {
          const buttonRef = useRef();
        
          return (
            <div>
              <Button ref={buttonRef} />
              ...
            </div>
          )
        }
        
        const Button = React.forwardRef(function ({ onClick }, ref) {
          return (
            <button onClick={onClick} ref={ref}>저장</button>
          )
        })
        ```

<br>

### 12-3. ref 속성값에 함수 입력하기
```js
export default function App() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [showText, setShowText] = useState(true);
  
  return (
    <div>
      {showText && (
        <input
          type="text"
          ref={ref => ref && setText(INITIAL_TEXT)}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}   
      <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
    </div>
  )
}

const INITIAL_TEXT = 'Hello world!';
```
- useRef 속성을 사용하지 않고 `ref` 속성값에 함수를 입력할 수 있다.
- ref 속성값에 입력된 함수는 해당하는 요소가 생성되거나 사라질 때 한 번씩 호출된다.
- 생성될 때는 해당하는 요소의 레퍼런스가 넘어온다.
- 사라질 때는 `null` 값이 넘어온다.
- 따라서 요소가 생성될 때 `setText(INITIAL_TEXT)` 를 실행하여 `text`를 초기값으로 설정한다.
- 이 코드에서는 버튼을 클릭할 때마다 `showText`를 보였다가 가렸다가를 반복하게 되는데, `input` 태그는 `showText`가 `true`일 때만 보여지게 되므로 버튼을 클릭하여 `showText`가 `true`가 되는 순간 `setText(INITIAL_TEXT)` 함수가 호출된다.
- 문자를 입력할 때마다 `setText` 함수가 실행되고 컴포넌트가 다시 렌더링이 된다. 그런데 컴포넌트가 렌더링될 때마다 새로운 함수가 입력되면서 `setText(INITIAL_TEXT)`가 실행되어 초기화되기 때문에 `text`가 입력하는 텍스트로 제대로 업데이트 되지 않는 문제가 있다.

<br>

### 12-4. useCallback 훅을 사용하여 함수를 고정하기
```js
export default function App() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [showText, setShowText] = useState(true);

  const setInitialText = useCallback((ref) => {
    ref && setText(INITIAL_TEXT)
  }, []);
  
  return (
    <div>
      {showText && (
        <input
          type="text"
          ref={setInitialText}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}   
      <button onClick={() => setShowText(!showText)}>보이기/가리기</button>
    </div>
  )
}

const INITIAL_TEXT = 'Hello world!';
```
- useCallback 훅의 메모이제이션 기능 덕분에 한 번 생성된 함수를 변화시키지 않고 계속해서 재사용할 수 있다.
- 따라서 문자를 입력할 때마다 `setText` 함수가 실행되고 컴포넌트가 다시 렌더링 되어도 `setText(INITIAL_TEXT)`가 다시 실행되지 않는다. 
- `ref`가 새로 생성될 때 `setText(INITIAL_TEXT)`가 실행된다.

<br>

# 13. 리액트 내장 훅

1. useState - 상태값 관리 [설명](#8-2-usestate--%EC%83%81%ED%83%9C%EA%B0%92-%EA%B4%80%EB%A6%AC-hook)
2. useEffect - 부수효과 처리 [설명](#8-3-useeffect--%EB%B6%80%EC%88%98-%ED%9A%A8%EA%B3%BC-%EC%B2%98%EB%A6%AC-hook)
3. useContext - Context API Consumer 기능 사용 [설명](#11-context-api)
4. useRef - 자식 요소에 직접 접근 등 [설명1](#12-ref-%EC%86%8D%EC%84%B1%EA%B0%92%EC%9C%BC%EB%A1%9C-%EC%9E%90%EC%8B%9D-%EC%9A%94%EC%86%8C%EC%97%90-%EC%A0%91%EA%B7%BC%ED%95%98%EA%B8%B0)
                               [설명2](#13-1-useref)
5. useMemo - 메모이제이션 기능 [설명](#13-2-usememo)
6. useCallback - 함수 메모이제이션 기능에 특화됨 [설명](#13-3-usecallback)
7. useReducer - 여러 개의 상태값 관리 [설명](#13-4-usereducer)
8. useImperativeHandle
9. useLayoutEffect
10. useDebugValue

<br>

### 13-1. useRef
> 렌더링과 상관 없는 데이터를 저장할 때 useRef가 유용하게 사용될 수 있다.

#### 타이머
```js
export default function App() {
  const timerIdRef = useRef(-1);
  useEffect(() => {
    timerIdRef.current = setTimeout(() => {}, 1000);
  });
  useEffect(() => {
    if (timerIdRef.current >= 0) {
      clearTimeout(timerIdRef.current);
    } 
  });
}
```
- 만약 useState를 사용한다면 불필요한 렌더링이 일어날 수 있다.

<br> 

#### 이전 상태값을 기억
```js
export default function App() {
  const [age, setAge] = useState(20);
  const prevAgeRef = useRef(20);
  
  useEffect(() => {
    prevAgeRef.current = age;
  }, [age]);
  
  const prevAge = prevAgeRef.current;
  const text = (age === prevAge) ? ('same') : (age > prevAge ? 'older' : 'younger');

  return (
    // ...
    // 버튼을 누르면 setAge 함수를 호출하여 랜덤값으로 age를 변경한다.
  );
}
```
- 이전 `age` 값을 기억하기 위해서 `prevAgeRef`를 사용한다.
- useEffect훅은 렌더링된 후에 호출이 된다. 따라서 `prevAge.current`는 `age`가 변경되기 이전의 값을 기억하고 있게 되는 것이다.
- 예시 과정
    - `setAge` 호출 -> `age`가 초기값 20에서 28로 변경됨 -> 렌더링 -> 이 때 `prevAgeRef.current`는 20임 -> 화면에는 `age`로 28이 출력되고 `prevAge`로 20이 출력됨 -> `prevAgeRef.current`에 28을 저장
    -> `setAge` 호출 -> `age`가 19로 변경됨 -> 렌더링 -> 이 때 `prevAgeRef.current`는 28임 -> 화면에는 `age`로 19가 출력되고 `prevAge`로 28이 출력됨 -> ... 반복

<br>

### 13-2. useMemo
> 메모이제이션 기능이 있어, 계산량이 많은 함수의 반환값을 재활용하는 용도로 사용된다.

```js
export default function App() {
  const [v1, setV1] = useState(0);
  const [v2, setV2] = useState(0);
  const [v3, setV3] = useState(0);

  const value = useMemo(() => {
    runExpensiveJob(v1, v2); // 계산량이 많은 함수 호출
  }, [v1, v2]);

  return (
    //...
  );
}
```
- useMemo 훅의 첫 번째 매개변수로 함수를 입력하면 이 함수가 실행된 결과값을 리액트가 기억한다.
- useMemo 훅의 두 번째 매개변수인 배열에 있는 값이 하나라도 변경되면, 첫 번째 매개변수로 입력된 함수가 실행된다.
- 만약 두 번째 매개변수인 배열에 있는 값이 변경되지 않으면, 이전에 실행해서 기억하고 있던 결과값을 재활용한다.
- useEffect 훅과 마찬가지로 이 두 번째 매개변수인 배열은 **의존성 배열**이다.
- 위의 코드에서는 `v1`이나 `v2`가 변경되면 `runExpensiveJob`함수가 실행되지만 `v3`가 변경되면 `runExpensiveJob`함수가 실행되지 않는다.

<br>

### 13-3. useCallback
> useMemo와 마찬가지로 메모이제이션 기능이 있으며, 함수 메모이제이션에 특화된 훅이다.

#### 불필요하게 함수가 다시 생성되는 문제 

```js
export default function App() {
  const [name, setName] = useState('');
  
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <UserEdit
        onSave={() => saveToServer(name)}
        setName={setName}
      />
    </div>
  );
}

const UserEdit = React.memo(function ({ onSave, setName }) {
  //...
});
```

- `onSave={() => saveToServer(name)}` : 자식 컴포넌트에 함수를 입력해서 속성값으로 전달할 때는 App 컴포넌트가 렌더링될 때마다 새로운 함수가 생성되어 입력이 된다. 이러면 App 컴포넌트가 렌더링될 때마다 
매번 `onSave` 속성값이 변경되기 때문에, 자식 컴포넌트인 UserEdit 컴포넌트 입장에서는 불필요하게 새로운 속성값으로 입력받고 불필요하게 다시 렌더링된다.
- React.memo를 사용하더라도 이러한 문제가 발생하는데 useCallback 훅을 사용하면 이 문제를 해결할 수 있다.

<br>

#### useCallback으로 해결
```js
export default function App() {
  const [name, setName] = useState('');
  const onSave = useCallback(() => {
    saveToServer(name);
  }, [name]);
  
  return (
    <div>
      <p>{`name is ${name}`}</p>
      <UserEdit
        onSave={onSave}
        setName={setName}
      />
    </div>
  );
}

const UserEdit = React.memo(function ({ onSave, setName }) {
  //...
});
```
- useCallback 훅도 의존성 배열로 관리한다.
- 위의 코드에서는 `name`이 변경될 때만 새로운 함수가 생성된다.

<br>

### 13-4. useReducer
> useState와 비슷하지만 여러 개의 상태값 관리할 때 사용하면 좋은 훅

```js
export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type='text'
        value={state.name}
        onChange={e => dispatch({ type: 'setName', name: e.currentTarget.value})}
      />
      <input
        type='number'
        value={state.age}
        onChange={e => dispatch({ type: 'setAge', age: e.currentTarget.value})}
      />
    </div>
  );
}
```
- useReducer는 useState와 마찬가지로 배열로 반환이 된다.
- 배열의 첫 번째 원소 : 상태값
- 배열의 두 번째 원소 : 상태값을 변경할 수 있는 dispatch 함수
- 첫 번째 매개변수 : reducer 함수
- 두 번째 매개변수 : 초기 상태값

#### reducer 함수
```js
function reducer(state, action) {
  switch(action.type) {
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
}
```
- `action`을 보고 상태값을 어떻게 변경할지 판단한다.

<br>

### 13-5. useReducer와 Context API
> 보통 상위 컴포넌트에서 다수의 상태값을 관리한다.
이 때 자식 컴포넌트에서 발생한 이벤트에서 상위 컴포넌트의 상태값을 변경해야 하는 경우가 많다.
이를 위해서 상위 컴포넌트에서 트리의 깊은 곳까지 이벤트 처리 함수를 전달하기도 하는데 이는 비효율적이다.  
useReducer 훅과 Context API를 같이 이용하면 쉽게 전달할 수 있다.

```js
export const ProfileDispatch = React.createContext(null);

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      
      <ProfileDispatch.Provider value={dispatch}>
        <SomeComponent />
      </ProfileDispatch.Provider>
    </div>
  );
}
```
- 위 코드에서는 createContext를 이용해서 `ProfileDispatch`라는 Context를 만들었다.
- App 컴포넌트에서 Provider를 이용해서 `value`로 useReducer의 `dispatch` 함수를 내려준다.
- 그러면 필요한 컴포넌트에서 useContext를 이용해서 `dispatch` 함수를 사용할 수 있다.


<br>

-------

<br>

### Reference
- [실전 리액트 프로그래밍](https://www.inflearn.com/course/%EC%8B%A4%EC%A0%84-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/)