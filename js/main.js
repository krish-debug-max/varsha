/**
 * Data Science & Analytics Portfolio - Main Script
 * Handles micro-interactions, modal management, smooth scrolling, and UI state.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Active link state on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Project Detail Modal Data & Handler
  const projectDetailsMap = {
    1: {
      title: "Netflix Global Content & Audience Intelligence",
      category: "Power BI • Python • Trend Analytics",
      description: "Comprehensive analytical breakdown of Netflix's international streaming catalog. Explored content acquisition shifts, movie vs TV series lifespan, production country clusters, and release window seasonality.",
      techStack: ["Python", "Pandas", "Power BI", "DAX", "Seaborn", "Jupyter"],
      keyFindings: [
        "Analyzed 8,800+ streaming assets spanning movies and TV series across 50+ countries.",
        "Identified 34% spike in international non-English content investments over a 3-year timeline.",
        "Built interactive DAX KPI measures for genre concentration and maturity rating segmentation."
      ]
    },
    2: {
      title: "Zomato Operations & Demand Analytics",
      category: "SQL • Tableau • GIS Mapping",
      description: "End-to-end relational data exploration of food delivery logistics, customer rating drivers, restaurant pricing tiers, and hyper-local order density maps.",
      techStack: ["PostgreSQL", "Tableau", "SQL Window Functions", "Excel"],
      keyFindings: [
        "Analyzed 5,000+ restaurant data points with multi-variable SQL aggregations.",
        "Uncovered 22% order volume lift in strategic sub-zones by adjusting delivery radiuses.",
        "Designed executive Tableau dashboard highlighting unit economics & customer sentiment."
      ]
    },
    3: {
      title: "Customer Churn Prevention ML Engine",
      category: "Machine Learning • Python • Predictive Analytics",
      description: "Supervised machine learning pipeline evaluating customer engagement telemetry, subscription renewal history, and support ticket frequency to predict churn before cancellation occurs.",
      techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Random Forest"],
      keyFindings: [
        "Achieved 91.4% accuracy (F1-score: 0.88) utilizing Random Forest & XGBoost classifiers.",
        "Engineered 12 key predictive features including tenure-to-charge ratios and usage dropoffs.",
        "Integrated threshold probability tuning to maximize retention ROI for account management."
      ]
    },
    4: {
      title: "Executive E-Commerce Revenue Intelligence",
      category: "Power BI • Advanced Excel • Financial Analytics",
      description: "Executive-grade business intelligence reporting platform synthesizing multi-channel sales pipelines, Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC), and inventory forecasting.",
      techStack: ["Power BI", "Advanced Excel", "DAX", "Data Modeling", "Power Query"],
      keyFindings: [
        "Consolidated disparate transactional data from Shopify, Amazon, and ERP SQL databases.",
        "Developed cohort analysis matrix tracking 12-month repeat purchase customer behaviors.",
        "Automated weekly executive reporting updates, reducing manual spreadsheet overhead by 80%."
      ]
    }
  };

  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalFindings = document.getElementById('modalFindings');

  document.querySelectorAll('.btn-view-project').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsMap[projectId];
      
      if (data) {
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.textContent = data.description;
        
        // Render tech tags
        modalTechStack.innerHTML = data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');
        
        // Render findings
        modalFindings.innerHTML = data.keyFindings.map(f => `<li>${f}</li>`).join('');
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Contact Form Handler (Interactive Feedback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending Message...";
      
      setTimeout(() => {
        submitBtn.textContent = "✓ Message Sent Successfully!";
        submitBtn.style.background = "linear-gradient(135deg, #10B981, #059669)";
        submitBtn.style.color = "#FFF";
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.style.color = "";
        }, 4000);
      }, 1200);
    });
  }
});
