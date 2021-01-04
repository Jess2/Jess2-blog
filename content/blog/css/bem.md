---
title: "[CSS] BEM"
date: 2021-01-04 21:49
category: css
---

![](images/css.png)

## BEM : Block__Element--Modifier

- **Block** : 독립적인 형태이자 기능의 단위
- **Element** : 의존적인 형태, 자신이 속한 블럭 내에서만 의미를 가짐
- **Modifier** : 블럭이나 엘리먼트의 속성, 생긴 게 조금 다르게 생기거나 다르게 동작하는 블럭이나 엘리먼트를 만들 때 사용

<br>

### 자신이 속한 블럭 내에서만 의미를 가지는 Element
```html
<form class="search-form">
  <div class="search-form__content">
    <input class="search-form__input"/>
    <button class="search-form__button">Search</button>
  </div>
</form>
```
- `search-form` : Block (독립적인 형태이자 기능의 단위, 단순하게 단어를 구분할 때는 `-`를 사용한다.)
- `search-form__content` : Block인 `search-form`의 `content` Element
- `search-form__input` : Block인 `search-form`의 `input` Element
- `search-form__button` : Block인 `search-form`의 `button` Element

<br>

#### Boolean 형태의 속성을 지정하는 Modifier
```html
<ul class="tab">
  <li class="tab__item tab__item--focused">탭 01</li>
  <li class="tab__item">탭 02</li>
  <li class="tab__item">탭 03</li>
</ul>
```
- `tab` : Block
- `tab__item` : Block인 `tab`의 `item` Element
- `tab__item--focused` : `focused` 속성을 가진 `tab__item` (Boolean 형태의 Modifier)

<br>

### Key-Value 형태의 속성을 지정하는 Modifier
```html
<div class="column">
  <strong class="title">일반 로그인</strong>
  <form class="form-login form-login--theme-normal">
    <input type="text" class="form-login__id"/>
    <input type="password" class="form-login__password"/>
  </form>
</div>
```
- `column` : Block
- `title` : Block
- `form-login` : Block
- `form-login--theme-normal` : `theme`이 `normal`인 속성을 가진 `form-login` (Key-Value 형태의 Modifier)

<br>

### 다른 곳에서도 독립적으로 쓰일 수 있는 것은 Block 으로 지정
```html
<div class="header__logo">
  <div class="logo">
    <a href="#" class="logo__link">
      <h1 class="blind">MDN</h1>
    </a>
  </div>
</div>

<div class="footer_logo">
  <div class="logo">
    <a href="#" class="logo__link">
      <h1 class="blind">MDN</h1>
    </a>
  </div>
</div>
```
- `logo` : Block 으로, 독립적인 형태이자 기능의 단위이다. 여러 곳에서 독립적으로 쓰일 수 있기 때문에 Block으로 지정한다.



