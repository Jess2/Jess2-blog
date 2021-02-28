---
title: "[JavaScript] 자바스크립트의 역사와 현재 그리고 미래"
date: 2021-02-28 20:02:82
category: javascript
---

![](images/javascript.png)

### 자바스크립트의 역사

- 1993 NCSA - Mosaic Web Browser
- 1994 Netscape - Netscape Navigator
    - HTML/CSS로 간단하게 정적 웹 페이지를 만들 수 있었다.
    - 시장 점유율 80%
    - 이후 동적 웹사이트를 만들기 위한 고민 → Scripting 언어를 추가하자!
    - Scheme Scriptint 언어를 조금 더 Java 언어스럽게 만들어 새로운 언어를 만들어보자! 시간이 없으니 10일 안에!
    - 프로토타입을 베이스로한 유연한 언어 Mocha가 탄생하고 추후 LiveScript로 이름이 변경된다.
    - Netscape Navigator 안에 LiveScript 를 이해하고 실행할 수 있는 LiveScript 엔진 (인터프리터)가 포함이 되어 브라우저가 출시된다.
    - 이제 DOM 요소를 조작하는 것이 가능해진다.
    - 그 당시 Java 언어의 인기가 높아서 LiveScript의 이름을 JavaScript로 변경한다.
    - 이 때문에 많은 사람들이 Java와 JavaScript가 비슷한 언어인 것으로 오해했다.
- 1995 Netscape Navigator
    - JavaScript와 JavaScript 엔진을 포함하여 새롭게 출시
- 1995 Microsoft
    - Netscape의 브라우저의 바이너리 코드를 분석해서 소스 코드를 복원해낸다.(reverse engineering)
    - 기능만 조금 변경해서 자신들만의 언어인척 언어를 만든다. JScript
    - Internet Explorer 를 출시 (개발자들 고통의 시발점)
- 1996 너무나 다른 두 브라우저
    - 웹 개발자들은 너무나 다른 두 브라우저에서 동작할 수 있는 웹 사이트를 만들어야 했다. (JavaScript / JScript)
    - 그 당시 두 브라우저에서 각각 “best viewed in Netscape” / “best viewed in Internet Explorer” 와 같은 문구를 많이 볼 수 있었다.
    - Netscape사에서 ECMA International 단체에 찾아가서 “JavaScript로 표준화를 만들어보자”라고 제안
- 1997 ECMAScript 1 Language Specification 탄생
    - 그 이후에도 ECMAScript 2 (1998), ECMAScript 3 (1999), ECMAScript 4 (2000) ... 이 계속 탄생
    - 특히 ECMAScript 4부터는 많은 사람들이 optional type annotation, class, Enterprise scale 등등 다양한 아이디어가 제안된다.
- 2000 IE 시장점유율 95%
    - ECMAScript 새로운 기능에 대해 많은 것들이 논의되는 동안 IE의 시장 점유율이 급격히 상승된다.
    - IE 를 가진 Microsoft에서는 “개발자들이 쉽게 개발하라고 스크립트 언어를 만들었는데, class를 추가하면 스크립트 언어가 아니다”와 같은 불만을 표출하면서 ECMAScript 표준화를 따르지 않게 된다.
    - 어차피 많은 사람들이 IE를 사용하고 있기 때문에 IE가 표준이라고 선언.
    - 그래서 2000년부터는 표준화 진행이 더뎌졌다.
- 2004 mozilla Firefox 브라우저 출시
    - ECMAScript 에 찾아가서 mozilla의 ActionScript3 Tamarin이라는 멋진 언어, 엔진을 소개하며 표준화에 대해 다시 검토하자고 한다.
    - 하지만 기존에 표준화된 언어와 다른점 때문에 새로운 걸로 다시 표준화를 진행하기에는 무리
    - 표준화를 앞에 두고 3사의 신경전
    - 이 때문에 개발자들이 다양한 브라우저 대응 때문에 고통 받는다
- 2004 AJAX (Asynchronous JavaScript and XML) 탄생
    - 비동기적으로 서버에서 데이터를 받아오고 처리할 수 있어진다.
- 개발자들 사이 강력한 커뮤니티가 형성되기 시작
    - 그 커뮤니티 사이에서 jQuery, dojo, mootools와 같은 라이브러리들이 많이 나온다. (크로스 브라우징 신경쓰지 않도록 도와주는 라이브러리)
- 2008 google Chrome 브라우저 탄생
    - JIT (just-in-time compilation)이라는 굉장히 강력하고 빠른 엔진을 포함
    - 다른 브라우저들도 성능에 대해서 고민하기 시작
    - 브라우저들이 모여 표준화를 만들어보자고 함
- 2009 ECMAScript 5 탄생
- 2015 ECMAScript 6 탄생
    - default parameter, class, arrow function, const, let
    - 이 이후에 매년 새로운 버전 탄생!
    - 커다란 변화들은 5, 6 버전에서 많이 정의되었고 이 이후에는 조금씩 변했다.
    - 이제는 더이상 jQuery같은 라이브러리의 도움 없이 언어만으로도 충분히 모든 브라우저에서 잘 동작할 수 있는 웹 사이트나 웹 어플리케이션을 만들 수 있다.
- 2016 ECMAScript 7 탄생
- 2017 ECMAScript 8 탄생
- 2018 ECMAScript 9 탄생
- 2019 ECMAScript 10 탄생
- 2020 ECMAScript 2020 탄생
- 개발할 때는 TypeScript와 같은 ECMAScript 최신버전으로 개발하고 ES5나 ES6로 변환된 코드로 생산해주는 JavaScript Transpiler(Babel)를 이용한다.

<br>

### SPA (Single Page Application)
- 하나의 페이지 안에서 데이터를 받아와서 필요한 부분만 부분적으로 업데이트하는 것이 굉장히 유행 중
- 물론 JS만으로도 충분히 구현이 가능하겠지만 SPA를 조금 더 쉽게 만들기 위해서 React, Vue, Angular 같은 프레임워크, 라이브러리들이 탄생했다.

<br>

### JS의 다양한 분야
- back-end (node.js)
- mobile (react-native, cordova)
- desktop (electron)

<br>

### 브라우저에서 동작할 수 있는 언어
- 유일하게 JS 였는데 요즘엔 Web Assembly 가 등장해서 Rust, C, C++, C#, Python, Java, Go 다양한 언어들을 이용해서 웹 어플리케이션을 만드는 것이 가능해졌다.
- C++로 만들어진 게임같은 것들도 웹 브라우저에서 쉽게 동작할 수 있게 만들 수 있다.
- Graphic Tool 중에 하나인 Figma도 이 Web Assembly 를 이용해서 만들어졌다.

<br>

### Reference
- [https://www.youtube.com/watch?v=wcsVjmHrUQg&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=1](https://www.youtube.com/watch?v=wcsVjmHrUQg&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=1)
