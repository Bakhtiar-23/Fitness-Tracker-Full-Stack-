const Video = require('../models/video'); // Import the Video model

module.exports = {
  // Show the page to add videos and list existing videos
  showAddVideoPage: async (req, res) => {
    try {
      const videos = await Video.find();
      // Correct the path to render the 'add-video' view from the 'videos' folder
      res.render('videos/add-video', { videos });
    } catch (error) {
      res.status(500).send('Error loading videos.');
    }
  },

  // Add a new video
  addVideo: async (req, res) => {
    try {
      const { title, url } = req.body;

      // Transform YouTube URL to embed format
      const embedUrl = url.replace('watch?v=', 'embed/');

      const newVideo = new Video({ title, url: embedUrl });
      await newVideo.save();

      // Redirect back to the add-video page to show the updated list
      res.redirect('/add-video'); // Ensure to use the full path
    } catch (error) {
      res.status(500).send('Error adding video.');
    }
  },

  // Show the confirmation page before deleting a video
  showDeleteVideoPage: async (req, res) => {
    const { id } = req.params;
    try {
      const video = await Video.findById(id);

      if (!video) {
        return res.status(404).send('Video not found.');
      }

      // Render the 'delete-video' view from the 'videos' folder
      res.render('videos/delete-video', { video });
    } catch (error) {
      res.status(500).send('Error loading video for deletion.');
    }
  },

  // Delete a video from the database
  deleteVideo: async (req, res) => {
    const { id } = req.params;
    try {
      await Video.findByIdAndDelete(id);
      res.redirect('/add-video'); // Add the leading slash to make the path correct
    } catch (error) {
      res.status(500).send('Error deleting video.');
    }
  },

  // Show the homepage and list videos
  showHomepage: async (req, res) => {
    try {
      const videos = await Video.find().sort({ createdAt: -1 }); // Fetch all videos, sorted by most recent
      res.render('index', { videos }); // Render the homepage view (index.ejs) with all videos
    } catch (error) {
      res.status(500).send('Error loading videos.');
    }
  },
};
