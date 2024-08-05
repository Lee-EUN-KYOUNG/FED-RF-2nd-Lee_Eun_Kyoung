-- https://www.w3schools.com/mysql/trymysql.asp?filename=trysql_select_columns

-- 주석
-- DB는 크게 2가지 DDL, DML이 있다
-- DML은 크루드! CRUD -< Create(Insert) / Read(Select) / Update / Delete
-- select 선택 항목 from 테이블명 where(조건절)
-- SELECT * FROM Customers;
-- SELECT city FROM Customers;
-- like 검색하기
-- select * from Customers where city like "a%"
-- select * from Customers where city like "%co%"
select * from Customers where city like "%n"