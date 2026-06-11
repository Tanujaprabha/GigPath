const iconMap = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="11" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="17.5" width="7" height="3" rx="1.5" />
    </>
  ),
  finance: (
    <>
      <path d="M4 7.5h16" />
      <path d="M4 12h16" />
      <path d="M4 16.5h10" />
      <rect x="3" y="4" width="18" height="16" rx="3" />
    </>
  ),
  insights: (
    <>
      <path d="M5 17.5 10 11l3.25 3.25L19 7.5" />
      <path d="M15.5 7.5H19v3.5" />
      <path d="M4 20.5h16" />
    </>
  ),
  goals: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m12 12 4-4" />
      <path d="M12 7.5v5" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3.5 14.2 8l4.8.7-3.5 3.4.8 4.8L12 14.6 7.7 16.9l.8-4.8L5 8.7 9.8 8z" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c1.3-3 4.1-4.5 7-4.5S17.7 16 19 19" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  money: (
    <>
      <path d="M3 7.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3.5 2" />
      <path d="M3 16.5c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 3.5 2" />
      <path d="M5 5.5v13" />
      <path d="M19 5.5v13" />
    </>
  ),
  expense: (
    <>
      <path d="M5 19 19 5" />
      <path d="M7 7h12v12" />
    </>
  ),
  savings: (
    <>
      <path d="M6 9.5 12 4l6 5.5V19a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19z" />
      <path d="M10 13h4" />
      <path d="M12 11v4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5 13.8 8.2 18.5 10 13.8 11.8 12 16.5 10.2 11.8 5.5 10l4.7-1.8z" />
      <path d="M18.5 4.5 19.5 7 22 8l-2.5 1-1 2.5-1-2.5L15 8l2.5-1z" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 7h3v3" />
      <path d="M7 17H4v-3" />
      <path d="M20 10a6 6 0 0 0-10-3" />
      <path d="M4 14a6 6 0 0 0 10 3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M7.5 3.5v4" />
      <path d="M16.5 3.5v4" />
      <path d="M3.5 9.5h17" />
    </>
  ),
  chat: (
    <>
      <path d="M6 18.5 3.5 20v-12A2.5 2.5 0 0 1 6 5.5h12A2.5 2.5 0 0 1 20.5 8v7A2.5 2.5 0 0 1 18 17.5H9z" />
      <path d="M8 10h8" />
      <path d="M8 13h5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3.5v2.2" />
      <path d="M12 18.3v2.2" />
      <path d="m18 6-1.5 1.5" />
      <path d="m7.5 16.5-1.5 1.5" />
      <path d="M20.5 12h-2.2" />
      <path d="M5.7 12H3.5" />
      <path d="m18 18-1.5-1.5" />
      <path d="M7.5 7.5 6 6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 18.5 6v5.3c0 4-2.5 7.2-6.5 9.2-4-2-6.5-5.2-6.5-9.2V6z" />
      <path d="m9.2 12 1.8 1.8 3.8-4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.8 9.2a2.4 2.4 0 1 1 4 1.8c-.9.7-1.8 1.2-1.8 2.5" />
      <circle cx="12" cy="16.8" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  edit: (
    <>
      <path d="m4 20 4.5-1 8.8-8.8-3.5-3.5L5 15.5z" />
      <path d="m12.8 6.8 3.5 3.5" />
    </>
  ),
  arrowLeft: <path d="m14.5 6.5-5 5.5 5 5.5M9.5 12h10" />,
  logout: (
    <>
      <path d="M9 4H6.5A2.5 2.5 0 0 0 4 6.5v11A2.5 2.5 0 0 0 6.5 20H9" />
      <path d="m14 8 4 4-4 4" />
      <path d="M9 12h9" />
    </>
  ),
  arrowUpRight: <path d="M8 16 16 8M10 8h6v6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 1.8" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12 2.3 2.3 4.8-5" />
    </>
  ),
  alert: (
    <>
      <path d="m12 4 8 14H4z" />
      <path d="M12 9v4.2" />
      <circle cx="12" cy="16.6" r=".8" fill="currentColor" stroke="none" />
    </>
  ),
  notifications: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconMap[name] || iconMap.spark}
    </svg>
  )
}
