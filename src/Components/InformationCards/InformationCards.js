import "./InformationCards.css";

import Image from 'react-bootstrap/Image';

import Book from "../../Assets/Images/InformationBook.svg";

export default function InformationCards() {
    return (
        <>
        <div className='information_main'>
            <div className="inform_wrapper">
                <div className="first_inform_card">
                    <Image src={Book} rounded />

                    <div>
                        <p className="main_text">8 Steps</p>
                        <p className="main_text">To Building a Successful Team</p>
                        <p className="details">Good teamwork is essential to success. Good organizations need teams that are high-performing and can communicate...   <a className="read-more" href='/steps-to-building-a-successful-team'> Read more >></a></p>
                    </div>
                </div>
                
                <div className="second_inform_card">
                    <Image src={Book} rounded />

                    <div>
                        <p className="main_text">10 methods</p>
                        <p className="main_text">To Change Your Life</p>
                        <p className="details">Writing a letter to yourself from your future self is a great way to clarify your life goals. This journaling method is particularly valuable if you’re...   <a className="read-more" href='/methods-to-change-your-life'> Read more >></a></p>
                    </div>
                </div>
            </div>
            </div>
        </>
)}