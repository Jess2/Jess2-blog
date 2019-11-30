---
title: "[JavaScript] 함수의 호출 방법 - call과 apply"
date: 2019-11-03 21:11:74
category: javascript
---

![](images/javascript.png)

JavaScript의 call과 apply는 **함수를 호출**하는데 사용되는 메소드이다.  
더 자세히 알아보기 전에 먼저 **함수의 기본적인 호출 방법**에 대해 알아보자.

```js
function sum (arg1, arg2) {
    return arg1 + arg2;
}
 
console.log(sum(2, 3)); // 5
```

`sum`이라는 함수에 매개변수로 두 개의 값을 받고 있으므로 이 함수를 호출할 때 `sum(2, 3)`과 같은 방식으로 호출할 수 있다. 이 때 함수의 리턴값은 `5`다.

그렇다면 이제 call과 apply로 함수를 호출하는 방법에 대해 알아보자.

### call과 apply 비교
#### 공통점
- call과 apply는 메소드를 한번 작성하면 새 객체를 위한 메소드를 재작성할 필요 없이 **다른 객체에 상속할 수 있다.**

#### 차이점
- call과 apply는 지원되는 인수의 타입만 제외하면 매우 유사하지만 apply는 인수(파라미터)의 리스트 대신 인수들의 배열을 사용할 수 있다. 배열 리터럴이나 Array 객체를 사용할 수 있다.
    - `func.apply(this, ['eat', 'bananas'])`
    - `func.apply(this, new Array('eat', 'bananas'))` 

### Example
```js
function sum (arg1, arg2) {
  return arg1 + arg2;
}

console.log(sum(2, 3)); // 5
console.log(sum.call(this, 2, 3)); // 5
console.log(sum.apply(this, [2, 3])); // 5
```

기본적으로 Function 객체는 call과 apply 메소드를 가지고 있는데 `sum`도 Function 객체의 인스턴스이기 때문에 call과 apply를 호출할 수 있다.

call과 apply는 비슷하지만 매개변수를 전달하는 방식이 다르다.

arguments 객체를 그대로 전달해도 되거나 매개변수로 전달할 데이터가 이미 배열 형태로 준비되어 있다면 apply가 나을 것이고 그렇지 않다면 call이 나을 것이다.

#### 전달할 매개변수가 없다면 두 메소드는 완전히 동일하다.

> 그런데 왜 굳이 call과 apply와 같은 방식을 사용하여 함수를 호출해야 하는가?

### call과 apply를 사용하여 함수를 호출하면 그 함수를 해당 객체의 메소드로 만들어 버린다.

### Example

<div class="colorscripter-code" style="color:#f0f0f0;font-family:'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace !important; position:relative !important;overflow:auto"><table class="colorscripter-code-table" style="margin:0;padding:0;border:none;background-color:#272727;border-radius:4px;" cellspacing="0" cellpadding="0"><tr><td style="padding:6px;border-right:2px solid #4f4f4f"><div style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace !important;line-height:130%"><div style="line-height:130%">1</div><div style="line-height:130%">2</div><div style="line-height:130%">3</div><div style="line-height:130%">4</div><div style="line-height:130%">5</div><div style="line-height:130%">6</div><div style="line-height:130%">7</div><div style="line-height:130%">8</div><div style="line-height:130%">9</div><div style="line-height:130%">10</div><div style="line-height:130%">11</div><div style="line-height:130%">12</div><div style="line-height:130%">13</div></div></td><td style="padding:6px 0;text-align:left"><div style="margin:0;padding:0;color:#f0f0f0;font-family:'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace !important;line-height:130%"><div style="padding:0 6px; white-space:pre; line-height:130%">o1&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;{&nbsp;val1:&nbsp;<span style="color:#c10aff">1</span>,&nbsp;val2:&nbsp;<span style="color:#c10aff">2</span>,&nbsp;val3:&nbsp;<span style="color:#c10aff">3</span>&nbsp;};</div><div style="padding:0 6px; white-space:pre; line-height:130%">o2&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;{&nbsp;v1:&nbsp;<span style="color:#c10aff">10</span>,&nbsp;v2:&nbsp;<span style="color:#c10aff">50</span>,&nbsp;v3:&nbsp;<span style="color:#c10aff">100</span>,&nbsp;v4:&nbsp;<span style="color:#c10aff">25</span>&nbsp;};</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">function</span>&nbsp;sum&nbsp;()&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ff3399">var</span>&nbsp;_sum&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;<span style="color:#c10aff">0</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ff3399">for</span>&nbsp;(<span style="color:#4be6fa">name</span>&nbsp;<span style="color:#ff3399">in</span>&nbsp;this)&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_sum&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">+</span><span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;this[<span style="color:#4be6fa">name</span>];</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;}</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#ff3399">return</span>&nbsp;_sum;</div><div style="padding:0 6px; white-space:pre; line-height:130%">}</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#4be6fa">console</span>.log(sum.apply(o1));&nbsp;<span style="color:#999999">//&nbsp;6</span></div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#4be6fa">console</span>.log(sum.apply(o2));&nbsp;<span style="color:#999999">//&nbsp;185</span></div></div></td><td style="vertical-align:bottom;padding:0 2px 4px 0"><a href="http://colorscripter.com/info#e" target="_blank" style="text-decoration:none;color:white"><span style="font-size:9px;word-break:normal;background-color:#4f4f4f;color:white;border-radius:10px;padding:1px">cs</span></a></td></tr></table></div>

- (줄 12) : 함수 `sum`을 객체 `o1`의 메소드로 만들고 `sum`을 호출한다. 이렇게 되면 (줄 4~10)의 함수 `sum`안에 있는 `this`는 객체 `o1`을 뜻하게 되는 것이다.
- (줄 4~10) : 함수 `sum`안에서 반복문을 돌면서 객체 `o1`의 키값들 `val1, val2, val3`이 차례대로 `name`이라는 값으로 들어가게 되며 `this[name]`의 값은 해당 키값의 `value`들을 말한다. 그래서 차례대로 `1, 2, 3`이 더해져 `6`이라는 결과가 나온 것이다.
- (줄 13) : `sum.apply(o2)`도 이와 같은 방식으로 `185`라는 결과가 나온다.

### Example
<div class="colorscripter-code" style="color:#f0f0f0;font-family:'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace !important; position:relative !important;overflow:auto"><table class="colorscripter-code-table" style="margin:0;padding:0;border:none;background-color:#272727;border-radius:4px;" cellspacing="0" cellpadding="0"><tr><td style="padding:6px;border-right:2px solid #4f4f4f"><div style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace !important;line-height:130%"><div style="line-height:130%">1</div><div style="line-height:130%">2</div><div style="line-height:130%">3</div><div style="line-height:130%">4</div><div style="line-height:130%">5</div><div style="line-height:130%">6</div><div style="line-height:130%">7</div><div style="line-height:130%">8</div><div style="line-height:130%">9</div><div style="line-height:130%">10</div><div style="line-height:130%">11</div><div style="line-height:130%">12</div><div style="line-height:130%">13</div><div style="line-height:130%">14</div></div></td><td style="padding:6px 0;text-align:left"><div style="margin:0;padding:0;color:#f0f0f0;font-family:'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace !important;line-height:130%"><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#4be6fa">window</span>.title&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;<span style="color:#ffd500">"WINDOW"</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">var</span>&nbsp;obj&nbsp;<span style="color:#0086b3"></span><span style="color:#ff3399">=</span>&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;title&nbsp;:&nbsp;<span style="color:#ffd500">"OBJECT"</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">};</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%"><span style="color:#ff3399">function</span>&nbsp;func()&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;<span style="color:#4be6fa">console</span>.log(this.title);</div><div style="padding:0 6px; white-space:pre; line-height:130%">};</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%">func();&nbsp;<span style="color:#999999">//&nbsp;WINDOW</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">func.call(this);&nbsp;<span style="color:#999999">//&nbsp;WINDOW</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">func.call(obj);&nbsp;<span style="color:#999999">//&nbsp;OBJECT</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">func.apply(this);&nbsp;<span style="color:#999999">//&nbsp;WINDOW</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">func.apply(obj);&nbsp;<span style="color:#999999">//&nbsp;OBJECT</span></div></div></td><td style="vertical-align:bottom;padding:0 2px 4px 0"><a href="http://colorscripter.com/info#e" target="_blank" style="text-decoration:none;color:white"><span style="font-size:9px;word-break:normal;background-color:#4f4f4f;color:white;border-radius:10px;padding:1px">cs</span></a></td></tr></table></div>

- (줄 10) : 일반적인 방법으로 함수를 호출했다. `func`함수 내의 `this`는 `window` 객체를 가리키기 때문에 `window.title`인 `WINDOW`가 출력된다.
- (줄 11) : call을 사용하여 함수를 호출했고 인자로 `this`를 넘겼다. 여기서 `this`는 `window` 객체를 가리키기 때문에 **함수 `func`는 `window`의 메소드**가 되는 것이다. 따라서 `func`내의 `this`는 `window` 객체를 가리키기 때문에 `window.title`인 `WINDOW`가 출력된다.
- (줄 12) : call을 사용하여 함수를 호출했고 인자로 `obj` 객체를 넘겼다. 따라서 함수 `func`는 `obj`객체의 메소드가 되기 때문에 `func`내의 `this`는 `obj` 객체를 가리키므로 `obj.title`인 `OBJECT`가 출력된다.
- (줄 13) : `func.call(this)`와 같은 원리로 `WINDOW`가 출력된다.
- (줄 14) : `func.call(obj)`와 같은 원리로 `OBJECT`가 출력된다.


### Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/call
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/apply