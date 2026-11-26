import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface ActivityItem {
  id: string;
  badge: string;
  title: string;
  date: string;
  author: string;
  description: string;
  linkedItems: {
    label: string;
    type?: 'je' | 'contract' | 'milestone' | 'category';
  }[];
}

export const ActivityLogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('All types');

  // Form states matching screenshot right panel
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Hire');
  const [date, setDate] = useState('2026-11-20');
  const [details, setDetails] = useState('');
  const [linkedJE, setLinkedJE] = useState('');
  const [milestone, setMilestone] = useState('M-3 · Pilot with 200 farmers');

  // Exact data from screenshot:
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      badge: 'Field deployment',
      title: 'Sensor network v2 installed at 3 pilot sites',
      date: '29 Oct 2026',
      author: 'Joel K.',
      description: '34 probes and 4 gateways installed across the pilot cooperatives. Install photos are attached.',
      linkedItems: [
        { label: 'JE-0318 Soil probes · 4,120.00' },
        { label: 'JE-0270 Gateway routers · 3,520.00' },
        { label: 'Milestone M-4' }
      ]
    },
    {
      id: '2',
      badge: 'Hire',
      title: 'Agronomist contracted for pilot season',
      date: '01 Oct 2026',
      author: 'Joel K.',
      description: '3-month contract to run farmer onboarding and soil sampling.',
      linkedItems: [
        { label: 'Contract CT-0012' },
        { label: '6200 Contractors · monthly' },
        { label: 'Milestone M-3' }
      ]
    },
    {
      id: '3',
      badge: 'Product release',
      title: 'Advisory app v1.4 released',
      date: '16 Sep 2026',
      author: 'Joel K.',
      description: 'Adds offline soil-reading sync for low-connectivity areas.',
      linkedItems: [
        { label: '6010 R&D Personnel · Sep payroll' }
      ]
    }
  ]);

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newActivity: ActivityItem = {
      id: String(Date.now()),
      badge: type,
      title: title.trim(),
      date: new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Joel K.',
      description: details.trim() || 'No additional details provided.',
      linkedItems: [
        ...(linkedJE.trim() ? [{ label: linkedJE.trim() }] : []),
        ...(milestone ? [{ label: milestone }] : [])
      ]
    };

    setActivities([newActivity, ...activities]);
    setTitle('');
    setDetails('');
    setLinkedJE('');
  };

  const filteredActivities = activities.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.author.toLowerCase().includes(search.toLowerCase());
    const matchesType = eventTypeFilter === 'All types' || item.badge.toLowerCase() === eventTypeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
          Operational activity log
        </h1>
        <p className="text-xs text-[#5A6275] mt-1 font-sans">
          Events that give reviewers context for spending. Link them to ledger entries and milestones.
        </p>
      </div>

      {/* Main Grid: Left side feed (span 2) + Right side Log an event form (span 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Activities list) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
                Search
              </label>
              <input
                type="text"
                placeholder="Event, person or milestone"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 text-xs text-[#16213A] placeholder-[#5A6275]/70 shadow-ledger focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
                Event type
              </label>
              <div className="relative">
                <select
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
                >
                  <option value="All types">All types</option>
                  <option value="Field deployment">Field deployment</option>
                  <option value="Hire">Hire</option>
                  <option value="Product release">Product release</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4 pt-2">
            {filteredActivities.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3"
              >
                {/* Card Title & Meta Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F1EEE7] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-sans">
                      {item.badge}
                    </span>
                    <h3 className="font-sans font-semibold text-xs sm:text-sm text-[#16213A]">
                      {item.title}
                    </h3>
                  </div>
                  <div className="text-[11px] text-[#5A6275] font-sans shrink-0">
                    {item.date} · {item.author}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5A6275] font-sans leading-relaxed">
                  {item.description}
                </p>

                {/* Linked chips */}
                {item.linkedItems.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                    <span className="text-xs text-[#5A6275]">Linked:</span>
                    {item.linkedItems.map((chip, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#DDD8CC] text-[#16213A] text-[11px] font-mono"
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Log an event form) */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            Log an event
          </h2>

          <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
            {/* Title */}
            <div>
              <label className="block text-[#16213A] font-medium mb-1.5">
                Title
              </label>
              <input
                type="text"
                required
                placeholder="What happened?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs text-[#16213A] placeholder-[#5A6275]/70 focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            {/* Type & Date 2-col */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#16213A] font-medium mb-1.5">
                  Type
                </label>
                <div className="relative">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 pr-7 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466] cursor-pointer"
                  >
                    <option value="Hire">Hire</option>
                    <option value="Field deployment">Field deployment</option>
                    <option value="Product release">Product release</option>
                    <option value="Contract signed">Contract signed</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[#16213A] font-medium mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-[#DDD8CC] rounded-lg px-2.5 py-2 font-mono text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <label className="block text-[#16213A] font-medium mb-1.5">
                Details
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg p-2.5 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
              />
            </div>

            {/* Link ledger entries */}
            <div>
              <label className="block text-[#16213A] font-medium mb-1.5">
                Link ledger entries
              </label>
              <input
                type="text"
                placeholder="Search JE number or description"
                value={linkedJE}
                onChange={(e) => setLinkedJE(e.target.value)}
                className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs text-[#16213A] placeholder-[#5A6275]/70 focus:outline-none focus:border-[#0E6466]"
              />
              <p className="text-[11px] text-[#5A6275] mt-1 leading-normal">
                Operations Leads can link entries but not edit them
              </p>
            </div>

            {/* Milestone */}
            <div>
              <label className="block text-[#16213A] font-medium mb-1.5">
                Milestone
              </label>
              <div className="relative">
                <select
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 pr-7 text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466] cursor-pointer"
                >
                  <option value="M-3 · Pilot with 200 farmers">M-3 · Pilot with 200 farmers</option>
                  <option value="M-4 · 3 pilot sites operational">M-4 · 3 pilot sites operational</option>
                  <option value="M-2 · Prototype testing report">M-2 · Prototype testing report</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Save event button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white font-medium text-xs shadow-ledger transition text-center"
              >
                Save event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
