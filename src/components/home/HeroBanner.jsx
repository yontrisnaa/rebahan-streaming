import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import './HeroBanner.css';

const HeroBanner = ({ items = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (items.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [items.length]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    if (items.length === 0) return null;

    return (
        <div className="heroContainer">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`heroSlide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${item.poster})` }}
                >
                    <div className="heroOverlay">
                        <div className="heroContent">
                            <h1 className="heroTitle">{item.title}</h1>
                            <div className="heroInfo">
                                <span className="heroRating">
                                    <Star size={16} fill="#fbbf24" stroke="none" />
                                    {item.rating}
                                </span>
                                <span>{item.year}</span>
                                <span>{item.type}</span>
                            </div>
                            <div className="heroActions">
                                <Link to={`/detail/${item.detailPath}`} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Play size={20} fill="currentColor" />
                                    Watch Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <button className="navButton navPrev" onClick={prevSlide}>
                <ChevronLeft size={24} />
            </button>
            <button className="navButton navNext" onClick={nextSlide}>
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default HeroBanner;
