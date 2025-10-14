import './App.css';
import { useState, useEffect } from 'react';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import personalPhoto from './assets/personalPhoto.jpg';
import ImageSlideshow from "./ImageSlideshow";

const titles = [
    "Bianca Frantzeskakis",
    "a problem solver",
    "a software developer",
    "a builder of ideas",
    "a resilient innovator",
    "a lifelong learner",
    "a creative technologist"
  ];

function ContactForm() {
  const [state, handleSubmit] = useForm("mldnrvyw");
  if (state.succeeded) {
      return <p>Thanks for reaching out! 💌</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input id="name" type="text" name="name" placeholder="Your Name" required />
      <ValidationError prefix="Name" field="name" errors={state.errors} />

      <input id="email" type="email" name="email" placeholder="Your Email" required />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <textarea id="message" name="message" placeholder="Your Message" required />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <button type="submit" disabled={state.submitting}>Send</button>
    </form>
  );
}

function RotatingTitle() {
  const [index, setIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("fade-out");

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % titles.length);
        setFadeClass("fade-in");
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span key={index} className={`rotating-title ${fadeClass}`}>
      {titles[index]}
    </span>
  );
}

function PuzzleDemo() {
  const initialCode = `function factorial(n) {
  if (n <= 1) return 1;
  return n;
}`;

  const correctCode = `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`;

  const [code, setCode] = useState(initialCode);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState(performance.now());
  const [solved, setSolved] = useState(false);

  const runCode = () => {
    try {
      // eslint-disable-next-line no-eval
      window.__testResult = undefined; // reset before eval
      eval(code + '\nwindow.__testResult = factorial(5);');
      if (window.__testResult === 120) {
        const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        setMessage(`You solved the puzzle in ${duration} seconds! 🎉`);
        setSolved(true);
      } else {
        setMessage('Incorrect result. Try again!');
      }
    } catch (err) {
      setMessage('There was an error in your code - possibly syntax error.');
    }
  };

  const resetPuzzle = () => {
    setCode(initialCode);
    setMessage('');
    setSolved(false);
    setStartTime(performance.now()); // restart the timer here
  };

  return (
    <div
      className="code-demo"
      style={{
        backgroundImage: 'url(https://lh3.googleusercontent.com/d/1BYIk16Q3eRmo4VzgVtXgxpOxRUD3rKyc)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h3>Fix the function so that it returns the factorial of a number recursively:</h3>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={runCode} disabled={solved}>Check Code</button>
      <button onClick={resetPuzzle} style={{ marginLeft: '1rem' }}>Restart</button>
      <div className="output"><strong>{message}</strong></div>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const compilerImages = [
    "https://lh3.googleusercontent.com/d/1MJa8vS2AHBwYyHaPPU6nrJYoOFIPgdCc", 
    "https://lh3.googleusercontent.com/d/125XqQK5rFVMQ4IYYLcr5_MIRu0xdAUkV",
    "https://lh3.googleusercontent.com/d/1Pt1UayVhogk-8NqMq6QKfG7SBvTJ5lIW"
  ];
  const arduinoImages = [
    "https://lh3.googleusercontent.com/d/1gp8qhjVbkDpfBrpLp4W0ruq0eRVJBigr",
    "https://lh3.googleusercontent.com/d/1_JfSMaKvv9N7DEgr44gtVvTb2W3VLA8m",
    "https://lh3.googleusercontent.com/d/1tVjUOn2xPuXywJsB8wd5ItkISVgRkrmG"
  ];


  return (
    <div className="App">
      <div className="banner" style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/d/1-dyhQ9NfeQ1zoj8qgjoBgSGvNwRo-GcM)' }} />

      <button className="toggle-button" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <a href="#hero"onClick={() => setSidebarOpen(false)}>Home</a>
        <a href="#projects"onClick={() => setSidebarOpen(false)}>Projects</a>
        <a href="#connect"onClick={() => setSidebarOpen(false)}>Connect</a>
        <a href="#about"onClick={() => setSidebarOpen(false)}>About</a>
      </div>

      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>Hello, world!</h1>
          <h1>I am <RotatingTitle/></h1>
          <p>
            Passionate about solving problems and building thoughtful, efficient, and user-friendly software.
          </p>
          <p>
            Let's start off with a little puzzle for my coders! You can also navigate to other sections using the sidebar.
          </p>
          <div className="scroll-indicator">
            <span className="arrow"></span>
          </div>
        </div>  
        <PuzzleDemo />
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        
        <div className="project">
          <h3>Social Sense Mobile App</h3>
          <p>
            A senior design project aimed at helping children (ages 8–14) with autism or other learning disabilities improve their social skills through an interactive mobile experience.
          </p>
          <ul>
            <li>Developed with a team of 5 using Firebase for authentication and Firestore for real-time user data management</li>
            <li>Integrated OpenAI-powered conversational AI to simulate social interactions with an on-screen buddy</li>
            <li>Used AWS Rekognition to analyze facial expressions for emotion practice</li>
            <li>Designed a gamified experience with a points system, in-app shop, and customizable avatar accessories</li>
          </ul>
          <div className="project-media">
            <iframe 
              src="https://drive.google.com/file/d/1RS4zjTBSjNsI9w9gX2Hx9T-58AUGeMZW/preview" 
              width="640" 
              height="480" 
              allow="autoplay"
              allowFullScreen
              title="Social Sense Project Demo Video"
            ></iframe>
          </div>
        </div>

        <div className="project">
          <h3>Arduino Sensor System</h3>
          <p>
            A personal project exploring embedded systems and hardware integration using Arduino and DHT sensors.
          </p>
          <ul>
            <li>Measured and displayed real-time temperature and humidity data on a breadboard setup</li>
            <li>Diagnosed and fixed hardware connectivity issues preventing sensor data display</li>
          </ul>
          <ImageSlideshow images={arduinoImages} />
        </div>

        <div className="project">
          <h3>Compiler Development</h3>
          <p>
            A comprehensive systems software class project focused on compiler construction using C and assembly.
          </p>
          <ul>
            <li>Built a mini-compiler following detailed specifications using Bison for parser generation</li>
            <li>Implemented a custom compiler with full type-checking and parsing functionality</li>
            <li>Configured and tested builds in a virtual machine environment</li>
            <li>Gained experience with the full compiler pipeline, from lexical analysis to code parsing and error handling</li>
            <li>Designed and tested context-free grammar rules to generate valid parse trees (example: derivation of "aacdbb")</li>
          </ul>
          <ImageSlideshow images={compilerImages} />
        </div>

        <div className="project">
          <h3>Contact Book Web App (LAMP Stack)</h3>
          <p>
            A group project in object-oriented software development, building a web app contact manager using PHP and MySQL.
          </p>
          <ul>
            <li>Designed and managed the backend database schema for contact storage and retrieval</li>
            <li>Collaborated with a team of 6, contributing to both backend and frontend development</li>
          </ul>
          <div className="project-media">
            <iframe 
              src="https://drive.google.com/file/d/11-4EwGYv03PLeBWjWPvaiMtJfXXvb2lf/preview" 
              width="640" 
              height="480" 
              allow="autoplay"
              allowFullScreen
              title="Contact Wizard Project Demo Video"
            ></iframe>
          </div>
        </div>

        <div className="project">
          <h3>Habit Tracker Web & Mobile App (MERN Stack)</h3>
          <p>
            Another group project in object-oriented software development using modern full-stack JavaScript tools to create a habit-tracking application with cross-platform functionality.
          </p>
          <ul>
            <li>Built with MongoDB, Express, React, and Node.js to support both web and mobile usage</li>
            <li>Implemented key features like habit scheduling, progress tracking, and reminders</li>
          </ul>
        </div>

        <div className="project">
          <h3>College Event Web App (LAMP Stack)</h3>
          <p>
            A full-stack web application built for managing college events across universities, supporting student engagement through dynamic event visibility, RSO membership, and real-time interaction.
          </p>
          <ul>
            <li>Deployed on a cloud-hosted Ubuntu server with a CI/CD pipeline</li>
            <li>Implemented user roles (SuperAdmin, Admin, Student) with distinct access and permissions using session-based login</li>
            <li>Integrated Google Maps API for event location selection with geocoding and autocomplete functionality</li>
            <li>Supported RSO creation, membership approval, and event visibility based on role and university domain</li>
            <li>Built a secure registration system with password hashing, input validation, and university domain enforcement</li>
          </ul>
          <div class="project-media">
            <iframe 
              src="https://drive.google.com/file/d/1aVhY-VrjlzrDcY1lFVymWlfUuM19XyKe/preview" 
              width="640" 
              height="480" 
              allow="autoplay"
              allowFullScreen
              title="College Event Project Demo Video"
            ></iframe>
          </div>
          <div class="project-text">
            <p>Here is a report with more info on this project.</p>
            <a href="/CollegeEvent_report.pdf" download className="download-button"> 📄 Download College Event Report </a>
          </div>
        </div>
      </section>

      <section id="connect" className="section">
        <h2>Connect</h2>
        <h3>Find me on:</h3>
        <div className="social-buttons">
          <a className="button" href="https://github.com/biancafrantz" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="button" href="https://www.linkedin.com/in/bianca-frantzeskakis-91b1722b5" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="button" href="mailto:biancafrantz01@gmail.com">Email Me</a>
        </div>

        <h3 style={{ marginTop: '2rem' }}>Or get in touch now!</h3>
        <ContactForm />

        <div className="resume-downloads">
          <h3>Download my resume here:</h3>
          <a href="/Resume_Bianca_Frantzeskakis.pdf" download className="download-button"> 📄 Download PDF </a>
          <a href="/Resume_Bianca_Frantzeskakis.docx" download className="download-button"> 📄 Download Word </a>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="about-header">
          <img src={'url(https://lh3.googleusercontent.com/d/1Xusz-cMCWCKmaw46SLiMjAiUFMm2jyVN)'} alt="Bianca wearing glasses and smiling" className="profile-photo"/>
        </div>
        <h2>Meet Bianca</h2>
        <div className="about-content">
          <p>
            I’m a recent Computer Science graduate from the University of Central FL with a strong foundation in full-stack development, AI integration, and system-level programming. I am a puzzle lover and solving problems. I love transforming ideas into real, functional software that helps people in meaningful ways.
          </p>
          <p>
            I’m eager to broaden my experience and apply my skills in a software engineering role where I can contribute to building and improving impactful software. Through every project, I’ve learned the value of resilience, communication, and adaptability—and I’m excited to keep growing as a developer.
          </p>
          <p>
            I’m looking for a team that values creativity, continuous learning, and purpose-driven work. Let’s build something beautiful together!
          </p>
        </div>
      </section>
      <footer className="site-footer">
        <p>Created and designed by Bianca Frantzeskakis</p>
      </footer>
    </div>
  );
}

export default App;