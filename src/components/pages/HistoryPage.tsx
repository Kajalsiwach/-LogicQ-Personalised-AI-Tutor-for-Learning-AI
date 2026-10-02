import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, BookOpen, PenSquare, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { userState, setActivePage } = useApp();
  const { recentActivities } = userState;

  const [filterType, setFilterType] = useState<string>('All');
  const [query, setQuery] = useState<string>('');

  const filteredHistory = recentActivities.filter(item => {
    const matchesFilter =
      filterType === 'All' ||
      (filterType === 'Lesson' && item.type === 'lesson') ||
      (filterType === 'Quiz' && item.type === 'quiz') ||
      (filterType === 'Practice' && item.type === 'practice');

    const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#E598AC]">
          Activity Timeline
        </span>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
          LEARNING HISTORY
        </h1>
        <p className="font-editorial italic text-slate-300 text-sm sm:text-base mt-1">
          Complete archive of study sessions, assessments, and practice drills.
        </p>
      </div>

      {recentActivities.length === 0 ? (
        /* Genuine Empty State */
        <div className="clay-card-light p-10 sm:p-14 text-center text-[#181B28] space-y-4 max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-3xl bg-[#7E2948]/12 text-[#7E2948] flex items-center justify-center mx-auto">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-[#181B28] mb-1.5">
              No learning sessions completed yet
            </h3>
            <p className="font-editorial italic text-slate-600 text-base max-w-md mx-auto leading-relaxed">
              Complete your first lesson or practice session to build your learning history.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('learn')}
              className="clay-btn-plum px-7 py-3 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer group shadow-lg"
            >
              <span>Start First Lesson</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Type Filter Pills */}
            <div className="glass-card-dark p-1 rounded-2xl flex items-center border border-white/10 overflow-x-auto">
              {['All', 'Lesson', 'Quiz'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterType(tab)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    filterType === tab ? 'clay-pill-active font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search past activities..."
                className="glass-pill pl-9 pr-4 py-2 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E598AC]/50 w-full sm:w-64"
              />
            </div>
          </div>

          {/* History Items List */}
          <div className="space-y-3">
            {filteredHistory.map(record => (
              <div
                key={record.id}
                className="glass-card-dark p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {record.type === 'lesson' ? (
                      <BookOpen className="w-5 h-5 text-[#F5CAD6]" />
                    ) : (
                      <PenSquare className="w-5 h-5 text-sky-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm text-white">
                        {record.title}
                      </h4>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                        {record.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      <span>{record.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  {record.score && (
                    <span className="text-xs font-bold text-[#F5CAD6] bg-[#7E2948]/20 border border-[#E598AC]/20 px-2.5 py-1 rounded-lg">
                      {record.score}
                    </span>
                  )}
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
