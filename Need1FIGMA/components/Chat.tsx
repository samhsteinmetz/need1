import React, { useState } from 'react';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Chat({ chatData, onBack, onViewUser }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: chatData.participant,
      message: `Hi! I'm interested in "${chatData.listingTitle}". Could you tell me more about it?`,
      timestamp: new Date('2025-01-25T10:30:00'),
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      message: 'Sure! I\'d be happy to help. What specific questions do you have?',
      timestamp: new Date('2025-01-25T10:32:00'),
      isOwn: true
    },
    {
      id: 3,
      sender: chatData.participant,
      message: 'When would you be available to meet? And is the price negotiable?',
      timestamp: new Date('2025-01-25T10:35:00'),
      isOwn: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [exchangeCompleted, setExchangeCompleted] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        message: newMessage,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleExchangeComplete = () => {
    setExchangeCompleted(true);
    setShowRating(true);
  };

  const submitRating = () => {
    // Here you would typically send the rating to your backend
    console.log('Rating submitted:', { rating, review });
    alert('Thank you for your feedback!');
    setShowRating(false);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isClickableUser = !chatData.participant.includes('Cafe') && !chatData.participant.includes('Council') && !chatData.participant.includes('Local');

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" />
            <AvatarFallback>{chatData.participant.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            {isClickableUser ? (
              <button
                onClick={() => onViewUser(chatData.participant)}
                className="font-medium text-primary hover:underline"
              >
                {chatData.participant}
              </button>
            ) : (
              <h1 className="font-medium">{chatData.participant}</h1>
            )}
            <p className="text-sm text-muted-foreground">About: {chatData.listingTitle}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.isOwn 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground'
            }`}>
              <p>{message.message}</p>
              <p className={`text-xs mt-1 ${
                message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {/* Exchange Complete Button */}
        {!exchangeCompleted && (
          <div className="flex justify-center py-4">
            <Button 
              onClick={handleExchangeComplete}
              className="flex items-center space-x-2"
              variant="outline"
            >
              <CheckCircle size={16} />
              <span>Mark Exchange Complete</span>
            </Button>
          </div>
        )}
        
        {/* Rating Modal */}
        {showRating && (
          <Card className="mx-auto max-w-md">
            <CardContent className="p-6">
              <h3 className="mb-4 text-center">Rate Your Experience</h3>
              
              {/* Star Rating */}
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              
              {/* Review Text */}
              <textarea
                placeholder="Leave a review (optional)"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full p-3 border border-border rounded-lg resize-none"
                rows={3}
              />
              
              <div className="flex space-x-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowRating(false)}
                  className="flex-1"
                >
                  Skip
                </Button>
                <Button 
                  onClick={submitRating}
                  className="flex-1"
                  disabled={rating === 0}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}