import { Link } from "react-router-dom";
import { useRef, useContext, useState } from "react";
import { AdminContext } from "../../contexts/admin.context";


import { default as Electric } from '../../sounds/electric-guitar.wav';

import "./directory-item.styles.scss";
const DirectoryItem = ({ title, image }) => {

  // const audioRef = useRef(null);
  const { setSearchField } = useContext(AdminContext);

  const clearSearchField = () => {
    setSearchField('');
  };

  let productType = title.toString().split(" ")[0].toLowerCase();
  const array = title.toString().split(" ");
  const arraySize = array.length;

  // const playSound = async () => {
  //   audioRef.current.play();
  // };

  if (arraySize === 2) {
    productType = productType.concat('_guitars')
  }

  return (
    <>
      <div className="directory-item-container">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
        <div className="body">
          <Link to={`/shop/${productType}`}
            //  onMouseEnter={playSound}
            onClick={clearSearchField}
          >
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Link>
          {/* <audio ref={audioRef} src={Electric} type="audio/wav">
        <source src={Electric} type="audio/wav" />
      </audio> */}
        </div>
      </div>
    </>
  );
};

export default DirectoryItem;
