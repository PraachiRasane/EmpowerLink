// Dummy users and communities for demonstration
const contacts = [
  { id: 1, name: "Dr. Priya Sharma (Faculty)" },
  { id: 2, name: "Amit Patel (Entrepreneur)" },
  { id: 3, name: "Sara Roomie (Entrepreneur)" }
];

// Get joined communities from localStorage
function getJoinedCommunities() {
  const joined = localStorage.getItem('joinedCommunities');
  return joined ? JSON.parse(joined) : [];
}

// Message storage (in-memory for demo)
let chats = {
  "user-1": [
    { sender: "self", text: "Hi Dr. Priya, could you help me with the funding process?" },
    { sender: "Dr. Priya Sharma (Faculty)", text: "Of course! Let's schedule a call." }
  ],
  "user-2": [
    { sender: "Amit Patel (Entrepreneur)", text: "Hey, want to join my AgriTech project group?" }
  ],
  "user-3": [],
  "community-women-entrepreneurs": [
    { sender: "Sara Roomie (Entrepreneur)", text: "Welcome to all new women founders!" }
  ],
  "community-agritech": [
    { sender: "Amit Patel (Entrepreneur)", text: "Let's share AgriTech resources here." }
  ],
  "community-fintech": [],
  "community-student-startups": []
};

let currentChatKey = "user-1";

// Populate contacts and communities
function renderSidebar() {
  const contactsList = document.getElementById('contacts-list');
  contactsList.innerHTML = '';
  contacts.forEach((c, i) => {
    const li = document.createElement('li');
    li.textContent = c.name;
    li.className = (currentChatKey === `user-${c.id}`) ? 'active' : '';
    li.onclick = () => { currentChatKey = `user-${c.id}`; renderChat(); renderSidebar(); };
    contactsList.appendChild(li);
  });

  const commList = document.getElementById('communities-list');
  commList.innerHTML = '';
  const joinedCommunities = getJoinedCommunities();
  
  if (joinedCommunities.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No communities joined yet';
    li.style.fontStyle = 'italic';
    li.style.color = '#7f8c8d';
    commList.appendChild(li);
  } else {
    joinedCommunities.forEach((c, i) => {
      const li = document.createElement('li');
      li.textContent = c.name;
      li.className = (currentChatKey === `community-${c.id}`) ? 'active' : '';
      li.onclick = () => { currentChatKey = `community-${c.id}`; renderChat(); renderSidebar(); };
      commList.appendChild(li);
    });
  }
}

// Render chat messages
function renderChat() {
  const chatHeader = document.getElementById('chat-header');
  const chatMessages = document.getElementById('chat-messages');
  let title = "";
  if (currentChatKey.startsWith('user-')) {
    const user = contacts.find(c => `user-${c.id}` === currentChatKey);
    title = user ? user.name : "Chat";
  } else {
    const joinedCommunities = getJoinedCommunities();
    const comm = joinedCommunities.find(c => `community-${c.id}` === currentChatKey);
    title = comm ? comm.name + " (Community)" : "Community";
  }
  chatHeader.textContent = title;

  chatMessages.innerHTML = '';
  (chats[currentChatKey] || []).forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message' + (msg.sender === "self" ? ' self' : '');
    div.textContent = msg.text;
    chatMessages.appendChild(div);
  });
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle sending a message
document.getElementById('message-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (!text) return;
  if (!chats[currentChatKey]) chats[currentChatKey] = [];
  chats[currentChatKey].push({ sender: "self", text });
  input.value = '';
  renderChat();
});

// Language Selector Functions
function toggleLanguageMenu() {
  const menu = document.getElementById('language-menu');
  menu.classList.toggle('show');
}

function changeLanguage(langCode) {
  // Hide the menu after selection
  const menu = document.getElementById('language-menu');
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

// Initial render
renderSidebar();
renderChat();

// Refresh communities when page becomes visible (in case user joined from another tab)
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    renderSidebar();
  }
});

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
  const languageSelector = document.querySelector('.language-selector');
  const menu = document.getElementById('language-menu');
  
  if (languageSelector && menu && !languageSelector.contains(event.target)) {
    menu.classList.remove('show');
  }
});

// Initialize Google Translate on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeGoogleTranslate();
});


