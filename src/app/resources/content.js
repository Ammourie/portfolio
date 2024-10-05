import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Mohammed',
    lastName:  'Ammourie',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Software Engineer',
    avatar:    '/images/avatar.jpg',
    location:  'Syria / Damascus',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English', 'Arabic']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/Ammourie',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/mohammed-al-ammourie-8b106a204/',
    },
    {
        name: 'X',
        icon: 'x',
        link: '',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:mohammed.ammourie@gmail.com',
    },
    {
        name: 'Mobile',
        icon: 'phone',
        link: 'tel:+963933564291',
    },
]

const home ={
    label: 'Home',
    title: 'Home',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
    },
    avatar: {
        display: true
    },
    calendar: {
        display: false,
        link: 'https://cal.com'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>I am a passionate Flutter developer with a knack for creating seamless, cross-platform mobile applications. With a strong foundation in software engineering and a keen eye for user-centric design, I excel at transforming complex ideas into intuitive, high-performance mobile experiences. My expertise spans the entire mobile development lifecycle, from conceptualization to deployment, with a particular focus on leveraging Flutter&apos;s capabilities to build beautiful, responsive, and efficient apps.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'Freelancer',
                timeframe: 'October 2022- November 2023',
                role: 'Flutter Developer',
                achievements: [
                    <>Responsible for designing, developing, and maintaining mobile applications using Flutter framework.</>,
                    <>Created visually appealing and user-friendly interfaces in accordance with design guidelines.</>,
                    <>Implemented cross-platform solutions to ensure consistent performance on both iOS and Android platforms.</>,
                    <>Stayed updated on the latest Flutter updates, features, and industry trends.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    // {
                    //     src: '/images/projects/project-01/cover-01.jpg',
                    //     alt: 'Once UI Project',
                    //     width: 16,
                    //     height: 9
                    // }
                ]
            },
            {
                company: 'Osous Technology LLC',
                timeframe: 'Feb 2024 - Present',
                role: 'Software developer',
                achievements: [
                    <>Developed cross-platform mobile applications using Flutter.</>,
                    <>Collaborated with design and product teams for UI/UX implementation.</>,
                    <>Integrated Firebase services for backend support.</>,
                    <>Implemented RESTful API integrations.</>,
                    <>Managed application state using Provider and Bloc.</>,
                    <>Built and maintained web applications using Next.js.</>,
                    <>Integrated RESTful APIs with Next.js projects.</>,
                    <>Managed client-side state with React and Context API.</>
                ],
                images: [ ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'Albaath University, Homs',
                description: <>Earned a Bachelor&apos;s degree in Networks Engineering from October 2017 to October 2022, achieving a commendable grade point average of 80.999.</>,
            },
            {
                name: 'Syrian Virtual University',
                description: <>Currently pursuing a Master&apos;s degree in Web Science, commenced in January 2023 and ongoing.</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Flutter',
                description: <>Expert in creating beautiful, natively compiled applications for mobile, web, and desktop.</>,
                isFamiliar: false,
                isProficient: true,
                images: []
            },
            {
                title: 'Dart',
                description: <>Proficient in developing cross-platform applications with a single codebase.</>,
                isFamiliar: false,
                isProficient: true,
                images: []
            },
            {
                title: 'TypeScript',
                description: <>Proficient in writing scalable and maintainable JavaScript with static typing.</>,
                isFamiliar: false,
                isProficient: true,
                images: []
            },
            {
                title: 'Python',
                description: <>Skilled in rapid prototyping and data analysis with extensive library support.</>,
                isFamiliar: false,
                isProficient: true,
                images: []
            },
            {
                title: 'Next.js',
                description: <>Experienced in building server-side rendered and statically generated React applications.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Material-UI (MUI)',
                description: <>Familiar with using MUI components to build responsive and aesthetically pleasing React applications.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'React',
                description: <>Adept at building interactive user interfaces with component-based architecture.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Angular',
                description: <>Competent in developing robust single-page applications.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Firebase',
                description: <>Capable of implementing real-time databases and authentication services.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Git',
                description: <>Proficient in version control and collaborative development workflows.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Linux',
                description: <>Comfortable with command-line operations and system administration.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Java',
                description: <>Experienced in object-oriented programming and enterprise application development.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'C++',
                description: <>Skilled in system-level programming and performance optimization.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
            {
                title: 'Figma',
                description: <>Proficient in creating and collaborating on user interface designs and prototypes.</>,
                isFamiliar: true,
                isProficient: false,
                images: []
            },
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about design and tech...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, blog, work, gallery };