---
title: "[CSS] table tr 태그 간격 주기"
date: 2020-06-30 19:06:72
category: css
---

![](images/css.png)

### border-spacing

`border-spacing`은 단일값 또는 각각 간격을 조정하는 것이 가능하다. 

만약 위 아래에만 20px 간격을 만들 경우 아래와 같이 이 속성을 `table` 태그에 사용한다.

```css
table {
	border-collapse: separate;
	border-spacing: 0 20px;
}
```

### 실행 결과 
<iframe height="265" style="width: 100%;" scrolling="no" title="table tr 간격주기" src="https://codepen.io/je_ss2/embed/VNGeVy?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/je_ss2/pen/VNGeVy'>table tr 간격주기</a> by SoyeonJung
  (<a href='https://codepen.io/je_ss2'>@je_ss2</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>