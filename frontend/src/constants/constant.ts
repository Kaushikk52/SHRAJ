import { CiBank } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { PiHeadset } from "react-icons/pi";
import { HiOutlineShieldCheck } from "react-icons/hi";

export const navlinks = [
  { tag: "Home", path: "/" },
  { tag: "About", path: "/about" },
  { tag: "Products", path: "/products" },
  { tag: "Blog", path: "/blogs" },
  { tag: "Write", path: "/blogs/add" },
];

export const products = [
  {
    id: 1,
    name: "Batch Ovens",
    brand: "Stericlin",
    type: "Industrial Ovens",
    image: "/IO1.png",
    images: [
      "/BatchOvens/BatchOven1.png",
      "/BatchOvens/BatchOven2.png",
      "/BatchOvens/BatchOven3.png",
      "/BatchOvens/BatchOven4.png",
    ],
    description:
      "A compact Batch Ovens ideal for laboratory sterilization tasks.",
  },
  {
    id: 2,
    name: "Conveyor Ovens",
    brand: "LabTech",
    type: "Industrial Ovens",
    image: "/IO2.png",
    images: [
      "/ConveyorOvens/ConO1.png",
      "/ConveyorOvens/ConO2.png",
      "/ConveyorOvens/ConO3.png",
      "/ConveyorOvens/ConO4.png",
    ],
    description:
      "Vertical autoclave with knob-lock mechanism and durable SS chamber.",
  },
  {
    id: 3,
    name: "Cabinet Ovens",
    brand: "Medinox",
    type: "Industrial Ovens",
    image: "/IO3.png",
    images: [
      "/CabinetOvens/CabO1.png",
      "/CabinetOvens/CabO2.png",
      "/CabinetOvens/CabO3.png",
      "/CabinetOvens/CabO4.png",
    ],
    description:
      "Offers radial arm locking for enhanced safety and pressure sealing.",
  },
  {
    id: 4,
    name: "Walk-In Ovens",
    brand: "Stericlin",
    type: "Industrial Ovens",
    image: "/IO4.png",
    images: [
      "/WalkInOvens/WIO1.png",
      "/WalkInOvens/WIO1.png",
      "/WalkInOvens/WIO1.png",
      "/WalkInOvens/WIO1.png",
    ],
    description: "Large-capacity horizontal autoclave for hospitals and labs.",
  },
  {
    id: 5,
    name: "Truck-In Ovens",
    brand: "ChillPoint",
    type: "Industrial Ovens",
    image: "/IO5.png",
    images: [
      "/TruckInOvens/TIO1.png",
      "/TruckInOvens/TIO2.png",
      "/TruckInOvens/TIO3.png",
      "/TruckInOvens/TIO4.png",
    ],
    description:
      "Mortuary fridge with six compartments and digital temperature control.",
  },
  {
    id: 6,
    name: "Preheat Ovens",
    brand: "BioCool",
    type: "Industrial Ovens",
    image: "/IO6.png",
    images: [
      "/PreHeatOvens/preheatOven1.png",
      "/PreHeatOvens/preheatOven2.png",
      "/PreHeatOvens/preheatOven3.png",
    ],
    description:
      "Designed for safe storage of blood bags at optimal temperatures.",
  },
  {
    id: 7,
    name: "Drum / Tote Warming Ovens",
    brand: "LabCare",
    type: "Industrial Ovens",
    image: "/IO7.png",
    images: [
      "/DrumWarmingOvens/DTW1.png",
      "/DrumWarmingOvens/DTW2.png",
      "/DrumWarmingOvens/DTW3.png",
      "/DrumWarmingOvens/DTW4.png",
    ],
    description:
      "Used in pharmacies and labs for storing temperature-sensitive meds.",
  },
  {
    id: 8,
    name: "Curing Ovens",
    brand: "CoolTech",
    type: "Industrial Ovens",
    image: "/IO8.png",
    images: ["/IO8.png", "/CurvingOvens/CurO1.png", "/CurvingOvens/CurO2.png"],
    description:
      "Ultra-low deep freezer for biological and industrial cold storage.",
  },
  {
    id: 9,
    name: "Drying Ovens",
    brand: "ThermoSafe",
    type: "Industrial Ovens",
    image: "/IO9.png",
    images: [
      "/DryingOvens/DryO1.png",
      "/DryingOvens/DryO2.png",
      "/DryingOvens/DryO3.png",
    ],
    description: "Accurate temperature control for culture growth in labs.",
  },
  {
    id: 10,
    name: "Powder Coating Oven",
    brand: "ThermoSafe",
    type: "Industrial Ovens",
    image: "/IO10.png",
    images: [
      "/IO10.png",
      "/PowderCoatingOvens/PCO1.png",
      "/PowderCoatingOvens/PCO2.png",
    ],
    description:
      "Dry heat sterilizer suitable for glassware and lab instruments.",
  },
  {
    id: 11,
    name: "VERTICAL AUTOCLAVE & PRESSURE STEAM STERILIZER",
    brand: "SafeAir",
    type: "Sterilizers",
    image: "/IO1.png",
    images: ["/IO1.png"],
    description: "Essential for ventilating hazardous fumes in laboratories.",
  },
  {
    id: 12,
    name: "VERTICAL AUTOCLAVE RADIAL AND KNOB LOCKING",
    brand: "AirGuard",
    type: "Sterilizers",
    image: "/IO2.png",
    images: ["/IO2.png"],
    description:
      "Used to provide sterile and particle-free working environments.",
  },
  {
    id: 13,
    name: "HORIZONTAL CYLINDRICLE HIGH PRESSURE AUTOCLAVE",
    brand: "BioCool",
    type: "Sterilizers",
    image: "/IO3.png",
    images: ["/IO3.png"],
    description:
      "Walk-in cold room for bulk storage of medical or research samples.",
  },
  {
    id: 14,
    name: "HORIZONTAL RECTANGULAR HIGH-PRESSURE AUTOCLAVE",
    brand: "CoolTech",
    type: "Sterilizers",
    image: "/IO4.png",
    images: ["/IO4.png"],
    description:
      "Double-door upright freezer with adjustable shelving for labs.",
  },
  {
    id: 15,
    name: "HORIZONTAL RECTANGULAR HIGH-PRESSURE AUTOCLAVE",
    brand: "CoolTech",
    type: "Sterilizers",
    image: "/IO4.png",
    images: ["/IO4.png"],
    description:
      "Double-door upright freezer with adjustable shelving for labs.",
  },
  {
    id: 16,
    name: "HORIZONTAL RECTANGULAR HIGH-PRESSURE AUTOCLAVE",
    brand: "CoolTech",
    type: "Mortuary Rrefrigeration System",
    image: "/IO4.png",
    images: ["/IO4.png"],
    description:
      "Double-door upright freezer with adjustable shelving for labs.",
  },
  {
    id: 17,
    name: "HORIZONTAL RECTANGULAR HIGH-PRESSURE AUTOCLAVE",
    brand: "CoolTech",
    type: "Mortuary Rrefrigeration System",
    image: "/IO4.png",
    images: ["/IO4.png"],
    description:
      "Double-door upright freezer with adjustable shelving for labs.",
  },
];

export const featuresData = [
  {
    icon: HiOutlineShieldCheck,
    tag: "all time warranty",
    desc: "Peace of mind – all-time warranty coverage included.",
  },
  {
    icon: CiBank,
    tag: "financing available",
    desc: "Easy on the wallet – financing options readily available.",
  },
  {
    icon: PiHeadset,
    tag: "outstanding support",
    desc: "Top-notch service – outstanding support provided.",
  },
  {
    icon: TbTruckDelivery,
    tag: "free delivery & installation",
    desc: "Hassle-free setup – free delivery & installation included.",
  },
];

export const carouselData = [
  "/carousel1.png",
  "/carousel2.png",
  "/carousel3.png",
  "/carousel6.png",
  "/carousel4.png",
  "/carousel5.png",
];

export const mainFeatres = [
  "Custom-built to your specifications",
  "Precise temperature control, including a thermocouple actuated PID digital temperature controller and adjustable PID digital over temperature protection",
  "Motor control push buttons",
  "On-off heat switch",
  "LED pilot lights",
  "1-year Manufacturer's warranty.",
];

export const BlogData = [
  {
    id: 1,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
  {
    id: 2,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
  {
    id: 3,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
  {
    id: 4,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
  {
    id: 5,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
  {
    id: 6,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
  {
    id: 7,
    img: "/blog-main.jpg",
    tag: "Clean room equipment",
    title: "Early Black Friday Amazon deals: cheap TVs, headphones, laptops",
    desc: "Learn the best practices for creating responsive websites that look great on any device, from mobile phones to desktops.",
    time: "Tue, May 2",
  },
];
