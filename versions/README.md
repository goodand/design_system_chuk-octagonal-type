# versions/ — 구버전 아카이브

Chuk Octagonal Type System의 **역사적 스냅샷**입니다. Main(v0.6.0)은 저장소 루트에 있습니다.

## 담긴 것 (15)

| 버전 | HTML | 컴패니언 jsx |
|------|------|------|
| v0.2 | `Chuk Design System v0.2.html` | `ds-v02.jsx` |
| v0.3 | `Chuk Design System v0.3.html` | `ds-v03.jsx` |
| v0.4 | `...v0.4.html` · `...v0.4-inline.html` · `...v0.4-print.html` | `ds-v04.jsx` |
| v0.5 | `Chuk Design System v0.5.html` | `ds-v05.jsx` |
| v0.5.1 | `...v0.5.1.html` · `...v0.5.1-print.html` | `ds-v051.jsx` |

백업 md: `design.v0.5.1-merged.backup.md`, `design-extension.v0.5.1.backup.md`

## 렌더 주의

이 스냅샷들의 `<script src="...">` 는 **저장소 루트의 공유 자산**을 상대경로로 참조합니다:
`glyph-engine.jsx`, `fonts/GongGlyph.jsx`, `symbols/Symbols.jsx`.
아카이브로서 원본 그대로 보존했으므로, 로컬에서 렌더하려면 해당 파일과 같은 위치에 두거나 루트에서 열어야 합니다.

또한 v0.2~v0.5 는 `IBM Plex Sans KR`(로컬 ttf 또는 CDN), v0.5.1 이후는 `Pretendard`(CDN) 를 씁니다. 루트 `fonts/README.md` 참고.

## 제외된 파일

- **`Chuk Design System v0.4 (standalone).html`** — 모든 자산을 inline base64 로 박은 self-contained 번들로 원본이 256KiB 를 초과합니다. 소스 API(get_file) 의 256KiB 상한에 걸려 온전히 가져올 수 없어 제외했습니다. 동일 내용은 `Chuk Design System v0.4.html` + `ds-v04.jsx`(둘 다 온전) 로 렌더 가능합니다.
