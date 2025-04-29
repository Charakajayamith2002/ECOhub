import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "../Admin.css";
import { useSelector } from "react-redux";

const URL = "http://localhost:4000/community";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DashBoard() {
  const [inven, setInven] = useState([]);
  const [filteredInven, setFilteredInven] = useState([]); // For storing filtered results
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    fetchHandler().then((data) => {
      setInven(data.inven);
      setFilteredInven(data.inven.filter(item => item.userId == user._id)); // Initially, set filtered data as the original data
    });
  }, []);

  const history = useNavigate();
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this Details?");
    if (confirmed) {
      try {
        await axios.delete(`${URL}/${_id}`);
        window.alert("Details deleted successfully!");
        history("/inventory");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting details:", error);
      }
    }
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Details Report",
    onafterprint: () => alert("Details Report Successfully Downloaded!"),
  });

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = inven.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredInven(filtered);
      setNoResults(filtered.length === 0);
    } else {
      setFilteredInven(inven); // Reset to the original data if the search query is empty
      setNoResults(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mb-40 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Community</h2>

        <Link to="/additem">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            className="mt-14 mb-15"
          >
            Add item
          </button>
        </Link>
      </div>
      <table className="min-w-full bg-white border border-black shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-800 text-white">
    <tr>
      <th className="py-4 px-6 font-semibold">Title</th>
      <th className="py-4 px-6 font-semibold">Image</th>
      <th className="py-4 px-6 font-semibold">Description</th>
      <th className="py-4 px-6 font-semibold">Pest and Diseases</th>
      <th className="py-4 px-6 font-semibold">Fertilizers</th>
      <th className="py-4 px-6 font-semibold">Challenges Faced</th>
      <th className="py-4 px-6 font-semibold">Work Done & Future Plans</th>
      <th className="py-4 px-6 font-semibold">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredInven.map((item, index) => (
      <tr key={index} className="border-t border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-4">{item.title}</td>
        <td className="py-3 px-4">
          <img src={item.imgurl} alt="img" className="img_admin_tbl" />
        </td>
        <td className="py-3 px-4">{item.disc}</td>
        <td className="py-3 px-4">{item.pest}</td>
        <td className="py-3 px-4">{item.fertilizer}</td>
        <td className="py-3 px-4">{item.challenge}</td>
        <td className="py-3 px-4">{item.work}</td>
        <td className="py-3 px-4">
  <button onClick={() => deleteHandler(item._id)} className="bg-black text-green-400 py-1 mr-1 px-4 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out">
    Delete
  </button>
  <Link to={`/updateitem/${item._id}`} className="bg-black text-green-400 py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out">
    Update
  </Link>
</td>

      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default DashBoard;