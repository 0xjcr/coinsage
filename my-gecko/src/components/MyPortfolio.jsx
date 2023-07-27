import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const MyPortfolio = ({ myPortfolio }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className='mt-6'>
      
      <div>
        <ul>
          {myPortfolio.map((coin) => (
            <li key={coin.id}>{coin.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPortfolio;
