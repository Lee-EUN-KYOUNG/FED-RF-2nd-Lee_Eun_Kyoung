import React from 'react';
import ReactDom, { createRoot } from 'react-dom/client';
import TopArea from './components/layout/TopArea';
import MainArea from './components/layout/MainArea';
import FooterArea from './components/layout/FooterArea';

// 공통 CSS 불러오기
import "./css/index.scss";


//////////////////////////////////////
function MainComponent(props) {
  return (
    <>
      <TopArea />
      <MainArea />
      <FooterArea />
    </>
  );
}


// 출력하기
const root = createRoot(document.querySelector('#root'));
root.render(<MainComponent />);