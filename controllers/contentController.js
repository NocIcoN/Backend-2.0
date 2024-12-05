const Content = require('../models/contentModel');

// Get all contents
exports.getAllContents = async (req, res) => {
    try {
        const materials = await Content.find({ contentType: 'study-material' });
        res.status(200).json({ materials });
      } catch (error) {
        res.status(500).json({ message: 'Failed to fetch study materials.' });
      }
};

// Get content by ID
exports.getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create new content
exports.createContent = async (req, res) => {
    const { title, description, contentType, link } = req.body;

  try {
    const content = new Content({ title, description, contentType, link });
    await content.save();
    res.status(201).json({ message: 'Content created successfully', content });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create content', error: error.message });
  }
};

// Update content
exports.updateContent = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        const updatedContent = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedContent);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete content
exports.deleteContent = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        await content.remove();
        res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
