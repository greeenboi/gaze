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
      I'm Suvan, a Student at <InlineCode>SRMIST</InlineCode>, where I create
      wild <br /> Applications . After hours, I build my own OSC Projects.
    </>
  ),
};

const about = {
  label: 'About',
  title: 'About me',
  description: `Meet ${person.name}, ${person.role} from Bangalore, India.`,
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
        Suvan is a Bangalore-based Student Developer with a passion for
        implementing complex challenges just for the fun of it. His work spans
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
        timeframe: 'OCT 2024 - Present',
        role: 'Lead Software Engineer',
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
            Created a Unique and User-Friendly Landing Page and Dashboard using
            Refine + Vite.
          </>,
          <>
            Added Ola Maps and Razorpay with i18n to allow users to book trips.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: '/images/projects/project-01/cover-01.jpg',
            alt: 'Once UI Project',
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: 'SRM DEI',
        timeframe: 'SEP 2024 - Present',
        role: 'Full Stack Developer Intern',
        achievements: [
          <>
            Designed and Developed the UI for srmdei.com with NEXTJS,
            Tailwindcss and Chakra UI.
          </>,
          <>Designed a backend and CDN service for srmdei.com.</>,
        ],
        images: [],
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
          <>Can Create Desktop and Mobile Applications using Rust.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: 'Docker & Kubernetes',
        description: <>Took a seminar for Docker</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: 'React Native',
        description: <>Have Created several Full Stack Applications</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: 'Next.js',
        description: (
          <>Building next gen apps with Next.js + Refine + Supabase.</>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [
          // {
          //     src: '/images/projects/project-01/cover-04.jpg',
          //     alt: 'Project image',
          //     width: 16,
          //     height: 9
          // },
        ],
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
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
