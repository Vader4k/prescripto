import Hero from "../components/Hero";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

const Home = () => {
  return (
    <section className="flex flex-col gap-24">
      <Hero />
      <SpecialityMenu />
      <TopDoctors />
    </section>
  );
};

export default Home;
