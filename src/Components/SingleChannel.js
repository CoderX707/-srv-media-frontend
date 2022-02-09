import React from "react";
import { base_img_url } from "../Helpers/Constant";

export default function SingleChannel({ addTocart, channel, category }) {
  return (
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={base_img_url + channel.channel_image}
          alt="blog"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {category.name}
          </h2>
          <h1 className="title-font capitalize text-lg font-medium text-gray-900 mb-3">
            {channel.channel_title}
          </h1>
          <p className="leading-relaxed mb-3">{channel.channel_description}</p>
          <div className="flex items-center flex-wrap ">
            <button  onClick={ (e) =>addTocart(channel)} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Price: {channel.subscription_price}
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
