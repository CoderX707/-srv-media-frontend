import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { authChecker, ApiHelperPost, toastMessage } from "../Helpers/Helpers";
import { ToastContainer } from "react-toastify";
import SingleCart from "../Components/SingleCart";
import { useNavigate } from "react-router-dom";

export default function Cart({
  isOpen,
  callBackFunc,
  removeCallback,
  cartItems,
}) {
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  function submitSubscription(params) {
    let userDetails = authChecker();
    let subscriptionDetails = cartItems.map((channel) => {
      return {
        channel_id: channel.id,
        user_id: userDetails.user.id,
        startDate: channel.fromDate,
        endDate: channel.endDate,
        days: channel.days,
        total: channel?.total,
      };
    });
    console.log(subscriptionDetails);
    ApiHelperPost("/channels/subscription", {
      subscriptionDetails,
      token: userDetails.token,
    }).then((res) => {
      if (res.status === 200) {
        toastMessage("subscription successful");
        navigate('/subscription')
      } else {
        for (let key in res.data[0]) {
          toastMessage(key + ": " + res.data[0][key]);
        }
      }
    });
  }

  useEffect(() => {
    if (cartItems.length > 1) {
      let total = cartItems.reduce(function (a, b) {
        return a.total + b.total;
      });
      setSubTotal(total);
    } else {
      setSubTotal(cartItems[0]?.total);
    }
  }, []);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={callBackFunc}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={callBackFunc}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cartItems.map((channel, index) => (
                            <SingleCart
                              key={index}
                              channel={channel}
                              removeCallback={removeCallback}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="mt-6">
                      <a
                        onClick={submitSubscription}
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Add to Subscription
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="text-indigo-600 font-medium hover:text-indigo-500"
                          onClick={callBackFunc}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
          <ToastContainer />
        </div>
      </Dialog>
    </Transition.Root>
  );
}
