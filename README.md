# DIO Landing

DIO 공유 다이어리 서비스 소개 사이트. 프레임워크와 빌드 과정이 없는 HTML/CSS/JavaScript 정적 사이트입니다.

## 로컬 미리보기

저장소 폴더에서 `node preview.cjs`를 실행한 뒤 http://127.0.0.1:47831 에서 확인합니다. Node.js 외에 설치할 의존성은 없습니다.

## GitHub Pages

현재 **Deploy from a branch → main → / (root)** 방식으로 공개되어 있습니다.

1. GitHub 저장소 Settings → Pages → Build and deployment → Source를 **Deploy from a branch**로 설정합니다.
2. Branch는 `main`, 폴더는 `/ (root)`로 선택합니다.
3. 검토한 코드를 `main`에 병합하거나 푸시합니다.
4. Actions의 자동 `pages build and deployment` 완료 후 https://seungmin903.github.io/dio-landing/ 에서 확인합니다.

브랜치 게시에서는 루트의 공개 파일이 제공됩니다. HTML/CSS/JS의 경로는 하위 디렉터리 배포에 맞춰 상대 경로로 작성했습니다. 로컬 검증은 `node --check app.js`와 `node validate.cjs`로 수행합니다.

`.github/workflows/pages.yml`은 필요할 때 전환할 수 있는 선택형 커스텀 배포 워크플로입니다. 기본 push에는 실행되지 않습니다. 이를 사용할 때는 Pages Source를 GitHub Actions로 바꾼 뒤 수동 실행합니다. 이 방식은 공개 파일만 `_site`로 복사해 배포합니다.

2026-11-23: 계정 billing lock으로 커스텀 Actions 작업이 시작되지 않았으나, GitHub의 기본 브랜치 게시 작업은 성공했습니다. 현재 방식의 성공이 계정 결제 제한 해제를 뜻하지는 않습니다.

## 구성과 수정

- `index.html`: 서비스 핵심 소개와 상세 페이지로 이어지는 홈
- `about.html`: DIO 서비스 소개와 기록 방식
- `features.html`: 실제 앱 기능 소개와 꾸미기 체험
- `guide.html`: 이용 방법과 FAQ
- `brand.html`: 브랜드 이야기와 색상
- `styles.css`: 반응형 스타일과 브랜드 토큰
- `pages.css`: 독립 페이지 머리글·현재 메뉴·페이지 간 이동 배치
- `app.js`: 모바일 메뉴, 첫 화면 연출, 꾸미기 전후 토글, 화면 확대
- `assets/`: 자체 호스팅 사진·폰트·DIO 캐릭터·실제 앱 화면
- `credits.html`: 이미지 및 글꼴 출처
- `docs/design.md`: 랜딩페이지 디자인 기준

현재 앱 배포 주소와 팀원 정보가 제공되지 않아 다운로드·실행 링크와 팀원 명단은 포함하지 않았습니다. 실제 주소가 확정되면 주요 행동 링크를 교체할 수 있습니다. 꾸미기 체험은 저장이나 서버 통신을 하지 않는 소개용 예시입니다.
