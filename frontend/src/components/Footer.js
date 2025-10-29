import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-react';
export function Footer() {
  return <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Plan'It</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 max-w-xs">
              Connecting people through real-life activities and community events.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-primary text-sm">About Us</Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-600 hover:text-primary text-sm">Careers</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-primary text-sm">Blog</Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-600 hover:text-primary text-sm">Help Center</Link>
                </li>
                <li>
                  <Link to="/guidelines" className="text-gray-600 hover:text-primary text-sm">Community Guidelines</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-primary text-sm">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-gray-600 hover:text-primary text-sm">Cookie Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-primary" aria-label="Facebook">
              <FacebookIcon size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary" aria-label="Twitter">
              <TwitterIcon size={20} />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary" aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Plan'It. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
}