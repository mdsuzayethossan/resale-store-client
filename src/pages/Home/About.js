import React from "react";

const About = () => {
  return (
    <div className="">
      <div className="md:flex gap-10 py-20">
        <img
          src="https://i.ibb.co/G5kWrhP/Blog-cover.jpg"
          className="rounded-lg shadow-2xl md:w-1/2 mb-8 md:mb-0"
          alt=""
        />
        <div>
          <h1 className="text-5xl font-bold">Best resale shop in the world</h1>
          <p className="py-6">
            Designed for buying and selling designer fashion goods, The Real
            Real is the world’s largest online thrift destination for
            authenticated, consigned luxury goods. Their team of authenticators
            takes the scams and guesswork out of buying and selling secondhand
            men’s and women’s luxury clothes, bags, and jewelry.
          </p>
          <button className="btn btn-primary">Contact Us</button>
        </div>
      </div>
    </div>
  );
};

export default About;
