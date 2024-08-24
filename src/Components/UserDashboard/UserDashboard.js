import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import "./UserDashboard.css";

function UserDashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/donor');
      };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAccept = () => {
        setIsModalOpen(false); 
        navigate('/application'); 
    };
    
    return (
        <>
            <UserHeader />
            <div className="flex gap-4 max-sm:flex-col items-center justify-center text-center bg-blue-600 text-white px-6 py-3.5 rounded font-[sans-serif]">
                <p className="text-base">Need Kidney Urgent: Preferably B+ve</p>

                <div className="flex gap-2">
                    <button type="button" className="bg-white text-blue-500 py-2.5 px-5 rounded text-sm hover:underline">
                        <Link to="/donateOrgan">Donate Now</Link>
                    </button>
                </div>
            </div>
            <header>
                <div className="bg-gradient-to-r from-blue-700 to-[#B06AB3] font-sans px-6 py-12">
                    <div className="container mx-auto flex flex-col justify-center items-center text-center">
                        <h2 className="text-white sm:text-4xl text-3xl font-bold mb-4">If you are not a donor?</h2>
                        <p className="text-white text-base text-center mb-8">You can only donate organs in our hospital if you are a donor.</p>
                        <p className="text-white text-base text-center mb-8">Make sure that you are a donor. If not, please register now...</p>
                        <button
                            type="button"
                            className="bg-white text-sm text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-slate-100"
                            onClick={openModal}
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </header>

            {isModalOpen && (
                <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow">
                        <button
                            type="button"
                            className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1"
                            onClick={closeModal}
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="text-center p-4">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to register now?</h3>
                            <button
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                onClick={handleAccept}
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                type="button"
                                className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-5 py-2.5 mt-3 hover:bg-gray-100"
                                onClick={closeModal}
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>


            )}
            <div class="card-container">
<div
  class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
  <div class="min-h-[245px]">
    <img src="https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-red-heart-love-valentine-help-kindness-organ-donate-volunteer-heart-health-png-image_11359699.png" class="w-full rounded-lg" />
  </div>
  <div class="p-6 text-center">
    <h3 class="text-xl font-bold">Heart Donation</h3>
    <p class="mt-3 text-sm text-gray-500 leading-relaxed">Need 20 hearts urgently for the recipients in the hospital. Are you willing to donate?</p>
    <button type="button" class="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700" onClick={handleClick}>Donate</button>
  </div>
</div>

<div
  class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
  <div class="min-h-[245px]">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAxlBMVEX///8tPlIZdrsYdrwqPFAtPlAAcrgoOk8tPlMAcbgAcrclOE0qPE/7/Pz3+vvy8/QAbrfx8vLc3uDl7vPP0dTs7e4gNEjd3+FxeYI4RllocXu4vMAmOEuqrrPu7/Cdo6mnxNu/0+Hc5u49hLkmfLeTt9NlmsNdlcJOjLyBiZBNWWVATl1aZW+UmqDDxsoWK0F4gIlRXWnR3+uErtE2gLqIsdKgv9hUkrx3qM+2zd4Vd7ZxosvH2OQ1gbwAaa89g7UFJDkXLj+732grAAAJQUlEQVR4nO2bCXeaThfGIwjIsBnRcQHjggvuSxKrqP2/+f5f6h00RgbQWBUhOfd32p5U1M7DnXnuon16AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABRNnzfq7dd1x7Zty7LtbmfZrq/mTU2Je2m3o2jz+nvXfnMYXnRhXXY/8YyztTvvq6b6g2XqjXa3JWZdMQzLhCDyvIiszmKuxb3UK1Cbi06LIUFjmP2vAOznHySkzttypce94n9Dr3cdEYXGLQyycdHbayPuVV+MvvqDsnx44M6oFLNWuxn32i9BX9iO+G/iDojZ1nIT9/q/Q39viegqeW4YSSBRJ9GbVX/f8teF76hSZLobNW4hJ1Drb2JIXC6InOdJ5GfR6STSWJVGK+uT41rktxIdBzmBOKLX5GnU1wxiWXqdjLWuW98pRMtF10Ei9VqWQdYqYaVOvUX5J+t6//tGe2r44xNkqz81V10mSxsUixK1VfUOI9LL2y4bO7uwvzdWcU2epzTbtkM/F23riQljw6LKFyS2Dql7HrSeAKwz3z1Xa9gkjt6Yo9dkmKr6TtkJy9tf917tXKCQ4deHt5ovHepeiVYSkqO+9mwuUkVb9WOj0Ay4JPGQYMHjHIu1+ZLxmg5i4t+puuUJEys6C28j1PaF0Mk6dtdy/Gczu/C8ZtNF3ndErzFLnFtZb4B8aczvM+R8qgoxlRb9MOp6z5uysrwvi9lTvRFkxTffqdHf6AS5PVxv0B0xu6VF6K+kaf5C7MTZH68PAknphdp+55tTx5Bl5l9XGgx9xW8oG/t4GlnRjs9StdbXGtHbKnB5RW1S/vV4xWeyfN3/Un3JOF9hps7pY9FaX6sIOy11rwyW8bZ+q6xXIWqHvNj5erVox7dP3w9RcsK6c8pKWcd7D+a0wteQVzdt9nOXi90Yt+lht4mdkEXQCltehU1KIR+m8Em3Py//DR6AB7LajyzYMMdb0DGcey41aIUhu9Tdp/ub16pHtPYL2dj7thAFo0idQwZ5/eKddpoQK1Hq+4zi2LGPbrTlvi4NRpHOCYx13KZNOlOi4DZUX90KlSU1TRKmxfXtLkHzf3x+2nS8CZFF68N1rct7BbKtgE81u7vbhvxFRFw0rd1h5Lv0/Vb/o4ts1N0raf7xdbuBbLDZvSGb7SRmgKq0dy1D9r859fCrr/IWkd2ut21EP8yKPitV23/disaxYvVQP42t6478lpK4cfyzKZ5HPM/4EOmtSPox1q0Cl4kJ4B596UpEjve+q7a/A2aDgykWWZQLz0k17455EhXAPYvduNSpex6ii7MT0FVpvSUyDmq1k2ChAfbNojfvKdYFM3DLK2ZBTIjPduaBN08Gyjvp30l5c2zLAycxCOs5heo6y4piJ/Ycfxql0SJBy9aPj/gHGQG8AzV1iRBvr5IxYTuF3nZQdn0MIukEz0XRQd72tvFXTLo+F32x9p4irXvabViGt70pQVs0kq8viG6floishOW861A7KCQN7gTGOmS6I1o77HNvVmSSmfSuYuOvRd3peGKT3lWoja5DCtLdbiW/eXG73sQ+r78z6nzRbaGsC9/q1H+Fw4SgNzeNTfP3nD4AAG6mUCwWc7k8YTweG4ZRrVZrtZrxe3yi0B8MygSOS3GyYO7AhNKvkaiVTS4tc3tkOZVJpVKZTCozMeJe2b1QZkIqDDyKe2X3QhlK4Qp7ca/sbkxPKJw+Kar2/FLYO5FLsVgo/MT/WTAKVygMSpXKcDjrEyfaWVG5PBj0+8PKdFTNF36Uzlq4wlRakkyBkCbIaZmQTpO/ShKe4MywZxTjXvjFGCcUniMjSGZ5WC3+jFCO5X9X6CILeNDLxb36S8hx6eskEpF4Mswnf2xWGIQnxIvgTK6UT/peVWZXbtM9aQlPx3Fr+IaSeYtCN45yxXiJW8U5Rvg2hcRaTXM2Gie3VB/fGEM3jBwxHTwokWIgl8Cy5wYzpSBJEkupQX9Y6o2qxji/q/IKhQR47cuJ7uI6ZM6UTPxBQopN0+3K+r3vqx8lXx31etWoDrPSu6Kq+Q4iLSXvSj1SGJxvNZVibchJBDyLqhKs3mw15zG5/Bl9xrSMTW53VyLr2HKTaBWmpNmJw6jke9xE4jL7p3EyV4hGocLd8yCGgUODqFUrnEm5nBnVNi1JXLQKJ9XgP5ofDT5ofan0IKqcatyeEc+Da75/8SUQvtCn3Y1cOdptyvliWBz1ibn49408GUZWFimlCPKFV6H3fL0YwwkO3tGMxI0irPsizhdS6VDIKcXRTDJDTr0klM6klNsppg+OHQGcOfgcBTwbJRPLQX0ZAQ8j7sCUWzuoUDKZVDpNitXhLjpavtcPDR9pMftG5NWrcW2+ENxq68CEhjwipMqVfblpVDgscAF7cUchQi2iRO/leXBdoy/3S9NerzcajWq1arVqGGNCPr8fH79o2ldoqv+TQjsYGZdHj+mee1d5jVQqqMoF7aBSO1E2mVzpUeO665rEC1N0voJD393ElUgNlEI58fHFeYRh2AlSCKqqEZ6fXwr56pAzw5w6jYfGI8cB46saDLnk+/CYnMhebzqdlkoV92OP4WyQxsHyjKSQ9KRce/Bk56pOnzO93vlBwG5vb5puR2tKgiyEv2saD6KsYMIxrq5N6RSQ2XH+FaYcx+cB2omPSu9ORsLRVmgnMXB0lZtHX9ocjmOaN6qPCKIw4arxjY7zdE5MYymkSr4JYjAx6ntypxneu92rlgaydMfeOCOVL5idRkqu7AmiROqVwph04zi8ovxnJOlhFdppavi4LT8rMjVXqwxMsl9v3LBCupKEDxq1Y4Gcxl+TaqVoTOWPm0IpTAbRt4AXMZbNw1fbStQdV/K1SpnUX9dEkpNxP2ScGA+KQcrJitvzGc/+a1qRWI8QMkT6hrRUHj2gxb0TrvVImBjshbEkpxfjn/GNjSNqjoTSvPBQcqYcU4V2G671lCduV8SlzlZ6wqT/0BbwrrjWM8BYONNGCPgH69uhkVD2SSIP9x5BGjxihhY5ap6cSlL2yHRJK+CP/q/Qt+c5X5vOygIm0SSYxGvLs16Cv3xyHYXcuNYrDWez2XA6MvKJ/gIRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAJPwf/KvWiNnlbpAAAAAASUVORK5CYII=" class="w-full rounded-lg" />
  </div>
  <div class="p-6 text-center">
    <h3 class="text-xl font-bold">Eye Donation</h3>
    <p class="mt-3 text-sm text-gray-500 leading-relaxed">Need 5 eyes urgently for the recipients in the hospital. Are you willing to donate?</p>
    <button type="button" class="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700" onClick={handleClick}>Donate</button>
  </div>
</div>

<div
  class="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
  <div class="min-h-[245px]">
    <img src="https://cdn-icons-png.flaticon.com/512/7000/7000572.png" class="w-full rounded-lg" />
  </div>
  <div class="p-6 text-center">
    <h3 class="text-xl font-bold">Kidney Donation</h3>
    <p class="mt-3 text-sm text-gray-500 leading-relaxed">Need 10 Kidneys urgently for the recipients in the hospital. Are you willing to donate?</p>
    <button type="button" class="mt-6 px-5 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700" onClick={handleClick}>Donate</button>
  </div>
</div>
</div>
        </>
    );
}

export default UserDashboard;
