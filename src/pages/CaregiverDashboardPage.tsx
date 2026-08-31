import { useApp } from '@/context/AppContext';
import { useReminders } from '@/hooks/useReminders';
import { useMemories } from '@/hooks/useMemories';
import { usePeople } from '@/hooks/usePeople';
import { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Images,
  Users,
  BarChart3,
  Plus,
  Check,
  Clock,
  Phone,
  LogOut,
  Pill,
  Utensils,
  CalendarClock,
  PhoneCall,
  Gamepad2,
  Sparkles,
} from 'lucide-react';
import { LoadingState, ErrorState, EmptyState } from '@/components/UI';

type Tab = 'overview' | 'reminders' | 'memories' | 'people' | 'activity';

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'memories', label: 'Memories', icon: Images },
  { id: 'people', label: 'People', icon: Users },
  { id: 'activity', label: 'Activity', icon: BarChart3 },
];

const reminderTypeIcons: Record<string, typeof Pill> = {
  medicine: Pill,
  meal: Utensils,
  appointment: CalendarClock,
  call: PhoneCall,
  activity: Gamepad2,
  task: CalendarClock,
};

export function CaregiverDashboardPage() {
  const { setCaregiverMode, navigate, patientName } = useApp();
  const remindersHook = useReminders();
  const memoriesHook = useMemories();
  const peopleHook = usePeople();
  const [tab, setTab] = useState<Tab>('overview');
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);

  const { reminders, completeReminder, addReminder, loading: rLoading, error: rError, refresh: rRefresh } = remindersHook;
  const { memories, addMemory, loading: mLoading, error: mError, refresh: mRefresh } = memoriesHook;
  const { people, addPerson, loading: pLoading, error: pError, refresh: pRefresh } = peopleHook;

  const doneCount = reminders.filter((r) => r.done).length;
  const totalCount = reminders.length;
  const completionRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const handleExit = () => {
    setCaregiverMode(false);
    navigate('my-day');
  };

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="bg-white border-b border-cream-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center shrink-0">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-display font-extrabold text-ink-800 text-lg leading-tight">Helper Dashboard</p>
              <p className="text-ink-400 text-sm leading-tight">Helping {patientName} with their day</p>
            </div>
          </div>
          <button onClick={handleExit} className="btn-secondary text-base px-5 py-3">
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Back to My Day</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-base transition whitespace-nowrap ${
                  tab === id ? 'bg-honey-500 text-white shadow-warm' : 'text-ink-500 hover:bg-cream-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {tab === 'overview' && (
          <OverviewTab
            doneCount={doneCount}
            totalCount={totalCount}
            completionRate={completionRate}
            reminderCount={reminders.length}
            memoryCount={memories.length}
            peopleCount={people.length}
            setTab={setTab}
          />
        )}
        {tab === 'reminders' && (
          <RemindersTab
            reminders={reminders}
            completeReminder={completeReminder}
            showForm={showReminderForm}
            setShowForm={setShowReminderForm}
            addReminder={addReminder}
            loading={rLoading}
            error={rError}
            refresh={rRefresh}
          />
        )}
        {tab === 'memories' && (
          <MemoriesTab
            memories={memories}
            showForm={showMemoryForm}
            setShowForm={setShowMemoryForm}
            addMemory={addMemory}
            loading={mLoading}
            error={mError}
            refresh={mRefresh}
          />
        )}
        {tab === 'people' && (
          <PeopleTab
            people={people}
            showForm={showPersonForm}
            setShowForm={setShowPersonForm}
            addPerson={addPerson}
            loading={pLoading}
            error={pError}
            refresh={pRefresh}
          />
        )}
        {tab === 'activity' && <ActivityTab reminders={reminders} />}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
  return (
    <div className="card-base p-5 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-display font-extrabold text-ink-800 leading-tight">{value}</p>
        <p className="text-ink-500 text-base leading-tight">{label}</p>
      </div>
    </div>
  );
}

function OverviewTab({
  doneCount, totalCount, completionRate, reminderCount, memoryCount, peopleCount, setTab,
}: {
  doneCount: number; totalCount: number; completionRate: number;
  reminderCount: number; memoryCount: number; peopleCount: number;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="animate-fadeIn">
      <h2 className="section-title text-2xl mb-4">Today's Overview</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Check className="w-7 h-7 text-sage-600" />} label="Tasks Done" value={`${doneCount}/${totalCount}`} color="bg-sage-100" />
        <StatCard icon={<BarChart3 className="w-7 h-7 text-honey-600" />} label="Completion" value={`${completionRate}%`} color="bg-honey-100" />
        <StatCard icon={<Images className="w-7 h-7 text-coral-600" />} label="Memories" value={memoryCount} color="bg-coral-100" />
        <StatCard icon={<Users className="w-7 h-7 text-ink-600" />} label="People" value={peopleCount} color="bg-cream-200" />
      </div>

      <div className="card-base p-6 mb-6">
        <p className="font-bold text-ink-700 text-lg mb-3">Daily Progress</p>
        <div className="w-full h-6 bg-cream-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sage-400 to-sage-500 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
        </div>
        <p className="text-ink-500 text-base mt-2">{completionRate}% of today's tasks are complete.</p>
      </div>

      <h3 className="section-title text-xl mb-3">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button onClick={() => setTab('reminders')} className="card-base card-hover p-5 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-honey-100 flex items-center justify-center"><Bell className="w-6 h-6 text-honey-600" /></div>
          <div><p className="font-bold text-ink-800 text-lg">Manage Reminders</p><p className="text-ink-400 text-sm">{reminderCount} total</p></div>
        </button>
        <button onClick={() => setTab('memories')} className="card-base card-hover p-5 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-coral-100 flex items-center justify-center"><Images className="w-6 h-6 text-coral-600" /></div>
          <div><p className="font-bold text-ink-800 text-lg">Add Memories</p><p className="text-ink-400 text-sm">{memoryCount} saved</p></div>
        </button>
        <button onClick={() => setTab('people')} className="card-base card-hover p-5 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-cream-200 flex items-center justify-center"><Users className="w-6 h-6 text-ink-600" /></div>
          <div><p className="font-bold text-ink-800 text-lg">Manage People</p><p className="text-ink-400 text-sm">{peopleCount} contacts</p></div>
        </button>
      </div>
    </div>
  );
}

function RemindersTab({
  reminders, completeReminder, showForm, setShowForm, addReminder, loading, error, refresh,
}: {
  reminders: ReturnType<typeof useReminders>['reminders'];
  completeReminder: (id: string) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  addReminder: ReturnType<typeof useReminders>['addReminder'];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ReturnType<typeof useReminders>['reminders'][number]['type']>('medicine');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !time) return;
    addReminder({ title, time, description: description || title, type, icon: type === 'medicine' ? 'pill' : type === 'meal' ? 'utensils' : type === 'call' ? 'phone' : 'gamepad' });
    setTitle(''); setTime(''); setDescription(''); setType('medicine');
    setShowForm(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-2xl">Reminders</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-base px-5 py-3">
          <Plus className="w-5 h-5" />
          Add Reminder
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-base p-6 mb-6 space-y-4 animate-scaleIn">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-bold text-ink-700 mb-1.5">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Take Medicine" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-base font-bold text-ink-700 mb-1.5">Time</label>
              <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g. 9:00 AM" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none">
              <option value="medicine">Medicine</option>
              <option value="meal">Meal</option>
              <option value="appointment">Appointment</option>
              <option value="call">Call Family</option>
              <option value="activity">Activity</option>
              <option value="task">Task</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short note for the patient" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
          </div>
          <button type="submit" className="btn-success text-base px-6 py-3"><Check className="w-5 h-5" /> Save Reminder</button>
        </form>
      )}

      {loading && <LoadingState message="Loading reminders..." />}
      {error && <ErrorState message={error} onRetry={refresh} />}
      {!loading && !error && reminders.length === 0 && (
        <EmptyState icon={<Bell className="w-10 h-10" />} title="No reminders yet" message="Add a reminder to help your loved one stay on track." />
      )}

      {!loading && !error && reminders.length > 0 && (
        <div className="space-y-3">
          {reminders.map((r) => {
            const Icon = reminderTypeIcons[r.type] ?? Pill;
            return (
              <div key={r.id} className={`card-base p-4 flex items-center gap-4 ${r.done ? 'opacity-60' : ''}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${r.done ? 'bg-sage-100' : 'bg-cream-200'}`}>
                  <Icon className={`w-6 h-6 ${r.done ? 'text-sage-500' : 'text-ink-500'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-lg leading-tight ${r.done ? 'line-through text-ink-400' : 'text-ink-800'}`}>{r.title}</p>
                  <p className="text-ink-400 text-sm">{r.time} — {r.description}</p>
                </div>
                {!r.done && (
                  <button onClick={() => completeReminder(r.id)} className="btn-success text-sm px-4 py-2 shrink-0">
                    <Check className="w-4 h-4" /> Done
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MemoriesTab({
  memories, showForm, setShowForm, addMemory, loading, error, refresh,
}: {
  memories: ReturnType<typeof useMemories>['memories'];
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  addMemory: ReturnType<typeof useMemories>['addMemory'];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [caption, setCaption] = useState('');
  const [detail, setDetail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addMemory({ title, year: year || new Date().getFullYear().toString(), description: description || title, image: 'family-wedding', caption: caption || `This is ${title}`, detail: detail || description });
    setTitle(''); setYear(''); setDescription(''); setCaption(''); setDetail('');
    setShowForm(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-2xl">Memories</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-base px-5 py-3">
          <Plus className="w-5 h-5" /> Add Memory
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-base p-6 mb-6 space-y-4 animate-scaleIn">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-bold text-ink-700 mb-1.5">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Priya's Wedding" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-base font-bold text-ink-700 mb-1.5">Year</label>
              <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2018" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short summary" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Caption (shown to patient)</label>
            <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. This is your daughter Priya ❤️" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Detail (story)</label>
            <textarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="A longer description of the memory" rows={3} className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none resize-none" />
          </div>
          <button type="submit" className="btn-success text-base px-6 py-3"><Check className="w-5 h-5" /> Save Memory</button>
        </form>
      )}

      {loading && <LoadingState message="Loading memories..." />}
      {error && <ErrorState message={error} onRetry={refresh} />}
      {!loading && !error && memories.length === 0 && (
        <EmptyState icon={<Images className="w-10 h-10" />} title="No memories yet" message="Add a memory to help your loved one revisit special moments." />
      )}

      {!loading && !error && memories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {memories.map((m) => (
            <div key={m.id} className="card-base overflow-hidden">
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-honey-200 to-honey-400 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-honey-700" />
              </div>
              <div className="p-4">
                <p className="font-bold text-ink-800 text-lg leading-tight">{m.title}</p>
                <p className="text-ink-400 text-sm">{m.year}</p>
                <p className="text-ink-500 text-sm mt-1">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PeopleTab({
  people, showForm, setShowForm, addPerson, loading, error, refresh,
}: {
  people: ReturnType<typeof usePeople>['people'];
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  addPerson: ReturnType<typeof usePeople>['addPerson'];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [info, setInfo] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addPerson({ name, relationship: relationship || 'Family', image: 'priya', info: info || `${name} is important to you.`, phone: phone || 'N/A' });
    setName(''); setRelationship(''); setInfo(''); setPhone('');
    setShowForm(false);
  };

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title text-2xl">Important People</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-base px-5 py-3">
          <Plus className="w-5 h-5" /> Add Person
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card-base p-6 mb-6 space-y-4 animate-scaleIn">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-base font-bold text-ink-700 mb-1.5">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-base font-bold text-ink-700 mb-1.5">Relationship</label>
              <input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="e.g. Your Daughter" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Info (shown to patient)</label>
            <textarea value={info} onChange={(e) => setInfo(e.target.value)} placeholder="Simple information about this person" rows={3} className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none resize-none" />
          </div>
          <div>
            <label className="block text-base font-bold text-ink-700 mb-1.5">Phone Number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +91 98XXX XXX21" className="w-full rounded-xl border-2 border-cream-300 bg-white px-4 py-3 text-base focus:border-honey-400 focus:outline-none" />
          </div>
          <button type="submit" className="btn-success text-base px-6 py-3"><Check className="w-5 h-5" /> Save Person</button>
        </form>
      )}

      {loading && <LoadingState message="Loading people..." />}
      {error && <ErrorState message={error} onRetry={refresh} />}
      {!loading && !error && people.length === 0 && (
        <EmptyState icon={<Users className="w-10 h-10" />} title="No people added yet" message="Add an important person to help your loved one recognize family and friends." />
      )}

      {!loading && !error && people.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((p) => (
            <div key={p.id} className="card-base overflow-hidden">
              <div className="w-full aspect-square bg-gradient-to-br from-sage-200 to-cream-200 flex items-center justify-center">
                <Users className="w-12 h-12 text-sage-600" />
              </div>
              <div className="p-4">
                <p className="font-bold text-ink-800 text-lg leading-tight">{p.name}</p>
                <p className="text-honey-600 text-sm font-bold">{p.relationship}</p>
                <p className="text-ink-500 text-sm mt-1 line-clamp-2">{p.info}</p>
                <p className="text-ink-400 text-sm mt-1 flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {p.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityTab({ reminders }: { reminders: ReturnType<typeof useReminders>['reminders'] }) {
  const done = reminders.filter((r) => r.done);
  const pending = reminders.filter((r) => !r.done);

  return (
    <div className="animate-fadeIn">
      <h2 className="section-title text-2xl mb-4">Patient Activity</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <h3 className="font-bold text-ink-700 text-lg mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-sage-600" /> Completed Tasks
          </h3>
          {done.length === 0 ? (
            <p className="text-ink-400 text-base">No tasks completed yet today.</p>
          ) : (
            <div className="space-y-2">
              {done.map((r) => (
                <div key={r.id} className="flex items-center gap-3 p-3 bg-sage-50 rounded-xl">
                  <Check className="w-5 h-5 text-sage-600 shrink-0" />
                  <div><p className="font-bold text-ink-700 text-base">{r.title}</p><p className="text-ink-400 text-sm">{r.time}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-base p-6">
          <h3 className="font-bold text-ink-700 text-lg mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-honey-600" /> Pending Tasks
          </h3>
          {pending.length === 0 ? (
            <p className="text-ink-400 text-base">All tasks are done! ⭐</p>
          ) : (
            <div className="space-y-2">
              {pending.map((r) => (
                <div key={r.id} className="flex items-center gap-3 p-3 bg-honey-50 rounded-xl">
                  <Clock className="w-5 h-5 text-honey-600 shrink-0" />
                  <div><p className="font-bold text-ink-700 text-base">{r.title}</p><p className="text-ink-400 text-sm">{r.time}</p></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
