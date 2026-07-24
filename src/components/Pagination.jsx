function Pagination({ currentPage, totalPages, setCurrentPage }) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center gap-1 mt-4 text-xs tracking-wide">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-ink/20 dark:border-edge text-paper/80 bg-ink dark:bg-surface2 disabled:opacity-30"
      >
        PREV
      </button>

      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setCurrentPage(num)}
          className={`px-3 py-1 border transition-colors ${
            currentPage === num
              ? "bg-signal border-signal text-ink font-semibold"
              : "bg-white dark:bg-surface border-ink/20 dark:border-edge text-ink dark:text-paper hover:border-signal"
          }`}
        >
          {String(num).padStart(2, "0")}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-ink/20 dark:border-edge text-paper/80 bg-ink dark:bg-surface2 disabled:opacity-30"
      >
        NEXT
      </button>
    </div>
  );
}

export default Pagination;
