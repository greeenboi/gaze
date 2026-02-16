import { InlineCode } from "@/once-ui/components";
import { Tag } from "@once-ui-system/core";


const person = {
  firstName: 'Suvan',
  lastName: 'GS',
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: 'Developer',
  avatar: '/images/avatar.jpeg',
  location: 'Asia/Kolkata', // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ['English'], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about Software, technology, and share thoughts on
      Novels.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/greeenboi',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/suvangs',
  },
  {
    name: 'HF',
    icon: 'huggingface',
    link: 'https://huggingface.co/greenarcade',
  },
  {
    name: 'Gems',
    icon: 'ruby',
    link: 'https://rubygems.org/profiles/greeenboi',
  },
  {
    name: 'NPM',
    icon: 'npm',
    link: 'https://www.npmjs.com/~greeenboi',
  },
  {
    name: 'Email',
    icon: 'email',
    link: 'mailto:suvan.gowrishanker.204@gmail.com',
  },
];

const home = {
  label: 'Home',
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Student And Developer</>,
  subline: (
    <>
      I'm Suvan, a Student at <InlineCode>SRMIST</InlineCode>, Where I create
      noteworthy
      <br /> Applications . After hours, I build my own Projects that push the
      limits of speed and size.
    </>
  ),
};

const about = {
  label: 'About',
  title: 'About me',
  description: `I am ${person.name}, ${person.role} from Bangalore, India.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: 'https://cal.com/greeenboi/15min',
  },
  intro: {
    display: true,
    title: 'Introduction',
    description: (
      <>
        I am a Bangalore-based Student Developer with a passion for implementing
        complex challenges just for the fun of it. My work spans across
        Applications, Games, and the convergence of design and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: 'Work Experience',
    experiences: [
      {
        company: 'Sarvin AI',
        timeframe: 'SEP 2025 - PRESENT',
        role: 'Founding Engineer',
        achievements: [
          <>
            Engineered the flagship React Native application, developing custom Swift modules to bridge native performance
gaps. Optimized the interface for iOS 16+ and the Liquid Glass design system, ensuring a high-performance, premium user
experience that drove user retention and engagement{' '}
          </>,
          <>
            Scaled the agent in Django, livekit, custom agents built with langchain and groq. Used mongodb as the main datastore.{' '}
          </>,
        ],
        images: [
          // // optional: leave the array empty if you don't want to display images
          {
            src: '/images/work/sweezy.png',
            alt: 'sweezy.app',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: 'Errgo',
        timeframe: 'JUN 2025 - OCT 2025',
        role: 'Full Stack Developer',
        achievements: [
          <>
            Engineered a high-fidelity, browser-based IDE using React, CodeMirror, and Socket.io, enabling candidates to complete realworld technical assessments in a collaborative, real-time environment. <br/> This component served as the primary data source for
AI-driven skill evaluation.{' '}
          </>,
          <>
            Architected and executed a critical data migration from Firebase to PostgreSQL, implementing a structured schema with
Prisma to support complex relational queries for candidate-to-company matching and AI-driven performance analytics.{' '}
          </>,
          <>
            Spearheaded the end-to-end infrastructure migration from AWS to GCP, utilizing Cloud Run and Artifact Registry to
optimize operational costs by 13% and improve platform latency. Built custom containers using NixOS and Docker.{' '}
{' '}
          </>,
          <>
            Scaled the backend ecosystem by designing type-safe RESTful APIs with Zod and Swagger, ensuring seamless integration
between the candidate interface and the AI evaluation engine while maintaining 99%+ code reliability through Jest test suites.{' '}
          </>,
          <>
          Implemented real-time messaging architecture using Firebase Realtime Database, facilitating direct engagement between
developers and hiring managers to accelerate the interview scheduling loop.{' '}
          </>,
        ],
        images: [
          // // optional: leave the array empty if you don't want to display images
          {
            src: '/images/work/tryerrgo.png',
            alt: 'tryerrgo.com',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: 'Fuelemy',
        timeframe: 'OCT 2024 - FEB 2025',
        role: 'Project Lead & Full Stack Developer',
        achievements: [
          <>
            Architected a high-concurrency fintech backend using Hono and Bun, optimized for low-latency transaction processing.
Developed a custom JWT-based authentication and rate-limiting architecture to secure sensitive payment data and prevent
unauthorized refueling requests, hosting the service on Sevalla via Docker to ensure elastic scaling during peak fleet operational
hours.{' '}
          </>,
          <>
            Built a Frontend Monorepo with refine + vite framework for quick and reliable dashboards. Implemented Internationalization
for 5 regional languages, for efficient, real-time data fetching of live fueling transactions{' '}
          </>,
          <>
            Engineered the core logistics and payment engine by integrating Ola Maps API and Razorpay to automate fleet booking and
fuel disbursements. {' '}
          </>,
        ],
        images: [
          // // optional: leave the array empty if you don't want to display images
          // {
          //   src: '/images/projects/project-01/cover-01.jpg',
          //   alt: 'Once UI Project',
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: 'SRM DEI',
        timeframe: 'AUG 2024 - MAR 2025',
        role: 'Full Stack Developer Intern',
        achievements: [
          <>
            Designed and Developed the UI for srmdei.com with NEXTJS, Shadcn,
            Gsap, Framer Motion, supabase, redis.
          </>,
          <>Designed a custom CDN and a CMS with sanity</>,
          <>
            Maintained and developed the website ciap.srmdei.com and
            iedc.srmdei.com.
          </>,
        ],
        images: [
          {
            src: '/images/gallery/srmdei.png',
            alt: 'SrmDEI',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: 'Samsung Prism',
        timeframe: 'JAN 2024 - JUN 2024',
        role: 'R&D Project Intern',
        achievements: [
          <>Worked On Character Consistency in Image Generation</>,
          <>
            Created a GPT2 assisted SDXL 1.5 model, Controlnet, LoRA mask,
            prompt Enchancing with gpt-2, Consistency pipeline. Allowing for
            Consistent generation upto 80%
          </>,
        ],
        images: [],
      },
      {
        company: 'JASSURE',
        timeframe: 'APR 2024 - JUL 2024',
        role: 'Full Stack Developer Intern',
        achievements: [
          <>
            Worked On Developing pages for the JADE platform using Next13 and
            ChakraUI
          </>,
          <>
            Utilised AWS codecommit and CI/CD to deploy to our Hosting Platform
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: 'Studies',
    institutions: [
      {
        name: 'SRM Institute of Science and Technology',
        description: <>Studying Computer Science and Engineering</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: 'Technical skills',
    skills: [
      {
        title: 'Ruby On Rails',
        description: (
          <>
            Certified Ruby On Rails Developer. Can Create Full Stack Apps with
            ROR and Postgres.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: 'Tauri',
        description: <>Desktop and Mobile Applications using Rust.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/projects/kanflow/kanflow-banner.png',
            alt: 'Kanflow',
            width: 16,
            height: 9,
          },
          {
            src: '/images/projects/glassy-notes/notes1.png',
            alt: 'Glassy Notes',
            width: 16,
            height: 9,
          },
          {
            src: '/images/projects/sonder/sonder1.png',
            alt: 'Sonder',
            width: 16,
            height: 9,
          },
          {
            src: '/images/projects/vscodex/vscodex1.png',
            alt: 'VSCodex',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'PostgreSQL',
        description: (
          <>Postgres16, scale and shard databases, can work with clickhouse for designing observabilty monitoring systems.</>
        ),
        images: [],
      },
      {
        title: 'Sqlite3',
        description: (<>Can create and manage Sqlite3 databases.</>),
        images: [],
      },
      {
        title: 'Docker & Kubernetes',
        description: <>Took a seminar for Docker</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/blog/seminar/docker1.png',
            alt: 'DockerForGeeks',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'Rust',
        description: (
          <>Can Create CLI, Web, Desktop and Mobile Applications with Rust. Built a cross platform binary to visualise system utilisation in realtime.</>
        ),
        images: [],
      },
      {
        title: 'React Native',
        description: <>Have Created several Full Stack Applications</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/projects/passtime/passtime.png',
            alt: 'passtime',
            width: 16,
            height: 9,
          },
          {
            src: '/images/projects/clarity/clarity.png',
            alt: 'clarity',
            width: 16,
            height: 9,
          },
        ],
        videos: [
          {
            src: 'https://youtu.be/2Y4Ov-cDdjA',
            alt: 'Daily Planner Demo',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'Next.js',
        description: (
          <>Building Enterprise-grade, SEO optimized apps with Next15.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/projects/videx/videx.png',
            alt: 'Videx',
            width: 16,
            height: 9,
          },
          {
            src: '/images/projects/foundersclub/fc-home.png',
            alt: 'fc',
            width: 16,
            height: 9,
          },
          {
            src: '/images/projects/frog-clicker/click.png',
            alt: 'frog clicker',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'JavaScript/TypeScript',
        description: (
          <>
            Have worked with several frameworks and libraries like React, Vue,
            Solid, Node, Bun, Deno etc. Built several projects with vanilla
            JS/TS, built several npm packages, Built games with phaserjs.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: '/images/projects/void-noir/home.png',
            alt: 'Noirsql',
            width: 16,
            height: 9,
          },
        ],
        videos: [
          {
            src: 'https://youtu.be/VmS2AYQSZto',
            alt: 'just a walkthrough',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'C++',
        description: (
          <> Mostly DSA, Competitive Programming and GPU Shaders with Cpp. </>
        ),
        images: [
          {
            src: '/images/projects/opengl/triangle.jpg',
            alt: 'opengl triangle',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'Ruby',
        description: (
          <> Mostly DSA, Competitive Programming, CLI tools and Game Development. </>
        ),
        images: [
          {
            src: '/images/projects/unnamed-rpg/game.png',
            alt: 'unnamed rpg',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: 'Python',
        description: ([
          <>
            Can create CLI, Web and Desktop Applications with Python. 
          </>,
          <>
            Have also worked with Agentic frameworks like Agno and crewai. Created multi-agentic systems with AutoGPT and Langchain.
          </>,
          <>
            Trained and reworked several Custom models with Wav2Vec2, Whisper, GPT-2 and Flux-dev.
          </>,
        ]),
        videos: [
          {
            src: 'https://youtu.be/RhT47xcUVUQ',
            alt: 'Willow Sales Agent',
            width: 16,
            height: 9,
          }
        ]
      },
      {
        title: 'RedHat Linux',
        description: <>Certified System Administrator</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  label: 'Blog',
  title: 'Writing about Tech, Games and Novels...',
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/[locale]/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: 'Work',
  title: 'My projects',
  description: `Notable projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/[locale]/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: 'Gallery',
  title: 'My AI-Photo gallery',
  description: `A photo collection of ${person.name} Generated using Flux`,
  images: [
    {
      src: '/images/gallery/suvan01.png',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/suvan02.jpg',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/suvan03.webp',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/suvan04.png',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/suvan05.webp',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/suvan06.png',
      alt: 'image',
      orientation: 'horizontal',
    },
    {
      src: '/images/gallery/suvan07.png',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/suvan08.webp',
      alt: 'image',
      orientation: 'vertical',
    },
    {
      src: '/images/gallery/suvan09.webp',
      alt: 'image',
      orientation: 'vertical',
    }
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
