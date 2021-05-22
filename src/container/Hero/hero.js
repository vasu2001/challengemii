import './hero.css';
import Featured from '../../components/Featured-Card/Featured';
import Carousel from '../../components/Carousel/Carousel';

const hero = () => {
   return (
      <div className="hero">
         <Carousel />
         <Featured />
      </div>
   );
};

export default hero;
