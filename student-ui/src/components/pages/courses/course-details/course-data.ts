export const courseData = {
    title: "Machine Learning Fundamentals",
    modules: 10,
    lessons: 45,
    assessments: 12,
    duration: "10-12 weeks",
    progress: 0,
    modulesList: [
        {
          id: "module-1",
          title: "Python for Data Science",
          description: "Master Python fundamentals for data science applications",
          lessons: [
            {
              id: "lesson-1",
              title: "Python Basics",
              duration: "30 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "Introduction to Python Variables and Data Types",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Python Syntax and Structure Guide",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "Python Basics Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Control Flow and Functions",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "If-Else, Loops, and Functions in Python",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Best Practices for Python Control Structures",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Create a Simple Calculator Function",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Data Structures in Python",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Lists, Tuples, Dictionaries, and Sets",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Effective Use of Python Data Structures",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Build a Contact Manager with Dictionaries",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "File Handling and Modules",
              duration: "35 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Reading and Writing Files in Python",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Working with Python Modules and Packages",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Create a File Parser Script",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "1 week",
          status: "Ready to start",
          enabled: true
        },
        {
          id: "module-2",
          title: "NumPy & Pandas",
          description: "Master data manipulation and numerical computing with NumPy and Pandas",
          lessons: [
            {
              id: "lesson-1",
              title: "Introduction to NumPy",
              duration: "35 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "NumPy Arrays and Basic Operations",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "NumPy Fundamentals Guide",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "NumPy Basics Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Pandas DataFrames",
              duration: "50 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Working with Pandas DataFrames",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Pandas Data Manipulation Techniques",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Analyze a Dataset with Pandas",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Advanced NumPy Operations",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Advanced Array Operations and Broadcasting",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Optimizing NumPy Workflows",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Matrix Operations with NumPy",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "Data Cleaning with Pandas",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Handling Missing Data and Data Wrangling",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Pandas Data Cleaning Best Practices",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Clean a Real-World Dataset",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "1.5 weeks",
          status: "Complete Module 1 first",
          enabled: true
        },
        {
          id: "module-3",
          title: "Data Visualization",
          description: "Create impactful visualizations with Matplotlib, Seaborn, and Plotly",
          lessons: [
            {
              id: "lesson-1",
              title: "Matplotlib Basics",
              duration: "30 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "Introduction to Matplotlib Plotting",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Matplotlib Plotting Guide",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "Matplotlib Basics Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Seaborn for Statistical Visualizations",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Creating Statistical Plots with Seaborn",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Seaborn Visualization Techniques",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Create a Seaborn Visualization Dashboard",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Interactive Plots with Plotly",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Building Interactive Visualizations with Plotly",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Plotly Interactive Plotting Guide",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Develop an Interactive Data Dashboard",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "Advanced Visualization Techniques",
              duration: "50 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Customizing Plots and Multi-Plot Layouts",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Advanced Visualization Strategies",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Build a Comprehensive Visualization Report",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "1 week",
          status: "Locked",
          enabled: true
        },
        {
          id: "module-4",
          title: "Statistics for Data Science",
          description: "Learn statistical methods essential for data analysis",
          lessons: [
            {
              id: "lesson-1",
              title: "Descriptive Statistics",
              duration: "35 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "Mean, Median, Mode, and Variance",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Understanding Descriptive Statistics",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "Descriptive Statistics Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Probability Basics",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Introduction to Probability Concepts",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Probability for Data Science",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Probability Calculation Exercise",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Inferential Statistics",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Hypothesis Testing and Confidence Intervals",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Inferential Statistics Guide",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Perform a Hypothesis Test",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "Statistical Modeling",
              duration: "50 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Linear Regression and Correlation",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Building Statistical Models",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Create a Simple Regression Model",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "1.5 weeks",
          status: "Locked",
          enabled: true
        },
        {
          id: "module-5",
          title: "Machine Learning Fundamentals",
          description: "Introduction to machine learning algorithms and techniques",
          lessons: [
            {
              id: "lesson-1",
              title: "Introduction to Machine Learning",
              duration: "30 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "What is Machine Learning?",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Machine Learning Concepts Overview",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "Machine Learning Basics Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Supervised Learning",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Linear Regression and Classification",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Supervised Learning Techniques",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Build a Classification Model",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Unsupervised Learning",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Clustering and Dimensionality Reduction",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Unsupervised Learning Methods",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Perform K-Means Clustering",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "Model Evaluation",
              duration: "50 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Metrics for Model Performance",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Evaluating Machine Learning Models",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Evaluate a Model with Cross-Validation",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-5",
              title: "Feature Engineering",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Feature Selection and Transformation",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Feature Engineering Best Practices",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Feature Engineering for a Dataset",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "2 weeks",
          status: "Locked",
          enabled: true
        },
        {
          id: "module-6",
          title: "SQL for Data Science",
          description: "Learn SQL for data querying and database management",
          lessons: [
            {
              id: "lesson-1",
              title: "SQL Basics",
              duration: "30 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "Introduction to SQL and Databases",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "SQL Syntax and Structure",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "SQL Basics Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Querying Data",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "SELECT, WHERE, and JOINs",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Writing Efficient SQL Queries",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Write SQL Queries for Data Analysis",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Advanced SQL Queries",
              duration: "45 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Aggregations, Subqueries, and Window Functions",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Advanced SQL Techniques",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Analyze Data with Advanced SQL",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "Database Management",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Creating and Managing Databases",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Database Design and Optimization",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Design a Relational Database",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "1 week",
          status: "Locked",
          enabled: true
        },
        {
          id: "module-7",
          title: "Capstone Project",
          description: "Apply your skills to a real-world data science project",
          lessons: [
            {
              id: "lesson-1",
              title: "Project Planning",
              duration: "30 min",
              progress: 0,
              resources: [
                {
                  type: "video",
                  title: "Defining a Data Science Project",
                  section: "video-player",
                  enabled: true,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Project Planning and Scoping Guide",
                  section: "article-viewer",
                  enabled: true,
                  color: "green"
                },
                {
                  type: "quiz",
                  title: "Project Planning Quiz",
                  section: "test-interface",
                  enabled: true,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-2",
              title: "Data Collection and Preparation",
              duration: "50 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Sourcing and Cleaning Data",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Data Preparation Best Practices",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Prepare a Dataset for Analysis",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-3",
              title: "Analysis and Modeling",
              duration: "60 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Building and Evaluating Models",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "End-to-End Data Analysis Workflow",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Develop a Predictive Model",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-4",
              title: "Visualization and Reporting",
              duration: "50 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Creating a Project Report with Visualizations",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Effective Data Science Reporting",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Build a Final Project Report",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            },
            {
              id: "lesson-5",
              title: "Project Presentation",
              duration: "40 min",
              progress: 0,
              enabled: false,
              resources: [
                {
                  type: "video",
                  title: "Presenting Your Data Science Project",
                  section: "video-player",
                  enabled: false,
                  color: "red"
                },
                {
                  type: "article",
                  title: "Communicating Data Insights",
                  section: "article-viewer",
                  enabled: false,
                  color: "green"
                },
                {
                  type: "assignment",
                  title: "Prepare a Project Presentation",
                  section: "test-interface",
                  enabled: false,
                  color: "purple"
                }
              ]
            }
          ],
          duration: "2 weeks",
          status: "Locked",
          enabled: true
        }
      ],
    mentorTips: [
      {
        title: "Getting Started",
        description: "Begin with Python basics to build a strong foundation for machine learning concepts.",
        color: "blue",
      },
      {
        title: "Study Tip",
        description: "Practice coding daily for 30 minutes to reinforce your learning.",
        color: "green",
      },
    ],
    progressStats: [
      { label: "Overall Progress", value: "0%", color: "blue" },
      { label: "Lessons Completed", value: "0/45", color: "green" },
      { label: "Assessments Passed", value: "0/12", color: "purple" },
    ],
    quickActions: [
      { label: "Join Discussion", section: "community-forums", icon: "chat" },
      { label: "Ask AI Mentor", section: "ai-chatbot", icon: "message" },
      { label: "View Profile", section: "user-profile", icon: "user" },
    ],
    resources: [
      { title: "Course Syllabus", description: "Complete course outline" },
      { title: "Code Repository", description: "All course code examples" },
      { title: "Additional Reading", description: "Supplementary materials" },
    ],
  };