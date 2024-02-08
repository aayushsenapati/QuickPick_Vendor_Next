// 'use client'
// import { useSession } from 'next-auth/react';
// import { useState } from 'react';
// import { toast } from "react-toastify";
// import { redirect } from 'next/navigation';



// function Policy() {
//     const [isOpen, setIsOpen] = useState(false);


//     const handleOpen = () => setIsOpen(true);
//     const handleClose = () => setIsOpen(false);


//     return (
//         <div>
//             {/* Button to open the dialog */}
//             <li className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={handleOpen}>Policy</li>

//             {/* Dialog content (only visible when isOpen is true) */}
//             {isOpen && (
//                 <div className="fixed z-50 overflow-y-auto inset-0 outline-none focus:outline-none">
//                     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//                         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//                             &#8203;
//                         </span>
//                         <div
//                             className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
//                         >
//                             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                                         <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Restaurant</h3>
//                                         <div className="mt-2">
//                                             <h2>Terms and Conditions</h2>
//                                             <p>1. Introduction
//                                                 Welcome to QuickPick! These Terms and Conditions govern your use of our services. By accessing or using QuickPick, you agree to abide by these terms. Please read them carefully.

//                                                 2. Service Usage
//                                                 QuickPick provides a platform for vendors to access orders and customize their menus. Users must be responsible for any actions taken through their accounts.

//                                                 3. User Conduct
//                                                 Users must not misuse QuickPick or engage in any unlawful activities while using the service. Any breach of these terms may result in the termination of access.

//                                                 4. Intellectual Property
//                                                 All content on QuickPick, including logos, trademarks, and software, is the property of QuickPick and protected by copyright laws.

//                                                 5. Limitation of Liability
//                                                 QuickPick shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.

//                                                 6. Modification of Terms
//                                                 QuickPick reserves the right to modify these terms at any time. Users will be notified of any changes, and continued use of the service constitutes acceptance of the modified terms.

//                                                 7. Governing Law
//                                                 These terms are governed by the laws of [Jurisdiction]. Any disputes arising from these terms shall be resolved through arbitration.
//                                             </p>
//                                             <h2>Privacy Policy</h2>
//                                             <p>1. Collection of Information
//                                                 QuickPick collects personal information from users for the purpose of providing our services. This may include name, email address, and payment details.

//                                                 2. Use of Information
//                                                 Personal information collected by QuickPick is used to process orders, improve our services, and communicate with users. We do not sell or share user information with third parties.

//                                                 3. Third-party Links
//                                                 QuickPick may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.
//                                             </p>
//                                             <h2>Refunds/Cancellations</h2>
//                                             <p>1. Refunds Policy
//                                                 Refunds are processed within 5-7 working days and credited to the customer's bank account.
//                                                 2. Cancellations
//                                                 Vendors cannot cancel user orders.
//                                             </p>
//                                             <button
//                                                 type="button"
//                                                 className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                                 onClick={handleClose}
//                                             >
//                                                 Close
//                                             </button>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )
//             }
//         </div>
//     )
// }

// export default Policy;

'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from "react-toastify";
import { redirect } from 'next/navigation';

function Policy() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            {/* Button to open the dialog */}
            <li className='regular-16 text-gray-55 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold' onClick={handleOpen}>Policy</li>

            {/* Dialog content (only visible when isOpen is true) */}
            {isOpen && (
                <div className="fixed z-50 overflow-y-auto inset-0 flex items-center justify-center">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div
                            className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        >
                            <div className="bg-white rounded-lg max-w-md w-full">
                                <div className="p-6">
                                    <h2 className="text-lg leading-6 font-medium text-gray-900">Policy</h2>
                                    <div className="mt-4 overflow-y-auto max-h-80">
                                        <h2 className="text-xl font-semibold mt-2">Terms and Conditions</h2>
                                        <p className="text-gray-700 mt-2">
                                            <strong>1. Introduction</strong><br />
                                            Welcome to QuickPick! These Terms and Conditions govern your use of our services. By accessing or using QuickPick, you agree to abide by these terms. Please read them carefully.<br /><br />

                                            <strong>2. Service Usage</strong><br />
                                            QuickPick provides a platform for vendors to access orders and customize their menus. Users must be responsible for any actions taken through their accounts.<br /><br />

                                            <strong>3. User Conduct</strong><br />
                                            Users must not misuse QuickPick or engage in any unlawful activities while using the service. Any breach of these terms may result in the termination of access.<br /><br />

                                            <strong>4. Intellectual Property</strong><br />
                                            All content on QuickPick, including logos, trademarks, and software, is the property of QuickPick and protected by copyright laws.<br /><br />

                                            <strong>5. Limitation of Liability</strong><br />
                                            QuickPick shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.<br /><br />

                                            <strong>6. Modification of Terms</strong><br />
                                            QuickPick reserves the right to modify these terms at any time. Users will be notified of any changes, and continued use of the service constitutes acceptance of the modified terms.<br /><br />

                                            <strong>7. Governing Law</strong><br />
                                            These terms are governed by the laws of India. Any disputes arising from these terms shall be resolved through arbitration.
                                        </p>
                                        <h2 className="text-xl font-semibold mt-4">Privacy Policy</h2>
                                        <p className="text-gray-700 mt-2">
                                            <strong>1. Collection of Information</strong><br />
                                            QuickPick collects personal information from users for the purpose of providing our services. This may include name, email address, and payment details.<br /><br />

                                            <strong>2. Use of Information</strong><br />
                                            Personal information collected by QuickPick is used to process orders, improve our services, and communicate with users. We do not sell or share user information with third parties.<br /><br />

                                            <strong>3. Third-party Links</strong><br />
                                            QuickPick may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites.<br /><br />
                                        </p>
                                        <h2 className="text-xl font-semibold mt-4">Refunds/Cancellations</h2>
                                        <p className="text-gray-700 mt-2 mb-2">
                                            <strong>1. Refunds Policy</strong><br />
                                            Refunds are processed within 5-7 working days and credited to the customer's bank account.<br />
                                            <strong>2. Cancellations</strong><br />
                                            Vendors cannot cancel user orders.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Policy;
