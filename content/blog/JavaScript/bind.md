---
title: "[JS] bind"
date: 2019-11-06 21:11:41
category: javascript
---

![](images/javascript.png)

bind는 새로운 바인딩한 함수를 만든다. 바인딩한 함수는 원본 함수 객체를 감싸는 함수이다. call, apply와 비교하며 알아보자.

우선 call과 apply는 **함수를 "즉시" 호출하고 컨텍스트를 수정**할 때 사용된다. 즉, 그냥 함수가 실행되도록 도와주는 것이다. (더 자세한 설명은 [여기](https://jess2.xyz/JavaScript/call-apply/)에서 확인할 수 있다.)

그러나 bind는 **해당 함수를 "나중에" 이벤트에서 유용한 특정 컨텍스트로 호출**할 때 사용된다. 즉, 새로운 함수를 만들어준다.

### 비교
- call과 apply
    - 즉시 함수를 호출
- bind
    - 나중에 실행될 때 함수를 호출하기 위한 올바른 컨텍스트를 갖게되는 "새로운 함수"를 반환

### Example
<div class="colorscripter-code" style="color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important; position:relative !important;overflow:auto"><table class="colorscripter-code-table" style="margin:0;padding:0;border:none;background-color:#272727;border-radius:4px;" cellspacing="0" cellpadding="0"><tr><td style="padding:6px;border-right:2px solid #4f4f4f"><div style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%"><div style="line-height:130%">1</div><div style="line-height:130%">2</div><div style="line-height:130%">3</div><div style="line-height:130%">4</div><div style="line-height:130%">5</div><div style="line-height:130%">6</div><div style="line-height:130%">7</div><div style="line-height:130%">8</div><div style="line-height:130%">9</div><div style="line-height:130%">10</div><div style="line-height:130%">11</div><div style="line-height:130%">12</div><div style="line-height:130%">13</div><div style="line-height:130%">14</div><div style="line-height:130%">15</div><div style="line-height:130%">16</div></div></td><td style="padding:6px 0;text-align:left"><div style="margin:0;padding:0;color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%"><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">function</span>&nbsp;Button&nbsp;(<span style="color:#4be6fa">content</span>)&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;this.<span style="color:#4be6fa">content</span>&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;<span style="color:#4be6fa">content</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">};</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%">Button.<span style="color:#4be6fa">prototype</span>.click&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;<span style="color:#ff3399">function</span>&nbsp;()&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;<span style="color:#4be6fa">console</span>.log(this.<span style="color:#4be6fa">content</span>&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">+</span>&nbsp;<span style="color:#ffd500">'&nbsp;clicked'</span>);</div><div style="padding:0 6px; white-space:pre; line-height:130%">};</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;myButton&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;<span style="color:#ff3399">new</span>&nbsp;Button(<span style="color:#ffd500">'OK'</span>);</div><div style="padding:0 6px; white-space:pre; line-height:130%">myButton.click();&nbsp;<span style="color:#999999">//&nbsp;OK&nbsp;clicked</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;looseClick&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;myButton.click;</div><div style="padding:0 6px; white-space:pre; line-height:130%">looseClick();&nbsp;<span style="color:#999999">//&nbsp;undefined&nbsp;clicked</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;boundClick&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;myButton.click.bind(myButton);</div><div style="padding:0 6px; white-space:pre; line-height:130%">boundClick();&nbsp;<span style="color:#999999">//&nbsp;OK&nbsp;clicked</span></div></div></td><td style="vertical-align:bottom;padding:0 2px 4px 0"><a href="http://colorscripter.com/info#e" target="_blank" style="text-decoration:none;color:white"><span style="font-size:9px;word-break:normal;background-color:#4f4f4f;color:white;border-radius:10px;padding:1px">cs</span></a></td></tr></table></div>

#### 위의 코드 중 일반적인 메소드 호출 방식인 줄 9~10을 먼저 살펴보자.
- (줄 9) : `Button`형 객체인 `myButton`를 만들었고, 인자 값은 `OK`이다.
- (줄 10) : `myButton` 객체에는 `click` 메소드가 속성으로 존재하지 않지만 프로토타입 체인에 의해서 `OK clicked`가 정상적으로 출력이 된다.
(프로토타입에 대한 더 자세한 설명은 [여기](https://jess2.xyz/JavaScript/prototype/)에서 확인할 수 있다.)

#### 그렇다면 myButton 객체에서 호출할 수 있는 click 메소드를 다른 변수에 저장했다가 호출할 수도 있을까? **=> NO!**

- (줄 12) : `myButton.click`을 `looseClick` 변수에 담았다.
- (줄 13) : 이전 줄에서 `click` 함수가 종료되었기 때문에 여기서는 `this.content`를 찾을 수 없게 되어 `undefined`가 출력된다.

#### bind 메소드는 이와 같은 문제를 해결해준다.
bind 메소드는 특정 함수에 대해 원본 함수와 동일한 본문을 갖는 바인딩된 함수를 만든다
- (줄 15~16) : 바인딩된 함수를 만들어 `boundClick` 변수에 새롭게 저장했기 때문에 정상적으로 `OK clicked`가 출력이 된다.

### bind의 인자 추가 기능

<div class="colorscripter-code" style="color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important; position:relative !important;overflow:auto"><table class="colorscripter-code-table" style="margin:0;padding:0;border:none;background-color:#272727;border-radius:4px;" cellspacing="0" cellpadding="0"><tr><td style="padding:6px;border-right:2px solid #4f4f4f"><div style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%"><div style="line-height:130%">1</div><div style="line-height:130%">2</div><div style="line-height:130%">3</div><div style="line-height:130%">4</div><div style="line-height:130%">5</div><div style="line-height:130%">6</div><div style="line-height:130%">7</div><div style="line-height:130%">8</div><div style="line-height:130%">9</div><div style="line-height:130%">10</div><div style="line-height:130%">11</div></div></td><td style="padding:6px 0;text-align:left"><div style="margin:0;padding:0;color:#f0f0f0;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%"><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;sum&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;<span style="color:#ff3399">function</span>&nbsp;(a,&nbsp;b)&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;<span style="color:#ff3399">return</span>&nbsp;a&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">+</span>&nbsp;b;</div><div style="padding:0 6px; white-space:pre; line-height:130%">};</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#999999">//&nbsp;일반적인&nbsp;함수&nbsp;호출&nbsp;방법</span></div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;add1&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;sum(<span style="color:#c10aff">10</span>,&nbsp;<span style="color:#c10aff">5</span>);</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#4be6fa">console</span>.log(add1);&nbsp;<span style="color:#999999">//&nbsp;15</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#999999">//&nbsp;bind를&nbsp;이용한&nbsp;호출&nbsp;방법</span></div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;add2&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;sum.bind(<span style="color:#4be6fa">null</span>,&nbsp;<span style="color:#c10aff">5</span>);</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#4be6fa">console</span>.log(add2(<span style="color:#c10aff">10</span>));&nbsp;<span style="color:#999999">//&nbsp;15</span></div></div></td><td style="vertical-align:bottom;padding:0 2px 4px 0"><a href="http://colorscripter.com/info#e" target="_blank" style="text-decoration:none;color:white"><span style="font-size:9px;word-break:normal;background-color:#4f4f4f;color:white;border-radius:10px;padding:1px">cs</span></a></td></tr></table></div>

- (줄 6~7) : 일반적인 함수 호출방법이다. `sum`이라는 함수에 인자를 전달하여 `return`된 값을 `add1`에 저장하고 출력한다.
- (줄 10~11) : 인자로 `null`과 `5`가 주어졌고 이후에 9행에서 `add2`의 인자값으로 `10`이 주어졌다.

이렇게 bind를 사용하면 **나중에 인자값을 추가할 수 있으며** 이 인자는 원래 함수의 매개변수로 전달한다. 나중에 바인딩 된 함수에 전달하는 모든 추가 매개변수는 바인딩된 매개변수 다음에 전달된다.

### 요약
bind를 사용하여 비동기 콜백 및 이벤트에서 컨텍스트를 유지 관리할 수 있고, 특정 함수에 대해 원본 함수와 동일한 본문을 갖는 바인딩된 함수를 만든다.

### Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind