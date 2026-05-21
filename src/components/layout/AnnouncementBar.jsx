function AnnouncementBar() {
  return (
    <div className="w-full bg-secondary-2 text-light-text py-3">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-10 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex gap-4 flex-wrap justify-center sm:justify-start">
          <span className="flex items-center gap-2">
            📞 (225) 555-0118
          </span>
          <span className="flex items-center gap-2">
            ✉️ contact@company.com
          </span>
        </div>
        <span>Follow Us and get a chance to win 80% off</span>
        <div className="flex gap-3">
          <span className="cursor-pointer hover:opacity-80">f</span>
          <span className="cursor-pointer hover:opacity-80">T</span>
          <span className="cursor-pointer hover:opacity-80">in</span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;