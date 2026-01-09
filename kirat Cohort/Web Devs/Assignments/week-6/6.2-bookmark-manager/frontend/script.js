const API_URL = 'http://localhost:3001/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    //   start here
});

// Fetch bookmarks from the backend
async function fetchBookmarks() {
    //  start here

    const response = await fetch(`${API_URL}`)
    const data = await response.json();
    console.log(data);

    const bookmarksArea = document.querySelector('#bookmark-list')

    if (!data.data) {
        bookmarksArea.innerHTML = data.message
        bookmarksArea.style.fontSize = '30px'
        bookmarksArea.style.textTransform = 'uppercase'
        bookmarksArea.style.textAlign = 'center'
    }
    else {
        let bookmarks = ``;
        data.data.forEach(ele => {
            bookmarks += `<li id='bm${ele.id} class='bm'>
                <div class="contents">
                <div class="title">${ele.category}</div>
                <div class="url">${ele.url}</div>
                </div>

                <div class="buttons">
                    ${ele.fav ? `<i class="ri-star-fill favorite-btn"></i>` : `<i class="ri-star-line favorite-btn"></i>` }
                <button class="delete-btn">Delete</button>
                </div>
            </li>`
        });
        bookmarksArea.innerHTML = bookmarks


    }
}
fetchBookmarks();

// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark) {
    //  start here
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', async () => {
    //  start here
    const category = document.getElementById('bookmark-category').value
    const url = document.getElementById('bookmark-url').value

    try {
        var req = await fetch(API_URL, { 
            method : 'post', 
            body: JSON.stringify({ url, category }),
            headers: {
            "Content-Type": "application/json"
            },

        })
        const data = await req.json();
        console.log(data);
        

        if(!req.ok)
            throw new Error(data.message)

        alert('Bookmark Added')
        fetchBookmarks();

    } catch (err) {
        alert(err)
    }
});

// Delete a bookmark
function deleteBookmark(id) {
    //  start here;


}

document.querySelector('.delete-btn').addEventListener('click', deleteBookmark)