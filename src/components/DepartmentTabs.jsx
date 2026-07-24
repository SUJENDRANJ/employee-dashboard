// "punch card" index tab strip used to filter by department
// horizontal strip that sits right after the search input
function DepartmentTabs({
  departments,
  departmentFilter,
  setDepartmentFilter,
}) {
  const tabs = ["All", ...departments];

  return (
    <div className="mb-4">
      <p className="text-muted dark:text-muted-light text-xs tracking-widest mb-2 px-1">
        INDEX
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((tab) => {
          const isActive = departmentFilter === tab;
          return (
            <button
              key={tab}
              onClick={() => setDepartmentFilter(tab)}
              className={`relative flex items-center gap-2 text-left px-3 py-2 text-xs tracking-wide whitespace-nowrap border-l-4 transition-colors ${
                isActive
                  ? "bg-white dark:bg-surface2 text-ink dark:text-paper border-signal font-semibold"
                  : "bg-white/60 dark:bg-surface text-ink/60 dark:text-paper/60 border-transparent hover:border-muted dark:hover:border-muted-light hover:text-ink dark:hover:text-paper"
              }`}
            >
              {/* punch hole */}
              <span
                className={`w-2 h-2 rounded-full border ${
                  isActive
                    ? "border-ink dark:border-paper bg-signal"
                    : "border-ink/30 dark:border-paper/30"
                }`}
              ></span>
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DepartmentTabs;
