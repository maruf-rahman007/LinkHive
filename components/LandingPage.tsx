"use client"
import { useState } from 'react'
import { ChevronDown, ChevronUp, Check, Menu, X } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What is LinkHive?",
      answer: "LinkHive is a platform that allows you to create a personalized landing page with links to all your online profiles, projects, and content in one place."
    },
    {
      question: "How do I create a LinkHive page?",
      answer: "Simply sign up for an account, customize your profile, and add your links. You'll get a unique URL that you can share across all your platforms."
    },
    {
      question: "Is LinkHive free to use?",
      answer: "Yes, LinkHive offers a free plan with basic features. We also offer premium plans with advanced customization options and analytics."
    },
    {
      question: "Can I customize the appearance of my LinkHive page?",
      answer: "You can choose from various themes, colors, and layouts to make your LinkHive page truly unique and reflective of your brand."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white">
      {/* Header */}
      

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700 p-4">
          <nav className="flex flex-col space-y-4">
            <a href="#features" className="hover:text-purple-200 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-purple-200 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-purple-200 transition-colors">FAQ</a>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
              Get Started
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">One Link for All Your Content</h2>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          LinkHive helps you organize and share all your online profiles, projects, and content in one convenient link.
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-purple-100 transition-colors">
          Create Your LinkHive
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white text-purple-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose LinkHive?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Easy to Use", description: "Set up your LinkHive in minutes with our intuitive interface." },
              { title: "Customizable", description: "Personalize your page to match your brand and style." },
              { title: "Analytics", description: "Track your link performance with detailed insights." },
            ].map((feature, index) => (
              <div key={index} className="bg-purple-100 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-4">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Choose Your Plan</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: "Free", features: ["1 custom link", "Basic analytics", "Standard support"] },
              { name: "Pro", price: "$9.99/mo", features: ["Unlimited custom links", "Advanced analytics", "Priority support", "Custom domains"] },
              { name: "Business", price: "$29.99/mo", features: ["Everything in Pro", "Team collaboration", "API access", "Dedicated account manager"] },
            ].map((plan, index) => (
              <div key={index} className="bg-white text-purple-800 p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                <p className="text-3xl font-semibold mb-6">{plan.price}</p>
                <ul className="mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center mb-2">
                      <Check size={20} className="mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white text-purple-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full p-4 bg-purple-100 rounded-lg focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold">{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-purple-50 rounded-b-lg">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">LinkHive</h4>
              <p>Connect your world in one link.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-purple-200 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-200 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-purple-700 text-center">
            <p>&copy; 2024 LinkHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}