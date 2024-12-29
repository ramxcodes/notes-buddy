import React, { useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-family: 'Jost', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
   background-color: transparent;

  .card {
    width: 300px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: 0.3s ease;
    position: relative;
    text-align: center;
  }

  .card-cover {
    height: 120px;
    background: url('https://via.placeholder.com/300x120') center/cover no-repeat;
  }

  .card-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #fff;
    margin: -40px auto 10px;
    background: #ccc;
  }

  .card-fullname {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .card-jobtitle {
    font-size: 0.9rem;
    color: #888;
  }

  .card-section {
    padding: 15px;
    display: none;
  }

  .card-section.is-active {
    display: block;
  }

  .card-buttons {
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #ddd;
  }

  .card-buttons button {
    flex: 1;
    padding: 10px;
    font-size: 0.9rem;
    background: none;
    border: none;
    border-right: 1px solid #ddd;
    cursor: pointer;
    transition: background 0.3s;
  }

  .card-buttons button:last-child {
    border-right: none;
  }

  .card-buttons button:hover,
  .card-buttons button.is-active {
    background: #f5f5f5;
  }

  .card-timeline {
    text-align: left;
  }

  .card-item {
    margin-bottom: 10px;
  }

  .card-item-title {
    font-weight: bold;
  }

  .card-item-desc {
    font-size: 0.9rem;
    color: #666;
  }

  .card-contact-wrapper {
    text-align: left;
  }

  .card-contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .card-contact-item svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }




  .card-social {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 12px; 
  margin-top: 10px; 
}

.card-social svg {
  width: 24px; 
  height: 24px;
  fill: #000; 
  transition: transform 0.3s;
}

.card-social svg:hover {
  transform: scale(1.2);
}




`;

const ProfileCard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"about" | "experience" | "contact">("about");

  return (
  
    <CardContainer>
      <div className="card">
        <div className="card-cover" />
        <div className="card-avatar" />
        <div className="card-fullname">Kuhu </div>
        <div className="card-jobtitle">Front-end Devlpment</div>

        <div className={`card-section ${activeSection === "about" ? "is-active" : ""}`}>
          <h3>About</h3>
          <p>Passionate about developing front-end for web-apps.</p>
          <div className="card-social">
        <a href="#"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z" />
          </svg></a>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
          </svg></a>
        <a href="#"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M301 256c0 24.852-20.148 45-45 45s-45-20.148-45-45 20.148-45 45-45 45 20.148 45 45zm0 0" />
            <path d="M332 120H180c-33.086 0-60 26.914-60 60v152c0 33.086 26.914 60 60 60h152c33.086 0 60-26.914 60-60V180c0-33.086-26.914-60-60-60zm-76 211c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zm86-146c-8.285 0-15-6.715-15-15s6.715-15 15-15 15 6.715 15 15-6.715 15-15 15zm0 0" />
            <path d="M377 0H135C60.562 0 0 60.563 0 135v242c0 74.438 60.563 135 135 135h242c74.438 0 135-60.563 135-135V135C512 60.562 451.437 0 377 0zm45 332c0 49.625-40.375 90-90 90H180c-49.625 0-90-40.375-90-90V180c0-49.625 40.375-90 90-90h152c49.625 0 90 40.375 90 90zm0 0" />
          </svg></a>
        <a href="#"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z" />
          </svg></a>
        </div>
      
    </div>
        
        <div className="card-buttons">
          <button>
            PR Merges
          </button>
          <button>
            Total Commits
          </button>
        </div>
      </div>
    </CardContainer>
  );
};

export default ProfileCard;
