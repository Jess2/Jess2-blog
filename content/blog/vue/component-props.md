---
title: "[vue.js] 하위 컴포넌트 등록과 Props"
date: 2020-03-31 20:03:31
category: vue
---

![](images/vue.png)

웹 사이트에서 하나의 vue 파일만으로 하나의 페이지를 만들 수도 있지만, 다른 컴포넌트들을 하위 컴포넌트로 등록하여 만들 수 있다.

그런데, 하위 컴포넌트를 등록하여 만들 때는 데이터 전달이 필요하다.

예를 들어, A라는 페이지에서 팝업을 띄워야할 때 '팝업 컴포넌트'를 A 컴포넌트의 하위 컴포넌트로 등록할 수 있는데, A 컴포넌트에서 B 요소를 클릭할 때 B 요소의 정보를 팝업으로 띄우고 C 요소를 클릭할 때 C 요소의 정보를 팝업으로 띄워야 한다고 가정한다면, A 컴포넌트에서 팝업 컴포넌트로 B 요소의 정보와 C 요소의 정보를 보내야 한다. 즉, 데이터 전달이 필요하다.

데이터 전달은 Props로 처리할 수 있다.

실제 코드를 보며 자세히 살펴보자.

Parents.vue 컴포넌트에서 Child.vue 컴포넌트를 하위 컴포넌트로 등록해보자.

#### Parents.vue

```html
<template>
  <div>
    <child-component :contents="ParentsContents" @close="closeChild"></child-component> // 1
  </div>
</template>

<script>
import ChildComponent from '@/components/child/Child' // 2

export default {
  name: 'Parents',
  data () {
    return {
      ParentsContents: "This is ParentsContents", // 3
    }
  },
   methods: {
      closeChild (isClose) { // 4
        if (isClose) {
            console.log('닫기')
        } else {
            console.log('닫지 않기')
        }
     }
  },
  components: {
    ChildComponent // 5
  }
}
</script>

<style scoped lang="scss">
  @import "Parents"
</style>
```

- 1 : `<child-component>` 태그 위치에 Child 컴포넌트가 그려진다.
    - `:contents="ParentsContents"` 는 Child 컴포넌트에 `contents` 라는 이름으로 Props 전달을 하는데, 이 `contents`에 `ParentsContents` 값을 보낸다는 뜻이다.
    - `@close="closeChild"` 는 Child 컴포넌트에서 `close`를 `emit` 할 경우, `CloseChild` 라는 메소드를 호출하라는 뜻이다.
- 2 : Child 컴포넌트를 `ChildComponent` 라는 이름으로 import 한다.
- 3 : Child 컴포넌트에 Props로 보낼 `ParentsContents` 변수 정의 부분이다.
- 4 : Child 컴포넌트에서 `close` 를 `emit` 할 경우, 호출되는 `closeChild` 메소드 정의 부분이다.
- 5 : `ChildComponent`를 Parents 컴포넌트의 하위 컴포넌트로 등록하는 부분이다.

#### Child.vue

```html
<template>
  <div>
    {{ contents }} // 1
    <button @click="closeFunc">닫기</button> // 2
  </div>
</template>

<script>
  export default {
    name: 'PopUp',
    props: {
      contents: { // 3
        type: String,
        required: true,
      },
    },
    data () {
      return {
      }
    },
    methods: {
        closeFunc () {
            this.$emit('close', true) // 4
        }
    }
  }
</script>

<style lang="scss">
  @import "PopUp"
</style>
```

- 1 : Parents 컴포넌트에서 Props로 받은 `contents` 를 출력한다.
- 2 : 닫기 버튼을 누르면 `closeFunc` 메소드가 호출된다.
- 3 : Parents 컴포넌트에서 받은 Props를 정의하는 부분이다.
- 4 : 닫기 버튼을 누르면 호출되는 `closeFunc` 메소드 정의 부분이다. `close`를 `emit`한다.