개요
===

SSA7 AJP 현장과제 프로젝트

IDE 설정
===
1. Eclipse > Help > Eclipse Marketplace...
2. 'STS' 키워드로 검색 후 Spring Tool Suite (STS) 설치 (권장 - 버전은 이클립스 버전 참고)

DB 설정
===
1. DB 설치 전 spring.datasource.* 주석 처리 - 테스트용으로 내장 DB 사용
2. MySQL 설치, database 생성 (name : playpoll)
2. MySQL 설치 후 주석 해제 (위 계정 정보로 설치 권장)

**/src/main/resources/application.properties**
```
#spring.datasource.url=jdbc:mysql://localhost/playpoll
#spring.datasource.username=root
#spring.datasource.password=root0
#spring.datasource.driverClassName=com.mysql.jdbc.Driver
```

애플리케이션 실행
===
* Run As > Spring Boot App (권장)
* Run As > Java Application

hello!!