import { useState } from "react"
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [isFocused, setIsFocued] = useState<boolean>(false);

  return (
    <div className={`${isFocused ? 'bg-white shadow-xl' : 'bg-gray-100'} w-full max-w-2xl rounded-md h-12 flex items-center text-gray-500 mr-4`}>
      <div className="flex justify-center px-4">
        <FaSearch className="w-6 h-6" />
      </div>
      <input
        onFocus={() => setIsFocued(true)}
        onBlur={() => setIsFocued(false)}
        type="text"
        className={`${isFocused ? 'bg-white' : 'bg0gray-100'} w-full h-full pr-4 font-medium`}
        placeholder="Search"
        name=""
        id=""
      />
    </div>
  )
}

export default SearchBar;