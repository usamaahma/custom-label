import React from "react";
import Fancyhanghero1 from "../components/hantagsection/fancyhanghero";
import FancyForm1 from "../components/hantagsection/fancyform";
import GoogleReviews from "../components/expressclothing/googlereviews";
import Descriptionexpress from "../components/expressclothing/descriptionexpress";
import Finalprocess from "../components/expressclothing/finalprocess";
import Faqexpress1 from "../components/expressclothing/faqexpress";
import { Helmet } from "react-helmet"; // Import Helmet

function Fancyhangtagspage() {
  return (
    <div className="landingback">
      <Helmet>
        <title>Fancy Hangtags - Premium Custom Tags for Your Products</title>
        <meta
          name="description"
          content="Explore our premium custom fancy hangtags. High-quality, stylish, and perfect for branding your products."
        />
        <meta
          name="keywords"
          content="fancy hangtags, custom hangtags, premium tags, custom product tags, branding hangtags"
        />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Custom Fancy Hangtags",
            "description": "Explore our premium custom fancy hangtags. High-quality, stylish, and perfect for branding your products.",
            "url": "https://www.mywebsite.com/fancyhangtags",
            "image": "https://www.mywebsite.com/images/fancy-hangtags.jpg"
          }`}
        </script>
      </Helmet>

      <Fancyhanghero1 />
      <FancyForm1 />
      <Descriptionexpress />
      <Finalprocess />
      <GoogleReviews />
    </div>
  );
}

export default Fancyhangtagspage;
