import  mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: String,
    url: String,
    type: { type: String, enum: ['promotion', 'printing', 'catlogs', 'Whatsapp'] },
    tags: [String],
    categories: [String],
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AppUser' },
    name: String,
    size: Number,  // Add size field to store file size
    mimeType: String,
    markedAsImportantBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AppUser' }],


  }, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);


export  default Resource