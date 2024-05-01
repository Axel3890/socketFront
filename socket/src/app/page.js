"use client";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const socket = io("https://socketback-7bws.onrender.com");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSumbit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
    setMessage("");
  }

  useEffect(() => {
    socket.on('message', receiveMessage);

    return () => {
      socket.off('message', receiveMessage);
    }
  }, [])


  const receiveMessage = (message) => setMessages(state => [...state, message])


return (
  <main className="flex min-h-screen flex-col items-center justify-between">
  <div className="flex h-screen w-full max-w-4xl flex-col rounded-lg border border-gray-200 bg-white shadow-md  dark:bg-gray-950 dark:border-gray-800">
    <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-800">
      <div className="flex items-center space-x-3">
        <img
          alt="Avatar"
          className="rounded-full"
          height={40}
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          style={{
            aspectRatio: "40/40",
            objectFit: "cover",
          }}
          width={40}
        />
        <div>
          <p className="text-sm font-medium">Axel</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button size="icon" variant="ghost">
          <PhoneIcon className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <VideoIcon className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <MoreVerticalIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
    <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'Me' ? 'justify-end' : 'justify-start'}`}>
              {msg.from !== 'Me' && (
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height={32}
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width={32}
                />
              )}
              <div className={`max-w-[70%] rounded-lg ${msg.from === 'Me' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-3 shadow-md dark:bg-gray-800 dark:text-gray-50`}>
                <p>{msg.body}</p>
                <p className="mt-1 text-xs text-gray-300">12:00 PM</p>
              </div>
              {msg.from === 'Me' && (
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height={32}
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width={32}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    <form onSubmit={handleSumbit}>
      <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Input
            className="flex-1 bg-transparent"
            placeholder="Mensaje..."
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
          />
          <Button size="icon" variant="ghost">
            <PaperclipIcon className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <SmileIcon className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" variant="ghost">
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  </div>
  </main>
);
}

function MoreVerticalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function PaperclipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
