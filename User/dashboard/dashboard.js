// Language Selector Functions
function toggleLanguageMenu() {
  const menu = document.getElementById('languageMenu');
  menu.classList.toggle('show');
}

function changeLanguage(langCode) {
  // Hide the menu after selection
  const menu = document.getElementById('languageMenu');
  menu.classList.remove('show');
  
  if (langCode === 'en') {
    // Reset to original language by reloading the page
    window.location.reload();
    return;
  }
  
  // Force load Google Translate every time for reliability
  loadGoogleTranslateForced(langCode);
}

function loadGoogleTranslateForced(langCode) {
  // Map to correct Google Translate code
  const googleLangCode = getGoogleTranslateCode(langCode);
  
  // Remove any existing Google Translate scripts and elements
  const existingScripts = document.querySelectorAll('script[src*="translate.google"]');
  existingScripts.forEach(script => script.remove());
  
  const existingFrames = document.querySelectorAll('iframe[id*="google_translate"], iframe.skiptranslate');
  existingFrames.forEach(frame => frame.remove());
  
  // Remove any existing translate elements
  const existingElements = document.querySelectorAll('.goog-te-banner-frame, .goog-te-menu-frame, .goog-te-combo');
  existingElements.forEach(el => el.remove());
  
  // Clear the translate element
  const translateEl = document.getElementById('google_translate_element');
  if (translateEl) {
    translateEl.innerHTML = '';
  }
  
  // Reset any existing Google Translate state
  if (window.google && window.google.translate) {
    delete window.google.translate;
  }
  
  // Clear any Google Translate cookies
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Create and load fresh Google Translate script
  const script = document.createElement('script');
  script.src = `https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate&hl=en&sl=en&tl=${googleLangCode}`;
  script.async = true;
  
  window.initGoogleTranslate = function() {
    try {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh-cn',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
      }, 'google_translate_element');
      
      // Wait for widget to be ready and then trigger translation
      setTimeout(() => {
        triggerTranslationDirectly(googleLangCode);
      }, 2000); // Increased delay for better reliability
    } catch (error) {
      console.log('Google Translate initialization error:', error);
      // Retry after a longer delay
      setTimeout(() => loadGoogleTranslateForced(langCode), 3000);
    }
  };
  
  document.head.appendChild(script);
}

function triggerTranslationDirectly(langCode) {
  const googleLangCode = getGoogleTranslateCode(langCode);
  let attempts = 0;
  const maxAttempts = 15; // Increased attempts
  
  function attemptTranslation() {
    attempts++;
    console.log(`Translation attempt ${attempts} for language: ${googleLangCode}`);
    
    // Method 1: Try the Google Translate combo select (most reliable)
    let translateSelect = document.querySelector('.goog-te-combo');
    if (translateSelect) {
      // Check if the target language is available in the dropdown
      const options = translateSelect.querySelectorAll('option');
      const targetOption = Array.from(options).find(option => 
        option.value === googleLangCode || 
        option.value.includes(googleLangCode)
      );
      
      if (targetOption) {
        translateSelect.value = targetOption.value;
        translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`Translation triggered via combo select for ${targetOption.value}`);
        return true;
      }
    }
    
    // Method 2: Try the hidden element select
    translateSelect = document.querySelector('#google_translate_element select');
    if (translateSelect) {
      const options = translateSelect.querySelectorAll('option');
      const targetOption = Array.from(options).find(option => 
        option.value === googleLangCode || 
        option.value.includes(googleLangCode)
      );
      
      if (targetOption) {
        translateSelect.value = targetOption.value;
        translateSelect.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`Translation triggered via hidden element for ${targetOption.value}`);
        return true;
      }
    }
    
    // Method 3: Try to find and click language menu items
    const langOptions = document.querySelectorAll('.goog-te-menu2-item, .goog-te-menu2-item-selected');
    const targetLanguage = getLanguageName(langCode);
    
    for (let option of langOptions) {
      const span = option.querySelector('span');
      if (span && span.textContent) {
        const text = span.textContent.toLowerCase();
        if (text.includes(targetLanguage.toLowerCase()) || 
            text.includes(googleLangCode.toLowerCase()) ||
            text.includes(langCode.toLowerCase())) {
          span.click();
          console.log(`Translation triggered via menu click for ${text}`);
          return true;
        }
      }
    }
    
    // Method 4: Use Google Translate URL hash method (more reliable fallback)
    if (attempts > 5) {
      const hash = `#googtrans(en|${googleLangCode})`;
      window.location.hash = hash;
      console.log(`Translation triggered via URL hash: ${hash}`);
      return true;
    }
    
    return false;
  }
  
  // Try immediately
  if (!attemptTranslation()) {
    // Keep retrying with increasing delays
    const retryInterval = setInterval(() => {
      if (attemptTranslation() || attempts >= maxAttempts) {
        clearInterval(retryInterval);
        if (attempts >= maxAttempts) {
          console.log('Translation failed after maximum attempts, using final fallback');
          // Final fallback: reload with language parameter
          window.location.href = `${window.location.pathname}#googtrans(en|${googleLangCode})`;
          window.location.reload();
        }
      }
    }, 800); // Increased interval for better reliability
  }
}

function getLanguageName(langCode) {
  const languageNames = {
    'hi': 'Hindi',
    'mr': 'Marathi', 
    'ta': 'Tamil',
    'te': 'Telugu',
    'kn': 'Kannada',
    'gu': 'Gujarati',
    'bn': 'Bengali',
    'ur': 'Urdu',
    'es': 'Spanish',
    'fr': 'French',
    'ar': 'Arabic',
    'zh': 'Chinese (Simplified)',
    'zh-cn': 'Chinese (Simplified)'
  };
  return languageNames[langCode] || langCode;
}

// Map our language codes to Google Translate codes
function getGoogleTranslateCode(langCode) {
  const googleCodes = {
    'hi': 'hi',
    'mr': 'mr',
    'ta': 'ta',
    'te': 'te',
    'kn': 'kn',
    'gu': 'gu',
    'bn': 'bn',
    'ur': 'ur',
    'es': 'es',
    'fr': 'fr',
    'ar': 'ar',
    'zh': 'zh-cn'
  };
  return googleCodes[langCode] || langCode;
}

function initializeGoogleTranslate() {
  // Create the Google Translate element if it doesn't exist
  if (!document.getElementById('google_translate_element')) {
    const translateDiv = document.createElement('div');
    translateDiv.id = 'google_translate_element';
    translateDiv.style.display = 'none';
    document.body.appendChild(translateDiv);
  }
  
  // Load Google Translate script for initial setup
  if (!window.google || !window.google.translate) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    window.googleTranslateElementInit = function() {
      try {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element');
        console.log('Google Translate initialized successfully');
      } catch (error) {
        console.log('Google Translate initialization error:', error);
      }
    };
    
    document.head.appendChild(script);
  }
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
  const languageSelector = document.querySelector('.language-selector');
  const menu = document.getElementById('languageMenu');
  
  if (languageSelector && menu && !languageSelector.contains(event.target)) {
    menu.classList.remove('show');
  }
});

// Initialize Google Translate on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeGoogleTranslate();
});

// Carousel functionality
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

function showImage(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Auto-slide every 4 seconds
setInterval(nextImage, 4000);

// Sample data for announcements
const govtSchemes = [
  { title: "Startup India Initiative", desc: "Government support for budding entrepreneurs." },
  { title: "Stand-Up India", desc: "Loans for women and SC/ST entrepreneurs." }
];

const collabOpps = [
  { 
    title: "Looking for Co-founder in AgriTech", 
    desc: "Seeking a partner for a rural AgriTech startup.",
    poster: "Amit Patel", 
    contact: "amit.patel@email.com"
  },
  { 
    title: "Mentor Needed for Women Entrepreneurs Workshop", 
    desc: "Join as a mentor for our upcoming workshop.",
    poster: "Priya Sharma", 
    contact: "priya.sharma@email.com"
  }
];

// Populate Government Schemes
const govtList = document.getElementById('govt-schemes');
govtSchemes.forEach(scheme => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${scheme.title}</strong><br><span>${scheme.desc}</span>`;
  govtList.appendChild(li);
});

// Populate Collaboration Opportunities
const collabList = document.getElementById('collab-opps');
collabOpps.forEach(opp => {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${opp.title}</strong><br>
    <span>${opp.desc}</span>
    <div class="collab-info">Posted by: ${opp.poster} | Contact: ${opp.contact}</div>`;
  collabList.appendChild(li);
});


// Dummy previous record for demonstration
let previousRecord = {
  investment: 50000,
  breakeven: 40000,
  profit: 10000,
  customers: "300+",
  scale: "Group of 3"
};

// Chart instance
let progressChart = null;

// Helper function to calculate profit percentage
function calcProfitPercent(profit, investment) {
  if (!investment) return 0;
  return ((profit / investment) * 100).toFixed(2);
}

document.getElementById('progress-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const investment = Number(form.investment.value);
  const breakeven = Number(form.breakeven.value);
  const profit = Number(form.profit.value);
  const customers = form.customers.value;
  const scale = form.scale.value;

  // Calculate profit percentage
  const prevProfitPct = calcProfitPercent(previousRecord.profit, previousRecord.investment);
  const latestProfitPct = calcProfitPercent(profit, investment);

  // Prepare report table
  const reportHTML = `
    <h2>Your Progress Report</h2>
    <table style="width:100%;margin-bottom:1.2rem;">
      <tr><th>Metric</th><th>Previous Record</th><th>Latest Entry</th></tr>
      <tr><td>Investment Amount</td><td>₹${previousRecord.investment.toLocaleString()}</td><td>₹${investment.toLocaleString()}</td></tr>
      <tr><td>Breakeven Amount</td><td>₹${previousRecord.breakeven.toLocaleString()}</td><td>₹${breakeven.toLocaleString()}</td></tr>
      <tr><td>Profit Gained</td><td>₹${previousRecord.profit.toLocaleString()}</td><td>₹${profit.toLocaleString()}</td></tr>
      <tr><td>Profit Percentage</td><td>${prevProfitPct}%</td><td>${latestProfitPct}%</td></tr>
      <tr><td>Customer Engagement</td><td>${previousRecord.customers}</td><td>${customers}</td></tr>
      <tr><td>Scale of Business</td><td>${previousRecord.scale}</td><td>${scale}</td></tr>
    </table>
    <ul>
      <li><strong>Profit Growth:</strong> Your profit percentage has changed from ${prevProfitPct}% to ${latestProfitPct}%.</li>
      <li><strong>Customer Engagement:</strong> ${customers} (previous: ${previousRecord.customers})</li>
      <li><strong>Business Scale:</strong> ${scale} (previous: ${previousRecord.scale})</li>
    </ul>
  `;

  const reportDiv = document.getElementById('progress-report');
  reportDiv.innerHTML = reportHTML;
  reportDiv.style.display = 'block';

  // Show the chart container
  const chartContainer = document.getElementById('progress-chart');
  chartContainer.style.display = 'block';

  // Prepare chart data
  const labels = ['Investment', 'Breakeven', 'Profit'];
  const prevData = [previousRecord.investment, previousRecord.breakeven, previousRecord.profit];
  const latestData = [investment, breakeven, profit];

  // Draw or update chart
  const ctx = document.getElementById('progress-chart').getContext('2d');
  if (progressChart) progressChart.destroy();
  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Previous Record',
          data: prevData,
          backgroundColor: 'rgba(106, 17, 203, 0.5)'
        },
        {
          label: 'Latest Entry',
          data: latestData,
          backgroundColor: 'rgba(37,117,252,0.7)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Progress Comparison' }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 10000 }
        }
      }
    }
  });

  // Update previous record for next comparison
  previousRecord = {
    investment,
    breakeven,
    profit,
    customers,
    scale
  };
});
