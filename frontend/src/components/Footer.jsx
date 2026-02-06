import React from 'react';
import { FaTruck, FaSmile, FaShieldAlt, FaStar } from 'react-icons/fa';
import beadImage from '../assets/image/beaded_designs.png'; // adjust path to your image

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] text-black px-6 grid md:grid-cols-2 pt-9 inter">
      {/* Top Features */}
      <div class="flex flex-wrap justify-around border-b pb-2 mb-5">
        

        <div class="flex flex-col items-center w-1/2 sm:w-auto text-center p-4">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.4091 14.7663V19.0953H9.90182L7.54285 15.6963H7.50058V19.0953H6.97636V14.7663H7.48367L9.85109 18.1737H9.89337V14.7663H10.4091ZM11.4581 19.0953V14.7663H14.0707V15.2313H11.9823V16.694H13.9354V17.1591H11.9823V18.6302H14.1045V19.0953H11.4581ZM15.8019 19.0953L14.6182 14.7663H15.1508L16.0555 18.292H16.0978L17.0194 14.7663H17.6113L18.5329 18.292H18.5752L19.4799 14.7663H20.0125L18.8288 19.0953H18.2877L17.3323 15.6456H17.2984L16.343 19.0953H15.8019Z" fill="black" />
            <path d="M8.23804 5.05958V5.05958C9.71531 9.92591 16.6304 9.85306 18.0048 4.95669L18.0595 4.76196" stroke="black" stroke-width="1.5" />
            <path d="M19.9553 1.78571H4.91562C4.27742 1.78571 3.75275 2.28897 3.72618 2.92662L2.93253 21.9742C2.90435 22.6506 3.44504 23.2143 4.12197 23.2143H21.8071C22.5101 23.2143 23.06 22.6083 22.992 21.9086L21.1402 2.86098C21.0809 2.251 20.5681 1.78571 19.9553 1.78571Z" stroke="black" stroke-width="1.5" />
          </svg>

          <p class="text-sm">Newly Made for You</p>
        </div>

        <div class="flex flex-col items-center w-1/2 sm:w-auto text-center p-4">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 7.5C15.5 7.5 16 7.5 16.5 8.5C16.5 8.5 18.0882 6 19.5 5.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22.5 7C22.5 9.76142 20.2614 12 17.5 12C14.7386 12 12.5 9.76142 12.5 7C12.5 4.23858 14.7386 2 17.5 2C20.2614 2 22.5 4.23858 22.5 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" />
            <path d="M23.25 13.2445C23.2493 12.8302 22.9129 12.495 22.4987 12.4958C22.0845 12.4965 21.7493 12.8329 21.75 13.2471L23.25 13.2445ZM9.56582 6.75292C9.98003 6.75057 10.3139 6.41289 10.3116 5.99869C10.3092 5.58448 9.97154 5.2506 9.55734 5.25294L9.56582 6.75292ZM14 21.2504H11V22.7504H14V21.2504ZM11 21.2504C9.10311 21.2504 7.74353 21.2493 6.69895 21.1313C5.66816 21.0148 5.04359 20.7931 4.57229 20.4209L3.64263 21.5981C4.426 22.2168 5.36842 22.4905 6.53058 22.6218C7.67896 22.7515 9.13832 22.7504 11 22.7504V21.2504ZM1.75 14.0004C1.75 15.7493 1.74857 17.1321 1.88762 18.2226C2.02932 19.3337 2.32681 20.2394 2.99298 20.9866L4.11262 19.9884C3.72599 19.5547 3.49708 18.9856 3.37558 18.0328C3.25143 17.0593 3.25 15.789 3.25 14.0004H1.75ZM4.57229 20.4209C4.40545 20.2892 4.2517 20.1444 4.11262 19.9884L2.99298 20.9866C3.19068 21.2084 3.40811 21.4129 3.64263 21.5981L4.57229 20.4209ZM21.75 14.0004C21.75 15.789 21.7486 17.0593 21.6244 18.0328C21.5029 18.9856 21.274 19.5547 20.8874 19.9884L22.007 20.9866C22.6732 20.2394 22.9707 19.3337 23.1124 18.2226C23.2514 17.1321 23.25 15.7493 23.25 14.0004H21.75ZM14 22.7504C15.8617 22.7504 17.321 22.7515 18.4694 22.6218C19.6316 22.4905 20.574 22.2168 21.3574 21.5981L20.4277 20.4209C19.9564 20.7931 19.3318 21.0148 18.301 21.1313C17.2565 21.2493 15.8969 21.2504 14 21.2504V22.7504ZM20.8874 19.9884C20.7483 20.1444 20.5946 20.2892 20.4277 20.4209L21.3574 21.5981C21.5919 21.4129 21.8093 21.2084 22.007 20.9866L20.8874 19.9884ZM3.25 14.0004C3.25 12.2118 3.25143 10.9415 3.37558 9.96799C3.49708 9.01519 3.72599 8.44606 4.11262 8.0124L2.99298 7.0142C2.32681 7.76141 2.02932 8.66709 1.88762 9.77825C1.74857 10.8687 1.75 12.2515 1.75 14.0004H3.25ZM3.64263 6.40268C3.40811 6.58789 3.19068 6.79245 2.99298 7.0142L4.11262 8.0124C4.2517 7.8564 4.40545 7.71161 4.57229 7.57986L3.64263 6.40268ZM23.25 14.0004C23.25 13.7412 23.2504 13.4875 23.25 13.2445L21.75 13.2471C21.7504 13.4885 21.75 13.7376 21.75 14.0004H23.25ZM9.55734 5.25294C8.14978 5.26091 7.00411 5.29333 6.06558 5.44144C5.11301 5.59178 4.31862 5.86882 3.64263 6.40268L4.57229 7.57986C4.97956 7.25822 5.50124 7.04907 6.29942 6.92311C7.11164 6.79492 8.15139 6.76092 9.56582 6.75292L9.55734 5.25294Z" fill="black" />
            <path d="M10.5 18H12" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 18H18.5" stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 11H10.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <p class="text-sm">Safe & Trustworthy</p>
        </div>

        <div class="flex flex-col items-center w-1/2 sm:w-auto text-center p-4">
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 20C18.6046 20 19.5 19.1046 19.5 18C19.5 16.8954 18.6046 16 17.5 16C16.3954 16 15.5 16.8954 15.5 18C15.5 19.1046 16.3954 20 17.5 20Z" stroke="black" stroke-width="1.5" />
            <path d="M7.5 20C8.60457 20 9.5 19.1046 9.5 18C9.5 16.8954 8.60457 16 7.5 16C6.39543 16 5.5 16.8954 5.5 18C5.5 19.1046 6.39543 20 7.5 20Z" stroke="black" stroke-width="1.5" />
            <path d="M5.5 17.9724C4.40328 17.9178 3.7191 17.7546 3.23223 17.2678M9.5 18H15.5M19.5 17.9724C20.5967 17.9178 21.2809 17.7546 21.7678 17.2678C22.5 16.5355 22.5 15.357 22.5 13V11H17.8C17.0555 11 16.6832 11 16.382 10.9021C15.7731 10.7043 15.2957 10.2269 15.0979 9.61803C15 9.31677 15 8.94451 15 8.2C15 7.08323 15 6.52485 14.8532 6.07295C14.5564 5.15964 13.8404 4.44358 12.9271 4.14683C12.4752 4 11.9168 4 10.8 4H2.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.5 7H8.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.5 10H6.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2.5 13H6.5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 6H16.8212C18.2766 6 19.0042 6 19.5964 6.35371C20.1886 6.70742 20.5336 7.34811 21.2236 8.6295L22.5 11" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <p class="text-sm">Fast Delivery</p>
        </div>

        <div class="flex flex-col items-center w-1/2 sm:w-auto text-center p-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 13.5H16M8 8.5H12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.09881 19C4.7987 18.8721 3.82475 18.4816 3.17157 17.8284C2 16.6569 2 14.7712 2 11V10.5C2 6.72876 2 4.84315 3.17157 3.67157C4.34315 2.5 6.22876 2.5 10 2.5H14C17.7712 2.5 19.6569 2.5 20.8284 3.67157C22 4.84315 22 6.72876 22 10.5V11C22 14.7712 22 16.6569 20.8284 17.8284C19.6569 19 17.7712 19 14 19C13.4395 19.0125 12.9931 19.0551 12.5546 19.155C11.3562 19.4309 10.2465 20.0441 9.14987 20.5789C7.58729 21.3408 6.806 21.7218 6.31569 21.3651C5.37769 20.6665 6.29454 18.5019 6.5 17.5" stroke="black" stroke-width="1.5" stroke-linecap="round" />
          </svg>

          <p class="text-sm">Friendly Services</p>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between md:w-[89%]">
        {/* Contacts */}
        <div className="md:mb-4 ">
          <h3 className="font-bold mb-2">Contacts</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">TikTok</a></li>
            <li><a href="#" className="hover:underline">WhatsApp</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="md:mb-4">
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul>
            <li><a href="#" className="hover:underline font-semibold">About</a></li>
          </ul>
        </div>

        {/* Beaded Image with Logo Text */}
        <div className="w-full md:w-auto relative">
          <div className="relative w-[290px] h-[270px]">
            <img
              src={beadImage}
              alt="Beaded Design"
              className="w-full h-full object-contain absolute left-380"
            />
          </div>
        </div>
      </div>
    </footer >
  );
};

const Feature = ({ icon, label }) => (
  <div className="flex flex-col items-center text-center space-y-2 w-32">
    <div className="text-2xl">{icon}</div>
    <p className="text-sm">{label}</p>
  </div>
);

export default Footer;
