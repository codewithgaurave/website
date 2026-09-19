import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  sourceType: string;
  sourceUrl: string;
  status: string;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  sourceType: {
    type: String,
    required: false,
    default: 'General Contact',
  },
  sourceUrl: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Contacted', 'Converted', 'Junk']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Avoid OverwriteModelError in Next.js HMR (Hot Module Replacement)
const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
