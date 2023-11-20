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
                        <p className="main_text">Some information</p>

                        <p className="details">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis...   <span className="read-more"> Read more >></span></p>
                    </div>
                </div>
                
                <div className="second_inform_card">
                    <Image src={Book} rounded />

                    <div>
                        <p className="main_text">Some information</p>

                        <p className="details">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis...   <span className="read-more"> Read more >></span></p>
                    </div>
                </div>
            </div>
            </div>
        </>
)}