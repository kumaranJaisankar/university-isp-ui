import React from "react";
import { Hourglass } from "react-loader-spinner";

function Loader(props) {
  if (!props.isLoading) {
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100vw",
        backgroundColor: "#000000a5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </div>
  );
}

export default Loader;
