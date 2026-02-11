import { Search } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const searchPlaceholders: Record<string, string> = {
  '/dashboard': 'Search',
  '/dashboard/chats': 'Search Chat',
  '/dashboard/skills': 'Search Skill',
  '/dashboard/learn': 'Search Course',
  '/dashboard/discover': 'Discover',
}

export function TopBar() {
  const location = useLocation()
  const placeholder = searchPlaceholders[location.pathname] || 'Search'

  return (
    <header className="flex h-21 shrink-0 items-center justify-between rounded-2xl bg-gray-100 px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-4xl bg-white py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10"
        />
      </div>

      {/* Profile section */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="h-10 w-10 rounded-full bg-pink-100" />
        <div className="h-11 w-11 rounded-full bg-linear-to-br from-pink-300 to-rose-400" />
        <div className="ml-1 text-right">
          <p className="text-sm font-semibold text-gray-900">Totok Michael</p>
          <p className="text-xs text-gray-400">tmichael20@mail.com</p>
        </div>
      </div>
    </header>
  )
}
