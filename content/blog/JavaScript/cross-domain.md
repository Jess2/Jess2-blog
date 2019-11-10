---
title: "[JS] 크로스 도메인(Cross Domain)"
date: 2019-10-06 13:10:37
category: javascript
---

![](images/javascript.png)

크로스 도메인은 쉽게 말해서 **서로 다른 도메인 간의 호출**이다.

만약 내가 개발한 웹 사이트에서만 사용하기 위해 API 서버를 구축하였는데 다른 웹 서비스에서 이 API 서버에 마음대로 접근하여 API를 호출하여 사용할 수 있다면 문제가 된다.

그래서 JavaScript는 **Same Origin Policy(동일 출처 정책)**라는 정책을 두어 다른 도메인의 서버에 요청하는 것을 차단시킨다.

### JavaScript는 동일한 도메인 내에서만 서버 요청을 허용한다는 것이다.

따라서 JavaScript를 이용하여 AJAX를 통해 다른 도메인의 서버의 URL을 호출하여 데이터를 가져올 수는 없다.

예를 들어 google.com 도메인에서 호출된 AJAX는 google.com 도메인 내에 있는 URL만을 호출할 수 있고

google.com 도메인에서 naver.com 의 URL을 AJAX로 호출할 수 없다.

### 하지만 크로스 도메인을 허용해야 하는 경우가 있다.

예를 들어 하나의 웹 사이트에서는 효율성이나 성능 등의 이유로 각 기능별로 여러 서버를 두는 경우가 많다. (API 서버, WAS 서버, 파일 서버 등)

그런데 이 서버들은 물리적으로 분리된 서버이고 다른 용도로 구축된 서버이기 때문에 당연히 각각 다른 도메인을 가진 서버들이다.

그래서 크로스 도메인 이슈가 발생하기 때문에 서로 간의 AJAX 통신을 할 수가 없다. 그래서 크로스 도메인을 허용해야만 한다.

### 크로스 도메인은 어떻게 허용해야 할까?

> CORS를 활성화 시키면 된다.

CORS란, Cross-Origin Resource Sharing의 약자로 웹 페이지의 제한된 자원을 외부 도메인에서의 요청(접근)을 허용해주는 것이다.

CORS를 이용하여 특정 도메인에서 접근하는 것이 가능하도록 해준다. 즉, 크로스 도메인을 허용해준다.

응답을 받는 서버 쪽 요청 응답 헤더에 `Access-Control-Allow-Origin`으로 허용할 오리진을 지정해주면 크로스 도메인을 허용해 줄 수 있다.

