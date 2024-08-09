<!-- 템플릿 구역 -->
<template>
  <!-- 원래 루트인 #app은 대체된다 -->
 <div id="app">
   <TopArea />
   <MainArea />
   <FooterArea />
 </div>
</template>

<!-- 스크립트 구역 -->
<script>
// 여기서 import해준다
import TopArea from './components/TopArea.vue';
import MainArea from './components/MainArea.vue';
import FooterArea from './components/FooterArea';

// 내보낼 컴포넌트 이름
export default {
    name: 'App',
    components: { 
      TopArea, 
      MainArea,
      FooterArea
    }
}
</script>

<!-- 스타일 CSS 구역 : scoped 키워드 없으면 전역 -->
<style>
/* 최상위 요소 */
#app {
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 1.6;
  font-size: 0.vw;
  color: #2c3e50;
}
</style>
