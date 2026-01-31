import React from 'react';

const VideoPlayer = ({ url }) => {
    if (!url) return <div style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    }}>No Video Source</div>;

    return (
        <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
            <iframe
                src={url}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Video Player"
            />
        </div>
    );
};

export default VideoPlayer;
