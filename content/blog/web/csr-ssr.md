---
title: "[WEB] Client Side Rendering과 Server Side Rendering"
date: 2021-05-05 23:05:92
category: web
---

![](images/web.png)

# Static Sites (1990)

기본적으로 웹은 Client와 Server로 나뉘어진다.

- Client는 요청을 보내는 역할
- Server에서 요청을 받아 보고 알맞은 정보를 응답해준다.
- Client에서 특정 url로 접속을 하면 해당 서버에 이미 배포되어 있는 html 문서들 중 알맞은 html을 내려준다.
- Client는 서버로부터 받은 응답(html 문서)을 바탕으로 DOM에 그린다.

### Static Sites의 문제점

- 페이지 내에서 다른 링크를 클릭하면 다시 서버에서 해당 페이지 html을 받아와서 페이지 전체가 업데이트되어야 한다. 페이지 이동할 때마다 깜빡임.
- 웹의 성능이 계속 좋아지고 내려줘야 하는 정보의 양도 늘어나고 JavaScript 등장 이후로 사용자와의 인터랙션도 늘어나게 되면서 요청을 보내고 응답을 받는 과정이 계속해서 많아지게 된다. (static한 정보만을 보여주는 웹의 초기 역할을 넘어서게 됨.)

    → 서버 입장에서도 수많은 요청을 처리해야하게 된다.

    → Client 입장에서도 계속해서 페이지 깜빡임이 발생하게 된다. 서버에서 html을 새로 받아서 그리기 때문.

<br />

# iframe (1996)

- 문서 내에서 또 다른 문서를 담을 수 있는 iframe 태그가 도입 되었다.
- 페이지 내에서 부분적으로 문서를 받아와서 업데이트할 수 있게 되었다.

<br />

# XMLHttpRequest (1998)

- 우리가 많이 쓰고 있는 fetch API의 원조인 XMLHttpRequest API 가 개발되었다.
- 이 API로 html 문서 전체가 아니라 JSON과 같은 포맷으로 서버에서 필요한 데이터만 받아올 수 있게 되었다.
- 이 데이터를 JavaScript를 이용해서 동적으로 HTML 요소를 생성해서 페이지에 업데이트 하는 방식.

<br />

# AJAX (2005)

- XMLHttpRequest 를 이용하는 방식이 공식적으로 AJAX라는 이름을 가지게 되었다.
- 구글에서도 AJAX를 이용해서 Gmail, Google Maps과 같은 웹 어플리케이션을 만들기 시작.

    → SPA (Single Page Application)

### SPA (Single Page Application)

- 사용자가 한 페이지 안에 머무르면서 필요한 데이터를 서버에서 받아와서 부분적으로만 업데이트하는 방식.
- 이런 방식으로 하나의 어플리케이션을 사용하는 것처럼 웹 사이트에서 사용할 수 있게 된다.

<br />

# CSR (Client Side Rendering)

기존에는 Server에서 받은 html을 바탕으로 Client가 화면을 그렸지만, CSR 방식은 서버에서 받는 게 아니라 Client에서 알아서 화면을 그리는 방식이다.

React나 Vue 같은 라이브러리/프레임워크는 SPA를 만드는 것을 지원하고 CSR 방식으로 동작한다

CSR 방식으로 만들어진 사이트 url에 접근을 하면 서버로부터 `body` 태그 안에 `<div id="root"></div>` 와 application에서 필요한 js 파일 링크만 들어 있는 형태의 html 파일을 응답 받는다.

1. 사이트 접속
2. html은 텅텅 비어져있기 때문에 처음에는 빈 화면이 보이게 된다.
3. 링크된 js 파일을 서버로부터 다운로드 받는다.

    이 js 파일에는 우리 어플리케이션에 필요한 로직들 뿐만 아니라 어플리케이션을 구동하는 프레임워크와 라이브러리(ex. react, vue, angular)의 소스코드들도 다 포함이 되어 있기 때문에 사이즈가 굉장히 커서 다운로드 받는데 시간이 소요될 수 있다.

4. 추가로 필요한 데이터가 있을 경우 서버로 요청해서 JSON 데이터를 받아온 다음 js 파일과 함께 동적으로 html을 생성해서 사용자에게 화면을 보여준다.

개발자도구 Networks 탭에 가보면 서버에서 받은 html은 내용이 비어 있는데 개발자도구 Elements 탭에 가보면 <div id="root"></div> 태그 안에 다른 태그들이 들어가 있다. 이 태그들은 번들링된 js 파일을 통해 만들어진다.

리액트는 build를 할 때 프로젝트 내의 모든 리액트 코드를 하나의 자바스크립트 파일로 만들어 준다. (babel로 transpiling, webpack으로 bundling)

정리

1. Server는 body 태그 안에 비어있는 div 태그 하나만 존재한 html을 응답해버린다. 
2. Client에서 bundle.js를 읽고 DOM을 그린다.
3. 사이트 내에서 라우팅 처리된 url로 이동을 하더라도 서버로부터 새로운 html을 받지 않는다.
4. bundle.js에 모든 코드가 다 들어있기 때문에 Client에서 변경된 url에 맞는 코드를 bundle.js에서 찾아서 그린다.

### CSR의 장점

- 웹을 앱과 비슷한 경험으로 사용할 수 있다.
- url이 바뀌어도 html을 다시 내려 받지 않고 Client에서 알아서 그린다.

### CSR의 단점

- 대형 프로젝트일 경우 코드가 많아지면 번들링된 하나의 자바스크립트 파일의 크기가 커진다. 이 파일의 크기가 커질 수록 처음에 파일을 로드하는 시간이 오래 걸린다. 즉, 사용자가 첫 화면을 보기까지가 오래 걸린다.
    - 그런데 이 문제는 Code Splitting 으로 어느정도 해결할 수 있다.
    CSR이라고 하더라도 대부분 url이 고정적으로 하나가 아나가 아니다. 그래서 url 마다 각각의 번들링된 js 파일을 만들 수 있다. 이렇게 하면 딱 하나의 bundle.js 파일로만 만들어지지 않기 때문에 초기 로드 시간이 빨라진다.
- SEO (검색 엔진 최적화) 대응이 힘들다.
    - 많은 검색봇들이 html을 기반으로 요소를 찾기 때문에 빈 html을 내려주는 CSR을 사용하면 불리해진다.

<br />

# SSR (Server Side Rendering)

CSR의 문제점들 때문에 1990년 중반에 사용했던 Static Sites에서 영감을 받은 SSR이 도입되게 된다.

SSR은 Client에서 모든 것을 처리하는 방식과는 다르게,

웹 사이트에 접속하면 서버에서 필요한 데이터를 모두 가져와서 html 파일을 만들고 이렇게 만들어진 html 파일이 동적으로 제어할 수 있는 소스코드와 함께 Client에 보내준다. 

### SSR의 장점

- CSR을 사용했을 때보다 첫 페이지 로딩이 빨라진다.
- 모든 내용이 html에 담겨져있기 때문에 효율적인 SEO 대응이 가능하다.

### SSR의 단점

- Static Sites에서 발생했던 깜빡임 이슈

    사용자가 링크를 클릭하게 되면 전체 페이지를 다시 서버로부터 받아오는 것과 동일하기 때문에 좋지 않은 사용자 경험을 준다.

- 서버에 과부하가 걸리기 쉽다.

    특히 사용자가 많은 사이트일수록 사용자가 클릭을 할 때마다 서버에 요청해서 서버에서 html을 만들어야 하기 때문

- 사용자가 빠르게 웹 사이트를 확인할 수는 있지만 동적으로 데이터를 처리하는 js를 아직 다운로드 받지 못해서 사용자가 사이트 내에서 클릭을 했는데 반응이 없는 경우가 발생할 수 있다. 이게 무슨 말인지 이해하려면 TTV와 TTI를 알아야 한다.

<br />

# TTV (Time To View)와 TTI (Time To Interact)

### CSR

1. 사이트 접속
2. 서버로부터 내용이 빈 index.html을 받는다.
3. 이 때 사용자에게는 아무것도 보여지지 않는다.
4. (html 파일에 링크되어져 있는) 이 웹사이트에서 필요한 모든 로직이 담겨있는 js를 서버에 요청
5. 동적으로 html을 생성할 수 있는 웹 어플리케이션 로직이 담긴 js 파일을 서버로부터 응답 받는다.
6. 웹 사이트 화면이 사용자에게 보여지고 클릭과 같은 것들도 바로 가능해진다. (viewable, interactable)

즉, 사용자가 웹 사이트를 볼 수 있음(TTV)과 동시에 클릭을 하거나 인터랙션(TTI)이 가능하게 된다.

### SSR

1. 사이트 접속
2. 서버에서 이미 잘 만들어진 index.html를 받는다.
3. 이 때 사용자가 웹 사이트 화면을 볼 수 있다. (TTV)
4. 하지만 아직 사용자가 사이트를 동적으로 제어할 수 있는 js 파일은 받아오지 않은 상태라서 클릭과 같은 것들을 해도 동작을 하지 않는다.
5. 서버에 js 요청해서 응답 받는다.
6. 사용자가 클릭을 처리할 수 있는 인터랙션이 가능해진다. (TTI)

즉, SSR은 사용자가 화면을 볼 수 있는 시간과 실제로 인터랙션을 할 수 있는 시간 사이 공백 기간이 꽤 긴 편이다. (웹 사이트의 성능을 분석할 때 TTV와 TTI도 중요한 요소로 사용된다.)

<br />

# CSR + SSR

사용자가 처음 들어왔을 때의 페이지는 서버에서 받아 렌더링하고(SSR) 그 뒤에 발생하는 라우팅은 CSR로 하면 어떨까?

여기에서 첫 페이지를 서버에서 받는다는 것은 CSR처럼 비어 있는 html을 받는다는 게 아니라 내용이 모두 채워져 있는 html을 받는다는 것이다.

그러면 Client에서는 서버로부터 받은 html을 DOM에 그대로 그리기만 한다. (이후 인터랙션이 가능한 js파일은 따로 load)

html에 내용이 모두 채워진 상태로 받기 때문에 SEO 대응이 가능해진다.

Code Splitting을 안했을 때의 CSR 방식보다 사용자가 화면을 보는 시간도 빨라진다.

그리고 첫 진입 이후에는 CSR 방식으로 동작하도록 하면 사용자가 url을 이용해도 페이지 깜빡임 없이 사용할 수 있게 된다.

### Next.js

- React를 사용한다고 했을 때, Next.js를 사용하지 않고 React만으로도 이렇게 구현을 할 수 있기는 하지만, 러닝 커브가 좀 있다. Next.js 가 이러한 기능을 편리하게 구현할 수 있도록 해주고 현업에서도 굉장히 많이 사용하고 있다.
- Next.js는 page를 기반으로 build한다.
- pages 폴더 내에 있는 파일 이름을 기반으로 라우팅이 동작된다. (ex. pages/about.js → /about)

root url 로 들어왔을 때 next.js는 index.js 라는 이름을 가진 파일을 찾는다.

그리고 해당 파일의 js 코드를 html로 변환해준다.

사이트 처음 진입시 next 서버가 내용이 모두 채워진 html을 내려준다.

예를 들어, [domain.com](http://domain.com) url을 입력해서 진입을 하면 해당 페이지 내용이 모두 채워진 html을 서버로부터 응답 받고 [domain.com/about](http://domain.com/about) url을 입력해서 진입을 하면 해당 페이지 내용이 모두 채워진 html을 서버로부터 응답받는다.

즉, SSR이 잘 동작한다.

이제 내부적으로 CSR을 어떻게 동작시키는지 알아보자.

next.js 기본 내장 기능인 `next/link`나 `next/router`를 활용하면 된다.

```jsx
import React from 'react';
import Link from 'next/link';

export default function index() {
	return (
		<Link href={"/about"}>
			About 페이지로 이동하기
		</Link>
	)
}
```

이런식으로 next/link를 이용해서 만들어준 Link 태그를 화면에서 클릭하게 되면 about 페이지로 이동되지만 서버로부터 새로운 html 파일을 받지 않는다.

즉, CSR 방식으로 동작하게 되는데, Link 태그를 화면에서 클릭하게 되면 js 파일이 실행되서 이동한 페이지 내용에 맞는 DOM의 내용으로 변경된다. (갈아끼워지는 형태)

`next/router` 도 CSR 방식으로 동작한다.

<br />

# SSG (Static Site Generation)

- React의 경우는 CSR에 특화된 라이브러리이지만 Gatsby 라이브러리와 함께 사용하면 React로 만든 웹 어플리케이션을 정적으로 웹 페이지 생성을 미리 해두어서 서버에 배포해놓을 수 있다.
- Next.js 의 export 기능으로 Static Site Generator 로 사용할 수 있다.
    - Next.js은 강력한 SSR 기능을 지원하는 라이브러리였지만 요즘에는 SSG 기능도 지원한다.
    - Next.js 는 기본적으로는 Node 서버를 띄워서 사용자가 진입할 때마다 페이지를 만들어낼 수 있는데, Next.js 의 export 기능으로 Static Site Generator 로 사용할 수 있다.
    - 빌드 시점에 미리 진입할 수 있는 Page 를 파악하고 이를 각각의 HTML 로 만들어 낸다. 이렇게 만들어진 static 파일들은 호스팅 서버에 업로드하여 사이트를 구성 할 수 있다.

<br />

# Reference

- [서버사이드 렌더링 (개발자라면 상식으로 알고 있어야 하는 개념 정리)](https://www.youtube.com/watch?v=iZ9csAfU5Os)
- [SPA 등장 배경과 CSR(Client Side Rendering)](https://www.youtube.com/watch?v=C6uELkDh-60)
- [next.js로 살펴보는 SSR(Server Side Rendering)](https://www.youtube.com/watch?v=6Ti_A3vMJvk)
- [NextJS 로 Static Site 만들기](https://pks2974.medium.com/nextjs-%EB%A1%9C-static-site-%EB%A7%8C%EB%93%A4%EA%B8%B0-f9ab83f29e7)