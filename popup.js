// Keio Library Search URL
const KEIO_SEARCH_URL_PREFIX = 'https://search.lib.keio.ac.jp/discovery/search?query=any,contains,';
const KEIO_SEARCH_URL_SUFFIX = '&tab=LibraryCatalog&search_scope=MyInstitution&vid=81SOKEI_KEIO:KEIO&offset=0';

// DOM要素を取得
const iframe = document.getElementById('keio-library-frame');
const messageDiv = document.getElementById('message');

// 現在アクティブなタブの情報を取得する関数
async function getCurrentTab() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return tab;
}

// ページからh1要素のテキストを取得する関数
function getPageTitle() {
    // Amazonの商品タイトルはh1#titleまたはh1#productTitleに入っていることが多い
   // const titleElement = document.querySelector('h1#title, h1#productTitle');
   const titleElement = document.querySelector('span#productTitle');

    return titleElement ? titleElement.innerText : null;
}



// メインの処理
getCurrentTab().then(tab => {
    // Amazonのページでのみ実行
    if (tab.url && tab.url.includes("amazon")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: getPageTitle
        }, (injectionResults) => {
            // エラーチェック
            if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
                messageDiv.textContent = 'エラー：タイトルを取得できませんでした。';
                return;
            }

            const title = injectionResults[0].result;
            if (title) {

                 const cleanedTitle = title.replace(/\(.*?\)/g, ''); 

                // タイトルをURLエンコードして、検索URLを作成
                const encodedTitle = encodeURIComponent(cleanedTitle.trim());
                const searchUrl = KEIO_SEARCH_URL_PREFIX + encodedTitle + KEIO_SEARCH_URL_SUFFIX;

                // iframeにURLを設定し、表示を切り替える
                iframe.src = searchUrl;
                iframe.style.display = 'block';
                messageDiv.style.display = 'none';
            } else {
                messageDiv.textContent = 'このページでは商品タイトルが見つかりませんでした。';
            }
        });
    } else {
        // Amazon以外のページだった場合
        messageDiv.textContent = 'Amazonの商品ページで実行してください。';
        iframe.style.display = 'none';
        messageDiv.style.display = 'flex';
    }
});