import React, { useState } from 'react';
import { Search, Filter, Star, Calendar, DollarSign } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const mockRequests = [
  {
    id: 1,
    type: 'request',
    title: 'Need DJ for Birthday Party',
    description: 'Looking for a DJ for my 21st birthday party this weekend. Need someone with good music taste and equipment.',
    requester: 'Jessica H.',
    rating: 4.6,
    price: 200,
    dueDate: new Date('2025-01-26'),
    category: 'Entertainment',
    isBusinessPosted: false
  },
  {
    id: 2,
    type: 'request',
    title: 'Chemistry Tutor Needed',
    description: 'Struggling with Organic Chemistry. Need help preparing for midterm exam.',
    requester: 'Mark T.',
    rating: 4.8,
    price: 40,
    dueDate: new Date('2025-01-27'),
    category: 'Education',
    isBusinessPosted: false
  },
  {
    id: 3,
    type: 'request',
    title: 'Social Media Content Creator',
    description: 'Local coffee shop needs student to create social media content. Ongoing opportunity.',
    requester: 'Brew & Bean Cafe',
    rating: 4.9,
    price: 300,
    dueDate: new Date('2025-01-30'),
    category: 'Marketing',
    isBusinessPosted: true
  },
  {
    id: 4,
    type: 'request',
    title: 'Move-out Help Needed',
    description: 'Need help moving furniture out of dorm room. Heavy lifting required.',
    requester: 'Carlos R.',
    rating: 4.5,
    price: 50,
    dueDate: new Date('2025-01-28'),
    category: 'Labor',
    isBusinessPosted: false
  },
  {
    id: 5,
    type: 'request',
    title: 'Event Photography',
    description: 'Need photographer for student organization formal event next week.',
    requester: 'Student Council',
    rating: 4.7,
    price: 150,
    dueDate: new Date('2025-02-01'),
    category: 'Creative',
    isBusinessPosted: true
  },
  {
    id: 6,
    type: 'request',
    title: 'Website Development',
    description: 'Small business needs simple website built. Experience with React preferred.',
    requester: 'TechStart Local',
    rating: 4.8,
    price: 500,
    dueDate: new Date('2025-02-15'),
    category: 'Technology',
    isBusinessPosted: true
  }
];

const categories = ['All', 'Entertainment', 'Education', 'Marketing', 'Labor', 'Creative', 'Technology'];

export function RequestedServices({ onSelectListing, onViewUser }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRequests = mockRequests
    .filter(request => 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(request => 
      selectedCategory === 'All' || request.category === selectedCategory
    )
    .sort((a, b) => a.dueDate - b.dueDate);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleUserClick = (e, userName) => {
    e.stopPropagation();
    if (!userName.includes('Cafe') && !userName.includes('Council') && !userName.includes('Local')) {
      onViewUser(userName);
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-center text-primary">Requested Services</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Search requests..."
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

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map(request => {
          const daysUntilDue = getDaysUntilDue(request.dueDate);
          const isUrgent = daysUntilDue <= 2;
          const isClickableUser = !request.requester.includes('Cafe') && !request.requester.includes('Council') && !request.requester.includes('Local');
          
          return (
            <Card
              key={request.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectListing(request)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="flex-1 pr-2">{request.title}</h3>
                  <div className="flex items-center space-x-1 text-primary">
                    <DollarSign size={16} />
                    <span className="font-semibold">{request.price}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3 line-clamp-2">
                  {request.description}
                </p>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className={isUrgent ? "text-red-500" : "text-muted-foreground"} />
                    <span className={`text-sm ${isUrgent ? "text-red-500 font-medium" : "text-muted-foreground"}`}>
                      Due {formatDate(request.dueDate)}
                      {daysUntilDue === 0 && " (Today)"}
                      {daysUntilDue === 1 && " (Tomorrow)"}
                      {daysUntilDue > 1 && ` (${daysUntilDue} days)`}
                    </span>
                  </div>
                  {request.isBusinessPosted && (
                    <Badge variant="outline" className="text-xs">Business</Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {isClickableUser ? (
                      <button
                        onClick={(e) => handleUserClick(e, request.requester)}
                        className="text-sm text-primary hover:underline"
                      >
                        {request.requester}
                      </button>
                    ) : (
                      <span className="text-sm">{request.requester}</span>
                    )}
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{request.rating}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{request.category}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No requests found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}