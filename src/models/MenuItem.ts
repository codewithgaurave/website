import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  foodType: 'veg' | 'non-veg';
  cuisine: string;
  category: string;
  cookingCharge: number;
  image: string;
  isActive: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  foodType: {
    type: String,
    enum: ['veg', 'non-veg'],
    default: 'veg',
    required: true,
  },
  cuisine: {
    type: String,
    required: [true, 'Cuisine is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Meal category is required'],
    trim: true,
  },
  cookingCharge: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

// Avoid OverwriteModelError in Next.js HMR
const MenuItem = mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

export default MenuItem;
