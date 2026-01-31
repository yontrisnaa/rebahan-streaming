import React from 'react';
import { Link } from 'react-router-dom';
import './Section.css';

const Section = ({ title, linkTo, children }) => {
    return (
        <section className="section">
            <div className="container">
                <div className="sectionHeader">
                    <h2 className="sectionTitle">{title}</h2>
                    {linkTo && <Link to={linkTo} className="viewAll">View All</Link>}
                </div>
                <div className="grid">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
