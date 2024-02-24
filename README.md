# 기본 설명

- VAC 패턴 적용
   - /src/views/components, /src/views/container 내에는 Layout JSX을 제외한 비즈니스 로직을 구현했습니다.
   - /src/views/vac 내에 비즈니스 로직을 제외한 JSX만을 반환하도록 구현했습니다.

- State/Action/Reducer 패턴 적용
   - Redux-Toolkit, Redux-Saga를 사용하여 API 호출은 Middleware인 Redux-Saga를 사용하여 구현했습니다.
   - 비즈니스 로직(Validation 및 데이터 처리)는 최대한 MiddleWare에서 처리 후, Reducer로 Dispatch하도록 구현했습니다.
   - State는 모달을 관리하는 modal reducer와 todo를 관리하는 todo reducer로 분리했습니다.


# Challenging

- Todo item 완수 여부를 내부 저장하여 서버 데이터와 병합하는 로직
   - 서버 데이터와 내부 저장 데이터의 대조 횟수를 최소한으로 실행하기 위해 완수한 Todo Object의 ID 배열을 직렬화하여 내부 저장소에 저장했습니다.
   - Challenging한 부분은 만약 완수한 Todo들의 ID 배열의 길이가 매우 커진다면, TodoList에 Render할 뷰의 ID 검색을 어떻게 빠르게 할 것인가? 였습니다. 구현을 완성하지 못했지만, 한가지 방법으로는 정렬된 배열의 형태로 완수한 Todo의 ID 배열을 내부 저장소에 저장한다면, 탐색을 더 빨리 할 수 있다고 생각했습니다.

- iOS에서 Text에 Ellipsize가 제대로 적용되지 않는 이슈
   - New Line 문자를 포함하는 문자열이 5줄을 넘어갈시, New Line Space로 인해 ellipsize가 생략되는 현상이 있습니다.
   - Dynamic 가로 및 세로 길이를 계산하여 문자열의 어느 Index가 마지막 Line에 잘리는지 계산하여 '...' 문자열을 추가하고자 했습니다. React Native의 Font Size System의 이해가 부족하여 '...'를 삽입할 Index를 찾는 로직을 구현하지 못했습니다. 
