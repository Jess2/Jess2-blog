---
title: "[Network] HTTP 웹 기본 지식"
date: 2021-07-03 18:07:85
category: network
---

![](images/network.png)

# 0. Index
1. [인터넷 네트워크](#1-인터넷-네트워크)
2. [URI와 웹 브라우저 요청 흐름](#2-uri와-웹-브라우저-요청-흐름)
3. [HTTP 기본](#3-http-기본)
4. [HTTP 메서드](#4-http-메서드)
5. [HTTP 메서드 활용](#5-http-메서드-활용)
6. [HTTP 상태코드](#6-http-상태코드)
7. [HTTP 헤더1 - 일반 헤더](#7-http-헤더1---일반-헤더)
8. [HTTP 헤더2 - 캐시와 조건부 요청](#8-http-헤더2---캐시와-조건부-요청)

<br />

# 1. 인터넷 네트워크

### 1-1. 인터넷 통신과 IP (인터넷 프로토콜)

- 인터넷 망은 굉장히 복잡한데 이 복잡한 인터넷에서 클라이언트 컴퓨터와 서버 컴퓨터는 어떻게 통신할까? 이걸 알기 위해서는 IP (인터넷 프로토콜)에 대해서 학습을 해야 한다.  
IP 주소를 통해서 인터넷에서 클라이언트 컴퓨터와 서버 컴퓨터가 통신할 수 있다.

- IP (인터넷 프로토콜)의 역할
    - 지정된 IP 주소(IP Address)에 데이터 전달
    - 패킷(Packet)이라는 통신 단위로 데이터 전달 (데이터를 그냥 보내는 게 아니라 IP 패킷이라는 규칙이 있다.)
    - 패킷 = 패키지 + 버킷

- IP 패킷 정보
    - 출발지 IP, 도착지 IP, 전달하고 싶은 데이터, 기타 ...
    - IP 패킷 정보를 인터넷 망에 던지면 IP 프로토콜에 의해서 출발지와 목적지를 알고 있기 때문에 인터넷 망 내의 노드끼리 해당 IP 패킷 정보를 던지고 목적지까지 도달하게 된다.

- IP 프로토콜의 한계
    - 비연결성
        - 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷 전송
    - 비신뢰성
        - 중간에 패킷이 사라지면?
        - 패킷이 순서대로 안오면?
    - 프로그램 구분
        - 같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 둘 이상이면?
        
<br />

### 1-2. TCP

- TCP
    - TCP란, 전송 제어 프로토콜
    - IP 프로토콜을 이용한 전송 방식은 패킷이 소실되거나 패킷 전달 순서 문제가 발생할 수 있는데 TCP 프로토콜로 이 문제를 해결할 수 있다.
    - TCP는 IP 프로토콜 방식 윗 단계에서 보완해주는 기능을 한다.
    - TCP에는 출발지 PORT, 목적지 PORT, 전송 제어, 순서, 검증 정보 등이 들어가서 IP만으로는 해결이 안됐던 문제들을 해결해준다.

- 인터넷 프로토콜 스택의 4계층
    - 애플리케이션 계층 - HTTP, FTP
    - 전송 계층 - TCP, UDP
    - 인터넷 계층 - IP
    - 네트워크 인터페이스 계층 (LAN 드라이버, LAN 장비)

- TCP/IP를 이용한 데이터 전달 방식
    1. 애플리케이션 계층에서 전달할 데이터 생성
    2. 전달할 데이터에 TCP 정보를 생성해서 씌우고 또 IP와 관련된 정보들을 씌워서 IP 패킷을 생성함
    (즉, IP 패킷 안에는 IP 정보가 존재하고 그 안에 TCP 정보가 존재하고 또 그 안에 전달할 데이터가 존재하는 것이다.)
    3. 네트워크 인터페이스를 통해서 나갈 때는 이더넷 프레임이 포함되어 나간다.
    (이더넷 프레임은 LAN 카드에 등록된 MAC 주소와 같은 물리적인 정보들이 포함되어 있다.)

- TCP/IP 패킷 정보
    - IP : 출발지 IP, 목적지 IP, ...
    - TCP : 출발지 PORT, 목적지 PORT, 전송 제어, 순서, 검증 정보, ...
    - 전달할 데이터

- TCP 특징
    - 연결 지향 - TCP 3 way handshake (가상 연결)
        - 출발지와 목적지가 연결이 되어있나 먼저 확인을 하고 데이터를 보내기 위함
    - 데이터 전달 보증
        - 만약 데이터가 전달 되다가 중간에 소실되면 소실되었다고 클라이언트에 알려준다.
        - 데이터가 잘 전달되면 잘 전달되었다고 클라이언트에 알려준다.
    - 순서 보장
        - 순서가 다르게 도착하면 클라이언트에 알려준다.
        - ex) 패킷1, 패킷2, 패킷3 순서로 전송했는데 → 패킷1, 패킷3, 패킷2 순서로 도착하면 → 클라이언트에 패킷2부터 다시 보내라고 알려준다.
    - 신뢰할 수 있는 프로토콜
    - 현재 대부분 애플리케이션에서 TCP를 사용함
        
<br />

### 1-3. PORT

- PORT
    - 배가 도착하는 항구라는 뜻
    - 같은 pc (동일 IP)에서 여러 프로그램을 사용할 수 있는데 패킷을 주고받을 때 IP만으로는 어디로 보내야할지 알 수 없다. PORT를 이용해서 구분할 수 있다.
    - IP는 목적지의 서버를 찾는 것이고, 같은 IP 내에서 프로세스를 구분하는게 PORT

- PORT 번호 범위
    - 0 ~ 65535 : 할당 가능
    - 0 ~ 1023 : 잘 알려진 포트, 사용하지 않는 것이 좋음
        - FTP - 20, 21
        - TELNET - 23
        - HTTP - 80
        - HTTPS - 443
        
<br />

### 1-4. DNS (Domain Name System : 도메인 네임 시스템)

- IP의 문제점
    - IP는 기억하기 어렵다 (123.456.789.1 와 같은 형태)
    - IP는 변경될 수 있다.

- DNS로 해결
    - DNS : 도메인 네임 시스템
    - 중간에 전화번호부와 같은 서버를 제공해준다. (DNS 서버)
    - 도메인 명을 IP 주소로 변환해준다.

- DNS를 사용한 통신
    1. DNS 서버에 <도메인 명, IP 주소> 쌍을 등록
    2. 클라이언트에서 도메인 명으로 찾는다
    3. DNS 서버가 도메인 명에 맞는 IP 주소를 클라이언트에 응답으로 준다.
    4. 클라이언트에서 해당 IP 주소를 가진 서버에 접근한다.
        
<br />

# 2. URI와 웹 브라우저 요청 흐름

### 2-1. URI

- URI (Uniform Resource Identifier)
    - Uniform : 리소스 식별하는 통일된 방식
    - Resource : 자원, URI로 식별할 수 있는 모든 것 (제한 없음)
    - Identifier : 다른 항목과 구분하는데 필요한 정보
    - 즉, URI는 리소스를 식별하는 통합된 방법이다.
    - URI(Resource Indetifier) / URL(Resource Locator) / URN(Resource Name)
    - URI는 Locator, Name, 또는 둘 다 추가로 분류될 수 있다.
        ![](images/uri.jpg)

- URL (Uniform Resource Locator)
    - 리소스가 있는 위치를 지정
    - `foo://example.com:8080/over/there?name=jessie#nose` 와 같은 형태

- URN (Uniform Resource Name)
    - 리소스에 이름을 부여
    - URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않아서 거의 안씀
    - `urn:example:person:jessie:nose` 와 같은 형태

- URL 분석 example

    ```
    scheme://[userinfo@]host[:port][/path][?query][#fragment]
    https://www.google.com/search?q=hello&hl=ko
    ```

    - `https` : protocol
    - `www.google.com` : host name
    - `443` : port number
    - `/search` : path
    - `q=hello&hl=ko` : query parameter

- URL scheme
    - 주로 프로토콜 사용
    - 프로토콜 : 어떤 방식으로 자원에 접근할 지 약속 규칙 (http, https, ftp, ...)

- URL userinfo@
    - URL에 사용자 정보를 포함해서 인증할 때 사용
    - 거의 안씀

- URL host
    - 호스트명
    - 도메인명 또는 IP주소 직접 사용 가능

- URL port
    - 접속 포트
    - http는 80 포트, https는 443 포트를 주로 사용, 포트는 생략 가능

- URL path
    - 리소스 경로(path), 계층적 구조
    - example : `/members/100`, `/items/iphone2`

- URL query
    - key=value 형태
    - ?로 시작, &로 추가 가능
    - example : `?keyA=value&keyB=valueB`
    - query parameter, query string 등으로 불림
    - 웹 서버에 제공하는 문자 형태의 파라미터

- URL fragment
    - 페이지 내에서 특정 위치로 이동할 때 사용
    - 서버에 전송하는 정보 아님
        
<br />

### 2-2. 웹 브라우저 요청 흐름

1. 웹 브라우저에서 [https://www.google.com:443/search?q=hello&hl=ko](https://www.google.com:443/search?q=hello&hl=ko) 로 접속
2. 웹 브라우저가 먼저 구글 서버를 찾아야 하기 때문에 DNS 조회해서 IP 주소를 얻어옴
3. 웹 브라우저가 HTTP 요청 메세지 생성

    ```
    GET /search?q=hello&hl=ko HTTP/1.1 Host:www.google.com
    ```

4. SOCKET 라이브러리를 통해 전달 (TCP/IP 연결, 데이터 전달)
5. TCP/IP 패킷 생성, HTTP 메세지(전송 데이터) 포함
6. 이 패킷 정보가 인터넷으로 흘러가고 도착지 서버 컴퓨터에 도달하게 됨
7. 서버에서는 요청 패킷 정보가 도착하면 HTTP 메세지를 가지고 해석한 후 데이터를 찾고 응답 메세지를 생성

    ```
    HTTP/1.1 200 OK
    Content-Type: text/html;charset=UTF-8
    Content-Length: 3423

    <html>
    	<body>...</body>
    </html>
    ```

    - Content-Type : 응답하는 데이터 형식
    - Content-Length : 응답하는 데이터의 길이
8. 서버에서도 클라이언트에서 만들었던 방식으로 **응답 패킷**을 생성해서 클라이언트에게 보낸다.
9. 웹 브라우저에서 응답 패킷을 까서 받아온 데이터를 이용해 브라우저에 렌더링한다.
10. 사용자가 화면을 볼 수 있게 된다.
        
<br />

# 3. HTTP 기본

### 3-1. 모든 것이 HTTP

- HTTP란
    - HyperText Transfer Protocol
    - 처음에는 HTML을 전송하는 프로토콜로 시작이 되었지만 지금은 거의 모든 형태의 데이터를 HTTP 프로토콜에 담아서 전송한다. (이미지, 음성, 영상, 파일, JSON, XML, ...)

- HTTP 역사
    - HTTP/0.9 (1991) : GET 메서드만 지원, HTTP 헤더 X
    - HTTP/1.0 (1996) : 메서드, 헤더 추가
    - HTTP/1.1 (1997) : 가장 많이 사용, 우리에게 가장 중요한 버전
        - 연결당 하나의 요청과 응답을 처리하기 때문에 동시 전송 문제와 다수의 리소스를 처리하기에 속도와 성능 이슈가 존재
    - HTTP/2 (2015) : 성능 개선
        - Multiplexed Streams (한 커넥션에 여러개의 메세지를 동시에 주고 받을 수 있음)
    - HTTP/3 (진행중) : TCP 대신에 UDP 사용, 성능 개선

- 기반 프로토콜
    - **TCP** : HTTP/1.1, HTTP/2
    - **UDP** : HTTP/3
    - 현재 HTTP/1.1 을 주로 사용 (HTTP/2, HTTP/3도 점점 증가)

- HTTP 특징
    - 클라이언트 서버 구조
        - Request & Response 구조
        - 클라이언트는 서버에 요청을 보내고, 응답을 대기
        - 서버는 받은 요청에 대한 결과를 만들어서 응답
    - 무상태 프로토콜(Stateless), 비연결성
    - HTTP 메세지
    - 단순함, 확장 가능
        
<br />

### 3-2. Stateless와 Stateful

- Stateless (무상태 프로토콜)
    - HTTP의 중요한 특징 중의 하나는, Stateless를 지향한다는 것.
    - 서버가 클라이언트의 상태를 보존하지 않음.
    - 장점 : 서버 확장성 높음 (스케일 아웃)
    - 단점 : 클라이언트가 추가 데이터 전송

- Stateful (상태 유지)
    - 서버가 클라이언트의 이전 상태를 보존하는 것.

- Stateful / Stateless 차이를 보여주는 example
    - Stateful - example 1 (동일한 점원)

        ```
        // 첫 번째 요청
        - 고객: 이 노트북 얼마인가요?
        - 점원A : 100만원입니다

        // 두 번째 요청
        - 고객: 2개 구매할게요
        - 점원A : 200만원입니다.
        ```

        점원A는 고객의 이전 상태를 유지하고 있기 때문에 두 번째 요청에서 고객이 어떤 걸 구매하겠다고 말하지 않았는데도 점원A는 노트북 2개로 이해하고 계산한다.

    - Stateful - example2 (요청마다 점원이 달라진 경우)

        ```
        // 첫 번째 요청
        - 고객: 이 노트북 얼마인가요?
        - 점원A : 100만원입니다

        // 두 번째 요청
        - 고객: 2개 구매할게요
        - 점원B : ? 무엇을 2개 구매하시겠어요?
        ```

        점원B는 고객이 어떤 걸 구매하려고 하는지 알 수 없기 때문에 장애가 발생한다.

    - Stateless

        ```
        // 첫 번째 요청
        - 고객: 이 노트북 얼마인가요?
        - 점원A : 100만원입니다

        // 두 번째 요청
        - 고객: 노트북 2개 구매할게요
        - 점원B : 200만원입니다.
        ```

        무상태에서는 고객이 요청마다 필요한 데이터를 다 전달하기 때문에 요청마다 동일한 점원이든 점원이 달라지든 상관없다.

- Stateless의 실무 한계
    - 모든 것을 무상태로 설계할 수 없는 경우가 있다.
    - 무상태
        - ex) 로그인이 필요없는 단순한 서비스 소개 화면
    - 상태 유지
        - ex) 로그인
    - 로그인한 사용자의 경우 로그인했다는 상태를 서버에 유지해야 한다.
    - 일반적으로 브라우저 쿠키와 서버 세션 등을 사용해서 상태를 유지한다.
    - 상태 유지는 최소한만 사용
        
<br />

### 3-3. 비 연결성(connectionless)

- TCP/IP 연결을 유지하는 모델의 단점
    - 클라이언트가 서버에 새로운 요청을 하지 않고 있더라도 연결이 되어있으면 서버의 자원을 불필요하게 소모하게 된다

- TCP/IP 연결을 유지하지 않는 모델
    - 클라이언트가 요청하고 서버로부터 응답 받은 이후에는 TCP/IP 연결 종료하는 방식
    - 서버는 연결을 유지하지 않아도 되기 때문에 최소한의 자원만을 사용할 수 있다.

- 비 연결성 소개
    - HTTP는 기본이 '연결을 유지하지 않는 모델'
    - 일반적으로 초 단위 이하의 빠른 속도로 응답
    - 1시간 동안 수천 명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십개 이하로 매우 작음
        - ex) 웹 브라우저에서 계속 연속해서 검색 버튼을 누르지는 않기 때문.
    - 서버 자원을 매우 효율적으로 사용할 수 있음.

- 비 연결성의 한계와 극복
    - TCP/IP 연결을 요청마다 매번 새로 맺어야 함 - 3 way handshake 시간이 추가됨
    - 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라 자바스크립트, CSS, 추가 이미지 등 수많은 자원이 함께 다운로드
    - 지금은 HTTP 지속 연결(Persistent Connections)로 문제 해결
        - 무조건 요청/응답 끝나면 바로 끊어버리는 게 아니라 특정 시간 동안 연결을 유지했다가 끊는다.
    - HTTP/2, HTTP/3 에서 더 많은 최적화
        
<br />

# 4. HTTP 메서드

### 4-1. HTTP API URI 설계

- 나쁜 API URI 설계 Example - 회원 정보 관리 API
    - 회원 목록 조회 `/read-member-list`
    - 회원 조회 `/read-member-by-id`
    - 회원 등록 `/craete-member`
    - 회원 수정 `/update-member`
    - 회원 삭제 `/delete-member`

- API URI 설계에서 가장 중요한 것은 **리소스 식별!**
    - 위의 회원 정보 관리 API 예제에서 리소스는 ⇒ '회원' 이다.
    - 회원을 등록하고 수정하고 조회하는 것을 모두 배제
    - 회원이라는 리소스만 식별하면 된다 ⇒ 회원 리소스를 URI에 매핑!

- 좋은 API URI 설계 Example - 회원 정보 관리 API
    - **회원** 목록 조회 `/members`
    - **회원** 조회 `/members/{id}`
    - **회원** 등록 `/members/{id}`
    - **회원** 수정 `/members/{id}`
    - **회원** 삭제 `/members/{id}`
    - 참고 : 계층 구조상 상위를 컬렉션으로 보고 복수 단어 사용 권장 (`member` → `members`)
    - 위에서 회원 조회/등록/수정/삭제를 구분하는 방법이 HTTP 메서드!

- 리소스와 행위를 분리하자
    - 가장 중요한 것은 리소스를 식별하는 것
    - URI는 리소스만 식별!
    - **리소스**와 해당 리소스를 대상으로 하는 **행위**를 분리
        - 리소스 : 회원
        - 행위 : 조회, 등록, 삭제, 변경
        
<br />

### 4-2. HTTP 메서드 - GET, POST, PUT, PATCH, DELETE

- HTTP 메서드란?
    - 클라이언트에서 서버로 뭔가를 요청할 때 기대하는 행동!

- 주로 사용되는 HTTP 메서드
    - `GET` : 리소스 조회
    - `POST` : 요청 데이터 처리, 주로 등록에 사용
    - `PUT` : 리소스를 대체, 해당 리소스가 없으면 생성
    - `PATCH` : 리소스 부분 변경
    - `DELETE` : 리소스 삭제

- 기타 HTTP 메서드
    - `HEAD` : GET 과 동일하지만 메세지 부분을 제외하고 상태 줄과 헤더만 반환
    - `OPTIONS` : 대상 리소스에 대한 통신 가능 옵션(메서드)을 설명 (주로 CORS에서 사용)
    - `CONNECT` : 대상 자원으로 식별되는 서버에 대한 터널을 설정
    - `TRACE` : 대상 리소스에 대한 경로를 따라 메세지 루프백 테스트를 수행

- GET
    - 리소스 조회
    - 서버에 전달하고 싶은 query (쿼리 파라미터, 쿼리 스트링)를 통해서 전달
    - 메세지 바디(Request Body)를 사용해서 데이터를 전달할 수 있지만, 지원하지 않는 곳이 많아서 권장하지 않음.

- POST
    - 요청 데이터 처리
    - 메세지 바디(Request Body)를 통해서 서버로 요청 데이터를 전달
    - 서버는 요청 데이터를 처리
    - 메세지 바디를 통해 들어온 데이터를 처리하는 모든 기능을 수행한다.
    - 주로 전달된 데이터로 **신규 리소스 등록 or** **요청 데이터 처리**에 사용한다.
        - 신규 리소스 등록
            - 서버가 아직 식별하지 않은 새 리소스 생성
        - 요청 데이터 처리
            - 단순히 데이터를 생성하거나 변경하는 것을 넘어서 프로세스를 처리해야 하는 경우
            - ex) 주문 결제 완료 → 배달 시작 → 배달 완료
            - POST의 결과로 새로운 리소스가 생성되지 않을 수도 있음
            - ex) POST /orders/{orderId}/start-delivery **(컨트롤 URI)**
        - 다른 메서드로 처리하기 애매한 경우
            - JSON으로 조회 데이터(Request Body)를 넘겨야 하는데, GET 메서드를 사용하기 어려운 경우
            - 어떤 메서드를 사용해야 할 지 애매하면 POST

- PUT
    - 리소스를 대체
        - 리소스가 있으면 대체
        - 리소스가 없으면 생성
        - 쉽게 이야기해서 리소스를 덮어버림
    - POST와의 차이점은 PUT은 클라이언트가 리소스를 식별한다. 즉, 리소스의 위치를 알고 URI를 지정한다.
    - 주의! PUT은 리소스를 완전히 대체한다
        - ex) `PUT /members/100` 에 Request Body로 `{ "age": 50 }`를 전송하면 서버에 `{ "name": "Jessie", "age": 20 }` 으로 있었더라도 `name` 필드가 삭제되고 `{ "age": 50 }`로 대체 된다.
        - PUT은 기존 리소스를 수정하는 게 아니라 갈아치우는 것.
        - 리소스의 부분만 수정하고 싶다면 PUT이 아니라 PATCH를 사용하자.

- PATCH
    - 리소스 부분 변경

- DELETE
    - 리소스 제거
        
<br />

### 4-3. HTTP 메서드의 속성

| HTTP 메서드 | 요청에 Body 존재 | 응답에 Body 존재 | 안전 | 멱등 | 캐시 가능 |
|-----------|---------------|---------------|-----|----|---------|
|GET	|X	|O	|O	|O	|O|
|HEAD	|X	|X	|O	|O	|O|
|POST	|O	|O	|X	|X	|O|
|PUT	|O	|O	|X	|O	|X|
|DELETE	|X	|O	|X	|O	|X|
|CONNECT	|O	|O	|X	|X	|X|
|OPTIONS	|선택사항	|O	|O	|O	|X|
|TRACE	|X	|O	|O	|O	|X|
|PATCH	|O	|O	|X	|X	|O|

- 안전
    - 호출해도 리소스를 변경하지 않는다.

- 멱등
    - 한 번 호출하든 백 번 호출하든 결과가 똑같다.
    - 멱등 여부는 서버가 TIMEOUT 등으로 정상 응답을 못주었을 때, 클라이언트가 같은 요청을 다시해도 되는가? 판단 근거가 된다.

- 캐시 가능
    - 응답 결과 리소스를 캐시해서 사용해도 되는가?
    - GET, HEAD, POST, PATCH 캐시 가능
    - 실제로는 GET, HEAD 정도만 캐시로 사용
        - POST, PATCH는 본문 내용까지 캐시 키로 고려해야 해서 구현이 쉽지 않음
        
<br />

# 5. HTTP 메서드 활용

### 5-1. 클라이언트에서 서버로 데이터 전송

- Client → Server 데이터 전달 방식
    - Query Parameter
        - GET
        - 주로 정렬 필터(검색어)
    - Message Body
        - POST, PUT, PATCH
        - 회원 가입, 상품 주문, 리소스 등록, 리소스 변경

- Client → Server 데이터 전송하는 4가지 상황
    - 정적 데이터 조회
        - 이미지, 정적 텍스트 문서
        - 조회는 GET 사용
        - 정적 데이터는 일반적으로 Query Parameter 없이 리소스 경로로 단순하게 조회
        - ex) `GET /static/star.jpg`
    - 동적 데이터 조회
        - 주로 검색, 게시판 목록에서 정렬 필터(검색어)
        - 조회는 GET 사용
        - Query Parameter 사용해서 데이터를 전달
        - 조회 조건을 줄여주는 필터, 조회 결과를 정렬하는 정렬 조건에 주로 사용
        - 서버에서 Query Parameter 기반으로 정렬 필터해서 결과를 동적으로 생성
        - ex) `GET /search?q=hello&hl=ko`
    - HTML Form을 통한 데이터 전송
        - 회원 가입, 상품 주문, 데이터 변경
        - HTML Form 전송은 GET, POST만 지원
        - ex)

            ```html
            <form action="/save" method="post">
            	<input type="text" name="username" />
            	<input type="text" name="age" />
            	<button type="submit">전송</button>
            </form>
            ```

            - form submit 버튼을 누르면 웹 브라우저가 아래와 같은 http 메세지를 생성해준다.

                ```
                POST /save HTTP/1.1
                Host: localhost:8080
                Content-Type: application/x-www-form-urlencoded

                username=kim&age=20
                ```

    - HTTP API를 통한 데이터 전송
        - 회원 가입, 상품 주문, 데이터 변경
        - 서버 to 서버
            - 백엔드 시스템 통신
        - 앱 클라이언트
            - 아이폰/안드로이드
        - 웹 클라이언트
            - HTML에서 Form 전송 대신 JavaScript를 통한 통신에 사용(AJAX)
            - React, Vue.js와 같은 웹 클라이언트와 API 통신
        - POST, PUT, PATCH : 메세지 바디를 통한 데이터 전송
        - GET: 조회, 쿼리 파라미터로 데이터 전달
        - Content-Type: application/json을 주로 사용 (사실상 표준)
        
<br />

### 5-2. HTTP API 설계 예시

- HTTP API 컬렉션
    - POST 기반 등록
    - ex) 회원 관리 API 제공
        - 회원 목록 `/members` → GET
        - 회원 등록 `/members` → POST
        - 회원 조회 `/members/{id}` → GET
        - 회원 수정 `/members/{id}` → PATCH, PUT, POST
            - PUT은 기존 리소스를 지우고 덮어버리는 개념
            - PATCH는 기존 리소스의 일부분을 수정하는 개념
            - 따라서 이 경우에는 PATCH를 사용하는 것이 제일 좋다.
            - Client에서 해당 리소스를 완전히 다 덮어버려도 문제가 없는 경우에는 PUT을 사용해도 되는데 이런 상황은 거의 없다. 왜냐하면 이 경우, Client에서 회원의 모든 정보를 보내야 하기 때문이다.
            - 게시판의 게시글을 수정하는 경우와 같이 리소스를 완전히 다 덮어버리는 경우에는 PUT을 사용한다.
            - PUT, PATCH 중에 뭘 사용해야할 지 애매할 때는 POST를 사용한다.
        - 회원 삭제 `/members/{id}` → DELETE

- HTTP API - 스토어
    - PUT 기반 등록
    - 거의 사용 X
    - ex) 정적 컨텐츠 관리, 원격 파일 관리

- HTML FORM 사용
    - 웹 페이지 회원 관리
    - 컨트롤 URI
        - GET, POST만 지원하므로 제약이 있음
        - 이런 제약을 해결하기 위해 동사로 된 리소스 경로 사용
        - POST `/new`, `/edit`, `/delete` 와 같은 방식이 컨트롤 URI
        - 컨트롤 URI는 HTTP 메서드로 해결하기 애매한 경우 사용 (HTTP API 포함)
        
<br />

### 5-3. 참고하면 좋은 URI 설계 개념

- 문서(document)
    - 단일 개념(파일 하나, 객체 인스턴스, 데이터베이스 row)
    - ex) `/members/100`, `/files/star.jpg`

- 컬렉션(collection)
    - 서버가 관리하는 리소스 디렉터리
    - 서버가 리소스의 URI를 생성하고 관리
    - ex) `/members`

- 스토어(store)
    - 클라이언트가 관리하는 자원 저장소
    - 클라이언트가 리소스의 URI를 알고 관리
    - ex) `files`

- 컨트롤러(controller), 컨트롤 URI
    - 문서, 컬렉션, 스토어로 해결하기 어려운 추가 프로세스 실행
    - 동사를 직접 사용
    - ex) `/members/{id}/delete`
        
<br />

# 6. HTTP 상태코드

### 6-1. HTTP 상태코드 소개

- 상태코드란
    - 클라이언트가 보낸 요청의 처리 상태를 응답에서 알려주는 기능

- 상태코드 종류
    - **1xx (Informational)** : 요청이 수신되어 처리 중, 거의 사용하지 않음
    - **2xx (Successful)** : 요청 정상 처리
    - **3xx (Redirection)** : 요청을 완료하려면 추가 행동이 필요
    - **4xx (Client Error)** : 클라이언트 오류, 잘못된 문법 등으로 서버가 요청을 수행할 수 없음
    - **5xx (Server Error)** : 서버 오류, 서버가 정상 요청을 처리하지 못함
        
<br />

### 6-2. 2xx - 성공

> 요청 정상 처리

- 200 OK
    - 클라이언트의 요청을 성공적으로 처리한 대표적인 경우

- 201 Created
    - 클라이언트의 요청으로 인해 서버 쪽에 리소스가 정상적으로 생성된 경우
    - 주로 POST 요청 완료시 201 Created 상태 코드를 준다.
    - 생성된 리소스는 응답의 `Location` 헤더 필드로 식별

- 202 Accepted
    - 요청이 접수되었으나 처리가 완료되지 않음
    - 배치 처리 같은 곳에서 사용
    - ex) 요청 접수 후 1시간 뒤에 배치 프로세스가 요청을 처리함

- 204 No Content
    - 서버가 요청을 성공적으로 수행했지만, 응답 페이로드 본문에 보낼 데이터가 없음
    - ex) 웹 문서 편집기에서 save 버튼
    - save 버튼의 결과로 아무 내용이 없어도 된다
    - save 버튼을 눌러도 같은 화면을 유지해야 한다
    - 결과 내용이 없어도 204 메시지만으로 성공을 인식할 수 있다
    - 서버가 요청 수행을 잘 했는지만 받고싶고 응답으로 받아서 뭔가 처리할 필요가 없을 때 사용한다.
        
<br />

### 6-3. 3xx - 리다이렉션

> 요청을 완료하기 위해 유저 에이전트(웹 브라우저)의 추가 조치 필요

- 리다이렉션의 이해
    - 웹 브라우저는 3xx 응답의 결과에 `Location` 헤더가 있으면, `Location` 위치로 자동 이동(리다이렉트)
    - example
        1. 웹 브라우저에 URL : `/event` 접근
        2. Client → Server `GET /event` 요청
        3. Server → Client `301 Moved Permanently Location: /new-event` 응답
        4. 웹 브라우저에서 자동으로 `/new-event`로 리다이렉트
        5. Client → Server `GET /new-event` 요청
        6. Server → Client `200 OK` 응답

- 리다이렉션의 종류
    - 영구 리다이렉션 - 특정 리소스의 URI가 영구적으로 이동됨
        - ex) /event → /new-event
        - ex) /members → /users
    - 일시 리다이렉션 - 일시적인 변경
        - 주문 완료 후 주문 내역 화면으로 이동
        - PRG: Post/Redirect/Get
    - 특수 리다이렉션
        - 결과 대신 캐시를 사용

- 301 Moved Permanently
    - 영구 리다이렉션
    - 원래의 URL을 사용 X
    - 검색 엔진 등에서도 변경 인지
    - 리다이렉트시 요청 메서드가 GET 으로 변하고, 본문이 제거될 수 있음

- 302 Found
    - 일시적 리다이렉션
    - 검색 엔진 등에서 URL을 변경하면 안됨
    - 리다이렉트시 요청 메서드가 대부분 GET으로 변하고, 본문이 제거될 수 있음 (일부는 다르게 동작)
    - 303, 307을 권장하지만 현실적으로 이미 많은 애플리케이션 라이브러리들이 302를 기본값으로 사용하고 있음
    - 자동 리다이렉션시에 GET으로 변해도 되면 그냥 302를 사용해도 큰 문제 없음

- 303 See Other
    - 일시적 리다이렉션
    - 검색 엔진 등에서 URL을 변경하면 안됨
    - 302와 기능은 같음, 리다이렉트시 요청 메서드가 GET으로 변경

- 304 Not Modified
    - 캐시를 목적으로 많이 사용된다
    - 클라이언트에게 리소스가 수정되지 않았음을 알려준다.
    - 클라이언트는 로컬 PC에 저장된 캐시를 재사용한다. (캐시로 리다이렉트)
    - 304 응답은 메세지 바디 포함 X (로컬 캐시를 사용해야 하므로)
    - 조건부 GET, HEAD 요청시 사용

- 307 Temporary Redirect
    - 일시적 리다이렉션
    - 검색 엔진 등에서 URL을 변경하면 안됨
    - 302와 기능은 같음, 리다이렉트 요청 메서드와 본문 유지 (요청 메서드를 변경하면 안된다)

- 308 Permanent Redirect
    - 영구 리다이렉션
    - 원래의 URL을 사용 X
    - 검색 엔진 등에서도 변경 인지
    - 301과 기능은 같은데 리다이렉트시 요청 메서드와 본문 유지함 (처음에 POST를 보내면 리다이렉트도 POST)
    - 308은 거의 사용 X, 보통 301을 사용한다.
        
<br />

### 6-4. 4xx - 클라이언트 오류

- 클라이언트의 요청에 잘못된 문법 등으로 서버가 요청을 수행할 수 없음
- 오류의 원인이 클라이언트에 있음
- 클라이언트가 이미 잘못된 요청, 잘못된 데이터를 보내고 있기 때문에 똑같이 재시도하면 실패함.

- 400 Bad Request
    - 클라이언트가 잘못된 요청을 해서 서버가 요청을 처리할 수 없음
    - 요청 구문, 메세지 등등 오류
    - 클라이언트는 요청 내용을 다시 검토하고 보내야함
    - ex) 요청 파라미터가 잘못되거나 API 스펙이 맞지 않을 때

- 401 Unauthorized
    - 클라이언트가 해당 리소스에 대한 인증이 필요함
    - 인증(Authentication) 되지 않음
    - 401 오류 발생시 응답에 `WWW-Authenticate` 헤더와 함께 인증 방법을 설명
    - 참고
        - 인증(Authentication) : 본인이 누구인지 확인, (로그인)
        - 인가(Authorization) : 권한 부여 (ADMIN 권한 처럼 특정 리소스에 접근할 수 있는 권한, 인증이 있어야 인가가 있음)

- 403 Forbidden
    - 서버가 요청을 이해했지만 승인을 거부함
    - 주로 인증 자격 증명은 있지만, 접근 권한이 불충분한 경우
    - ex) ADMIN 등급이 아닌 사용자가 로그인은 했지만, ADMIN 등급의 리소스에 접근하는 경우

- 404 Not Found
    - 요청 리소스가 서버에 없음
    - 또는 클라이언트가 권한이 부족한 리소스에 접근할 때 해당 리소스를 숨기고 싶을 때
        
<br />

### 6-5. 5xx - 서버 오류

- 서버 문제로 오류 발생
- 서버에 문제가 있는 것이기 때문에 클라이언트에서 요청 재시도 하면 성공할 수 있음 (복구가 되거나 등등)
- 웬만하면 5xx 에러는 서버에서 만들면 안된다. 서버에 문제가 터졌을 때만 만들어야 한다. 예를 들어, 고객의 잔고가 부족한 경우 5xx 에러로 내면 안된다. 5xx 에러는 비즈니스 로직 상 예외 케이스에서 내면 안되고 **진짜 서버에 무슨 문제가 있을 때** 내야 한다.

- 500 Internal Server Error
    - 서버 문제로 오류 발생
    - 애매하면 500 에러

- 503 Service Unavailable
    - 서비스 이용 불가
    - 서버가 일시적인 과부하 또는 예정된 작업으로 잠시 요청을 처리할 수 없음
    - `Retry-After` 헤더 필드로 얼마 뒤에 복구되는 지 보낼 수 있음
        
<br />

# 7. HTTP 헤더1 - 일반 헤더

### 7-1. HTTP 헤더 개요

- HTTP 헤더 용도
    - HTTP 전송에 필요한 모든 부가 정보
    - ex) 메세지 바디의 내용, 메세지 바디의 크기, 압축, 인증, 요청 클라이언트, 서버 정보, 캐시 관리 정보 ....
    - 필요시 임의의 헤더 추가 가능 (`helloworld: hihi`)

- HTTP BODY
    - 메세지 본문(message body)을 통해 표현 데이터 전달
    - 메세지 본문 = 페이로드(payload)
    - '**표현'**은 요청이나 응답에서 전달할 실제 데이터
    - **표현 헤더는 표현 데이터**를 해석할 수 있는 정보 제공 - 데이터 유형(html, json), 데이터 길이, 압축 정보 등등
        
<br />

### 7-2. 표현

- 표현 헤더는 요청, 응답 둘 다 사용

- `Content-Type`
    - 표현 데이터의 형식(타입)
    - 미디어 타입, 문자 인코딩
    - example
        - text/html; charset=utf-8
        - application/json
        - image/png

- `Content-Encoding`
    - 표현 데이터의 압축 방식
    - 표현 데이터를 압축하기 위해 사용
    - 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
    - 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
    - example
        - gzip
        - deflate
        - identity

- `Content-Language`
    - 표현 데이터의 자연 언어
    - example
        - ko
        - en
        - en-US

- `Content-Length`
    - 표현 데이터의 길이
    - 바이트 단위
    - Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨
        
<br />

### 7-3. 콘텐츠 협상

- 클라이언트가 선호하는 표현 요청 (선호하는 걸 지정해줄테니, 서버에서 줄 수 있으면 주세요)
- 협상 헤더는 요청 시에만 사용 (응답에는 사용 X)

- `Accept` : 클라이언트가 선호하는 미디어 타입 전달
- `Accept-Charset` : 클라이언트가 선호하는 문자 인코딩
- `Accept-Encoding` : 클라이언트가 선호하는 압축 인코딩
- `Accept-Language` : 클라이언트가 선호하는 자연 언어

- 협상과 우선순위1
    - Quality Values(q)값 사용
    - 0~1 범위 (생략하면 1)
    - 클 수록 높은 우선순위를 가짐
    - ex) `Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7`
        1. `ko-KR;q=1` (q 생략 가능)
        2. `ko;q=0.9`
        3. `en-US;q=0.8`
        4. `en;q=0.7`

- 협상과 우선순위2
    - 구체적인 것이 높은 우선순위를 가짐
    - ex) `Accept: text/*, text/plain, text/plain;format=flowed, */*`
        1. `text/plain;format=flowed`
        2. `text/plain`
        3. `text/*`
        4. `*/*`
        
<br />

### 7-4. 전송 방식

- 단순 전송
    - 메세지 바디에 대한 `Content-Length`를 알고 있을 때 사용 가능
    - 한 번에 요청하고 한 번에 받는 것

- 압축 전송
    - 압축한 데이터를 전송하는 경우
    - `Content-Encoding` 을 추가해줘야 한다.

- 분할 전송
    - `Transfer-Encoding` 을 추가해줘야 한다.
    - 용량이 큰 경우 한 번에 쭉 보내면 시간이 오래 걸릴 수 있어서 이런 경우에 분할 전송을 한다
    - `Content-Length`를 넣으면 안된다.

- 범위 전송
    - 어떤 데이터를 받다가 중간에 끊겨서 다시 요청하는 경우, 처음부터 다시 요청하는 것이 아니라 특정 범위를 지정해서 요청하고 응답 받을 수 있다.
        
<br />

### 7-5. 일반 정보

- `Form`
    - 유저 에이전트의 이메일 정보
    - 일반적으로 잘 사용되지는 않음
    - 검색엔진 같은 곳에서 주로 사용
    - 요청에서 사용

- `Referer`
    - 이전 웹 페이지 주소
    - 많이 사용됨
    - `A` → `B`로 이동하는 경우, `B`를 요청할 때 `Referer: A`를 포함해서 요청함
    - `Referer`를 사용해서 **유입 경로 분석** 가능
    - 요청에서 사용

- `User-Agent`
    - ex) `user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 *KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36`
    - 유저 에이전트(클라이언트) 애플리케이션 정보(웹 브라우저 정보, 등등)
    - 통계 정보
    - 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
    - 요청에서 사용

- `Server`
    - 요청을 처리하는 ORIGIN 서버의 소프트웨어 정보
    - ex) `Server: Apache/2.2.22 (Debian)`
    - 응답에서 사용

- `Date`
    - 메세지가 생성된 날짜
    - ex) `Date: Tue, 15 Nov 1994 08:12:41 GMT`
    - 응답에서 사용
        
<br />

### 7-6. 특별한 정보

- `Host`
    - 요청한 호스트 정보(Domain)
    - 요청에서 사용
    - 필수값
    - 하나의 서버가 여러 도메인을 처리해야 할 때
    - 하나의 IP 주소에 여러 도메인이 적용되어 있을 때
    - ex)

        ```
        GET /search?q=hello&hl=ko HTTP/1.1
        Host: www.google.com
        ```

- `Location`
    - 페이지 리다이렉션
    - 웹 브라우저는 `3xx` 응답 결과에 `Location` 헤더가 있으면 `Location` 위치로 자동 이동(리다이렉트)
    - `201 (Created)`: `Location` 값은 요청에 의해 생성된 리소스 URI
    - `3xx (Redirection)`: `Location` 값은 요청을 자동으로 리디렉션 하기 위한 대상 리소스를 가리킴

- `Allow`
    - 허용 가능한 HTTP 메서드
    - `405 (Method Not Allowed)`에서 응답에 포함해야 함
    - ex) POST로 요청했는데 POST는 지원하지 않고 GET, HEAD, PUT만 지원할 경우 `Allow: GET, HEAD, PUT` 와 같이 응답 헤더에 포함된다.

- `Retry-After`
    - 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
    - `503 (Service Unavailable)`: 서비스가 언제까지 불능인지 알려줄 수 있음
    - ex) `Retry-After: Fri, 31 Dec 1999 23:59:59 GMT` (날짜 표기)
    - ex) `Retry-After: 120` (초 단위 표기)
        
<br />

### 7-7. 인증

- `Authorization` : 클라이언트 인증 정보를 서버에 전달
- `WWW-Authenticate`
    - 리소스 접근 시 필요한 인증 방법 정의
    - 401 Unauthorized 응답과 함께 사용
    - ex) `WWW-Authenticate: Newauth realm="apps", type=1, title="Login to \"apps\"", Basic realm="simple"`
        
<br />

### 7-8. 쿠키
- 굉장히 많이 사용되며 중요한 개념
- `Set-Cookie` : 서버에서 클라이언트로 쿠키 전달(응답)
- `Cookie` : 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달

- 쿠키 미사용 example
    1. 로그인 이후 welcome 페이지 접근
    2. `GET /welcome HTTP/1.1` 요청
    3. `HTTP/1.1 200 OK 안녕하세요 손님` 응답 (로그인을 하더라도 Stateless 하기 때문에 누군지 몰라서 "손님"으로 응답함)
        - Stateless
            - HTTP는 무상태(Stateless) 프로토콜이다
            - 클라이언트와 서버가 요청과 응답을 주고 받으면 연결이 끊어진다
            - 클라이언트가 다시 요청하면 서버는 이전 요청을 기억하지 못한다
            - 클라이언트와 서버는 서로 상태를 유지하지 않는다

- 쿠키 미사용한 대안 - 모든 요청에 사용자 정보 포함
    - example
        1. `GET /welcome?user=홍길동 HTTP/1.1` 요청
        2. `HTTP/1.1 200 OK 안녕하세요 홍길동님` 응답
    - 이 방법은 모든 요청과 링크에 사용자 정보를 포함하면 보안에도 문제가 있고 개발도 힘들고 여러가지 심각한 문제들이 많이 발생할 수 있다.

- 쿠키 사용한 대안
    - example
        1. `POST /login HTTP/1.1 user=홍길동` 요청
        2. `HTTP/1.1 200 OK Set-Cookie: user=홍길동` 응답
        3. 웹 브라우저 내부 쿠키 저장소에 `user=홍길동` 저장
        4. 로그인 이후 welcome 페이지 접근
        5. (웹 브라우저에서 자동으로 쿠키 저장소 내의 user 조회한 후) `GET /welcome HTTP/1.1 Cookie: user=홍길동` 요청
        6. `HTTP/1.1 200 OK 안녕하세요 홍길동님` 응답
    - 웹 브라우저는 서버에 요청을 보낼 때마다 자동으로 쿠키 저장소를 무조건 뒤지고 `Cookie` 헤더를 만들어서 서버 요청 때 함께 보낸다.
    - 모든 요청에 쿠키 정보 자동 포함

- 쿠키
    - ex) `set-cookie: sessionId=abcde1234; expires=Sat, 26-Dec-2020 00:00:00 GMT; path=/; domain=.google.com; Secure`
        - `sessionId` : 세선 id
        - `expires` : 만료일시
        - `path` : 쿠키 허용 패스
        - `domain` : 쿠키 허용 도메인
    - 사용처
        - 사용자 로그인 세션 관리
        - 광고 정보 트래킹
    - 쿠키 정보는 항상 서버에 전송됨
        - 네트워크 트래픽 추가 유발
        - 최소한의 정보만 사용(세션 id, 인증 토큰)
        - 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지 (`localStorage`, `sessionStorage`)참고
    - 주의!
        - 보안에 민감한 데이터는 저장하면 안됨 (주민번호, 신용카드 번호, 비밀번호 등등)

- 쿠키 - 도메인 지정
    - ex) `domain=example.org`
    - 도메인을 명시할 경우, 명시한 문서 기준 도메인 + 서브 도메인 포함
        - `domain=example.org`를 지정해서 쿠키 생성
            - `example.org`, `dev.example.org`, ... 에서 쿠키 접근 가능
    - 도메인 지정을 생략할 경우, 현재 문서 기준 도메인만 적용됨
        - `example.org`에서 쿠키를 생성하고 domain 지정을 생략
            - `example.org`에서만 쿠키 접근 가능

- 쿠키 - 경로 지정
    - 이 경로를 포함한 하위 경로 페이지만 쿠키 접근 가능
    - 일반적으로 `path=/` 와 같이 루트로 지정함
    - ex) `path=/home` 지정
        - `/home`, `/home/level1`, `/home/level2` 가능
        - `/list` 불가능

- 쿠키 - 보안

    > 쿠키는 원래 http, https를 구분하지 않고 전송함

    - `Secure`
        - Secure를 적용하면 https인 경우에만 전송
    - `HttpOnly`
        - XSS 공격 방지
        - 자바스크립트에서 접근 불가 (`document.cookie`)
        - HTTP 전송에만 사용
    - `SameSite`
        - XSRF 공격 방지
        - 요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키 전송
        
<br />

# 8. HTTP 헤더2 - 캐시와 조건부 요청

### 8-1. 캐시 기본 동작

- 캐시가 없을 때
    - 데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운로드 받아야 한다
    - 인터넷 네트워크는 매우 느리고 비싸다
    - 브라우저 로딩 속도가 느리다 → 느린 사용자 경험
    - example
        1. 첫 번째 요청
            1. GET /star.jpg 요청
            2. 1.1M 크기 응답
        2. 두 번째 요청
            1. GET /star.jpg 요청
            2. 1.1M 크기 응답

- 캐시 적용
    - 캐시 덕분에 캐시 가능 시간 동안 네트워크를 사용하지 않아도 된다
    - 비싼 네트워크 사용량을 줄일 수 있다
    - 브라우저 로딩 속도가 매우 빠르다 → 빠른 사용자 경험
    - example
        1. 첫 번째 요청
            1. GET /star.jpg 요청
            2. 서버에서 1.1M 크기 응답

                ```
                HTTP/1.1 200 OK
                Content-Type: image/jpeg
                **cache-control: max-age=60**
                Content-Length: 34012
                ```

                - `cache-control` : 캐시가 유효한 시간(초)
            3. 응답 결과를 브라우저 캐시에 60초 유효하도록 저장한다.
        2. 두 번째 요청
            1. GET /star.jpg 요청
            2. 브라우저 캐시에서 먼저 찾는다. (캐시 유효시간 검증)
            3. 아직 캐시 유효시간 안일 경우 캐시에 저장되어 있던 응답 결과를 바로 가져온다. (네트워크 요청 안함)
        3. 세 번째 요청 (캐시 유효 시간 초과)
            1. GET /star.jpg 요청
            2. 브라우저 캐시에서 먼저 찾는다 (캐시 유효시간 검증) → 유효시간 초과
            3. 서버에서 1.1M 크기 응답
            4. 응답 결과를 브라우저 캐시에 기존 데이터를 지우고 저장한다.

                **→ 기존 브라우저 캐시에 저장된 (유효시간 만료된) 데이터와 새로 받아온 데이터가 동일한데 새로 받아올 필요가 있을까? → 검증 헤더와 조건부 요청으로 해결**
                              
<br />

### 8-2. 검증 헤더와 조건부 요청

- 검증 헤더
    - 캐시 데이터와 서버 데이터가 같은지 검증하는 데이터
    - Last-Modified, ETag

- 조건부 요청 헤더
    - 검증 헤더로 조건에 따른 분기
    - If-Modified-Since: Last-Modified 사용
    - If-None-Match: Etag 사용
    - 조건이 만족하면 200 OK
    - 조건이 만족하지 않으면 304 Not Modified

- 캐시 시간 초과 : 캐시 유효시간이 초과해서 서버에 다시 요청하면 다음 두 가지 중 한 가지 상황이 나타난다.
    - 서버에서 기존 데이터를 변경함
    - 서버에서 기존 데이터를 변경하지 않음
        - 데이터를 전송하는 대신에 저장해두었던 캐시를 재사용할 수 있다
        - 단, 클라이언트의 데이터와 서버의 데이터가 같다는 사실을 확인할 수 있는 방법 필요 → 검증 헤더 추가

- Last-Modified / If-Modified-Since 방식으로 해결
    - 과정 example
        - 첫 번째 요청으로 받은 응답에 `Last-Modifed` 응답 헤더 추가 (검증 헤더)
        - `Last-Modifed`를 브라우저 캐시에 응답 결과, 유효 시간과 함께 저장
        - 두 번째 요청부터는 요청 헤더로 `if-modified-since` (조건부 요청) 추가 (브라우저 캐시에서 `Last-Modifed` 값을 가져올 수 있다.)
        - 서버에서 요청을 받으면 `if-modified-since` 값과 서버에 가지고 있는 데이터의 `Last-Modifed` 값을 비교해서 똑같으면 → 데이터가 수정되지 않았음을 검증할 수 있다.
        - HTTP 응답으로 `304 Not Modified` 를 보낸다. (HTTP Body 없음)
        - 브라우저 캐시에 저장되어 있는 응답 결과를 재사용하고 브라우저 캐시의 헤더 데이터 갱신(유효시간)

    - 정리
        - 캐시 유효 시간이 초과해도 서버의 데이터가 갱신되지 않으면 304 Not Modified + 헤더 메타 정보만 응답 (Body X)
        - 클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보를 갱신
        - 클라이언트는 캐시에 저장되어 있는 데이터 재활용
        - 결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만 다운로드
        - 매우 실용적인 해결책
        - 브라우저 개발자도구 network 탭에서 status의 색깔이 연한 것은 캐시에서 불러온 것.

    - 단점
        - 1초 미만 단위로 캐시 조정 불가능
        - 날짜 기반의 로직 사용
        - 데이터를 수정해서 날짜가 다르지만 같은 데이터를 수정해서 데이터 결과가 똑같은 경우
        - 서버에서 별도의 캐시 로직을 관리하고 싶은 경우
            - ex) 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우

- ETag / If-None-Match 방식으로 해결
    - ETag (Entity Tag)
    - 캐시용 데이터에 **임의의 고유한 버전**의 이름을 달아둠
        - ex) ETag: "v1.0", ETag: "a2jiodwjekjl3"
    - 데이터가 변경되면 이 이름을 바꿔서 변경함 (Hash 다시 생성)
        - ex) ETag: "aaaaa" → ETag: "bbbbb"
    - 진짜 단순하게 ETag만 보내서 같으면 유지, 다르면 다시 받기!
    - **캐시 제어 로직을 서버에서 완전히 관리**
    - 클라이언트는 단순히 이 값을 서버에 제공(클라이언트는 캐시 메커니즘을 모름)
    - ex)
        - 서버는 베타 오픈 기간인 3일 동안 파일이 변경되어도 ETag를 동일하게 유지
        - 애플리케이션 배포 주기에 맞추어 ETag 모두 갱신    
        
<br />

### 8-3. 캐시와 조건부 요청 헤더

- 캐시 제어 헤더
    - `Cache-Control` : 캐시 제어
        - 이게 가장 중요. 이걸로 다 할 수 있다.
        - `Cache-Control: max-age` : 캐시 유효 시간, 초 단위
        - `Cache-Control: no-cache` : 데이터는 캐시해도 되지만, 항상 origin 서버에 검증하고 사용
        - `Cache-Control: no-store` : 데이터에 민감한 정보가 있으므로 저장하면 안됨. 메모리에서 사용하고 최대한 빨리 삭제

    - `Pragma` : 캐시 제어 (하위 호환)
        - `Paragma: no-cache`
        - HTTP 1.0 하위 호환

    - `Expires` : 캐시 유효 기간 (하위 호환)
        - 캐시 만료 일시(정확한 날짜)로 지정
        - HTTP 1.0부터 사용
        - 지금은 더 유연한 `Cache-Control: max-age` 권장
        - `Cache-Control: max-age`와 함께 사용하면 `Expires`는 무시

- 검증 헤더
    - ETag: "v1.0", ETag: "asid93jkrh2l"
    - Last-Modified: Thu, 04 Jun 2020 07:19:33 GMT

- 조건부 요청 헤더
    - If-Match, If-None-Match: ETag 값 사용
    - If-Modified-Since, If-Unmodified-Since: Last-Modified 값 사용    
    
<br />

### 8-4. 프록시 캐시

- 중간에 공용으로 사용하는 캐시 서버
- example
    - 한국에 있는 많은 클라이언트에서 미국에 있는 Origin 서버에 직접 접근하면 오래걸릴 수 있는데 한국에 프록시 캐시 서버를 두어 해결할 수 있다.
    - 예를 들어, 한국에서 미국 서버로 요청할 때 500ms가 걸린다고 가정하면, 한국에 있는 모든 클라이언트에서 서버로 요청할 때 각각 500ms씩 걸린다.
    - 한국에 프록시 캐시 서버를 두고 한국에 있는 클라이언트는 이 서버에 접근하게 한다.
    - 보통 한 번 프록시 캐시 서버에 다운로드 받아 놓으면 두 번째 요청부터는 빠르게 조회할 수 있다.
    
<br />

### 8-5. 캐시 무효화

- 확실한 캐시 무효화 응답
- 이 페이지는 확실히 캐시가 되면 안돼! 하는 경우에 사용

```
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
```
        
<br />

# Reference

- [모든 개발자를 위한 HTTP 웹 기본 지식]([https://www.inflearn.com/course/http-웹-네트워크](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC))
