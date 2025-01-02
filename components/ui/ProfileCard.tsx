import React, { useState } from "react";
import styled from "styled-components";
import NumberTicker from "./number-ticker";

const CardContainer = styled.div`
  font-family: var(--font-Gilroy);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  .card {
    width: 100%;
    height: 100%;

    font-family: var(--font-Gilroy);

    border-radius: 15px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: 0.3s ease;
    position: relative;
    text-align: center;
  }

  .card-avatar {
    width: 80px;
    height: 80px;

    border-radius: 50%;
    border: 3px solid #fff;
    margin: 30px auto 10px;
    background: #dfdfdf;
    overflow: hidden;
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
    padding: 10%;
    display: flex;
  }

  .card-section.is-active {
    display: block;
  }

  .card-buttons {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ddd;
    border-bottom: None;
    border-middle: None;
  }

  .card-buttons {
    //flex: 1;
    padding: 10px;
    font-size: 0.9rem;
    // border-right: 1px solid #ddd;
    cursor: pointer;
    transition: background 0.3s;
    text-align: center;
    display: flex;
    justify-content: space-between;
  }
  .card-button-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }

  .card-button-label {
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .card-buttons button:last-child {
    border-right: none;
  }

  .card-buttons button:hover,
  .card-buttons button.is-active {
    background: transparent;
  }

  .card-social {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20%;
    margin-top: 10%;
  }

  .card-social svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
  }

  .card-social svg:hover {
    transform: scale(1.5);
  }
`;

const ProfileCard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    "about" | "PR Merges" | "commits"
  >("about");

  return (
    <CardContainer>
      <div className="card">
        <div className="card-avatar" />
        <div className="card-fullname">Kuhoo </div>
        <div className="card-jobtitle">Front-end Developer</div>

        <div
          className={`card-section ${
            activeSection === "about" ? "is-active" : ""
          }`}
        >
          <p>Passionate about developing front-end for web-apps.</p>
          <div className="card-social">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
              >
                <path d="M12 .297C5.375.297 0 5.672 0 12.297c0 5.302 3.438 9.799 8.207 11.385.6.111.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.082-.729.082-.729 1.205.084 1.84 1.238 1.84 1.238 1.07 1.833 2.807 1.304 3.492.997.108-.774.418-1.304.762-1.605-2.665-.305-5.466-1.333-5.466-5.932 0-1.31.469-2.382 1.235-3.222-.123-.303-.535-1.524.117-3.177 0 0 1.008-.322 3.303 1.23a11.446 11.446 0 013.006-.404c1.02.004 2.046.138 3.006.404 2.295-1.553 3.303-1.23 3.303-1.23.653 1.653.24 2.874.117 3.177.765.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.478 5.922.43.372.815 1.102.815 2.22 0 1.606-.015 2.903-.015 3.293 0 .32.192.694.801.576C20.565 22.092 24 17.595 24 12.297 24 5.672 18.625.297 12 .297z" />
              </svg>
            </a>
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z" />
              </svg>
            </a>
            <a href="#">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="card-buttons">
          <div className="card-button-item">
            <div className="card-button-label">PR Merges</div>
            <NumberTicker value={100} />
          </div>
          <div className="card-button-item">
            <div className="card-button-label">Total Commits</div>
            <NumberTicker value={100} />
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default ProfileCard;
