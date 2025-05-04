import React, { useState } from 'react';
import '../styles/css.css';

const Css = () => {
  const [openSections, setOpenSections] = useState({
    css: false,
    selectors: false,
    fontStyles: false,
    headingStyles: false,
    boxModel: false,
    layout: false,
  });

  const [completed, setCompleted] = useState({
    css: false,
    selectors: false,
    fontStyles: false,
    headingStyles: false,
    boxModel: false,
    layout: false,
  });

  const toggleOpen = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const toggleComplete = (section, e) => {
    e.stopPropagation();
    setCompleted({
      ...completed,
      [section]: !completed[section],
    });
  };

  const sections = [
    {
      key: 'css',
      title: 'CSS Basics',
      description: 'Learn the fundamentals of CSS, including syntax, selectors, properties, and how to apply styles to your web pages.',
      video: '/videos/css-basics.mp4',
      notes: '/notes/css-basics.pdf',
    },
    {
      key: 'selectors',
      title: 'CSS Selectors',
      description: 'Learn about element selectors, class selectors, ID selectors, and more to apply styles precisely to the right elements.',
      video: '/videos/css-selectors.mp4',
      notes: '/notes/css-selectors.pdf',
    },
    {
      key: 'fontStyles',
      title: 'Font Styles',
      description: 'Explore how to use CSS to modify the fonts in your web pages, including font families, sizes, weights, and styles.',
      video: '/videos/font-styles.mp4',
      notes: '/notes/font-styles.pdf',
    },
    {
      key: 'headingStyles',
      title: 'Heading Styles',
      description: 'Understand how to style headings (h1, h2, h3, etc.) using CSS to create visually appealing and organized content.',
      video: '/videos/heading-styles.mp4',
      notes: '/notes/heading-styles.pdf',
    },
    {
      key: 'boxModel',
      title: 'The Box Model',
      description: 'Learn about the CSS Box Model, which defines the space occupied by an element: content, padding, border, and margin.',
      video: '/videos/box-model.mp4',
      notes: '/notes/box-model.pdf',
    },
    {
      key: 'layout',
      title: 'CSS Layout (Flexbox, Grid)',
      description: 'Master modern layout techniques like Flexbox and Grid to structure your content in a responsive and flexible way.',
      video: '/videos/css-layout.mp4',
      notes: '/notes/css-layout.pdf',
    },
  ];

  return (
    <div className="css-wrapper">
      <h2 className="css-header">CSS Topics</h2>

      {sections.map((section) => (
        <div
          key={section.key}
          className={`module-box ${openSections[section.key] ? 'active' : ''}`}
          onClick={() => toggleOpen(section.key)}
        >
          <div className="module-header">
            <div className="module-title">
              {openSections[section.key] ? '▼' : '➤'} {section.title}
            </div>
            <label className="checkbox-label" onClick={(e) => toggleComplete(section.key, e)}>
              <input
                type="checkbox"
                checked={completed[section.key]}
                onChange={() => {}}
              />
              <span className="checkbox-custom"></span>
            </label>
          </div>

          {openSections[section.key] && (
            <div className="module-content">
              <p>{section.description}</p>

              <div className="resource-section">
                <div className="video-box">
                  <video controls width="100%">
                    <source src={section.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="notes-box">
                  <a
                    href={section.notes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="notes-link"
                  >
                    📄 View Notes (PDF)
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Css;
