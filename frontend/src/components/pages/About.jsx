import '../../styles/Animation.css'
import Login from '../auth/Login';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='lg:ml-8 ml-2'>
      <div className="text-center bg-white mt-11 main animate-flip-up shadow-xl">
        <h1 className="font-bold text-5xl py-8 animate-fade-up-delay text-[#2B2D42]">
          About WanderVista
        </h1>
        <p className="font-medium text-lg w-[50%] ml-[25%] text-gray-500 pb-8 animate-fade-up-delay">
          Welcome to WanderVista, your ultimate destination for diverse and
          engaging content from passionate writers around the world. At
          WanderVista, we believe in the power of storytelling to inspire,
          educate, and connect people from all walks of life.
        </p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-4 main mt-4">
        <div className="text-center w-full lg:w-1/2 bg-white rounded-xl animate-flip-up shadow-xl">
          <h2 className="font-semibold text-4xl mt-6 py-8 animate-fade-up-delay text-gray-700">
            Our Mission
          </h2>
          <p className="font-medium lg:text-lg text-base w-full lg:w-[80%] lg:ml-[10%] ml-[0%] px-2 text-gray-600 pt-2 pb-6 animate-fade-up-delay">
            Our mission is to provide a platform where individuals can express
            themselves freely and share their unique perspectives, experiences,
            and passions with a global audience. Whether you&#39;re a seasoned
            writer or a first-time blogger, WanderVista is your creative
            playground.
          </p>
        </div>
        <div className="text-center w-full lg:w-1/2 bg-white rounded-xl animate-flip-up shadow-xl">
          <h2 className="font-semibold text-4xl py-8 animate-fade-up-delay text-gray-700">
            Why WanderVista?
          </h2>
          <ul className="font-medium lg:text-lg text-base text-center w-full lg:w-[80%] ml-auto mr-auto text-gray-600 pb-8 animate-fade-up-delay">
            <li>
              <strong>Freedom to Choose:</strong> Create and publish blogs on
              any topic that interests you.
            </li>
            <li>
              <strong>Community Engagement:</strong> Connect with like-minded
              individuals and readers who share your interests.
            </li>
            <li>
              <strong>Easy to Use:</strong> Intuitive interface and simple
              publishing tools make blogging hassle-free.
            </li>
            <li>
              <strong>Endless Possibilities:</strong> Explore a diverse range of
              topics and discover new perspectives.
            </li>
          </ul>
        </div>
      </div>
      <div className="main bg-white text-center mt-4 shadow-xl animate-flip-up">
        <h2 className="font-semibold text-4xl mt-6 py-8 animate-fade-up-delay text-gray-700">
          Join Our Community
        </h2>
        <p className="font-medium text-lg text-gray-600 px-2 pb-11 animate-fade-up-delay">
          Ready to become part of the WanderVista community?{" "}
          <Link
            to={<Login />}
            className="hover:text-teal-500 font-bold transition-all duration-300"
          >
            Sign up
          </Link>{" "}
          today and start sharing your stories with the world!
        </p>
      </div>
      <div className="main bg-white text-center mt-4 shadow-xl animate-flip-up">
        <h2 className="font-bold text-4xl mt-6 py-8 animate-fade-up-delay text-gray-700">
          Contact Us
        </h2>
        <p className="font-medium text-lg text-gray-600 pb-11 animate-fade-up-delay">
          Have questions or feedback? We&#39;d love to hear from you!
        </p>
        <p className="font-medium text-lg text-gray-600 pb-11 animate-fade-up-delay">
          <span className='font-bold'>Email:</span>{" "}
          <a href="mailto:chaudharykunal581@gmail.com" className='hover:text-teal-500 transition-all duration-300'>
            chaudharykunal581@gmail.com
          </a>
        </p>
      </div>
      <div className='mt-4'></div>
    </div>
  );
}

export default About