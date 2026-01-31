import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import MovieCard from '../components/common/MovieCard';
import { SectionSkeleton, SkeletonCard } from '../components/common/Skeleton';
import { api } from '../services/api';
import './Category.css';

const Category = () => {
    const { category: urlCategory } = useParams();
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState(urlCategory || 'trending');
    const [categoryData, setCategoryData] = useState({ data: [], loading: false, hasMore: true, page: 1 });
    const [loadingMore, setLoadingMore] = useState(false);
    const observer = useRef();

    const categories = [
        { id: 'trending', name: 'Trending', api: api.getTrending },
        { id: 'indonesian-movies', name: 'Film Indonesia', api: api.getIndonesianMovies },
        { id: 'indonesian-drama', name: 'Drama Indonesia', api: api.getIndonesianDrama },
        { id: 'kdrama', name: 'K-Drama', api: api.getKDrama },
        { id: 'short-tv', name: 'Short TV', api: api.getShortTV },
        { id: 'anime', name: 'Anime', api: api.getAnime },
        { id: 'adult-comedy', name: 'Canda Dewasa', api: api.getAdultComedy },
        { id: 'western-tv', name: 'Western TV', api: api.getWesternTV },
        { id: 'indo-dub', name: 'Indo Dub', api: api.getIndoDub }
    ];

    // Infinite Scroll Observer Callback
    const lastMovieElementRef = useCallback(node => {
        if (loadingMore || !categoryData.hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setCategoryData(prev => ({ ...prev, page: prev.page + 1 }));
            }
        });
        if (node) observer.current.observe(node);
    }, [loadingMore, categoryData.hasMore]);

    // Update active category when URL changes
    useEffect(() => {
        if (urlCategory && urlCategory !== activeCategory) {
            setActiveCategory(urlCategory);
        }
    }, [urlCategory]);

    // Initial Category Fetch
    useEffect(() => {
        const fetchCategory = async () => {
            setCategoryData({ data: [], loading: true, hasMore: true, page: 1 });
            try {
                const currentCat = categories.find(c => c.id === activeCategory);
                if (currentCat && currentCat.api) {
                    const res = await currentCat.api(1);
                    setCategoryData({
                        data: res?.items || [],
                        loading: false,
                        hasMore: res?.hasMore !== false,
                        page: 1
                    });
                }
            } catch (e) {
                console.error("Failed to fetch category", e);
                setCategoryData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchCategory();
    }, [activeCategory]);

    // Load More Effect
    useEffect(() => {
        if (categoryData.page > 1) {
            const loadMore = async () => {
                setLoadingMore(true);
                try {
                    const currentCat = categories.find(c => c.id === activeCategory);
                    if (currentCat && currentCat.api) {
                        const res = await currentCat.api(categoryData.page);
                        setCategoryData(prev => ({
                            ...prev,
                            data: [...prev.data, ...(res.items || [])],
                            hasMore: res?.hasMore !== false,
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
    }, [categoryData.page, activeCategory]);

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        navigate(`/category/${categoryId}`);
        window.scrollTo(0, 0);
    };

    const currentCategoryName = categories.find(c => c.id === activeCategory)?.name || activeCategory;

    return (
        <Layout>
            <div className="container categoryPage">
                <h1 className="categoryTitle">{currentCategoryName}</h1>

                <div className="categoryTabs">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`categoryTab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {categoryData.loading && categoryData.page === 1 ? (
                    <SectionSkeleton />
                ) : (
                    <div className="grid">
                        {categoryData.data.map((item, index) => {
                            if (categoryData.data.length === index + 1) {
                                return (
                                    <div ref={lastMovieElementRef} key={`${item.id}-${index}`}>
                                        <MovieCard movie={item} />
                                    </div>
                                );
                            } else {
                                return <MovieCard key={`${item.id}-${index}`} movie={item} />;
                            }
                        })}
                    </div>
                )}

                {loadingMore && (
                    <div className="grid">
                        {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                )}

                {!categoryData.hasMore && !categoryData.loading && categoryData.data.length > 0 && (
                    <p style={{ textAlign: 'center', margin: '20px', color: 'var(--text-secondary)' }}>
                        You've reached the end.
                    </p>
                )}

                {!categoryData.loading && categoryData.data.length === 0 && (
                    <p style={{ textAlign: 'center', margin: '40px', color: 'var(--text-secondary)' }}>
                        No content available.
                    </p>
                )}
            </div>
        </Layout>
    );
};

export default Category;
