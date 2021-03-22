---
title: "[JavaScript] 비동기 처리"
date: 2021-03-22 23:03:60
category: javascript
---

![](images/javascript.png)

자바스크립트에서 비동기 처리하는 방법

1. [Callback](#1-callback)
2. [Promise](#2-promise)
3. [async / await](#3-async--await)

# 1. Callback

- Example

    ```jsx
    function requestData(callback) {
    	setTimeout(() => {
    		callback({ name: 'abc', age: 23 });
    	}, 1000);
    }

    function onSuccess(data) {
    	console.log(data);
    }

    console.log('call requestData');

    requestData(onSuccess);
    ```

    - requestData 함수는 callback 함수를 인자로 받고 비동기 처리가 끝나면 인자로 받은 함수를 호출한다.
    - 동작 순서
        1. call requestData 출력
        2. 1초 후에  { name: 'abc', age: 23 } 출력
        
<br />

- 콜백 패턴은 콜백이 조금만 중첩돼도 코드가 상당히 복잡해진다 → 콜백 지옥

    ```jsx
    function requestData1(callback) {
    	// ...
    	callback(data);
    }

    function requestData2(callback) {
    	// ...
    	callback(data);
    }

    function onSuccess1(data) {
    	console.log(data);
    	requestData2(onSuccess2);
    }

    function onSuccess2(data) {
    	console.log(data);
    	// ...
    }

    requestData1(onSuccess1);
    ```

    - 동작 순서
        1. requestData1(onSuccess1) : onSuccess1 콜백 함수를 매개변수로 넘겨 비동기 함수 호출
        2. onSuccess1(data) 함수 호출
        3. console.log 실행
        4. requestData2(onSuccess2) 비동기 함수 호출
        5. onSuccess2(data) 함수 호출
        6. console.log 실행
        
<br />

# 2. Promise

### 1. Promise 소개

- Promise는 비동기 상태를 값으로 다룰 수 있는 객체이다.
- Promise를 사용하면 비동기 프로그래밍을 할 때 동기 프로그래밍 방식으로 코드를 작성할 수 있다.
- 코드를 순차적으로 작성할 수 있다.
- Promise 객체는 세 가지의 상태를 가질 수 있다.
    1. 대기 중 (pending) - 비동기 처리가 끝나지 않았을 때
    2. 성공 (fulfilled) - 비동기 처리가 끝나고 성공했을 때
    3. 실패 (rejected) - 비동기 처리가 끝나고 실패했을 때
- Example

    ```jsx
    requestData1()
    	.then(data => {
    		console.log(data);
    		return requestData2();
    	})
    	.then(data => {
    		console.log(data);
    	});
    ```

    - 동작 순서
        1. requestData1() 비동기 함수 호출
        2. 호출이 끝나면 data를 받아서 console.log 실행하고 두 번째 함수(requestData2) 호출
        3. 두 번째 비동기 처리가 끝나면 데이터를 받아서 console.log 실행한다.
        
<br />

### 2. Promise 객체 생성 방법 3가지

1. new 키워드 

    ```jsx
    const p1 = new Promise((resolve, reject) => {});
    ```

    - new 키워드로 Promise 객체를 생성할 때 함수를 입력하는데 이 때 resolve와 reject 두 개의 매개변수가 있다. 이 두 매개변수는 모두 함수이다.
    - {} 안에서 비동기 처리가 끝나면 이 두 함수 중에 하나를 호출하게 된다. 비동기 처리가 끝났다는 것을 알려주는 역할을 한다.
    - new 키워드를 사용하여 Promise 객체를 생성했을 때, 처음에는 대기 중(pending) 상태를 가진다.
    - resolve 함수를 호출하면 성공(fulfilled) 상태가 되고 reject 함수를 호출하면 실패(rejected) 상태가 된다.
    - 성공 상태나 실패 상태가 된 후에는 다른 상태로 변경되지 않는다.
        
<br />

2. reject 함수 호출

    ```jsx
    const p2 = Promise.reject('error message');
    ```

    - reject 함수를 호출하는 방식으로 Promise 객체를 생성할 경우, 실패 상태인 Promise 객체가 만들어진다.
        
<br />

3. resolve 함수 호출

    ```jsx
    const p3 = Promise.resolve(param);
    ```

    - resolve 함수를 호출하는 방식으로 Promise 객체를 생성할 경우, 성공 상태인 Promise 객체가 만들어진다.
        
<br />

### 3. Promise 객체의 then 메서드

- then 메서드 : 비동기 처리가 끝난 다음에 처리할 일을 정의할 수 있다.
- Example1

    ```jsx
    requestData().then(onResolve, onReject);
    ```

    - Promise 객체가 성공 상태가 되면 첫 번째 매개변수인 onResolve 함수가 호출된다.
    - Promise 객체가 실패 상태가 되면 두 번째 매개변수인 onReject 함수가 호출된다.

- Example2

    ```jsx
    Promise.resolve(123).then(data => console.log(data));
    ```

    - 성공 상태인 Promise 객체를 만들면 첫 번째 입력된 함수가 호출된다.

- Example3

    ```jsx
    Promise.reject('error').then(null, data => console.log(data));
    ```

    - 실패 상태인 Promise 객체를 만들면 두 번째 입력된 함수가 호출된다.
        
<br />

### 4. 체인 형식의 then

- then 메서드는 항상 Promise 객체를 반환하기 때문에 체인 형태로 연결할 수 있다.
- Example1

    ```jsx
    function requestData1() {
    	return new Promise((resolve, reject) => {
    		setTimeout(() => {
    			resolve(10);
    		}, 1000);
    	});
    }

    function requestData2() {
    	return new Promise((resolve, reject) => {
    		setTimeout(() => {
    			resolve(20);
    		}, 1000);
    	});
    }

    requestData1()
    	.then(data => {
    		console.log(data); // 10
    		return requestData2();
    	})
    	.then(data => {
    		console.log(data); // 20
    		return data + 1;
    	})
    	.then(data => {
    		console.log(data); // 21
    		throw new Error('some error');
    	})
    	.then(null, error => {
    		console.log('error!!!'); // error!!!
    	})
    	.then(data => {
    		console.log(data); // undefined
    	});
    ```

    - requestData1은 Promise 객체를 반환하는 함수이고 비동기 처리가 끝나면 data를 return 받아서 필요한 처리를 한다. 그리고 두 번째 함수(requestData2)를 호출하고 있다.
    - requestData2 함수도 Promise 객체를 반환한다.
    - 따라서 두 번째 then의 data는 requestData2 함수에서 반환한 값이다. 이 값을 받아서 필요한 처리를 하고 data + 1을 데이터로 하는 Promise 객체를 반환한다.
    - 세 번째 then의 data는 위에서 반환한 data + 1 의 값이 된다. 이 값을 받아서 필요한 처리를 하고 예외를 발생시키고 있다. 예외를 발생시키면 then 메서드는 new Error('some error') 를 데이터로 하는 Promise 객체를 반환하고 실패 상태가 된다.
    - 실패 상태이기 때문에 then 메서드의 두 번째 매개변수로 들어가 있는 함수가 호출된다. 여기서는 아무런 값도 반환하고 있지 않기 때문에 undefined를 반환한다. 즉, undefined를 데이터로 하는 Promise 객체를 반환한다. 이 때의 상태는 성공 상태이다.
    - 마지막 then 메서드에서 data는 undefined가 되고 이 undefined를 받아서 처리를 하게 된다.
        
<br />

- Example2

    ```jsx
    Promise.reject('err')
    	.then(() => console.log('then 1'))
    	.then(() => console.log('then 2'))
    	.then(
    		() => console.log('then 3'),
    		() => console.log('then 4'),
    	)
    	.then(
    		() => console.log('then 5'),
    		() => console.log('then 6'),
    	);
    ```

    - Promise 객체가 실패 상태인데, then 메서드에 두 번째 매개변수 함수를 정의하지 않았을 때는 then 메서드는 그 Promise 객체를 그대로 반환한다.
    - 따라서 첫 번째와 두 번째 then 메서드는 각각 Promise.reject('err') 에서 만들어진 Promise 객체가 그대로 반환된다.
    - 그리고 세 번째 then에서 두 번째 매개변수 함수가 호출되어 then 4 가 출력된다. 출력 후에는 아무런 값도 반환하지 않기 때문에 undefined를 데이터로 하고 성공 상태인 Promise 객체를 반환한다.
    - 그러면 네 번째 then에서 첫 번째 매개변수 함수가 호출되어 then 5 가 출력된다.
        
<br />

### 5. Promise 객체의 catch 메서드

- catch 메서드는 실패 상태인 Promise 객체를 처리하기 위해 사용된다.
- Example1

    ```jsx
    Promise.reject(1).then(null, error => {
    	console.log(error);
    });

    Promise.reject(1).catch(error => {
    	console.log(error);
    });
    ```

    - catch 메서드는 then 메서드를 이용해서 두 번째 함수를 입력하는 것과 같은 역할을 한다.
        
<br />

- Example2

    ```jsx
    Promise.resolve()
    	.then(() => {
    		throw new Error('some error');
    	})
    	.catch(error => {
    		console.log(error);
    	});
    ```

    - 예외 처리를 할 때는 then 메서드를 이용하는 것 보다는 catch 메서드를 사용하는 것이 가독성에 더 좋다.
    - Promise.resolve() 에서 예외가 발생했거나 then 메서드 내 함수에서 예외가 발생한 것들 모두 catch에서 예외처리 할 수 있다.
        
<br />

- Example3

    ```jsx
    Promise.reject(10)
    	.then(data => {
    		console.log('then1:', data);
    		return 20;
    	})
    	.catch(data => {
    		console.log('catch:', data);
    		return 30;
    	})
    	.then(data => {
    		console.log('then2:', data);
    	});
    ```

    - catch 메서드도 then 메서드처럼 Promise 객체를 반환한다.
    - 따라서 catch 이후에도 then을 계속해서 사용할 수 있다.
    - 동작 순서
        1. 처음에 실패 상태인 Promise 객체가 있다.
        2. then 메서드 내의 첫 번째 매개변수인 함수는 생략된다.
        3. catch 메서드에서 10이라는 데이터를 받아서 catch: 10 이 출력되고 30 이라는 데이터를 가진 Promise 객체를 반환한다. 이 때 상태는 성공 상태이다.
        4. 두 번째 then 메서드에서 data 로 30 을 받아서 then2: 30 을 출력한다.
        
<br />

### 6. Promise 객체의 finally 메서드

- finally 메서드로 성공 상태와 실패 상태 모두를 처리할 수 있다.
- 성공 상태와 실패 상태 모두를 처리할 수 있기 때문에 then 메서드에 똑같은 함수 두 개를 매개변수로 넘기는 것과 비슷하다고 보면 된다. 아래의 두 코드는 비슷한 역할을 한다.

    ```jsx
    .finally(() => {
    	console.log('onFinally');
    })
    ```

    ```jsx
    .then(() => {
    	console.log('onFinally');
    }, () => {
    	console.log('onFinally');
    })
    ```

    - 두 코드의 차이점
        - finally 에는 데이터가 넘어오지 않는다.
        - finally는 이전에 있던 Promise 객체를 그대로 반환한다.
        
<br />

- Example1

    ```jsx
    Promise.resolve(10)
    	.then(data => {
    		console.log('onThen', data);
    		return data + 1;
    	})
    	.catch(error => {
    		console.log('onCatch');
    		return 100;
    	})
    	.finally(() => {
    		console.log('onFinally');
    	})
    	.then(data => {
    		console.log('onThen', data);
    		return data + 1;
    	});
    ```

    - 첫 번째 then : data로 10을 받아오고 onThen 10 출력하고 나서 11을 데이터로 가진 성공 상태의 Promise 객체를 반환한다.
    - 성공 상태의 Promise 객체가 반환되기 때문에 catch 부분은 건너 뛴다.
    - onFinally 가 출력된다. 이 때, finally 메서드는 11을 데이터로 가진 성공 상태의 Promise 객체를 그대로 반환한다.
    - 따라서 마지막 then 메서드에서 data로 11을 받아오고 onThen 11이 출력된다.
        
<br />

- Example2

    ```jsx
    Promise.reject(10)
    	.then(data => {
    		console.log('onThen', data);
    		return data + 1;
    	})
    	.catch(error => {
    		console.log('onCatch');
    		return 100;
    	})
    	.finally(() => {
    		console.log('onFinally');
    	})
    	.then(data => {
    		console.log('onThen', data);
    		return data + 1;
    	});
    ```

    - 첫 번째 then은 건너 뛴다.
    - onCatch 가 출력되고 100을 데이터로 가지는 성공 상태의 Promise 객체가 반환된다.
    - onFinally 가 출력되고 100을 데이터로 가지는 성공 상태의 Promise 객체가 반환된다.
    - 마지막 then 메서드에서 data로 100을 받아오고 onThen 100이 출력된다.
        
<br />

- Example3

    ```jsx
    function requestData() {
    	return fetch()
    		.catch(error => {
    			// ...
    		})
    		.finally(() => {
    			sendLogToServer('requestData finished');
    		});
    }

    requestData().then(data => console.log(data));
    ```

    - 서버 통신에서 에러가 발생한다면 catch 메서드 호출시 넘기는 함수 부분이 실행되고 그 이후에 finally가 처리된다.
    - finally는 이전에 생성된 Promise 객체를 그대로 반환하기 때문에 requestData 함수가 반환하는 값은 finally의 처리와는 상관이 없다.
        
<br />

### 7. Promise.all

- 여러 Promise를 병렬로 처리하고 싶을 때 사용된다.
- Example

    ```jsx
    Promise.all([requestData1(), requestData2()]).then(([data1, data2]) => {
    	console.log(data1, data2);
    });
    ```

    - 매개변수로 배열을 입력한다.
    - 배열에 원하는 개수만큼 Promise 객체를 입력한다.
    - Promise.all 함수는 Promise 객체를 반환하기 때문에 then 메서드를 사용할 수 있다.
    - Promise.all 함수가 반환하는 Promise 객체는 입력된 모든 Promise 객체가 성공 상태가 되어야 성공 상태가 된다. 만약 하나라도 실패 상태가 된다면 Promise.all 함수가 반환하는 Promise 객체도 실패 상태가 된다.
        
<br />

### 8. Promise.race

- 여러 Promise 중에서 가장 빨리 성공 상태가 된 Promise를 반환하는 함수이다.
- Example

    ```jsx
    Promise.race([
    	requestData(),
    	new Promise((_, reject) => setTimeout(reject, 3000)),
    ])
    	.then(data => console.log('성공', data))
    	.catch(error => console.log('실패'))
    ```

    - 매개변수로 배열을 입력한다.
    - 여러 Promise 객체 중 하나라도 성공 상태가 되면 그 Promise 와 같은 데이터 상태를 가진 Promise 객체를 반환한다.
    - 위의 코드에서 두 번째 Promise 객체는 3초 후에 실패 상태가 되는 Promise 객체로, requestData 함수 실행이 3초 안에 끝나지 않으면 Promise.race 함수가 반환하는 Promise 객체는 실패 상태가 되는 것이다.
    - 반대로 requestData 비동기 처리가 3초 안에 끝난다면 성공 상태의 Promise 객체를 반환할 것이다.

<br />

# 3. async / await
> TBD