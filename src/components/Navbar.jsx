'use client'

import { useState } from "react";

function Navbar({ games, setFilterGames }) {
  const [serchQuery, setSerchQuery] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setSerchQuery(e.target.value);
    const list = e.target.value && games.filter(game => game.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilterList(list);
  }

  const handleSearch = () => {
    const list = games.filter(game => game.title.toLowerCase().includes(serchQuery.toLowerCase()));
    setFilterGames(list);
  }

  const handleSuggestionClick = (title) => {
    setSerchQuery(title);
    setFilterList([]);
    setIsFocused(false);
  }

  return (
    <nav className="navbar bg-[#003f5c] p-4 flex justify-between items-center">
      <h1 className="font-bold text-[2rem] font-serif text-[#d1dbe4] pl-[40px]">GameHub</h1>
      <div className="searchbar relative">
        <input
          type="text"
          placeholder="Search Games"
          className="p-2 rounded-md"
          value={serchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button className="bg-[#bc5090] text-white p-2 ml-2 rounded-md" onClick={handleSearch}>Search</button>
        <div className={`suggestion bg-gray-200 w-full mt-1 rounded-md max-h-[200px] overflow-y-auto ${!isFocused || filterList.length === 0 ? "hidden" : "absolute"}`}>
          <ul className="text-gray-700 flex flex-col gap-2 p-1">
            {filterList && filterList.map((game, index) => (
              <li key={index} className="p-2 rounded-md bg-gray-100 cursor-pointer" onMouseDown={() => handleSuggestionClick(game.title)}>
                {game.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
