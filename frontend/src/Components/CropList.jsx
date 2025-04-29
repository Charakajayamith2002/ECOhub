import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { jsPDF } from "jspdf"; // Import jsPDF
import Modal from "react-modal"; // Import Modal
const CropList = () => {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);
  useEffect(() => {
    fetchCrops();
  }, []); // Runs only once on component mount



  const openDeleteModal = (id) => {
    setSelectedCropId(id); // Set the selected crop ID to be deleted
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedCropId(null); // Reset the selected crop ID
  };

  const fetchCrops = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/crop/all-crops"
      );
      setCrops(response.data.crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedCropId) return;
    try {
      await axios.delete(`http://localhost:4000/api/crop/delete-crop/${selectedCropId}`);
      setIsModalOpen(false); // Close the modal after deleting
      fetchCrops(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };
  const handleUpdate = (id) => {
    navigate(`/edit-crop/${id}`); // Navigate to update page with crop ID
  };

  const handleAddCrop = () => {
    navigate("/AddCrop"); // Navigate to add crop page
  };

 // PDF Generation Function
const generatePDF = () => {
  // Create PDF document in portrait mode
  const doc = new jsPDF();
  
  // Set document properties
  doc.setProperties({
    title: 'Eco Crop Invoice',
    subject: 'Crop Listing Invoice',
    author: 'Eco Farm Management System',
    creator: 'Eco Farm'
  });
  
  // Define colors
  const primaryColor = [46, 125, 50]; // Green
  const secondaryColor = [27, 94, 32]; // Darker green
  const textColor = [33, 33, 33]; // Dark gray
  const lightGray = [224, 224, 224]; // Light gray for alternating rows
  
  // Add Header Image
  const headerImage = "https://th.bing.com/th/id/OIP.huTNLBYhVjudN7Jnn8UmgwHaEk?rs=1&pid=ImgDetMain";
  doc.addImage(headerImage, "JPEG", 15, 10, 180, 40);
  
  // Add decorative header bar
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 55, 210, 8, 'F');
  
  // Company information with improved styling
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("Green Farming Hub", 15, 75);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text("1234 EcoPro Street, Colombo, Sri Lanka", 15, 82);
  doc.text("Phone: +94 11 234 5678 | Email: info@ecofarm.lk", 15, 89);
  
  // Add Invoice Title with stylish background
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.roundedRect(15, 100, 180, 12, 2, 2, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255); // White text
  doc.text("INVOICE - CROP LIST", 105, 108, null, null, 'center');
  
  // Add current date and invoice number
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Date: ${today}`, 15, 125);
  doc.text(`Invoice #: ECO-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`, 15, 132);
  
  // Table Header with styled background
  const startY = 145;
  const headerX = [20, 70, 120, 170]; // X coordinates for each column
  // const colWidths = [50, 50, 50, 30]; // Width for each column
  
  // Draw table header background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(15, startY - 10, 180, 10, 'F');
  
  // Add Table Headers text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255); // White color for header text
  doc.text("Crop Name", headerX[0], startY - 3, null, null, 'left');
  doc.text("Type", headerX[1], startY - 3, null, null, 'left');
  doc.text("Location", headerX[2], startY - 3, null, null, 'left');
  doc.text("Harvest Date", headerX[3], startY - 3, null, null, 'left');
  
  // Add Crops Data to PDF with alternating row colors
  let yPosition = startY;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  
  crops.forEach((crop, index) => {
    // Add alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(15, yPosition, 180, 8, 'F');
    }
    
    // Add crop data
    doc.text(crop.cropName.substring(0, 20), headerX[0], yPosition + 5);
    doc.text(crop.cropType.substring(0, 20), headerX[1], yPosition + 5);
    doc.text(crop.fieldLocation.substring(0, 20), headerX[2], yPosition + 5);
    
    // Format date nicely


    // const plantingDate = new Date(crop.plantingDate);
    // const formattedDateforplan = plantingDate.toLocaleDateString('en-US', { 
    //   year: 'numeric', 
    //   month: 'short', 
    //   day: 'numeric' 
    // });
    // doc.text(formattedDateforplan, headerX[3], yPosition + 5);
    
    const harvestDate = new Date(crop.estimatedHarvestDate);
    const formattedDate = harvestDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    doc.text(formattedDate, headerX[3], yPosition + 5);
    
    



    yPosition += 8; // Spacing between rows
    
    // Add a new page if we're near the bottom
    if (yPosition > 270) {
      doc.addPage();
      // Reset position for new page and add header
      yPosition = 20;
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, yPosition, 180, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("Crop Name", headerX[0], yPosition + 7);
      doc.text("Type", headerX[1], yPosition + 7);
      doc.text("Location", headerX[2], yPosition + 7);
      doc.text("Harvest Date", headerX[3], yPosition + 7);
      yPosition += 15;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    }
  });
  
  // Add totals section
  yPosition += 10;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(15, yPosition, 195, yPosition);
  
  yPosition += 10;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Crops: ${crops.length}`, 140, yPosition);
  
  // Add footer with page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Page ${i} of ${pageCount} - Generated on ${today}`,
      105,
      285,
      null,
      null,
      'center'
    );
    
    // Add footer line
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(15, 280, 195, 280);
    
    // Add company logo or text in footer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text("Eco Farm Management System", 15, 288);
  }
  
  // Save PDF with a more descriptive filename
  const fileName = `EcoFarm_Crops_Invoice_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};
  
  return (
    <>
    <div className="container mx-auto p-6 mb-40 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="mt-10 text-2xl font-semibold"><span className="text-green-500">Crop</span> Marketplace</h1>
        <button
          onClick={handleAddCrop}
          className="bg-black text-green-400 py-2 px-4 rounded-md hover:bg-gray-700 mt-4"
        >
          Add Crop
        </button>
      </div>

      {/* PDF Generate Button */}
      <button
        onClick={generatePDF}
        className="bg-black text-green-400 py-2 px-4 rounded-md mb-6 hover:bg-gray-700"
      >
        Generate PDF
      </button>

      <table className="min-w-full bg-white border border-black shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-3 px-4 font-semibold">Crop Name</th>
            <th className="py-3 px-4 font-semibold">Type</th>
            <th className="py-3 px-4 font-semibold">Location</th>

            <th className="py-3 px-4 font-semibold">SoilType</th>

            <th className="py-3 px-4 font-semibold">Planting Date</th>
            <th className="py-3 px-4 font-semibold">Harvest Date</th>

            <th className="py-3 px-4 font-semibold">GrowthStage</th>
            <th className="py-3 px-4 font-semibold">HealthStatus</th>

            <th className="py-3 px-4 font-semibold">Image</th>
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr
              key={crop._id}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-4">{crop.cropName}</td>
              <td className="py-3 px-4">{crop.cropType}</td>
              <td className="py-3 px-4">{crop.fieldLocation}</td>
              <td className="py-3 px-4">{crop.soilType}</td>
              <td className="py-3 px-4">
                {new Date(crop.plantingDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                {new Date(crop.estimatedHarvestDate).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{crop.growthStage}</td>
              <td className="py-3 px-4">{crop.healthStatus}</td>

              <td className="py-3 px-4">
                <img
                  src={crop.cropImage.url}
                  alt={crop.cropName}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleUpdate(crop._id)}
                  className="bg-black text-green-400 py-1 px-3 mr-2 rounded-md hover:bg-gray-700"
                >
                  Update
                </button>
                <button
                  onClick={() => openDeleteModal(crop._id)}
                  className="bg-black text-green-400 py-1 px-3 rounded-md hover:bg-gray-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
    <div>
    <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-lg w-[90%] max-w-[400px] bg-white"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
>
  <h1 className="text-center mb-6 text-lg font-semibold text-gray-900">
    Are you sure you want to delete this Crop?
  </h1>
  <div className="flex justify-between mt-8">
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
    >
      Yes, Delete
    </button>
    <button
      onClick={closeModal}
      className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
    >
      Cancel
    </button>
  </div>
</Modal>

    </div>
    </>
    
  );
};

export default CropList;
