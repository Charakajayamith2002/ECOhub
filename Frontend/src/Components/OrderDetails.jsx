import React from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For table formatting
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    // Get the orderId from the URL
    const { orderId } = useParams();

    // Fetch the orders from Redux store
    const orders = useSelector((state) => state.cart.orders);

    // Find the order based on the provided orderId
    const order = orders.find((order) => order.id === orderId);

    // Function to generate PDF report
    const generatePDFReport = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.text('Order Report', 20, 20);

        // Add order ID and date
        doc.setFontSize(12);
        doc.text(`Order ID: ${order.id}`, 20, 30);
        doc.text(`Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, 20, 40);

        // Add total amount and quantity
        doc.text(`Total Quantity: ${order.totalQuantity}`, 20, 50);
        doc.text(`Total Amount: Rs.${order.totalAmount.toFixed(2)}`, 20, 60);

        // Create table for order items
        const tableColumns = ['Product ID', 'Title', 'Quantity', 'Price'];
        const tableRows = order.items.map((item) => [
            item._id,
            item.title,
            item.quantity,
            `Rs.${item.price.toFixed(2)}`,
        ]);

        // Add table to PDF
        doc.autoTable({
            startY: 70,
            head: [tableColumns],
            body: tableRows,
        });

        // Save the PDF
        doc.save(`Order_${order.id}.pdf`);
    };

    if (!order) {
        return <p className="text-red-500 text-center">Order not found.</p>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg mt-20 mb-20 py-10">
            <h2 className="text-3xl font-bold text-center mb-14">Order Details</h2>

            <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 mb-14">
                <p className="text-lg"><strong>Order ID:</strong> {order.id}</p>
                <p className="text-lg"><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-lg"><strong>Total Quantity:</strong> {order.totalQuantity}</p>
                <p className="text-lg"><strong>Total Amount:</strong> Rs. {order.totalAmount.toFixed(2)}</p>
            </div>

            <table className="min-w-full bg-white border rounded-lg shadow-md overflow-hidden mb-14">
                <thead className="bg-green-500 text-white">
                    <tr>
                        <th className="py-2 px-4 border">Product ID</th>
                        <th className="py-2 px-4 border">Title</th>
                        <th className="py-2 px-4 border">Quantity</th>
                        <th className="py-2 px-4 border">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border">{item._id}</td>
                            <td className="py-2 px-4 border">{item.title}</td>
                            <td className="py-2 px-4 border">{item.quantity}</td>
                            <td className="py-2 px-4 border">Rs.{item.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Button to generate the PDF report */}
            <button
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-black transition duration-300"
                onClick={generatePDFReport}
            >
                Download Report
            </button>
        </div>
    );
};

export default OrderDetails;
