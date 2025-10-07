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
      work: "Full Stack Developer / SEO",
      socials: {
        linkedin: "https://www.linkedin.com/in/pawan-tiwari-922284246/",
        github: "https://github.com/ramraja1",
        twitter: "#",
      },
    },
    {
      name: "Tulsiram Pathe ",
      img: tulsiImg,
      work: "Full Stack Developer / UI UX Designer",
      socials: {
        linkedin: "https://www.linkedin.com/in/tulsiram-pathe-03b7b9258/",
        github: "https://github.com/tulsirampathe",
        twitter: "#",
      },
    },
    {
      name: "Ujjval Pateliya",
      img: ujjwalImg,
      work: "Backend Developer / Quality Assurance Engineer",
      socials: {
        linkedin: "https://www.linkedin.com/in/ujjval-pateliya-qwer2005/",
        github: "https://github.com/ujjvalap",
        twitter: "#",
      },
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-black to-gray-800 py-20">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-5xl font-extrabold text-white mb-16 drop-shadow-lg">
          Meet the <span className="text-cyan-400">Team</span>
        </h2>

        {/* Team Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative bg-white/10 backdrop-blur-xl w-80 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-cyan-500/30 border border-gray-700 hover:border-cyan-400"
            >
              {/* Profile Image */}
              <div className="flex justify-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 shadow-md"
                />
              </div>

              {/* Info */}
              <div className="mt-6">
                <h3 className="text-2xl font-bold text-white">
                  {member.name}
                </h3>
                <p className="text-gray-400 mt-1">{member.work}</p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6 mt-6">
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition transform hover:scale-125"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white transition transform hover:scale-125"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition transform hover:scale-125"
                >
                  <FaTwitter className="text-2xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
