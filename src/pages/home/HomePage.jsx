import HeroSection from "../../components/heroSection/HeroSection";
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/statistics/Statistics";
import Testimonial from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";

const HomePage = () => {
    return (
        <Layout>
            <HeroSection/> 
            <Track/>
            <Statistics/>
            <Testimonial/>
        </Layout>
    );
}

export default HomePage;
