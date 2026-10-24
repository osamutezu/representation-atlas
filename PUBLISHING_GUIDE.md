# GitHub Pages deployment / 公開手順

このフォルダの**中のファイル**をGitHubリポジトリのルートにアップロードしてください。
`index.html` と `graph.html` と `i18n.js` は同じ階層に配置します。

1. GitHubでPublicリポジトリを作成。
2. Code → Add file → Upload files から、このフォルダ内の全ファイルをアップロードし、Commit changes。
3. Settings → Pages → Deploy from a branch → main → /(root) → Save。
4. `https://USERNAME.github.io/REPOSITORY/` にアクセスして確認。

注意:
- GitHub PagesのURLはアクセス制限されません。URLを非告知にするだけです。
- `robots.txt` とHTMLの `noindex` は検索エンジンへの要請であり、非公開を保証しません。
- `i18n.js` はv28で欠落していた依存ファイルを補う互換実装です。言語ボタン・一部UIラベルを切り替えますが、全研究記述の完全翻訳ではありません。
- 元の124事例、349エッジ、3D表示処理、操作機能は変更していません。
- 研究用CSVやprovenanceはこの公開用パッケージに含めていません。公開リポジトリに置くと誰でも取得できるためです。
- JS構文とファイル参照の静的チェックは実施済み。実機ブラウザでの3D表示・全操作の回帰テストは未実施です。

## v29 H36
Upload `h36.js` and `h36-provenance.json` with the HTML files. Node details contain an experimental evidence inspector.
