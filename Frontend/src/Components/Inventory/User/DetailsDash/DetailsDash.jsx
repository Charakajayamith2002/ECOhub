import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Admin/Admin.css";
import "../User.css";
import { Link } from "react-router-dom";

const URL = "http://localhost:4000/community";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DetailsDash() {
  const [inven, setInven] = useState([]);
  const [filteredInven, setFilteredInven] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data on component mount
    fetchHandler().then((data) => {
      setInven(data.inven);
      setFilteredInven(data.inven); // Initially, filteredInven is the same as inven
    });
  }, []);

  useEffect(() => {
    // Perform search whenever searchQuery changes
    if (searchQuery === "") {
      // If search query is empty, show all items
      setFilteredInven(inven);
      setNoResults(false);
    } else {
      const filtered = inven.filter((item) =>
        [item.title, item.uname].some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredInven(filtered);
      setNoResults(filtered.length === 0);
    }
  }, [searchQuery, inven]); // Depend on searchQuery and inven

  const handleMoreDetails = (item) => {
    navigate(`/moreDetails`, { state: { item } });
  };

  return (
    <div className="container mx-auto p-6 mb-40 mt-10">
      <div className="flex justify-between mx-16">
        <h1 className="mt-12 text-2xl font-semibold"><span className="text-green-500">Community</span> Articles</h1>
      <Link to="/inventory">
      <div className="flex justify-center align-middle mt-10">
        <button className="px-5 py-2 bg-green-500 rounded-lg font-bold">My posts</button>
      </div>
      </Link>
      </div>
      {/* Search Bar */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, title, or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          className="mt-20 mb-20"
        />
      </div>

      <div>
        {noResults ? (
          <div>
            <br />
            <h1 className="con_topic">
              No <span className="clo_us">Results Found</span>
            </h1>
          </div>
        ) : (
          <div className="flex flex-row gap-x-20 ml-20 gap-y-20 flex-wrap">
            {filteredInven.map((item, index) => (
              <div
                key={index}
                className="shadow-[0_0_10px_0_rgba(0,0,0,0.12)] rounded-lg overflow-hidden w-[400px] h-auto py-5"
                style={{ textAlign: "center" }}
              >
                <p className="itm_card_details pb-4">
                  <b></b> <span className="font-sans text-[20px] font-semibold ">{item.title}</span>
                </p>

                {/* Image should take full width */}
                <div className="flex justify-center">
                  <img
                    src={item.imgurl}
                    alt="img"
                    className="w-full h-[250px] object-cover"
                  />
                </div>

                <p className="itm_card_details">
                  <b></b> <span className="text-lg mt-5">{item.disc}</span>
                </p>
                <h3 className="name_itm_price" style={{ fontSize: "28px" }}>
                  <span className="text-lg font-bold text-gray-600">Article by: {item.uname}</span>
                </h3>

                <div>
                  <button
                    onClick={() => handleMoreDetails(item)}
                    style={{
                      padding: "8px 16px",
                      fontSize: "14px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsDash;
