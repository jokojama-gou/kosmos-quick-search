# Amazonから慶應義塾大学図書館を検索 📚

Amazon.co.jpの商品ページに表示されている製品を、慶應義塾大学の蔵書目録から素早く検索するためのシンプルなChrome拡張機能です。

## 特徴 ✨

- **ワンクリック検索**: 🖱️ 拡張機能のアイコンをクリックするだけで、表示中のAmazon商品を即座に検索します。
- **埋め込み表示**: 📖 慶應義塾大学図書館の検索結果を、拡張機能のポップアップウィンドウ内に直接表示します。
- **タイトルの自動抽出**: 🔍 表示中のAmazonページから製品タイトルを自動的に検出・抽出します。
- **タイトルの自動整形**: 🧹 検索精度を向上させるため、タイトルの不要な部分（例: `(岩波書店)`のような括弧内のテキスト）を自動的に削除します。

## 仕組み ⚙️

Amazon.co.jpの商品ページを開いているときに、Chromeのツールバーにある拡張機能のアイコンをクリックするだけです。拡張機能が商品のタイトルを取得し、検索クエリを組み立て、ポップアップ内で慶應義塾大学図書館の検索結果を表示します。

## インストール方法 ⬇️

この拡張機能はChromeウェブストアで公開されていないため、デベロッパーモードを使って手動で読み込む必要があります。

1.  **ファイルのダウンロード**: 💾 すべてのプロジェクトファイル（`manifest.json`, `popup.html`, `popup.js`, `style.css`と`images`フォルダ）を、`keio-library-search`のような一つのフォルダにまとめてください。
2.  **Chrome拡張機能ページを開く**: 🌐 Google Chromeを開き、アドレスバーに `chrome://extensions` と入力して移動します。
3.  **デベロッパーモードを有効化**: ⚙️ ページの右上にある「**デベロッパー モード**」のスイッチをオンにします。
4.  **拡張機能の読み込み**:
    - 📦 左上に表示される「**パッケージ化されていない拡張機能を読み込む**」ボタンをクリックします。
    - 📂 ファイル選択ダイアログで、プロジェクトファイルを保存したフォルダ（例: `keio-library-search`）を選択します。
5.  **完了**: ✅ これでChromeのツールバーに拡張機能のアイコンが表示されます。パズルのピースアイコンをクリックし、拡張機能を「ピン留め」すると常に表示されるようになります。

## 使い方 💡

1.  `www.amazon.co.jp`のいずれかの商品ページに移動します。
2.  ツールバーにある「Keio Library Searcher」のアイコンをクリックします。
3.  ポップアップが開き、慶應義塾大学図書館の検索結果が表示されます。

## 使用技術 🛠️

- HTML5
- CSS3
- JavaScript (ES6+)
- Chrome拡張機能 Manifest V3 API

---

## 開発者向け 🧑‍💻

このセクションは、このプロジェクトを理解・カスタマイズ・貢献したい開発者のために、コードベースの概要を説明するものです。

### ファイル構成 📂

-   `manifest.json`: 拡張機能のプロパティ、権限、動作を定義します。`action.default_popup`として`popup.html`を指定しています。
-   `popup.html`: ポップアップウィンドウの基本的なHTML構造です。図書館の検索結果を表示するための`<iframe>`要素を含み、必要なCSSとJavaScriptファイルを読み込みます。
-   `popup.js`: この拡張機能の中核となるロジックです。ポップアップが開かれるたびに実行されます。
-   `style.css`: ポップアップウィンドウのすべてのスタイルを含みます。

### 中核ロジック (`popup.js`) 🧠

スクリプトの実行フローは以下の通りです。

1.  **アクティブタブの取得**: `chrome.tabs.query()`を使用して、現在アクティブなタブの情報を取得します。
2.  **コンテンツスクリプトの注入**: アクティブなタブが`amazon.co.jp`のページかを確認します。もしそうなら、`chrome.scripting.executeScript()`を使い、ページに`getPageTitle`関数を注入します。
3.  **タイトルの抽出**: 注入された`getPageTitle`関数は、`h1#productTitle`または`h1#title`を探して商品タイトルを見つけ、そのテキストを返します。
4.  **タイトルの整形**: `popup.js`はタイトルを受け取ると、正規表現 (`.replace(/\(.*?\)/g, '')`) を使用して、括弧で囲まれたテキストを削除し、タイトルを整形します。
5.  **URLの構築と設定**: 整形されたタイトルは`encodeURIComponent()`でURLエンコードされ、慶應義塾大学図書館の検索URLテンプレートに挿入されます。この最終的なURLが`popup.html`の`<iframe>`の`src`属性として設定され、結果が表示されます。

### カスタマイズ 🔧

-   **検索対象の図書館を変更する**: この拡張機能を別の図書館に対応させるには、`popup.js`の冒頭にある定数`KEIO_SEARCH_URL_PREFIX`と`KEIO_SEARCH_URL_SUFFIX`を変更するだけです。
-   **タイトルセレクタを更新する**: Amazonがページのレイアウトを変更した場合、`popup.js`内の`getPageTitle`関数にあるCSSセレクタを更新して、正しく商品タイトルを取得できるようにする必要があります。
-   **スタイルの調整**: 🎨 ポップアップの見た目に関するすべての要素は`style.css`で変更できます。

---

# Keio Library Search from Amazon 📚

A simple Chrome extension that allows you to quickly search for a product listed on Amazon.co.jp in the Keio University Library catalog.

## Features ✨

- **One-Click Search**: 🖱️ Instantly search for the current Amazon product with a single click on the extension icon.
- **Embedded Results**: 📖 View the Keio University Library search results directly within the extension's popup window.
- **Automatic Title Extraction**: 🔍 The extension automatically detects and extracts the product title from the active Amazon page.
- **Smart Title Cleaning**: 🧹 It automatically removes extraneous text from the title (e.g., content within parentheses like `(Special Edition)`) to improve search accuracy.

## How It Works ⚙️

When you are on an Amazon.co.jp product page, simply click the extension's icon in your Chrome toolbar. The extension will grab the product's title, formulate a search query, and display the Keio University Library's search results page inside the popup.

## Installation ⬇️

Since this extension is not on the Chrome Web Store, you can load it manually using Developer Mode.

1.  **Download the Files**: 💾 Make sure all the project files (`manifest.json`, `popup.html`, `popup.js`, `style.css`, and the `images` folder) are located together in a single directory (e.g., `keio-library-search`).
2.  **Open Chrome Extensions**: 🌐 Open Google Chrome and navigate to `chrome://extensions` in your address bar.
3.  **Enable Developer Mode**: ⚙️ In the top-right corner of the Extensions page, turn on the **Developer mode** switch.
4.  **Load the Extension**:
    - 📦 Click the **Load unpacked** button that appears on the top-left.
    - 📂 In the file selection dialog, navigate to and select the folder where you saved the project files (the `keio-library-search` directory).
5.  **Done!**: ✅ The extension icon should now appear in your Chrome toolbar. You may need to click the puzzle piece icon and "pin" it to make it visible at all times.

## Usage 💡

1.  Navigate to any product page on `www.amazon.co.jp`.
2.  Click the "Keio Library Searcher" icon in your toolbar.
3.  The search results from the Keio University Library will appear in the popup.

## Built With 🛠️

- HTML5
- CSS3
- JavaScript (ES6+)
- Chrome Extension Manifest V3 APIs

---

## For Developers 🧑‍💻

This section provides a brief overview of the codebase for those who want to understand, customize, or contribute to the project.

### File Structure 📂

-   `manifest.json`: Defines the extension's properties, permissions, and behavior. It declares that `popup.html` should be used as the action popup.
-   `popup.html`: Provides the basic HTML structure for the popup window. It contains the `<iframe>` element where the library results are displayed and links to the necessary CSS and JavaScript files.
-   `popup.js`: This is the core logic of the extension. It runs every time the popup is opened.
-   `style.css`: Contains all the styling for the popup window.

### Core Logic (`popup.js`) 🧠

The script's execution flow is as follows:

1.  **Get Active Tab**: It uses `chrome.tabs.query()` to get information about the currently active tab.
2.  **Inject Content Script**: It checks if the active tab is an `amazon.co.jp` page. If so, it uses `chrome.scripting.executeScript()` to inject a function (`getPageTitle`) into the page.
3.  **Extract Title**: The injected `getPageTitle` function finds the product title by looking for `h1#productTitle` or `h1#title` and returns the text.
4.  **Clean Title**: Back in `popup.js`, the script receives the title and cleans it using a regular expression (`.replace(/\(.*?\)/g, '')`) to remove any text enclosed in parentheses.
5.  **Build and Set URL**: The cleaned title is URL-encoded via `encodeURIComponent()` and then inserted into the Keio Library search URL template. This final URL is then set as the `src` attribute of the `<iframe>` in `popup.html`, causing the results to be displayed.

### Customization 🔧

-   **Change the Target Library**: To adapt this extension for a different library, you only need to change the `KEIO_SEARCH_URL_PREFIX` and `KEIO_SEARCH_URL_SUFFIX` constants at the top of `popup.js`.
-   **Update Title Selector**: If Amazon changes its page layout, the CSS selectors in the `getPageTitle` function within `popup.js` may need to be updated to correctly find the product title.
-   **Adjust Styling**: 🎨 All visual aspects of the popup can be modified in `style.css`.