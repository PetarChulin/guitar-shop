import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { AdminContext } from "../../contexts/admin.context";
import { productType } from "../../utils/productType/productType";

import { default as Electric } from '../../sounds/electric-guitar.wav';

import "./directory-item.styles.scss";

const DirectoryItem = ({ title, image }) => {

  // const audioRef = useRef(null);
  const { setSearchField } = useContext(AdminContext);

  const clearSearchField = () => {
    setSearchField('');
  };
  const category = productType(title);

  // const playSound = async () => {
  //   audioRef.current.play();
  // };

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
          <Link to={`/shop/${category}`}
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
