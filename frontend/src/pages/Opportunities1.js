import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import RootLayout from "../components/RootLayout"; // Import RootLayout
import styles from "./Opportunities1.module.css"; // Import CSS as a module

const Opportunities1 = () => {
  const { state } = useLocation(); // Get the state passed via navigate
  const { jobType, locationType, industry, pay } = state || {}; // Destructure filters from state

  const [filteredJobs, setFilteredJobs] = useState([]);

  // Example job listings

  const jobListings = [
    { id: 1, title: "Software Engineer", company: "Microsoft", location: "Washington", locationType: "Remote", industry: "Technology", pay: 120, url: "https://jobs.careers.microsoft.com/global/en/job/1769177/Software-Engineer", jobType: "Full-time" },
    { id: 2, title: "Data Engineer", company: "JP Morgan", location: "Plano, TX", locationType: "Onsite", industry: "Technology", pay: 130, url: "https://jpmc.fa.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1001/job/210563222?keyword=Data+Engineer&location=United+States&locationId=300000000289738&locationLevel=country&mode=location", jobType: "Full-time" },
    { id: 3, title: "Software Intern", company: "Toyota", location: "California", locationType: "Remote", industry: "Technology", pay: 50, url: "https://app.joinhandshake.com/e/15815", jobType: "Internship" },
    { id: 4, title: "Healthcare Research Analyst", company: "MedTech", location: "New York", locationType: "Hybrid", industry: "Healthcare", pay: 100, url: "https://medtech.jobs/healthcare-analyst", jobType: "Full-time" },
    { id: 5, title: "Frontend Developer", company: "Google", location: "Mountain View, CA", locationType: "Onsite", industry: "Technology", pay: 150, url: "https://careers.google.com/jobs/results/123456789/", jobType: "Part-time" },
    { id: 6, title: "Backend Engineer", company: "Amazon", location: "Seattle, WA", locationType: "Hybrid", industry: "Technology", pay: 140, url: "https://www.amazon.jobs/en/jobs/123456789", jobType: "Full-time" },
    { id: 7, title: "Product Manager", company: "Apple", location: "Cupertino, CA", locationType: "Hybrid", industry: "Technology", pay: 160, url: "https://www.apple.com/careers/us/", jobType: "Full-time" },
    { id: 8, title: "Machine Learning Engineer", company: "Facebook", location: "Menlo Park, CA", locationType: "Remote", industry: "Technology", pay: 180, url: "https://www.facebook.com/careers/jobs/123456789/", jobType: "Internship" },
    { id: 9, title: "Data Scientist", company: "Netflix", location: "Los Angeles, CA", locationType: "Remote", industry: "Technology", pay: 200, url: "https://jobs.netflix.com/jobs/123456789", jobType: "Full-time" },
    { id: 10, title: "Business Analyst", company: "Uber", location: "San Francisco, CA", locationType: "Hybrid", industry: "Technology", pay: 110, url: "https://www.uber.com/global/en/careers/", jobType: "Full-time" },
    { id: 11, title: "Digital Marketing Specialist", company: "Spotify", location: "Stockholm, Sweden", locationType: "Hybrid", industry: "Media", pay: 95, url: "https://www.spotify.com/careers/", jobType: "Full-time" },
    { id: 12, title: "HR Manager", company: "Salesforce", location: "San Francisco, CA", locationType: "Onsite", industry: "Technology", pay: 120, url: "https://www.salesforce.com/company/careers/", jobType: "Internship" },
    { id: 13, title: "DevOps Engineer", company: "Twitter", location: "San Francisco, CA", locationType: "Hybrid", industry: "Technology", pay: 125, url: "https://careers.twitter.com/", jobType: "Internship" },
    { id: 14, title: "Software Developer", company: "Adobe", location: "San Jose, CA", locationType: "Remote", industry: "Technology", pay: 130, url: "https://www.adobe.com/careers.html", jobType: "Full-time" },
    { id: 15, title: "Quality Assurance Engineer", company: "LinkedIn", location: "Sunnyvale, CA", locationType: "Onsite", industry: "Technology", pay: 110, url: "https://www.linkedin.com/company/linkedin/jobs", jobType: "Full-time" },
    { id: 16, title: "Business Intelligence Analyst", company: "Zoom", location: "San Jose, CA", locationType: "Hybrid", industry: "Technology", pay: 115, url: "https://zoom.us/careers", jobType: "Full-time" },
    { id: 17, title: "Software Engineer Intern", company: "Slack", location: "San Francisco, CA", locationType: "Remote", industry: "Technology", pay: 45, url: "https://slack.com/careers", jobType: "Internship" },
    { id: 18, title: "Cybersecurity Analyst", company: "Cisco", location: "San Jose, CA", locationType: "Hybrid", industry: "Technology", pay: 130, url: "https://www.cisco.com/c/en/us/about/careers.html", jobType: "Internship" },
    { id: 19, title: "Network Engineer", company: "IBM", location: "Austin, TX", locationType: "Onsite", industry: "Technology", pay: 120, url: "https://www.ibm.com/employment/", jobType: "Full-time" },
    { id: 20, title: "Systems Administrator", company: "Oracle", location: "Redwood City, CA", locationType: "Remote", industry: "Technology", pay: 125, url: "https://www.oracle.com/corporate/careers/", jobType: "Full-time" },
    { id: 21, title: "Research Professor", company: "Harvard University", location: "Cambridge, MA", locationType: "Onsite", industry: "Academic", pay: 85, url: "https://www.harvard.edu/jobs", jobType: "Part-time" },
    { id: 22, title: "Medical Research Scientist", company: "Johns Hopkins University", location: "Baltimore, MD", locationType: "Hybrid", industry: "Academic", pay: 95, url: "https://www.jhu.edu/employment", jobType: "Full-time" },
    { id: 23, title: "Clinical Research Coordinator", company: "Cleveland Clinic", location: "Cleveland, OH", locationType: "Onsite", industry: "Healthcare", pay: 100, url: "https://www.clevelandclinic.org/careers", jobType: "Full-time" },
    { id: 24, title: "Public Health Analyst", company: "CDC", location: "Atlanta, GA", locationType: "Hybrid", industry: "Healthcare", pay: 110, url: "https://www.cdc.gov/careers", jobType: "Full-time" },
    { id: 25, title: "Healthcare Data Analyst", company: "Kaiser Permanente", location: "Oakland, CA", locationType: "Onsite", industry: "Healthcare", pay: 120, url: "https://www.kaiserpermanente.org/careers", jobType: "Full-time" },
    { id: 26, title: "Nursing Research Specialist", company: "Mayo Clinic", location: "Rochester, MN", locationType: "Hybrid", industry: "Healthcare", pay: 130, url: "https://www.mayoclinic.org/careers", jobType: "Full-time" },
    { id: 27, title: "Healthcare Policy Advisor", company: "World Health Organization", location: "Geneva, Switzerland", locationType: "Remote", industry: "Healthcare", pay: 140, url: "https://www.who.int/careers", jobType: "Full-time" },
    { id: 28, title: "University Lecturer", company: "Stanford University", location: "Stanford, CA", locationType: "Onsite", industry: "Academic", pay: 120, url: "https://career.stanford.edu/jobs", jobType: "Part-time" },
    { id: 29, title: "Public Health Consultant", company: "World Bank", location: "Washington, D.C.", locationType: "Remote", industry: "Healthcare", pay: 150, url: "https://www.worldbank.org/en/careers", jobType: "Full-time" },
    { id: 30, title: "Clinical Psychologist", company: "Psychology Associates", location: "Los Angeles, CA", locationType: "Onsite", industry: "Healthcare", pay: 135, url: "https://www.psychologyassociates.com/careers", jobType: "Part-time" },
    { id: 31, title: "Postdoctoral Researcher", company: "MIT", location: "Cambridge, MA", locationType: "Onsite", industry: "Academic", pay: 110, url: "https://www.mit.edu/jobs", jobType: "Full-time" },
    { id: 32, title: "Academic Advisor", company: "University of California", location: "Berkeley, CA", locationType: "Onsite", industry: "Academic", pay: 95, url: "https://jobs.berkeley.edu", jobType: "Internship" }
];


  useEffect(() => {
    if (state) {
      filterJobs();
    }
  }, [state]); // Re-run when filters change

  const filterJobs = () => {
    const filtered = jobListings.filter((job) => {
      const matchesJobType = jobType.length === 0 || jobType.includes(job.jobType);
      const matchesLocation = locationType.length === 0 || locationType.includes(job.locationType);
      const matchesIndustry = industry.length === 0 || industry.includes(job.industry);
      const matchesPay = job.pay >= pay;

      return matchesJobType && matchesLocation && matchesIndustry && matchesPay;
    });

    setFilteredJobs(filtered);
  };

  return (
    <RootLayout>
      <div className={styles.content}>
        <div className={styles.jobListings}>
          <h2>Job Opportunities</h2>
          
          {/* Render filtered jobs */}
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <span className={styles.jobNumber}>#{job.id}</span>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>Location: {job.location}</p>
                <p>Location Type: {job.locationType}</p>
                <button
                  className={styles.applyButton}
                  onClick={() => window.open(job.url, "_blank")}
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <div className={styles.noJobsMessage}>No jobs match your filters</div>
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default Opportunities1;
