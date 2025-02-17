import React from "react";

const FancyButton = (props) => {
  const handleClickScroll = () => {
    const element = document.getElementById(props.id);
    if (props.id === "home") {
      document.documentElement.scroll({ top: 0, behavior: "smooth" });
    } else if (props.id === "register") {
      window.open("https://dorahacks.io/hackathon/acehack4/detail", "_blank");
      document.documentElement.scroll({ top: 0, behavior: "smooth" });
    }else if (props.id === "digitalswags") {
      window.open("/digitalswags", "_blank");
    }else if (props.id === "CTF") {
      window.open("https://techonquer.org/registration-1/", "_blank");
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <button
      className="hover:translate-x-1 hover:translate-y-1 text-black hover:shadow-none uppercase bg-black font-semibold text-xl whitespace-nowrap py-2 px-4 rounded-sm cursor-pointer button-shadow  text-white"
      onClick={handleClickScroll}
    >
      {props.data}
    </button>
  );
};

export default FancyButton;
