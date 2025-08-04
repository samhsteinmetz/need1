import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const mockServices = [
  {
    id: 1,
    type: 'service',
    title: 'Professional DJ Services',
    description: 'Experienced DJ for parties, events, and gatherings. Full sound system included.',
    provider: 'Mike S.',
    rating: 4.8,
    price: 150,
    category: 'Entertainment',
    popularity: 95
  },
  {
    id: 2,
    type: 'service',
    title: 'Guitar Lessons',
    description: 'Learn guitar from a music major. All skill levels welcome, acoustic or electric.',
    provider: 'Sarah M.',
    rating: 4.9,
    price: 25,
    category: 'Education',
    popularity: 88
  },
  {
    id: 3,
    type: 'service',
    title: 'Photography Services',
    description: 'Professional photo shoots for events, portraits, or social media content.',
    provider: 'David L.',
    rating: 4.7,
    price: 75,
    category: 'Creative',
    popularity: 82
  },
  {
    id: 4,
    type: 'service',
    title: 'Math Tutoring',
    description: 'Expert tutoring in calculus, statistics, and algebra. Engineering student.',
    provider: 'Emma T.',
    rating: 4.9,
    price: 30,
    category: 'Education',
    popularity: 90
  },
  {
    id: 5,
    type: 'service',
    title: 'Note Taking Services',
    description: 'Detailed, organized notes for your classes. Available for most subjects.',
    provider: 'Alex R.',
    rating: 4.6,
    price: 15,
    category: 'Academic',
    popularity: 75
  },
  {
    id: 6,
    type: 'service',
    title: 'Painting Lessons',
    description: 'Learn watercolor and acrylic painting techniques. Art supplies included.',
    provider: 'Lisa K.',
    rating: 4.8,
    price: 35,
    category: 'Creative',
    popularity: 70
  }
];

const categories = ['All', 'Entertainment', 'Education', 'Creative', 'Academic'];

export function OfferedServices({ onSelectListing, onViewUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredServices = mockServices
    .filter(service => 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(service => 
      selectedCategory === 'All' || service.category === selectedCategory
    )
    .sort((a, b) => b.popularity - a.popularity);

  const handleUserClick = (e, userName) => {
    e.stopPropagation();
    onViewUser(userName);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-center text-primary">Offered Services</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2"
          >
            <Filter size={16} />
            <span>Filter by Category</span>
          </Button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.map(service => (
          <Card
            key={service.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectListing(service)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="flex-1 pr-2">{service.title}</h3>
                <span className="text-primary font-semibold">${service.price}</span>
              </div>
              
              <p className="text-muted-foreground mb-3 line-clamp-2">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleUserClick(e, service.provider)}
                    className="text-sm text-primary hover:underline"
                  >
                    {service.provider}
                  </button>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{service.rating}</span>
                  </div>
                </div>
                <Badge variant="secondary">{service.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No services found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}