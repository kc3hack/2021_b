import React from "react";
import Router from "next/router";

//customStylesをカスタムしてModalのサイズ設定お願いします

// Modal.setAppElement("body");
function TirolCard(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log(props.tirolData.id);
    Router.push({
      pathname: "/tirolrepo",
      query: { name: `${props.tirolData.id}` },
    });
  }
  return (
    <div>
      <button onClick={handleClick}>
        <img src={`${props.tirolData.image}`} className="inline-block" />
      </button>
    </div>
  );
}

export default TirolCard;
