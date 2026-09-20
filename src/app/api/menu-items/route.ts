import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import MenuItem from '@/models/MenuItem';
import { initialMenuCatalog } from '@/data/initialMenuCatalog';

export async function GET() {
  try {
    await connectToDatabase();

    let items = await MenuItem.find({ isActive: true }).sort({ createdAt: 1 }).lean();

    // Auto-seed if database collection is empty
    if (!items || items.length === 0) {
      const count = await MenuItem.countDocuments();
      if (count === 0) {
        const docsToInsert = initialMenuCatalog.map(item => ({
          name: item.name,
          foodType: item.isNonVeg ? 'non-veg' : 'veg',
          cuisine: item.cuisine,
          category: item.category,
          cookingCharge: item.cookingCharge || 200,
          image: item.image,
          isActive: true
        }));
        await MenuItem.insertMany(docsToInsert);
        items = await MenuItem.find({ isActive: true }).sort({ createdAt: 1 }).lean();
      }
    }

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error: any) {
    console.error('Failed to fetch menu items:', error);
    // Fallback gracefully with initial menu catalog so booking UI never breaks
    return NextResponse.json({
      success: true,
      data: initialMenuCatalog.map(item => ({
        _id: item.name,
        name: item.name,
        foodType: item.isNonVeg ? 'non-veg' : 'veg',
        cuisine: item.cuisine,
        category: item.category,
        cookingCharge: item.cookingCharge || 200,
        image: item.image,
        isActive: true
      }))
    });
  }
}
