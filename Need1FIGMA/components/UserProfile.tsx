import React from 'react';
import { ArrowLeft, Star, Mail, Calendar, Package, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

// Mock user data for different users
const mockUserData = {
  'Mike S.': {
    name: 'Mike S.',
    email: 'mike.smith@university.edu',
    rating: 4.8,
    totalReviews: 32,
    joinDate: 'August 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    servicesOffered: [
      { id: 1, title: 'Professional DJ Services', status: 'Active', price: 150 },
      { id: 2, title: 'Sound System Rental', status: 'Active', price: 75 },
      { id: 3, title: 'Event MC Services', status: 'Completed', price: 100 }
    ],
    itemsListed: [
      { id: 1, title: 'DJ Mixer', status: 'Active', price: 300 },
      { id: 2, title: 'Bluetooth Speakers', status: 'Sold', price: 120 }
    ],
    reviews: [
      {
        id: 1,
        reviewer: 'Jessica H.',
        rating: 5,
        comment: 'Amazing DJ! Made my birthday party unforgettable.',
        date: '2025-01-20'
      },
      {
        id: 2,
        reviewer: 'Carlos R.',
        rating: 5,
        comment: 'Professional and reliable. Great music selection.',
        date: '2025-01-15'
      }
    ]
  },
  'Sarah M.': {
    name: 'Sarah M.',
    email: 'sarah.martinez@university.edu',
    rating: 4.9,
    totalReviews: 24,
    joinDate: 'September 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    servicesOffered: [
      { id: 1, title: 'Guitar Lessons', status: 'Active', price: 25 },
      { id: 2, title: 'Music Theory Tutoring', status: 'Active', price: 30 }
    ],
    itemsListed: [
      { id: 1, title: 'Guitar Pick Set', status: 'Active', price: 10 }
    ],
    reviews: [
      {
        id: 1,
        reviewer: 'Mike T.',
        rating: 5,
        comment: 'Excellent guitar instructor! Very patient and knowledgeable.',
        date: '2025-01-20'
      }
    ]
  },
  'David L.': {
    name: 'David L.',
    email: 'david.lopez@university.edu',
    rating: 4.7,
    totalReviews: 18,
    joinDate: 'October 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    servicesOffered: [
      { id: 1, title: 'Photography Services', status: 'Active', price: 75 },
      { id: 2, title: 'Photo Editing', status: 'Active', price: 25 }
    ],
    itemsListed: [
      { id: 1, title: 'Camera Lens', status: 'Active', price: 200 }
    ],
    reviews: [
      {
        id: 1,
        reviewer: 'Emma T.',
        rating: 5,
        comment: 'Beautiful photos! Very professional work.',
        date: '2025-01-18'
      }
    ]
  },
  'Emma T.': {
    name: 'Emma T.',
    email: 'emma.thompson@university.edu',
    rating: 4.9,
    totalReviews: 28,
    joinDate: 'July 2024',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    servicesOffered: [
      { id: 1, title: 'Math Tutoring', status: 'Active', price: 30 },
      { id: 2, title: 'Statistics Help', status: 'Active', price: 35 }
    ],
    itemsListed: [
      { id: 1, title: 'Calculus Textbook', status: 'Sold', price: 80 }
    ],
    reviews: [
      {
        id: 1,
        reviewer: 'Mark T.',
        rating: 5,
        comment: 'Great tutor! Really helped me understand calculus.',
        date: '2025-01-22'
      }
    ]
  }
};

export function UserProfile({ userId, onBack }) {
  const userData = mockUserData[userId] || {
    name: userId,
    email: `${userId.toLowerCase().replace(' ', '.')}@university.edu`,
    rating: 4.5,
    totalReviews: 10,
    joinDate: 'January 2025',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    servicesOffered: [],
    itemsListed: [],
    reviews: []
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Button>
          <h1 className="text-lg font-medium">{userData.name}'s Profile</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="mb-1">{userData.name}</h2>
                <div className="flex items-center space-x-2 mb-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{userData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {renderStars(Math.floor(userData.rating))}
                  <span className="text-sm font-medium">{userData.rating}</span>
                  <span className="text-sm text-muted-foreground">({userData.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>Member since {userData.joinDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Services & Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package size={20} className="text-primary" />
              <span>Current Listings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.servicesOffered.length > 0 && (
              <div>
                <h4 className="mb-3">Services Offered</h4>
                <div className="space-y-2">
                  {userData.servicesOffered.map(service => (
                    <div key={service.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <div>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-muted-foreground">${service.price}</p>
                      </div>
                      <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userData.servicesOffered.length > 0 && userData.itemsListed.length > 0 && <Separator />}

            {userData.itemsListed.length > 0 && (
              <div>
                <h4 className="mb-3">Items Listed</h4>
                <div className="space-y-2">
                  {userData.itemsListed.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">${item.price}</p>
                      </div>
                      <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {userData.servicesOffered.length === 0 && userData.itemsListed.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No current listings</p>
            )}
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userData.reviews.length > 0 ? (
              userData.reviews.map(review => (
                <div key={review.id} className="border-l-4 border-primary pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium">{review.reviewer}</p>
                      <div className="flex items-center space-x-2">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&ldquo;{review.comment}&rdquo;</p>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">No reviews yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}