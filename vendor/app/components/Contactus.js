import React from 'react';

const Contactus = () => {
    const mail = 'quickpick2623@gmail.com';
    const instagramId = 'itsquickpick';

    const coFounders = [
        { name: 'Ananya Mahishi', image: 'ananyamahishi.jpg' },
        { name: 'Ananya J', image: 'ananyaj.jpg' },
        { name: 'Aayush Senapati', image: 'aayushsenapati.jpg' },
        { name: 'Aayush Nagar', image: 'aayushnagar.jpg' },
        { name: 'Aadithya Rao', image: 'aadithyarao.jpg' },
    ];

    return (
        <div id='contact-section'className="text-black p-8 mt-16">
            <div className="container mx-auto flex flex-col gap-10">
            <div className="border-b mb-8 border-black" />
                <div className="cofounders">
                    <h4 className="text-2xl text-center font-bold mb-2 pb-4">Co-Founders</h4>
                    <div className="cofounder-images grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 justify-center">
                        {coFounders.map((cofounder) => (
                            <div key={cofounder.name} className="cofounder-card">
                                <img
                                    src={cofounder.image}
                                    alt={cofounder.name}
                                    className="rounded-full aspect-square object-cover w-40 h-40"
                                />
                                <p className="pl-8 pr-8 pt-2 text-black font-medium">
                                    {cofounder.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="contact-info mx-auto">
                    <h4 className="text-2xl text-center font-bold mb-2 pb-4">Contact Us</h4>
                    <p className="flex items-center justify-center gap-2 text-base hover:text-yellow-600">
                        <span className="text-lg font-semibold">Email:</span>
                        <a href={`mailto:${mail}`}>{mail}</a>
                    </p>
                    <p className="flex items-center justify-center gap-2 text-base hover:text-yellow-600">
                        <span className="text-lg font-semibold">Instagram:</span>
                        <a href={`https://www.instagram.com/${instagramId}`}>{instagramId}</a>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Contactus;
