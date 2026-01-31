import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import VideoPlayer from '../components/player/VideoPlayer';
import MovieCard from '../components/common/MovieCard';
import { Star, Calendar, Film } from 'lucide-react';
import { api } from '../services/api';
import './Detail.css';

const Detail = () => {
    const { detailPath } = useParams();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSeason, setActiveSeason] = useState(1);
    const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const decodedPath = decodeURIComponent(detailPath);
                const res = await api.getDetail(decodedPath);
                // API returns { success: true, data: { ... } } or { items: [...] }
                // We prioritise 'data' or 'items[0]' or the object itself if it has 'title'
                const movieData = res.data || (res.items && res.items[0]) || res;
                setDetail(movieData);

                if (movieData.seasons && movieData.seasons.length > 0) {
                    setActiveSeason(movieData.seasons[0].season);
                }
                setCurrentVideoUrl(movieData.playerUrl || movieData.iframe);
            } catch (e) {
                console.error("Detail fetch failed", e);
            } finally {
                setLoading(false);
            }
        };

        if (detailPath) {
            fetchDetail();
        }
    }, [detailPath]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await api.getTrending(1);
                const items = res.data || res.items || [];
                setRecommendations(items.slice(0, 10)); // Limit to 10 items
            } catch (e) {
                console.error("Failed to fetch recommendations", e);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="container" style={{ paddingTop: '50px', display: 'flex', justifyContent: 'center' }}>
                    <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid #333', borderTop: '5px solid var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </Layout>
        );
    }

    if (!detail) return <Layout><div className="container">Detail not found</div></Layout>;

    return (
        <Layout>
            <div className="container detailContainer" style={{ marginTop: '20px' }}>
                {currentVideoUrl && (
                    <div className="watch-container">
                        <div className="video-section">
                            <VideoPlayer key={currentVideoUrl} url={currentVideoUrl} />
                        </div>

                        {(detail.seasons && detail.seasons.length > 0) || (detail.episodes && detail.episodes.length > 0) ? (
                            <div className="episode-sidebar">
                                <div className="episode-header">
                                    <h2 className="sectionTitle" style={{ marginBottom: 0, fontSize: '1.2rem' }}>Episodes</h2>
                                    {detail.seasons && detail.seasons.length > 1 && (
                                        <div className="seasonSelector">
                                            <select
                                                value={activeSeason}
                                                onChange={(e) => setActiveSeason(Number(e.target.value))}
                                                style={{ padding: '5px', borderRadius: '4px', backgroundColor: '#333', color: 'white', border: '1px solid #555' }}
                                            >
                                                {detail.seasons.map(s => (
                                                    <option key={s.season} value={s.season}>S{s.season}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>

                                <div className="episodeList sidebar-list">
                                    {(() => {
                                        let episodesToRender = [];
                                        if (detail.seasons && detail.seasons.length > 0) {
                                            const seasonData = detail.seasons.find(s => s.season === activeSeason) || detail.seasons[0];
                                            episodesToRender = seasonData ? seasonData.episodes : [];
                                        } else if (detail.episodes) {
                                            episodesToRender = detail.episodes;
                                        }

                                        return episodesToRender.map((ep, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentVideoUrl(ep.playerUrl)}
                                                className={`episodeBtn sidebar-btn ${currentVideoUrl === ep.playerUrl ? 'active' : ''}`}
                                            >
                                                <span className="ep-num">{idx + 1}</span>
                                                <span className="ep-title">{ep.title || `Episode ${ep.episode || idx + 1}`}</span>
                                            </button>
                                        ));
                                    })()}
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}


                <div className="detailHeader">
                    <img src={detail.poster} alt={detail.title} className="detailPoster" />
                    <div className="detailInfo">
                        <h1 className="detailTitle">{detail.title}</h1>
                        <div className="detailMeta">
                            <span className="detailRating">
                                <Star size={20} fill="#fbbf24" stroke="none" />
                                {detail.rating}
                            </span>
                            <span><Calendar size={18} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />{detail.year}</span>
                            <span><Film size={18} style={{ marginRight: '5px', verticalAlign: 'text-bottom' }} />{detail.type}</span>
                            {detail.genre && <span className="detailGenre">{detail.genre}</span>}
                        </div>
                        <p className="detailDesc">{detail.description || detail.plot || "No description available."}</p>
                    </div>
                </div>

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                    <div className="recommendationsSection">
                        <h2 className="sectionTitle">Rekomendasi</h2>
                        <div className="recommendationsGrid">
                            {recommendations.map((item, idx) => (
                                <MovieCard key={idx} movie={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Detail;
