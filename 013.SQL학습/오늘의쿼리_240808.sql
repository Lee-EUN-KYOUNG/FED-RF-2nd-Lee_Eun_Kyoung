-- 오늘의 쿼리 : 조건없이 모두 지우기
-- delete from 테이블명
DELETE FROM `friends`

-- 지운후 데이터 입력하면 이전 데이터 갯수 다음 번호가 입력됨
-- delete 해도 데이터 이력이 지워지지 않음
-- 완전 초기화  하려면 truncate table 테이블명
TRUNCATE TABLE `friends`

-- 전체 레코드(데이터) 개수 구하기
SELECT COUNT(*) AS "전채개수" FROM `friends` 

-- fname 항목에 의한 오름차순
SELECT * FROM `friends` ORDER BY `fname` ASC

-- fname 항목에 의한 내림차순
SELECT * FROM `friends` ORDER BY `fname` DESC