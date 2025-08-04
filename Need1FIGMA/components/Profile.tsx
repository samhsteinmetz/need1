import React from 'react';
import { Star, Mail, Calendar, Package, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

const mockUserData = {
  name: 'Sarah M.',
  email: 'sarah.martinez@university.edu',
  rating: 4.8,
  totalReviews: 24,
  joinDate: 'September 2024',
  servicesOffered: [
    { id: 1, title: 'Guitar Lessons', status: 'Active', price: 25 },
    { id: 2, title: 'Music Theory Tutoring', status: 'Completed', price: 30 },
    { id: 3, title: 'Band Performance', status: 'Active', price: 100 }
  ],
  itemsListed: [
    { id: 1, title: 'Guitar Amplifier', status: 'Sold', price: 150 },
    { id: 2, title: 'Music Books Collection', status: 'Active', price: 40 }
  ],
  servicesFulfilled: [
    { id: 1, title: 'Photography for Event', provider: 'David L.', rating: 5 },
    { id: 2, title: 'Math Tutoring', provider: 'Emma T.', rating: 4 },
    { id: 3, title: 'DJ Services', provider: 'Mike S.', rating: 5 }
  ],
  itemsPurchased: [
    { id: 1, title: 'Textbook: Music Theory', seller: 'John D.', rating: 4 },
    { id: 2, title: 'Bluetooth Headphones', seller: 'Alex T.', rating: 5 }
  ],
  reviews: [
    {
      id: 1,
      reviewer: 'Mike T.',
      rating: 5,
      comment: 'Excellent guitar instructor! Very patient and knowledgeable.',
      date: '2025-01-20'
    },
    {
      id: 2,
      reviewer: 'Lisa K.',
      rating: 5,
      comment: 'Amazing performance at our event. Highly recommend!',
      date: '2025-01-15'
    },
    {
      id: 3,
      reviewer: 'Carlos R.',
      rating: 4,
      comment: 'Great music theory tutoring. Helped me pass my exam.',
      date: '2025-01-10'
    }
  ]
};

export function Profile() {
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
    <div className="px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150" />
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="mb-1">{mockUserData.name}</h2>
              <div className="flex items-center space-x-2 mb-2">
                <Mail size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{mockUserData.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                {renderStars(Math.floor(mockUserData.rating))}
                <span className="text-sm font-medium">{mockUserData.rating}</span>
                <span className="text-sm text-muted-foreground">({mockUserData.totalReviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>Member since {mockUserData.joinDate}</span>
          </div>
        </CardContent>
      </Card>

      {/* Services & Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package size={20} className="text-primary" />
            <span>My Listings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-3">Services Offered</h4>
            <div className="space-y-2">
              {mockUserData.servicesOffered.map(service => (
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

          <Separator />

          <div>
            <h4 className="mb-3">Items Listed</h4>
            <div className="space-y-2">
              {mockUserData.itemsListed.map(item => (
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
        </CardContent>
      </Card>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingBag size={20} className="text-primary" />
            <span>Purchase History</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="mb-3">Services Used</h4>
            <div className="space-y-2">
              {mockUserData.servicesFulfilled.map(service => (
                <div key={service.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{service.title}</p>
                    <p className="text-sm text-muted-foreground">by {service.provider}</p>
                  </div>
                  {renderStars(service.rating)}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="mb-3">Items Purchased</h4>
            <div className="space-y-2">
              {mockUserData.itemsPurchased.map(item => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-secondary rounded-lg">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">from {item.seller}</p>
                  </div>
                  {renderStars(item.rating)}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews About Me</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockUserData.reviews.map(review => (
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
          ))}
        </CardContent>
      </Card>
    </div>
  );
}