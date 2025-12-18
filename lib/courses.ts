import fs from 'fs';
import path from 'path';
import { getAllPosts } from './mdx';
import type { FrontMatter } from './mdx';

const COURSES_DIR = path.join(process.cwd(), 'content', 'courses');

export interface CourseModule {
  id: string
  name: string
  description: string
  order: number
}

export interface CourseMeta {
  id: string
  title: string
  description: string
  modules: CourseModule[]
  author: string
  createdAt: string
  updatedAt: string
}

export interface CourseWithPosts extends CourseMeta {
  posts: Array<{
    frontmatter: FrontMatter
    slug: string
    readingTime: number
  }>
}

/**
 * Get course metadata
 */
export function getCourseMeta(courseId: string): CourseMeta | null {
  try {
    const coursePath = path.join(COURSES_DIR, courseId, 'meta.json');
    if (!fs.existsSync(coursePath)) {
      return null;
    }
    
    const content = fs.readFileSync(coursePath, 'utf-8');
    return JSON.parse(content) as CourseMeta;
  } catch (error) {
    console.error(`Error loading course ${courseId}:`, error);
    return null;
  }
}

/**
 * Get all courses
 */
export function getAllCourses(): CourseMeta[] {
  if (!fs.existsSync(COURSES_DIR)) {
    return [];
  }

  const courseDirs = fs.readdirSync(COURSES_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const courses = courseDirs
    .map(courseId => getCourseMeta(courseId))
    .filter((course): course is CourseMeta => course !== null)
    .sort((a, b) => a.title.localeCompare(b.title));

  return courses;
}

/**
 * Get all posts for a specific course
 */
export async function getCoursePosts(courseId: string): Promise<CourseWithPosts | null> {
  const courseMeta = getCourseMeta(courseId);
  if (!courseMeta) {
    return null;
  }

  // Get all blog posts
  const allPosts = await getAllPosts('blog');
  
  // Filter posts that belong to this course
  const coursePosts = allPosts
    .filter(post => post.frontmatter.course?.id === courseId)
    .sort((a, b) => {
      // Sort by module order, then by post order
      const moduleOrderA = courseMeta.modules.findIndex(
        m => m.id === a.frontmatter.course?.module,
      );
      const moduleOrderB = courseMeta.modules.findIndex(
        m => m.id === b.frontmatter.course?.module,
      );
      
      if (moduleOrderA !== moduleOrderB) {
        return moduleOrderA - moduleOrderB;
      }
      
      return (a.frontmatter.course?.order || 0) - (b.frontmatter.course?.order || 0);
    });

  return {
    ...courseMeta,
    posts: coursePosts,
  };
}

/**
 * Get posts grouped by module for a course
 */
export async function getCoursePostsByModule(courseId: string) {
  const courseWithPosts = await getCoursePosts(courseId);
  if (!courseWithPosts) {
    return null;
  }

  const postsByModule: Record<string, typeof courseWithPosts.posts> = {};

  // Initialize modules
  courseWithPosts.modules.forEach(module => {
    postsByModule[module.id] = [];
  });

  // Group posts by module
  courseWithPosts.posts.forEach(post => {
    const moduleId = post.frontmatter.course?.module;
    if (moduleId && postsByModule[moduleId]) {
      postsByModule[moduleId].push(post);
    }
  });

  return {
    course: courseWithPosts,
    postsByModule,
  };
}








