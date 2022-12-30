import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const PostCreate = () => {
    const { user } = useContext(AuthContext)
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const handlePost = event => {
        const formData = new FormData();
        event.preventDefault()

        const form = event.target;
        const message = form.message.value;
        const image = form.image.files[0];

        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    form.reset()
                    const post = {
                        message,
                        image: imgData.data.url
                    }

                    fetch('https://y-mauve-chi.vercel.app/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                        })

                }
            })
    }
    return (
        <section class="py-10 bg-gray-50 sm:py-16 lg:py-16 my-12">
            <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                <div class="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
                    <div class="">
                        <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:mb-8 mb-4">Share your post</h2>
                        <div>
                            <form onSubmit={handlePost}>
                                <textarea name='message' className="textarea textarea-bordered w-full block mb-1" placeholder="Post"></textarea>
                                <input type="file" name='image' className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                                <>
                                    {user ?
                                        <button type='submit' className="btn btn-accent lg:ml-5">Post</button>
                                        : <Link to='/login'><button type='submit' className="btn btn-accent lg:ml-5">post</button></Link>}
                                </>
                            </form>
                        </div>
                    </div>

                    <div class="relative pl-20 pr-6 sm:pl-6 md:px-0">
                        <div class="relative w-full max-w-xs mt-4 mb-10 ml-auto">
                            <img class="ml-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/person.jpg" alt="" />

                            <img class="absolute -top-4 -left-12" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default PostCreate;