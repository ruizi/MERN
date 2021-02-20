const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route       POST  api/posts
// @desc        Create a post
// @access      Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty(),

]], async (req, res) => {
        const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        try {
            const user = await User.findById(req.user.id).select('-password');
            
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });
            
            const post = await newPost.save();
            res.json(post);

        } catch (err) {
            console.error(err.messages);
            res.status(500).send('Server Error');
        }
    
});

// @route       GET  api/posts
// @desc        Get all posts
// @access      Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1});
        res.json(posts)
    } catch (err) {
        console.error(err.messages);
        res.status(500).send('Server Error');
    }
})

// @route       GET  api/posts/id
// @desc        Get post by id
// @access      Private
router.get('/:id', auth, async(req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.messages);
        if (err.kind==='ObjectId') { //incase user input an invalid post id.
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route       DELETE  api/posts/:post_id
// @desc        Delete a post
// @access      Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        // remove the post
        const deletePost = await Post.findById({ _id: req.params.post_id });
        if (!deletePost) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // check user
        if (deletePost.user != req.user.id) {
            return res.status(401).json({ 'error': 'Unauthorized operation' });
        }
        await Post.deleteOne({ _id: req.params.post_id });
        res.json({ msg: 'Post deleted' });
    } catch (err) {
        console.error(err.messages);
        if (err.kind === 'ObjectId') { //incase user input an invalid post id.
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route       PUT  api/posts/like/:post_id
// @desc        Like a post
// @access      Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const likedPost = await Post.findById(req.params.post_id);
        if (!likedPost) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        likedPost.likes.unshift(req.user.id);
        await likedPost.save();
        res.json(likedPost);
    } catch (err) {
        console.error(err.messages);
        if (err.kind === 'ObjectId') { //incase user input an invalid post id.
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route       PUT  api/posts/like/:post_id
// @desc        Unlike a post
// @access      Private
router.put('/unlike/:post_id', auth, async (req, res) => {
    try {
        const unlikedPost = await Post.findById(req.params.post_id);
        if (!unlikedPost) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        // //get the remove index
        // const removeIndex = unlikedPost.liks.map(item => item.id).indexOf(req.user.id);
        // //remove the experience from the experiences array.
        // unlikedPost.likes.splice(removeIndex, 1);
        unlikedPost.likes.remove(req.user.id);
        
        await unlikedPost.save();

        res.json(unlikedPost);
    } catch (err) {
        console.error(err.messages);
        if (err.kind === 'ObjectId') { //incase user input an invalid post id.
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
})

module.exports = router;

