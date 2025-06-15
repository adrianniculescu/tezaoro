
import React from 'react';
import { Helmet } from 'react-helmet';

interface BlogPostSchemaProps {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  url: string;
  imageUrl?: string;
  readingTime?: string;
  category?: string;
  keywords?: string[];
}

const BlogPostSchema: React.FC<BlogPostSchemaProps> = ({
  title,
  description,
  author,
  publishedDate,
  modifiedDate,
  url,
  imageUrl,
  readingTime,
  category,
  keywords = []
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://tezaoro.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Tezaoro",
      "url": "https://tezaoro.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tezaoro.com/lovable-uploads/4e78d349-f6e7-45a0-826d-df094405dfee.png"
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(imageUrl && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": 1200,
        "height": 630
      }
    }),
    ...(readingTime && {
      "timeRequired": readingTime
    }),
    ...(category && {
      "articleSection": category
    }),
    ...(keywords.length > 0 && {
      "keywords": keywords.join(", ")
    }),
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://tezaoro.com/blog"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
};

export default BlogPostSchema;
