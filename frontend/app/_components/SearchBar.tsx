export default function SearchBar() {
  return (
    <div className="flex">
      <img src="/assets/images/searchnormal1.svg" width="20px" alt="Search" />
      <input
        type="text"
        className="outline-none border-none rounded-xl px-6 flex-grow text-[#98a1a1] bg-white font-Montserrat"
        placeholder="Search..."
      />
    </div>
  );
}
