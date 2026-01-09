// let bookmarks = []; // in memory space
let currentId = 0;

const bookmarks = [
  {
    id: currentId++,
    url: "https://developer.mozilla.org",
    category: "Documentation",
    fav: false
  },
  {
    id: currentId++,
    url: "https://stackoverflow.com",
    category: "Programming",
    fav: true
  },
  {
    id: currentId++,
    url: "https://github.com",
    category: "Tools",
    fav: false
  },
  {
    id: currentId++,
    url: "https://news.ycombinator.com",
    category: "News",
    fav: false
  }
];


export async function addBookmark(req,res,next){
// write here
    const { url, category } = req.body;
    console.log(url, category, req.body);
    
    
    if(!url || !category)
        return res.status(400).json({ message : 'All fields required'})

    await bookmarks.push({
        id : currentId++,
        url,
        category,
        fav : false
    })

    res.status(200).json({ message : 'bookmark added successfully'})
}

export async function deleteBookmark(req,res,next){
// write here
    const { id } = req.params;

    if(!id)
        return res.status(401).json({ message : 'id is required'}),

    bookmarks = await bookmarks.filter(b => b.id !== id);

    res.status(200).json({ message : 'bookmark deleted successfully'})
}

export async function getAllBookmarks(req,res,next){
// write here
    if(bookmarks.length === 0)
        return res.status(200).json({ message : 'bookmark is empty'})

    res.status(200).json({ message : 'Request completed', data : bookmarks })
}

export async function favBookmmark(req, res, next) {
    const { id } = req.body;

    if(!id)
        return res.status(401).json({ message : 'Id is required'})

    const bookmark = await bookmarks.find(b => b.id === id)
    bookmark.fav = true

    res.status(200).json({ message : 'bookmark marked as favrouit' })
}


export async function unFavBookmmark(req, res, next) {
    const { id } = req.body;

    if(!id)
        return res.status(401).json({ message : 'Id is required'})

    const bookmark = await bookmarks.find(b => b.id === id)
    bookmark.fav = false

    res.status(200).json({ message : 'bookmark removed from favrouit' })
}