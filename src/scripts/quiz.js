/**
 * Life Stage Quiz
 * Interactive quiz to recommend products based on user's life stage and needs
 */

// Quiz configuration
const quizConfig = {
  totalSteps: 5,
  animationDuration: 300
};

// Quiz questions
const questions = [
  {
    id: 1,
    question: "Which best describes your current life stage?",
    options: [
      {
        text: "Preparing for pregnancy",
        value: "trying-to-conceive",
        icon: "heart",
        description: "Optimizing health before conception"
      },
      {
        text: "Currently pregnant",
        value: "pregnancy",
        icon: "baby",
        description: "Supporting you and your baby"
      },
      {
        text: "Recently had a baby",
        value: "postpartum",
        icon: "sun",
        description: "Recovery and new motherhood"
      },
      {
        text: "General wellness",
        value: "wellness",
        icon: "sparkles",
        description: "Everyday health support"
      }
    ]
  },
  {
    id: 2,
    question: "What's your primary wellness goal?",
    options: [
      {
        text: "Digestive comfort",
        value: "digestive",
        ingredients: ["ginger"],
        icon: "leaf"
      },
      {
        text: "Stress management",
        value: "stress",
        ingredients: ["ashwagandha", "holy-basil"],
        icon: "wind"
      },
      {
        text: "Energy & vitality",
        value: "energy",
        ingredients: ["moringa", "ashwagandha"],
        icon: "zap"
      },
      {
        text: "Hormonal balance",
        value: "hormonal",
        ingredients: ["shatavari"],
        icon: "flower"
      }
    ]
  },
  {
    id: 3,
    question: "Do you experience occasional nausea or digestive discomfort?",
    options: [
      {
        text: "Yes, frequently",
        value: "frequent",
        ingredients: ["ginger"],
        weight: 3
      },
      {
        text: "Sometimes",
        value: "sometimes",
        ingredients: ["ginger"],
        weight: 1
      },
      {
        text: "Rarely or never",
        value: "rarely",
        ingredients: [],
        weight: 0
      }
    ]
  },
  {
    id: 4,
    question: "How would you describe your stress levels?",
    options: [
      {
        text: "High - stressed most days",
        value: "high",
        ingredients: ["ashwagandha", "holy-basil"],
        weight: 3
      },
      {
        text: "Moderate - occasional stress",
        value: "moderate",
        ingredients: ["ashwagandha"],
        weight: 2
      },
      {
        text: "Low - I manage stress well",
        value: "low",
        ingredients: [],
        weight: 0
      }
    ]
  },
  {
    id: 5,
    question: "Are you currently breastfeeding or planning to?",
    options: [
      {
        text: "Yes, currently breastfeeding",
        value: "breastfeeding",
        ingredients: ["shatavari", "moringa"],
        weight: 3
      },
      {
        text: "Planning to breastfeed",
        value: "planning",
        ingredients: ["shatavari", "moringa"],
        weight: 2
      },
      {
        text: "No",
        value: "no",
        ingredients: [],
        weight: 0
      }
    ]
  }
];

// Product recommendations based on results
const recommendations = {
  'trying-to-conceive': {
    primary: ['shatavari', 'ashwagandha'],
    message: "Focus on foundational support as you prepare for pregnancy."
  },
  'pregnancy': {
    primary: ['ginger', 'moringa'],
    message: "Safe, pregnancy-appropriate support for you and your baby."
  },
  'postpartum': {
    primary: ['shatavari', 'moringa', 'ashwagandha'],
    message: "Recovery, replenishment, and resilience for the fourth trimester."
  },
  'wellness': {
    primary: ['ashwagandha', 'turmeric', 'holy-basil'],
    message: "Daily support for vitality, balance, and long-term health."
  }
};

/**
 * Initialize the quiz
 * @param {string} containerId - The ID of the quiz container
 * @param {Object} options - Configuration options
 */
export function initQuiz(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const state = {
    currentStep: 0,
    answers: {},
    lifeStage: null,
    recommendedIngredients: new Set()
  };

  // Render quiz UI
  function render() {
    container.innerHTML = `
      <div class="quiz-container">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" style="width: ${(state.currentStep / quizConfig.totalSteps) * 100}%"></div>
        </div>

        <div class="quiz-content">
          ${state.currentStep === 0 ? renderIntro() : ''}
          ${state.currentStep > 0 && state.currentStep <= questions.length ? renderQuestion() : ''}
          ${state.currentStep > questions.length ? renderResults() : ''}
        </div>

        <div class="quiz-nav">
          ${state.currentStep > 0 && state.currentStep <= questions.length ? `
            <button class="quiz-nav-btn quiz-nav-back" data-action="back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
              Back
            </button>
          ` : ''}
        </div>
      </div>
    `;

    attachEventListeners();
  }

  function renderIntro() {
    return `
      <div class="quiz-intro">
        <div class="quiz-intro-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54"/>
          </svg>
        </div>
        <h2 class="quiz-intro-title">Find Your Formula</h2>
        <p class="quiz-intro-description">
          Answer a few questions to discover which supplements are right for your current life stage and wellness goals.
        </p>
        <p class="quiz-intro-note">Takes about 2 minutes</p>
        <button class="btn btn-primary btn-lg quiz-start-btn" data-action="start">
          Get Started
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    `;
  }

  function renderQuestion() {
    const question = questions[state.currentStep - 1];
    const selectedValue = state.answers[question.id];

    return `
      <div class="quiz-question">
        <span class="quiz-step-label">Question ${state.currentStep} of ${questions.length}</span>
        <h2 class="quiz-question-title">${question.question}</h2>

        <div class="quiz-options">
          ${question.options.map(option => `
            <button
              class="quiz-option ${selectedValue === option.value ? 'selected' : ''}"
              data-action="answer"
              data-value="${option.value}"
              data-question="${question.id}"
            >
              ${option.icon ? `
                <span class="quiz-option-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${getIconPath(option.icon)}
                  </svg>
                </span>
              ` : ''}
              <span class="quiz-option-text">
                <span class="quiz-option-label">${option.text}</span>
                ${option.description ? `<span class="quiz-option-desc">${option.description}</span>` : ''}
              </span>
              <span class="quiz-option-check">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderResults() {
    const lifeStage = state.lifeStage;
    const recommendation = recommendations[lifeStage] || recommendations.wellness;
    const allIngredients = Array.from(state.recommendedIngredients);

    // Combine primary recommendations with quiz-derived ingredients
    const finalIngredients = [...new Set([...recommendation.primary, ...allIngredients])].slice(0, 4);

    return `
      <div class="quiz-results">
        <div class="quiz-results-header">
          <div class="quiz-results-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
          </div>
          <h2 class="quiz-results-title">Your Personalized Recommendations</h2>
          <p class="quiz-results-message">${recommendation.message}</p>
        </div>

        <div class="quiz-results-products">
          <h3 class="quiz-results-subtitle">Recommended for You</h3>
          <div class="quiz-results-grid">
            ${finalIngredients.map(ingredient => `
              <a href="product.html?product=${ingredient}" class="quiz-result-card">
                <div class="quiz-result-card-image">
                  <img src="/images/ilona-isha.jpg" alt="${formatIngredientName(ingredient)}" loading="lazy">
                </div>
                <div class="quiz-result-card-content">
                  <h4 class="quiz-result-card-title">${formatIngredientName(ingredient)}</h4>
                  <span class="quiz-result-card-match">Recommended for ${lifeStage.replace('-', ' ')}</span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>

        <div class="quiz-results-actions">
          <a href="collection.html?stage=${lifeStage}" class="btn btn-primary btn-lg">
            View All Recommendations
          </a>
          <button class="btn btn-ghost" data-action="restart">
            Retake Quiz
          </button>
        </div>

        <p class="quiz-results-disclaimer">
          <strong>Note:</strong> These recommendations are based on your responses. Always consult with a healthcare provider before starting any new supplement, especially during pregnancy or breastfeeding.
        </p>
      </div>
    `;
  }

  function getIconPath(icon) {
    const icons = {
      'heart': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
      'baby': '<circle cx="12" cy="8" r="4"/><path d="M12 12c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"/>',
      'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
      'sparkles': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',
      'leaf': '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
      'wind': '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
      'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
      'flower': '<path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15"/><circle cx="12" cy="12" r="3"/>'
    };
    return icons[icon] || icons['sparkles'];
  }

  function formatIngredientName(ingredient) {
    const names = {
      'ginger': 'Organic Ginger',
      'ashwagandha': 'Organic Ashwagandha',
      'turmeric': 'Organic Turmeric',
      'moringa': 'Organic Moringa',
      'shatavari': 'Organic Shatavari',
      'holy-basil': 'Organic Holy Basil'
    };
    return names[ingredient] || ingredient;
  }

  function attachEventListeners() {
    // Start button
    const startBtn = container.querySelector('[data-action="start"]');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        state.currentStep = 1;
        render();
      });
    }

    // Answer options
    container.querySelectorAll('[data-action="answer"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const questionId = parseInt(btn.dataset.question);
        const value = btn.dataset.value;
        const question = questions.find(q => q.id === questionId);
        const option = question.options.find(o => o.value === value);

        // Store answer
        state.answers[questionId] = value;

        // Track life stage from first question
        if (questionId === 1) {
          state.lifeStage = value;
        }

        // Track recommended ingredients
        if (option.ingredients) {
          option.ingredients.forEach(i => state.recommendedIngredients.add(i));
        }

        // Advance to next step after brief delay
        setTimeout(() => {
          state.currentStep++;
          render();
        }, quizConfig.animationDuration);
      });
    });

    // Back button
    const backBtn = container.querySelector('[data-action="back"]');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (state.currentStep > 1) {
          state.currentStep--;
          render();
        }
      });
    }

    // Restart button
    const restartBtn = container.querySelector('[data-action="restart"]');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        state.currentStep = 0;
        state.answers = {};
        state.lifeStage = null;
        state.recommendedIngredients = new Set();
        render();
      });
    }
  }

  // Initial render
  render();

  // Return public API
  return {
    reset: () => {
      state.currentStep = 0;
      state.answers = {};
      state.lifeStage = null;
      state.recommendedIngredients = new Set();
      render();
    },
    getResults: () => ({
      lifeStage: state.lifeStage,
      answers: state.answers,
      ingredients: Array.from(state.recommendedIngredients)
    })
  };
}

export { questions, recommendations };
