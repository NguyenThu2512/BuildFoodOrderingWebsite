import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

function Hero() {
  return (
    <section className="hero leading-10">
      <div className="py-14">
        <h1 className="text-4xl font-bold ">
          Everything <br /> will be better <br /> with a 
          <span className="text-primary"> cake</span>
        </h1>
        <p className="py-3 text-gray-500 text-lg">Enjoy happy moments with cake, spread sweetness, spread love</p>
        <div className="flex">
          <button className=" me-5 bg-primary rounded-full py-2 px-4 uppercase text-white font-semibold">
            Order now &nbsp;
            {/* <FontAwesomeIcon
              icon={faArrowCircleRight}
            /> */}
          </button>
          <button className="border-none">Learn more &nbsp;
            {/* <FontAwesomeIcon
              icon={faArrowCircleRight}
            /> */}
          </button>
        </div>
      </div>
      <div className="relative">
        <Image src="/cake1.png" layout="fill" objectFit="contain" alt="cake"/>
      </div>
    </section>
  )
}

export default Hero
