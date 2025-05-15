import { useState, useEffect } from "react";
import SearchBar from "./SearchUser";
import { db } from "../../firebase/firebase.config";
import { getAuth } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const auth = getAuth();

const ChatPage = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Listen to auth state and store current user's email in lowercase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setCurrentUserEmail(user.email.toLowerCase());
      else setCurrentUserEmail(null);
    });
    return unsubscribe;
  }, []);

  // Listen for messages between current user and selected user
  useEffect(() => {
    let unsubscribe;

    if (selectedUser && currentUserEmail) {
      const messagesRef = collection(db, "messages");

      // Query for messages containing current user in participants and ordered by timestamp
      const q = query(
        messagesRef,
        where("participants", "array-contains", currentUserEmail),
        orderBy("timestamp", "asc")
      );

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = [];
        console.log("Messages fetched count:", querySnapshot.size);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Doc data:", data);

          // Normalize emails for reliable comparison
          const senderEmail = data.sender.toLowerCase();
          const participantsLower = data.participants.map(p => p.toLowerCase());
          const selectedUserEmail = selectedUser.email.toLowerCase();

          // Filter messages where participants contain both current user and selected user
          if (
            participantsLower.includes(currentUserEmail) &&
            participantsLower.includes(selectedUserEmail)
          ) {
            msgs.push({
              id: doc.id,
              ...data,
              fromMe: senderEmail === currentUserEmail,
            });
          }
        });

        console.log("Filtered messages:", msgs);
        setMessages(msgs);
      });
    } else {
      setMessages([]);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedUser, currentUserEmail]);

  // Handle user selection from SearchBar
  const handleUserFound = (user) => {
    if (!user.email) {
      alert("Selected user has no email — cannot chat.");
      return;
    }
    setSelectedUser({
      ...user,
      email: user.email.toLowerCase(),
    });
    setMessages([]);
  };

  // Send message handler
  const handleSend = async () => {
    if (!message.trim()) return;

    if (!selectedUser?.email) {
      alert("Selected user email is missing. Cannot send message.");
      return;
    }

    if (!currentUserEmail) {
      alert("You must be logged in to send messages.");
      return;
    }

    try {
      const messagesRef = collection(db, "messages");

      await addDoc(messagesRef, {
        sender: currentUserEmail,
        receiver: selectedUser.email,
        message: message.trim(),
        participants: [currentUserEmail, selectedUser.email].map(email => email.toLowerCase()), // store lowercase
        timestamp: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error("Sending failed", error);
      alert(`Failed to send message: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chatting</h2>

      {!selectedUser && <SearchBar onSearch={handleUserFound} />}

      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <h3>Chatting with: {selectedUser.name}</h3>

          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "300px",
              overflowY: "auto",
              marginBottom: "10px",
            }}
          >
            {messages.length === 0 ? (
              <p style={{ color: "#777" }}>No messages yet</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    textAlign: msg.fromMe ? "right" : "left",
                    margin: "5px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: msg.fromMe ? "#dcf8c6" : "#f1f0f0",
                      padding: "8px 12px",
                      borderRadius: "15px",
                      maxWidth: "70%",
                      wordWrap: "break-word",
                    }}
                  >
                    {msg.message}
                  </span>
                </div>
              ))
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ flex: 1, padding: "10px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;


// import { useState, useEffect } from "react";
// import SearchBar from "./SearchUser";
// import { db } from "../../firebase/firebase.config";
// import { getAuth } from "firebase/auth";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// const auth = getAuth();

// const ChatPage = () => {
//   const [currentUserEmail, setCurrentUserEmail] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Listen to auth state and store current user's email lowercase
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) setCurrentUserEmail(user.email.toLowerCase());
//       else setCurrentUserEmail(null);
//     });
//     return unsubscribe;
//   }, []);

//   // Listen for messages between current user and selected user
//   useEffect(() => {
//     let unsubscribe;

//     if (selectedUser && currentUserEmail) {
//       const messagesRef = collection(db, "messages");
//       const q = query(
//         messagesRef,
//         where("participants", "array-contains", currentUserEmail),
//         orderBy("timestamp", "asc")
//       );

//       unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const msgs = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();

//           // Normalize emails to lowercase for reliable comparison
//           const senderEmail = data.sender.toLowerCase();
//           const participantsLower = data.participants.map(p => p.toLowerCase());
//           const selectedUserEmail = selectedUser.email.toLowerCase();

//           // Check if message participants include both current user and selected user
//           if (
//             participantsLower.includes(currentUserEmail) &&
//             participantsLower.includes(selectedUserEmail)
//           ) {
//             msgs.push({
//               id: doc.id,
//               ...data,
//               fromMe: senderEmail === currentUserEmail,
//             });
//           }
//         });
//         setMessages(msgs);
//       });
//     } else {
//       setMessages([]);
//     }

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [selectedUser, currentUserEmail]);

//   // Handle user selection from SearchBar
//   const handleUserFound = (user) => {
//     if (!user.email) {
//       alert("Selected user has no email — cannot chat.");
//       return;
//     }
//     setSelectedUser({
//       ...user,
//       email: user.email.toLowerCase(),
//     });
//     setMessages([]);
//   };

//   // Send message handler
//   const handleSend = async () => {
//     if (!message.trim()) return;

//     if (!selectedUser?.email) {
//       alert("Selected user email is missing. Cannot send message.");
//       return;
//     }

//     if (!currentUserEmail) {
//       alert("You must be logged in to send messages.");
//       return;
//     }

//     try {
//       const messagesRef = collection(db, "messages");

//       await addDoc(messagesRef, {
//         sender: currentUserEmail,
//         receiver: selectedUser.email,
//         message: message.trim(),
//         participants: [currentUserEmail, selectedUser.email],
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//     } catch (error) {
//       console.error("Sending failed", error);
//       alert(`Failed to send message: ${error.message}`);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Chat with a User</h2>

//       {!selectedUser && <SearchBar onSearch={handleUserFound} />}

//       {selectedUser && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Chatting with: {selectedUser.name}</h3>

//           <div
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               height: "300px",
//               overflowY: "auto",
//               marginBottom: "10px",
//             }}
//           >
//             {messages.length === 0 ? (
//               <p style={{ color: "#777" }}>No messages yet</p>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   style={{
//                     textAlign: msg.fromMe ? "right" : "left",
//                     margin: "5px 0",
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: "inline-block",
//                       background: msg.fromMe ? "#dcf8c6" : "#f1f0f0",
//                       padding: "8px 12px",
//                       borderRadius: "15px",
//                       maxWidth: "70%",
//                       wordWrap: "break-word",
//                     }}
//                   >
//                     {msg.message}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               style={{ flex: 1, padding: "10px" }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;




// import { useState, useEffect } from "react";
// import SearchBar from "./SearchUser";
// import { db } from "../../firebase/firebase.config";
// import { getAuth } from "firebase/auth";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// const auth = getAuth();

// const ChatPage = () => {
//   const [currentUserEmail, setCurrentUserEmail] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) setCurrentUserEmail(user.email);
//       else setCurrentUserEmail(null);
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     let unsubscribe;

//     if (selectedUser && currentUserEmail) {
//       const messagesRef = collection(db, "messages");
//       const q = query(
//         messagesRef,
//         where("participants", "array-contains", currentUserEmail),
//         orderBy("timestamp", "asc")
//       );

//       unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const msgs = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           if (
//             data.participants.includes(selectedUser.email) &&
//             (data.sender === currentUserEmail || data.sender === selectedUser.email)
//           ) {
//             msgs.push({
//               id: doc.id,
//               ...data,
//               fromMe: data.sender === currentUserEmail,
//             });
//           }
//         });
//         setMessages(msgs);
//       });
//     } else {
//       setMessages([]);
//     }

//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [selectedUser, currentUserEmail]);

//   // Log and set user found by SearchBar
//   const handleUserFound = (user) => {
//     console.log("User found in ChatPage:", user);
//     if (!user.email) {
//       alert("Selected user has no email — cannot chat.");
//       return;
//     }
//     setSelectedUser(user);
//     setMessages([]);
//   };

//   const handleSend = async () => {
//     console.log("handleSend triggered");
//     console.log("Sending message to:", selectedUser);
//     console.log("Receiver email:", selectedUser?.email);

//     if (!message.trim()) return;

//     if (!selectedUser?.email) {
//       alert("Selected user email is missing. Cannot send message.");
//       return;
//     }

//     if (!currentUserEmail) {
//       alert("You must be logged in to send messages.");
//       return;
//     }
//     console.log("Sending message:", message, "to", selectedUser.email, 'from', currentUserEmail);
//     try {
//       const messagesRef = collection(db, "messages");
//       await addDoc(messagesRef, {
//         sender: currentUserEmail,
//         receiver: selectedUser.email,
//         message: message.trim(),
//         participants: [currentUserEmail, selectedUser.email],
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//     } catch (error) {
//       console.error("Sending failed", error);
//       alert(`Failed to send message: ${error.message}`);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Chat with a User</h2>

//       {!selectedUser && <SearchBar onSearch={handleUserFound} />}

//       {selectedUser && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Chatting with: {selectedUser.name}</h3>

//           <div
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               height: "300px",
//               overflowY: "auto",
//               marginBottom: "10px",
//             }}
//           >
//             {messages.length === 0 ? (
//               <p style={{ color: "#777" }}>No messages yet</p>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   style={{
//                     textAlign: msg.fromMe ? "right" : "left",
//                     margin: "5px 0",
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: "inline-block",
//                       background: msg.fromMe ? "#dcf8c6" : "#f1f0f0",
//                       padding: "8px 12px",
//                       borderRadius: "15px",
//                       maxWidth: "70%",
//                       wordWrap: "break-word",
//                     }}
//                   >
//                     {msg.message}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               style={{ flex: 1, padding: "10px" }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//             />
//             <button onClick={handleSend}>
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;



// import { useState, useEffect } from "react";
// import SearchBar from "./SearchUser";
// import { db } from "../../firebase/firebase.config";
// import { getAuth } from "firebase/auth";

// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// const auth = getAuth();

// const ChatPage = () => {
//   // State to hold current user email after auth state is known
//   const [currentUserEmail, setCurrentUserEmail] = useState(null);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   // Listen to auth state changes to get current user email reliably
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setCurrentUserEmail(user.email);
//       } else {
//         setCurrentUserEmail(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   useEffect(() => {
//     let unsubscribe;

//     // Only fetch messages if a user is selected and current user is logged in
//     if (selectedUser && currentUserEmail) {
//       const messagesRef = collection(db, "messages");

//       // Query all messages where current user is participant, ordered by timestamp
//       const q = query(
//         messagesRef,
//         where("participants", "array-contains", currentUserEmail),
//         orderBy("timestamp", "asc")
//       );

//       unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const msgs = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();

//           // Filter messages strictly between current user and selected user
//           if (
//             data.participants.includes(selectedUser.email) &&
//             (data.sender === currentUserEmail || data.sender === selectedUser.email)
//           ) {
//             msgs.push({
//               id: doc.id,
//               ...data,
//               fromMe: data.sender === currentUserEmail,
//             });
//           }
//         });
//         setMessages(msgs);
//       });
//     } else {
//       // Clear messages if no user selected or no logged in user
//       setMessages([]);
//     }

//     // Cleanup listener on unmount or user change
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [selectedUser, currentUserEmail]);

//   const handleUserFound = (user) => {
//     console.log("Sending message to:", selectedUser);
//     console.log("Receiver email:", selectedUser?.email);

//     setSelectedUser(user);
//     setMessages([]); // Clear old messages when switching users
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     if (!selectedUser) {
//       alert("Please select a user to chat with.");
//       return;
//     }

//     if (!currentUserEmail) {
//       alert("You must be logged in to send messages.");
//       return;
//     }

//     try {
//       const messagesRef = collection(db, "messages");

//       await addDoc(messagesRef, {
//   sender: currentUserEmail || "testsender@example.com",
//   receiver: selectedUser?.email || "testreceiver@example.com",
//   message: message.trim() || "test message",
//   participants: [currentUserEmail || "testsender@example.com", selectedUser?.email || "testreceiver@example.com"],
//   timestamp: serverTimestamp(),
// });

//       setMessage("");
//     } catch (error) {
//       console.error("Sending failed", error);
//       alert(`Failed to send message: ${error.message}`);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Chat with a User</h2>

//       {!selectedUser && (
//         <SearchBar onSearch={(userData) => handleUserFound(userData)} />
//       )}

//       {selectedUser && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Chatting with: {selectedUser.name}</h3>

//           <div
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               height: "300px",
//               overflowY: "auto",
//               marginBottom: "10px",
//             }}
//           >
//             {messages.length === 0 ? (
//               <p style={{ color: "#777" }}>No messages yet</p>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   style={{
//                     textAlign: msg.fromMe ? "right" : "left",
//                     margin: "5px 0",
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: "inline-block",
//                       background: msg.fromMe ? "#dcf8c6" : "#f1f0f0",
//                       padding: "8px 12px",
//                       borderRadius: "15px",
//                       maxWidth: "70%",
//                       wordWrap: "break-word",
//                     }}
//                   >
//                     {msg.message}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               style={{ flex: 1, padding: "10px" }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;





// import { useState, useEffect } from "react";
// import SearchBar from "./SearchUser";
// import { db } from "../../firebase/firebase.config";
// import { getAuth } from "firebase/auth";

// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";



// const auth = getAuth();
// const currentUser = auth.currentUser;
// const currentUserEmail = auth.currentUser?.email;


// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     let unsubscribe;

//     if (selectedUser && currentUserEmail) {
//       // Query messages where sender and receiver pair match either way (chat between these two)
//       const messagesRef = collection(db, "messages");
//       const q = query(
//         messagesRef,
//         where("participants", "array-contains", currentUserEmail),
//         orderBy("timestamp", "asc")
//       );

//       // Listen for real-time updates and filter messages between YOU and selectedUser
//       unsubscribe = onSnapshot(q, (querySnapshot) => {
//         const msgs = [];
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           // Filter messages only between the two users (both directions)
//           if (
//             data.participants.includes(selectedUser.email) &&
//             (data.sender === currentUserEmail || data.sender === selectedUser.email)
//           ) {
//             msgs.push({
//               id: doc.id,
//               ...data,
//               fromMe: data.sender === currentUserEmail,
//             });
//           }
//         });
//         setMessages(msgs);
//       });
//     }

//     // Cleanup subscription on unmount or when selectedUser changes
//     return () => {
//       if (unsubscribe) unsubscribe();
//     };
//   }, [selectedUser]);

//   const handleUserFound = (user) => {
//     setSelectedUser(user);
//     setMessages([]); // clear old messages
//   };

//   const handleSend = async () => {
//     if (!message.trim() || !selectedUser) return;

//     try {
//       const messagesRef = collection(db, "messages");
//       await addDoc(messagesRef, {
//         sender: currentUserEmail,
//         receiver: selectedUser.email,
//         message: message.trim(),
//         participants: [currentUserEmail, selectedUser.email], // for querying
//         timestamp: serverTimestamp(),
//       });
//       setMessage("");
//     } catch (error) {
//       console.error("Sending failed", error);
//       alert("Failed to send message");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>Chat with a User</h2>

//       {!selectedUser && (
//         <SearchBar onSearch={(userData) => handleUserFound(userData)} />
//       )}

//       {selectedUser && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Chatting with: {selectedUser.name}</h3>

//           <div
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               height: "300px",
//               overflowY: "auto",
//               marginBottom: "10px",
//             }}
//           >
//             {messages.length === 0 ? (
//               <p style={{ color: "#777" }}>No messages yet</p>
//             ) : (
//               messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   style={{
//                     textAlign: msg.fromMe ? "right" : "left",
//                     margin: "5px 0",
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: "inline-block",
//                       background: msg.fromMe ? "#dcf8c6" : "#f1f0f0",
//                       padding: "8px 12px",
//                       borderRadius: "15px",
//                     }}
//                   >
//                     {msg.message}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           <div style={{ display: "flex", gap: "10px" }}>
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               style={{ flex: 1, padding: "10px" }}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSend();
//               }}
//             />
//             <button onClick={handleSend}>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatPage;



