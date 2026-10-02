import { AIMLConcept, DiagnosticQuestion, LearningNode } from '../types';

export const AIML_CONCEPTS: AIMLConcept[] = [
  {
    id: 'ml-math',
    name: 'ML Mathematics / Foundations',
    category: 'Foundations',
    description: 'Linear algebra, vector calculus, matrix decompositions, and probability distributions essential for AI modeling.',
    skills: ['Eigenvalues & SVD', 'Gradient Vectors', 'Probability Densities', 'Multivariate Normal'],
    complexity: 'foundational',
    breadthWeight: 2,
    isPopular: true,
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Core Algorithms',
    description: 'Supervised classification, regularized regression, gradient-boosted trees, and unsupervised clustering.',
    skills: ['Logistic Regression', 'XGBoost & LightGBM', 'Decision Boundaries', 'K-Means & DBSCAN'],
    complexity: 'broad_complex',
    breadthWeight: 3,
    isPopular: true,
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'Neural Systems',
    description: 'Multi-layer neural networks, backpropagation calculus, optimization dynamics, and convolutional feature extractors.',
    skills: ['Backpropagation', 'Activation Functions', 'Loss Landscapes', 'CNN Architectures'],
    complexity: 'broad_complex',
    breadthWeight: 3,
    isPopular: true,
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing (NLP)',
    category: 'Language Modeling',
    description: 'Text representation, subword tokenization, word vector embeddings, sequence tagging, and semantic parsing.',
    skills: ['Tokenization (BPE)', 'Word2Vec & GloVe', 'Seq2Seq Modeling', 'Embedding Spaces'],
    complexity: 'moderate',
    breadthWeight: 2,
  },
  {
    id: 'genai-llms',
    name: 'Generative AI / LLMs',
    category: 'Modern Generative AI',
    description: 'Transformer architectures, multi-head self-attention, autoregressive decoders, LoRA fine-tuning, and alignment.',
    skills: ['Self-Attention Mechanism', 'Transformer Blocks', 'PEFT & LoRA', 'RLHF & DPO'],
    complexity: 'broad_complex',
    breadthWeight: 3,
    isPopular: true,
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'Autonomous Systems',
    description: 'Autonomous reasoning loops (ReAct), multi-agent coordination frameworks, tool-use execution, and long-term memory.',
    skills: ['ReAct Reasoning', 'Tool Calling & APIs', 'Multi-Agent Routing', 'Memory Management'],
    complexity: 'broad_complex',
    breadthWeight: 3,
    isPopular: true,
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    category: 'Visual Intelligence',
    description: 'Image processing, spatial convolutions, object detection (YOLO), image segmentation, and Vision Transformers (ViT).',
    skills: ['Spatial Convolutions', 'Object Detection', 'Semantic Segmentation', 'Vision Transformers'],
    complexity: 'moderate',
    breadthWeight: 2,
  },
  {
    id: 'reinforcement-learning',
    name: 'Reinforcement Learning',
    category: 'Decision Optimization',
    description: 'Markov decision processes, Bellman optimality, temporal-difference learning, policy gradients, and PPO.',
    skills: ['Markov Decision Processes', 'Q-Learning & DQN', 'Policy Gradients (PPO)', 'Reward Modeling'],
    complexity: 'broad_complex',
    breadthWeight: 2,
  },
];

// Rich Curated Diagnostic Question Pool (6 authentic questions per concept: 3 foundational, 3 intermediate)
export const DIAGNOSTIC_QUESTION_POOL: DiagnosticQuestion[] = [
  // --- ML Mathematics / Foundations ---
  {
    id: 101,
    conceptId: 'ml-math',
    difficulty: 'foundational',
    question: 'When computing gradients for gradient descent, what mathematical entity represents the vector of all first-order partial derivatives of a scalar loss function?',
    options: [
      'The Gradient Vector (∇f)',
      'The Hessian Matrix',
      'The Jacobian Determinant',
      'The Trace Operator',
    ],
    correctIndex: 0,
    explanation: 'The gradient vector ∇f contains all first-order partial derivatives and points in the direction of steepest ascent on the scalar loss surface.',
  },
  {
    id: 102,
    conceptId: 'ml-math',
    difficulty: 'foundational',
    question: 'In Principal Component Analysis (PCA), what property do the eigenvectors of the data covariance matrix represent?',
    options: [
      'The orthogonal directions of maximum variance across the feature dataset',
      'The residual reconstruction error between clusters',
      'The learning rate multipliers for gradient steps',
      'The L1-norm sparsity boundaries of independent variables',
    ],
    correctIndex: 0,
    explanation: 'The eigenvectors of the covariance matrix define the orthogonal principal axes along which the data exhibits maximum variance.',
  },
  {
    id: 103,
    conceptId: 'ml-math',
    difficulty: 'intermediate',
    question: 'What information does the Hessian matrix provide during optimization?',
    codeSnippet: 'H_ij = ∂²f / (∂x_i ∂x_j)',
    options: [
      'Second-order curvature of the loss surface to determine local convexity and step conditioning',
      'The probability that gradient descent will overshoot the global minimum',
      'The singular values required to normalize raw input vectors',
      'The sparsity ratio of inactive weights in hidden layers',
    ],
    correctIndex: 0,
    explanation: 'The Hessian matrix captures second-order partial derivatives, quantifying curvature and indicating whether a critical point is a local minimum, maximum, or saddle point.',
  },
  {
    id: 104,
    conceptId: 'ml-math',
    difficulty: 'intermediate',
    question: 'Why is a strictly convex loss function desirable in machine learning optimization?',
    options: [
      'Any local minimum is guaranteed to be the unique global minimum',
      'It allows training without computing any gradients',
      'It guarantees that training loss drops to exactly zero in one step',
      'It makes the model immune to noisy training data',
    ],
    correctIndex: 0,
    explanation: 'Convex functions have the key mathematical property that any stationary point or local minimum is guaranteed to be a global minimum.',
  },
  {
    id: 105,
    conceptId: 'ml-math',
    difficulty: 'foundational',
    question: 'What is the primary role of Singular Value Decomposition (SVD) in dimensionality reduction?',
    codeSnippet: 'A = U Σ V^T',
    options: [
      'Factorizes a matrix into singular vectors and singular values to compute optimal low-rank approximations',
      'Transforms non-linear boundaries into linear decision surfaces',
      'Inverts non-invertible square matrices without numerical precision loss',
      'Normalizes feature values between 0 and 1',
    ],
    correctIndex: 0,
    explanation: 'SVD decomposes matrix A into orthogonal matrices U, V and diagonal matrix Σ containing singular values, enabling low-rank truncation.',
  },
  {
    id: 106,
    conceptId: 'ml-math',
    difficulty: 'intermediate',
    question: 'In Bayesian machine learning, what does Bayes\' theorem calculate?',
    codeSnippet: 'P(θ | D) = P(D | θ) * P(θ) / P(D)',
    options: [
      'The posterior probability of model parameters θ conditioned on observed data D',
      'The frequentist p-value of a null hypothesis',
      'The upper bound on generalization error across unseen test distributions',
      'The exact learning rate decay schedule for stochastic gradient descent',
    ],
    correctIndex: 0,
    explanation: 'Bayes\' theorem updates prior parameter beliefs P(θ) using data likelihood P(D|θ) to compute the full posterior distribution P(θ|D).',
  },

  // --- Machine Learning ---
  {
    id: 201,
    conceptId: 'machine-learning',
    difficulty: 'foundational',
    question: 'In fraud detection with a 99.8% majority class (imbalanced data), why is raw Accuracy misleading?',
    options: [
      'A trivial classifier predicting 100% negative achieves 99.8% accuracy without identifying any fraud',
      'Accuracy cannot be mathematically computed when class proportions are unequal',
      'Accuracy is non-differentiable with respect to feature weights',
      'Accuracy assumes a normal distribution across independent variables',
    ],
    correctIndex: 0,
    explanation: 'With heavy class skew, a degenerate model that predicts the negative class unconditionally achieves 99.8% accuracy while failing completely on positive detection. PR-AUC or F-beta are required.',
  },
  {
    id: 202,
    conceptId: 'machine-learning',
    difficulty: 'foundational',
    question: 'What is the fundamental difference between L1 (Lasso) and L2 (Ridge) regularization?',
    options: [
      'L1 penalizes absolute weights and drives coefficients to exact zero (sparsity); L2 penalizes squared weights and shrinks them toward zero',
      'L1 only applies to regression, while L2 only applies to classification',
      'L2 creates sparse feature selection, while L1 prevents gradient descent from overshooting',
      'L1 doubles training time, while L2 eliminates all bias',
    ],
    correctIndex: 0,
    explanation: 'L1 regularization produces sparse models by driving less useful parameter weights to exactly zero, performing embedded feature selection. L2 shrinks weights smoothly without zeroing them.',
  },
  {
    id: 203,
    conceptId: 'machine-learning',
    difficulty: 'intermediate',
    question: 'When a model exhibits High Variance (Overfitting), which remediation strategy is most appropriate?',
    options: [
      'Increase regularization penalty or acquire more diverse training examples',
      'Increase model complexity by adding polynomial interaction terms',
      'Decrease regularization and remove early stopping',
      'Train for twice as many epochs without validation checks',
    ],
    correctIndex: 0,
    explanation: 'High variance indicates the model is fitting training set noise. Increasing regularization, pruning trees, or gathering more training data constrains model variance.',
  },
  {
    id: 204,
    conceptId: 'machine-learning',
    difficulty: 'foundational',
    question: 'How does Random Forest reduce variance compared to an individual deep Decision Tree?',
    options: [
      'By averaging predictions across an ensemble of decorrelated trees trained on bootstrap samples with random feature subsets',
      'By iteratively fitting trees to the residuals of previous trees',
      'By converting all continuous features into binary indicator variables',
      'By forcing every tree to share identical splitting thresholds',
    ],
    correctIndex: 0,
    explanation: 'Random Forest leverages Bagging (Bootstrap Aggregation) + random subspace feature selection to decorrelate individual trees, reducing ensemble variance when averaging predictions.',
  },
  {
    id: 205,
    conceptId: 'machine-learning',
    difficulty: 'intermediate',
    question: 'Why are feature values typically standardized (e.g. mean 0, variance 1) before training distance-based algorithms like SVM or K-Means?',
    options: [
      'To prevent features with large numerical magnitudes from dominating Euclidean distance calculations',
      'To ensure all categorical variables are converted into integers',
      'Because gradient descent cannot converge on unnormalized integer values',
      'To eliminate all collinearity between independent features',
    ],
    correctIndex: 0,
    explanation: 'Distance calculations are scale-dependent. Without standardization, a feature measured in thousands (e.g. salary) dwarfs a feature measured in units (e.g. age).',
  },
  {
    id: 206,
    conceptId: 'machine-learning',
    difficulty: 'intermediate',
    question: 'What is the objective function optimized in Gradient Boosted Decision Trees (GBDT)?',
    options: [
      'Each new tree is trained to predict the negative gradient (pseudo-residuals) of the loss function of the current ensemble',
      'Each new tree is trained on an independent uniform sample of original targets',
      'Trees minimize the mutual information between feature columns',
      'Trees maximize the intra-cluster distance in unsupervised space',
    ],
    correctIndex: 0,
    explanation: 'GBDT builds trees sequentially, where each base learner fits the pseudo-residuals (negative gradient of the loss) with respect to the existing ensemble predictions.',
  },

  // --- Deep Learning ---
  {
    id: 301,
    conceptId: 'deep-learning',
    difficulty: 'foundational',
    question: 'Why did ReLU (Rectified Linear Unit) largely replace Sigmoid activations in hidden layers of deep networks?',
    codeSnippet: 'f(x) = max(0, x)',
    options: [
      'Its derivative is 1 for positive inputs, eliminating the vanishing gradient problem in deep stacks',
      'ReLU outputs smooth bounded probabilities between 0 and 1',
      'ReLU is completely differentiable at zero',
      'ReLU prevents overparameterization in convolutional networks',
    ],
    correctIndex: 0,
    explanation: 'Sigmoid derivatives saturate near 0 for high or low inputs (max derivative 0.25), causing gradients to vanish through backprop. ReLU maintains unit gradient for positive activations.',
  },
  {
    id: 302,
    conceptId: 'deep-learning',
    difficulty: 'foundational',
    question: 'How does Dropout regularization operate during training versus inference?',
    options: [
      'Randomly zeroes out activations during training with probability p; during inference all neurons are active and scaled by (1 - p)',
      'Permanently deletes weights that have small magnitude gradients',
      'Drops the final output layer during backpropagation',
      'Activates dropout exclusively on test data to simulate noise',
    ],
    correctIndex: 0,
    explanation: 'Dropout prevents co-adaptation of neurons by randomly zeroing units during training, and scales activations during inference to match expected values.',
  },
  {
    id: 303,
    conceptId: 'deep-learning',
    difficulty: 'intermediate',
    question: 'What is the primary mechanism of Batch Normalization in deep feed-forward networks?',
    options: [
      'Normalizes layer inputs across the mini-batch to zero mean and unit variance, followed by learnable scale (γ) and shift (β) parameters',
      'Normalizes weights to have unit L2 norm before each forward pass',
      'Eliminates the need for computing backpropagation gradients',
      'Ensures mini-batches contain an equal number of classes',
    ],
    correctIndex: 0,
    explanation: 'Batch Normalization stabilizes layer input distributions across mini-batches, smoothing the optimization landscape and allowing higher learning rates.',
  },
  {
    id: 304,
    conceptId: 'deep-learning',
    difficulty: 'intermediate',
    question: 'How does the Adam optimizer combine the principles of Momentum and RMSprop?',
    options: [
      'It tracks exponentially decaying averages of both past gradients (momentum) and past squared gradients (adaptive learning rates)',
      'It computes the exact second derivative (Hessian) for every weight',
      'It alternates between stochastic gradient descent and genetic algorithms',
      'It eliminates hyperparameter tuning for learning rate',
    ],
    correctIndex: 0,
    explanation: 'Adam computes adaptive learning rates for each parameter by maintaining estimates of first moments (mean gradient) and second moments (uncentered variance of gradients).',
  },
  {
    id: 305,
    conceptId: 'deep-learning',
    difficulty: 'foundational',
    question: 'In deep recurrent architectures (RNNs), what specific issue do LSTMs and GRUs solve via gating mechanisms?',
    options: [
      'The vanishing/exploding gradient problem across long sequential time steps',
      'The inability to process numerical continuous data',
      'The quadratic attention computation bottleneck',
      'The requirement for labeled target supervision',
    ],
    correctIndex: 0,
    explanation: 'Standard RNNs struggle to preserve long-range dependencies due to repeated matrix multiplications. LSTM gates regulate linear cell memory paths, preserving gradients across long horizons.',
  },
  {
    id: 306,
    conceptId: 'deep-learning',
    difficulty: 'intermediate',
    question: 'What is Gradient Clipping and why is it employed during backpropagation in deep networks?',
    options: [
      'Rescales gradients whose norm exceeds a threshold to prevent exploding gradients and numerical NaN instabilities',
      'Zeroes out negative gradients to enforce monotonic weight growth',
      'Truncates input token sequences to fit hardware memory limits',
      'Clips learning rates to zero when validation loss stops improving',
    ],
    correctIndex: 0,
    explanation: 'When gradients grow excessively large, taking a step can launch weights into extreme regions of loss space. Gradient clipping caps the norm to preserve step stability.',
  },

  // --- NLP (Natural Language Processing) ---
  {
    id: 401,
    conceptId: 'nlp',
    difficulty: 'foundational',
    question: 'What key problem does Byte-Pair Encoding (BPE) subword tokenization solve in modern NLP models?',
    options: [
      'It resolves out-of-vocabulary (OOV) words by splitting rare tokens into frequent subword units',
      'It eliminates the need for token embedding matrices',
      'It guarantees grammatically correct text generation',
      'It automatically translates text between languages without training',
    ],
    correctIndex: 0,
    explanation: 'BPE iteratively merges frequent character pairs, forming a compact vocabulary that can represent any novel or rare word as a sequence of known subwords.',
  },
  {
    id: 402,
    conceptId: 'nlp',
    difficulty: 'foundational',
    question: 'What distinguishes Word2Vec Skip-gram from Continuous Bag of Words (CBOW)?',
    options: [
      'Skip-gram predicts surrounding context words given a target word; CBOW predicts the target word from surrounding context words',
      'Skip-gram is supervised, while CBOW is completely unsupervised',
      'CBOW uses self-attention, while Skip-gram uses recurrent hidden states',
      'Skip-gram cannot handle words with multiple meanings',
    ],
    correctIndex: 0,
    explanation: 'Skip-gram takes a single center word and learns embeddings that maximize the log probability of observing context words in its window; CBOW does the reverse.',
  },
  {
    id: 403,
    conceptId: 'nlp',
    difficulty: 'intermediate',
    question: 'Why is Cosine Similarity preferred over Euclidean Distance when comparing dense semantic text embeddings?',
    options: [
      'It measures angular orientation regardless of vector magnitude, making comparison invariant to document length or norm differences',
      'Cosine similarity is always computationally faster to compute than dot products',
      'Euclidean distance only works on binary vectors',
      'Cosine similarity scales exponentially with vocabulary size',
    ],
    correctIndex: 0,
    explanation: 'Cosine similarity normalizes for embedding length, isolating direction in semantic space. Two text vectors with similar semantic concepts point in the same direction even if their lengths differ.',
  },
  {
    id: 404,
    conceptId: 'nlp',
    difficulty: 'foundational',
    question: 'In language modeling, what is the role of Positional Encodings in Transformer architectures?',
    options: [
      'Injects sequence order information into token embeddings because self-attention is permutation-invariant',
      'Encodes part-of-speech tags into hidden representations',
      'Compresses token sequences to fit fixed GPU cache lines',
      'Normalizes token frequencies across long documents',
    ],
    correctIndex: 0,
    explanation: 'Self-attention computes dot products across all pairs symmetrically without inherent knowledge of token sequence order. Positional encodings provide crucial position signals.',
  },
  {
    id: 405,
    conceptId: 'nlp',
    difficulty: 'intermediate',
    question: 'What is the computational complexity of standard self-attention with respect to input sequence length N?',
    options: [
      'O(N²) in both time and memory due to the full N × N attention matrix',
      'O(N) linear time and memory',
      'O(log N) logarithmic scaling',
      'O(N³) cubic matrix inversion complexity',
    ],
    correctIndex: 0,
    explanation: 'Calculating pairwise attention weights between every token and every other token requires computing and storing an N × N attention matrix, yielding O(N²) quadratic scaling.',
  },
  {
    id: 406,
    conceptId: 'nlp',
    difficulty: 'intermediate',
    question: 'What is the core distinction between Masked Language Modeling (BERT) and Causal Language Modeling (GPT)?',
    options: [
      'BERT allows bidirectional context attention to predict masked tokens; GPT uses unidirectional causal masking to predict next tokens sequentially',
      'BERT generates text auto-regressively; GPT only outputs classification labels',
      'GPT cannot be fine-tuned on downstream tasks',
      'BERT does not use multi-head attention blocks',
    ],
    correctIndex: 0,
    explanation: 'BERT is an encoder looking in both directions simultaneously to understand representations. GPT is an autoregressive decoder that masks future tokens to learn sequential generation.',
  },

  // --- Generative AI / LLMs ---
  {
    id: 501,
    conceptId: 'genai-llms',
    difficulty: 'foundational',
    question: 'In Scaled Dot-Product Attention, why are dot products scaled by 1 / sqrt(d_k)?',
    codeSnippet: 'Attention(Q, K, V) = softmax(Q K^T / √d_k) V',
    options: [
      'To prevent large key dimensions from pushing dot products into saturated regions of softmax with near-zero gradients',
      'To ensure all attention weights sum to zero',
      'To invert the covariance matrix of sequence representations',
      'To project embeddings into complex frequency space',
    ],
    correctIndex: 0,
    explanation: 'For large dimension d_k, dot products grow large in magnitude, pushing the softmax function into regions with tiny gradients. Dividing by √d_k preserves unit variance.',
  },
  {
    id: 502,
    conceptId: 'genai-llms',
    difficulty: 'foundational',
    question: 'How does LoRA (Low-Rank Adaptation) enable parameter-efficient fine-tuning (PEFT) of large models?',
    options: [
      'Freezes pre-trained weights and decomposes weight update matrices into products of two low-rank matrices (B × A)',
      'Prunes 90% of model layers to reduce inference latency',
      'Trains a separate linear regression layer on model output logits',
      'Quantizes all model parameters into 1-bit integers',
    ],
    correctIndex: 0,
    explanation: 'LoRA assumes weight changes during adaptation have low intrinsic rank, representing ΔW = B × A where rank r << d, drastically reducing trainable parameters and GPU memory.',
  },
  {
    id: 503,
    conceptId: 'genai-llms',
    difficulty: 'intermediate',
    question: 'During LLM generation, what effect does increasing Temperature have on token sampling?',
    options: [
      'Flattens the probability distribution over vocabulary logits, increasing output diversity and creativity at the cost of coherence',
      'Sharpens the distribution so the model always picks the single highest probability token',
      'Accelerates GPU token throughput by skipping attention layers',
      'Locks the model into deterministic output sequences',
    ],
    correctIndex: 0,
    explanation: 'Dividing logits by temperature T > 1 softens the softmax distribution, increasing the chance of selecting lower-ranked tokens and generating more varied, creative completions.',
  },
  {
    id: 504,
    conceptId: 'genai-llms',
    difficulty: 'intermediate',
    question: 'What is the primary objective of RLHF (Reinforcement Learning from Human Feedback) or DPO (Direct Preference Optimization)?',
    options: [
      'Aligning model behavior with human intent, safety guidelines, and helpfulness beyond raw next-token prediction likelihood',
      'Increasing raw token throughput during inference',
      'Compressing the context window into fewer key-value cache states',
      'Eliminating the need for pre-training datasets',
    ],
    correctIndex: 0,
    explanation: 'Pre-training teaches models to mimic internet text distributions. Alignment techniques steer the model to prioritize helpful, accurate, and safe completions based on human preference data.',
  },
  {
    id: 505,
    conceptId: 'genai-llms',
    difficulty: 'foundational',
    question: 'What is the KV Cache in Transformer inference and why is it essential?',
    options: [
      'Stores previously computed Key and Value projection tensors to avoid recomputing past tokens on every new autoregressive generation step',
      'Caches database SQL query results for agentic tools',
      'Pre-allocates memory for output tokens on disk',
      'Compresses token embeddings before entering the embedding layer',
    ],
    correctIndex: 0,
    explanation: 'During autoregressive generation, past tokens do not change. Caching their Key and Value projections allows generating token t by computing attention only for the newest token against past cached states.',
  },
  {
    id: 506,
    conceptId: 'genai-llms',
    difficulty: 'intermediate',
    question: 'What distinguishes FlashAttention from naive self-attention implementations?',
    options: [
      'Tiled memory layout that computes exact softmax attention in fast GPU SRAM without materializing the full N × N attention matrix in slow HBM',
      'An approximate attention algorithm that drops 50% of tokens',
      'A hardware-specific CPU quantization library',
      'A method for eliminating positional encodings',
    ],
    correctIndex: 0,
    explanation: 'FlashAttention reorganizes attention computation into blocks (tiling) that fit inside fast GPU on-chip SRAM, minimizing reads and writes to High Bandwidth Memory (HBM) without losing numerical precision.',
  },

  // --- Agentic AI ---
  {
    id: 601,
    conceptId: 'agentic-ai',
    difficulty: 'foundational',
    question: 'What characterizes the "ReAct" (Reasoning + Acting) loop in autonomous AI agents?',
    options: [
      'The agent interleaves verbal thought-generation (Reasoning) with API/tool calls (Acting) and observation feedback from the environment',
      'The agent trains a new neural model from scratch for each user request',
      'The agent acts only once at the beginning without inspecting environment feedback',
      'The agent restricts itself to deterministic regex matching',
    ],
    correctIndex: 0,
    explanation: 'ReAct combines chain-of-thought internal reasoning ("Thought:") with external tool execution ("Action:" & "Observation:"), enabling dynamic error correction and goal tracking.',
  },
  {
    id: 602,
    conceptId: 'agentic-ai',
    difficulty: 'foundational',
    question: 'How do LLM agents invoke external tools via Function Calling schemas?',
    options: [
      'The LLM generates structured JSON arguments matching a predefined schema; the application executes the code and feeds results back as tool messages',
      'The LLM directly accesses the operating system kernel via machine code',
      'The LLM trains weights in real-time to mimic the tool API',
      'The tool replaces the system prompt with binary instructions',
    ],
    correctIndex: 0,
    explanation: 'The model is provided JSON schema definitions of available functions. When appropriate, it halts generation and outputs structured parameter arguments for the runtime to execute.',
  },
  {
    id: 603,
    conceptId: 'agentic-ai',
    difficulty: 'intermediate',
    question: 'In multi-agent systems, what is the role of a "Supervisor / Router" agent?',
    options: [
      'Decomposing high-level user tasks and orchestrating specialized sub-agents based on their domain capabilities',
      'Compressing the token prompt into binary integers',
      'Preventing API requests from reaching the web',
      'Formatting CSS and HTML for display widgets',
    ],
    correctIndex: 0,
    explanation: 'A supervisor agent evaluates task progress, delegates sub-tasks to specialized domain agents (e.g. researcher, coder, reviewer), and aggregates their findings into a cohesive final solution.',
  },
  {
    id: 604,
    conceptId: 'agentic-ai',
    difficulty: 'intermediate',
    question: 'What memory strategy prevents long-running autonomous agent loops from overflowing the context window?',
    options: [
      'Sliding window buffers combined with recursive hierarchical summarization and semantic vector store retrieval',
      'Clearing all chat history after every second tool call',
      'Permanently increasing model parameter count during execution',
      'Converting all text history to raw image screenshots',
    ],
    correctIndex: 0,
    explanation: 'Long conversations exceed context limits. Efficient architectures summarize completed steps, maintain sliding token buffers for immediate context, and retrieve historical facts via semantic vector retrieval.',
  },
  {
    id: 605,
    conceptId: 'agentic-ai',
    difficulty: 'foundational',
    question: 'What is "Plan-and-Solve" prompting in agent workflows compared to greedy execution?',
    options: [
      'The agent outlines an explicit multi-step execution DAG before executing any individual action, reducing trajectory drift',
      'The agent executes tools at random until a valid result appears',
      'The agent halts immediately if an error occurs and asks the user to rewrite the query',
      'The agent skips reasoning steps to reduce token latency',
    ],
    correctIndex: 0,
    explanation: 'Plan-and-Solve prompts the agent to draft a structured plan of milestones first, establishing a reference roadmap that keeps subsequent multi-step tool interactions focused.',
  },
  {
    id: 606,
    conceptId: 'agentic-ai',
    difficulty: 'intermediate',
    question: 'How do autonomous agents recover from failed tool executions or API errors?',
    options: [
      'The error trace is injected into the context as an observation, prompting the model to re-plan or correct malformed arguments',
      'The system restarts the computer operating system',
      'The model ignores the error message and hallucinates synthetic data',
      'The agent terminates execution unconditionally',
    ],
    correctIndex: 0,
    explanation: 'When a tool call returns an exception (e.g. 404, invalid argument), the error message is passed back as an observation, giving the agent context to diagnose the failure and retry with valid parameters.',
  },

  // --- Computer Vision ---
  {
    id: 701,
    conceptId: 'computer-vision',
    difficulty: 'foundational',
    question: 'What property makes 2D convolutional layers translation-equivariant in image processing?',
    options: [
      'Weight sharing across spatial receptive fields applies identical filters regardless of object location in the image',
      'Pooling layers invert the spatial gradient tensor',
      'Convolution operations only process monochromatic channels',
      'Image dimensions are fixed to powers of two',
    ],
    correctIndex: 0,
    explanation: 'Because convolutional kernels slide across the spatial grid with shared weights, shifting an input feature in space simply shifts the output response map by the same offset.',
  },
  {
    id: 702,
    conceptId: 'computer-vision',
    difficulty: 'foundational',
    question: 'What is the purpose of Pooling layers (e.g. Max Pooling) in convolutional networks?',
    options: [
      'Downsampling spatial dimensions to reduce computational load and provide local spatial translation invariance',
      'Increasing image resolution for fine-grained segmentation',
      'Normalizing color channel intensities between 0 and 255',
      'Converting RGB images into frequency spectrums',
    ],
    correctIndex: 0,
    explanation: 'Max pooling extracts the maximum value within a window, reducing spatial feature map resolution while preserving dominant activations and conferring small translation invariance.',
  },
  {
    id: 703,
    conceptId: 'computer-vision',
    difficulty: 'intermediate',
    question: 'In modern object detection (e.g. YOLO), what does Non-Maximum Suppression (NMS) accomplish?',
    options: [
      'Eliminates redundant overlapping bounding boxes by keeping the highest-confidence box and suppressing boxes with high IoU',
      'Increases the brightness of dark image pixels',
      'Sorts class labels alphabetically before calculating loss',
      'Normalizes anchor box aspect ratios to 1:1',
    ],
    correctIndex: 0,
    explanation: 'Object detectors often propose multiple candidate boxes for a single object. NMS removes duplicate overlapping detections whose Intersection-over-Union (IoU) exceeds a set threshold.',
  },
  {
    id: 704,
    conceptId: 'computer-vision',
    difficulty: 'foundational',
    question: 'What is the Intersection over Union (IoU) metric used for in visual localization?',
    codeSnippet: 'IoU = Area of Overlap / Area of Union',
    options: [
      'Quantifies the overlap accuracy between a predicted bounding box and ground-truth bounding box',
      'Measures image compression efficiency in JPEG formats',
      'Calculates the ratio of positive to negative training pixels',
      'Evaluates optical flow speed across video frames',
    ],
    correctIndex: 0,
    explanation: 'IoU is the standard metric measuring overlap between predicted and true boxes, ranging from 0 (no overlap) to 1 (perfect alignment).',
  },
  {
    id: 705,
    conceptId: 'computer-vision',
    difficulty: 'intermediate',
    question: 'How do Vision Transformers (ViT) process 2D images without standard convolutional kernels?',
    options: [
      'They divide the image into a grid of non-overlapping patches (e.g. 16×16), linearly project them into 1D token embeddings, and apply self-attention',
      'They convert all image pixels into raw text descriptions before processing',
      'They apply Fourier transforms to convert pixels into audio waveforms',
      'They require zero parameters by relying on hardcoded heuristics',
    ],
    correctIndex: 0,
    explanation: 'ViT treats an image as a sequence of flattened patches. Each patch is linearly projected into an embedding vector, prepended with a [CLS] token, and processed using standard Transformer blocks.',
  },
  {
    id: 706,
    conceptId: 'computer-vision',
    difficulty: 'intermediate',
    question: 'What is the Receptive Field of a neuron in a deep convolutional neural network?',
    options: [
      'The region of the original input image that contributes to that neuron\'s activation value',
      'The physical resolution of the GPU memory buffer',
      'The maximum number of classes the network can distinguish',
      'The learning rate threshold where weights stop updating',
    ],
    correctIndex: 0,
    explanation: 'As layers deepen, each subsequent feature maps over a progressively larger spatial footprint of the original image, expanding its effective receptive field to capture global semantic context.',
  },

  // --- Reinforcement Learning ---
  {
    id: 801,
    conceptId: 'reinforcement-learning',
    difficulty: 'foundational',
    question: 'What does the discount factor γ (gamma) in the Bellman equation control?',
    codeSnippet: 'V(s) = max_a [ R(s, a) + γ * Σ P(s\' | s, a) V(s\') ]',
    options: [
      'The present valuation weighting of future expected rewards versus immediate rewards',
      'The learning rate multiplier for policy gradient updates',
      'The probability of taking an exploratory random action',
      'The batch size for experience replay buffer sampling',
    ],
    correctIndex: 0,
    explanation: 'Gamma γ ∈ [0, 1] discounts future rewards; γ near 0 prioritizes immediate gratification, while γ near 1 encourages long-term strategic compounding.',
  },
  {
    id: 802,
    conceptId: 'reinforcement-learning',
    difficulty: 'foundational',
    question: 'In Q-Learning, what is the purpose of the ε-greedy (epsilon-greedy) exploration strategy?',
    options: [
      'Balancing exploration of novel actions (with probability ε) and exploitation of current best-known actions (with probability 1 - ε)',
      'Gradually decreasing the neural network weight values to prevent exploding gradients',
      'Ensuring the reward signal is strictly positive at every step',
      'Enforcing deterministic policy outputs during testing',
    ],
    correctIndex: 0,
    explanation: 'ε-greedy ensures the agent explores potentially superior untested actions rather than prematurely exploiting suboptimal initial knowledge.',
  },
  {
    id: 803,
    conceptId: 'reinforcement-learning',
    difficulty: 'intermediate',
    question: 'Why does Deep Q-Networks (DQN) employ an Experience Replay Buffer?',
    options: [
      'To break temporal correlation between consecutive transition tuples (s, a, r, s\') and stabilize gradient updates via mini-batch sampling',
      'To store historical policy weights in case model performance degrades',
      'To eliminate the need for computing Bellman targets',
      'To allow the agent to run without a reward function',
    ],
    correctIndex: 0,
    explanation: 'Consecutive online experiences are highly correlated, violating the i.i.d. assumption of stochastic gradient descent. Replay buffers decorrelate transitions by sampling uniform random mini-batches.',
  },
  {
    id: 804,
    conceptId: 'reinforcement-learning',
    difficulty: 'intermediate',
    question: 'What is the core distinction between Value-Based methods (e.g. Q-Learning) and Policy-Based methods (e.g. REINFORCE / PPO)?',
    options: [
      'Value methods learn action-utility functions Q(s, a) and derive policies implicitly; Policy methods optimize parameterized policy distributions π_θ(a | s) directly via gradient ascent',
      'Value methods only work in continuous action spaces, while Policy methods only work in discrete spaces',
      'Policy methods do not use reward signals during optimization',
      'Value methods cannot be approximated with neural networks',
    ],
    correctIndex: 0,
    explanation: 'Value methods estimate expected returns and select greedy actions. Policy gradient methods parameterize the action distribution directly, seamlessly handling continuous high-dimensional action spaces.',
  },
  {
    id: 805,
    conceptId: 'reinforcement-learning',
    difficulty: 'foundational',
    question: 'What fundamental property defines the Markov Property in Reinforcement Learning?',
    options: [
      'The future state transition depends only on the current state and action, independent of the past history of states',
      'All state transitions must have equal probability',
      'Rewards must be strictly deterministic across all episodes',
      'The action space must be finite and discrete',
    ],
    correctIndex: 0,
    explanation: 'A state S_t is Markovian if P(S_{t+1} | S_t, A_t, S_{t-1}, ...) = P(S_{t+1} | S_t, A_t). The current state encapsulates all information from past history.',
  },
  {
    id: 806,
    conceptId: 'reinforcement-learning',
    difficulty: 'intermediate',
    question: 'In Proximal Policy Optimization (PPO), what is the function of the clipped surrogate objective?',
    options: [
      'It penalizes policy updates that move too far from the previous policy, preventing catastrophic performance collapse',
      'It clips reward values to the range [-1, 1]',
      'It discards episodes with negative return values',
      'It guarantees global optimality in non-convex environments',
    ],
    correctIndex: 0,
    explanation: 'PPO clips the probability ratio r_t(θ) within [1 - ε, 1 + ε], bounding the incentive to make large destructive policy shifts and yielding robust, stable policy improvement.',
  },
];

// Adaptive Assessment Builder: Determines question count (10 to 15 questions) based on topic complexity, breadth, and user concepts
export function buildAdaptiveAssessment(
  selectedConceptIds: string[],
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced'
): { questions: DiagnosticQuestion[]; totalCount: number; targetConceptCounts: Record<string, number> } {
  const chosenIds = selectedConceptIds.length > 0
    ? selectedConceptIds
    : ['machine-learning', 'deep-learning'];

  const chosenMeta = AIML_CONCEPTS.filter(c => chosenIds.includes(c.id));

  // Calculate breadth & complexity metrics
  let totalBreadthWeight = 0;
  let hasBroadComplexTopic = false;

  chosenMeta.forEach(c => {
    totalBreadthWeight += c.breadthWeight;
    if (c.complexity === 'broad_complex') {
      hasBroadComplexTopic = true;
    }
  });

  // Calculate target question count strictly bounded between 10 and 15
  let calculatedCount = 10;
  if (chosenIds.length === 1) {
    // Single concept:
    // Narrower/moderate concepts (math, nlp, cv) -> ~10-11 questions
    // Broad/complex concepts (ML, DL, GenAI, Agents) -> ~12-14 questions
    calculatedCount = hasBroadComplexTopic ? 12 : 10;
    if (experienceLevel === 'Advanced') calculatedCount += 1;
  } else if (chosenIds.length === 2) {
    // 2 concepts: 11-13 questions
    calculatedCount = hasBroadComplexTopic ? 12 : 11;
    if (experienceLevel === 'Advanced') calculatedCount += 1;
  } else if (chosenIds.length === 3) {
    // 3 concepts: 12-14 questions
    calculatedCount = 13;
    if (experienceLevel === 'Advanced') calculatedCount += 1;
  } else {
    // 4+ concepts: 14-15 questions
    calculatedCount = 15;
  }

  // Strict clamp: Min 10, Max 15
  const finalTotalCount = Math.max(10, Math.min(15, calculatedCount));

  // Determine questions per concept
  const targetConceptCounts: Record<string, number> = {};
  const perConceptBase = Math.floor(finalTotalCount / chosenIds.length);
  let remainder = finalTotalCount % chosenIds.length;

  chosenIds.forEach(id => {
    targetConceptCounts[id] = perConceptBase;
  });

  // Distribute remainder prioritizing broader/complex concepts
  for (const c of chosenMeta) {
    if (remainder <= 0) break;
    targetConceptCounts[c.id] += 1;
    remainder -= 1;
  }

  // Assemble question list
  const selectedQuestions: DiagnosticQuestion[] = [];

  chosenIds.forEach(conceptId => {
    const pool = DIAGNOSTIC_QUESTION_POOL.filter(q => q.conceptId === conceptId);
    const needed = targetConceptCounts[conceptId] || 2;

    // Prefer foundational questions first, then intermediate
    const foundational = pool.filter(q => q.difficulty === 'foundational');
    const intermediate = pool.filter(q => q.difficulty === 'intermediate');

    const ordered = [...foundational, ...intermediate];
    selectedQuestions.push(...ordered.slice(0, needed));
  });

  // If still below finalTotalCount (e.g. single concept with fewer than needed in pool), pull complementary foundational math/ml
  if (selectedQuestions.length < finalTotalCount) {
    const extraFallbacks = DIAGNOSTIC_QUESTION_POOL.filter(
      q => !selectedQuestions.some(sq => sq.id === q.id)
    );
    const deficit = finalTotalCount - selectedQuestions.length;
    selectedQuestions.push(...extraFallbacks.slice(0, deficit));
  }

  return {
    questions: selectedQuestions.slice(0, finalTotalCount),
    totalCount: finalTotalCount,
    targetConceptCounts,
  };
}

// Generates dynamic roadmap nodes based on the user's selected concepts and diagnostic level
export function generateCurriculumRoadmap(
  selectedConceptIds: string[],
  diagnosticScore: number = 0
): LearningNode[] {
  const chosenConcepts = AIML_CONCEPTS.filter(c => selectedConceptIds.includes(c.id));
  
  const orderedConcepts: AIMLConcept[] = [];
  const mathConcept = chosenConcepts.find(c => c.id === 'ml-math');
  
  // If student scored high (≥75%), foundations are ready and core architectures lead
  if (diagnosticScore < 75 && mathConcept) {
    orderedConcepts.push(mathConcept);
  }
  
  chosenConcepts.forEach(c => {
    if (!orderedConcepts.some(oc => oc.id === c.id)) {
      orderedConcepts.push(c);
    }
  });

  if (orderedConcepts.length < 3) {
    const defaultFallbacks = ['machine-learning', 'deep-learning', 'genai-llms'];
    defaultFallbacks.forEach(id => {
      if (!orderedConcepts.some(c => c.id === id)) {
        const found = AIML_CONCEPTS.find(c => c.id === id);
        if (found) orderedConcepts.push(found);
      }
    });
  }

  return orderedConcepts.map((concept, index) => {
    const isFirst = index === 0;
    return {
      id: concept.id,
      title: `${index + 1}. ${concept.name}`,
      category: concept.category,
      conceptId: concept.id,
      status: isFirst ? 'current' : 'upcoming',
      progress: 0,
      lessonsCount: 6 + (index % 3),
      estimatedHours: 4.5 + (index * 1.5),
      skills: concept.skills,
    };
  });
}
