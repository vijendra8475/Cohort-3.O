
import express from 'express';
import cors from 'cors';
import { addBookmark, deleteBookmark, getAllBookmarks, favBookmmark, unFavBookmmark } from './routes/bookmarks.js'; // importing callback functions for routes
const app = express();
const PORT = 3001;

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use(express.json());


// Get all bookmarks
app.get('/bookmarks', getAllBookmarks);

// Add a new bookmark
app.post('/bookmarks', addBookmark);


// Delete a bookmark
app.delete('/bookmarks/:id', deleteBookmark);

//  TODO: Can u implement searching bookmark and favorite and unfavorite bookmark route ??

app.post('/bookmarks/fav', favBookmmark)

app.post('/bookmarks/unfav', unFavBookmmark)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
