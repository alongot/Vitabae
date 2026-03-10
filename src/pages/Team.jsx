import React from 'react';

export default function Team() {
  const team = [
    { name: "Dr. Sarah Chen", role: "Chief Scientific Officer", img: "/images/ilona-isha.jpg" },
    { name: "Rajiv Patel", role: "Head of Sourcing (India)", img: "/images/ilona-isha.jpg" },
    { name: "Elena Rodriguez", role: "Product Development", img: "/images/ilona-isha.jpg" },
    { name: "James Wilson", role: "Operations Director", img: "/images/ilona-isha.jpg" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-24">
         <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1E2A3A] mb-6">Meet The Team</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
               The scientists, nutritionists, and sourcing experts behind your daily wellness.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
               <div key={i} className="group">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-6">
                     <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-serif text-[#1E2A3A]">{member.name}</h3>
                  <p className="text-[#F4A492] text-xs uppercase tracking-widest font-bold">{member.role}</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}