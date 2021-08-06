---
title: "[WEB] CORS : 교차 출처 리소스 공유 (Cross-Origin Resource Sharing)"
date: 2021-08-06 14:08:84
category: web
---

한 사이트에서 주소가 다른 서버로 요청을 보낼 때 CORS 관련 에러가 발생한다.

[https://aaa.com](https://aaa.com) 에서 [https://bbb.com/api/ccc](https://bbb.com/api/ccc) API로 정보를 받아오기 위해 **'프론트'**에서 HTTP 요청을 보냈을 때 미리 특정 설정을 해주지 않으면 CORS 관련 에러로 막히게 된다.

**'PostMan'** 같은 것으로 똑같은 요청을 보내거나 **'백엔드'**에서 HTTP로 요청을 보내면 정상 동작하지만 **'웹사이트'**에서 요청을 보낼 때만 CORS 관련 에러가 발생한다.

**이는 '브라우저'에서 발생시키는 에러이기 때문이다.**

<br />

### SOP : Same-Origin Policy

- 브라우저는 기본적으로 Same-Origin Policy (동일 출처 정책)을 갖고 있다.
- 동일 출처 정책 : 동일한 출처끼리만 API 등의 데이터 접근이 가능하도록 하는 것
- 이 동일 출처 정책 때문에 다른 url 로 API를 호출하려고 하면 에러가 발생하는 것이다.
- 따라서 CORS(교차 출처 리소스 공유)를 허용해줘야 한다.

<br />

### 출처(Origin)

- URL의 **Protocol**, **Host**, **Port** 까지 같으면 동일한 출처라고 판단한다. (IE는 Port가 달라도 Protocol, Host만 같으면 동일한 출처로 판단)
- example

    ```
    https://github.com:443/JESS2/Jess2-blog?tab=repositories#example
    ```

    - `https://` - Protocol
    - `github.com` - Host
    - `:443` - Port
    - `/JESS2/Jess2-blog` - Path
    - `?tab=repositories` - Query String
    - `#example` - Fragment

<br />

### CORS : Cross-Origin Resource Sharing

- CORS란, 다른 출처 간의 리소스를 공유할 수 있도록 하는 것
- 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 '**브라우저'**에게 알려주는 체제

<br />

### CORS 허용 방법

1. 요청을 받는 백엔드 쪽에서 요청을 허락할 다른 출처들을 미리 명시한다.
2. 프론트엔드 프록시 서버 설정

<br />

### Reference

- [MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [웹개발 짜증유발자! CORS가 뭔가요?](https://www.youtube.com/watch?v=bW31xiNB8Nc)
- [나봄의 CORS](https://www.youtube.com/watch?v=-2TgkKYmJt4)