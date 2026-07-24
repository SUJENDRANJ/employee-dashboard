import { useState, useEffect } from "react";

function SearchFilter({
  searchText,
  setSearchText,
  statusFilter,
  setStatusFilter,
}) {
  const [localValue, setLocalValue] = useState(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(localValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [localValue]);

  return (
    <div className="border border-ink/10 dark:border-edge bg-white dark:bg-surface px-4 py-3 mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <span className="text-muted dark:text-muted-light text-sm hidden sm:block">
        &gt;
      </span>
      <input
        type="text"
        placeholder="search name or email..."
        className="bg-transparent border border-ink/20 dark:border-paper/20 px-3 py-2 flex-1 outline-none focus:border-signal text-sm text-ink dark:text-paper placeholder:text-muted dark:placeholder:text-muted-light"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />

      <select
        className="bg-transparent dark:bg-surface border border-ink/20 dark:border-paper/20 px-3 py-2 outline-none text-sm text-ink dark:text-paper focus:border-signal"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option className="text-ink" value="All">
          all status
        </option>
        <option className="text-ink" value="Active">
          active
        </option>
        <option className="text-ink" value="Inactive">
          inactive
        </option>
      </select>
    </div>
  );
}

export default SearchFilter;
