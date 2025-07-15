import Link from "next/link"
import { Github, Twitter, Instagram, Mail, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 glass-dark">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-orbitron font-bold text-xl gradient-text-cyber">Imaginex</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your ideas into stunning visuals with our advanced AI image generation platform.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Mail, href: "#", label: "Email" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="glass-button p-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white font-orbitron">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/generate", label: "Generate" },
                { href: "/gallery", label: "Gallery" },
                { href: "/explore", label: "Explore" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white font-orbitron">About</h3>
            <ul className="space-y-2">
              {[
                { href: "#", label: "About Us" },
                { href: "#", label: "Features" },
                { href: "#", label: "Pricing" },
                { href: "#", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white font-orbitron">Contact</h3>
            <ul className="space-y-2">
              {[
                { href: "#", label: "Contact Us" },
                { href: "#", label: "Support" },
                { href: "#", label: "Privacy Policy" },
                { href: "#", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by the Labiba Najmee
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">© 2025 Imaginex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
