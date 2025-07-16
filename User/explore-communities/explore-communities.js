// Available communities data
const availableCommunities = [
  {
    id: 'startup-founders',
    name: 'Startup Founders',
    description: 'A community for entrepreneurs who are building their first or next startup. Share experiences, get advice, and connect with fellow founders.',
    memberCount: 1240,
    tags: ['Startup', 'Entrepreneurship', 'Networking'],
    icon: 'SF'
  },
  {
    id: 'tech-innovators',
    name: 'Tech Innovators',
    description: 'For entrepreneurs in the technology space. Discuss latest trends, share technical challenges, and collaborate on innovative solutions.',
    memberCount: 856,
    tags: ['Technology', 'Innovation', 'AI/ML'],
    icon: 'TI'
  },
  {
    id: 'women-entrepreneurs',
    name: 'Women Entrepreneurs',
    description: 'Empowering women in business. A supportive space for female entrepreneurs to share stories, challenges, and celebrate successes.',
    memberCount: 642,
    tags: ['Women', 'Empowerment', 'Leadership'],
    icon: 'WE'
  },
  {
    id: 'social-impact',
    name: 'Social Impact Ventures',
    description: 'For entrepreneurs focused on creating positive social change. Discuss impact measurement, funding, and sustainable business models.',
    memberCount: 523,
    tags: ['Social Impact', 'Sustainability', 'NGO'],
    icon: 'SI'
  },
  {
    id: 'fintech-founders',
    name: 'FinTech Founders',
    description: 'Financial technology entrepreneurs discussing regulations, innovations, and market opportunities in the finance sector.',
    memberCount: 445,
    tags: ['FinTech', 'Finance', 'Banking'],
    icon: 'FF'
  },
  {
    id: 'agritech-innovators',
    name: 'AgriTech Innovators',
    description: 'Revolutionizing agriculture through technology. Connect with entrepreneurs working on farming solutions and food security.',
    memberCount: 378,
    tags: ['Agriculture', 'Technology', 'Sustainability'],
    icon: 'AI'
  },
  {
    id: 'ecommerce-builders',
    name: 'E-Commerce Builders',
    description: 'For entrepreneurs in the e-commerce space. Share strategies, discuss platforms, and learn about digital marketing.',
    memberCount: 789,
    tags: ['E-Commerce', 'Digital Marketing', 'Retail'],
    icon: 'EB'
  },
  {
    id: 'healthcare-innovators',
    name: 'HealthTech Innovators',
    description: 'Healthcare entrepreneurs working on medical devices, health apps, and improving patient outcomes through technology.',
    memberCount: 567,
    tags: ['Healthcare', 'MedTech', 'Digital Health'],
    icon: 'HI'
  }
];

// Get joined communities from localStorage
function getJoinedCommunities() {
  const joined = localStorage.getItem('joinedCommunities');
  return joined ? JSON.parse(joined) : [];
}

// Save joined communities to localStorage
function saveJoinedCommunities(communities) {
  localStorage.setItem('joinedCommunities', JSON.stringify(communities));
}

// Join a community
function joinCommunity(communityId) {
  const joinedCommunities = getJoinedCommunities();
  const community = availableCommunities.find(c => c.id === communityId);
  
  if (community && !joinedCommunities.find(c => c.id === communityId)) {
    joinedCommunities.push(community);
    saveJoinedCommunities(joinedCommunities);
    
    // Update button state
    const button = document.querySelector(`[data-community-id="${communityId}"]`);
    if (button) {
      button.textContent = '✓ Joined';
      button.classList.add('joined');
      button.disabled = true;
    }
    
    // Show success message
    showNotification(`Successfully joined ${community.name}!`);
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

// Render communities
function renderCommunities() {
  const grid = document.getElementById('communities-grid');
  const joinedCommunities = getJoinedCommunities();
  
  grid.innerHTML = availableCommunities.map(community => {
    const isJoined = joinedCommunities.find(c => c.id === community.id);
    
    return `
      <div class="community-card">
        <div class="community-header">
          <div class="community-icon">${community.icon}</div>
          <div class="community-info">
            <h3>${community.name}</h3>
            <div class="member-count">${community.memberCount.toLocaleString()} members</div>
          </div>
        </div>
        <div class="community-description">${community.description}</div>
        <div class="community-tags">
          ${community.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button 
          class="join-btn ${isJoined ? 'joined' : ''}" 
          data-community-id="${community.id}"
          ${isJoined ? 'disabled' : ''}
          onclick="joinCommunity('${community.id}')"
        >
          ${isJoined ? '✓ Joined' : 'Join Community'}
        </button>
      </div>
    `;
  }).join('');
}

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
  // Remove any existing Google Translate scripts and elements
  const existingScripts = document.querySelectorAll('script[src*="translate.google"]');
  existingScripts.forEach(script => script.remove());
  
  const existingFrames = document.querySelectorAll('iframe[id*="google_translate"]');
  existingFrames.forEach(frame => frame.remove());
  
  // Clear the translate element
  const translateEl = document.getElementById('google_translate_element');
  if (translateEl) {
    translateEl.innerHTML = '';
  }
  
  // Reset any existing Google Translate state
  if (window.google && window.google.translate) {
    delete window.google.translate;
  }
  
  // Create and load fresh Google Translate script
  const script = document.createElement('script');
  script.src = `https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate&hl=en&sl=en&tl=${langCode}`;
  script.async = true;
  
  window.initGoogleTranslate = function() {
    try {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
      }, 'google_translate_element');
      
      // Wait for widget to be ready and then trigger translation
      setTimeout(() => {
        triggerTranslationDirectly(langCode);
      }, 1500);
    } catch (error) {
      console.log('Google Translate initialization error:', error);
      // Retry after a short delay
      setTimeout(() => loadGoogleTranslateForced(langCode), 2000);
    }
  };
  
  document.head.appendChild(script);
}

function triggerTranslationDirectly(langCode) {
  let attempts = 0;
  const maxAttempts = 10;
  
  function attemptTranslation() {
    attempts++;
    
    // Method 1: Try the Google Translate combo select
    let translateSelect = document.querySelector('.goog-te-combo');
    if (translateSelect) {
      translateSelect.value = langCode;
      translateSelect.dispatchEvent(new Event('change'));
      console.log('Translation triggered via combo select');
      return true;
    }
    
    // Method 2: Try the hidden element select
    translateSelect = document.querySelector('#google_translate_element select');
    if (translateSelect) {
      translateSelect.value = langCode;
      translateSelect.dispatchEvent(new Event('change'));
      console.log('Translation triggered via hidden element');
      return true;
    }
    
    // Method 3: Try to find and click language menu items
    const langOptions = document.querySelectorAll('.goog-te-menu2-item, .goog-te-menu2-item-selected');
    const targetLanguage = getLanguageName(langCode);
    
    for (let option of langOptions) {
      const span = option.querySelector('span');
      if (span && span.textContent) {
        const text = span.textContent.toLowerCase();
        if (text.includes(targetLanguage.toLowerCase()) || 
            text.includes(langCode.toLowerCase())) {
          span.click();
          console.log('Translation triggered via menu click');
          return true;
        }
      }
    }
    
    // Method 4: Try direct API call
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      try {
        const iframe = document.querySelector('iframe.goog-te-menu-frame');
        if (iframe && iframe.contentDocument) {
          const doc = iframe.contentDocument;
          const langLink = doc.querySelector(`a[href*="${langCode}"]`);
          if (langLink) {
            langLink.click();
            console.log('Translation triggered via iframe');
            return true;
          }
        }
      } catch (e) {
        console.log('Cross-origin iframe access blocked, trying other methods...');
      }
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
          console.log('Translation failed after maximum attempts');
          // Final fallback: reload with language parameter
          window.location.href = `${window.location.href}#googtrans(en|${langCode})`;
        }
      }
    }, 500);
  }
}

function loadGoogleTranslate(langCode) {
  // Remove any existing script
  const existingScript = document.querySelector('script[src*="translate.google.com"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create and load the Google Translate script
  const script = document.createElement('script');
  script.src = 'https://translate.google.com/translate_a/element.js?cb=initGoogleTranslate';
  script.async = true;
  
  window.initGoogleTranslate = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
    
    // Wait for the Google Translate widget to be ready
    setTimeout(() => {
      triggerTranslation(langCode);
    }, 1000);
  };
  
  document.head.appendChild(script);
}

function triggerTranslation(langCode) {
  if (langCode === 'en') {
    // Reset to original language by reloading the page
    window.location.reload();
    return;
  }
  
  // Function to attempt translation
  function attemptTranslation() {
    // Method 1: Try the main Google Translate dropdown
    let translateSelect = document.querySelector('.goog-te-combo');
    if (translateSelect) {
      translateSelect.value = langCode;
      translateSelect.dispatchEvent(new Event('change'));
      return true;
    }
    
    // Method 2: Try the hidden element dropdown
    translateSelect = document.querySelector('#google_translate_element select');
    if (translateSelect) {
      translateSelect.value = langCode;
      translateSelect.dispatchEvent(new Event('change'));
      return true;
    }
    
    // Method 3: Try to find language options in menu
    const langOptions = document.querySelectorAll('.goog-te-menu2-item span');
    const targetLanguage = getLanguageName(langCode);
    for (let option of langOptions) {
      if (option.textContent && (
        option.textContent.includes(targetLanguage) || 
        option.textContent.toLowerCase().includes(targetLanguage.toLowerCase())
      )) {
        option.click();
        return true;
      }
    }
    
    return false;
  }
  
  // Try immediately
  if (!attemptTranslation()) {
    // If first attempt fails, wait and try again
    setTimeout(() => {
      if (!attemptTranslation()) {
        // Final attempt after longer delay
        setTimeout(attemptTranslation, 2000);
      }
    }, 1000);
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
    'zh': 'Chinese'
  };
  return languageNames[langCode] || langCode;
}

function initializeGoogleTranslate() {
  // Only initialize if not already loaded
  if (!window.google || !window.google.translate) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'hi,mr,ta,te,kn,gu,bn,ur,es,fr,ar,zh',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderCommunities();
  initializeGoogleTranslate();
});
