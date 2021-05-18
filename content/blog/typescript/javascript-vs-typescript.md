---
title: "[TypeScript] 동적 타입 언어 vs 정적 타입 언어"
date: 2021-05-18 22:05:70
category: typescript
---

![](images/typescript.png)

### JavaScript vs TypeScript

- JavaScript
    - 동적 타입 언어 (JavaScript, Python, PHP)
    - 변수의 타입은 런타임에 결정된다.
- TypeScript
    - 정적 타입 언어 (TypeScript, Java, C++)
    - 자바스크립트의 모든 기능을 포함하면서 정적 타입을 지원한다.
    - 정적 타입 언어는 변수의 타입이 컴파일 타임에 결정된다.

<br />

### 동적 타입 언어 vs 정적 타입 언어

- 동적 타입 언어
    - 진입 장벽이 낮다
    - 코드의 양이 적을 때 생산성이 높다
    - 타입 오류가 런타임 시 발견된다
- 정적 타입 언어
    - 진입 장벽이 높다
    - 코드의 양이 많을 때 생산성이 높다
    - 타입 오류가 컴파일 시 발견된다

<br />

### TypeScript

- Microsoft에서 개발 (꾸준히 업데이트 중)
- JavaScript에 새로운 표준이 나오거나 거의 표준이 확실시 되는 기능은 TypeScript에도 빠르게 추가된다.
- [https://microsoft.github.io/TypeSearch](https://microsoft.github.io/TypeSearch) 에서 어떤 모듈이 type을 지원하는지 알 수 있다.

<br />

### 정적 타입 언어가 동적 타입 언어보다 생산성이 높은 이유 1

```jsx
const jessie = { friends : ['lia', 'jin'] };
const friendsLength = jessie.friendList.length; // 속성명 잘못 입력
```

- `jessie.friends.length` 로 입력해야 하는 것을 `jessie.friendList.length` 로 잘못 입력했다.
- JavaScript (동적 타입 언어)로 작성된 경우
    - 동적 타입 언어에서는 IDE가 컴파일 타임에 `jessie`의 타입을 모르기 때문에 위와 같이 잘못된 속성 이름을 입력해도 에러가 나지 않는다.
    - 잘못된 코드가 사용자에게 전달이 됐을 것이고 사용자가 실행을 하다가 에러가 발생했을 것이다.
- TypeScript (정적 타입 언어)로 작성된 경우
    - 정적 타입 언어에서는 IDE가 `jessie`의 타입을 알고 있기 때문에 잘못된 속성명을 입력하면 `friendList` 부분에 빨간색 밑줄이 그어지며 에러가 발생한다.
    - `jessie.friendList.length`에서 `jessie` 부분에 마우스를 올려보면 IDE가 알고있는 타입을 보여준다.
       ⇒ `const jessie: { friends: string[] }` 

    - 정적 타입 언어를 사용하면 IDE에서 바로 에러를 발생시켜주기 때문에 개발자가 바로바로 수정할 수 있다.

<br />

### 정적 타입 언어가 동적 타입 언어보다 생산성이 높은 이유 2

- 동적 타입 언어
    - 어떤 객체 뒤에 `.`을 입력해도 해당 객체의 타입을 모르기 때문에 별다른 정보가 보이지 않는다.
    - 개발자가 해당 객체의 모든 속성 이름을 알고있어야 한다. 속성 이름이 생각나지 않을 때는 소스 코드에서 찾아봐야 한다. 
- 정적 타입 언어
    - 어떤 객체 뒤에 `.`을 입력하면 IDE가 해당 객체의 타입을 알고 있기 때문에 해당 객체의 속성들의 이름을 나열해준다. ⇒ 개발 시 생산성 향상
    - 자동으로 어떤 속성들이 있는지 보여주기 때문에 편리하다.