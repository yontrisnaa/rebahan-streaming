import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Film, Tv, Globe, Heart, Sparkles, Laugh, TrendingUp, Languages, Popcorn } from 'lucide-react';
import './Categories.css';

const Categories = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        {
            name: 'Trending',
            path: '/category/trending',
            icon: TrendingUp,
            description: 'Konten yang sedang trending',
            color: '#e50914'
        },
        {
            name: 'Film Indonesia',
            path: '/category/indonesian-movies',
            icon: Film,
            description: 'Film Indonesia terpopuler',
            color: '#ff6b6b'
        },
        {
            name: 'Drama Indonesia',
            path: '/category/indonesian-drama',
            icon: Tv,
            description: 'Drama Indonesia terkini',
            color: '#4ecdc4'
        },
        {
            name: 'K-Drama',
            path: '/category/kdrama',
            icon: Heart,
            description: 'K-Drama terbaru',
            color: '#ff6b9d'
        },
        {
            name: 'Short TV',
            path: '/category/short-tv',
            icon: Sparkles,
            description: 'Hot Short TV series',
            color: '#ffd93d'
        },
        {
            name: 'Anime',
            path: '/category/anime',
            icon: Popcorn,
            description: 'Anime terbaru',
            color: '#6bcf7f'
        },
        {
            name: 'Canda Dewasa',
            path: '/category/adult-comedy',
            icon: Laugh,
            description: 'Komedi dewasa',
            color: '#ff9ff3'
        },
        {
            name: 'Western TV',
            path: '/category/western-tv',
            icon: Globe,
            description: 'Serial TV Barat',
            color: '#54a0ff'
        },
        {
            name: 'Indo Dub',
            path: '/category/indo-dub',
            icon: Languages,
            description: 'Konten dengan dubbing Indonesia',
            color: '#48dbfb'
        }
    ];

    return (
        <Layout>
            <div className="container categoriesContainer">
                <div className="categoriesHeader">
                    <h1>All Categories</h1>
                    <p>Jelajahi semua kategori konten yang tersedia</p>
                </div>

                <div className="categoriesGrid">
                    {categories.map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={idx}
                                to={category.path}
                                className="categoryCard"
                                style={{ '--category-color': category.color }}
                            >
                                <div className="categoryIcon">
                                    <Icon size={40} />
                                </div>
                                <h3>{category.name}</h3>
                                <p>{category.description}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Categories;
