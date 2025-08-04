import React, { useState } from 'react';
import { ArrowLeft, Camera, DollarSign, Calendar, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function Post({ onBack }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    price: '',
    dueDate: '',
    photo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Posting:', selectedOption, formData);
    
    // Show success message and go back
    alert(`Your ${selectedOption.replace('-', ' ')} has been posted successfully!`);
    onBack();
  };

  const renderForm = () => {
    switch (selectedOption) {
      case 'offer-service':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="text-primary" size={24} />
                <span>Offer a Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="description">Service Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the service you're offering..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="photo">Photo/Video (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Camera className="mx-auto text-muted-foreground mb-2" size={32} />
                    <p className="text-muted-foreground">Click to upload a photo or video</p>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">Post Service</Button>
              </form>
            </CardContent>
          </Card>
        );
        
      case 'request-service':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="text-primary" size={24} />
                <span>Request a Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="description">Service Request Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the service you need..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Offered Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="pl-9"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">This price is negotiable</p>
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">Post Request</Button>
              </form>
            </CardContent>
          </Card>
        );
        
      case 'sell-item':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="text-primary" size={24} />
                <span>Sell an Item</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="description">Item Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the item you're selling..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="photo">Photo/Video (Required)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <Camera className="mx-auto text-muted-foreground mb-2" size={32} />
                    <p className="text-muted-foreground">Click to upload a photo or video</p>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full">Post Item</Button>
              </form>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  if (selectedOption) {
    return (
      <div className="px-4 py-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedOption(null)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </Button>
        </div>
        
        {renderForm()}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <h1 className="text-center text-primary">Create a Post</h1>
      
      <div className="space-y-4">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setSelectedOption('offer-service')}
        >
          <CardContent className="p-6 text-center">
            <FileText className="mx-auto text-primary mb-3" size={48} />
            <h3 className="mb-2">Offer Service</h3>
            <p className="text-muted-foreground">Share a service you can provide to other students</p>
          </CardContent>
        </Card>
        
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setSelectedOption('request-service')}
        >
          <CardContent className="p-6 text-center">
            <FileText className="mx-auto text-primary mb-3" size={48} />
            <h3 className="mb-2">Request Service</h3>
            <p className="text-muted-foreground">Request a service you need from other students</p>
          </CardContent>
        </Card>
        
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setSelectedOption('sell-item')}
        >
          <CardContent className="p-6 text-center">
            <FileText className="mx-auto text-primary mb-3" size={48} />
            <h3 className="mb-2">Sell Item</h3>
            <p className="text-muted-foreground">List an item for sale on the marketplace</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}