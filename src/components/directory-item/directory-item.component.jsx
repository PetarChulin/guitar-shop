import { Link } from "react-router-dom";
import { useRef } from "react";
import "./directory-item.styles.scss";

// import {default as Electric} from '../../sounds/electric-guitar.wav';

const DirectoryItem = ({ category }) => {


  // const audioRef = useRef(null);

  const { imageUrl, title } = category;

  let productType = title.toString().split(" ")[0].toLowerCase();
  const array = title.toString().split(" ");
  const arraySize = array.length;

  // const playSound = async () => {
  //   audioRef.current.play();
  // };

  if(arraySize === 2) {
    productType = productType.concat('_guitars')
  }
  console.log(productType);
  return (
    <>
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <Link to={`/shop/${productType}`}
        //  onMouseEnter={playSound}
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
