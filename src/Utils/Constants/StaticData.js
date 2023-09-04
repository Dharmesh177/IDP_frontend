import logo from "../../Assets/General/Logo.svg";
import StarImg from "../../Assets/General/Star.svg";
import Profile from "../../Assets/General/Profile.svg";

export const STAR_IMG = StarImg;
export const LOGO_IMG = logo;
export const PROFILE_IMG = Profile;

export const signUpData = {
  title: "Sign Up",
  bottomContent: {
    upperText: {
      title: "Already have an account?",
      link: "Sign In",
      linkTo: "/login",
    },
    bottomText: {
      title: "By signing up you agree to StoreSamadhan's",
      link: "Terms of Service",
      link2: " Privacy Policy",
      linkTo: "/terms",
      linkTo2: "/privacy",
    },
  },
};

export const signInData = {
  title: "Sign In",
  bottomContent: {
    upperText: {
      title: "Don't have an account?",
      link: "Sign Up",
      linkTo: "/signup",
    },
    bottomText: {
      title: "By clicking on Continue, you agree to StoreSamadhan's",
      link: "Terms of Service",
      link2: " Privacy Policy",
      linkTo: "/terms",
      linkTo2: "/privacy",
    },
  },
};

export const CONTACT_LINKS = {
  Facebook: "https://www.facebook.com/",
  Linkedin: "https://www.linkedin.com/",
  Instagram: "https://www.instagram.com/",
};

export const STORAGE_INFO_PAGE_DATA = {
  bookNow: "book now",
  ratingsAndReviews: "Ratings & Reviews",
  addReview: "Add a Review",
  reviews: "Reviews",
  avgTxt: "/box /week avg",
  pricing: "Pricing:",
  noData: "No data available",
};

export const PROFILE_DATA = {
  images: {
    profileImg: Profile,
  },
  logout: "Logout",
  links: [
    {
      title: "Personal Information",
      to: "/"
    },
    {
      title: "Access Rights Control",
      to: "/"
    }
  ],
  links2: [
    {
      title: "Client Credential",
      to: "/"
    },
    {
      title: "Client Information",
      to: "/ClientInfo"
    }
  ],
  personalInfoSec: {
    title: "Personal Information",
    title2: "Access Rights Control",
    feilds: [
      { key: "First Name", value: "fname" },
      { key: "Last Name", value: "lname" },
      { key: "Email", value: "email" },
      { key: "Phone Number", value: "phone" },
      { key: "State", value: "state" },
    ],
    addresses: "Addresses",
    addAddress: "Add Address",
    tags: "Tags",
    pricing: "Pricing",
    addRow: "Add Row",
    addCol: "Add Column",
    discard: "Discard",
    update: "Update",
    addTag: "Add Tag",
  },
  DevInfoSec: {
    title: "Client Credential",
    title2: "Client Information",
    feilds: [
      { key: "Client ID", value: "clientId" },
      { key: "Client Secret", value: "ClientSecret" },
      { key: "Client Name", value: "Cname" },
      { key: "Client Email", value: "Cemail" },
      { key: "Scope", value: "scope" },
      { key: "Protocol", value: "protocol" },
    ],
    addresses: "Addresses",
    addAddress: "Add Address",
    tags: "Tags",
    pricing: "Pricing",
    addRow: "Add Row",
    addCol: "Add Column",
    discard: "Discard",
    update: "Update",
    addTag: "Add Tag",
  },
  DevCredentialSec: {
    title: "Client Credential",
    title2: "Client Information",
    feilds: [
      { key: "Client ID", value: "clientId" },
      { key: "Client Secret", value: "ClientSecret" },

    ],
    addresses: "Addresses",
    addAddress: "Add Address",
    tags: "Tags",
    pricing: "Pricing",
    addRow: "Add Row",
    addCol: "Add Column",
    discard: "Discard",
    update: "Update",
    addTag: "Add Tag",
  },
  BookingsSec: {
    title: "Bookings",
    boxes: "Boxes:",
    from: "From:",
    to: "To:",
    shippingAddress: "Address :",
  },
};

export const SECONDARY_FOOTER_DATA = {
  title: "Need help?",
  linkText: "Contact us ",
  linkTo: "/contact",
};

export const BOOK_STORAGE_FACILITY_DATA = {
  title: "Book Storage Facility",
  name: "Name",
  pickupAddress: "Pickup Address",
  storageType: "Storage Type",
  boxes: "Boxes",
  duration: "Duration(weeks)",
  receipt: "Receipt",
  chargePerBox: "Charge Per Box",
  weeks: "Weeks",
  boxes: "Boxes",
  total: "Total",
  bookFor: "Book For",
};
