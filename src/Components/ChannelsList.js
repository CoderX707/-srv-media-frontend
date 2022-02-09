import React, { useEffect, useState } from "react";
import Cart from "../Screens/Cart";
import SingleChannel from "./SingleChannel";
import { ApiHelperPost, authChecker } from "../Helpers/Helpers";

export default function ChannelsList() {
  const [open, setOpen] = useState(false);
  const [channels, setchannels] = useState([]);
  const [subscribeChannel, setsubscribeChannel] = useState([]);
  let userDetails = authChecker();

  useEffect(() => {
    ApiHelperPost("/channels/", { token: userDetails.token }).then((res) => {
      setchannels(res.data);
    });
  }, []);

  function addTocart(channel) {
    setOpen(true);
    let filteredChannel = subscribeChannel.filter((item) => item.id !== channel.id);
    setsubscribeChannel([...filteredChannel, channel]);
    console.log(channel);
  }
  function removeChannel(removeChannel) {
    setsubscribeChannel(
      subscribeChannel.filter((item) => item.id !== removeChannel.id)
    );
  }

  function closeCallback() {
    setOpen(false);
  }
  return (
    <section className="text-gray-600 body-font">
      <Cart isOpen={open} callBackFunc={closeCallback} cartItems={subscribeChannel} removeCallback={removeChannel} />
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {channels.map((category, index) => {
            return (
              <>
                {category.channels.map((channel, i) => {
                  return (
                    <SingleChannel
                      addTocart={addTocart}
                      key={index}
                      channel={channel}
                      category={category}
                    />
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
