'use client';

import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Mock character data for homepage
const featuredCharacters = [
  {
    id: 1,
    name: "Luna",
    avatar: "/api/placeholder/200/200",
    tagline: "Mystical and enchanting",
    category: "Fantasy",
    isOnline: true,
    isPremium: false,
    likes: 15420,
    messages: 892341
  },
  {
    id: 2,
    name: "Sophia",
    avatar: "/api/placeholder/200/200",
    tagline: "Smart and sophisticated",
    category: "Companion",
    isOnline: true,
    isPremium: true,
    likes: 23156,
    messages: 1205678
  },
  {
    id: 3,
    name: "Yuki",
    avatar: "/api/placeholder/200/200",
    tagline: "Sweet and caring",
    category: "Anime",
    isOnline: false,
    isPremium: false,
    likes: 8934,
    messages: 456789
  },
  {
    id: 4,
    name: "Isabella",
    avatar: "/api/placeholder/200/200",
    tagline: "Passionate and romantic",
    category: "Romance",
    isOnline: true,
    isPremium: true,
    likes: 31289,
    messages: 1567890
  },
  {
    id: 5,
    name: "Emma",
    avatar: "/api/placeholder/200/200",
    tagline: "Fun and adventurous",
    category: "Companion",
    isOnline: false,
    isPremium: false,
    likes: 12756,
    messages: 678901
  },
  {
    id: 6,
    name: "Aria",
    avatar: "/api/placeholder/200/200",
    tagline: "Creative and artistic",
    category: "Fantasy",
    isOnline: true,
    isPremium: true,
    likes: 19834,
    messages: 923456
  }
];

const categories = ["All", "Companion", "Fantasy", "Anime", "Romance", "Sci-Fi"];

export function CharacterGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [characters, setCharacters] = useState(featuredCharacters);

  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         char.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || char.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className="group relative bg-card border border-border rounded-xl overflow-hidden card-hover cursor-pointer"
            onClick={() => window.location.href = `/chat?character=${character.id}`}
          >
            {/* Premium Badge */}
            {character.isPremium && (
              <div className="absolute top-2 right-2 z-10">
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold glow-primary">
                  PREMIUM
                </Badge>
              </div>
            )}

            {/* Online Status */}
            {character.isOnline && (
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 bg-green-500/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  <div className="h-2 w-2 bg-white rounded-full pulse-dot" />
                  Online
                </div>
              </div>
            )}

            {/* Avatar */}
            <div className="aspect-square relative overflow-hidden gradient-card">
              <Avatar className="w-full h-full rounded-none">
                <AvatarImage 
                  src={character.avatar} 
                  alt={character.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <AvatarFallback className="text-4xl gradient-primary text-white">
                  {character.name[0]}
                </AvatarFallback>
              </Avatar>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Character Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-gradient-primary transition-all duration-300">
                    {character.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {character.tagline}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                  {character.category}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="h-3 w-3" />
                    <span>{character.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle className="h-3 w-3" />
                    <span>{(character.messages / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              {/* Chat Button */}
              <Button 
                className="w-full gradient-primary hover-lift text-white border-0"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/chat?character=${character.id}`;
                }}
              >
                Start Chat
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCharacters.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg mb-4">
            No characters found matching your criteria
          </div>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
