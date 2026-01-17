const API_URL = 'https://bookmark-backend-toe2.onrender.com/bookmarks';

// Fetch bookmarks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    //   start here
    fetchBookmarks();
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

        bookmarksArea.style.textTransform = 'lowercase'
        bookmarksArea.style.textAlign = 'left'

        let bookmarks = ``;
        data.data.forEach(ele => {
            bookmarks += `<li id='bm${ele.id} class='bm'>
                <div class="contents">
                <div class="title">${ele.category}</div>
                <div class="url">${ele.url}</div>
                </div>

                <div class="buttons">
                    <a href='http://${ele.url}'> <i class="ri-global-line"></i> </a>
                    ${ele.fav ? `<i onclick=makeUnfav(${ele.id}) class="ri-star-fill favorite-btn"></i>` : `<i onClick=makeFav(${ele.id}) class="ri-star-line favorite-btn"></i>` }
                <button onClick=deleteBookmark(${ele.id}) class="delete-btn">Delete</button>
                </div>
            </li>`
        });
        bookmarksArea.innerHTML = bookmarks


    }
}

// Add a new bookmark
document.getElementById('add-bookmark-btn').addEventListener('click', async () => {
    //  start here


    const category = document.getElementById('bookmark-category')
    const url = document.getElementById('bookmark-url')

    try {
        const req = await fetch(API_URL, { 
            method : 'post', 
            body: JSON.stringify({ url : url.value, category : category.value }),
            headers: {
            "Content-Type": "application/json"
            },

        })
        const data = await req.json();
        console.log(data);
        

        if(!req.ok)
            throw new Error(data.message)

        fetchBookmarks();
        url.value = ''
        category.value = ''


    } catch (err) {
        // alert(err)
    }
});

// Delete a bookmark
// const deleteButton = document.querySelector('.delete-btn');
async function deleteBookmark(id) {
    //  start here;
        let process = await fetch(API_URL + `/${id}`, {
            method : "delete",
            headers: {
            "Content-Type": "application/json"
            },
        })
        process = await process.json();
        console.log(process);

        // alert('Bookmark Deleted')
        fetchBookmarks();
    
}


async function makeFav(id) {
    try{
        const data = await fetch(`${API_URL}/fav`,{
            method : 'post',
            body : JSON.stringify({ id }),
            headers: {
            "Content-Type": "application/json"
            },
        })

        const res = data.json() ;

        if(!data.ok)
            throw new Error(res.message)

        // alert('fav completed')
        fetchBookmarks();
    }
    catch(err) {
        // alert(err)
    }
}



async function makeUnfav(id) {
    try{
        const data = await fetch(`${API_URL}/unfav`,{
            method : 'post',
            body : JSON.stringify({ id }),
            headers: {
            "Content-Type": "application/json"
            },
        })

        const res = data.json() ;

        if(!data.ok)
            throw new Error(res.message)

        // alert('fav completed')
        fetchBookmarks();
    }
    catch(err) {
        // alert(err)
    }
}