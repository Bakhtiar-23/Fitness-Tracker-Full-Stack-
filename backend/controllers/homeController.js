const Video = require('../models/video');

const homeController = {
  getSubscriptionPage: (req, res) => {
    res.render('contact');
  },
  getDashboardPage: (req, res) => {
    res.render('dashboard')
  },
  index: async (req, res) => {
    try {
      const videos = await Video.find();
      const data = {
        pageTitle: 'Fitness Tracker',
        description: 'Track your workouts and stay fit!',
        body: '<h2>Welcome to the Fitness Tracker!</h2>',
        videos: videos,
      };
      res.render('layout', data);
    } catch (error) {
      res.status(500).send('Error loading videos.');
    }
  },
  logRequestPaths: (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  },
  showAddVideoPage: async (req, res) => {
    try {
      const videos = await Video.find();
      res.render('add-video', { videos });
    } catch (error) {
      res.status(500).send('Error loading videos.');
    }
  },
  addVideo: async (req, res) => {
    try {
      let { title, url } = req.body;
      const embedUrl = url.replace('watch?v=', 'embed/');
      const newVideo = new Video({ title, url: embedUrl });
      await newVideo.save();
      res.redirect('/add-video');
    } catch (error) {
      res.status(500).send('Error adding video.');
    }
  },
  showDeleteVideoPage: async (req, res) => {
    const { id } = req.params;
    try {
      const video = await Video.findById(id);
      if (!video) {
        return res.status(404).send('Video not found.');
      }
      res.render('delete-video', { video });
    } catch (error) {
      res.status(500).send('Error loading video for deletion.');
    }
  },
  deleteVideo: async (req, res) => {
    const { id } = req.params;
    try {
      await Video.findByIdAndDelete(id);
      res.redirect('/add-video');
    } catch (error) {
      res.status(500).send('Error deleting video.');
    }
  },
};

module.exports = homeController;
