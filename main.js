var book_title = document.getElementsByTagName("h1")[0].textContent.trim(); // Get the text of the first <h1> tag


var base_url_before = "https://search.lib.keio.ac.jp/discovery/search?query=any,contains,"
var base_url_after ="&tab=LibraryCatalog&search_scope=MyInstitution&vid=81SOKEI_KEIO:KEIO&offset=0"

document.getElementsBytagName("h1").src = base_url_before + encodeURIComponent(book_title) + base_url_after;

document.getElementById('calendar').src = loc;
