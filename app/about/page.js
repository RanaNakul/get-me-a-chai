import React from 'react'

const about = () => {
  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 ">About Get Me A Chai</h1>
        
        {/* Main Introduction */}
        <section className="text-base sm:text-lg mb-8">
          <p className=" mb-4">Welcome to Get Me A Chai! We are a crowdfunding platform dedicated to helping you bring your ideas to life.</p>
          <p className=" mb-4">Our mission is to connect creators with supporters who believe in their vision and want to help make it a reality.</p>
          <p className=" mb-4">Thank you for visiting our page. We hope you find inspiration and support for your projects!</p>
        </section>

        {/* How It Works Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 ">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-2">1. Create</h3>
              <p>Share your project or idea with our community. Set your goals and tell your story.</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-2">2. Connect</h3>
              <p>Engage with supporters who believe in your vision and want to contribute.</p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg shadow-md">
              <h3 className="font-bold mb-2">3. Achieve</h3>
              <p>Receive funding and turn your dreams into reality with community support.</p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 ">Our Values</h2>
          <div className=" p-6 rounded-lg shadow-md">
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold">Transparency:</span> We believe in open and honest communication</li>
              <li><span className="font-semibold">Community:</span> Building stronger connections between creators and supporters</li>
              <li><span className="font-semibold">Innovation:</span> Encouraging creative solutions and new ideas</li>
              <li><span className="font-semibold">Support:</span> Providing the tools and platform for success</li>
            </ul>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-black/30  p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 ">Get in Touch</h2>
          <p className="mb-4">Have questions or suggestions? We&apos;d love to hear from you!</p>
          <p className="">Email: contact@getmeachai.com</p>
        </section>
      </div>
    </div>
  )
}

export default about;

export const metadata = {
  title: "About - Get Me a Chai"
}