import Image from "next/image";
import ShopCard from "./components/ShopCard";
import img1 from "./assets/Rectangle.png";
import img2 from "./assets/Rectangle2.png";
import img3 from "./assets/post2.jpg";
import img4 from "./assets/heightModel.jpg";
import offer1 from "./assets/1.png";
import offer2 from "./assets/2.png";
import offer3 from "./assets/3.png";
import womenImg1 from "./assets/w.png";
import womenImg2 from "./assets/w1.png";
import womenImg3 from "./assets/w2.png";
import menImg1 from "./assets/men.png";
import menImg2 from "./assets/men1.png";
import menImg3 from "./assets/men2.png";
import menImg4 from "./assets/men3.png";
import newImg1 from "./assets/img1.svg";
import newImg2 from "./assets/img2.svg";
import newImg3 from "./assets/img3.svg";
import { BiLike } from "react-icons/bi";
import { IoCallOutline, IoCardOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

import { FaHeart, FaSmile, FaHeadset, FaAngleDoubleDown } from "react-icons/fa";
import { Prompt } from "next/font/google";
import ShopCardTwo from "./components/ShopCardTwo";
import Button from "./components/Button";
import Link from "next/link";
import ShopCardThree from "./components/ShopCardThree";
import LoadWrapper from "./context/HomeWrapper";
const prompt = Prompt({
  subsets: ["latin"],
  weight: ["600"],
});
const reviews = [
  {
    name: "Thomas",
    text: "I absolutely love the quality! The fabric feels premium and the packaging was stunning. Definitely coming back!",
    icon: <FaHeart className="text-pink-500 text-xl" />,
  },
  {
    name: "Ahmed",
    text: "Super comfortable and very stylish! Got compliments the first day I wore it. Worth every penny.",
    icon: <FaSmile className="text-yellow-400 text-xl" />,
  },
  {
    name: "Morgan",
    text: "Customer support was exceptional. They helped me with sizing and followed up after delivery. Impressive service!",
    icon: <FaHeadset className="text-blue-500 text-xl" />,
  },
];

const newImages = [
  {
    id: 1,
    img: newImg1,
    bg: "#eee",
  },
  {
    id: 2,
    img: newImg2,
    bg: "#fff",
  },
  {
    id: 3,
    img: newImg3,
    bg: "#fff",
  },
];
export default function Home() {
  return (
    <LoadWrapper>
      <main className="min-h-screen">
        <div className="py-10 min-h-screen flex flex-col justify-evenly gap-10 bg-cover bg-center bg-[url('./assets/Frame.png')] p-4">
          <section
            className="flex flex-col gap-5 items-center text-center justify-center h-1/2"
            data-aos="fade-up"
          >
            <p className="uppercase text-white">
              made in Indonesia, dedicated to Indonesia
            </p>
            <h2 className="text-4xl lg:text-6xl text-white">
              Discover the Art of Dressing Up
            </h2>
          </section>
          <section
            className="flex flex-wrap justify-center items-center gap-4"
            data-aos="fade-up"
          >
            <ShopCard
              img={img1}
              category={"Men's Clothing"}
              title={"50% Off"}
            />
            <ShopCard
              img={img4}
              category={"Winter Collection"}
              title={"Limited"}
            />
            <ShopCard
              img={img2}
              category={"Women's Clothing"}
              title={"Limited"}
            />
            <ShopCard img={img3} category={"Casual"} title={"Special Offers"} />
          </section>
        </div>
        <h1 className="flex items-center justify-center text-lg text-[#222] my-10 text-center w-full">
          SCROLL DOWN <FaAngleDoubleDown size={20} />
        </h1>

        {/* Gallery */}
        <section className={prompt.className} data-aos="fade-up">
          <div className="flex flex-col justify-center items-center md:grid grid-cols-5 grid-rows-4 gap-4 w-full m-auto p-2 ">
            <div className="shadow-sm shadow-[#333] relative col-span-2 row-span-2 border-2 border-[#fefefe] w-full h-full">
              <Image
                src={offer1}
                alt="Offers"
                width={666}
                height={375}
                className="w-full h-full object-cover blur-[1px] hover:blur-[0px] transition-all duration-300"
              />
              <h3 className="tracking-wider text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                Formal Woman{" "}
              </h3>
            </div>
            <div className="shadow-sm shadow-[#333] relative col-span-2 row-span-2 col-start-1 row-start-3 border-2 border-[#fefefe] h-full w-full">
              <Image
                src={offer2}
                alt="Offers"
                width={666}
                height={375}
                className="w-full h-full object-cover blur-[1px] hover:blur-[0px] transition-all duration-300"
              />
              <h3 className=" tracking-wider  text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                Formal Men{" "}
              </h3>
            </div>
            <div className="shadow-sm shadow-[#333] relative col-span-2 row-span-4 col-start-3 row-start-1 border-2 border-[#fefefe] w-full">
              <Image
                src={offer3}
                alt="Offers"
                width={659}
                height={700}
                className="w-full h-full object-cover blur-[1px] hover:blur-[0px] transition-all duration-300"
              />
              <h3 className="tracking-wider  text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                Casual Style
              </h3>
            </div>
            <div className="shadow-sm shadow-[#333] relative row-span-4 col-start-5 row-start-1 border-2 border-[#fefefe] w-full h-full">
              <Image
                src={img4}
                alt="Offers"
                width={659}
                height={700}
                className="w-full h-full object-cover blur-[1px] hover:blur-[0px] transition-all duration-300"
              />
              <h3 className="tracking-wider  text-white sm:text-3xl md:text-2xl lg:text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                Winter Collection
              </h3>
            </div>
          </div>
        </section>
        {/* Special Offers For Women*/}
        <section className="my-14 p-3" data-aos="fade-up">
          <h1 className="text-3xl text-[#222] text-center">
            Where timeless style meets timeless beauty.
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
            <ShopCardTwo
              img={womenImg1}
              rate={"4.2"}
              desc={"Timeless Beauty"}
            />
            <ShopCardTwo img={img2} rate={"4.6"} desc={"Modern Muse"} />
            <ShopCardTwo img={womenImg2} rate={"4.9"} desc={"Glow Within"} />
            <ShopCardTwo
              img={womenImg3}
              rate={"5.0"}
              desc={"Delicate Strength"}
            />
          </div>
          <Link href={"/shopping"}>
            <Button />
          </Link>
        </section>
        <section className="py-10 px-4" data-aos="fade-up">
          <h2 className="text-3xl text-center mb-8 font-[500] text-[#222]">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-8xl">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  {review.icon}
                  <h3 className="text-lg font-semibold text-[#333]">
                    {review.name}
                  </h3>
                </div>
                <p className="text-sm text-[#555] italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="m-6 shadow-md py-16 px-2" data-aos="fade-up">
          <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h2 className="text-4xl font-bold text-[#8B4513]">50K+</h2>
              <p className="text-sm text-[#555]">Happy Customers</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#8B4513]">1K+</h2>
              <p className="text-sm text-[#555]">Products Sold</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#8B4513]">5+</h2>
              <p className="text-sm text-[#555]">Years Experience</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-[#8B4513]">100%</h2>
              <p className="text-sm text-[#555]">Customer Satisfaction</p>
            </div>
          </div>
        </section>

        <section className="my-8 p-3" data-aos="fade-up">
          <h1 className="text-3xl text-[#222] text-center">
            Where elegance and grace become one.
          </h1>
          <section className="grid md:grid-cols-4 lg:grid-cols-[autofill] grid-cols-2 gap-4 w-full my-4">
            <ShopCardThree
              img={menImg1}
              category={"New Arrivals"}
              desc={"Where elegance and grace become one."}
              rate={"4.2"}
              price={"29"}
            />
            <ShopCardThree
              img={menImg2}
              category={"Latest Fashion"}
              desc={"When classic style embraces eternal beauty."}
              rate={"4.7"}
              price={"59"}
            />
            <ShopCardThree
              img={menImg3}
              category={"Now Trending"}
              desc={"Where couture meets classic allure."}
              rate={"4.2"}
              price={"19"}
            />
            <ShopCardThree
              img={menImg4}
              category={"Latest Drops"}
              desc={"Where refined style meets radiant charm."}
              rate={"4.2"}
              price={"69"}
            />
          </section>
          <Link href={"/shopping"}>
            <Button />
          </Link>
        </section>
        <section className="py-10 px-4" data-aos="fade-up">
          <h2 className="text-3xl text-center text-[#222] mb-6">
            Style Tips & Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto">
            {newImages.map((i) => (
              <div
                key={i.id}
                className={`bg-white shadow-md rounded-md overflow-hidden`}
              >
                <Image
                  src={i.img}
                  width={300}
                  height={200}
                  alt="Blog"
                  className={`bg-[${i.bg}] w-full h-48 object-contain object-top `}
                />
                <div className="p-4">
                  <h3 className="font-bold text-[#8B4513] mb-2">
                    How to Style Your Winter Look
                  </h3>
                  <p className="text-sm text-[#555]">
                    Discover easy ways to elevate your winter wardrobe.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 my-4" data-aos="fade-up">
          <h2 className="text-3xl text-center text-[#222] mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "How long does delivery take?",
                a: "Delivery usually takes 2-5 working days depending on your location.",
              },
              {
                q: "Can I return a product?",
                a: "Yes, we offer a 7-day return policy for unused items with original packaging.",
              },
              {
                q: "Do you offer international shipping?",
                a: "Currently, we only ship within the country, but international options are coming soon!",
              },
            ].map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <h3 className="font-semibold text-[#8B4513]">{faq.q}</h3>
                <p className="text-sm text-[#555] mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="p-6" data-aos="fade-up">
          <div className="md:grid grid-cols-5 grid-rows-5 gap-4 flex flex-col">
            <div className="shadow-sm shadow-[#888] row-span-4 flex flex-col justify-center items-center p-3 gap-4 text-center bg-[#fff]">
              <BiLike
                size={65}
                className="text-white bg-[#8B4513] rounded-full p-4"
              />
              <h2 className="font-semibold text-2xl md:text-xl lg:text-2xl">
                100% Satisfaction Guaranteed
              </h2>
              <p className="text-sm text-[#757575]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                eveniet nemo tempora?
              </p>
            </div>
            <div className="shadow-sm shadow-[#888] col-span-3 row-span-2 flex flex-col justify-center items-center p-3 gap-4 text-center bg-[#fff]">
              <IoCallOutline
                size={65}
                className="text-white bg-[#8B4513] rounded-full p-4"
              />
              <h2 className="font-semibold text-2xl md:text-xl lg:text-2xl">
                24/7 Online Service{" "}
              </h2>
              <p className="text-sm text-[#757575]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                eveniet nemo tempora?
              </p>
            </div>
            <div className="shadow-sm shadow-[#888] col-span-3 row-span-2 col-start-2 row-start-3 flex flex-col justify-center items-center p-3 gap-4 text-center bg-[#fff]">
              <TbTruckDelivery
                size={65}
                className="text-white bg-[#8B4513] rounded-full p-4"
              />
              <h2 className="font-semibold text-2xl md:text-xl lg:text-2xl">
                Fast Delivery{" "}
              </h2>
              <p className="text-sm text-[#757575]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                eveniet nemo tempora?
              </p>
            </div>
            <div className="shadow-sm shadow-[#888] row-span-4 col-start-5 row-start-1 flex flex-col justify-center items-center p-3 gap-4 text-center bg-[#fff]">
              <IoCardOutline
                size={65}
                className="text-white bg-[#8B4513] rounded-full p-4"
              />
              <h2 className="font-semibold text-2xl md:text-xl lg:text-2xl">
                Payment With Secure System
              </h2>
              <p className="text-sm text-[#757575]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                eveniet nemo tempora?
              </p>
            </div>
          </div>
        </section>
      </main>
    </LoadWrapper>
  );
}
