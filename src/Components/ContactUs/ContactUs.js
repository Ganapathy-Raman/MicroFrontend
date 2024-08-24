import React from "react";
import "./ContactUs.css";
import { Link } from "react-router-dom";

function ContactUs() {
  return (
    <>
      <div class="bg-green-50 font-[sans-serif] lg:h-screen">
        <div
          class="grid lg:grid-cols-3 items-center max-lg:justify-center gap-6 h-full sm:p-12 p-8 max-sm:p-4">
          <div class="max-w-lg max-lg:mx-auto max-lg:text-center max-lg:mb-6">
            <h2 class="text-4xl font-extrabold text-gray-800">Want to know more about Organ Donation</h2>
            <p class="text-sm text-gray-600 mt-4 leading-relaxed">You can donate organs or you may need organs please feel free to contact us.</p>

            <form class="mx-auto mt-8 bg-white rounded-lg p-6 shadow-md space-y-4">
              <input type='text' placeholder='Name'
                class="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
              <input type='email' placeholder='Email'
                class="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
              <input type='text' placeholder='Address'
                class="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none" />
              <textarea placeholder='Description' rows="6"
                class="w-full rounded-md px-6 bg-[#f0f1f2] text-sm pt-3 outline-none"></textarea>
              <button type='button'
                class="text-gray-800 bg-green-200 hover:bg-green-300 font-semibold rounded-md text-sm px-6 py-3 block w-full">Send
                Message</button>
            </form>
          </div>

          <div class="z-10 relative lg:col-span-2">
            <img src="https://readymadeui.com/images/analtsis.webp" class="w-3/4 object-contain block mx-auto" />
          </div>
        </div>
      </div>
    </>
  )
}
export default ContactUs;