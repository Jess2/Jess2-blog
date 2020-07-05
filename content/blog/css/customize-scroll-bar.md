---
title: "[CSS/SCSS] 스크롤바 디자인 변경하기"
date: 2020-07-05 13:51:56
category: css
---

![](images/css.png)

브라우저 기본으로 적용되어 있는 스크롤바 디자인을 아래와 같이 변경할 수 있다.

### SCSS
```scss
div {
  width: 100px;
  height: 100px;
  overflow-y: scroll;
}

.basic-scroll {
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    background-color: #ced4da;

    &:hover {
      background-color: #adb5bd;
    }
  }
  &::-webkit-scrollbar-track {
    background: #ffffff;
  }
}
```

### 실행 결과
<iframe height="265" style="width: 100%;" scrolling="no" title="customize scroll bar" src="https://codepen.io/je_ss2/embed/eYJVvMq?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/je_ss2/pen/eYJVvMq'>customize scroll bar</a> by SoyeonJung
  (<a href='https://codepen.io/je_ss2'>@je_ss2</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>