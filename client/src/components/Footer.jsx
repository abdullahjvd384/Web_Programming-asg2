const Footer = () => {
  return (
    <footer>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-amazon-nav-secondary text-secondary-foreground text-sm py-3 hover:brightness-125 transition-colors"
      >
        Back to top
      </button>
      <div className="bg-amazon-nav text-secondary-foreground py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell under Private Brands</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:underline cursor-pointer">COVID-19 and Amazon</li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-amazon-dark text-muted-foreground text-xs text-center py-4">
        © 1996-2024, Amazon.com, Inc. or its affiliates
      </div>
    </footer>
  );
};

export default Footer;
