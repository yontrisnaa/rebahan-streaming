import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import HeroBanner from '../components/home/HeroBanner';
import Section from '../components/layout/Section';
import MovieCard from '../components/common/MovieCard';
import { SectionSkeleton, SkeletonCard } from '../components/common/Skeleton';
import { api } from '../services/api';

const Home = () => {
    const { category } = useParams();

    const [trending, setTrending] = useState([]);
    const [sections, setSections] = useState({
        kDrama: { title: 'K-Drama', data: [], loading: true, link: '/category/kdrama' },
        shortTv: { title: 'Short TV', data: [], loading: true, link: '/category/short-tv' },
        anime: { title: 'Anime', data: [], loading: true, link: '/category/anime' },
        westernTv: { title: 'Western TV', data: [], loading: true, link: '/category/western-tv' },
        indoDub: { title: 'Indo Dub', data: [], loading: true, link: '/category/indo-dub' },
    });

    const [singleCategoryData, setSingleCategoryData] = useState({ data: [], loading: false, hasMore: true, page: 1 });
    const [loadingMore, setLoadingMore] = useState(false);
    const observer = useRef();

    // Infinite Scroll Observer Callback
    const lastMovieElementRef = useCallback(node => {
        if (loadingMore || !singleCategoryData.hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setSingleCategoryData(prev => ({ ...prev, page: prev.page + 1 }));
            }
        });
        if (node) observer.current.observe(node);
    }, [loadingMore, singleCategoryData.hasMore]);

    // If viewing homepage (no category), fetch all sections
    useEffect(() => {
        if (!category) {
            const fetchAll = async () => {
                // Fetch Trending
                try {
                    const trendingRes = await api.getTrending();
                    setTrending(trendingRes.items || []);
                } catch (e) {
                    console.error("Failed to fetch trending", e);
                }

                const fetchSection = async (key, apiCall) => {
                    try {
                        const res = await apiCall();
                        setSections(prev => ({
                            ...prev,
                            [key]: { ...prev[key], data: res.items || [], loading: false }
                        }));
                    } catch (e) {
                        console.error(`Failed to fetch ${key}`, e);
                        setSections(prev => ({ ...prev, [key]: { ...prev[key], loading: false } }));
                    }
                };

                fetchSection('kDrama', api.getKDrama);
                fetchSection('shortTv', api.getShortTV);
                fetchSection('anime', api.getAnime);
                fetchSection('westernTv', api.getWesternTV);
                fetchSection('indoDub', api.getIndoDub);
            };

            fetchAll();
        }
    }, [category]);

    // Initial Category Fetch
    useEffect(() => {
        if (category) {
            const fetchCategory = async () => {
                setSingleCategoryData({ data: [], loading: true, hasMore: true, page: 1 });
                try {
                    const apiCall = getApiCallByCategory(category);
                    if (apiCall) {
                        const res = await apiCall(1);
                        setSingleCategoryData({
                            data: res?.items || [],
                            loading: false,
                            hasMore: res?.hasMore,
                            page: 1
                        });
                    }
                } catch (e) {
                    console.error("Failed to fetch category", e);
                    setSingleCategoryData(prev => ({ ...prev, loading: false }));
                }
            };

            fetchCategory();
        }
    }, [category]);

    // Load More Effect
    useEffect(() => {
        if (category && singleCategoryData.page > 1) {
            const loadMore = async () => {
                setLoadingMore(true);
                try {
                    const apiCall = getApiCallByCategory(category);
                    if (apiCall) {
                        const res = await apiCall(singleCategoryData.page);
                        setSingleCategoryData(prev => ({
                            ...prev,
                            data: [...prev.data, ...(res.items || [])],
                            hasMore: res?.hasMore,
                        }));
                    }
                } catch (e) {
                    console.error("Failed to load more", e);
                } finally {
                    setLoadingMore(false);
                }
            };
            loadMore();
        }
    }, [category, singleCategoryData.page]);

    const getApiCallByCategory = (cat) => {
        switch (cat) {
            case 'kdrama': return api.getKDrama;
            case 'short-tv': return api.getShortTV;
            case 'anime': return api.getAnime;
            case 'western-tv': return api.getWesternTV;
            case 'indo-dub': return api.getIndoDub;
            default: return null;
        }
    };

    // Render Homepage
    if (!category) {
        return (
            <Layout>
                {trending.length > 0 && <HeroBanner items={trending.slice(0, 5)} />}

                {Object.entries(sections).map(([key, section]) => (
                    section.loading ? <SectionSkeleton key={key} /> : (
                        section.data.length > 0 && (
                            <Section key={key} title={section.title} linkTo={section.link}>
                                {section.data.slice(0, 10).map(item => (
                                    <MovieCard key={item.id} movie={item} />
                                ))}
                            </Section>
                        )
                    )
                ))}
            </Layout>
        );
    }

    // Render Category Page
    return (
        <Layout>
            <div style={{ paddingTop: '20px' }} className="container">
                <h1 style={{ marginBottom: '20px', textTransform: 'capitalize' }}>{category.replace('-', ' ')}</h1>
                {singleCategoryData.loading && singleCategoryData.page === 1 ? <SectionSkeleton /> : (
                    <div className="grid">
                        {singleCategoryData.data.map((item, index) => {
                            if (singleCategoryData.data.length === index + 1) {
                                return <div ref={lastMovieElementRef} key={`${item.id}-${index}`}><MovieCard movie={item} /></div>
                            } else {
                                return <MovieCard key={`${item.id}-${index}`} movie={item} />
                            }
                        })}
                    </div>
                )}
                {loadingMore && (
                    <div className="grid">
                        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}
                {!singleCategoryData.hasMore && !singleCategoryData.loading && (
                    <p style={{ textAlign: 'center', margin: '20px', color: 'var(--text-secondary)' }}>You've reached the end.</p>
                )}
            </div>
        </Layout>
    );
};

export default Home;
