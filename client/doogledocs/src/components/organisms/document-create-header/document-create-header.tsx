import Logo from "../../atoms/logo";
import SearchBar from "../../atoms/searchbar"
import UserDropDown from "../../atoms/user-dropdown"

const DocumentCreateHeader = () => {
  return (
    <div className="w--full px-3 py-1 flex justify-between items-center">
      <Logo />
      <SearchBar />
      <UserDropDown />
    </div>
  )
}

export default DocumentCreateHeader;