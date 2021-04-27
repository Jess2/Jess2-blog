---
title: "[JavaScript] 싱글 스레드와 이벤트 루프"
date: 2021-04-27 23:04:70
category: javascript
---

![](images/javascript.png)

자바스크립트 타이머(setTimeout, setInterval)는 지정한 시간에 콜백 함수가 실행되는 것을 보장하지 못한다.

> 그 이유는, **싱글 스레드**와 아주 밀접한 관련이 있다.

자바스크립트는 **싱글 스레드** 기반의 언어이다.

스레드가 하나라는 말은 동시에 하나의 작업 만을 처리할 수 있다는 것인데, 왜 많은 작업이 동시에 처리되고 있는 것처럼 보이는 것일까? **이벤트 루프** 때문이다.

**자바스크립트는 이벤트 루프를 이용해서 비동기 방식으로 동시성을 지원한다.**

# Example 1

```jsx
function func1() {
  func2();
  console.log(1);
}
function func2() {
  console.log(2);
}
function func3() {
  console.log(3);
}

setTimeout(func3, 0);
func1();

/*
출력 결과 : 
2
1
3
*/
```

`setTimeout` 함수를 통해 넘긴 `func3` 함수는 어떻게 `func1` 함수가 끝나자마자 실행될 수 있을까? 태스크 큐와 이벤트 루프 때문이다.

태스크 큐는 콜백 함수들이 대기하는 큐(Queue) 형태이고, 이벤트 루프는 호출 스택이 비워질 때마다 태스크 큐에서 콜백 함수를 꺼내와서 실행하는 역할을 해준다.

1. 태스크 큐에 추가
2. 이벤트 루프는 콜 스택이 비워지면 태스크 큐에서 대기 중인 첫 번째 태스크를 실행

`func1`이 실행을 마치고 콜 스택이 비워지면 그 때 이벤트 루프가 태스크 큐에 대기 중인 첫 번째 태스크인 `func3` 를 실행해서 호출 스택에 추가하는 것이다.

**이벤트 루프는 현재 콜 스택이 비워졌는 지와 태스크 큐에 태스크가 있는지를 반복적으로 확인한다.**

- 모든 비동기 API(Timer, AJAX 등) 들은 작업이 완료되면 콜백 함수를 호출 스택이 아닌 태스크 큐에 추가한다.
- 이벤트 루프는 호출 스택이 비워졌을 때 태스크 큐의 첫 번째 태스크를 꺼내와서 실행한다.

setTimeout 함수는 콜백 함수를 바로 실행하지 않고 콜 스택이 아닌 태스크 큐에 추가한다.

즉, setTimeout 으로 0초 뒤에 `func3` 을 실행하는 것이 아니라 0초 뒤에 태스크 큐에 추가하는 것이기 때문에 콜 스택이 비워지고 나서 `func3`을 실행하는 것이다.

### 동작 방식
![](images/eventloop1.gif)

<br />

# Example 2

```jsx
setTimeout(function myCallback() {
  console.log('1.5초 타이머 종료');
}, 1500);

for (let i = 0; i < 3; i++) {
  doSomething(); // 가정: 매번 1초가 걸리는 일
  console.log(i);
}

console.log('3초 걸리는 for문 종료');

/*
출력 결과 :
(약 1초 뒤에) 0
(약 2초 뒤에) 1
(약 3초 뒤에) 2
3초 걸리는 for문 종료
1.5초 타이머 종료
*/
```

- `doSomething`은 매번 1초가 걸리는 일이라고 가정하자.
- `myCallback`의 `console.log('1.5초 타이머 종료')`는 1.5초 뒤가 아닌 약 3초 뒤에 출력이 된다. (싱글 스레드이기 때문)
- `setTimeout(myCallback, 1500);` 은 1.5초 뒤에 실행될 것이라기 보다는 1.5초 이후에 태스크 큐에 추가된다는 것을 의미한다.
- 콜 스택이 비워져야 이벤트 루프가 태스크 큐에 있는 일을 순차적으로 꺼내서 콜 스택에 담아 실행하고 또 이 큐에는 이보다 먼저 추가된 이벤트들도 존재할 수 있기 때문에 `myCallback`은 실제로 실행되기 전에 다른 이벤트들이 끝날 때 까지 기다려야 할 수 있다.

### 동작 방식
![](images/eventloop2.gif)

<br />

# Reference

- [자바스크립트는 어떻게 작동하는가: 이벤트 루프와 비동기 프로그래밍의 부상, async/await을 이용한 코딩 팁 다섯 가지](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e)
- [비동기 프로그래밍이 뭔가요?](https://www.youtube.com/watch?v=m0icCqHY39U)
- [자바스크립트 타이머는 지각쟁이? 그 이유는 싱글 콜 스택?](https://www.youtube.com/watch?v=iNH4UQxZexs&list=PLuBMRNcyzsWxcnDdAmJWyWYXuExyP9aS1&index=4)
