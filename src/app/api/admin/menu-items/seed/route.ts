import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import MenuItem from '@/models/MenuItem';
import { initialMenuCatalog } from '@/data/initialMenuCatalog';

export async function POST() {
  try {
    await connectToDatabase();

    // Check existing
    const existing = await MenuItem.find({}).lean();
    const existingNames = new Set(existing.map((item: any) => item.name.toLowerCase()));

    let insertedCount = 0;
    const toInsert = [];

    for (const item of initialMenuCatalog) {
      if (!existingNames.has(item.name.toLowerCase())) {
        toInsert.push({
          name: item.name,
          foodType: item.isNonVeg ? 'non-veg' : 'veg',
          cuisine: item.cuisine,
          category: item.category,
          cookingCharge: item.cookingCharge || 200,
          image: item.image,
          isActive: true
        });
      }
    }

    if (toInsert.length > 0) {
      await MenuItem.insertMany(toInsert);
      insertedCount = toInsert.length;
    }

    const allItems = await MenuItem.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      message: `Sync complete. ${insertedCount} new items added. Total items: ${allItems.length}`,
      data: allItems
    });
  } catch (error: any) {
    console.error('Error seeding menu items:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to seed menu items' },
      { status: 500 }
    );
  }
}
