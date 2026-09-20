import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  sourceType: string;
  sourceUrl?: string;
  city?: string;
  address?: string;
  message?: string;
  details?: any;
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
    required: false,
    default: '',
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
  city: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
  details: {
    type: Schema.Types.Mixed,
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
