
import express from 'express';
import cors from 'cors';
import { addBookmark, deleteBookmark, getAllBookmarks, favBookmmark, unFavBookmmark } from './routes/bookmarks.js'; // importing callback functions for routes
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


// Get all bookmarks
app.get('/bookmarks', getAllBookmarks);

// Add a new bookmark
app.post('/bookmarks', addBookmark);


// Delete a bookmark
app.delete('/bookmarks/:id', deleteBookmark);

//  TODO: Can u implement searching bookmark and favorite and unfavorite bookmark route ??

app.post('/fav', favBookmmark)

app.post('/unfav', unFavBookmmark)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
