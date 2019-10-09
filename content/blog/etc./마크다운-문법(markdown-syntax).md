---
title: 마크다운 문법(Markdown Syntax)
date: 2019-10-09 12:10:87
category: etc.
---

마크다운(markdown)은 일반 텍스트 문서의 양식을 편집하는 문법이다. README 파일이나 온라인 문서, 혹은 일반 텍스트 편집기로 문서 양식을 편집할 때 쓰인다. 마크다운을 이용해 작성된 문서는 쉽게 HTML 등 다른 문서형태로 변환이 가능하다.

### 1. 제목

```text
# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6
```

# This is a H1
## This is a H2
### This is a H3
#### This is a H4
##### This is a H5
###### This is a H6

```text
This is an H1
=============

This is an H2
-------------
```
This is an H1
=============

This is an H2
-------------

---

### 2. 인용문

```text
> This is a blockqute
```

> This is a blockqute.

### 3. 목록
```text
1. This is first list item
2. This is second list item
3. This is third list item
```
1. This is first list item
2. This is second list item
3. This is third list item

```text
* This is first list item
* This is second list item
* This is third list item
```
* This is first list item
* This is second list item
* This is third list item

```text
- This is first list item
- This is second list item
- This is third list item
```
- This is first list item
- This is second list item
- This is third list item

```text
+ This is first list item
+ This is second list item
+ This is third list item
```
+ This is first list item
+ This is second list item
+ This is third list item

```text
* This is first list item
    * This is second list item
        * This is third list item
        * This is fourth list item
```
* This is first list item
    * This is second list item
        * This is third list item
        * This is fourth list item

```text
* This is first list item
    - This is second list item
        + This is third list item
        + This is fourth list item
```

* This is first list item
    - This is second list item
        + This is third list item
        + This is fourth list item

```text
- [ ] 할 일-1
- [ ] 할 일-2
- [x] 할 일-3
```
- [ ] 할 일-1
- [ ] 할 일-2
- [x] 할 일-3

---

### 4. 수평선

\*\*\*  
\* \* \*  
\*\*\*\*\*\*\*\*\*\*  
\-\-\-  
\- \- \-  
\-\-\-\-\-\-\-\-\-\-  

***
* * *
**********
---
- - -
----------

### 5. 코드

\`backtick\`

`backtick`

\`\`\`js  
var let = a;  
console.log(a);   
\`\`\`

```js
var let = a;
console.log(a); 
```

---

### 6. 강조

```text
*이탤릭체*, _이탤릭체_
**볼드체**, __볼드체__
***이텔릭&볼드체***, ___이텔릭&볼드체___
~~취소~~
```
*이탤릭체*, _이탤릭체_  
**볼드체**, __볼드체__  
***이텔릭&볼드체***, ___이텔릭&볼드체___  
~~취소선~~

---

### 7. 링크

`title text`는 선택사항이다.

```text
[Google](https://google.com)  
[Google](https://google.com "title text")
https://google.com
```
[Google](https://google.com)  
[Google](https://google.com "title text")  
https://google.com

---

### 8. 이미지

`alt text`와 `title text`는 선택사항이다.

```text
![](./images/bunny.jpg)
![alt text](./images/bunny.jpg "title text")
```

![](./images/bunny.jpg)
![alt text](./images/bunny.jpg "title text")

---

### 9. 이모지

[여기](https://www.webfx.com/tools/emoji-cheat-sheet/)에서 이모지 리스트를 확인할 수 있다.

\:lollipop\:  
\:gift\:

:lollipop:    
:gift:

---

### 10. 이스케이프

마크다운 문법을 무시하고 싶을 때는 앞에 `\`를 붙이면 된다.

```text
*이탤릭체*
\*이탤릭체\*
```
*이탤릭체*  
\*이탤릭체\*

---

### 11. 줄바꿈

스페이스 두 번 또는 `\` 입력으로 개행할 수 있다.

```js
안녕하세요// 스페이스 입력 안 함
Jess2 입니다.  
안녕하세요  // 스페이스 두 번 입력 함
Jess2 입니다.  
안녕하세요\ // '\' 입력 함
Jess2 입니다.
```
안녕하세요
Jess2 입니다.  
안녕하세요  
Jess2 입니다.  
안녕하세요\
Jess2 입니다.

---

### 12. 테이블

`-`로 `thead`영역과 `tbody`영역을 을 나눌 수 있다.   
`|`로 컬럼을 나눌 수 있다.  

```text
제목1 | 제목2
-----|-----
내용1 | 내용2
내용3 | 내용4
```

제목1 | 제목2
-----|-----
내용1 | 내용2
내용3 | 내용4

### Reference
- https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4

















