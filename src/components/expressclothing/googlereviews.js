import React from 'react'
import "./google.css"
import { Button, Card, Rate } from 'antd';

function GoogleReviews() {
    // Create an array of review objects
    const reviews = [
        {
            name: "Matt Ives",
            date: "19 August 2024",
            rate: <Rate disabled defaultValue={5} />,
            review: "Great service and fast delivery. The quality of the product exceeded my expectations. Highly recommend!"
        },
        {
            name: "John Doe",
            date: "15 September 2024",
            rate: <Rate disabled defaultValue={5} />,
            review: "Great service and fast delivery. The quality of the product exceeded my expectations. Highly recommend!"
        },
        {
            name: "Sarah Lee",
            date: "1 October 2024",
            rate: <Rate disabled defaultValue={5} />,
            review: "The labels are top-notch. Customer service was also fantastic. Will definitely order again!"
        }
    ];

    return (
        <div >
            <div className='center-google'>
                <img className='google-img' alt='google' src='../images/google.png' />
                <Button className='rate-button'>VIEW OTHER REVIEWS</Button>
            </div>
            <div className='center-google'>
                <div className='cards-reviewing'>
                    {reviews.map((review, index) => (
                        <Card
                            key={index}
                            style={{
                                width: 300,
                                marginBottom: '1rem'
                            }}
                        >
                            <p className='review-name'>{review.name}</p>
                            <p className='review-date'>{review.date}</p>
                            {review.rate}
                            <p className='review-review'>{review.review}</p>
                        </Card>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default GoogleReviews;
