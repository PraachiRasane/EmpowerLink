// Available courses data with online/offline options
const availableCourses = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing for Entrepreneurs',
    description: 'Learn essential digital marketing strategies to grow your business online. Covers SEO, social media marketing, email campaigns, and analytics.',
    type: 'free',
    mode: 'online',
    price: 'Free',
    duration: '6 weeks',
    startDate: 'August 15, 2025',
    instructor: 'Dr. Sarah Johnson',
    category: 'marketing',
    seats: null // Online courses don't have seat limits
  },
  {
    id: 'digital-marketing-offline',
    title: 'Digital Marketing for Entrepreneurs',
    description: 'Learn essential digital marketing strategies to grow your business online. Hands-on workshops with real projects and mentorship.',
    type: 'free',
    mode: 'offline',
    price: 'Free',
    duration: '6 weeks',
    startDate: 'August 20, 2025',
    instructor: 'Dr. Sarah Johnson',
    category: 'marketing',
    locations: {
      mumbai: { available: 12, total: 25 },
      delhi: { available: 8, total: 30 },
      bangalore: { available: 15, total: 20 },
      pune: { available: 3, total: 15 },
      hyderabad: { available: 0, total: 18 },
      chennai: { available: 7, total: 22 }
    }
  },
  {
    id: 'advanced-finance',
    title: 'Advanced Financial Management',
    description: 'Deep dive into financial planning, investment strategies, and risk management for scaling businesses.',
    type: 'paid',
    mode: 'online',
    price: '₹8,999',
    duration: '8 weeks',
    startDate: 'September 1, 2025',
    instructor: 'Prof. Amit Kumar',
    category: 'finance',
    seats: null
  },
  {
    id: 'advanced-finance-offline',
    title: 'Advanced Financial Management',
    description: 'Deep dive into financial planning with hands-on case studies and direct mentor interaction.',
    type: 'paid',
    mode: 'offline',
    price: '₹12,999',
    duration: '8 weeks',
    startDate: 'September 5, 2025',
    instructor: 'Prof. Amit Kumar',
    category: 'finance',
    locations: {
      mumbai: { available: 5, total: 15 },
      delhi: { available: 2, total: 12 },
      bangalore: { available: 8, total: 15 },
      pune: { available: 0, total: 10 },
      hyderabad: { available: 4, total: 12 },
      chennai: { available: 1, total: 8 }
    }
  },
  {
    id: 'leadership-skills',
    title: 'Leadership & Team Management',
    description: 'Develop essential leadership skills to effectively manage teams and drive organizational growth.',
    type: 'free',
    mode: 'online',
    price: 'Free',
    duration: '4 weeks',
    startDate: 'August 20, 2025',
    instructor: 'Ms. Priya Patel',
    category: 'leadership',
    seats: null
  },
  {
    id: 'leadership-skills-offline',
    title: 'Leadership & Team Management',
    description: 'Interactive leadership workshops with team-building exercises and role-playing scenarios.',
    type: 'free',
    mode: 'offline',
    price: 'Free',
    duration: '4 weeks',
    startDate: 'August 25, 2025',
    instructor: 'Ms. Priya Patel',
    category: 'leadership',
    locations: {
      mumbai: { available: 18, total: 35 },
      delhi: { available: 22, total: 40 },
      bangalore: { available: 12, total: 25 },
      pune: { available: 6, total: 20 },
      hyderabad: { available: 9, total: 30 },
      chennai: { available: 14, total: 28 }
    }
  },
  {
    id: 'tech-innovation',
    title: 'Technology Innovation & Disruption',
    description: 'Understand how emerging technologies can transform industries and create new business opportunities.',
    type: 'paid',
    mode: 'online',
    price: '₹12,499',
    duration: '10 weeks',
    startDate: 'September 15, 2025',
    instructor: 'Dr. Raj Mehta',
    category: 'technology',
    seats: null
  },
  {
    id: 'ai-business-offline',
    title: 'AI for Business Applications',
    description: 'Hands-on AI workshops with practical projects and real business case implementations.',
    type: 'paid',
    mode: 'offline',
    price: '₹22,999',
    duration: '8 weeks',
    startDate: 'September 10, 2025',
    instructor: 'Dr. Neha Sharma',
    category: 'technology',
    locations: {
      mumbai: { available: 2, total: 12 },
      delhi: { available: 0, total: 15 },
      bangalore: { available: 7, total: 18 },
      pune: { available: 1, total: 8 },
      hyderabad: { available: 3, total: 10 },
      chennai: { available: 0, total: 12 }
    }
  },
  {
    id: 'sustainable-business',
    title: 'Sustainable Business Practices',
    description: 'Learn how to build environmentally responsible businesses that create positive social impact.',
    type: 'free',
    price: 'Free',
    duration: '5 weeks',
    startDate: 'August 25, 2025',
    instructor: 'Dr. Maya Singh',
    category: 'sustainability'
  },
  {
    id: 'international-expansion',
    title: 'International Business Expansion',
    description: 'Strategies for taking your business global, including market research, legal considerations, and cultural adaptation.',
    type: 'paid',
    price: '₹15,999',
    duration: '12 weeks',
    startDate: 'October 1, 2025',
    instructor: 'Mr. David Chen',
    category: 'expansion'
  },
  {
    id: 'ai-business',
    title: 'AI for Business Applications',
    description: 'Practical applications of artificial intelligence in business operations, customer service, and decision making.',
    type: 'paid',
    price: '₹18,999',
    duration: '8 weeks',
    startDate: 'September 10, 2025',
    instructor: 'Dr. Neha Sharma',
    category: 'technology'
  },
  {
    id: 'networking-skills',
    title: 'Professional Networking & Relationship Building',
    description: 'Master the art of building meaningful professional relationships and expanding your business network.',
    type: 'free',
    price: 'Free',
    duration: '3 weeks',
    startDate: 'August 30, 2025',
    instructor: 'Ms. Kavya Reddy',
    category: 'networking'
  }
];

// Location data
const locations = {
  mumbai: { name: 'Mumbai Center', address: 'Andheri East, Mumbai', distance: '2.5 km' },
  delhi: { name: 'Delhi Center', address: 'Connaught Place, New Delhi', distance: '15.2 km' },
  bangalore: { name: 'Bangalore Center', address: 'Koramangala, Bangalore', distance: '8.7 km' },
  pune: { name: 'Pune Center', address: 'Hinjewadi, Pune', distance: '12.1 km' },
  hyderabad: { name: 'Hyderabad Center', address: 'HITEC City, Hyderabad', distance: '18.9 km' },
  chennai: { name: 'Chennai Center', address: 'OMR, Chennai', distance: '22.3 km' }
};

// Current selections
let currentMode = 'online';
let selectedLocation = 'mumbai';

// Get registered courses from localStorage
function getRegisteredCourses() {
  const registered = localStorage.getItem('registeredCourses');
  return registered ? JSON.parse(registered) : [];
}

// Save registered courses to localStorage
function saveRegisteredCourses(courses) {
  localStorage.setItem('registeredCourses', JSON.stringify(courses));
}

// Register for a course
function registerForCourse(courseId) {
  const registeredCourses = getRegisteredCourses();
  const course = availableCourses.find(c => c.id === courseId);
  
  if (course && !registeredCourses.find(c => c.id === courseId)) {
    registeredCourses.push(course);
    saveRegisteredCourses(registeredCourses);
    
    // Update button state
    const button = document.querySelector(`[data-course-id="${courseId}"]`);
    if (button) {
      button.textContent = '✓ Registered';
      button.classList.add('registered');
      button.disabled = true;
    }
    
    // Show success message
    showNotification(`Successfully registered for ${course.title}!`);
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    z-index: 1000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
    style.remove();
  }, 3000);
}

// Filter courses with mode awareness
function filterCourses(filter) {
  let filteredCourses = availableCourses.filter(course => course.mode === currentMode);
  
  if (filter === 'free') {
    filteredCourses = filteredCourses.filter(course => course.type === 'free');
  } else if (filter === 'paid') {
    filteredCourses = filteredCourses.filter(course => course.type === 'paid');
  } else if (filter === 'upcoming') {
    // Show courses starting within the next 30 days
    const today = new Date();
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    filteredCourses = filteredCourses.filter(course => {
      const courseDate = new Date(course.startDate);
      return courseDate >= today && courseDate <= nextMonth;
    });
  }
  
  // Apply location filter for offline courses
  if (currentMode === 'offline') {
    filteredCourses = filteredCourses.filter(course => {
      return course.locations && course.locations[selectedLocation];
    });
  }
  
  renderCoursesWithSeats(filteredCourses);
}

// Render courses (compatibility wrapper)
function renderCourses(courses = availableCourses) {
  renderCoursesWithSeats(courses);
}

// Render courses
function renderCourses(courses = availableCourses) {
  const grid = document.getElementById('courses-grid');
  const registeredCourses = getRegisteredCourses();
  
  grid.innerHTML = courses.map(course => {
    const isRegistered = registeredCourses.find(c => c.id === course.id);
    
    return `
      <div class="course-card">
        <div class="course-card-header">
          <span class="course-type ${course.type}">${course.type === 'free' ? 'Free Course' : 'Premium Course'}</span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-details">
          <span>📅 ${course.startDate}</span>
          <span>⏱️ ${course.duration}</span>
          <span>👨‍🏫 ${course.instructor}</span>
        </div>
        <div class="course-price ${course.type}">${course.price}</div>
        <button 
          class="register-btn ${isRegistered ? 'registered' : ''}" 
          data-course-id="${course.id}"
          ${isRegistered ? 'disabled' : ''}
          onclick="registerForCourse('${course.id}')"
        >
          ${isRegistered ? '✓ Registered' : 'Register Now'}
        </button>
      </div>
    `;
  }).join('');
}

// Initialize progress animation
function animateProgress() {
  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');
  
  // Animate progress bar
  setTimeout(() => {
    progressFill.style.width = '85%';
  }, 500);
  
  // Animate percentage counter
  let currentPercent = 0;
  const targetPercent = 85;
  const increment = targetPercent / 50; // 50 steps
  
  const counter = setInterval(() => {
    currentPercent += increment;
    if (currentPercent >= targetPercent) {
      currentPercent = targetPercent;
      clearInterval(counter);
    }
    progressPercent.textContent = Math.round(currentPercent) + '%';
  }, 30);
}

// Handle filter button clicks
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter courses
      const filter = button.getAttribute('data-filter');
      filterCourses(filter);
    });
  });
}

// Handle continue learning button
function setupContinueButton() {
  const continueBtn = document.querySelector('.continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      showNotification('Redirecting to Week 4: Marketing & Launch Preparation...');
      // In a real application, this would navigate to the learning module
    });
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  animateProgress();
  initializeCourseMode(); // Initialize course mode first
  setupFilters();
  setupContinueButton();
});

// Mock Interview System
let currentInterviewType = '';
let currentQuestionIndex = 0;
let interviewQuestions = [];
let userResponses = [];
let interviewTimer = null;
let timeRemaining = 300; // 5 minutes

// Interview question banks
const questionBanks = {
  pitch: [
    "Please give me a 2-minute elevator pitch for your business.",
    "What problem does your business solve and why is it important?",
    "Who is your target market and how large is it?",
    "What makes your solution unique compared to competitors?",
    "What is your business model and how do you plan to make money?",
    "What are your revenue projections for the next 3 years?",
    "What are the main risks facing your business and how will you mitigate them?",
    "How much funding do you need and what will you use it for?"
  ],
  investor: [
    "Walk me through your financial projections and key assumptions.",
    "How do you plan to acquire customers and what's your customer acquisition cost?",
    "What's your go-to-market strategy?",
    "Tell me about your team and why you're the right people to execute this vision.",
    "What are the biggest challenges you've faced so far and how did you overcome them?",
    "How do you see this market evolving over the next 5 years?",
    "What would you do if a well-funded competitor entered your market tomorrow?",
    "What metrics do you track to measure success and what are your current numbers?"
  ]
};

// Start mock interview
function startMockInterview(type) {
  currentInterviewType = type;
  document.getElementById('interview-modal').style.display = 'block';
  document.getElementById('interview-title').textContent = 
    type === 'pitch' ? 'Business Pitch Practice' : 'Investor Interview Simulation';
  showInterviewScreen('interview-setup');
}

// Close interview modal
function closeInterviewModal() {
  document.getElementById('interview-modal').style.display = 'none';
  resetInterview();
}

// Show specific interview screen
function showInterviewScreen(screenId) {
  const screens = document.querySelectorAll('.interview-screen');
  screens.forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Start the actual interview
function startInterview() {
  const businessName = document.getElementById('business-name').value;
  const industry = document.getElementById('business-industry').value;
  const stage = document.getElementById('business-stage').value;
  const description = document.getElementById('business-description').value;

  if (!businessName || !industry || !stage) {
    alert('Please fill in all required fields.');
    return;
  }

  // Store business info for personalized questions
  const businessInfo = { businessName, industry, stage, description };
  
  // Get questions for the interview type
  interviewQuestions = [...questionBanks[currentInterviewType]];
  
  // Personalize first question
  if (currentInterviewType === 'pitch') {
    interviewQuestions[0] = `Please give me a 2-minute elevator pitch for ${businessName}.`;
  }

  currentQuestionIndex = 0;
  userResponses = [];
  timeRemaining = 300; // Reset timer
  
  showInterviewScreen('interview-screen');
  startInterviewTimer();
  displayCurrentQuestion();
}

// Display current question
function displayCurrentQuestion() {
  const questionElement = document.getElementById('ai-question');
  const currentQ = document.getElementById('current-question');
  const totalQ = document.getElementById('total-questions');
  
  if (currentQuestionIndex < interviewQuestions.length) {
    questionElement.textContent = interviewQuestions[currentQuestionIndex];
    currentQ.textContent = currentQuestionIndex + 1;
    totalQ.textContent = interviewQuestions.length;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / interviewQuestions.length) * 100;
    document.getElementById('interview-progress').style.width = progress + '%';
    
    // Clear previous response
    document.getElementById('user-response').value = '';
  } else {
    // Interview complete
    endInterview();
  }
}

// Start interview timer
function startInterviewTimer() {
  interviewTimer = setInterval(() => {
    timeRemaining--;
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('time-remaining').textContent = timeDisplay;
    
    if (timeRemaining <= 0) {
      clearInterval(interviewTimer);
      endInterview();
    }
  }, 1000);
}

// Submit response
function submitResponse() {
  const response = document.getElementById('user-response').value.trim();
  
  if (!response) {
    alert('Please provide a response before submitting.');
    return;
  }
  
  // Store response
  userResponses.push({
    question: interviewQuestions[currentQuestionIndex],
    response: response,
    timestamp: new Date()
  });
  
  // Move to next question
  currentQuestionIndex++;
  
  // Simulate AI thinking time
  document.getElementById('ai-question').textContent = 'Analyzing your response...';
  
  setTimeout(() => {
    displayCurrentQuestion();
  }, 2000);
}

// Toggle voice recording (simulated)
function toggleVoiceRecording() {
  const voiceBtn = document.getElementById('voice-btn');
  const indicator = document.getElementById('recording-indicator');
  
  if (voiceBtn.classList.contains('recording')) {
    // Stop recording
    voiceBtn.classList.remove('recording');
    voiceBtn.textContent = '🎤 Start Voice';
    indicator.textContent = '⏸️ Stopped';
    indicator.style.background = 'rgba(149, 165, 166, 0.1)';
    indicator.style.color = '#95a5a6';
    
    // Simulate transcription
    setTimeout(() => {
      const responses = [
        "Thank you for using voice recording. This is a simulated transcription of your speech.",
        "Our AI has converted your voice input to text. In a real implementation, this would use speech-to-text technology.",
        "Voice recording complete. Your spoken response has been transcribed for analysis."
      ];
      document.getElementById('user-response').value = responses[Math.floor(Math.random() * responses.length)];
    }, 1500);
    
  } else {
    // Start recording
    voiceBtn.classList.add('recording');
    voiceBtn.textContent = '🔴 Stop Voice';
    indicator.textContent = '🔴 Recording';
    indicator.style.background = 'rgba(231, 76, 60, 0.1)';
    indicator.style.color = '#e74c3c';
  }
}

// End interview and show results
function endInterview() {
  clearInterval(interviewTimer);
  
  // Generate mock scores based on response quality
  const scores = generateMockScores();
  
  // Update results display
  document.getElementById('overall-score').textContent = scores.overall;
  
  showInterviewScreen('results-screen');
}

// Generate mock scores for demonstration
function generateMockScores() {
  const baseScore = 75 + Math.random() * 20; // 75-95 range
  return {
    overall: Math.round(baseScore),
    communication: Math.round(baseScore + (Math.random() - 0.5) * 20),
    business: Math.round(baseScore + (Math.random() - 0.5) * 15),
    financial: Math.round(baseScore + (Math.random() - 0.5) * 20),
    pitch: Math.round(baseScore + (Math.random() - 0.5) * 15)
  };
}

// Retry interview
function retryInterview() {
  resetInterview();
  showInterviewScreen('interview-setup');
}

// Save results
function saveResults() {
  const results = {
    type: currentInterviewType,
    date: new Date().toISOString(),
    responses: userResponses,
    scores: generateMockScores()
  };
  
  // Save to localStorage
  const savedResults = JSON.parse(localStorage.getItem('interviewResults') || '[]');
  savedResults.push(results);
  localStorage.setItem('interviewResults', JSON.stringify(savedResults));
  
  showNotification('Interview results saved successfully!');
}

// Reset interview
function resetInterview() {
  currentQuestionIndex = 0;
  interviewQuestions = [];
  userResponses = [];
  clearInterval(interviewTimer);
  timeRemaining = 300;
  
  // Reset UI
  document.getElementById('business-info-form').reset();
  document.getElementById('user-response').value = '';
  const voiceBtn = document.getElementById('voice-btn');
  voiceBtn.classList.remove('recording');
  voiceBtn.textContent = '🎤 Start Voice';
}

// View performance review
function viewPerformanceReview() {
  const savedResults = JSON.parse(localStorage.getItem('interviewResults') || '[]');
  
  if (savedResults.length === 0) {
    showNotification('No previous interview results found. Complete an interview first!');
    return;
  }
  
  // In a real application, this would show a detailed performance dashboard
  let summary = `Performance Summary:\n\n`;
  summary += `Total Interviews: ${savedResults.length}\n`;
  
  const avgScore = savedResults.reduce((sum, result) => sum + result.scores.overall, 0) / savedResults.length;
  summary += `Average Score: ${Math.round(avgScore)}/100\n`;
  summary += `Last Interview: ${new Date(savedResults[savedResults.length - 1].date).toLocaleDateString()}\n\n`;
  summary += `Tip: Continue practicing to improve your scores!`;
  
  alert(summary);
}

// Filter courses by mode and location
function filterCoursesByMode() {
  let filteredCourses = availableCourses.filter(course => course.mode === currentMode);
  
  // If offline mode and a location is selected, filter by location availability
  if (currentMode === 'offline') {
    filteredCourses = filteredCourses.filter(course => {
      return course.locations && course.locations[selectedLocation];
    });
  }
  
  renderCoursesWithSeats(filteredCourses);
}

// Render courses with seat availability information
function renderCoursesWithSeats(courses = availableCourses) {
  const grid = document.getElementById('courses-grid');
  const registeredCourses = getRegisteredCourses();
  
  grid.innerHTML = courses.map(course => {
    const isRegistered = registeredCourses.find(c => c.id === course.id);
    
    // Get seat information for offline courses
    let seatInfo = '';
    let seatStatus = '';
    let canRegister = true;
    
    if (course.mode === 'offline' && course.locations && course.locations[selectedLocation]) {
      const locationSeats = course.locations[selectedLocation];
      const available = locationSeats.available;
      const total = locationSeats.total;
      const percentage = (available / total) * 100;
      
      if (available === 0) {
        seatStatus = 'full';
        canRegister = false;
      } else if (percentage <= 25) {
        seatStatus = 'limited';
      } else {
        seatStatus = 'available';
      }
      
      seatInfo = `
        <div class="seat-availability">
          <div class="seat-info">
            <span>🪑 ${available}/${total} seats available</span>
            <span class="seat-status ${seatStatus}">
              ${seatStatus === 'full' ? 'Full' : seatStatus === 'limited' ? 'Limited' : 'Available'}
            </span>
          </div>
        </div>
        <div class="location-info">
          <strong>Location:</strong> ${locations[selectedLocation].name}
        </div>
      `;
    }
    
    return `
      <div class="course-card">
        <div class="course-card-header">
          <span class="course-type ${course.type}">${course.type === 'free' ? 'Free Course' : 'Premium Course'}</span>
          <span class="course-mode-badge ${course.mode}">
            ${course.mode === 'online' ? '💻 Online' : '🏢 Offline'}
          </span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-details">
          <span>📅 ${course.startDate}</span>
          <span>⏱️ ${course.duration}</span>
          <span>👨‍🏫 ${course.instructor}</span>
        </div>
        ${seatInfo}
        <div class="course-price ${course.type}">${course.price}</div>
        <button 
          class="register-btn ${isRegistered ? 'registered' : ''} ${!canRegister && !isRegistered ? 'disabled' : ''}" 
          data-course-id="${course.id}"
          ${isRegistered || !canRegister ? 'disabled' : ''}
          onclick="registerForCourse('${course.id}')"
        >
          ${isRegistered ? '✓ Registered' : !canRegister ? 'Seats Full' : 'Register Now'}
        </button>
      </div>
    `;
  }).join('');
}

// Initialize course mode selector
function initializeCourseMode() {
  // Set default mode to online
  selectCourseMode('online');
  
  // Set default location
  if (currentMode === 'offline') {
    selectLocation('mumbai');
  }
}

// Location mode selection functionality
function selectCourseMode(mode) {
  currentMode = mode;
  
  // Update button states
  const modeButtons = document.querySelectorAll('.mode-btn');
  modeButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    }
  });
  
  // Show/hide location selector
  const locationSelector = document.getElementById('location-selector');
  if (mode === 'offline') {
    locationSelector.style.display = 'block';
    // Show selected location info if a location was already selected
    const selectedLocationInfo = document.getElementById('selected-location-info');
    selectedLocationInfo.style.display = 'block';
    updateSelectedLocationDisplay();
  } else {
    locationSelector.style.display = 'none';
  }
  
  // Filter and render courses based on mode
  filterCoursesByMode();
}

// Select location for offline courses
function selectLocation(locationKey) {
  selectedLocation = locationKey;
  
  // Update location card states
  const locationCards = document.querySelectorAll('.location-card');
  locationCards.forEach(card => {
    card.classList.remove('selected');
    if (card.getAttribute('data-location') === locationKey) {
      card.classList.add('selected');
    }
  });
  
  // Update selected location display
  updateSelectedLocationDisplay();
  
  // Re-render courses with seat availability for selected location
  filterCoursesByMode();
}

// Update selected location display
function updateSelectedLocationDisplay() {
  const locationInfo = locations[selectedLocation];
  if (locationInfo) {
    document.getElementById('selected-location-name').textContent = locationInfo.name;
    document.getElementById('selected-location-details').textContent = 
      `${locationInfo.address} • ${locationInfo.distance} away`;
  }
}

// Language Selector Functions
function toggleLanguageMenu() {
  const menu = document.getElementById('language-menu');
  menu.classList.toggle('show');
}

function changeLanguage(langCode) {
  // Hide the menu after selection
  const menu = document.getElementById('language-menu');
  menu.classList.remove('show');
  
  // Load Google Translate script if not already loaded
  if (!window.google || !window.google.translate) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate';
    script.async = true;
    document.head.appendChild(script);
    
    window.initGoogleTranslate = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
      
      // Trigger translation after initialization
      setTimeout(() => triggerTranslation(langCode), 500);
    };
  } else {
    triggerTranslation(langCode);
  }
}

function triggerTranslation(langCode) {
  if (langCode === 'en') {
    // Reset to original language
    const translateFrame = document.querySelector('iframe.goog-te-menu-frame');
    if (translateFrame) {
      const translateDoc = translateFrame.contentDocument;
      const originalButton = translateDoc.querySelector('.goog-te-menu2-item span:contains("Original")');
      if (originalButton) originalButton.click();
    }
    return;
  }
  
  // Trigger translation to selected language
  const translateSelect = document.querySelector('.goog-te-combo');
  if (translateSelect) {
    translateSelect.value = langCode;
    translateSelect.dispatchEvent(new Event('change'));
  }
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
  const languageSelector = document.querySelector('.language-selector');
  const menu = document.getElementById('language-menu');
  
  if (languageSelector && menu && !languageSelector.contains(event.target)) {
    menu.classList.remove('show');
  }
});

// Available courses data with online/offline options
const availableCourses = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing for Entrepreneurs',
    description: 'Learn essential digital marketing strategies to grow your business online. Covers SEO, social media marketing, email campaigns, and analytics.',
    type: 'free',
    mode: 'online',
    price: 'Free',
    duration: '6 weeks',
    startDate: 'August 15, 2025',
    instructor: 'Dr. Sarah Johnson',
    category: 'marketing',
    seats: null // Online courses don't have seat limits
  },
  {
    id: 'digital-marketing-offline',
    title: 'Digital Marketing for Entrepreneurs',
    description: 'Learn essential digital marketing strategies to grow your business online. Hands-on workshops with real projects and mentorship.',
    type: 'free',
    mode: 'offline',
    price: 'Free',
    duration: '6 weeks',
    startDate: 'August 20, 2025',
    instructor: 'Dr. Sarah Johnson',
    category: 'marketing',
    locations: {
      mumbai: { available: 12, total: 25 },
      delhi: { available: 8, total: 30 },
      bangalore: { available: 15, total: 20 },
      pune: { available: 3, total: 15 },
      hyderabad: { available: 0, total: 18 },
      chennai: { available: 7, total: 22 }
    }
  },
  {
    id: 'advanced-finance',
    title: 'Advanced Financial Management',
    description: 'Deep dive into financial planning, investment strategies, and risk management for scaling businesses.',
    type: 'paid',
    mode: 'online',
    price: '₹8,999',
    duration: '8 weeks',
    startDate: 'September 1, 2025',
    instructor: 'Prof. Amit Kumar',
    category: 'finance',
    seats: null
  },
  {
    id: 'advanced-finance-offline',
    title: 'Advanced Financial Management',
    description: 'Deep dive into financial planning with hands-on case studies and direct mentor interaction.',
    type: 'paid',
    mode: 'offline',
    price: '₹12,999',
    duration: '8 weeks',
    startDate: 'September 5, 2025',
    instructor: 'Prof. Amit Kumar',
    category: 'finance',
    locations: {
      mumbai: { available: 5, total: 15 },
      delhi: { available: 2, total: 12 },
      bangalore: { available: 8, total: 15 },
      pune: { available: 0, total: 10 },
      hyderabad: { available: 4, total: 12 },
      chennai: { available: 1, total: 8 }
    }
  },
  {
    id: 'leadership-skills',
    title: 'Leadership & Team Management',
    description: 'Develop essential leadership skills to effectively manage teams and drive organizational growth.',
    type: 'free',
    mode: 'online',
    price: 'Free',
    duration: '4 weeks',
    startDate: 'August 20, 2025',
    instructor: 'Ms. Priya Patel',
    category: 'leadership',
    seats: null
  },
  {
    id: 'leadership-skills-offline',
    title: 'Leadership & Team Management',
    description: 'Interactive leadership workshops with team-building exercises and role-playing scenarios.',
    type: 'free',
    mode: 'offline',
    price: 'Free',
    duration: '4 weeks',
    startDate: 'August 25, 2025',
    instructor: 'Ms. Priya Patel',
    category: 'leadership',
    locations: {
      mumbai: { available: 18, total: 35 },
      delhi: { available: 22, total: 40 },
      bangalore: { available: 12, total: 25 },
      pune: { available: 6, total: 20 },
      hyderabad: { available: 9, total: 30 },
      chennai: { available: 14, total: 28 }
    }
  },
  {
    id: 'tech-innovation',
    title: 'Technology Innovation & Disruption',
    description: 'Understand how emerging technologies can transform industries and create new business opportunities.',
    type: 'paid',
    mode: 'online',
    price: '₹12,499',
    duration: '10 weeks',
    startDate: 'September 15, 2025',
    instructor: 'Dr. Raj Mehta',
    category: 'technology',
    seats: null
  },
  {
    id: 'ai-business-offline',
    title: 'AI for Business Applications',
    description: 'Hands-on AI workshops with practical projects and real business case implementations.',
    type: 'paid',
    mode: 'offline',
    price: '₹22,999',
    duration: '8 weeks',
    startDate: 'September 10, 2025',
    instructor: 'Dr. Neha Sharma',
    category: 'technology',
    locations: {
      mumbai: { available: 2, total: 12 },
      delhi: { available: 0, total: 15 },
      bangalore: { available: 7, total: 18 },
      pune: { available: 1, total: 8 },
      hyderabad: { available: 3, total: 10 },
      chennai: { available: 0, total: 12 }
    }
  },
  {
    id: 'sustainable-business',
    title: 'Sustainable Business Practices',
    description: 'Learn how to build environmentally responsible businesses that create positive social impact.',
    type: 'free',
    price: 'Free',
    duration: '5 weeks',
    startDate: 'August 25, 2025',
    instructor: 'Dr. Maya Singh',
    category: 'sustainability'
  },
  {
    id: 'international-expansion',
    title: 'International Business Expansion',
    description: 'Strategies for taking your business global, including market research, legal considerations, and cultural adaptation.',
    type: 'paid',
    price: '₹15,999',
    duration: '12 weeks',
    startDate: 'October 1, 2025',
    instructor: 'Mr. David Chen',
    category: 'expansion'
  },
  {
    id: 'ai-business',
    title: 'AI for Business Applications',
    description: 'Practical applications of artificial intelligence in business operations, customer service, and decision making.',
    type: 'paid',
    price: '₹18,999',
    duration: '8 weeks',
    startDate: 'September 10, 2025',
    instructor: 'Dr. Neha Sharma',
    category: 'technology'
  },
  {
    id: 'networking-skills',
    title: 'Professional Networking & Relationship Building',
    description: 'Master the art of building meaningful professional relationships and expanding your business network.',
    type: 'free',
    price: 'Free',
    duration: '3 weeks',
    startDate: 'August 30, 2025',
    instructor: 'Ms. Kavya Reddy',
    category: 'networking'
  }
];

// Location data
const locations = {
  mumbai: { name: 'Mumbai Center', address: 'Andheri East, Mumbai', distance: '2.5 km' },
  delhi: { name: 'Delhi Center', address: 'Connaught Place, New Delhi', distance: '15.2 km' },
  bangalore: { name: 'Bangalore Center', address: 'Koramangala, Bangalore', distance: '8.7 km' },
  pune: { name: 'Pune Center', address: 'Hinjewadi, Pune', distance: '12.1 km' },
  hyderabad: { name: 'Hyderabad Center', address: 'HITEC City, Hyderabad', distance: '18.9 km' },
  chennai: { name: 'Chennai Center', address: 'OMR, Chennai', distance: '22.3 km' }
};

// Current selections
let currentMode = 'online';
let selectedLocation = 'mumbai';

// Get registered courses from localStorage
function getRegisteredCourses() {
  const registered = localStorage.getItem('registeredCourses');
  return registered ? JSON.parse(registered) : [];
}

// Save registered courses to localStorage
function saveRegisteredCourses(courses) {
  localStorage.setItem('registeredCourses', JSON.stringify(courses));
}

// Register for a course
function registerForCourse(courseId) {
  const registeredCourses = getRegisteredCourses();
  const course = availableCourses.find(c => c.id === courseId);
  
  if (course && !registeredCourses.find(c => c.id === courseId)) {
    registeredCourses.push(course);
    saveRegisteredCourses(registeredCourses);
    
    // Update button state
    const button = document.querySelector(`[data-course-id="${courseId}"]`);
    if (button) {
      button.textContent = '✓ Registered';
      button.classList.add('registered');
      button.disabled = true;
    }
    
    // Show success message
    showNotification(`Successfully registered for ${course.title}!`);
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    z-index: 1000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
    style.remove();
  }, 3000);
}

// Filter courses with mode awareness
function filterCourses(filter) {
  let filteredCourses = availableCourses.filter(course => course.mode === currentMode);
  
  if (filter === 'free') {
    filteredCourses = filteredCourses.filter(course => course.type === 'free');
  } else if (filter === 'paid') {
    filteredCourses = filteredCourses.filter(course => course.type === 'paid');
  } else if (filter === 'upcoming') {
    // Show courses starting within the next 30 days
    const today = new Date();
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    filteredCourses = filteredCourses.filter(course => {
      const courseDate = new Date(course.startDate);
      return courseDate >= today && courseDate <= nextMonth;
    });
  }
  
  // Apply location filter for offline courses
  if (currentMode === 'offline') {
    filteredCourses = filteredCourses.filter(course => {
      return course.locations && course.locations[selectedLocation];
    });
  }
  
  renderCoursesWithSeats(filteredCourses);
}

// Render courses (compatibility wrapper)
function renderCourses(courses = availableCourses) {
  renderCoursesWithSeats(courses);
}

// Render courses
function renderCourses(courses = availableCourses) {
  const grid = document.getElementById('courses-grid');
  const registeredCourses = getRegisteredCourses();
  
  grid.innerHTML = courses.map(course => {
    const isRegistered = registeredCourses.find(c => c.id === course.id);
    
    return `
      <div class="course-card">
        <div class="course-card-header">
          <span class="course-type ${course.type}">${course.type === 'free' ? 'Free Course' : 'Premium Course'}</span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-details">
          <span>📅 ${course.startDate}</span>
          <span>⏱️ ${course.duration}</span>
          <span>👨‍🏫 ${course.instructor}</span>
        </div>
        <div class="course-price ${course.type}">${course.price}</div>
        <button 
          class="register-btn ${isRegistered ? 'registered' : ''}" 
          data-course-id="${course.id}"
          ${isRegistered ? 'disabled' : ''}
          onclick="registerForCourse('${course.id}')"
        >
          ${isRegistered ? '✓ Registered' : 'Register Now'}
        </button>
      </div>
    `;
  }).join('');
}

// Initialize progress animation
function animateProgress() {
  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');
  
  // Animate progress bar
  setTimeout(() => {
    progressFill.style.width = '85%';
  }, 500);
  
  // Animate percentage counter
  let currentPercent = 0;
  const targetPercent = 85;
  const increment = targetPercent / 50; // 50 steps
  
  const counter = setInterval(() => {
    currentPercent += increment;
    if (currentPercent >= targetPercent) {
      currentPercent = targetPercent;
      clearInterval(counter);
    }
    progressPercent.textContent = Math.round(currentPercent) + '%';
  }, 30);
}

// Handle filter button clicks
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter courses
      const filter = button.getAttribute('data-filter');
      filterCourses(filter);
    });
  });
}

// Handle continue learning button
function setupContinueButton() {
  const continueBtn = document.querySelector('.continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      showNotification('Redirecting to Week 4: Marketing & Launch Preparation...');
      // In a real application, this would navigate to the learning module
    });
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  animateProgress();
  initializeCourseMode(); // Initialize course mode first
  setupFilters();
  setupContinueButton();
});

// Mock Interview System
let currentInterviewType = '';
let currentQuestionIndex = 0;
let interviewQuestions = [];
let userResponses = [];
let interviewTimer = null;
let timeRemaining = 300; // 5 minutes

// Interview question banks
const questionBanks = {
  pitch: [
    "Please give me a 2-minute elevator pitch for your business.",
    "What problem does your business solve and why is it important?",
    "Who is your target market and how large is it?",
    "What makes your solution unique compared to competitors?",
    "What is your business model and how do you plan to make money?",
    "What are your revenue projections for the next 3 years?",
    "What are the main risks facing your business and how will you mitigate them?",
    "How much funding do you need and what will you use it for?"
  ],
  investor: [
    "Walk me through your financial projections and key assumptions.",
    "How do you plan to acquire customers and what's your customer acquisition cost?",
    "What's your go-to-market strategy?",
    "Tell me about your team and why you're the right people to execute this vision.",
    "What are the biggest challenges you've faced so far and how did you overcome them?",
    "How do you see this market evolving over the next 5 years?",
    "What would you do if a well-funded competitor entered your market tomorrow?",
    "What metrics do you track to measure success and what are your current numbers?"
  ]
};

// Start mock interview
function startMockInterview(type) {
  currentInterviewType = type;
  document.getElementById('interview-modal').style.display = 'block';
  document.getElementById('interview-title').textContent = 
    type === 'pitch' ? 'Business Pitch Practice' : 'Investor Interview Simulation';
  showInterviewScreen('interview-setup');
}

// Close interview modal
function closeInterviewModal() {
  document.getElementById('interview-modal').style.display = 'none';
  resetInterview();
}

// Show specific interview screen
function showInterviewScreen(screenId) {
  const screens = document.querySelectorAll('.interview-screen');
  screens.forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Start the actual interview
function startInterview() {
  const businessName = document.getElementById('business-name').value;
  const industry = document.getElementById('business-industry').value;
  const stage = document.getElementById('business-stage').value;
  const description = document.getElementById('business-description').value;

  if (!businessName || !industry || !stage) {
    alert('Please fill in all required fields.');
    return;
  }

  // Store business info for personalized questions
  const businessInfo = { businessName, industry, stage, description };
  
  // Get questions for the interview type
  interviewQuestions = [...questionBanks[currentInterviewType]];
  
  // Personalize first question
  if (currentInterviewType === 'pitch') {
    interviewQuestions[0] = `Please give me a 2-minute elevator pitch for ${businessName}.`;
  }

  currentQuestionIndex = 0;
  userResponses = [];
  timeRemaining = 300; // Reset timer
  
  showInterviewScreen('interview-screen');
  startInterviewTimer();
  displayCurrentQuestion();
}

// Display current question
function displayCurrentQuestion() {
  const questionElement = document.getElementById('ai-question');
  const currentQ = document.getElementById('current-question');
  const totalQ = document.getElementById('total-questions');
  
  if (currentQuestionIndex < interviewQuestions.length) {
    questionElement.textContent = interviewQuestions[currentQuestionIndex];
    currentQ.textContent = currentQuestionIndex + 1;
    totalQ.textContent = interviewQuestions.length;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / interviewQuestions.length) * 100;
    document.getElementById('interview-progress').style.width = progress + '%';
    
    // Clear previous response
    document.getElementById('user-response').value = '';
  } else {
    // Interview complete
    endInterview();
  }
}

// Start interview timer
function startInterviewTimer() {
  interviewTimer = setInterval(() => {
    timeRemaining--;
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('time-remaining').textContent = timeDisplay;
    
    if (timeRemaining <= 0) {
      clearInterval(interviewTimer);
      endInterview();
    }
  }, 1000);
}

// Submit response
function submitResponse() {
  const response = document.getElementById('user-response').value.trim();
  
  if (!response) {
    alert('Please provide a response before submitting.');
    return;
  }
  
  // Store response
  userResponses.push({
    question: interviewQuestions[currentQuestionIndex],
    response: response,
    timestamp: new Date()
  });
  
  // Move to next question
  currentQuestionIndex++;
  
  // Simulate AI thinking time
  document.getElementById('ai-question').textContent = 'Analyzing your response...';
  
  setTimeout(() => {
    displayCurrentQuestion();
  }, 2000);
}

// Toggle voice recording (simulated)
function toggleVoiceRecording() {
  const voiceBtn = document.getElementById('voice-btn');
  const indicator = document.getElementById('recording-indicator');
  
  if (voiceBtn.classList.contains('recording')) {
    // Stop recording
    voiceBtn.classList.remove('recording');
    voiceBtn.textContent = '🎤 Start Voice';
    indicator.textContent = '⏸️ Stopped';
    indicator.style.background = 'rgba(149, 165, 166, 0.1)';
    indicator.style.color = '#95a5a6';
    
    // Simulate transcription
    setTimeout(() => {
      const responses = [
        "Thank you for using voice recording. This is a simulated transcription of your speech.",
        "Our AI has converted your voice input to text. In a real implementation, this would use speech-to-text technology.",
        "Voice recording complete. Your spoken response has been transcribed for analysis."
      ];
      document.getElementById('user-response').value = responses[Math.floor(Math.random() * responses.length)];
    }, 1500);
    
  } else {
    // Start recording
    voiceBtn.classList.add('recording');
    voiceBtn.textContent = '🔴 Stop Voice';
    indicator.textContent = '🔴 Recording';
    indicator.style.background = 'rgba(231, 76, 60, 0.1)';
    indicator.style.color = '#e74c3c';
  }
}

// End interview and show results
function endInterview() {
  clearInterval(interviewTimer);
  
  // Generate mock scores based on response quality
  const scores = generateMockScores();
  
  // Update results display
  document.getElementById('overall-score').textContent = scores.overall;
  
  showInterviewScreen('results-screen');
}

// Generate mock scores for demonstration
function generateMockScores() {
  const baseScore = 75 + Math.random() * 20; // 75-95 range
  return {
    overall: Math.round(baseScore),
    communication: Math.round(baseScore + (Math.random() - 0.5) * 20),
    business: Math.round(baseScore + (Math.random() - 0.5) * 15),
    financial: Math.round(baseScore + (Math.random() - 0.5) * 20),
    pitch: Math.round(baseScore + (Math.random() - 0.5) * 15)
  };
}

// Retry interview
function retryInterview() {
  resetInterview();
  showInterviewScreen('interview-setup');
}

// Save results
function saveResults() {
  const results = {
    type: currentInterviewType,
    date: new Date().toISOString(),
    responses: userResponses,
    scores: generateMockScores()
  };
  
  // Save to localStorage
  const savedResults = JSON.parse(localStorage.getItem('interviewResults') || '[]');
  savedResults.push(results);
  localStorage.setItem('interviewResults', JSON.stringify(savedResults));
  
  showNotification('Interview results saved successfully!');
}

// Reset interview
function resetInterview() {
  currentQuestionIndex = 0;
  interviewQuestions = [];
  userResponses = [];
  clearInterval(interviewTimer);
  timeRemaining = 300;
  
  // Reset UI
  document.getElementById('business-info-form').reset();
  document.getElementById('user-response').value = '';
  const voiceBtn = document.getElementById('voice-btn');
  voiceBtn.classList.remove('recording');
  voiceBtn.textContent = '🎤 Start Voice';
}

// View performance review
function viewPerformanceReview() {
  const savedResults = JSON.parse(localStorage.getItem('interviewResults') || '[]');
  
  if (savedResults.length === 0) {
    showNotification('No previous interview results found. Complete an interview first!');
    return;
  }
  
  // In a real application, this would show a detailed performance dashboard
  let summary = `Performance Summary:\n\n`;
  summary += `Total Interviews: ${savedResults.length}\n`;
  
  const avgScore = savedResults.reduce((sum, result) => sum + result.scores.overall, 0) / savedResults.length;
  summary += `Average Score: ${Math.round(avgScore)}/100\n`;
  summary += `Last Interview: ${new Date(savedResults[savedResults.length - 1].date).toLocaleDateString()}\n\n`;
  summary += `Tip: Continue practicing to improve your scores!`;
  
  alert(summary);
}

// Filter courses by mode and location
function filterCoursesByMode() {
  let filteredCourses = availableCourses.filter(course => course.mode === currentMode);
  
  // If offline mode and a location is selected, filter by location availability
  if (currentMode === 'offline') {
    filteredCourses = filteredCourses.filter(course => {
      return course.locations && course.locations[selectedLocation];
    });
  }
  
  renderCoursesWithSeats(filteredCourses);
}

// Render courses with seat availability information
function renderCoursesWithSeats(courses = availableCourses) {
  const grid = document.getElementById('courses-grid');
  const registeredCourses = getRegisteredCourses();
  
  grid.innerHTML = courses.map(course => {
    const isRegistered = registeredCourses.find(c => c.id === course.id);
    
    // Get seat information for offline courses
    let seatInfo = '';
    let seatStatus = '';
    let canRegister = true;
    
    if (course.mode === 'offline' && course.locations && course.locations[selectedLocation]) {
      const locationSeats = course.locations[selectedLocation];
      const available = locationSeats.available;
      const total = locationSeats.total;
      const percentage = (available / total) * 100;
      
      if (available === 0) {
        seatStatus = 'full';
        canRegister = false;
      } else if (percentage <= 25) {
        seatStatus = 'limited';
      } else {
        seatStatus = 'available';
      }
      
      seatInfo = `
        <div class="seat-availability">
          <div class="seat-info">
            <span>🪑 ${available}/${total} seats available</span>
            <span class="seat-status ${seatStatus}">
              ${seatStatus === 'full' ? 'Full' : seatStatus === 'limited' ? 'Limited' : 'Available'}
            </span>
          </div>
        </div>
        <div class="location-info">
          <strong>Location:</strong> ${locations[selectedLocation].name}
        </div>
      `;
    }
    
    return `
      <div class="course-card">
        <div class="course-card-header">
          <span class="course-type ${course.type}">${course.type === 'free' ? 'Free Course' : 'Premium Course'}</span>
          <span class="course-mode-badge ${course.mode}">
            ${course.mode === 'online' ? '💻 Online' : '🏢 Offline'}
          </span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-description">${course.description}</p>
        <div class="course-details">
          <span>📅 ${course.startDate}</span>
          <span>⏱️ ${course.duration}</span>
          <span>👨‍🏫 ${course.instructor}</span>
        </div>
        ${seatInfo}
        <div class="course-price ${course.type}">${course.price}</div>
        <button 
          class="register-btn ${isRegistered ? 'registered' : ''} ${!canRegister && !isRegistered ? 'disabled' : ''}" 
          data-course-id="${course.id}"
          ${isRegistered || !canRegister ? 'disabled' : ''}
          onclick="registerForCourse('${course.id}')"
        >
          ${isRegistered ? '✓ Registered' : !canRegister ? 'Seats Full' : 'Register Now'}
        </button>
      </div>
    `;
  }).join('');
}

// Initialize course mode selector
function initializeCourseMode() {
  // Set default mode to online
  selectCourseMode('online');
  
  // Set default location
  if (currentMode === 'offline') {
    selectLocation('mumbai');
  }
}

// Location mode selection functionality
function selectCourseMode(mode) {
  currentMode = mode;
  
  // Update button states
  const modeButtons = document.querySelectorAll('.mode-btn');
  modeButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-mode') === mode) {
      btn.classList.add('active');
    }
  });
  
  // Show/hide location selector
  const locationSelector = document.getElementById('location-selector');
  if (mode === 'offline') {
    locationSelector.style.display = 'block';
    // Show selected location info if a location was already selected
    const selectedLocationInfo = document.getElementById('selected-location-info');
    selectedLocationInfo.style.display = 'block';
    updateSelectedLocationDisplay();
  } else {
    locationSelector.style.display = 'none';
  }
  
  // Filter and render courses based on mode
  filterCoursesByMode();
}

// Select location for offline courses
function selectLocation(locationKey) {
  selectedLocation = locationKey;
  
  // Update location card states
  const locationCards = document.querySelectorAll('.location-card');
  locationCards.forEach(card => {
    card.classList.remove('selected');
    if (card.getAttribute('data-location') === locationKey) {
      card.classList.add('selected');
    }
  });
  
  // Update selected location display
  updateSelectedLocationDisplay();
  
  // Re-render courses with seat availability for selected location
  filterCoursesByMode();
}

// Update selected location display
function updateSelectedLocationDisplay() {
  const locationInfo = locations[selectedLocation];
  if (locationInfo) {
    document.getElementById('selected-location-name').textContent = locationInfo.name;
    document.getElementById('selected-location-details').textContent = 
      `${locationInfo.address} • ${locationInfo.distance} away`;
  }
}

// Language Selector Functions
function toggleLanguageMenu() {
  const menu = document.getElementById('language-menu');
  menu.classList.toggle('show');
}

function changeLanguage(langCode) {
  // Hide the menu after selection
  const menu = document.getElementById('language-menu');
  menu.classList.remove('show');
  
  // Load Google Translate script if not already loaded
  if (!window.google || !window.google.translate) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate';
    script.async = true;
    document.head.appendChild(script);
    
    window.initGoogleTranslate = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
      
      // Trigger translation after initialization
      setTimeout(() => triggerTranslation(langCode), 500);
    };
  } else {
    triggerTranslation(langCode);
  }
}

function triggerTranslation(langCode) {
  if (langCode === 'en') {
    // Reset to original language
    const translateFrame = document.querySelector('iframe.goog-te-menu-frame');
    if (translateFrame) {
      const translateDoc = translateFrame.contentDocument;
      const originalButton = translateDoc.querySelector('.goog-te-menu2-item span:contains("Original")');
      if (originalButton) originalButton.click();
    }
    return;
  }
  
  // Trigger translation to selected language
  const translateSelect = document.querySelector('.goog-te-combo');
  if (translateSelect) {
    translateSelect.value = langCode;
    translateSelect.dispatchEvent(new Event('change'));
  }
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
  const languageSelector = document.querySelector('.language-selector');
  const menu = document.getElementById('language-menu');
  
  if (languageSelector && menu && !languageSelector.contains(event.target)) {
    menu.classList.remove('show');
  }
});
