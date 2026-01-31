import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            padding: '30px 20px',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginTop: 'auto',
            borderTop: '1px solid var(--surface-color)',
            backgroundColor: 'var(--bg-color)'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '15px', lineHeight: '1.6' }}>
                    Semua konten di website ini tidak disimpan di server kami. Kami hanya menampilkan data dari API pihak ketiga.
                    Kami tidak bertanggung jawab atas konten yang ditampilkan.
                </p>
                <p style={{ marginBottom: '10px' }}>
                    <Link to="/disclaimer" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                        Disclaimer
                    </Link>
                </p>
                <p style={{ fontSize: '0.85rem' }}>
                    &copy; {new Date().getFullYear()} Rebahan. API provided by Zeldvorik.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
