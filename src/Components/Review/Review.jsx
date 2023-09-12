import React, { useState } from "react";
import './Review.css'
import Avatar from '/avatar.jpeg'

function Review({review}) {
    const [showCompleteReview, setShowCompleteReview] = useState(false);

    let imgSrc = "";
    if (review?.author_details?.avatar_path !== null) {
        
        if (!review?.author_details?.avatar_path?.includes("https") &&
            !review?.author_details?.avatar_path?.includes("http"))
            {
                
                imgSrc = `${import.meta.env.VITE_API_BASE_IMAGE_URL}${review?.author_details?.avatar_path}`
            } else {
               
                imgSrc = review?.author_details?.avatar_path?.slice(1);
            }
    } else {
        
        imgSrc = Avatar;
    }

  return (
    <div className="review">
        <div className="avatar-container">
            <img src={imgSrc} alt="Avatar" className="avatar" />
            <p>{review.author}</p>
        </div>
        {
            showCompleteReview
            ? (
                <p className="content">
                    {review?.content}
                    <span className="read-less"
                    onClick={() => setShowCompleteReview(false)}>
                        Read Less
                    </span>
                </p>
            ) : (
                <p className="content">
                    {review?.content.slice(0, 300)}...
                    <span className="read-less" onClick={() => setShowCompleteReview(true)}>
                        Read More
                    </span>
                </p>
            )
        }
    </div>
  )
}

export default Review