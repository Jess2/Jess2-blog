---
title: "[JavaScript] 참조할당과 깊은복사, 얕은복사"
date: 2021-12-05 21:12:09
category: javascript
---

![](images/javascript.png)

참조 할당, 얕은 복사, 깊은 복사에 관해...

### 원래 알고 있던 내용

- 참조 할당
    - 주소값을 복사하는 것
- 얕은 복사 (Shallow Copy)
    - 복사되어 새로운 메모리로 할당이 되지만 속성으로 갖고 있던 객체나 배열은 주소값이 복사되는 형태.
    - ex) spread operator, object assign
- 깊은 복사 (Deep Copy)
    - 복사되어 새로운 메모리로 할당이 되고 속성으로 갖고 있던 객체와 배열도 모두 새로운 메모리로 할당된다.
    - ex) JSON.parse(JSON.stringify()), lodash clonedeep

### 참고한 내용

![](images/copy-2.png)

- 출처: [https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d](https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d)

### 새로 알게 된 내용

- 기존에는 spread operator나 object assign을 사용하면 객체 속성, 배열 원소 타입에 상관 없이 무조건 얕은 복사라고 생각했다.
- 하지만 객체나 배열의 내부 데이터 타입이 원시 타입이라면 얕은 복사인지 깊은 복사인지 정하기 애매해진다.
- 얕은 복사의 조건과 깊은 복사의 조건을 모두 만족하기 때문. 
- example 1
    
    ```jsx
    const arr1 = [{num: 1}, {num: 2}];
    const arr2 = arr1;
    ```
    
    ```jsx
    const arr3 = [1, 2, 3];
    const arr4 = arr3;
    ```
    
    - 위의 경우들은 모두 주소값을 복사하는 형태의 참조 할당이다.
    
- example 2
    
    ```jsx
    const arr1 = [{num: 1}, {num: 2}];
    const arr2 = [...arr1];
    ```
    
    - 이 경우는 Spread Operator 를 이용한 shallow copy이다
    
- example 3
    
    ```jsx
    const arr1 = [{num: 1}, {num: 2}];
    const arr2 = JSON.parse(JSON.stringify(arr1));
    ```
    
    - 이 경우는 JSON.parse(JSON.stringify())를 이용한 deep copy 이다
    
- example 4
    
    ```jsx
    const arr1 = [1, 2];
    const arr2 = [...arr1];
    ```
    
    - 이 경우는 Spread Operator를 이용해서 복사했고 내부에 배열이나 객체가 없고 원시 타입만 존재하기 때문에 얕은 복사인지 깊은 복사인지 정하기 애매하다...
    - 기존에는 이와 같은 경우도 무조건 얕은 복사라고 생각했는데 사실 내부에 뎁스가 더 존재하지 않고 내부에 동일한 참조 관계를 가진 경우가 없기 때문에 **깊은 복사가 아니라 얕은 복사라고 정의하기가 애매**하게 된 것..(?)
    
    
### Reference
- [https://wonjayk.tistory.com/256](https://wonjayk.tistory.com/256)
- [https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_%EB%B3%B5%EC%82%AC](https://ko.wikipedia.org/wiki/%EA%B0%9D%EC%B2%B4_%EB%B3%B5%EC%82%AC)
- [https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d](https://www.zerocho.com/category/JavaScript/post/5750d384b73ae5152792188d)