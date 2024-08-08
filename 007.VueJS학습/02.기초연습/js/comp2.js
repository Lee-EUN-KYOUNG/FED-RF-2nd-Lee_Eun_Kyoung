// 02. 컴포넌트 연습 2 JS - 부모 변수를 자식에게 전달
// -> Props Down 프롭스 다운


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
        <img 
        v-bind:src="gsrc" 
        v-on:click="goPapa('확인~')"
        v-on:mouseover="goMama({이름:'김고은',나이:'34살'})"
        alt="의류아이템"
        >
        <aside>
          <h2 v-text="gname"></h2>
          <h3 v-text="gprice"></h3>
        </aside>
      </div>
    `, /// template
  
  //  자식 컴포넌트에서 부모 컴포넌트의 메서드를 바로 호출 할수 없다
  // 자신의 메서드를 만들고 그 곳에서 호출방식에 따라 부모 메서드를 호출함




  // [상위 컴포넌트 전달 변수 설정 속성 : props]
  props: ["list-num","my-seq","end-let"],
  // 이 변수를 사용할때는 캐믈케이스 변수로 사용함
  // "list-num" -> listNum
  // -> 내부용 변수이므로 this 키워드 반드시 사용

  // 배열형은 설정한 변수명을 문자형으로 나열만 하면 되고
  // 만약 각 변수의 데이터형(type)을 특정하고 싶으면
  // 객체형을 사용하여 아래와 같이 표현한다
  // props: {변수명:변수형}



  // 2-2. data 옵션 : 컴포넌트 내부 변수 셋팅
  // 실행 원리 : 컴포넌트가 빌드할 때 data 속성의 함수를 호출한다
  // 그래서 함수의 리턴 되는 객체값이 컴포넌트 내부에 전달된다
  // data : function(){}
  data() {
    // 객체 리턴 필수 (중요)
    return {
      // 이미지 src
      gsrc: `./images/${this.listNum}.jpg`,
      // 상품명
      gname: this.setName()+" "+this.endLet+this.mySeq,
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

    // 부모 컴포넌트 메서드 호출을 위한 함수
    goPapa(txt){
      console.log("호출확인:",txt,this);
      // 여기서는 기존 방식대로 부모 메서드 직접 호출불가

      this.$emit('hull',txt);

      // [ 부모 메서드 호출 방법]
      // this.$emit(생성이벤트명,전달값)
      // 생성이벤트명이란 내가 만든 이벤트명으로 서브 컴포넌트 태그에 이벤트를 등록하여 호출하는 방식이다
      //  아래와 같이 내가 click 이벤트가 아니고
      // <list-app v-on:click="함수명"></list-app>
      // 아래와 같이 내가 만든 이벤트명이다
      // -> 내가 만든 이유는 이 이벤트명으로 특정한 일을 해주기위함
      // -> 여기서 특정한 일은 부모 함수 호출을 뜻함
      // <list-app v-on:hull="함수명"></list-app>
    },
    // 부모 메서드 호출함수 하나 더 추가
    goMama(pm){
      console.log("ohmy호출");
      this.$emit('ohmy',pm)
    },
  }, /// methods
}); /////////// component

/// 뷰 인스턴스 생성하기 : 리스트 컴포넌트
// makeVue(".grid");

// lise-comp라는 자식 컴포넌트의 부모컴포넌트
new Vue({
  // 1. 대상 
  el: ".grid",
  // 2. 메서드
  methods:{
    // 자식 이벤트 전달후 실행 메서드
    goMsg(txt){
      alert("자식이 부모에게 이벤트 전달 성공"+txt);
    },
    // 자식 컴포넌트의 오버 이벤트가 전달되어 호출하는 메서드
    overMsg(pm){
      // pm 전달받을 객체값{이름:"어쩌구",나이:"저쩌구"}
      console.log("오마이갓김치"+pm.이름+' 나이는 '+pm.나이);
    },
  },
});






// 3. 유튜브 동영상 컴포넌트 만들기
Vue.component("ifr-comp",{
    // 3-1. template 옵션
    template:`
    <iframe width="49%" style="aspect-ratio: 16/9;" 
    v-bind:src="ifrSrc" title="#" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
    `, /// template

    //
    props: ["mvcode",],

    // 3-2. data 옵션
    data(){
        return{
            ifrSrc: this.getIfrSrc(this.mvcode),
        }
    }, /// data
    // 3-3. methods 속성
    methods:{
      // 동영상 정보 리턴 함수
      getIfrSrc(code){
        // 동영상 코드
        return `https://www.youtube.com/embed/${code}?autoplay=1&mute=1&loop=1&playlist=${code}`;
      }
    },
    
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
