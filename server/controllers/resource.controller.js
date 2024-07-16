import mongoose from "mongoose";
import Resource from "../models/resource.model.js";
import { errorHandler } from "../utils/error.js";



export const getResources = async (req, res) => {
  try {
    const { category, userId } = req.query;

    let query = {};

    if (category === 'Important') {
      query = { markedAsImportantBy: new mongoose.Types.ObjectId(String(userId)) }; // Only resources marked as important by this user
    } else if (category=== 'promotion' || category=== 'printing') {
      query = { type: category }; // Only documents
    }

    const resources = await Resource.find(query)
      .populate('uploadedBy', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resources', error: error.message });
  }
};

export const getResourceById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const resource = await Resource.findById(id).populate('uploadedBy', 'username profilePicture');
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resource', error: error.message });
  }
};
export const uploadResource = async (req, res, next) => {
    try {
        const { title, url, type, tags, categories, uploadedBy, size } = req.body;
        const resource = new Resource({ title, url, type, tags, categories, uploadedBy,size });
        await resource.save();
        res.status(201).json(resource);
      } catch (error) {
        res.status(400).json({ message: 'Error uploading resource', error });
      }
  };

  export const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Invalid resource ID' });
        }

        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        await resource.deleteOne();
        
        return res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error('Error deleting resource:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}


export const markAsImportant = async (req, res) => {
  try {
    const { documentId, userId } = req.body;

    // Find the resource by ID
    const resource = await Resource.findById(documentId);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Check if user has already marked this resource as important
    const isMarked = resource.markedAsImportantBy.includes(userId);

    // Update the resource based on whether it is already marked or not
    if (isMarked) {
      // Remove the user ID from markedAsImportantBy
      resource.markedAsImportantBy.pull(userId);
    } else {
      // Add the user ID to markedAsImportantBy
      resource.markedAsImportantBy.push(userId);
    }

    // Save the updated resource
    await resource.save();

    res.status(200).json({ message: 'Toggled importance successfully', resource });
  } catch (error) {
    
    console.error('Error toggling resource importance:', error);
    res.status(500).json({ message: 'Failed to toggle resource importance' });
  }
}; 