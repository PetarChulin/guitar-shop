import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';
import setBackgroundImage from '../../utils/background/changeBackgroundImage';
import { default as Img} from '../../assets/guitar12.jpg';
import { useEffect } from 'react';

const Home = () => {

  useEffect(() => {
    setBackgroundImage(Img);
  }, []);

  const categories = [
    {
      id: 1,
      title: 'Electric Guitars',
      imageUrl: 'https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_guitars_na.jpg',
    },
    {
      id: 2,
      title: 'Acoustic Guitars',
      imageUrl: 'https://images.pexels.com/photos/625788/pexels-photo-625788.jpeg?cs=srgb&dl=pexels-rebecca-swafford-625788.jpg&fm=jpg',
    },
    {
      id: 3,
      title: 'Bass Guitars',
      imageUrl: 'https://www.ibanez.com/common/product_artist_file/file/pc_main_electric_basses_us_sp.jpg',
    },
    {
      id: 4,
      title: 'Amplifiers',
      imageUrl: 'https://www.guitarcenter.com/static/gc/2023/page-dynamic/redesign/category-tiles/category-tiles-03.jpeg',
    },
    // {
    //   id: 5,
    //   title: 'Effects',
    //   imageUrl: 'https://www.guitarcenter.com/static/gc/2023/page-dynamic/redesign/category-tiles/category-tiles-04.jpeg',
    // },
    // {
    //   id: 6,
    //   title: 'Used Guitars',
    //   imageUrl: 'https://images.saymedia-content.com/.image/t_share/MTc0OTkyMDI1Nzk0NTIwNTE2/how-to-buy-used-guitar.jpg',
    // },
  ];

  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};

export default Home;
