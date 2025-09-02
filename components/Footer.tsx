import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Footer({language}:any){
    return (<footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-abuki-primary">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Temari</span>
              </div>
              <p className="text-gray-400 mb-4">
                {language === "am"
                  ? "ለኢትዮጵያውያን የተዘጋጀ የመስመር ላይ ትምህርት መድረክ"
                  : "Online learning platform designed for Ethiopians"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{language === "am" ? "ኮርሶች" : "Courses"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/courses/development" className="hover:text-white">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/courses/business" className="hover:text-white">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/courses/design" className="hover:text-white">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/courses/marketing" className="hover:text-white">
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{language === "am" ? "ድጋፍ" : "Support"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{language === "am" ? "ኩባንያ" : "Company"}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Abuki. All rights reserved.</p>
          </div>
        </div>
      </footer>)
}