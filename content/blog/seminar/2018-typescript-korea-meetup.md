---
title: "[Seminar] 2018 TypeScript Korea MeetUp"
date: 2018-01-18 18:11:57
category: seminar
---

![](images/typescript-meetup.jpeg)

### 2018 타입스크립트 밋업 (2018/01/18)

2017년 학부생 때 TypeScript 언어를 사용하여 여러 프로젝트를 진행한 경헝이 있는데 현업에 계신 분들은 TypeScript를 어떻게 사용하고 있는 지 궁금해서 참석하게 된 밋업.  
이 곳에서 들은 내용을 정리하고 공유하고자 한다.

## [세션 1] TypeScript로부터 얻은 것과 잃은 것 (손찬욱님 - NAVER)

### 1. TypeScript를 사용한 이유
- egjs 2.x 작업을 해야했다. 컴포넌트들 중에 eg.MovableCoord라는 컴포넌트가 있었는데 이것을 개선하고자 하면서 TypeScript를 검토하게 되었다.
- 줌, 마우스휠, 키보드로도 좌표를 표현하고 싶었고 다형성 및 사용자가 지정하고자 하는 다중의 축들을 제어하기 위해 안정적으로 개발할 수 있는 방법을 찾다가 TypeScript로 결정했다.
- 기존의 x, y 축을 N개의 축을 제어하고 싶었다.
- 기존과 인터페이스 자체가 달라져서 다시 만들어야 하는 김에 MovableCord를 Axex로 바꿔야겠다고 생각.
- 안정적으로 개발하는 방법을 찾다가 TypeScript를 생각했다.
- 다양한 입력 타입은 TypeScript의 inputType 인터페이스를 적용하고 각각의 인터페이스들을 기능별로 구현했다.
- Axes와는 루즈하게 연결할 수 있게 만들었다.
- 그 결과, 입력 타입도 다양하게 쓸 수 있게 되었고, 축도 늘었다.

### 2. TypeScript로 얻은것
#### 1) 코드 의도가 분명해짐
- interface로 설계 의도가 코드에 명확히 보이는데 기존의 JavaScript는 이런 부분이 좀 부족했다.
- TypeScript는 definition 파일까지 자동으로 만들어줬다.

#### 2) 안정성
- 구현 안 된 요소들이 있을 경우에는 에러로 명확하게 표시해주고, 툴을 쓰면 구현체 형태까지 만들어준다.
- 편의성과 안정성을 높여준다.
- 잘못된 값을 넣거나 필수값을 안넣으면 에러를 띄워준다.
- 자바스크립트에서는 누락될 수 있는 부분들을 잡아주는데 이게 단순하면서도 의외로 오류가 많이 생기는 부분이다.

#### 3) 편의성
- Code Assist 제공된다.
- 코드이동이 가능하다.
- 사용자 정보를 좌표로 변환해야 하는 경우가 많은데 (data를 변경하는 작업) 데이터가 요건에 따라서 operator를 통해서 변형하게 된다.
- 데이터 타입이 있어서 코드 어시스트 효과도 볼 수 있고 없는 property에 접근하게 되면 에러를 띄워준다.

#### 4) 데이터 흐름 추적 (안정성)
- 데이터를 전달하거나 변형하는 경우에 TypeScript가 좋다

#### 5) 결과 코드의 폭넓은 지원 범위
- TypeScript는 공식적으로 ES3를 지원해준다. 코드 한 줄만 넣으면 된다.
- 반면, Babel은 공식적으로 ES3를 지원하지 않는다. babel에서 ES3를 지원하기 위해서는 많은 작업을 해야 한다.

### 3. TypeScript로 잃은것
####1) 3'rd party 라이브러리 사용시 
Axes는 Hommerjs를 사용한다.  
```js
import Hammer from 'hammer.js';
```  
위와 같이 import를 시켜줬지만 Hammer를 가져올 수가 없다.  
TypeScript에서는 undefined가 뜨고, Babel에서는 Hammer가 뜬다.  

아래와 같이 입력해주면  
```js
import * as Hammer from 'hammer.js'
```  
TypeScript에서는 Hammer, Babel에서는 Hammer  

왜 이런 상황이 발생하는가?

Hammerjs는 UMD 형태로 지원한다.  
하지만 ES6 Module로 호출시 CommonJS 형태로 인식한다.  
그래서 원래는 undefined로 뜨는게 맞는데 babel에서는 왜 hammer가 잘 떴지??  
babel같은 경우에는 transform-es2015-modules-commonjs를 기본 preset에서 제공하기 때문!!  

다행인 것은 요즘 모듈들은 UMD 뿐만 아니라 ES6 Module 용도 함께 배포한다는 것!!!

#### 2) 3'rd party 라이브러리 @types 사용시
CssProps 내부 속성이 다 필수여서 재정의하거나 다시 만들어야 하는 번거로움이 있다.

#### 3) 과한 사용은 오히려 독!
과한 사용을 하면 가독성이 떨어진다.

### 4. 정리
#### 1) 좋은 점 (얻은 것)
- 코드가 명확해지고 별도 주석을 안달아도 명세화가 가능하다
- 안전성. 구현의 실수를 개발 중 잡아준다. 특히, 데이터 전달과 변환이 많은 곳에서 굉장히 좋다.
- 편의성. 툴 사용의 극대화
- ES3까지 손쉽게 지원

#### 2) 나쁜 점 (잃은 것)
- 외부 모듈 사용이 불편하다.
- UMD나 CommonJS 형태의 기존 모듈 사용시 번거롭다
- 외부 type definition 파일이 완벽하지는 않다.
- 과하게 쓰면 오히려 가독성을 떨어뜨린다. (generic)