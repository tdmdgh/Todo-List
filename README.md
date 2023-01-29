# Todo-List

## 1. HTML 구조
```bash
├── Header
│   ├── Title(Text)
│   └── Menu icon(Sidebar trigger)
└── Body
    ├── Category_list (Category 클래스 노드 리스트)
    │   ├── Category_header
    │   └── Work_Box_list (카드 노드 리스트)
    │       ├── Work_Box_Row(카드의 가로열)
    │       │   ├── Work_Box_Contents
    │       │   └── Work_Box_Icons(삭제, 수정 아이콘)
    │       └── Work_Box_Buttons(취소, 등록, 수정 버튼)
    ├── Modal
    ├── FAB
    └── Sidebar
        ├── Sidebar_Icon(닫기 버튼)
        └── Log_list (로그 노드 리스트)
            └── Log
``` 

## 2. 설계
**현재 6개의 componenets로 구성되어 있음.**

### ColumnList | 컬럼리스트 클래스
기능: column 요소들을 감싸고 있는 컴퍼넌트. Store를 구독하고 있으며, 상태변화가 생기면 render()를 실행시킴.


### Column | 칼럼 클래스
변수: title, cardContainers, element(본인의 노드)  
기능: 카드 추가 기능, 칼럼 삭제 기능, 칼럼 제목 수정 기능,  


### Card | 카드 클래스
변수: title, content, input_value(=title), textarea_value(=content), element(본인의 노드)  
기능: 카드 등록 기능, content 수정 기능, 수정 취소 기능, 삭제 버튼 hover, input 체크 기능(빈문자열 확인), 드래그 앤 드랍 기능  


### LogList | 이벤트 알림 리스트 클래스
기능: Log 요소들을 감싸고 있는 컴퍼넌트. Store를 구독하고 있으며, 상태변화가 생기면 render()를 실행시킴.


### Log | 이벤트 알림 클래스
action에 따라 텍스트 내용이 달라짐.
1. card 생성
2. column 생성
3. card 수정
4. column 수정
5. card 삭제
6. column 삭제
7. card 이동 알림


### Modal | modal창 클래스  
생성 시기:   
1. card 삭제기능을 누르는 경우
2. FAB를 눌러 column을 추가하는 경우

type에 따라 display와 기능이 달라짐.
- 생성시기-1을 통해 생성될 경우, 선택된 workbox 삭제 기능
- 생성시기-2를 통해 생성될 경우, input태그를 이용해 사용자에게 입력값을 받아서 category 생성  


## 3. redux
- store.js: reducer를 기반으로 생성된 store
- actions.js: store에 dispatch 할 때 사용되는 action들의 모음. 요구되는 parameter들을 확인할 수 있음.
- reducer.js: action에 따라 state의 변화를 주는 모듈.

## 4. state
- client에서 사용하는 전체 데이터 관리 객체
- 속성: columns, logs, addingCard, isAddColModalShown, deletingCardData, isDeleteCardModalShown
- 프로그램이 시작되면 getJSONData 함수를 실행해서 initialState에 초기값을 입력함.


## 4. 실행 방법
- json-server를 사용해서 실행: 현재 폴더에서 json-server --watch server/db.json --port 3000 를 터미널에 입력해서 json-server 활성화
- live-server를 사용해서 index.html 실행


## 5. TODOs - 추가 개선사항
- [ ] render() 함수들의 범위 다시 생각해보기: store의 변화에 따라 columnList가 전체 render되는 것에 대한 비효율성 개선
- [ ] util.js 모듈 만들어서 재사용되는 함수들을 리펙토링하기
- [ ] redcer.js 리펙토링: 모든 action에 manually log 추가를 발생시키는데, 새로운 메소드를 만들어서 클린코드 작성







