// Opportunities.js
import React, { useState } from "react";
import RootLayout from "../components/RootLayout"; // Import RootLayout
import styles from "./Opportunities.module.css"; // Import CSS as a module
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Opportunities = () => {
  const [jobType, setJobType] = useState([]);
  const [locationType, setLocationType] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [pay, setPay] = useState(10);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleCheckboxChange = (setState, value) => {
    setState((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  // Navigate to job listings with selected filters
  const handleSearchClick = () => {
    const filters = {
      jobType,
      locationType,
      industry,
      pay,
    };
    navigate('/opportunities1', { state: filters }); // Pass filters as state
  };

  return (
    <RootLayout> {/* Wrap the content with RootLayout */}
      <div className={styles.opportunitiesContainer}>
        <div className={styles.content}>
          <div className={styles.filters}>
            {/* Job Type Filter */}
            <div className={styles.filter}>
              <h4>Job Type</h4>
              <label>
                <input
                  type="checkbox"
                  checked={jobType.includes("Full-time")}
                  onChange={() => handleCheckboxChange(setJobType, "Full-time")}
                />
                Full-time
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobType.includes("Part-time")}
                  onChange={() => handleCheckboxChange(setJobType, "Part-time")}
                />
                Part-time
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={jobType.includes("Internship")}
                  onChange={() => handleCheckboxChange(setJobType, "Internship")}
                />
                Internship
              </label>
            </div>

            {/* Location Type Filter */}
            <div className={styles.filter}>
              <h4>Location Type</h4>
              <label>
                <input
                  type="checkbox"
                  checked={locationType.includes("On-site")}
                  onChange={() =>
                    handleCheckboxChange(setLocationType, "On-site")
                  }
                />
                On-site
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={locationType.includes("Hybrid")}
                  onChange={() =>
                    handleCheckboxChange(setLocationType, "Hybrid")
                  }
                />
                Hybrid
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={locationType.includes("Remote")}
                  onChange={() =>
                    handleCheckboxChange(setLocationType, "Remote")
                  }
                />
                Remote
              </label>
            </div>

            {/* Industry Filter */}
            <div className={styles.filter}>
              <h4>Industry</h4>
              <label>
                <input
                  type="checkbox"
                  checked={industry.includes("Academic")}
                  onChange={() => handleCheckboxChange(setIndustry, "Academic")}
                />
                Academic
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={industry.includes("Technology")}
                  onChange={() =>
                    handleCheckboxChange(setIndustry, "Technology")
                  }
                />
                Technology
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={industry.includes("Healthcare")}
                  onChange={() =>
                    handleCheckboxChange(setIndustry, "Healthcare")
                  }
                />
                Healthcare
              </label>
            </div>

            {/* Pay Range Filter */}
            <div className={styles.filter}>
              <pay>Pay</pay>
              <input
                type="range"
                min="10"
                max="500"
                value={pay}
                onChange={(e) => setPay(e.target.value)}
                className={styles.payRange}
              />
              <div className={styles.payLabels}>
                <span>$10K</span>
                <span>$500K</span>
              </div>
            </div>
          </div>

          <div className={styles.jobListing}>
            <h2>Discover Job Opportunities from All Over The World</h2>
            <button className={styles.searchButton} onClick={handleSearchClick}>
              Search
            </button>
            <p className={styles.description}>
              Find work opportunities that align with your skills and aspirations.
              Whether you're seeking a side gig, a full-time remote role, or a chance to explore new industries, we have your back!
            </p>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Opportunities;
