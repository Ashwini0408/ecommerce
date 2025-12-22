import Navbar from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Hero } from '../../components/home/Hero';
// import { Categories } from '../../components/home/Categories';
import { FeaturedProducts } from "../../components/home/FeaturedProducts";
import { Newsletter } from "../../components/home/Newsletter";


const HomePage = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <Hero />
      {/* <Categories /> */}
      <FeaturedProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;