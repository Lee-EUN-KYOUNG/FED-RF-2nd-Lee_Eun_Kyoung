// 01. 컴포넌트 연습 1 JS

// 뷰 JS 인스턴스 생성용 함수 : x는 대상요소
const makeVue = (x) => new Vue({ el: x });

// 1. 제목에 넣을 전역 컴포넌트 만들기
// - Vue.component(케팝케이스 컴포넌트 태그명, {옵션})으로 생성
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

// 갤러리 리스트용 변수 셋팅

// 1. 갤러리 이미지 번호용 변수
let inum = 0;
// 2. 상품명 배열
const goods = ["프레이컷", "아일렛기모", "베어부클", "포멀믹스톤"];

// 2. 갤러리 리스트에 넣을 전역 컴포넌트
Vue.component("list-comp", {
  // 2-1. template 옵션 : 태그 구성
  // v-bind:속성 디렉티브
  // 변수를 사용할 수 있는 속성 재구성해줌
  template: `
      <div>
        <img v-bind:src="gsrc" alt="의류아이템">
        <aside>
          <h2 v-text="gname"></h2>
          <h3 v-text="gprice"></h3>
        </aside>
      </div>
    `, /// template
  // 2-2. data 옵션 : 컴포넌트 내부 변수 셋팅
  // 실행 원리 : 컴포넌트가 빌드할 때 data 속성의 함수를 호출한다
  // 그래서 함수의 리턴 되는 객체값이 컴포넌트 내부에 전달된다
  // data : function(){}
  data() {
    // 객체 리턴 필수 (중요)
    return {
      // 이미지 src
      gsrc: `./images/${this.setNum()}.jpg`,
      // 상품명
      gname: this.setName(),
      // 상품 가격
      gprice: this.setPrice(),
    };
  }, ///// data
  // 2-3. methods 속성 : 컴포넌트 내부 메서드 셋팅
  methods: {
    // 이미지 번호 만들기 함수
    // 외분 저역변수 inum을 1씩 증가하여 리턴함
    setNum() {
      return ++inum;
    },

    // 상품명 만들기 함수
    setName() {
      return goods[Math.floor(Math.random() * 4)];
    },

    // 가격만들기 함수
    setPrice() {
      let rdm = Math.ceil(Math.random() * 17) + 3;
      return this.addCommas(20000 * rdm) + "원";
    },
    // 세자리콤마 함수
    addCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }, /// methods
}); /////////// component

/// 뷰 인스턴스 생성하기 : 리스트 컴포넌트
makeVue(".grid");


// 3. 유튜브 동영상 컴포넌트 만들기
Vue.component("ifr-comp",{
    // 3-1. template 옵션
    template:`
    <iframe width="49%" style="aspect-ratio: 16/9;" 
    v-bind:src="ifrSrc" title="#고윤정 과 함께 차가운 겨울을 더욱 액티브하게!  l 디스커버리 23FW #goyounjung #크롭패딩" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    `, /// template
    // 3-2. data 옵션
    data(){
        return{
            ifrSrc:`https://www.youtube.com/embed/ZH1Y1l1OmTY?autoplay=1&mute=1&loop=1&playlist=ZH1Y1l1OmTY`,
        }
    }, /// data
});

/// 뷰 인스턴스 생성하기 : 유튜브 동영상 컴포넌트
makeVue(".you-box");

// 4. 하단영역 컴포넌트 만들기
Vue.component("footer-comp",{
    template:`
    <div style="text-align:center;line-height:2;
    font-Weight:bold; padding:3vw;margin-top:1vw;">
        <h2>About discovery</h2>
        <h3>Copyright © F&F Corp. All Rights Reserved.</h3>
    </div>
    `,
});


/// 뷰 인스턴스 생성하기 : 하단 영역 컴포넌트
makeVue(".tit2");
