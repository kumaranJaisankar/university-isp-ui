// import React from "react";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

// import CryptoJS from "crypto-js";

// const getHexEncodedHash = (message, secret) => {
//   const hash = CryptoJS.HmacSHA256(message, secret);

//   return CryptoJS.enc.Hex.stringify(hash);
// };

// export default function TawlkIntegration() {
//   const tawkMessengerRef = React.useRef();
//   const [isTawkLoaded, setIsTawkLoaded] = React.useState(false);
//   const [isUserloggedIn, setLogin] = React.useState(false);

//   React.useEffect(() => {
//     const user = localStorage.getItem("user");
//     setLogin(user != null);
//     if (tawkMessengerRef.current == null || user == null || !isTawkLoaded)
//       return;
//     const apiKey = "374de0d8fe176f2b58ed381a03e8ac151b16befa"; // Example API-key.
//     const hash = getHexEncodedHash(user.email, apiKey);
//     tawkMessengerRef.current.setAttributes(
//       {
//         name: user,
//         email: "kumaranhb5@gmail.com",
//         hash: hash,
//       },
//       function (error) {
//         console.log("is it error");
//         console.log(user);
//         console.log(error);
//       }
//     );
//   }, [isTawkLoaded]);

//   return (
//     <div>
//       {isUserloggedIn && (
//         <TawkMessengerReact
//           propertyId="6544c631f2439e1631eb4daf"
//           widgetId="1heaaccl8"
//           onLoad={() => {
//             console.log("loadingg");
//             setIsTawkLoaded(true);
//           }}
//           ref={tawkMessengerRef}
//         />
//       )}
//     </div>
//   );
// }
