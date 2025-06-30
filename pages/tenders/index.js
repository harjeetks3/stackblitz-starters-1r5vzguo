import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher, api } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import Badge from '../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import TenderCard from '../../components/TenderCard';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Building, 
  Clock,
  Sparkles,
  ShieldCheck,
  DollarSign,
  X
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function TenderFeed() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [eligibilitySummaries, setEligibilitySummaries] = useState({});
  const [isLoadingEligibility, setIsLoadingEligibility] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const moreFiltersRef = useRef(null);
  
  // Advanced filter states
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [closingDateBefore, setClosingDateBefore] = useState('');
  const [closingDateAfter, setClosingDateAfter] = useState('');
  const [showNewOnly, setShowNewOnly] = useState(false);

  // Fetch tenders data from API
  const { data: tenders, error, isLoading } = useSWR('/api/tenders', fetcher);
  
  // Fetch company profile for eligibility checking
  const { data: companyProfile } = useSWR(
    user ? '/api/company' : null,
    fetcher
  );

  // Close pop-out when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (moreFiltersRef.current && !moreFiltersRef.current.contains(event.target)) {
        setShowMoreFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreFiltersRef]);

  // Extract unique categories and locations from tenders
  const categories = ['all', ...(tenders ? [...new Set(tenders.map(tender => tender.category).filter(Boolean))] : [])];
  const locations = ['all', ...(tenders ? [...new Set(tenders.map(tender => tender.location).filter(Boolean))] : [])];

  // Apply all filters to tenders
  const filteredTenders = tenders?.filter(tender => {
    // Basic filters
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (tender.description && tender.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || tender.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || tender.location === selectedLocation;
    
    // Advanced filters
    let matchesAdvancedFilters = true;
    
    // Budget filtering (simple string comparison for demo)
    if (minBudget) {
      const numericBudget = parseFloat(tender.budget?.replace(/[^0-9.]/g, '') || 0);
      if (numericBudget < parseFloat(minBudget)) {
        matchesAdvancedFilters = false;
      }
    }
    
    if (maxBudget) {
      const numericBudget = parseFloat(tender.budget?.replace(/[^0-9.]/g, '') || 0);
      if (numericBudget > parseFloat(maxBudget)) {
        matchesAdvancedFilters = false;
      }
    }
    
    // Closing date filtering
    if (closingDateAfter && tender.closingDate) {
      const tenderDate = new Date(tender.closingDate);
      const filterDate = new Date(closingDateAfter);
      if (tenderDate < filterDate) {
        matchesAdvancedFilters = false;
      }
    }
    
    if (closingDateBefore && tender.closingDate) {
      const tenderDate = new Date(tender.closingDate);
      const filterDate = new Date(closingDateBefore);
      if (tenderDate > filterDate) {
        matchesAdvancedFilters = false;
      }
    }
    
    // New tenders only
    if (showNewOnly && !tender.isNew) {
      matchesAdvancedFilters = false;
    }
    
    return matchesSearch && matchesCategory && matchesLocation && matchesAdvancedFilters;
  }) || [];

  // Fetch eligibility summaries when tenders and company profile are loaded
  useEffect(() => {
    const fetchEligibilitySummaries = async () => {
      if (!user || !tenders || tenders.length === 0 || !companyProfile) {
        return;
      }

      try {
        setIsLoadingEligibility(true);
        const tenderIds = tenders.map(tender => tender.id);
        
        const result = await api('/api/eligibilitySummary', {
          method: 'POST',
          body: { tenderIds }
        });
        
        setEligibilitySummaries(result);
      } catch (error) {
        console.error('Error fetching eligibility summaries:', error);
      } finally {
        setIsLoadingEligibility(false);
      }
    };

    fetchEligibilitySummaries();
  }, [tenders, companyProfile, user]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setMinBudget('');
    setMaxBudget('');
    setClosingDateBefore('');
    setClosingDateAfter('');
    setShowNewOnly(false);
    setShowMoreFilters(false);
  };

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    setShowMoreFilters(false);
  };

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load tenders. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Available Tenders</h1>
          {user && (
            <Badge className="bg-blue-100 text-blue-800 flex items-center space-x-1 px-3 py-1">
              <ShieldCheck className="w-4 h-4 mr-1" />
              <span>Eligibility Scoring Active</span>
            </Badge>
          )}
        </div>
        <p className="text-gray-600">Discover and bid on government and private sector opportunities</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search tenders by title, agency, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>

          {/* More Filters Button and Popup */}
          <div className="relative" ref={moreFiltersRef}>
            <Button 
              type="button"
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </Button>

            {showMoreFilters && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Advanced Filters</h4>
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={() => setShowMoreFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Budget Range (RM)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input 
                        type="number" 
                        placeholder="Min" 
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                      />
                      <Input 
                        type="number" 
                        placeholder="Max" 
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {/* Closing Date Range */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Closing Date Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">From</label>
                        <Input 
                          type="date" 
                          value={closingDateAfter}
                          onChange={(e) => setClosingDateAfter(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">To</label>
                        <Input 
                          type="date" 
                          value={closingDateBefore}
                          onChange={(e) => setClosingDateBefore(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Show New Only */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showNewOnly"
                      checked={showNewOnly}
                      onChange={(e) => setShowNewOnly(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="showNewOnly" className="ml-2 block text-sm text-gray-700">
                      Show new tenders only
                    </label>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-between pt-2">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={resetFilters}
                    >
                      Reset All
                    </Button>
                    <Button 
                      type="button"
                      size="sm"
                      onClick={applyAdvancedFilters}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredTenders.length} of {tenders?.length || 0} tenders
        </p>
      </div>

      {/* Tender Cards */}
      {isLoading ? (
        // Loading state - skeleton cards
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card border-l-4 border-l-blue-500">
              <div className="skeleton h-6 w-3/4 mb-3"></div>
              <div className="skeleton h-4 w-1/2 mb-2"></div>
              <div className="skeleton h-4 w-2/3 mb-4"></div>
              <div className="flex space-x-2 mb-4">
                <div className="skeleton h-6 w-16"></div>
                <div className="skeleton h-6 w-20"></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
              <div className="flex space-x-3">
                <div className="skeleton h-10 flex-1"></div>
                <div className="skeleton h-10 w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredTenders.length > 0 ? (
        // Render tender cards when data is available
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredTenders.map((tender) => (
            <TenderCard 
              key={tender.id} 
              tender={tender} 
              eligibilitySummary={eligibilitySummaries[tender.id]}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenders found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more opportunities.
          </p>
          <Button 
            type="button"
            variant="outline"
            onClick={resetFilters}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Eligibility Scoring Information */}
      {user && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">About Eligibility Scoring</h3>
              <p className="text-blue-800 mb-4">
                Tenders are automatically scored based on your company profile and certifications. 
                The system analyzes requirements like CIDB grade, experience, and certifications to 
                determine your eligibility.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800">High Match</Badge>
                  <span className="text-blue-800">80-100% match</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-yellow-100 text-yellow-800">Medium Match</Badge>
                  <span className="text-blue-800">50-79% match</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-100 text-orange-800">Low Match</Badge>
                  <span className="text-blue-800">Below 50% match</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}