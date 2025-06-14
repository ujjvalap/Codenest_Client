import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import pawanImg from "../../assets/pawan.jpg";
import tulsiImg from "../../assets/tulsi.jpeg";
import ujjwalImg from "../../assets/ujjwal.jpeg";

const Team = () => {
  const teamMembers = [
    {
      name: "Pawan Tiwari",
      img: pawanImg,
      work: "Frontend Developer",
      socials: {
        linkedin: "https://www.linkedin.com/in/pawan-tiwari-922284246/",
        github: "https://github.com/ramraja1",
        twitter: "#",
      },
    },
    {
      name: "Tulsiram Pathe",
      img: tulsiImg,
      work: "Full Stack Developer",
      socials: {
        linkedin: "https://www.linkedin.com/in/tulsiram-pathe-03b7b9258/",
        github: "https://github.com/tulsirampathe",
        twitter: "#",
      },
    },
    {
      name: "Ujjval Pateliya",
      img: ujjwalImg,
      work: "Team Manager",
      socials: {
        linkedin: "https://www.linkedin.com/in/ujjval-pateliya-qwer2005/",
        github: "https://github.com/ujjvalap",
        twitter: "#",
      },
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-gray-700 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold text-white mb-12">Meet the Team</h2>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white w-80 shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              {/* Image Container */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500 mt-2">{member.work}</p>
                <div className="flex justify-center gap-4 mt-4">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaLinkedin className="text-2xl" />
                  </a>
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-800 hover:text-gray-900 transition"
                  >
                    <FaGithub className="text-2xl" />
                  </a>
                  <a
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-600 transition"
                  >
                    <FaTwitter className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
