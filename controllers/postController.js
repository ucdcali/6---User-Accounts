import Post from '../Models/Post.js';

export const loadPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.render('posts/index', { posts, user: req.user ? req.user : null });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const writePost = (req, res) => { 
  res.render('posts/new', {post: null});
}

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, author: req.user._id });
    await post.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findOneAndDelete({ _id: id });
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};


// Show form to edit a post (only for post author or admin)
 export const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send('Unauthorized');
    }
    res.render('posts/new', { post });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

// Update a post (only for post author or admin)
 export const savePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).send('Unauthorized');
    }
    post.title = title;
    post.content = content;
    await post.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

