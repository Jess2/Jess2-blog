---
title: "[CSS] Fade In / Fade Out Animation 추가하기"
date: 2020-05-03 18:05:81
category: css
---

![](images/css.png)

CSS 만으로 서서히 나타나고 서서히 사라지는 애니메이션을 구현할 수 있다.
우선, 애니메이션 속성에 대해 알아보자.

### Animation
Animation 속성은 애니메이션에 이름을 지정하거나 지속시간, 속도 조절 등을 지정할 수 있는 속성을 가지고 있다.

#### 애니메이션 속성 종류
- `animation-name` : @keyframes 이름 (예제에서는 fadeOut 을 사용)
- `animation-duratuion` : 타임 프레임의 길이, 키프레임이 동작하는 시간을 설정할 때 사용
- `animation-timing-function` : 애니메이션 속도 조절 / 그래프 ( linear / ease / ease-in / ease-out / ease-in-out / cubic-bezier )
- `animation-delay` : 애니메이션을 시작하기 전 지연시간 설정
- `animation-iteration-count` : 반복 횟수 지정
- `animation-direction` : 반복 방향 설정 ( 정방향 / 역방향 / 번갈아가며)
- `animation-fill-mode` : 애니메이션 시작 / 끝 상태 제어 ( none / forwords / backwords / both )

### Fade In

`opacity`를 애니메이션으로 n초 동안 0에서 1까지 주면 된다. (from: 0, to: 1)

```css
.fade-in-box {
  display: inline-block;
  background: yellow;
  padding: 10px;
  animation: fadein 3s;
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */
}
@keyframes fadein {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-moz-keyframes fadein { /* Firefox */
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes fadein { /* Safari and Chrome */
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-o-keyframes fadein { /* Opera */
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
```

### Fade In 실행 결과

<iframe height="265" style="width: 100%;" scrolling="no" title="Fade In" src="https://codepen.io/je_ss2/embed/zYvPNLj?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/je_ss2/pen/zYvPNLj'>Fade In</a> by SoyeonJung
  (<a href='https://codepen.io/je_ss2'>@je_ss2</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Fade Out

Fade In과 반대로 `opacity`를 애니메이션으로 n초 동안 1에서 0까지 주면 된다. (from: 1, to: 0)

```css
.fade-out-box {
  display: inline-block;
  background: yellow;
  padding: 10px;
  animation: fadeout 3s;
  -moz-animation: fadeout 3s; /* Firefox */
  -webkit-animation: fadeout 3s; /* Safari and Chrome */
  -o-animation: fadeout 3s; /* Opera */
  animation-fill-mode: forwards;
}
@keyframes fadeout {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@-moz-keyframes fadeout { /* Firefox */
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@-webkit-keyframes fadeout { /* Safari and Chrome */
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@-o-keyframes fadeout { /* Opera */
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
```

### Fade Out 실행 결과

<iframe height="265" style="width: 100%;" scrolling="no" title="Fade Out" src="https://codepen.io/je_ss2/embed/bGVYgPB?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/je_ss2/pen/bGVYgPB'>Fade Out</a> by SoyeonJung
  (<a href='https://codepen.io/je_ss2'>@je_ss2</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>