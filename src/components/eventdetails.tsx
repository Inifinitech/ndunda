import React from 'react'
import { Calendar, MapPin, CreditCard } from 'lucide-react'

export default function EventDetails() {
  return (
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Event Details
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know to prepare for an unforgettable retreat at Camp Ndunda Falls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Event Info Cards */}
            <div className="space-y-6">
              <div className="flex items-center bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <Calendar className="w-8 h-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Date</h3>
                  <p className="text-slate-600">August 17, 2025</p>
                </div>
              </div>
              <div className="flex items-center bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <MapPin className="w-8 h-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Location</h3>
                  <p className="text-slate-600">Camp Ndunda Falls, Embu County, Kenya</p>
                </div>
              </div>
              <div className="flex items-center bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <CreditCard className="w-8 h-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">Payment Methods</h3>
                  <p className="text-slate-600">M-Pesa Till: <span className="tracking-wider text-green-700 text-xl font-semibold">4941686</span></p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-2">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Pickup Location</h3>
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d73548.53294710068!2d36.6407831!3d-1.1075085!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f27bc1a7cb8cf%3A0xfb635419c9916829!2sLife%20Church%20International%20-%20Limuru%2C!5e1!3m2!1sen!2ske!4v1749232169690!5m2!1sen!2ske" width="600" height="450" style={{ border:0 }} allowFullScreen loading="lazy" title="Camp Ndunda Falls Pickup Location"></iframe> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.215724343492!2d36.63459225586796!3d-1.121567178193246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f27bc1a7cb8cf%3A0xfb635419c9916829!2sLife%20Church%20International%20-%20Limuru%2C!5e0!3m2!1sen!2ske!4v1749792088988!5m2!1sen!2ske" width="600" height="450" style={{ border:0 }} allowFullScreen loading="lazy" title="Camp Ndunda Falls Pickup Location"></iframe>
              </div>
              <p className="text-slate-600 mt-4 text-center">
                Pickup point: LCI, Old Sanctuary - Limuru Town
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}
