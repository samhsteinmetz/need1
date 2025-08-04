import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockItems = [
  {
    id: 1,
    type: 'item',
    title: 'MacBook Pro 13" 2021',
    description: 'Excellent condition, barely used. Includes charger and case.',
    seller: 'John D.',
    rating: 4.9,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    postedDate: new Date('2025-01-24')
  },
  {
    id: 2,
    type: 'item',
    title: 'Textbook: Calculus Early Transcendentals',
    description: 'Like new condition. 8th edition by Stewart.',
    seller: 'Maria G.',
    rating: 4.7,
    price: 80,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    postedDate: new Date('2025-01-24')
  },
  {
    id: 3,
    type: 'item',
    title: 'Mini Fridge',
    description: 'Perfect for dorm room. 3.2 cubic feet, works perfectly.',
    seller: 'Chris M.',
    rating: 4.5,
    price: 75,
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400',
    postedDate: new Date('2025-01-23')
  },
  {
    id: 4,
    type: 'item',
    title: 'Gaming Chair',
    description: 'Ergonomic gaming chair with lumbar support. Black and red.',
    seller: 'Taylor P.',
    rating: 4.8,
    price: 150,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    postedDate: new Date('2025-01-23')
  },
  {
    id: 5,
    type: 'item',
    title: 'Electric Guitar',
    description: 'Fender Stratocaster copy. Great for beginners or intermediate players.',
    seller: 'Jordan K.',
    rating: 4.6,
    price: 200,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    postedDate: new Date('2025-01-22')
  },
  {
    id: 6,
    type: 'item',
    title: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with USB charging port.',
    seller: 'Sam L.',
    rating: 4.4,
    price: 25,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    postedDate: new Date('2025-01-22')
  },
  {
    id: 7,
    type: 'item',
    title: 'Coffee Maker',
    description: 'Keurig K-Mini single serve coffee maker. Compact and efficient.',
    seller: 'Maya R.',
    rating: 4.7,
    price: 60,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    postedDate: new Date('2025-01-21')
  },
  {
    id: 8,
    type: 'item',
    title: 'Backpack',
    description: 'Jansport SuperBreak backpack. Multiple colors available.',
    seller: 'Alex T.',
    rating: 4.5,
    price: 35,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    postedDate: new Date('2025-01-21')
  },
  {
    id: 9,
    type: 'item',
    title: 'Bluetooth Speaker',
    description: 'JBL Charge 4 portable speaker. Great sound quality, waterproof.',
    seller: 'Riley C.',
    rating: 4.8,
    price: 90,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
    postedDate: new Date('2025-01-20')
  },
  {
    id: 10,
    type: 'item',
    title: 'Microwave',
    description: 'Compact microwave perfect for dorm room. 0.7 cubic feet.',
    seller: 'Casey B.',
    rating: 4.3,
    price: 45,
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400',
    postedDate: new Date('2025-01-20')
  }
];

export function Marketplace({ onSelectListing, onViewUser }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = mockItems
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.postedDate - a.postedDate);

  const handleUserClick = (e, userName) => {
    e.stopPropagation();
    onViewUser(userName);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-center text-primary">Marketplace</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <Card
            key={item.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectListing(item)}
          >
            <div className="aspect-square relative overflow-hidden rounded-t-lg">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-3">
              <div className="space-y-2">
                <h3 className="font-medium line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-semibold">${item.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{item.rating}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleUserClick(e, item.seller)}
                  className="text-xs text-primary hover:underline"
                >
                  {item.seller}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
}