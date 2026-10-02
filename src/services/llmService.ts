import {
  StructuredLessonData,
  LessonPracticeQuestion,
} from '../types';

export interface LLMConfig {
  provider: 'gemini' | 'openai' | 'anthropic' | 'custom';
  model: string;
  apiKey: string;
  endpoint?: string;
}

export interface LessonGenerationParams {
  conceptId: string;
  conceptName: string;
  lessonTitle: string;
  studentState: {
    diagnosticScore: number;
    diagnosticLevel: string;
    diagnosticGaps: string[];
    diagnosticStrengths?: string[];
    completedLessonIds: string[];
    selectedConcepts: string[];
  };
}

// -------------------------------------------------------------
// Configuration Retrieval & Persistence
// -------------------------------------------------------------
export function getLLMConfig(): LLMConfig {
  const envProvider = (import.meta.env.VITE_LLM_PROVIDER as LLMConfig['provider']) || 'gemini';
  const envModel = (import.meta.env.VITE_LLM_MODEL as string) || 'gemini-2.5-flash';
  const envKey =
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    (import.meta.env.VITE_LLM_API_KEY as string) ||
    '';

  const storedProvider = localStorage.getItem('LOGIQ_LLM_PROVIDER') as LLMConfig['provider'] | null;
  const storedModel = localStorage.getItem('LOGIQ_LLM_MODEL');
  const storedKey = localStorage.getItem('LOGIQ_LLM_API_KEY');

  return {
    provider: storedProvider || envProvider,
    model: storedModel || envModel,
    apiKey: storedKey !== null ? storedKey : envKey,
    endpoint: import.meta.env.VITE_LLM_ENDPOINT as string | undefined,
  };
}

export function saveLLMConfig(config: Partial<LLMConfig>): void {
  if (config.provider) localStorage.setItem('LOGIQ_LLM_PROVIDER', config.provider);
  if (config.model) localStorage.setItem('LOGIQ_LLM_MODEL', config.model);
  if (config.apiKey !== undefined) localStorage.setItem('LOGIQ_LLM_API_KEY', config.apiKey);
}

// -------------------------------------------------------------
// Built-in Professor-Grade Offline Educational Synthesis Engine
// (Ensures zero-downtime & guaranteed structured format)
// -------------------------------------------------------------
function synthesizeOfflineLesson(params: LessonGenerationParams): StructuredLessonData {
  const { conceptId, studentState } = params;
  const hasLossGap = studentState.diagnosticGaps.some(g =>
    g.toLowerCase().includes('loss') || g.toLowerCase().includes('gradient')
  );
  const hasOverfittingGap = studentState.diagnosticGaps.some(g =>
    g.toLowerCase().includes('overfitting') || g.toLowerCase().includes('regularization')
  );

  // 1. Machine Learning: Supervised Classification & Sigmoid Decision Boundaries
  if (conceptId === 'machine-learning') {
    return {
      id: 'ml-01-supervised-classification',
      conceptId: 'machine-learning',
      title: 'Supervised Classification & The Sigmoid Hypothesis',
      subtitle: 'From linear regression limits to probabilistic decision hyperplanes',
      estimatedReadTime: '8 min read',
      personalizationNote: hasLossGap
        ? 'Tailored for your profile: Extra depth on why Binary Cross-Entropy prevents vanishing loss gradients.'
        : 'Tailored for your profile: Fast-tracked through linear basics into probabilistic decision boundaries.',
      intuition: {
        hook: 'Imagine trying to classify whether an email is spam or legitimate using only a standard linear regression line.',
        whyItExists:
          'Linear regression predicts unbounded values from negative to positive infinity. If an email has 50 spam keywords, a line might predict y = 3.8 — but what does that mean when you only need a discrete "Yes" (1) or "No" (0)? We needed a mathematical bridge that naturally compresses any real number into a valid probability between 0.0 and 1.0.',
        everydayAnalogy:
          'Think of a dimmer switch for a stage light. Instead of a violent click (0 or 1), a smooth S-curve dial gently transitions from complete darkness to full brightness, with a neutral 50% midpoint right in the center.',
      },
      coreConcept: {
        definition:
          'Supervised classification maps input features x into categorical target labels y ∈ {0, 1} by computing a linear score z = wᵀx + b and passing it through a non-linear squashing function σ(z) to estimate the posterior probability P(y=1|x).',
        detailedExplanation:
          'The fundamental engine of logistic classification has two distinct stages: First, a geometric projection (wᵀx + b) measures how strongly an input aligns with the learned class orientation. Second, the logistic Sigmoid function squashes this score into [0, 1]. The locus of points where wᵀx + b = 0 represents the decision boundary where the classifier is exactly 50% uncertain.',
      },
      keyTerms: [
        {
          term: 'Decision Boundary',
          definition: 'The geometric hyperplane in feature space where predicted probability equals exactly 0.50.',
          analogy: 'The border line on a map dividing two neighboring countries.',
        },
        {
          term: 'Sigmoid Function (σ)',
          definition: 'A smooth, monotonic S-shaped activation function defined as σ(z) = 1 / (1 + e⁻ᶻ).',
          analogy: 'A hydraulic pressure valve that smoothly bounds infinite pressure into a safe 0% to 100% gauge.',
        },
        {
          term: 'Log-Odds (Logit)',
          definition: 'The raw unbounded linear combination z = ln(p / (1 - p)) prior to sigmoid activation.',
          analogy: 'The raw betting odds before translating into a winning probability percentage.',
        },
      ],
      mathematics: {
        formula: 'P(y = 1 | x) = σ(wᵀx + b) = 1 / (1 + e^{-(wᵀx + b)})',
        plainEnglishMeaning:
          'The probability of belonging to the positive class equals 1 divided by 1 plus e raised to the negative weighted score.',
        parameterBreakdown: [
          { symbol: 'w (Weights)', explanation: 'The normal vector determining the orientation and tilt of the boundary' },
          { symbol: 'x (Features)', explanation: 'The coordinate measurements of the sample in feature space' },
          { symbol: 'b (Bias)', explanation: 'The offset that shifts the boundary away from the origin' },
          { symbol: 'σ(z) (Sigmoid)', explanation: 'Ensures output stays strictly bounded in the probability range [0, 1]' },
        ],
        intuitionNote:
          'When z = 0, e⁰ = 1, so σ(0) = 1 / (1 + 1) = 0.50. When z >> 0, e⁻ᶻ → 0, so σ(z) → 1.0. When z << 0, e⁻ᶻ → ∞, so σ(z) → 0.0.',
      },
      visual: {
        type: 'graph',
        title: 'The Sigmoid S-Curve & Probability Threshold',
        caption: 'Slide the input score z to observe how the logistic function compresses unbounded scores into probabilities.',
        whyVisualNeeded: 'Visualizing the S-curve directly connects the mathematical limit behaviors (z → ±∞) to classification decisions.',
        graphData: {
          kind: 'sigmoid',
          title: 'Logistic Sigmoid Activation σ(z)',
          xLabel: 'Input Score (z = wᵀx + b)',
          yLabel: 'Probability P(y = 1 | x)',
          curveFormula: 'σ(z) = 1 / (1 + e⁻ᶻ)',
          initialValue: 0.0,
        },
      },
      workedExample: {
        problemStatement:
          'Suppose a medical diagnostic classifier has learned weights w₁ = 1.2, w₂ = 0.8, and bias b = -2.5. A patient presents with tumor radius x₁ = 2.0 and texture irregularity x₂ = 1.5. Calculate the predicted probability of malignancy.',
        stepByStep: [
          {
            step: 'Compute the linear score z',
            computation: 'z = (1.2 × 2.0) + (0.8 × 1.5) - 2.5 = 2.4 + 1.2 - 2.5 = 1.1',
            insight: 'Since z = 1.1 > 0, the patient lies on the positive side of the decision boundary.',
          },
          {
            step: 'Apply the sigmoid function',
            computation: 'σ(1.1) = 1 / (1 + e⁻¹·¹) = 1 / (1 + 0.3329) = 1 / 1.3329 ≈ 0.7502',
            insight: 'The model estimates a 75.02% probability that the biopsy sample is malignant.',
          },
          {
            step: 'Apply decision threshold (τ = 0.50)',
            computation: '0.7502 ≥ 0.50 ⟹ Class 1 (Malignant)',
            insight: 'The sample is confidently assigned to Class 1 for clinical oncologist review.',
          },
        ],
        finalOutcome: 'Predicted label ŷ = 1 with 75.0% calibrated probability confidence.',
      },
      realWorldApplication: {
        domain: 'Medical Diagnostics & Oncology',
        systemName: 'Automated Digital Pathology Screening',
        howItWorks:
          'High-resolution microscopic biopsy images are vectorized into morphometric features. The logistic classifier separates benign hyperplasia from invasive carcinoma in sub-second inference.',
        concreteImpact: 'Reduces false-negative screening errors by 41% across high-throughput pathology labs.',
      },
      keyTakeaways: [
        'Linear regression fails for categorical classification because output scores are unbounded and non-probabilistic.',
        'The Sigmoid function smoothly maps any real score into valid probabilities [0, 1], with σ(0) = 0.50 at the decision boundary.',
        'Binary Cross-Entropy loss guarantees a strictly convex loss surface, preventing gradient descent from plateauing.',
      ],
      practicePreparation:
        'In the practice test coming up, you will analyze boundary shifts, evaluate probabilities as z varies, and inspect loss convexities.',
      practiceSet: [
        {
          id: 'q1',
          question: 'What occurs to the predicted probability σ(z) as the linear combination z approaches negative infinity?',
          conceptTag: 'decision-boundary',
          options: [
            'σ(z) smoothly approaches 0.0 asymptotically',
            'σ(z) approaches -1.0',
            'σ(z) oscillates around 0.50',
            'The gradient explodes towards infinity',
          ],
          correctIndex: 0,
          whyCorrect:
            'As z → -∞, e⁻ᶻ grows towards infinity, making the denominator 1 + e⁻ᶻ arbitrarily large, so σ(z) approaches 0.0.',
          whyIncorrect:
            'Sigmoid outputs are bounded strictly in (0, 1), so negative outputs like -1.0 are mathematically impossible.',
          lessonConnection: 'Connects directly to the mathematical limit property in Section 3 and the interactive S-curve graph.',
        },
        {
          id: 'q2',
          question: 'Where is the classifier’s decision boundary geometrically located in feature space?',
          conceptTag: 'decision-boundary',
          options: [
            'Along the hyperplane where wᵀx + b = 0 and σ(z) = 0.50',
            'Where the training loss reaches exactly zero',
            'At the centroid of the positive training cluster',
            'At the intersection where weights w equal bias b',
          ],
          correctIndex: 0,
          whyCorrect:
            'When wᵀx + b = 0, σ(0) = 0.50. This defines the threshold plane separating points classified as 1 versus 0.',
          whyIncorrect:
            'The centroid does not define the boundary; the boundary is an optimal separator between conflicting classes.',
          lessonConnection: 'Refer to the worked example where z = 0 defines the transition threshold.',
        },
        {
          id: 'q3',
          question: 'Why is Binary Cross-Entropy (BCE) favored over Mean Squared Error (MSE) for training logistic classifiers?',
          conceptTag: 'loss-functions',
          options: [
            'BCE produces a strictly convex loss surface that prevents gradient descent from stalling in flat plateaus',
            'BCE allows the model to train without calculating any gradients',
            'BCE guarantees that the model will never overfit the training dataset',
            'MSE cannot be calculated when probabilities lie between 0 and 1',
          ],
          correctIndex: 0,
          whyCorrect:
            'When paired with Sigmoid, MSE creates non-convex surfaces with plateaus where gradients vanish. BCE yields convex gradients proportional to prediction error (ŷ - y).',
          whyIncorrect:
            'BCE still requires gradients (via backprop) and can still overfit without regularization.',
          lessonConnection: 'Connects to Section 3: Loss Function & Optimization.',
        },
        {
          id: 'q4',
          question: 'What is the primary geometric effect of adding an L2 regularization penalty to the classification loss?',
          conceptTag: 'overfitting',
          options: [
            'It shrinks weight vector magnitudes, smoothing the boundary and preventing excessive curvature',
            'It forces some weights to become exactly zero, creating feature selection',
            'It doubles the training speed by eliminating bias terms',
            'It shifts the probability threshold from 0.50 to 0.75',
          ],
          correctIndex: 0,
          whyCorrect:
            'L2 regularization (Ridge) penalizes large weight norms ||w||², shrinking weights smoothly to prevent overfitting.',
          whyIncorrect:
            'Forcing weights to exactly zero is the distinct geometric property of L1 (Lasso) regularization, not L2.',
          lessonConnection: 'Connects to Section 4: Regularization and Overfitting Control.',
        },
      ],
      recoveryPracticeSet: [
        {
          id: 'rq1',
          question: 'If a classifier predicts z = 0 for a given input, what is the exact probability output?',
          conceptTag: 'decision-boundary',
          options: ['0.50', '0.00', '1.00', 'Undefined'],
          correctIndex: 0,
          whyCorrect: 'σ(0) = 1 / (1 + e⁰) = 1 / (1 + 1) = 0.50 exactly.',
          whyIncorrect: '0.0 and 1.0 are only reached asymptotically as z approaches ±∞.',
          lessonConnection: 'Revisit the Sigmoid formula at z = 0.',
        },
        {
          id: 'rq2',
          question: 'What happens to the sigmoid curve when the weight vector magnitude ||w|| increases significantly?',
          conceptTag: 'decision-boundary',
          options: [
            'The transition from 0 to 1 becomes steeper, approaching a step function',
            'The curve becomes completely flat at 0.50',
            'The curve shifts horizontally without changing slope',
            'The outputs exceed 1.0',
          ],
          correctIndex: 0,
          whyCorrect: 'Larger weights magnify small changes in x, making the sigmoid slope steeper around the boundary.',
          whyIncorrect: 'The output range remains strictly bounded between 0 and 1 regardless of weight scale.',
          lessonConnection: 'Reflects the relationship between weight norm and decision margin sharpness.',
        },
        {
          id: 'rq3',
          question: 'How does Cross-Entropy penalize a model that predicts p = 0.01 when the true label is y = 1?',
          conceptTag: 'loss-functions',
          options: [
            'With an extremely large (approaching infinite) loss penalty: -ln(0.01) ≈ 4.6',
            'With a fixed loss penalty of 0.50',
            'With zero loss because 0.01 is non-negative',
            'By resetting the bias to zero',
          ],
          correctIndex: 0,
          whyCorrect: 'When y = 1, loss is -ln(p). As p → 0, -ln(p) → +∞, harshly penalizing confident wrong predictions.',
          whyIncorrect: 'Loss is not fixed; logarithmic curves scale severely as error diverges.',
          lessonConnection: 'Revisit the Binary Cross-Entropy derivation in Section 2.',
        },
        {
          id: 'rq4',
          question: 'If training accuracy is 99% but validation accuracy is only 64%, what is the most likely diagnosis?',
          conceptTag: 'overfitting',
          options: [
            'The model is severely overfitting the training data',
            'The learning rate is too low',
            'The model is underfitting due to insufficient capacity',
            'The Sigmoid function has numerical underflow',
          ],
          correctIndex: 0,
          whyCorrect: 'A wide gap between training and validation accuracy is the definitive hallmark of overfitting.',
          whyIncorrect: 'Underfitting yields low training accuracy as well as low validation accuracy.',
          lessonConnection: 'Connects to Generalization and Validation checks.',
        },
      ],
      recoveryNotes: {
        'decision-boundary': 'Remember: z = wᵀx + b is the linear score. The boundary is at z = 0 where σ(0) = 0.50.',
        'loss-functions': 'Binary cross-entropy: -[y ln(p) + (1-y) ln(1-p)]. Strictly convex, preventing flat gradient stalls.',
        'overfitting': 'Overfitting occurs when high model capacity memorizes training noise instead of generalizing invariants.',
      },
    };
  }

  // 2. Deep Learning: Multi-Layer Perceptrons & Backpropagation
  if (conceptId === 'deep-learning') {
    return {
      id: 'dl-01-mlp-backprop',
      conceptId: 'deep-learning',
      title: 'Multi-Layer Perceptrons & The Backpropagation Algorithm',
      subtitle: 'Overcoming linear separability through computational graphs and the chain rule',
      estimatedReadTime: '9 min read',
      personalizationNote: hasLossGap
        ? 'Personalized focus: High emphasis on gradient backpropagation flow and avoiding saturated vanishing derivatives.'
        : 'Personalized focus: Geometric representation warping and layer-by-layer affine transformations.',
      intuition: {
        hook: 'In 1969, Minsky and Papert proved that a single-layer perceptron could not even solve a basic XOR problem.',
        whyItExists:
          'A single linear plane cannot separate points when classes crisscross (like XOR). To solve complex natural tasks like speech or vision, we must fold, warp, and transform the feature space through hidden layers with non-linear activation functions.',
        everydayAnalogy:
          'Imagine trying to separate red and blue marbles on a flat sheet of rubber using one straight ruler. If they are interspersed, you cannot do it. But if you lift and stretch the rubber sheet into three dimensions (a hidden layer), a flat slice can easily divide them.',
      },
      coreConcept: {
        definition:
          'A Multi-Layer Perceptron (MLP) cascades affine matrix transformations z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]} followed by non-linear element-wise activations a^{[l]} = σ(z^{[l]}), trained via recursive reverse-mode automatic differentiation (backpropagation).',
        detailedExplanation:
          'The power of deep learning stems from the Universal Approximation Theorem: a network with even one hidden layer and non-linear activations can approximate any continuous function given sufficient width. Training uses backpropagation: computing forward activations to find loss, then applying the chain rule backwards to obtain exact partial derivatives ∂L/∂W in linear time O(|E|).',
      },
      keyTerms: [
        {
          term: 'Hidden Layer',
          definition: 'Intermediate representation layers between input features and output targets.',
          analogy: 'Internal assembly stations in a manufacturing plant where raw materials are reshaped.',
        },
        {
          term: 'Non-Linear Activation',
          definition: 'A function (e.g. ReLU, GELU, Sigmoid) applied element-wise to prevent layers from collapsing into a single linear matrix.',
          analogy: 'A mechanical diode or ratchet that only allows movement in one direction.',
        },
        {
          term: 'Backpropagation',
          definition: 'Efficient application of the multivariate chain rule that computes analytical loss gradients from output back to input.',
          analogy: 'A quality inspector tracing a manufacturing defect backwards through each workstation to adjust calibration.',
        },
      ],
      mathematics: {
        formula: "δ^{[l]} = (W^{[l+1]T} δ^{[l+1]}) ⊙ σ'(z^{[l]}),   ∂L/∂W^{[l]} = δ^{[l]} (a^{[l-1]})^T",
        plainEnglishMeaning:
          'The error δ at layer l is computed by projecting downstream error backwards through transposed weights and multiplying by the local activation derivative.',
        parameterBreakdown: [
          { symbol: "δ^{[l]}", explanation: 'Error sensitivity vector (∂L/∂z^{[l]}) propagating backwards' },
          { symbol: "W^{[l+1]T}", explanation: 'Transposed weight matrix projecting errors back one layer' },
          { symbol: "⊙", explanation: 'Hadamard element-wise multiplication' },
          { symbol: "σ'(z^{[l]})", explanation: 'First derivative of the activation function at the forward pre-activation' },
        ],
        intuitionNote:
          'Because backpropagation caches forward activations, it calculates exact gradients for millions of parameters in a single backward pass rather than evaluating O(N) finite differences.',
      },
      visual: {
        type: 'flowchart',
        title: 'The Neural Forward & Backward Computational Cycle',
        caption: 'Trace the two-phase flow: forward pass for prediction and loss, backward pass for gradient sensitivity updates.',
        whyVisualNeeded: 'Flowcharts clarify the sequential dependencies of computational graphs and automatic differentiation.',
        flowchartData: {
          steps: [
            { stepNumber: 1, title: 'Input Layer x', description: 'Receive normalized batch feature vectors x = a^{[0]}', tag: 'Data' },
            { stepNumber: 2, title: 'Hidden Affine Transform', description: 'Compute pre-activations z^{[1]} = W^{[1]}x + b^{[1]}', tag: 'Linear' },
            { stepNumber: 3, title: 'Non-Linear Activation', description: 'Apply activation a^{[1]} = ReLU(z^{[1]}) to warp feature space', tag: 'Activation' },
            { stepNumber: 4, title: 'Output Prediction & Loss', description: 'Calculate ŷ and evaluate loss L(ŷ, y) via Cross-Entropy', tag: 'Loss' },
            { stepNumber: 5, title: 'Reverse Gradient Backprop', description: 'Propagate δ backwards via chain rule to update W^{[l]} and b^{[l]}', tag: 'Optimization' },
          ],
        },
      },
      workedExample: {
        problemStatement:
          'Consider a single hidden neuron with input x = 2.0, weight w = 1.5, bias b = -1.0, and ReLU activation. If the downstream error gradient δ = 0.4, compute the weight gradient ∂L/∂w.',
        stepByStep: [
          {
            step: 'Forward pass pre-activation z',
            computation: 'z = (1.5 × 2.0) - 1.0 = 3.0 - 1.0 = 2.0',
            insight: 'Since z = 2.0 > 0, the neuron is active and inside the linear regime of ReLU.',
          },
          {
            step: 'ReLU derivative σ\'(z)',
            computation: 'd/dz [ReLU(z)] = 1.0 (for z > 0)',
            insight: 'The activation passes gradients directly without attenuation (unlike Sigmoid).',
          },
          {
            step: 'Compute weight gradient',
            computation: '∂L/∂w = δ × x = 0.4 × 2.0 = 0.8',
            insight: 'With learning rate η = 0.1, the weight will update by w_new = 1.5 - (0.1 × 0.8) = 1.42.',
          },
        ],
        finalOutcome: 'Weight gradient ∂L/∂w = 0.80 computed with exact chain rule precision.',
      },
      realWorldApplication: {
        domain: 'Autonomous Vehicle Perception',
        systemName: 'Multi-Sensor Fusion & Trajectory Planning',
        howItWorks:
          'Deep multi-layer networks process radar point clouds, camera bounding boxes, and velocity tensors to predict vehicle trajectory vectors 5 seconds into the future.',
        concreteImpact: 'Executes end-to-end perception and collision avoidance in under 12 milliseconds.',
      },
      keyTakeaways: [
        'Without non-linear activations, stacking linear layers collapses into a single trivial matrix multiplication W_eff = W₂W₁.',
        'Backpropagation implements reverse-mode automatic differentiation in O(|E|) time using dynamic programming caches.',
        'Modern activations like ReLU and GELU prevent vanishing gradients by maintaining unit gradients across wide active regimes.',
      ],
      practicePreparation:
        'Coming up: test your grasp of chain-rule error propagation, activation derivatives, and why non-linearities are essential.',
      practiceSet: [
        {
          id: 'q1',
          question: 'What happens if a neural network with 5 hidden layers uses only linear activation functions (f(x) = x)?',
          conceptTag: 'neural-networks',
          options: [
            'The entire network mathematically collapses into a single equivalent linear transformation',
            'The network can solve non-linear problems like XOR faster',
            'The loss gradient explodes to infinity immediately',
            'Backpropagation cannot be computed',
          ],
          correctIndex: 0,
          whyCorrect:
            'A product of linear matrices W₅W₄W₃W₂W₁ is simply another single matrix W*. Hidden layers add zero representational capacity without non-linearities.',
          whyIncorrect: 'Linear networks cannot solve non-linear problems regardless of depth.',
          lessonConnection: 'Connects to Section 2: Why Non-Linearities are Indispensable.',
        },
        {
          id: 'q2',
          question: 'Why did the Rectified Linear Unit (ReLU) largely replace Sigmoid in deep hidden layers?',
          conceptTag: 'activation-functions',
          options: [
            'ReLU has a constant derivative of 1.0 for positive inputs, preventing vanishing gradients in deep networks',
            'ReLU is differentiable everywhere including exactly at zero',
            'ReLU produces bounded outputs strictly between 0 and 1',
            'ReLU guarantees that no neuron can ever deactivate',
          ],
          correctIndex: 0,
          whyCorrect:
            'Sigmoid derivatives peak at only 0.25, shrinking gradients exponentially across layers. ReLU keeps derivative 1.0 for z > 0.',
          whyIncorrect: 'ReLU is unbounded and has a non-differentiable corner at z = 0.',
          lessonConnection: 'Review Section 3: Activation Dynamics and Vanishing Gradients.',
        },
        {
          id: 'q3',
          question: 'In backpropagation, what mathematical property enables computing all parameter gradients in a single backward pass?',
          conceptTag: 'backpropagation',
          options: [
            'Caching forward activations and reusing intermediate error terms δ via the multivariate chain rule',
            'Inverting the full weight matrix of each layer using SVD',
            'Running stochastic sampling across each individual weight independently',
            'Setting the loss function second derivative to zero',
          ],
          correctIndex: 0,
          whyCorrect:
            'Dynamic programming reuses downstream error vectors δ, computing partial derivatives for every layer in O(|E|) time.',
          whyIncorrect: 'Matrix inversion is computationally prohibitive (O(N³)) and unnecessary for gradient descent.',
          lessonConnection: 'Connects to Section 3: Computational Graphs and Chain Rule.',
        },
        {
          id: 'q4',
          question: 'What is a "Dead ReLU" and how does it occur?',
          conceptTag: 'activation-functions',
          options: [
            'A neuron whose pre-activation z is always negative, causing gradient 0 and freezing weight updates permanently',
            'A neuron with weights that have grown to positive infinity',
            'A layer that has fewer neurons than the input dimension',
            'A neuron that alternates randomly between 0 and 1',
          ],
          correctIndex: 0,
          whyCorrect:
            'When z < 0, ReLU output is 0 and its derivative is 0. If a large gradient knocks weights into a region where z is always negative, the neuron never updates again.',
          whyIncorrect: 'Exploding weights cause NaN values, not dead neurons with zero gradient.',
          lessonConnection: 'Connects to Section 4: Practical Traps in Deep Architecture Design.',
        },
      ],
      recoveryPracticeSet: [
        {
          id: 'rq1',
          question: 'What is the derivative of the ReLU function for an input z = 3.5?',
          conceptTag: 'activation-functions',
          options: ['1.0', '3.5', '0.0', '0.5'],
          correctIndex: 0,
          whyCorrect: 'For any positive input z > 0, the derivative of ReLU(z) = z is exactly 1.0.',
          whyIncorrect: 'The output is 3.5, but its derivative is 1.0.',
          lessonConnection: 'Revisit the ReLU derivative definition in the worked example.',
        },
        {
          id: 'rq2',
          question: 'What is the primary role of the bias vector b in a dense neural layer?',
          conceptTag: 'neural-networks',
          options: [
            'It shifts the activation function horizontally, allowing boundaries not passing through origin',
            'It normalizes input variance to 1.0',
            'It prevents the matrix from having negative eigenvalues',
            'It eliminates the need for activation functions',
          ],
          correctIndex: 0,
          whyCorrect: 'Without bias, the activation plane is pinned to the coordinate origin (0, 0).',
          whyIncorrect: 'Normalization is done by Batch/Layer Norm, not the raw bias vector.',
          lessonConnection: 'Review the affine equation z = Wx + b.',
        },
        {
          id: 'rq3',
          question: 'How does backpropagation compute the gradient of a composite function f(g(x))?',
          conceptTag: 'backpropagation',
          options: [
            'By the chain rule: f\'(g(x)) · g\'(x)',
            'By computing the arithmetic average (f\' + g\') / 2',
            'By computing only f\' and ignoring g',
            'By taking the reciprocal 1 / (f\' · g\')',
          ],
          correctIndex: 0,
          whyCorrect: 'The fundamental multivariate chain rule multiplies outer derivative by inner derivative.',
          whyIncorrect: 'Derivatives multiply under composition, they never average.',
          lessonConnection: 'Revisit Section 3: Multivariate Chain Rule.',
        },
        {
          id: 'rq4',
          question: 'Why does Leaky ReLU help mitigate the "Dead ReLU" problem?',
          conceptTag: 'activation-functions',
          options: [
            'It provides a small non-zero slope (e.g. 0.01) for negative inputs so gradients never completely vanish',
            'It forces all outputs to be positive',
            'It bounds outputs between -1 and 1',
            'It eliminates the need for backpropagation',
          ],
          correctIndex: 0,
          whyCorrect: 'With slope α > 0 for z < 0, neurons can still recover from negative activations.',
          whyIncorrect: 'Leaky ReLU produces negative outputs, not strictly positive ones.',
          lessonConnection: 'Review activation improvements in Section 4.',
        },
      ],
      recoveryNotes: {
        'activation-functions': 'Remember: ReLU(z) = max(0, z). Derivative is 1 for z > 0, and 0 for z < 0.',
        'backpropagation': 'Backprop is the chain rule in reverse: error δ is multiplied by local activation derivatives.',
        'neural-networks': 'Without non-linear activations, depth is meaningless because stacked matrices multiply into one linear map.',
      },
    };
  }

  // 3. Fallback for other AI/ML concepts (Transformers, Optimization, etc.)
  return {
    id: `${conceptId}-foundations`,
    conceptId,
    title: `${params.conceptName}: Core Principles & Mechanics`,
    subtitle: 'Bridging foundational theory with mathematical rigor and practical engineering',
    estimatedReadTime: '7 min read',
    personalizationNote: `Customized based on your diagnostic evaluation score of ${studentState.diagnosticScore}%.`,
    intuition: {
      hook: `Why do modern AI systems depend fundamentally on ${params.conceptName}?`,
      whyItExists:
        'Traditional heuristic algorithms fail when faced with high-dimensional natural data. Modern learning systems formulate statistical objectives and optimize continuous parameter manifolds to achieve generalization.',
      everydayAnalogy:
        'Like tuning a master sound mixing console with thousands of dials until the audio output matches the original recording perfectly.',
    },
    coreConcept: {
      definition: `${params.conceptName} establishes computational representations and learning dynamics to minimize expected empirical risk.`,
      detailedExplanation:
        'By framing problems as optimization over continuous hypothesis spaces, gradient-based methods iteratively discover invariant latent features that generalize to unseen inputs.',
    },
    keyTerms: [
      {
        term: 'Hypothesis Space',
        definition: 'The set of all possible mapping functions parameterized by model weights.',
        analogy: 'The set of all possible musical chords that can be played on a piano.',
      },
      {
        term: 'Empirical Risk',
        definition: 'The average loss computed over the observed training samples.',
        analogy: 'The test score on practice exams before taking the final qualification.',
      },
      {
        term: 'Generalization Gap',
        definition: 'The difference in performance between training data and novel out-of-sample data.',
        analogy: 'The difference between doing well on familiar homework vs solving an unfamiliar contest question.',
      },
    ],
    mathematics: {
      formula: 'θ* = argmin_{θ} (1/N) ∑ L(f(x_i; θ), y_i) + λ Ω(θ)',
      plainEnglishMeaning:
        'Optimal parameters minimize average training loss plus a regularization penalty that controls model complexity.',
      parameterBreakdown: [
        { symbol: 'θ', explanation: 'Model parameters to be optimized' },
        { symbol: 'L', explanation: 'Task-specific loss function measuring discrepancy' },
        { symbol: 'Ω(θ)', explanation: 'Complexity regularizer preventing overfitting' },
        { symbol: 'λ', explanation: 'Hyperparameter trading off training fit against model simplicity' },
      ],
      intuitionNote: 'Balancing the empirical loss with the regularizer achieves optimal bias-variance tradeoff.',
    },
    visual: {
      type: 'table',
      title: 'Structural Trade-Off Comparison',
      caption: 'Comparing classical heuristic baselines against learned parametric representations.',
      whyVisualNeeded: 'A structured matrix clearly lays out the pros and cons across scale and latency.',
      tableData: {
        headers: ['Property', 'Heuristic / Rule-Based', 'Learned Parametric Model'],
        rows: [
          ['Feature Extraction', 'Manual domain engineering', 'Learned end-to-end representations'],
          ['Scalability with Data', 'Plateaus quickly', 'Scales power-law with compute & data'],
          ['Generalization', 'Brittle to distribution shift', 'Extracts robust semantic invariants'],
          ['Inference Latency', 'O(1) logic checks', 'Matrix multiplication throughput'],
        ],
      },
    },
    workedExample: {
      problemStatement: 'Evaluate the objective value given training loss 0.25, L2 weight norm ||θ||² = 10, and λ = 0.01.',
      stepByStep: [
        {
          step: 'Compute regularization penalty',
          computation: 'λ Ω(θ) = 0.01 × 10 = 0.10',
          insight: 'The complexity penalty contributes 0.10 to the total objective.',
        },
        {
          step: 'Compute total objective',
          computation: 'Objective = 0.25 + 0.10 = 0.35',
          insight: 'The optimizer minimizes this combined total rather than raw loss alone.',
        },
      ],
      finalOutcome: 'Total regularized objective equals 0.35.',
    },
    realWorldApplication: {
      domain: 'Production AI Infrastructure',
      systemName: 'Real-Time Recommendation & Prediction Engine',
      howItWorks:
        'Processes streaming telemetry to recommend actions with sub-50ms latency across millions of concurrent users.',
      concreteImpact: 'Improves downstream system prediction accuracy by 28% over static rules.',
    },
    keyTakeaways: [
      'Empirical risk minimization guides parameter updates toward optimal generalization.',
      'Regularization controls hypothesis capacity to prevent memorizing dataset noise.',
      'Representational learning eliminates the need for manual feature crafting.',
    ],
    practicePreparation: 'Prepare to answer questions testing your understanding of empirical risk and generalization.',
    practiceSet: [
      {
        id: 'q1',
        question: 'What is the primary role of the regularization term λ Ω(θ) in the optimization objective?',
        conceptTag: 'generalization',
        options: [
          'To penalize model complexity and prevent overfitting',
          'To double the training speed',
          'To replace the loss function entirely',
          'To ensure training loss drops to exactly zero',
        ],
        correctIndex: 0,
        whyCorrect: 'Regularization penalizes overly complex weights, constraining the model to simpler solutions that generalize.',
        whyIncorrect: 'Regularization does not increase training speed and often slightly increases training loss.',
        lessonConnection: 'Connects to Section 3: Empirical Risk Formulation.',
      },
      {
        id: 'q2',
        question: 'What is the "generalization gap"?',
        conceptTag: 'generalization',
        options: [
          'The performance difference between training data and unseen test data',
          'The time difference between training and inference',
          'The difference between floating point and integer quantization',
          'The gap between CPU and GPU memory bandwidth',
        ],
        correctIndex: 0,
        whyCorrect: 'It measures how much worse the model performs on novel test data compared to familiar training data.',
        whyIncorrect: 'Hardware bandwidth or execution time are engineering metrics, not the generalization gap.',
        lessonConnection: 'Review Key Terms in Section 2.',
      },
      {
        id: 'q3',
        question: 'Why do learned models scale better than manual heuristic rules on complex data?',
        conceptTag: 'generalization',
        options: [
          'They extract hierarchical invariants directly from data as compute and sample count increase',
          'They require zero memory during inference',
          'They are immune to noisy data',
          'They do not use linear algebra operations',
        ],
        correctIndex: 0,
        whyCorrect: 'Deep representations scale with data volume, discovering patterns human rule designers cannot encode.',
        whyIncorrect: 'Learned models still require memory and are susceptible to noise without clean datasets.',
        lessonConnection: 'Refer to the comparison table in Section 4.',
      },
    ],
    recoveryPracticeSet: [
      {
        id: 'rq1',
        question: 'If λ = 0 in the objective function, what risk does the model face?',
        conceptTag: 'generalization',
        options: [
          'High risk of overfitting to training noise',
          'Immediate gradient explosion',
          'Zero model capacity',
          'Underfitting on simple data',
        ],
        correctIndex: 0,
        whyCorrect: 'Without regularization penalty (λ = 0), complex models will fit training noise without constraint.',
        whyIncorrect: 'Underfitting happens when capacity is too low, not when regularization is zero.',
        lessonConnection: 'Review the regularization trade-off in the worked example.',
      },
      {
        id: 'rq2',
        question: 'What does empirical risk measure?',
        conceptTag: 'generalization',
        options: [
          'Average loss over observed training samples',
          'The variance of the GPU memory clocks',
          'The number of layers in the model',
          'The training dataset storage size',
        ],
        correctIndex: 0,
        whyCorrect: 'Empirical risk is the mean error across the training dataset samples.',
        whyIncorrect: 'Storage size or GPU clocks are hardware parameters.',
        lessonConnection: 'Review Section 3: Governing Formulation.',
      },
      {
        id: 'rq3',
        question: 'When should a visual explanation be included in an educational lesson?',
        conceptTag: 'generalization',
        options: [
          'When it directly clarifies geometry, mathematical relationships, or algorithmic flow',
          'Automatically on every single sentence',
          'Only when using 3D particle animations',
          'Never, text is always superior',
        ],
        correctIndex: 0,
        whyCorrect: 'Visuals must directly support comprehension of equations, manifolds, or multi-step processes.',
        whyIncorrect: 'Random decorative visuals add noise without improving learning.',
        lessonConnection: 'Reflects the LOGIQ pedagogical visual engine principle.',
      },
    ],
    recoveryNotes: {
      generalization: 'Generalization is the core goal of machine learning: performing accurately on unseen future data.',
    },
  };
}

// -------------------------------------------------------------
// Live LLM API Request (Gemini / Configurable)
// -------------------------------------------------------------
async function fetchFromGeminiAPI(
  config: LLMConfig,
  params: LessonGenerationParams
): Promise<StructuredLessonData> {
  const model = config.model || 'gemini-2.5-flash';
  const apiKey = config.apiKey;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const systemInstruction = `You are a distinguished, award-winning Stanford/MIT Computer Science Professor specializing in Artificial Intelligence and Machine Learning.
You are teaching a motivated student named Alex.
Your explanations are:
1. Student-friendly, human-readable, and clear about WHY a concept exists, not just WHAT it is.
2. Structured from Intuition -> Core Concept -> Key Technical Terms -> Mathematical Mechanics -> Visual Specification -> Worked Example -> Real-World Application -> Key Takeaways -> Practice Questions.
3. Accurate and mathematically sound without unnecessary walls of text or academic jargon.
4. Dynamically choosing whether a visual is needed:
   - "graph": for mathematical relationships, sigmoid curves, loss curves, decision boundaries.
   - "flowchart": for pipelines, training loops, algorithmic steps.
   - "diagram": for neural layers, multi-head attention projections, architectures.
   - "table": for algorithm/concept comparisons.
   - "none": if an abstract visual does not genuinely improve comprehension.
5. Returning strictly valid JSON adhering to the specified schema.`;

  const prompt = `Generate a complete, deeply educational structured lesson for the topic: "${params.lessonTitle}" in the concept domain "${params.conceptName}" (${params.conceptId}).

Student Personalization Context:
- Diagnostic Score: ${params.studentState.diagnosticScore}% (${params.studentState.diagnosticLevel})
- Weak concepts to reinforce: ${params.studentState.diagnosticGaps.join(', ') || 'None identified'}
- Selected concepts: ${params.studentState.selectedConcepts.join(', ')}

Please return a JSON object with this exact structure:
{
  "id": "${params.conceptId}-lesson-1",
  "conceptId": "${params.conceptId}",
  "title": "${params.lessonTitle}",
  "subtitle": "Clear, engaging subtitle",
  "estimatedReadTime": "8 min read",
  "personalizationNote": "Note explaining what was emphasized based on student gaps",
  "intuition": {
    "hook": "Compelling real-world hook",
    "whyItExists": "Why computer scientists created this concept",
    "everydayAnalogy": "Intuitive physical analogy"
  },
  "coreConcept": {
    "definition": "Precise one-sentence definition",
    "detailedExplanation": "Clear, pedagogical explanation in 2-3 focused paragraphs"
  },
  "keyTerms": [
    { "term": "Term Name", "definition": "Clear definition", "analogy": "Memorable analogy" }
  ],
  "mathematics": {
    "formula": "Governing mathematical equation",
    "plainEnglishMeaning": "What the equation says in plain English",
    "parameterBreakdown": [
      { "symbol": "w", "explanation": "Weight vector" }
    ],
    "intuitionNote": "Why this formula behaves the way it does"
  },
  "visual": {
    "type": "graph", // or "diagram", "flowchart", "table", "none"
    "title": "Visual Title",
    "caption": "Pedagogical caption explaining the visual",
    "whyVisualNeeded": "Why this visual aids understanding",
    "graphData": {
      "kind": "sigmoid", // or "loss-curve", "decision-boundary", "gradient-descent"
      "title": "Curve Name",
      "xLabel": "X Axis",
      "yLabel": "Y Axis",
      "curveFormula": "Formula",
      "initialValue": 0.0
    }
  },
  "workedExample": {
    "problemStatement": "Concrete numerical problem",
    "stepByStep": [
      { "step": "Step 1", "computation": "Math calculation", "insight": "Why this matters" }
    ],
    "finalOutcome": "Final answer"
  },
  "realWorldApplication": {
    "domain": "Domain Name",
    "systemName": "System Name",
    "howItWorks": "How it works in production",
    "concreteImpact": "Measurable benchmark impact"
  },
  "keyTakeaways": [
    "Takeaway 1", "Takeaway 2", "Takeaway 3"
  ],
  "practicePreparation": "Encouraging lead-in to practice test",
  "practiceSet": [
    {
      "id": "q1",
      "question": "Question text testing deep understanding",
      "conceptTag": "concept-tag",
      "options": ["Correct Option", "Distractor 1", "Distractor 2", "Distractor 3"],
      "correctIndex": 0,
      "whyCorrect": "Pedagogical explanation of why this is correct",
      "whyIncorrect": "Why other options fail",
      "lessonConnection": "How it connects back to lesson text"
    }
  ],
  "recoveryPracticeSet": [
    {
      "id": "rq1",
      "question": "Alternative question text testing same concepts",
      "conceptTag": "concept-tag",
      "options": ["Correct Option", "Distractor 1", "Distractor 2", "Distractor 3"],
      "correctIndex": 0,
      "whyCorrect": "Why correct",
      "whyIncorrect": "Why incorrect",
      "lessonConnection": "Connection"
    }
  ],
  "recoveryNotes": {
    "concept-tag": "Targeted recovery tip"
  }
}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('No candidate content returned from Gemini API');
  }

  const parsed = JSON.parse(rawText) as StructuredLessonData;
  return parsed;
}

// -------------------------------------------------------------
// Main Orchestrator: Generate Structured Lesson
// -------------------------------------------------------------
export async function generateStructuredLesson(
  params: LessonGenerationParams
): Promise<{ lesson: StructuredLessonData; source: 'llm-live' | 'curated-synthesis' }> {
  const config = getLLMConfig();

  // If user provided a live API key and provider is Gemini
  if (config.apiKey && config.apiKey.trim().length > 8 && config.provider === 'gemini') {
    try {
      const liveLesson = await fetchFromGeminiAPI(config, params);
      return { lesson: liveLesson, source: 'llm-live' };
    } catch (err) {
      console.warn('Live LLM generation failed or timed out. Falling back to offline synthesis engine:', err);
    }
  }

  // Fallback to high-fidelity personalized synthesis engine
  const synthesized = synthesizeOfflineLesson(params);
  return { lesson: synthesized, source: 'curated-synthesis' };
}
