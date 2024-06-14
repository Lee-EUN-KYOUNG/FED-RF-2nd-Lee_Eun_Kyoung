// 캐릭터 스와이퍼 플러그인 컴포넌트

import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// 제이쿼리 넣기
import $ from "jquery";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// 스와이퍼 비디오 모듈 CSS
import "./css/swiper_cat.scss";

// 데이터 불러오기
import { catListData } from "../data/swiper_cat";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// (여기서는 네비게이션 - 양쪽 이동 버튼)

////////////////////////////// 코딩 구역 //////////////////////////
export function SwiperCat() {
  // 선택데이터 변수 할당
  const selData = catListData;

  //// 코드 리턴 구역
  return (
    <>
      <Swiper
        //slidesPerView={4}
        spaceBetween={20}
        navigation={true}
        /* 사용할 모듈을 여기에 적용시킨다 */
        modules={[Navigation]}
        // 스와이퍼 사이즈별 슬라이드수 변경!
        breakpoints={{
          200: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 7,
          },
        }}
        className="mySwiper2"
      >
        {selData.map(
          (v, i) =>
            /* idx 번호가 고유 번호 7이하만 출력하기 - idx가 문자형이므로 비교를 위해 숫자형으로 바꿔야함 */
            Number(v.idx) <= 7 && (
              <SwiperSlide key={i}>
                <Link
                to="/detail"
                /* 여기서 state로 3가지 값을 넘겨준다 */
                state={{
                  cname: v.cname, // 캐릭터 이름
                  cdesc: v.cdesc, // 캐릭터 설명
                  facts: v.facts, // 캐릭터 상세
                }}
                >
                <section className="sw-inbox2">
                  {/* 캐릭터이미지영역 */}
                  <div className="cat-img2">
                    <img src={v.tmsrc} alt={v.cname} />
                  </div>
                  {/* 캐릭터타이틀영역 */}
                  <div className="cat-tit2">
                    <h3>{v.cname}</h3>
                  </div>
                </section>
                </Link>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </>
  );
} /////////// SwiperCat 컴포넌트 ///////////
