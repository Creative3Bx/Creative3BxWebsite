"use client";

import React from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io5";

const Social = ({ source, className }) => {
  // Pro-level data extraction: handles nested objects, params, or flat source structures
  const socialData = source?.social || source?.params?.social || source || {};

  // Highly robust helper to find social link URL dynamically across common naming conventions
  const findLink = (key) => {
    if (!socialData) return "";

    // Handle array structure: [{ name: 'facebook', url: '...' }]
    if (Array.isArray(socialData)) {
      const entry = socialData.find(
        (s) =>
          s.name?.toLowerCase() === key.toLowerCase() ||
          s.label?.toLowerCase() === key.toLowerCase()
      );
      return entry?.url || "";
    }

    // Handle object structure with multiple fallback patterns (e.g., linkedin, LinkedIn, linkedin_url)
    const patterns = [
      key.toLowerCase(),
      key,
      `${key.toLowerCase()}_url`,
      `${key.toLowerCase()}_link`,
      key === "LinkedIn" ? "Linkdin" : null,
      key === "LinkedIn" ? "linkedIn" : null,
    ].filter(Boolean);

    for (const pattern of patterns) {
      const val = socialData[pattern];
      if (val && (typeof val === "string" || typeof val?.url === "string")) {
        const finalUrl = typeof val === "string" ? val : val.url;
        return finalUrl;
      }
    }

    if (key === "LinkedIn" && process.env.NODE_ENV === "development") {
      // This warning is helpful during development but will be stripped from production builds.
      // console.warn(
      //   "Social.js: LinkedIn URL not found in config, using fallback."
      // );
      return "https://www.linkedin.com/company/creative3bx";
    }
    return "";
  };

  const linkedin = findLink("LinkedIn");
  const facebook = findLink("Facebook");
  const instagram = findLink("Instagram");
  const youtube = findLink("YouTube");

  // Define strict order: LinkedIn -> Facebook -> Instagram -> YouTube
  const socialLinks = [
    { name: "LinkedIn", icon: <IoLogoLinkedin />, url: linkedin },
    { name: "Facebook", icon: <IoLogoFacebook />, url: facebook },
    { name: "Instagram", icon: <IoLogoInstagram />, url: instagram },
    { name: "YouTube", icon: <IoLogoYoutube />, url: youtube },
  ];

  return (
    <ul className={className}>
      {socialLinks.map((item) => {
        // Skip rendering if the URL was not found or is empty
        if (!item.url || typeof item.url !== "string" || item.url.trim() === "")
          return null;

        return (
          <li key={item.name} className="inline-block">
            <a
              aria-label={item.name.toLowerCase()}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Follow us on ${item.name}`}
              className="inline-block px-1.5 text-[1.2rem] transition-all duration-200 hover:text-red-600"
            >
              {/* Force size attribute to ensure icon visibility */}
              {React.cloneElement(item.icon, { size: 22 })}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Social;
