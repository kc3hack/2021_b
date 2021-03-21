import React from "react";

//css(未完成)
function Footer() {
  return (
    <footer className="bg-red">
      <div className="grid grid-cols-2 justify-items-center">
        <div className="grid grid-rows-2 text-center justify-items-center">
          <img src="/TiroKatsu_logo.svg" className="mt-10 w-36 h-10" />
          <p className="mb-10 text-white text-xs">チロルチョコファンのためのポータルサイト</p>
        </div>
        <div className="flex">
          <p className="self-center text-white text-xs">© 2021 TDD(TIROL Driven Development)</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
