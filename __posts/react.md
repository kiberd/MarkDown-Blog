---
title: 'React'
metaTitle: 'React core concept'
metaDesc: 'React core concept used in coding interview'
socialImage: images/react.png
date: '2022-10-10'
tags:
  - react
---

### DOM 과 가상 DOM의 차이

가상 DOM을 이용하면 실제 DOM에 변화를 바로 적용하는 것보다 전체적인 프로세스를 효율적으로 수행할 수 있다.
"효율적이다" = 전체적인 프로세스에 드는 비용이 비교적 적다.
속도 차원의 문제라기 보다는, 연산 횟수 차원의 문제라고 할 수 있다. 우선 각각의 DOM 조작은 레이아웃 변화, 트리 변화 및 렌더링을 일으킨다.
가상 DOM을 이용하지 않으면 변화가 있을 때마다 DOM 조작이 일어나고 이에 대한 연산이 수행되며 렌더링되기 때문에 변화를 적용할 때 드는 비용이 비교적 크다.
가상 DOM을 이용하면 일종의 '오프라인' DOM 트리(이는 렌더링 되지 않는다 → 연산 비용이 적다!)에 변화들을 적용한 뒤 그 변화를 하나로 묶어서 한번에 실제 DOM에 전달하기 때문에 연산 횟수가 줄어들고 변화에 대한 비용이 비교적 작다.


***

### Props Drilling 

리액트에서의 데이터는 단방향으로 흐르기 때문에, 컴포넌트 설계상 props 를 거꾸로 상위 컴포넌트로 올렸다가 다시 내려주는 식의 흐름이 생길 수도 있다. 이런 흐름이 한 컴포넌트 정도면 괜찮겠지만 여러 계층의 컴포넌트 사이에서 일어난다면 데이터 추적이 힘들어지게 된다. 그래서 어플리케이션 전역적으로 사용하는 데이터들을 모아서 관리해주는 상태관리 라이브러리들이 생겨나게 됐다. 기본적으로 리액트에 내장되어 있는 Context API 와  Redux, Mobx, Recoil 등의 상태관리 라이브러리가 존재한다. 