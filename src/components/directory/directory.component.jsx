import DirectoryItem from '../directory-item/directory-item.component';

import './directory.styles.scss';

const Directory = ({categories}) => {
  
return (
    <>
      <div className='directory-container'>
        {Object.entries(categories).map((category) => (
          console.log(category),
          <DirectoryItem key={category[0]} title={category[0]} image={category[1]} />
        ))}
      </div>
    </>
  );
};

export default Directory;
