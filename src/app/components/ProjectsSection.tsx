'use client'
import React, { useState, useRef } from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import { motion, useInView } from 'framer-motion'

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tag: string[];
    gitUrl: string;
    productUrl: string;
}

const projectsData: Project[] = [
    {
        id: 1,
        title: 'PFC BALANCE',
        description: 'A web application that allows you to manage your PFC by simply taking a picture of the food you eat.',
        image: '/images/projects/1.png',
        tag: ['All', 'Web'],
        gitUrl: 'https://github.com/Koki-Kazaore/PFC-BALANCE',
        productUrl: '',
    },
    {
        id: 2,
        title: 'DeLiDev',
        description: 'A platform that enables package delivery service. It contributes to solving the shortage of logistics personnel.',
        image: '/images/projects/2.png',
        tag: ['All', 'Web'],
        gitUrl: 'https://github.com/Koki-Kazaore/spark-2023-teamS',
        productUrl: '',
    },
    {
        id: 3,
        title: 'Borrowhood',
        description: 'Share More, Spend Less, Connect Always. Powered by Google Vision API, recommendations, and Llama AI to reduce overconsumption and foster community connections through shared interests.',
        image: '/images/projects/borrowhood.png',
        tag: ['All', 'Web'],
        gitUrl: 'https://github.com/Koki-Kazaore/borrowhood',
        productUrl: '',
    },
    {
        id: 4,
        title: 'Bikeying API',
        description: 'An IoT project aiming to make bike sharing C-to-C. Contributes to the revitalization of mobility.',
        image: '/images/projects/bikeying_api.png',
        tag: ['All', 'Else'],
        gitUrl: '',
        productUrl: 'https://bikeying.com',
    },
    {
        id: 5,
        title: 'DannnePoint.com',
        description: 'A web application that visualizes vitamin D synthesis. Energy from sunlight contributes to mental health.',
        image: '/images/projects/3.png',
        tag: ['All', 'Web'],
        gitUrl: 'https://github.com/Koki-Kazaore/Danneza',
        productUrl: '',
    },
    {
        id: 6,
        title: 'One-Click Progress Sharing',
        description: 'One-click progress sharing tool using WebSocket. Contributes to the creation of an internal environment in which it is easy to ask questions.',
        image: '/images/projects/noImage.png',
        tag: ['All', 'Web'],
        gitUrl: 'https://github.com/Koki-Kazaore/One-Click-Progress-Sharing',
        productUrl: '',
    },
]

const ProjectsSection: React.FC = () => {
    const [tag, setTag] = useState<string>('All');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true});

    const handleTagChange = (newTag: string) => {
        setTag(newTag);
    }

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    )

    const cardVariants = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    }

    return (
        <section id='projects'>
            <h2 className='text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12'>
                My Projects
            </h2>
            <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
                <ProjectTag
                    onClick={() => handleTagChange('All')}
                    name='All'
                    isSelected={tag === 'All'}
                />
                <ProjectTag
                    onClick={() => handleTagChange('Web')}
                    name='Web'
                    isSelected={tag === 'Web'}
                />
                <ProjectTag
                    onClick={() => handleTagChange('Else')}
                    name='Else'
                    isSelected={tag === 'Else'}
                />
            </div>
            <ul ref={ref} className='grid lg:grid-cols-3 gap-8 md:gap-12'>
                {filteredProjects.map((project, index) => (
                    <motion.li
                        key={index}
                        variants={cardVariants}
                        initial='initial'
                        animate={isInView ? 'animate' : 'initial'}
                        transition={{ duration: 0.3, delay: index * 0.4 }}
                    >
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            description={project.description}
                            imgUrl={project.image}
                            tags={project.tag}
                            gitUrl={project.gitUrl}
                            productUrl={project.productUrl}
                        />
                    </motion.li>
                ))}
            </ul>
            {/* Breakpoint when "Contact Me" button is pressed */}
            <div id='letsConnect'></div>
        </section>
    )
}

export default ProjectsSection
