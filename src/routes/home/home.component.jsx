import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Directory from '../../components/directory/directory.component';
import setBackgroundImage from '../../utils/background/changeBackgroundImage';
import CATEGORIES from '../../categories-data';
import { default as Img} from '../../assets/guitar12.jpg';
import { getTitleAndImageFromDocument } from '../../utils/firebase/firebase.utils';

const Home = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setBackgroundImage(Img);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTitleAndImageFromDocument('collections');
      setCategories(result);
      console.log(categories);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Directory categories={categories} />
      <Outlet />
    </div>
  );
};
export default Home;
