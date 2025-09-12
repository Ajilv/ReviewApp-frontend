// src/pages/HomePage.tsx
import React from 'react';
import { Star, TrendingUp, Users, MessageSquare, ArrowRight, Sparkles, Zap, Award, BarChart3, Eye } from 'lucide-react';

const HomePage: React.FC = () => {
  const stats = [
    {
      title: "Total Reviews",
      value: "2,847",
      change: "+15.3%",
      icon: MessageSquare,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      title: "Average Rating",
      value: "4.6",
      change: "+0.3",
      icon: Star,
      gradient: "from-yellow-500 to-orange-500",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      title: "Active Users",
      value: "1,523",
      change: "+18.7%",
      icon: Users,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      title: "AI Generated",
      value: "892",
      change: "+45.2%",
      icon: Zap,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    }
  ];

  const quickActions = [
    {
      title: "Generate AI Review",
      description: "Create intelligent product reviews instantly",
      icon: Sparkles,
      href: "/write-review",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-100 to-pink-100"
    },
    {
      title: "Browse All Reviews",
      description: "Explore and manage existing reviews",
      icon: Eye,
      href: "/reviews",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-100 to-cyan-100"
    },
    {
      title: "Analytics Dashboard",
      description: "View detailed review analytics",
      icon: BarChart3,
      href: "#",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-100 to-emerald-100"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold">ReviewRater</h1>
            </div>
            <nav className="flex space-x-8">
              <a href="/" className="text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1">Home</a>
              <a href="/reviews" className="hover:text-purple-200 transition-colors font-medium">All Reviews</a>
              <a href="/write-review" className="hover:text-purple-200 transition-colors font-medium">Write Review</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full mb-8 shadow-lg">
            <Award className="w-6 h-6" />
            <span className="font-semibold text-lg">AI-Powered Review Platform</span>
          </div>
          
          <h2 className="text-6xl font-bold text-gray-800 mb-8 leading-tight">
            Smart Review
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Generation</span>
          </h2>
          
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Create authentic, professional product reviews with advanced AI technology. 
            Streamline your review process and boost customer engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/write-review"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
            >
              <Sparkles className="w-7 h-7" />
              Generate Review
            </a>
            <a
              href="/reviews"
              className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold text-xl border-3 border-purple-200 hover:bg-purple-50 transition-all shadow-2xl hover:shadow-purple-500/25"
            >
              <MessageSquare className="w-7 h-7" />
              Browse Reviews
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105`}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <span className={`text-lg font-bold px-3 py-2 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                } shadow-md`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">{stat.title}</h3>
              <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <p className="text-xl text-gray-600">Everything you need to manage reviews effectively</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`group bg-gradient-to-br ${action.bgGradient} rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105 block`}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{action.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">{action.description}</p>
                <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-8">Why Choose ReviewRater?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl mb-2">AI-Powered</h4>
                <p className="opacity-90">Advanced AI generates authentic reviews</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl mb-2">Lightning Fast</h4>
                <p className="opacity-90">Generate reviews in seconds</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl mb-2">Professional Quality</h4>
                <p className="opacity-90">High-quality, authentic content</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-xl mb-2">Analytics Ready</h4>
                <p className="opacity-90">Built-in analytics and insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;