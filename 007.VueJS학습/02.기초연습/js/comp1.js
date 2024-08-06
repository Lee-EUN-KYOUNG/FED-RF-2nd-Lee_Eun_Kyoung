// 01. 컴포넌트 연습 1 JS

// 뷰 JS 인스턴스 생성용 함수 : x는 대상요소
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
// - Vue.component(케밥케이스 컴포넌트 태그명, {옵션})으로 생성
// -> 같은  이름의 태그 구성 요소에 실제 template값이 들어감

Vue.component("tit-comp", {
  template: `
    <strong>
        <span>
            😊Vue JS😜 컴포넌트 : 
        </span>
        쇼핑모~~~올 갤러리 리스트
    </strong>
    `,
}); ////////// 전역 컴포넌트 1 ////////////

/// 컴포넌트 먼저 만들고나서 뷰 인스턴스 생성하기
makeVue(".tit");
