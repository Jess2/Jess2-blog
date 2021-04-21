---
title: "[JavaScript] this"
date: 2021-04-21 09:04:34
category: javascript
---

![](images/javascript.png)

- JavaScript 에서 함수의 this 키워드는 다른 언어들과 비교하여 조금 다르게 동작한다.
- 대부분의 경우, this의 값은 **"함수를 호출하는 방법에 의해 결정"**된다.
- 실행하는 동안의 할당에 의해 설정될 수 없고 함수가 호출될 때마다 다를 수 있다.
- ES5 bind로 함수의 this 값을 **"함수가 어떻게 호출되었는지"**와는 상관 없이 설정할 수 있다.

<br />

### Example 1
```jsx
var someone = {
	name: 'jessie',
	whoAmI: function() {
		console.log(this);
	}
};

someone.whoAmI(); // 출력결과: {name: "jessie", whoAmI: function}

var myWhoAmI = someone.whoAmI;
myWhoAmI(); // 출력결과: Window
```

- this는 호출하는 방법에 의해 값이 달라진다.
- `someone.whoAmI` 함수를 새로운 변수에 담아서 마지막 줄과 같이 실행할 경우, 함수 내의 this는 `Window` 객체가 된다.
- 함수 내의 this는 **호출을 누가 했냐**를 나타낸다고 보면 된다.
- `someone.whoAmI();` 에서 호출한 애는 `someone` 이 되기 때문에 this는 `someone`이다.
- `myWhoAmI();` 에서 호출한 애는 global이 되기 때문에 this는 `Window`다. (브라우저 기준)

<br />

### Example 2
```jsx
var someone = {
	name: 'jessie',
	whoAmI: function() {
		console.log(this);
	}
};

var btn = document.getElementById('btn');
btn.addEventListener('click', someone.whoAmI); // 출력결과: <button id="btn>...</button>
```

- `btn`에다가 `someone.whoAmI` 함수를 넘긴 것이다. 여기에서 함수를 호출을 한 것이 아니다.
- `btn`이 click 되었을 때 이 함수가 호출되는데, 이 때 함수를 호출한 애는 `btn`이 된다.

<br />

### bind를 이용해 this 고정

```jsx
var someone = {
	name: 'jessie',
	whoAmI: function() {
		console.log(this);
	}
};

var myWhoAmI = someone.whoAmI;

var bindedWhoAmI = myWhoAmI.bind(someone);
bindedWhoAmI(); // 출력결과: {name: "jessie", whoAmI: function}

var btn = document.getElementById('btn');
btn.addEventListener('click', bindedWhoAmI); // 출력결과: {name: "jessie", whoAmI: function}
```

- `bind(someone)`를 이용하면 이 함수 내에서 this는 `someone`으로 고정된다.

<br />

### Reference
- [자바스크립트 this? 간단히 핵심만 파악하기](https://www.youtube.com/watch?v=PAr92molMHU)