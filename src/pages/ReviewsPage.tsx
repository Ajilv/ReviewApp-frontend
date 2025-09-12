import React, { useState, useMemo } from 'react';
import { Star, ChevronDown, ThumbsUp, Flag, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Review {
  id: number;
  name: string;
  rating: number;
  title: string;
  date: string;
  verified: boolean;
  content: string;
  helpful: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Kushal",
    rating: 5,
    title: "Trendy and attractive, with safety",
    date: "15 September 2023",
    verified: true,
    content: "Very good product at the best price in the market. Quality is excellent and delivery was fast.",
    helpful: 12
  },
  {
    id: 2,
    name: "Surender Varma",
    rating: 5,
    title: "Excellent quality and value",
    date: "12 June 2023",
    verified: true,
    content: "Amazing product! Exceeded my expectations in every way. Highly recommended for anyone looking for quality.",
    helpful: 8
  },
  {
    id: 3,
    name: "Priya Sharma",
    rating: 4,
    title: "Good product with minor issues",
    date: "8 August 2023",
    verified: true,
    content: "Overall satisfied with the purchase. The product works as described, though packaging could be improved.",
    helpful: 5
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    rating: 4,
    title: "Value for money",
    date: "22 July 2023",
    verified: false,
    content: "Decent product for the price point. Does what it's supposed to do without any major complaints.",
    helpful: 3
  },
  {
    id: 5,
    name: "Anita Patel",
    rating: 5,
    title: "Outstanding customer service",
    date: "1 September 2023",
    verified: true,
    content: "Not only is the product great, but the customer service was exceptional. Quick responses and helpful support.",
    helpful: 15
  }
];

const ReviewsPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [sortBy, setSortBy] = useState('newest');
  const [reviewHelpfulCounts, setReviewHelpfulCounts] = useState<{ [key: number]: number }>({});
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());
  const [reportedReviews, setReportedReviews] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  // Calculate dynamic average rating from actual reviews
  const averageRating = useMemo(() => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((totalRating / reviews.length).toFixed(1));
  }, []);

  // Calculate total reviews count
  const totalReviews = reviews.length;

  // Calculate rating distribution based on actual reviews
  const ratingDistribution = useMemo(() => {
    const distribution = [
      { stars: 5, count: 0, percentage: 0 },
      { stars: 4, count: 0, percentage: 0 },
      { stars: 3, count: 0, percentage: 0 },
      { stars: 2, count: 0, percentage: 0 },
      { stars: 1, count: 0, percentage: 0 }
    ];

    // Count reviews for each rating
    reviews.forEach(review => {
      const ratingIndex = distribution.findIndex(item => item.stars === review.rating);
      if (ratingIndex !== -1) {
        distribution[ratingIndex].count++;
      }
    });

    // Calculate percentages
    distribution.forEach(item => {
      item.percentage = Math.round((item.count / totalReviews) * 100);
    });

    return distribution;
  }, [totalReviews]);

  // Sort reviews based on the selected option
  const sortedReviews = useMemo(() => {
    const reviewsCopy = [...reviews];
    
    switch (sortBy) {
      case 'newest':
        return reviewsCopy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return reviewsCopy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'highest':
        return reviewsCopy.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return reviewsCopy.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return reviewsCopy.sort((a, b) => {
          const aHelpful = reviewHelpfulCounts[a.id] !== undefined ? reviewHelpfulCounts[a.id] : a.helpful;
          const bHelpful = reviewHelpfulCounts[b.id] !== undefined ? reviewHelpfulCounts[b.id] : b.helpful;
          return bHelpful - aHelpful;
        });
      default:
        return reviewsCopy;
    }
  }, [sortBy, reviewHelpfulCounts]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, sortedReviews.length));
  };

  const loadLess = () => {
    setVisibleCount(3);
  };

  const handleWriteReview = () => {
    navigate('/write-review');
  };

  // Handle helpful button click
  const handleHelpfulClick = (reviewId: number, currentCount: number) => {
    if (likedReviews.has(reviewId)) {
      // Unlike - decrease count
      setReviewHelpfulCounts(prev => ({
        ...prev,
        [reviewId]: (prev[reviewId] !== undefined ? prev[reviewId] : currentCount) - 1
      }));
      setLikedReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    } else {
      // Like - increase count
      setReviewHelpfulCounts(prev => ({
        ...prev,
        [reviewId]: (prev[reviewId] !== undefined ? prev[reviewId] : currentCount) + 1
      }));
      setLikedReviews(prev => new Set(prev).add(reviewId));
    }
  };

  // Handle report button click
  const handleReportClick = (reviewId: number) => {
    if (reportedReviews.has(reviewId)) {
      // Un-report
      setReportedReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    } else {
      // Report
      setReportedReviews(prev => new Set(prev).add(reviewId));
      // You could also show a confirmation message here
      alert('Review has been reported. Thank you for helping maintain quality standards.');
    }
  };

  const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => {
    const sizeClass = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
          <p className="text-gray-600">Read what our customers are saying about this product</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              
              {/* Overall Rating */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
                <StarRating rating={Math.round(averageRating)} size="lg" />
                <p className="text-sm text-gray-600 mt-2">Based on {totalReviews} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3 mb-6">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium">{item.stars}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8">{item.count}</span>
                  </div>
                ))}
              </div>

              {/* Write Review Button */}
              <button 
                onClick={handleWriteReview}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Write a Review
              </button>

              {/* Filter Info */}
              <div className="mt-4 pt-4 border-t">
                <button className="text-blue-600 text-sm hover:underline flex items-center gap-1">
                  How are ratings calculated? <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Reviews List */}
          <div className="lg:col-span-2">
            
            {/* Sort and Filter */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Reviews ({totalReviews})
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                      <option value="helpful">Most Helpful</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              {sortedReviews.slice(0, visibleCount).map((review) => {
                const currentHelpfulCount = reviewHelpfulCounts[review.id] !== undefined 
                  ? reviewHelpfulCounts[review.id] 
                  : review.helpful;
                const isLiked = likedReviews.has(review.id);
                const isReported = reportedReviews.has(review.id);

                return (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.name}</h3>
                          <div className="flex items-center gap-2">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                        {isReported && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                            Reported
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <button 
                        onClick={() => handleHelpfulClick(review.id, review.helpful)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          isLiked 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-700' : ''}`} />
                        Helpful ({currentHelpfulCount})
                      </button>
                      <button 
                        onClick={() => handleReportClick(review.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          isReported
                            ? 'bg-red-100 text-red-700'
                            : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <Flag className={`w-4 h-4 ${isReported ? 'fill-red-700' : ''}`} />
                        {isReported ? 'Reported' : 'Report'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More/Less Buttons */}
            <div className="mt-8 text-center space-y-3">
              {visibleCount < sortedReviews.length && (
                <button
                  onClick={loadMore}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Load More Reviews ({sortedReviews.length - visibleCount} remaining)
                </button>
              )}
              
              {visibleCount > 3 && (
                <button
                  onClick={loadLess}
                  className="block mx-auto text-blue-600 text-sm hover:underline"
                >
                  Show Fewer Reviews
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;