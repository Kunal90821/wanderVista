/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddComment from './AddComment';
import '../styles/Animation.css';

const Comment = ({ username, content, date, likes }) => {
    const [isLiked, setLiked] = useState(false);

    const handleLikeToggle = () => {
        setLiked(!isLiked);
    };

    return (
        <div className="ml-11 py-4 inline-flex">
            <Avatar alt='Avatar' src='/static/images/logo.png' />
            <div className="grid">
                <div className="inline-flex justify-between w-[20rem] lg:w-[325%]">
                    <div className=" inline-flex justify-around">
                        <h2 className="font-semibold px-4">{username}</h2>
                        <p>{content}</p>
                    </div>
                    {
                        !isLiked ? <FavoriteBorderIcon onClick={handleLikeToggle} style={{fontSize: '1.1rem'}} className="text-black cursor-pointer"/> : <FavoriteIcon onClick={handleLikeToggle} style={{fontSize: '1.1rem'}} className="text-red-600 cursor-pointer"/>
                    }
                </div>
                <div className="px-4 font-semibold text-sm py-1 inline-flex">
                    <h3 className="font-normal">{date}</h3>
                    <h3 className="ml-8">{likes} likes</h3>
                    <h3 className="ml-4">Reply</h3>
                </div>
            </div>
        </div>
    );
};

const Reply = ({ username, content, date, likes }) => {
    const [isLiked, setLiked] = useState(false);

    const handleLikeToggle = () => {
        setLiked(!isLiked);
    };

    return (
        <div className="ml-11 py-4 inline-flex">
            <Avatar alt='Avatar' src='/static/images/logo.png' />
            <div className="grid">
                <div className="inline-flex justify-between w-[15rem] lg:w-[325%]">
                    <div className=" inline-flex justify-around">
                        <h2 className="font-semibold px-4">{username}</h2>
                        <p>{content}</p>
                    </div>
                    {
                        !isLiked ? <FavoriteBorderIcon onClick={handleLikeToggle} style={{fontSize: '1.1rem'}} className="text-black cursor-pointer"/> : <FavoriteIcon onClick={handleLikeToggle} style={{fontSize: '1.1rem'}} className="text-red-600 cursor-pointer"/>
                    }
                </div>
                <div className="px-4 font-semibold text-sm py-1 inline-flex">
                    <h3 className="font-normal">{date}</h3>
                    <h3 className="ml-8">{likes} likes</h3>
                    <h3 className="ml-4">Reply</h3>
                </div>
            </div>
        </div>
    );
};

const Comments = () => {
    const [showReplies, setShowReplies] = useState(false);
    const [isLiked, setLiked] = useState(false);

    const handleLikeToggle = () => {
        setLiked(!isLiked);
    };

    const handleToggleReplies = () => {
        setShowReplies(!showReplies);
    };

    return (
        <div className="w-[28rem] lg:w-full">
            <div className='bg-white rounded-lg py-4 lg:w-[70%] ml-5 lg:ml-[15%] h-full fade-in-down'>
                <div className='text-center font-bold text-xl lg:text-3xl py-2 pb-4'>
                    <h1>Comments</h1>
                </div>
                <hr />
                <div className="h-[25rem] overflow-y-auto scroll-smooth">
                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div>
                            <div className="ml-[5%] animate-fade-in-down">
                                <Reply username="rishi" content="Nice" date="53m" likes={10} />
                            </div>
                            <div className="ml-[5%] animate-fade-in-down">
                                <Reply username="rishi" content="Nice" date="53m" likes={10} />
                            </div>
                            <div className="ml-[5%] animate-fade-in-down">
                                <Reply username="rishi" content="Nice" date="53m" likes={10} />
                            </div>
                            <div className="ml-[5%] animate-fade-in-down">
                                <Reply username="rishi" content="Nice" date="53m" likes={10} />
                            </div>
                        </div>
                    )}

                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div className="ml-[5%] animate-fade-in-down">
                            <Reply username="rishi" content="Nice" date="53m" likes={10} />
                        </div>
                    )}
                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div className="ml-[5%] animate-fade-in-down">
                            <Reply username="rishi" content="Nice" date="53m" likes={10} />
                        </div>
                    )}
                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div className="ml-[5%] animate-fade-in-down">
                            <Reply username="rishi" content="Nice" date="53m" likes={10} />
                        </div>
                    )}
                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div className="ml-[5%] animate-fade-in-down">
                            <Reply username="rishi" content="Nice" date="53m" likes={10} />
                        </div>
                    )}
                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div className="ml-[5%] animate-fade-in-down">
                            <Reply username="rishi" content="Nice" date="53m" likes={10} />
                        </div>
                    )}
                    <Comment username="Kunal90821" content="A very nice blog" date="1d" likes={69} />
                    <div className="px-32" onClick={handleToggleReplies} style={{cursor: 'pointer'}}>
                        <h3 className="font-semibold">{showReplies ? "Hide Replies" : "View Replies"}</h3>
                    </div>
                    {showReplies && (
                        <div className="ml-[5%] animate-fade-in-down">
                            <Reply username="rishi" content="Nice" date="53m" likes={10} />
                        </div>
                    )}
                </div>
                <hr />
                <div>
                    <div className="ml-[10%] pt-2 inline-flex justify-between w-[80%]">
                        {
                            !isLiked ? <FavoriteBorderIcon onClick={handleLikeToggle} style={{fontSize: '2rem'}} className="text-black cursor-pointer mt-3"/> : <FavoriteIcon onClick={handleLikeToggle} style={{fontSize: '2rem'}} className="text-red-600 cursor-pointer mt-3"/>
                        }
                        <AddComment />
                    </div>
                    <div className="ml-[10%] inline-flex justify-between w-[80%] font-semibold">
                        <h3>69 likes</h3>
                        <h3>2 days ago</h3>
                    </div>
                </div>
            </div>
            <div className="py-2"></div>
        </div>
    );
};

export default Comments;
