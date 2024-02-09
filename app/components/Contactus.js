import Image from 'next/image';
import React from 'react';

const Contactus = () => {
    const mail = 'quickpick2623@gmail.com';
    const instagramId = 'itsquickpick';
    const phoneNumber = '+918095300313';

    return (
        <div id='contact-section' className="text-black p-8 mt-8">
            <div className="flex justify-center items-center">
                <Image
                    src="/team_rev.png"
                    alt="team"
                    width={1000}
                    height={1000}
                    className="mx-auto"
                />
            </div>

            <div className="contact-info mx-auto">
                <h4 className="text-4xl text-center font-bold mb-2 pb-4 pt-8">Contact Us</h4>
                <p className="flex items-center justify-center gap-2 text-2xl  hover:text-yellow-600">
                    <span className="font-semibold">Email:</span>
                    <a href={`mailto:${mail}`}>{mail}</a>
                </p>
                <p className="flex items-center justify-center gap-2 text-2xl hover:text-yellow-600">
                    <span className="font-semibold">Instagram:</span>
                    <a href={`https://www.instagram.com/${instagramId}`}>{instagramId}</a>
                </p>
                <p className="flex items-center justify-center gap-2 text-2xl hover:text-yellow-600">
                    <span className="font-semibold">Phone:</span>
                    <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </p>
                <p className="flex items-center justify-center gap-2 text-2xl hover:text-yellow-600">
                    <span className="font-semibold">Address:</span>
                    <span className="text-base">
                        T1403 Snn Raj Lake View Phase-2 <br />
                        Ranka Colony Road, Bilekahalli, <br />
                        Bannerghatta Road, Bangalore-560076
                    </span>
                </p> 

            </div>

        </div>
    );
};

export default Contactus;