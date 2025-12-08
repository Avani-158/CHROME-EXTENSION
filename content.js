const bookmarkImgURL=chrome.runtime.getURL("assets/bookmark.png");
const LC_PROBLEM_KEY="LC_PROBLEM_KEY";

window.addEventListener('load',addBookmarkButton);

function addBookmarkButton(){
    const bookmarkButton=document.createElement('img');
    bookmarkButton.id='add-bookmark-button';
    bookmarkButton.src=bookmarkImgURL;
    bookmarkButton.style.height="30px";
    bookmarkButton.style.width="30px";


    const solvedButton = document.querySelector(".text-body.flex.flex-none.items-center"
);


    if (solvedButton) {
        solvedButton.insertAdjacentElement("afterend", bookmarkButton);
    }



    bookmarkButton.addEventListener('click',addNewBookmarkHandler);
}


    async function addNewBookmarkHandler(){

        const currentBookmarks=await getCurrentBookmarks();

        const leetcodeURL=window.location.href;
        const uniqueId=extractUniqueId(leetcodeURL);
        const problemName=document.getElementsByClassName("whitespace-normal")[0]?.innerText;
        if (!problemName) return;


        if(currentBookmarks.some(bookmark=>bookmark.id===uniqueId)) return;


        const bookmarkObj={
            id:uniqueId,
            name:problemName,
            url:leetcodeURL
        }


        const updatedBookmarks=[...currentBookmarks,bookmarkObj];

        chrome.storage.sync.set({[LC_PROBLEM_KEY]:updatedBookmarks},()=>{
            console.log("Updated the bookmarks correctly to",updatedBookmarks);

    });

        
    }


    function extractUniqueId(url) {
        const parts = new URL(url).pathname.split('/').filter(Boolean);
        const index = parts.findIndex(p => p === "problems");
        return index !== -1 ? parts[index + 1] : null;
}



    function getCurrentBookmarks(){
        return new Promise((resolve,reject)=>{
            chrome.storage.sync.get([LC_PROBLEM_KEY],(results)=>{
                resolve(results[LC_PROBLEM_KEY] || []);
        });
        });
        
    }

