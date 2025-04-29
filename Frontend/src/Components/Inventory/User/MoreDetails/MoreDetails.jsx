import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

function MoreDetails() {
  const location = useLocation();
  const { item } = location.state;

  const generatePDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const marginLeft = 40; // Adjust margins
    const marginTop = 30; // Adjust margin from top
    const imageHeight = 200;

    // Add Title
    doc.setFontSize(24);
    doc.setTextColor(40);
    doc.setFont(undefined, "bold");
    doc.text(item.title, marginLeft, marginTop);

    // Add User Information
    doc.setFontSize(12);
    doc.setFont(undefined, "normal");
    doc.text(`By: ${item.uname}`, marginLeft, marginTop + 30);

    // Add Image (if it exists)
    if (item.imgurl) {
      doc.addImage(item.imgurl, "JPEG", marginLeft, marginTop + 50, pageWidth - 2 * marginLeft, imageHeight, '', 'FAST');
    }

    // Helper function to add sections
    const addSection = (title, content, yPosition) => {
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text(title, marginLeft, yPosition);
      doc.setFontSize(12);
      doc.setFont(undefined, "normal");
      doc.text(content, marginLeft, yPosition + 20, { maxWidth: pageWidth - 2 * marginLeft });
      return yPosition + 40;
    };

    // Starting Y position for text after the image
    let yPosition = marginTop + imageHeight + 70;

    // Adding all sections
    yPosition = addSection("Crop Details", item.disc, yPosition);
    yPosition = addSection("Fertilizer Used", item.fertilizer, yPosition);
    yPosition = addSection("Pest and Disease Information", item.pest, yPosition);
    yPosition = addSection("Pest Control Methods", item.pestcontral, yPosition);
    yPosition = addSection("Challenges Faced", item.challenge, yPosition);
    yPosition = addSection("Work Done and Future Plans", item.work, yPosition);

    // Save the PDF
    doc.save(`${item.title}_report.pdf`);
  };

  return (
    <div className="h-auto bg-white py-10 px-4 mb-20">
      <div className="mx-auto bg-white shadow-lg rounded-lg w-[1100px] overflow-hidden">
        {/* Image Section */}
        <div className="relative h-[400px]">
          <img
            src={item.imgurl}
            alt="Plant"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog Content */}
        <div className="p-8">
          {/* Title */}
          <h1 className="text-[60px] font-bold mb-4 text-black">{item.title}</h1>

          {/* User Details */}
          <p className="text-lg text-gray-500 mb-14">
            By <span className="font-semibold">{item.uname}</span>
          </p>

          {/* Plant Description */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-green-600">Crop </span>Details
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.disc}</p>
          </section>

          {/* Fertilizer Info */}
          <section className="mb-14">
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-green-600">Fertilizer</span> Used
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.fertilizer}</p>
          </section>

          {/* Pest and Disease Info */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-green-600">Pest and Disease</span> Information
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.pest}</p>
          </section>

          {/* Pest Control Methods */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-green-600">Pest Control</span> Methods
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.pestcontral}</p>
          </section>

          {/* Challenges Faced */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-green-600">Challenges</span> Faced
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.challenge}</p>
          </section>

          {/* Work Done and Future Plans */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              <span className="text-green-600">Work Done and Future </span> Plans
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{item.work}</p>
          </section>
        </div>
      </div>

      {/* Generate PDF Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500"
        >
          Download Report as PDF
        </button>
      </div>
    </div>
  );
}

export default MoreDetails;
