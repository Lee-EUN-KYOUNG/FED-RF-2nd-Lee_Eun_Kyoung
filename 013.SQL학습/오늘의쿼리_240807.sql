-- 오늘의 쿼리 : update
-- update 테이블명 set 컬럼명=값 where 특정항목
UPDATE `friends` SET `ftel`='888',`faddr`='제주도',`fmsg`='여름휴가'WHERE `fnum`= 3
UPDATE `friends` SET `ftel`='02242888',`faddr`='강원도',`fmsg`='가자가자'WHERE `fnum`= 2
UPDATE `friends` SET `ftel`='05742888',`faddr`='충청도',`fmsg`='고기먹자'WHERE `fnum`= 1
UPDATE `friends` SET `fmsg`='고기 먹자'WHERE `fnum`= 1

-- 삭제 쿼리 Delete
-- delete from 테이블명 조건항목
DELETE FROM `friends` WHERE `fnum` = 3