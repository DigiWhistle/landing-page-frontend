import { EnvelopeIcon, GlobeAltIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactForm from "./ui/contact-form";

const logosvg = "./assets/navbar/logo.svg";

const contactOptions = [
  {
    name: "Location",
    information: "Noida, Uttar Pradesh India.",
    url: "https://digiwhistle.com",
    icon: MapPinIcon,
  },
  {
    name: "Email",
    information: "info@digiwhistle.com",
    url: "mailto:info@digiwhistle.com",
    icon: EnvelopeIcon,
  },
  { name: "Phone", information: "1800-0120-12xx", url: "https://digiwhistle.com", icon: PhoneIcon },
  {
    name: "Website",
    information: "https://digiwhistle.com",
    url: "https://digiwhistle.com",
    icon: GlobeAltIcon,
  },
];

const socialIcons = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/digiwhistle/",
    icon: "./assets/icons/instagram.svg",
  },
  {
    name: "Youtube",
    url: "https://www.youtube.com/digiwhistle/",
    icon: "./assets/icons/youtube.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/digiwhistle/",
    icon: "./assets/icons/linkedin.svg",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/digiwhistle",
    icon: "./assets/icons/twitter.svg",
  },
];

const ContactUs = () => {
  return (
    <section className="w-full bg-sb-black py-14 px-8 md:py-20 md:px-14" id="contact-us">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-6">
        <div className="flex flex-col items-center justify-between lg:items-start gap-10 lg:w-2/5 ">
          <hr className="lg:hidden text-gray-556 w-16 md:w-24 lg:w-32" />
          <div className="flex flex-col items-center lg:items-start space-y-5">
            <button className="bg-white px-4 py-2 rounded-full">
              <Image src={logosvg} alt="DIGI WHISTLE" width={160} height={80} />
            </button>
            <p className="text-heading-s-medium font-light text-tc-black-disabled text-center lg:text-left">
              A marketing and talent management agency that handles selected roster of India’s top
              influencers. Our exclusive relationship with our influencers allows us to connect
              ambitious brands to relevant personalities.
            </p>
          </div>
          <hr className="text-gray-556 w-16 md:w-24 lg:w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactOptions.map((data, index) => (
              <div className="flex gap-1" key={index}>
                <div>{<data.icon className="text-white-301 w-5 h-5 mt-0.5" />}</div>
                <div>
                  <p className="text-heading-s-semibold text-white">{data.name}</p>
                  <Link
                    href={data.url}
                    className="text-heading-s-medium !font-light text-tc-black-disabled"
                  >
                    {data.information}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <hr className="lg:hidden text-gray-556 w-16 md:w-24 lg:w-32" />
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="flex gap-3">
              {socialIcons.map((data, index) => (
                <Link
                  href={data.url}
                  key={index}
                  target="_blank"
                  className="border rounded-full border-white-301 p-2 flex items-center justify-center"
                >
                  <Image src={data.icon} alt={data.name} width={24} height={24} />
                </Link>
              ))}
            </div>
            <p className="text-heading-s-medium text-tc-black-disabled !font-light">
              Copyright © 2023 DigiWhistle, All rights reserved.
            </p>
          </div>
        </div>
        <Tabs
          defaultValue="influencer"
          className="bg-sb-white lg:w-3/5 rounded-2xl p-8 flex flex-col items-center"
        >
          <TabsList className="lg:place-self-start">
            <TabsTrigger value="influencer">I am Influencer</TabsTrigger>
            <TabsTrigger value="brand">I am Brand</TabsTrigger>
          </TabsList>
          <hr className=" text-gray-556 w-full my-6" />

          <TabsContent value="influencer" className="w-full">
            <ContactForm userType={"influencer"} />
          </TabsContent>
          <TabsContent value="brand">
            <ContactForm userType={"brand"} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContactUs;