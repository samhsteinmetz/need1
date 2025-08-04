import React from 'react';
import { ArrowLeft, Star, MessageCircle, Calendar, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

const mockReviews = [
  {
    id: 1,
    reviewer: 'Emma T.',
    rating: 5,
    comment: 'Amazing service! Very professional and delivered exactly what was promised.',
    date: '2025-01-20'
  },
  {
    id: 2,
    reviewer: 'Carlos R.',
    rating: 4,
    comment: 'Great experience overall. Would definitely recommend to others.',
    date: '2025-01-15'
  },
  {
    id: 3,
    reviewer: 'Lisa K.',
    rating: 5,
    comment: 'Exceeded my expectations. Very reliable and communicative.',
    date: '2025-01-10'
  }
];

export function ListingDetail({ listing, onBack, onChat, onViewUser }) {
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

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const handleChat = () => {
    const chatData = {
      participant: listing.provider || listing.seller || listing.requester,
      listingTitle: listing.title,
      listingType: listing.type
    };
    onChat(chatData);
  };

  const userName = listing.provider || listing.seller || listing.requester;
  const isClickableUser = !userName.includes('Cafe') && !userName.includes('Council') && !userName.includes('Local');

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
          <h1 className="text-lg font-medium line-clamp-1">{listing.title}</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Main Listing Info */}
        <Card>
          <CardContent className="p-6">
            {listing.image && (
              <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h2 className="flex-1 pr-4">{listing.title}</h2>
                <div className="flex items-center space-x-1 text-primary">
                  <DollarSign size={20} />
                  <span className="text-xl font-semibold">{listing.price}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {listing.description}
              </p>
              
              {listing.dueDate && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>Due: {formatDate(listing.dueDate)}</span>
                </div>
              )}
              
              {listing.category && (
                <Badge variant="secondary">{listing.category}</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Provider/Seller Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
                  <AvatarFallback>
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {isClickableUser ? (
                    <button
                      onClick={() => onViewUser(userName)}
                      className="text-primary hover:underline"
                    >
                      <h3>{userName}</h3>
                    </button>
                  ) : (
                    <h3>{userName}</h3>
                  )}
                  <div className="flex items-center space-x-2">
                    {renderStars(Math.floor(listing.rating))}
                    <span className="text-sm font-medium">{listing.rating}</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleChat} className="flex items-center space-x-2">
                <MessageCircle size={16} />
                <span>Chat</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockReviews.map(review => (
              <div key={review.id} className="border-l-4 border-primary pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <button
                      onClick={() => onViewUser(review.reviewer)}
                      className="font-medium text-primary hover:underline"
                    >
                      {review.reviewer}
                    </button>
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
    </div>
  );
}