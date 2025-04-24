import { useState } from "react";
import ArrowBtn from "../components/arrow-btn";
import { TbMailFilled } from "react-icons/tb";
import { motion } from "framer-motion";
import BentoTilt from "../components/bento-tilt";
import { Element } from "react-scroll";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BASE_URL } from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      // Add a console log here to confirm we're making the API call
      console.log("Attempting to send data to API:", formData);
      
      const response = await axios.post(`${BASE_URL}/create-contact`, formData);
      
      if (response.data.success === true) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Contact form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

 
   
      <Toaster position="bottom-right"   />
    <Element name="contact">
      <section className="w-full relative min-h-screen py-10 z-50">
        <div className="min-h-screen max-w-7xl mx-auto">
          <div className="flex flex-col gap-10 px-4 sm:px-10">
            <motion.div
              initial={{
                y: -50,
                opacity: 0,
              }}
              whileInView={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.1,
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-center">
                <span className="gradient-title">Contact   </span>Us
              </h1>
            </motion.div>
            <div className="w-full bg-[#8788FE1A] rounded-3xl">
              <div className="w-full h-full flex gap-10 lg:gap-20 p-5 sm:p-12 md:p-16">
                <BentoTilt className="max-sm:hidden w-1/2 h-full py-2">
                  <div>
                    <img src="/images/contact-1.png" alt="Contact" />
                  </div>
                </BentoTilt>
                <div className="max-sm:w-full w-1/2 h-full flex flex-col gap-4 justify-normal">
                  <p className="font-medium text-2xl sm:text-3xl md:text-4xl">Drop a message</p>
                  <div>
                    <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Name"
                          className="z-50 bg-[#CBCBCB] text-sm sm:text-base px-8 py-3 md:py-4 text-gray-950 rounded-xl sm:rounded-2xl w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          className="z-50 bg-[#CBCBCB] text-sm sm:text-base px-8 py-3 md:py-4 text-gray-950 rounded-xl sm:rounded-2xl w-full"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="message">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Message"
                          rows={7}
                          className="z-50 bg-[#CBCBCB] text-sm sm:text-base px-8 py-3 md:py-4 text-gray-950 rounded-xl sm:rounded-2xl w-full"
                        />
                      </div>
                      <div className="z-50">
                        <ArrowBtn
                          
                          onClick={handleSubmit}
                          arrow="up"
                          text={loading ? "Sending..." : "Send"}
                          disabled={loading}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6">
              <div className="max-w-4xl p-5 sm:p-12 md:p-16 mx-auto bg-[#8788FE1A] rounded-3xl flex max-sm:flex-col items-center justify-between gap-5 md:gap-10">
                <div className="max-sm:w-full w-1/2 flex flex-col justify-center">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <TbMailFilled
                      className="size-16 sm:size-20 md:size-24"
                      color="#696CEE"
                    />
                    <div className="max-sm:text-center">
                      <p className="text-2xl sm:text-3xl md:text-4xl">
                        Our support email
                      </p>
                      <p className="text-[#696CEE] text-lg sm:text-xl">
                        support@convertingcurrency.com
                      </p>
                    </div>
                  </div>
                </div>
                <BentoTilt className="max-sm:w-full w-1/2 max-sm:p-5 z-50">
                  <div>
                    <img src="/images/contact-2.png" alt="Support" />
                  </div>
                </BentoTilt>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
    </>
  );
};

export default Contact;