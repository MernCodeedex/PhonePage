import React, { useState, useEffect } from 'react';
import { Card } from "flowbite-react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PhoneForm.css';

const PhoneForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://imate.pythonanywhere.com/api/phones/${id}/`);
                setProduct(response.data);
                setSelectedImage(response.data.images);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/');
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const increaseQuantity = () => setQuantity(prev => Math.min(prev + 1, product.quantity));
    const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <Card className='main-page'>
                <div className="phone-form">
                    <div className="left-card">
                        <Card>
                            <div
                                className="main-image-card"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onMouseMove={handleMouseMove}
                            >
                                <img src={`https://imate.pythonanywhere.com${selectedImage}`} alt={product.name} />
                            </div>
                        </Card>
                    </div>

                    {isHovering && (
                        <div className="zoom-view">
                            <div
                                className="zoomed-image"
                                style={{
                                    backgroundImage: `url(https://imate.pythonanywhere.com${selectedImage})`,
                                    backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`
                                }}
                            />
                        </div>
                    )}

                    <div className='right-card'>
                        <div className="product-info">
                            <div className="rating">
                                <h2>{product.name}</h2>
                            </div>
                            <div className="rating">
                                <h4>Year: {product.year}</h4>
                            </div>

                            <div className="color-selection">
                                <h3>Battery Health: {product.battery_health}</h3>
                            </div>
                            <div className="location-selection">
                                <label>Maximum Quantity Available: {product.quantity}</label>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <span className="font-semibold">Quantity:</span>
                                <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-200 rounded quantity-button">-</button>
                                <span className='quantiy-number'>{quantity}</span>
                                <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-200 rounded quantity-button">+</button>
                            </div>

                            <div className="location-selection">
                                <label>Available Location: {product.location}</label>
                            </div>

                            {product.name === "iphone 15" && product.quantity === 1 && (
                                <div style={{ color: 'red', marginTop: '10px' }}>
                                    Only 1 unit left of iPhone 15. Limited stock!
                                </div>
                            )}

                            <div className="actions">
                                <button className="add-to-bag">ADD TO BAG</button>
                                <button className="wishlist">WISHLIST</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-details">
                        <h3>PRODUCT DETAILS</h3>
                        <ul>
                            <li>Colour: {product.colour}</li>
                            <li>Storage Capacity: {product.storage_capacity}</li>
                            <li>Description: {product.description}</li>
                        </ul>

                        <h3>Specifications</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{product.name}</td>
                                </tr>
                                <tr>
                                    <td>Year</td>
                                    <td>{product.year}</td>
                                </tr>
                                <tr>
                                    <td>Battery Health</td>
                                    <td>{product.battery_health}</td>
                                </tr>
                                <tr>
                                    <td>Colour</td>
                                    <td>{product.colour}</td>
                                </tr>
                                <tr>
                                    <td>Storage Capacity</td>
                                    <td>{product.storage_capacity}</td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td>{product.quantity}</td>
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    <td>{product.location}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PhoneForm;