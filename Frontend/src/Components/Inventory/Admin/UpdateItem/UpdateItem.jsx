import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

import "../Admin.css";

function UpdateItem() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/community/${id}`
        );
        setInputs(response.data.inven);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:4000/community/${id}`, {
        uname: String(inputs.uname),         
        title: String(inputs.title),          
        imgurl: String(inputs.imgurl),
        disc: String(inputs.disc),
        fertilizer: String(inputs.fertilizer),
        pest: String(inputs.pest),
        pestcontral: String(inputs.pestcontral),
        challenge: String(inputs.challenge),
        work: String(inputs.work),
      });
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    window.alert("Update successfully!");
    history("/inventory"); // Redirect after successful update
  };

  return (
    <div>
      <div className="children_div_admin">
        <h1 className="topic_inventory">
          Update Community Details <span className="sub_topic_inventory"> </span>
        </h1>
        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>

            <label className="form_box_item_lable">User's Name</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.uname || ""}
              onChange={handleChange}
              name="uname"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Title</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.title || ""}
              onChange={handleChange}
              name="title"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Add Image</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.imgurl || ""}
              onChange={handleChange}
              name="imgurl"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Plant Description</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.disc || ""}
              onChange={handleChange}
              name="disc"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Plant fertilizes</label>
            <br></br>
            <input
              style={{ width: "95%", height: "50px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.fertilizer || ""}
              onChange={handleChange}
              name="fertilizer"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Pest and Disease Information</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.pest || ""}
              onChange={handleChange}
              name="pest"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Pest Control Methods</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.pestcontral || ""}
              onChange={handleChange}
              name="pestcontral"
              required
            />
            <br></br>

            <label className="form_box_item_lable">Challenges Faced</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.challenge || ""}
              onChange={handleChange}
              name="challenge"
              required
            />
            <br></br>

            <label className="form_box_item_lable">How the work done and Future Plans</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.work || ""}
              onChange={handleChange}
              name="work"
              required
            />
            <br></br>

            <button type="submit" className="admin_form_cneter_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateItem;