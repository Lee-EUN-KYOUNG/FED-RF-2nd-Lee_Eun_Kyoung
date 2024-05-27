// 보그 JS 갤러리 컴포넌트 - Gallery.jsx

export default function Gallery() {
  /// 스와이퍼 인스턴스 생성 함수
  const setSwiper = () => {
    var swiper = new Swiper(".mySwiper", {
        // 한 화면당 슬라이드 수 (아래 breakpoint로 설정함)
      slidesPerView: 1,
      spaceBetween: 10,
      /* 무한 넘기기 */
      loop: true,
      /* 자동 넘기기 */
      autoplay: {
        // 사이 간격
        delay: 2500,
        // 상호 작용 죽이기 속성 없앰
        disableOnInteraction: false,
      },
      /* 하단 블릿표시 */
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      /* 양쪽 이동 버튼 */
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      /* 가로 사이즈별 스와이퍼 설정 변경 */
      breakpoints: {
        200: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        700: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  };

  //// 화면 랜더링 전 실행 구역
  React.useLayoutEffect(() => {
    // 스와이퍼 생성 함수 호출하기
    setSwiper();
  }); ///////////////// useLayoutEffect //////////////

  ///// 리턴 구역
  return (
    <div id="main-area">
      <main className="main-area ibx">
        {/* <!-- 2-1. 로그인 페이지 상단영역 --> */}
        <header className="ctop">
          {/*   <!-- 2-1-1. 서브타이틀 --> */}
          <h2 className="stit">Gallery</h2>
        </header>
        {/* <!-- 2-2. 갤러리 페이지 컨텐츠 박스 --> */}
        <section className="scont">
          {/*   <!-- Swiper --> */}
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src="images/people/cont2-1a.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/fashion/cont1-2b.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/people/cont2-3a.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/fashion/cont2-1b.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/fashion/cont2-2b.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/fashion/cont2-3b.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/beauty/cont1-2a.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/beauty/cont2-3b.jpg" alt="보그갤러리" />
              </div>
              <div className="swiper-slide">
                <img src="images/beauty/cont1-1b.jpg" alt="보그갤러리" />
              </div>
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-pagination"></div>
          </div>
        </section>
      </main>
    </div>
  );
} //////////////////// Gallery 컴포넌트
