# DIO Landing

DIO 공유 다이어리 서비스 소개 사이트. 프레임워크와 빌드 과정이 없는 HTML/CSS/JavaScript 정적 사이트입니다.

## 로컬 미리보기

저장소 폴더에서 `node preview.cjs`를 실행한 뒤 http://127.0.0.1:47831 에서 확인합니다. Node.js 외에 설치할 의존성은 없습니다.

## GitHub Pages

1. GitHub 저장소 Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 설정합니다.
2. 검토한 코드를 `main`에 병합하거나 푸시합니다.
3. Actions의 `Deploy DIO landing to GitHub Pages` 완료 후 https://seungmin903.github.io/dio-landing/ 에서 확인합니다.

워크플로는 공개 파일만 `_site`에 복사합니다. 로컬 도구와 문서는 배포하지 않습니다. HTML/CSS/JS의 경로는 하위 디렉터리 배포에 맞춰 상대 경로로 작성했습니다.

## 구성과 수정

- `index.html`: 홈, 서비스 배경, 꾸미기 체험, 실제 앱 기능, 사용 방법, 브랜드, FAQ
- `styles.css`: 반응형 스타일과 브랜드 토큰
- `app.js`: 모바일 메뉴, 첫 화면 연출, 꾸미기 전후 토글, 화면 확대
- `assets/`: 자체 호스팅 사진·폰트·DIO 캐릭터·실제 앱 화면
- `credits.html`: 이미지 및 글꼴 출처
- `docs/design.md`: 랜딩페이지 디자인 기준

현재 앱 배포 주소와 팀원 정보가 제공되지 않아 다운로드·실행 링크와 팀원 명단은 포함하지 않았습니다. 실제 주소가 확정되면 주요 행동 링크를 교체할 수 있습니다. 꾸미기 체험은 저장이나 서버 통신을 하지 않는 소개용 예시입니다.
