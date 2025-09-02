'use client';

import { useState, useMemo } from 'react';
import HookCard from '@/components/HookCard';
import { Hook, HookCategory } from '@/types/hook';
import hooksData from '@/data/hooks.json';

const categories = [
  { value: 'ALL', label: 'All' },
  { value: 'MONITORING', label: 'Monitoring' },
  { value: 'SECURITY', label: 'Security' },
  { value: 'WORKFLOW', label: 'Workflow' },
  { value: 'TESTING', label: 'Testing' },
  { value: 'INTEGRATION', label: 'Integration' },
  { value: 'UTILITY', label: 'Utilities' },
  { value: 'LEARNING', label: 'Learning' },
  { value: 'TEAM', label: 'Team' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const hooks: Hook[] = hooksData.hooks as Hook[];
  
  const filteredHooks = useMemo(() => {
    let filtered = hooks;
    
    // Apply category filter
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(hook => hook.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(hook => 
        hook.name.toLowerCase().includes(query) ||
        hook.description.toLowerCase().includes(query) ||
        hook.author.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [hooks, selectedCategory, searchQuery]);
  
  const featuredHooks = filteredHooks.filter(hook => hook.featured);
  const regularHooks = filteredHooks.filter(hook => !hook.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                🪝 HookHub
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover Claude Code Hooks
              </p>
            </div>
            <div className="flex-1 max-w-lg">
              <input
                type="search"
                placeholder="Search hooks by name, description, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Discover Claude Code Hooks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Claude Code hooks are configuration scripts that customize and control Claude's behavior at different stages of interaction. 
              Browse our curated collection of community-driven hooks to enhance your workflows.
            </p>
            <a 
              href="#all-hooks"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Browse All Hooks
            </a>
          </div>
        </section>

        {/* Category Filters */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
                {category.value !== 'ALL' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({hooks.filter(h => category.value === 'ALL' || h.category === category.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Hooks Section */}
        {featuredHooks.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-2">⭐</span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Featured Hooks
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredHooks.map((hook) => (
                <HookCard key={hook.id} hook={hook} />
              ))}
            </div>
          </section>
        )}

        {/* All Hooks Section */}
        <section id="all-hooks">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory === 'ALL' ? 'All Hooks' : `${categories.find(c => c.value === selectedCategory)?.label} Hooks`}
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {regularHooks.length} {regularHooks.length === 1 ? 'hook' : 'hooks'}
            </span>
          </div>
          
          {regularHooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {regularHooks.map((hook) => (
                <HookCard key={hook.id} hook={hook} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {searchQuery ? 
                  `No hooks found matching "${searchQuery}"` : 
                  'No hooks found in this category'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
