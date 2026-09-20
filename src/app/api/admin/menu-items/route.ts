import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import MenuItem from '@/models/MenuItem';
import { initialMenuCatalog } from '@/data/initialMenuCatalog';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    let items = await MenuItem.find({}).sort({ createdAt: -1 }).lean();

    // Auto-seed if empty
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
        items = await MenuItem.find({}).sort({ createdAt: -1 }).lean();
      }
    }

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error: any) {
    console.error('Error fetching admin menu items:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { name, foodType, cuisine, category, cookingCharge, image, isActive } = body;

    if (!name || !cuisine || !category) {
      return NextResponse.json(
        { success: false, message: 'Item name, cuisine, and category are required' },
        { status: 400 }
      );
    }

    const newItem = await MenuItem.create({
      name: name.trim(),
      foodType: foodType === 'non-veg' ? 'non-veg' : 'veg',
      cuisine: cuisine.trim(),
      category: category.trim(),
      cookingCharge: Number(cookingCharge) || 0,
      image: image?.trim() || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200',
      isActive: isActive !== false
    });

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'Menu item created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create menu item' },
      { status: 500 }
    );
  }
}
