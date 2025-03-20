import { InlineCode } from '@/once-ui/components';

const person = {
  firstName: 'Suvan',
  lastName: 'GS',
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: 'Developer',
  avatar: '/images/avatar.png',
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
    link: 'https://www.linkedin.com/in/suvan-gowri-shanker-596943261/',
  },
  // {
  //     name: 'X',
  //     icon: 'x',
  //     link: '',
  // },
  {
    name: 'Email',
    icon: 'email',
    link: 'mailto:contact@suvangs.tech',
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
      noteworthy<br /> Applications . After hours, I build my own Projects that push the limits of speed and size.
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
        I am a Bangalore-based Student Developer with a passion for
        implementing complex challenges just for the fun of it. My work spans
        across Applications, Games, and the convergence of design and
        technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: 'Work Experience',
    experiences: [
      {
        company: 'Fuelemy',
        timeframe: 'OCT 2024 - FEB 2025',
        role: 'Project Lead & Full Stack Developer',
        achievements: [
          <>
            Implemented a Distributed, Cached API system integrating a custom
            Rate Limiter, Cors & CSRF, Logger(Debug) and Middleware using Hono,
            PG (NeonDB), Drizzle.{' '}
          </>,
          <>
            Hosting it as a Bun runtime on Sevalla inside a distributed Docker
            instance.{' '}
          </>,
          <>
            Wrote a custom JWT Authentication system with an User-Invite Schema
            in Postgres.{' '}
          </>,
          <>
            Built a Frontend Monorepo with refine + vite framework for quick and reliable dashboards. Implemented
            Internationalization for 5 languages, GQL for data fetching from backend.
          </>,
          <>
            Worked with Ola Maps API to create a custom logic for booking fleets of trucks and display optimal routes also facilitated
            payments between the driver and booking owner with razorpay.
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
        timeframe: 'AUG 2024 - Present',
        role: 'Full Stack Developer Intern',
        achievements: [
          <>
            Designed and Developed the UI for srmdei.com with NEXTJS, Shadcn, Gsap, Framer Motion, supabase, redis.
          </>,
          <>Designed a custom CDN and a CMS with sanity</>,
          <>Maintained and developed the website ciap.srmdei.com and iedc.srmdei.com.</>
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
        description: (
          <>Desktop and Mobile Applications using Rust.</>
        ),
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
          <>Work with Postgres16 and high-lvl ORMs like Drizzle & Sequelize.</>
        ),
        images: []
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
          <>Can Create CLI, Web, Desktop and Mobile Applications with Rust.</>
        ),
        images:[],
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
              height: 9
          },
        ],
      },
      {
        title: 'Python',
        description: (
          <>
            Can create CLI, Web and Desktop Applications with Python.{ ' ' }
            Have also worked with Ml applications using Pytorch and huggingface.
          </>
        ),
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
    
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
