import { marked } from 'marked';

// Configure marked for better styling
marked.setOptions({
  breaks: true,
  gfm: true,
  pedantic: false
});

// Custom renderer for better HTML structure
const renderer = new marked.Renderer();

renderer.heading = (token) => {
  const level = token.depth;
  const id = token.text.toLowerCase().replace(/[^\w]/g, '-');
  return `<h${level} id="${id}" class="mt-4 mb-2">${token.text}</h${level}>`;
};

renderer.paragraph = (token) => {
  return `<p class="mb-3 leading-relaxed">${token.text}</p>`;
};

renderer.link = (token) => {
  return `<a href="${token.href}" class="text-primary hover:text-primary-dark" target="_blank">${token.text}</a>`;
};

renderer.image = (token) => {
  return `<img src="${token.href}" alt="${token.title || ''}" class="w-full rounded-lg my-4" loading="lazy">`;
};

renderer.code = (token) => {
  const language = token.lang || 'javascript';
  return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${language}">${token.text}</code></pre>`;
};

renderer.blockquote = (token) => {
  return `<blockquote class="border-l-4 border-primary pl-4 italic my-4 text-gray-600">${token.text}</blockquote>`;
};

marked.setOptions({ renderer });

// Parse front matter from markdown
export function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]+?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { meta: {}, content };
  }

  const meta = {};
  match[1].split('\n').forEach(line => {
    const [key, ...value] = line.split(': ');
    if (key) {
      meta[key.trim()] = value.join(': ').trim();
    }
  });

  return {
    meta,
    content: match[2]
  };
}

// Render markdown to HTML
export async function renderMarkdown(filename) {
  try {
    const response = await fetch(`/blog/posts/${filename}`);
    if (!response.ok) throw new Error('Failed to fetch');

    const markdown = await response.text();
    const { meta, content } = parseFrontMatter(markdown);
    const html = await marked.parse(content);

    return { meta, html };
  } catch (error) {
    console.error('Error rendering markdown:', error);
    return { meta: {}, html: '<p>Failed to load blog post</p>' };
  }
}

// Load all blog posts for listing
export async function loadBlogPosts() {
  // This would typically fetch from an API or index file
  // For now, return mock data structure
  const posts = [
    {
      slug: 'skincare-routine',
      filename: 'skincare-routine.md',
      title: 'Ultimate Skincare Routine Guide',
      excerpt: 'Learn the perfect skincare routine for your skin type...',
      date: '2024-06-01',
      author: 'Sarah Chen'
    },
    {
      slug: 'makeup-tips',
      filename: 'makeup-tips.md',
      title: 'Pro Makeup Application Tips',
      excerpt: 'Master the art of makeup application with these expert tips...',
      date: '2024-05-28',
      author: 'Emma Roberts'
    },
    {
      slug: 'summer-essentials',
      filename: 'summer-essentials.md',
      title: 'Summer Beauty Essentials 2024',
      excerpt: 'Must-have beauty products for the summer season...',
      date: '2024-05-15',
      author: 'Olivia Martinez'
    }
  ];

  return posts;
}

// Format date
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Create blog post preview HTML
export function createBlogPostPreview(post) {
  return `
    <article class="blog-post-preview scroll-reveal fade-up">
      <div class="card">
        <div class="card-image" style="background: linear-gradient(135deg, #2D9B6F 0%, #52C197 100%); height: 200px; display: flex; align-items: center; justify-content: center; color: white;">
          <span class="text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </span>
        </div>
        <h3 class="text-lg font-bold mb-2">${post.title}</h3>
        <p class="text-sm text-gray-500 mb-3">
          <span>${formatDate(post.date)}</span> | <span>${post.author}</span>
        </p>
        <p class="text-gray-600 mb-4">${post.excerpt}</p>
        <a href="/blog/posts/${post.slug}.html" class="btn btn-outline btn-sm">
          Read More ->
        </a>
      </div>
    </article>
  `;
}

// Initialize blog page
export async function initBlogPage() {
  const blogContainer = document.getElementById('blog-posts-container');
  if (!blogContainer) return;

  const posts = await loadBlogPosts();
  const postsHTML = posts.map(post => createBlogPostPreview(post)).join('');

  blogContainer.innerHTML = `
    <div class="grid grid-3">
      ${postsHTML}
    </div>
  `;
}

// Initialize single blog post page
export async function initBlogPostPage(filename) {
  const contentContainer = document.getElementById('blog-content');
  if (!contentContainer) return;

  const { meta, html } = await renderMarkdown(filename);

  const headerHTML = `
    <header class="blog-post-header mb-8">
      <h1 class="text-4xl font-bold mb-4">${meta.title || 'Untitled'}</h1>
      <div class="flex gap-4 text-gray-600">
        <span>${meta.author || 'Guest'}</span>
        <span>${formatDate(meta.date || new Date().toISOString())}</span>
      </div>
      <hr class="mt-6 mb-0">
    </header>
  `;

  contentContainer.innerHTML = headerHTML + `<div class="blog-post-content">${html}</div>`;

  // Add scroll reveal to content elements
  contentContainer.querySelectorAll('h2, h3, p, img, blockquote').forEach(el => {
    el.classList.add('scroll-reveal', 'fade-up');
  });
}

export default {
  parseFrontMatter,
  renderMarkdown,
  loadBlogPosts,
  formatDate,
  createBlogPostPreview,
  initBlogPage,
  initBlogPostPage
};
