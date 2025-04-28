import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../Admin.css";
import { useSelector } from "react-redux";

function Additem() {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user)
  const [inputs, setInputs] = useState({
    
    
    title: "",
    imgurl: "",
    disc: "",
    fertilizer: "",
    work: "",
    pest:"",
    pestcontral:"",
    challenge:"",
   
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

   
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any errors before submission
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please fix the validation errors before submitting.");
      return;
    }

    console.log(inputs);
    await sendRequest();
    window.alert("added successfully!");
    navigate("/inventory");
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:4000/community", {
      disc: inputs.disc,
      fertilizer: inputs.fertilizer,
      work: inputs.work,
      uname: user.name,
      title: inputs.title,
      imgurl: inputs.imgurl,
      pest:inputs.pest,
      pestcontral:inputs.pestcontral,
      challenge:inputs.challenge,
      userId: user._id,
    });
  };

  return (
    <div>
      <div className="children_div_admin">
        <h1 className="topic_inventory">
          Add Community Details <span className="sub_topic_inventory"> </span>
        </h1>

        <div className="item_full_box">
          <form className="item_form_admin" onSubmit={handleSubmit}>
            
            <label className="form_box_item_lable">Title</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              value={inputs.title}
              onChange={handleChange}
              name="title"
              required
            />
            {errors.title && <p className="error">{errors.title}</p>}
            <br></br>

            <label className="form_box_item_lable">Add Image</label>
            <br></br>
            <input
              className="form_box_item_input"
              type="text"
              required
              value={inputs.imgurl}
              onChange={handleChange}
              name="imgurl"
            />
            <br></br>

            <label className="form_box_item_lable">Plant Description</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.disc}
              onChange={handleChange}
              name="disc"
              required
            />
            {errors.disc && <p className="error">{errors.disc}</p>}
            <br></br>

            <label className="form_box_item_lable">Plant fertilizes</label>
            <br></br>
            <input
              style={{ width: "95%", height: "50px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.fertilizer}
              onChange={handleChange}
              name="fertilizer"
              required
            />
            {errors.fertilizer && <p className="error">{errors.fertilizer}</p>}
            <br></br>

            <label className="form_box_item_lable">Pest and Disease Information</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.pest}
              onChange={handleChange}
              name="pest"
              required
            />
            {errors.work && <p className="error">{errors.pest}</p>}
            <br></br>

            <label className="form_box_item_lable">Pest Control Methods</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.pestcontral}
              onChange={handleChange}
              name="pestcontral"
              required
            />
            {errors.work && <p className="error">{errors.work}</p>}
            <br></br>

            <label className="form_box_item_lable">Challenges Faced</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.challenge}
              onChange={handleChange}
              name="challenge"
              required
            />
            {errors.work && <p className="error">{errors.challenge}</p>}
            <br></br>

            <label className="form_box_item_lable">How the work done and Future Plans</label>
            <br></br>
            <input
              style={{ width: "95%", height: "80px", fontSize: "16px" }}
              className="form_box_item_input"
              type="text"
              value={inputs.work}
              onChange={handleChange}
              name="work"
              required
            />
            {errors.work && <p className="error">{errors.work}</p>}
            <br></br>

            <button type="submit" className="admin_form_cneter_btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Additem;