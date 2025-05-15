import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    if (searchText.trim()) {
      try {
        const response = await fetch('http://localhost:5000/search-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: searchText }),
        });
        const data = await response.json();

        if (data.success) {
          alert(`User Found: ${data.name}`);
          console.log("Search result user data:", data);
          onSearch(data);  // pass entire user object to parent
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while searching.');
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for users by email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// //

// const SearchBar = ({ onSearch }) => {
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();

//  const handleSearch = async () => {
//   if (searchText.trim()) {
//     try {
//       const response = await fetch('http://localhost:5000/search-user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: searchText }),
//       });
//       const data = await response.json();
      
//       if (data.success) {
//         alert(`User Found: ${data.name}`);
//         //navigate(`/chatpage/${data.name}`);  // <-- check this line
//         onSearch(data);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while searching.');
//    }
//   }
// };


//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for users by email..."
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default SearchBar;
