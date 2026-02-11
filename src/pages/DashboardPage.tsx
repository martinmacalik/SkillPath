import { ArrowUpRight, Plus, Pin } from 'lucide-react'

/* ── helpers ── */

const progressData = [
  { day: 'M', height: 55, color: '#8B5CF6', striped: false },
  { day: 'T', height: 68, color: '#7C3AED', striped: false },
  { day: 'W', height: 78, color: '#EC4899', striped: false },
  { day: 'T', height: 48, color: '#A78BFA', striped: false },
  { day: 'F', height: 42, color: '#C4B5FD', striped: true },
  { day: 'S', height: 38, color: '#C4B5FD', striped: true },
  { day: 'S', height: 28, color: '#C4B5FD', striped: true },
]

const chatContacts = [
  { name: 'Peter Vivaldi', color: '#F9A8D4', time: '14:52', message: 'Good Job!' },
  { name: 'John Beaver', color: '#86EFAC', time: '14:52', message: 'Good Job!' },
  { name: 'Anna Gray', color: '#BAE6FD', time: '14:52', message: 'Good Job!' },
  { name: 'John Steven', color: '#C4B5FD', time: '14:52', message: 'Good Job!' },
]

/* ── stripe pattern for projected bars ── */
const stripePattern =
  'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.45) 3px, rgba(255,255,255,0.45) 6px)'

/* ── page ── */

export default function DashboardPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      {/* ── Header ── */}
      <div className="flex shrink-0 items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1.5 text-base text-gray-500">
            Plan, prioritize and accomplish your skill.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl bg-purple-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-800">
            <Plus className="h-4 w-4" />
            Add project
          </button>
          <button className="rounded-xl bg-purple-50 px-6 py-3 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-100">
            Import Data
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid shrink-0 grid-cols-4 gap-5" style={{ height: 'clamp(120px, calc((100% - 4rem) * 0.25), 180px)' }}>
        {/* Total Skills – accent card */}
        <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-indigo-900 to-fuchsia-700 p-6 text-white">
          <div className="flex items-start justify-between">
            <p className="text-m font-medium text-purple-100">Total Skills</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-6xl font-medium leading-none">56</p>
            <span className="mb-1 rounded-md border-1 border-solid border-pink-300 px-1.5 py-0.5 text-xs font-medium text-pink-300">
              6+
            </span>
          </div>
          <p className="text-m text-purple-200">Skills Learned</p>
        </div>

        <StatCard title="Day Streak" value="14" badge="2+" badgeLabel="Increased from last month" />
        <StatCard title="Skills Learning" value="4" badge="0+" badgeLabel="Increased from last month" />
        <StatCard title="New Chats" value="13" badge="3+" badgeLabel="From Peter" />
      </div>

      {/* ── Rows 2 & 3 Combined – Custom Asymmetric Grid ── */}
      <div
        className="grid flex-1 grid-cols-6 gap-5"
        style={{ gridTemplateRows: '4fr 1fr 1fr 4fr' }}
      >
        {/* Learning Progress: rows 1-2, cols 1-3 */}
        <div className="col-span-3 col-start-1 row-start-1 flex flex-col rounded-2xl bg-white p-6" style={{ gridRow: '1 / 3' }}>
          <h3 className="text-base font-semibold text-gray-900">Learning Progress</h3>
          <div className="flex flex-1 items-end justify-around gap-3 px-2 pb-4">
            {progressData.map((bar, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 rounded-t-full transition-all"
                  style={{
                    height: `${bar.height}%`,
                    backgroundColor: bar.color,
                    backgroundImage: bar.striped ? stripePattern : 'none',
                  }}
                />
                <span className="text-sm font-semibold text-purple-500">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders: rows 1-2, cols 4-5 */}
        <div className="col-span-2 col-start-4 flex flex-col rounded-2xl bg-white p-6" style={{ gridRow: '1 / 3' }}>
          <h3 className="text-base font-semibold text-gray-900">Reminders</h3>
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-400">No reminders yet</p>
          </div>
        </div>

        {/* Skills Learning: rows 1-3, col 6 (extends 1 sub-row past Reminders) */}
        <div className="col-span-1 col-start-6 flex flex-col rounded-2xl bg-white p-6" style={{ gridRow: '1 / 4' }}>
          <h3 className="text-base font-semibold text-gray-900">Skills Learning</h3>
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-400">No active skills</p>
          </div>
        </div>

        {/* Chats: rows 3-4, cols 1-2 (narrower than Learning Progress) */}
        <div className="col-span-2 col-start-1 flex flex-col rounded-2xl bg-white p-6" style={{ gridRow: '3 / 5' }}>
          <div className="flex shrink-0 items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Chats</h3>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-200">
              Edit
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
            {chatContacts.map((contact) => (
              <div
                key={contact.name}
                className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50"
              >
                {/* avatar */}
                <div
                  className="h-11 w-11 shrink-0 rounded-full"
                  style={{ backgroundColor: contact.color }}
                />
                {/* info */}
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{contact.name}</span>
                  <span className="rounded-md bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {contact.time}
                  </span>
                  <span className="truncate text-xs text-gray-400">{contact.message}</span>
                </div>
                {/* pin */}
                <Pin className="h-4 w-4 shrink-0 text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Skill: rows 3-4, cols 3-5 (extends left to fill gap) */}
        <div className="col-span-3 col-start-3 flex flex-col rounded-2xl bg-white p-6" style={{ gridRow: '3 / 5' }}>
          <h3 className="text-base font-semibold text-gray-900">Pinned Skill</h3>
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-gray-400">No pinned skill</p>
          </div>
        </div>

        {/* Time Tracker: row 4 only, col 6 (bottom aligns with Chats/Pinned Skill) */}
        <div className="col-span-1 col-start-6 flex flex-col justify-end rounded-2xl bg-gradient-to-br from-indigo-900 to-fuchsia-700 p-6" style={{ gridRow: '4 / 5' }}>
          <p className="text-2xl font-bold text-white">Time Tracker</p>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function StatCard({
  title,
  value,
  badge,
  badgeLabel,
}: {
  title: string
  value: string
  badge: string
  badgeLabel: string
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-6">
      <div className="flex items-start justify-between">
        <p className="text-m font-medium text-gray-500">{title}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <ArrowUpRight className="h-5 w-5 text-gray-400" />
        </span>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-6xl font-medium text-gray-900">{value}</p>
        <span className="mb-1 rounded-md border-1 border-solid border-purple-400 px-1.5 py-0.5 text-xs font-medium text-purple-500">
          {badge}
        </span>
      </div>
      <p className="text-m text-gray-400">{badgeLabel}</p>
    </div>
  )
}
