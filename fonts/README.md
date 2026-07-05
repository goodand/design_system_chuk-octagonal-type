# Fonts

Chuk이 참조하는 서체는 모두 **공개 OFL(Open Font License) 폰트**입니다.
멀티-MB 바이너리를 저장소에 커밋하지 않고, 아래 출처에서 내려받아 이 폴더에 두거나 CDN으로 로드하세요.

| 폰트 | 역할 | 출처 |
|------|------|------|
| **Pretendard** | system of record (Harmony Test 기준 서체) | https://github.com/orioncactus/pretendard |
| **IBM Plex Sans KR** | `Weight Lab.html` @font-face → `fonts/IBMPlexSansKR-Regular.ttf` | https://github.com/IBM/plex |
| **Noto Sans KR** (Thin–Black, 9 weights) | `colors_and_type.css` @font-face → `fonts/NotoSansKR-*.ttf` | https://fonts.google.com/noto/specimen/Noto+Sans+KR |

## 로컬 배치

`colors_and_type.css` / `Weight Lab.html` 의 `@font-face` 는 `fonts/` 상대경로를 기대합니다.
로컬 렌더가 필요하면 위 파일들을 이 폴더에 아래 이름으로 두세요.

```
fonts/IBMPlexSansKR-Regular.ttf
fonts/NotoSansKR-Thin.ttf  NotoSansKR-ExtraLight.ttf  NotoSansKR-Light.ttf
fonts/NotoSansKR-Regular.ttf  NotoSansKR-Medium.ttf  NotoSansKR-SemiBold.ttf
fonts/NotoSansKR-Bold.ttf  NotoSansKR-ExtraBold.ttf  NotoSansKR-Black.ttf
```

## CDN 대안

Pretendard는 CDN으로 바로 쓸 수 있습니다:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
```

> `GongGlyph.jsx` 는 폰트 파일이 아니라 팔각 자소를 그리는 코드이므로 저장소에 포함됩니다.
