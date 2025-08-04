import React, { useState } from 'react';
import { OfferedServices } from './components/OfferedServices';
import { Marketplace } from './components/Marketplace';
import { RequestedServices } from './components/RequestedServices';
import { Post } from './components/Post';
import { Profile } from './components/Profile';
import { UserProfile } from './components/UserProfile';
import { ListingDetail } from './components/ListingDetail';
import { Chat } from './components/Chat';
import { Logo } from './components/Logo';
import { Home, ShoppingBag, HelpCircle, Plus, User } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('offered-services');
  const [selectedListing, setSelectedListing] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);

  const renderPage = () => {
    if (chatData) {
      return <Chat chatData={chatData} onBack={() => setChatData(null)} onViewUser={setViewingUser} />;
    }
    
    if (viewingUser) {
      return <UserProfile userId={viewingUser} onBack={() => setViewingUser(null)} />;
    }
    
    if (selectedListing) {
      return (
        <ListingDetail 
          listing={selectedListing} 
          onBack={() => setSelectedListing(null)}
          onChat={(data) => setChatData(data)}
          onViewUser={setViewingUser}
        />
      );
    }

    switch (currentPage) {
      case 'marketplace':
        return <Marketplace onSelectListing={setSelectedListing} onViewUser={setViewingUser} />;
      case 'requested-services':
        return <RequestedServices onSelectListing={setSelectedListing} onViewUser={setViewingUser} />;
      case 'post':
        return <Post onBack={() => setCurrentPage('offered-services')} />;
      case 'profile':
        return <Profile />;
      default:
        return <OfferedServices onSelectListing={setSelectedListing} onViewUser={setViewingUser} />;
    }
  };

  if (chatData || selectedListing || viewingUser) {
    return (
      <div className="min-h-screen bg-background">
        {renderPage()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Logo */}
      <header className="flex justify-end p-4">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setCurrentPage('marketplace')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'marketplace' 
                ? 'text-primary bg-secondary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <ShoppingBag size={24} />
            <span className="text-xs mt-1">Market</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('requested-services')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'requested-services' 
                ? 'text-primary bg-secondary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <HelpCircle size={24} />
            <span className="text-xs mt-1">Requests</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('offered-services')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'offered-services' 
                ? 'text-primary bg-secondary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Services</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('post')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'post' 
                ? 'text-primary bg-secondary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Plus size={24} />
            <span className="text-xs mt-1">Post</span>
          </button>
          
          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'profile' 
                ? 'text-primary bg-secondary' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}