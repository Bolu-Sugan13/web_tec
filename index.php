<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Suganya — MERN Stack Developer</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="grain"></div>

<!-- NAV -->
<nav class="nav" id="nav">
  <button class="nav-toggle" id="navToggle" aria-label="Toggle menu">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="navLinks">
    <li><a href="#about">About</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- HERO -->
<header class="hero" id="top">
  <div class="hero-inner">
    <div class="hero-text">
      <p class="eyebrow">// building the full stack, layer by layer</p>
      <h1>Hi, I'm <span class="highlight">Suganya</span>.<br>I build things across the MERN stack.</h1>
      <p class="hero-sub">MCA student turned full-stack builder — currently rebuilding the same small app across Mongo, Express, React and Node so every layer actually clicks.</p>
      <div class="hero-cta">
        <a href="#projects" class="btn btn-primary">See my work</a>
        <a href="#contact" class="btn btn-ghost">Get in touch</a>
      </div>
    </div>

    <div class="hero-photo">
      <div class="stack-frame">
        <div class="stack-layer" style="--i:0" data-label="React"></div>
        <div class="stack-layer" style="--i:1" data-label="Node"></div>
        <div class="stack-layer" style="--i:2" data-label="Express"></div>
        <div class="stack-layer" style="--i:3" data-label="MongoDB"></div>
        <div class="photo-frame">
          <!-- Replace src below with your own image file, e.g. "profile.jpg", placed in this same folder -->
          <img src="https://i.pinimg.com/736x/eb/45/3d/eb453dd927a54a1ae2416189d74ca9ec.jpg" alt="Suganya" onerror="this.style.display='none'">
        </div>
      </div>
    </div>
  </div>
  <a href="#about" class="scroll-cue" aria-label="Scroll down">↓</a>
</header>

<!-- ABOUT -->
<section class="section" id="about">
  <div class="section-inner">
    <span class="section-tag">01 — About</span>
    <h2>Learning full stack the honest way</h2>
    <p class="section-text">
      I'm an MCA student at Pondicherry University, learning full-stack development from the ground up.
      
      <em>why</em> each layer exists, not just how to copy it.
    </p>
    <div class="about-stats">
      <div class="stat"><span class="stat-num">4</span><span class="stat-label">stack layers learned</span></div>
      <div class="stat"><span class="stat-num">MCA</span><span class="stat-label">Pondicherry University</span></div>
      <div class="stat"><span class="stat-num">01</span><span class="stat-label">app, rebuilt 4 ways</span></div>
    </div>
  </div>
</section>

<!-- STACK / SKILLS -->
<section class="section section-alt" id="stack">
  <div class="section-inner">
    <span class="section-tag">02 — The Stack</span>
    <h2>What I'm working with</h2>
    <div class="stack-grid">

      <div class="stack-card" style="--accent:#5ED0C4">
        <span class="stack-card-tag">frontend</span>
        <h3>HTML · CSS · JavaScript</h3>
        <p>Semantic markup, layout with Flexbox/Grid, and vanilla JS for interactivity — the foundation everything else sits on.</p>
      </div>

      <div class="stack-card" style="--accent:#61DAFB">
        <span class="stack-card-tag">frontend</span>
        <h3>React</h3>
        <p>Component-based UIs, hooks, and state management — rebuilding static pages as reactive components.</p>
      </div>

      <div class="stack-card" style="--accent:#8FBC57">
        <span class="stack-card-tag">backend</span>
        <h3>Node.js · Express</h3>
        <p>REST APIs, routing, and middleware — the server layer that connects the interface to real data.</p>
      </div>

      <div class="stack-card" style="--accent:#4DB33D">
        <span class="stack-card-tag">database</span>
        <h3>MongoDB</h3>
        <p>Document-based data modelling and CRUD operations — where the app's data actually lives.</p>
      </div>

    </div>
  </div>
</section>

<!-- ROADMAP -->
<section class="section" id="roadmap">
  <div class="section-inner">
    <span class="section-tag">03 — Roadmap</span>
    <h2>How I'm learning it</h2>
    <div class="timeline">
      <div class="timeline-step">
        <span class="timeline-index">01</span>
        <div>
          <h3>Static frontend</h3>
          <p>Build the app's UI in plain HTML/CSS/JS. Understand structure, styling, and browser behaviour first.</p>
        </div>
      </div>
      <div class="timeline-step">
        <span class="timeline-index">02</span>
        <div>
          <h3>Backend API</h3>
          <p>Recreate the app's logic as a Node/Express server with real routes and endpoints.</p>
        </div>
      </div>
      <div class="timeline-step">
        <span class="timeline-index">03</span>
        <div>
          <h3>Persistent data</h3>
          <p>Connect the API to MongoDB so data survives beyond a single session.</p>
        </div>
      </div>
      <div class="timeline-step">
        <span class="timeline-index">04</span>
        <div>
          <h3>React rebuild</h3>
          <p>Rebuild the same frontend in React, then integrate all four layers and deploy.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section class="section section-alt" id="projects">
  <div class="section-inner">
    <span class="section-tag">04 — Projects</span>
    <h2>Web technologies</h2>
    <div class="project-grid">

      <article class="project-card">
        <div class="project-thumb thumb-1"></div>
        <div class="project-body">
          <h3>Resume</h3>
          <p>For a profile view you can visit this page </p>
          <a href="resume.html" target="_blank" class="btn">View</a>
        </div>
      </article>
      <article class="project-card">
        <div class="project-thumb thumb-1"></div>
        <div class="project-body">
          <h3>Online Shopping</h3>
          <p>A basic E-Commerce Website</p>
          <a href="online-shopping.html" target="_blank" class="btn">View</a>
        </div>
      </article>
      <article class="project-card">
        <div class="project-thumb thumb-1"></div>
        <div class="project-body">
          <h3>Quiz Game</h3>
          <p>A simple quiz game built with HTML, CSS and Javascript</p>
          <a href="quizq.html" target="_blank" class="btn">View</a>
        </div>
      </article>
        <article class="project-card">
        <div class="project-thumb thumb-1"></div>
        <div class="project-body">
          <h3>Scientific calculator</h3>
          <p>Calculatore page which scintific calculation also included</p>
          <a href="calculator.html" target="_blank" class="btn">View</a>
        </div>
      </article>
              <article class="project-card">
        <div class="project-thumb thumb-1"></div>
        <div class="project-body">
          <h3>Employee details registration</h3>
          <p>A simple page for employee detils regsitration, where you can store the basic details of the employee.</p>
          <a href="http://localhost/employee.php" target="_blank" class="btn">View</a>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="section" id="contact">
  <div class="section-inner section-inner-narrow">
    <span class="section-tag">05 — Contact</span>
    <h2>Let's talk</h2>
    <p class="section-text">Open to internships, collaborations, or just talking about full-stack learning paths.</p>

    <form class="contact-form" id="contactForm">
      <div class="form-row">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" required>
      </div>
      <div class="form-row">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="you@example.com" required>
      </div>
      <div class="form-row">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4" placeholder="Say hello..." required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Send message</button>
      <p class="form-status" id="formStatus" role="status"></p>
    </form>
  </div>
</section>

<footer class="footer">
  <p>Built with HTML, CSS &amp; JavaScript — by Suganya.</p>
</footer>

<script src="script.js"></script>
</body>
</html>
