import { PaperClipIcon } from "@heroicons/react/24/solid";
import { useState } from "react";




const MessageInput = ({ conversation = null  }) => {
    const [newMessage, setNewMessage] = useState("");
    const [inputErrorMessage, serInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);

    return (
        <div className="flex flex-wrap items-start border-t border-gray-700 py-3"> 
           <div className="order-2 flex-1 xs:flex-none xs:order-1 p-2">
            <button className="p-1 text-gray-400 hover:text-gray-300 relative">
                <PaperClipIcon className="w-6" />
                <input type="file" multiple 
                className="absolute left-0 top-0 right-0 bottom-0 z-20 opacity-0 cursor-pointer" />
            </button>
           </div>
        </div>
    );
};


export default MessageInput;