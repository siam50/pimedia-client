import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PostCard from './PostCard';

const Media = () => {
    const posts = useLoaderData()

    return (
        <div>
            <h3 className='text-4xl text-center'>Media {posts.length}</h3>

            <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 justify-items-center'>
                {
                    posts.map(post => <PostCard key={post._id} post={post}></PostCard>)
                }
            </div>

        </div>
    );
};

export default Media;