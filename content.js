const bookmarkImgURL=chrome.runtime.getURL("assets/bookmark.png");

window.addEventListener('load',addBookmarkButton);

function addBookmarkButton(){
    const bookmarkButton=document.createElement('img');
    bookmarkButton.id='add-bookmark-button';
    bookmarkButton.src=bookmarkImgURL;
    bookmarkButton.style.height="30px";
    bookmarkButton.style.width="30px";


    const solvedButton=document.getElementsByClassName("text-body.flex.flex-none.items-center")[0]

    solvedButton.insertAdjacentElement("afterend", bookmarkButton);




}