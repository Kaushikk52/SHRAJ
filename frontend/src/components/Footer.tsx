import { navlinks } from "@/constants/constant";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaAngleDoubleUp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
        {/* Left: Logo + Mission + Social */}
        <div className="flex flex-col gap-5 max-w-sm">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="ataraxis-logo"
              width={180}
              height={180}
            />
          </div>
          <p className="text-sm text-balance">
            Empowering physicians with advanced multi-modal tools to improve
            treatment selection and patient outcomes.
          </p>

          <div className="flex gap-4 text-black mt-2">
            <a href="#" aria-label="X">
              <FaXTwitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
          </div>

          <button
            // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 border border-black px-4 py-2 text-sm bg-blue-800 hover:bg-blue-500 text-white transition w-fit flex items-center gap-2"
          >
            <FaAngleDoubleUp /> BACK TO TOP
          </button>
        </div>

        {/* Right: Site Map + Legal */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-20 text-sm">
          {/* Site Map */}
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold mb-2">Site Map</h2>
            {navlinks.map((nav) => (
              <Link className="hover:underline" href={nav.path} key={nav.tag}>
                {nav.tag}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold mb-2">Legal</h2>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Services
            </a>
            <a href="#" className="hover:underline">
              Lawyer's Corners
            </a>
          </div>
          <div className="flex flex-col gap-5 items-start">
            <div className="flex items-center gap-3">
              <BsFillTelephoneFill size={20} />
              <div className="flex flex-col">
                <span>+91 8956981462</span>
                <span>+91 8956981465</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail size={20} />
              <div className="flex flex-col">
                <span>sales1@shrajindustries.com</span>
                <span>info@shrajindustries.com</span>
              </div>
            </div>
          </div>
        </div>
        {/* Center: Contact Info */}
      </div>
    </footer>
  );
}
