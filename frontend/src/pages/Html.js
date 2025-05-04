// import React, { useState } from 'react';
// import '../styles/html.css';

// const HtmlModule = () => {
//   const [openSections, setOpenSections] = useState({
//     html: false,
//     elements: false,
//     attributes: false,
//     forms: false,
//     links: false,
//     tables: false,
//   });

//   const [completed, setCompleted] = useState({
//     html: false,
//     elements: false,
//     attributes: false,
//     forms: false,
//     links: false,
//     tables: false,
//   });

//   const toggleOpen = (section) => {
//     setOpenSections({
//       ...openSections,
//       [section]: !openSections[section],
//     });
//   };

//   const toggleComplete = (section, e) => {
//     e.stopPropagation();
//     setCompleted({
//       ...completed,
//       [section]: !completed[section],
//     });
//   };

//   const sections = [
//     {
//       key: 'html',
//       title: 'HTML Basics',
//       description: 'Learn the fundamentals of HTML including structure, syntax, and basic elements like headings, paragraphs, and divs.',
//       video: '/videos/html-basics.mp4',
//       notes: '/notes/html-basics.pdf',
//     },
//     {
//       key: 'elements',
//       title: 'HTML Elements',
//       description: 'Dive deeper into HTML elements such as links, images, forms, and tables. Understand their attributes and usage.',
//       video: '/videos/html-elements.mp4',
//       notes: '/notes/html-elements.pdf',
//     },
//     {
//       key: 'attributes',
//       title: 'HTML Attributes',
//       description: 'Learn how to use attributes in HTML elements to modify their behavior, such as src for images or href for links.',
//       video: '/videos/html-attributes.mp4',
//       notes: '/notes/html-attributes.pdf',
//     },
//     {
//       key: 'forms',
//       title: 'HTML Forms',
//       description: 'Understand how to create interactive forms with HTML, including input fields, radio buttons, checkboxes, and more.',
//       video: '/videos/html-forms.mp4',
//       notes: '/notes/html-forms.pdf',
//     },
//     {
//       key: 'links',
//       title: 'HTML Links',
//       description: 'Learn how to create links with anchor tags, linking to internal and external resources, and using anchor tag attributes.',
//       video: '/videos/html-links.mp4',
//       notes: '/notes/html-links.pdf',
//     },
//     {
//       key: 'tables',
//       title: 'HTML Tables',
//       description: 'Learn how to create tables with rows, columns, and cells, and format them with HTML for better presentation.',
//       video: '/videos/html-tables.mp4',
//       notes: '/notes/html-tables.pdf',
//     },
//   ];

//   return (
//     <div className="html-wrapper">
//       <h2 className="html-header">HTML Topics</h2>

//       {sections.map((section) => (
//         <div
//           key={section.key}
//           className={`module-box ${openSections[section.key] ? 'active' : ''}`}
//           onClick={() => toggleOpen(section.key)}
//         >
//           <div className="module-header">
//             <div className="module-title">
//               {openSections[section.key] ? '▼' : '➤'} {section.title}
//             </div>
//             <label className="checkbox-label" onClick={(e) => toggleComplete(section.key, e)}>
//               <input
//                 type="checkbox"
//                 checked={completed[section.key]}
//                 onChange={(e) => toggleComplete(section.key, e)}
//               />
//               Completed
//             </label>
//           </div>
//           {openSections[section.key] && (
//             <div className="module-content">
//               <p>{section.description}</p>
//               <a href={section.video} target="_blank" rel="noopener noreferrer">
//                 Watch Video
//               </a>
//               <br />
//               <a href={section.notes} target="_blank" rel="noopener noreferrer">
//                 View Notes
//               </a>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HtmlModule;
import React, { useState } from 'react';
import '../styles/html.css';

const HTML = () => {
  const [openSections, setOpenSections] = useState({
    html: false,
    elements: false,
    attributes: false,
    forms: false,
    links: false,
    tables: false,
  });

  const [completed, setCompleted] = useState({
    html: false,
    elements: false,
    attributes: false,
    forms: false,
    links: false,
    tables: false,
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
      key: 'html',
      title: 'HTML Basics',
      description: 'Learn the fundamentals of HTML including structure, syntax, and basic elements like headings, paragraphs, and divs.',
      video: '/videos/html-basics.mp4',
      notes: '/notes/html-basics.pdf',
    },
    {
      key: 'elements',
      title: 'HTML Elements',
      description: 'Dive deeper into HTML elements such as links, images, forms, and tables. Understand their attributes and usage.',
      video: '/videos/html-elements.mp4',
      notes: '/notes/html-elements.pdf',
    },
    {
      key: 'attributes',
      title: 'HTML Attributes',
      description: 'Learn how to use attributes in HTML elements to modify their behavior, such as src for images or href for links.',
      video: '/videos/html-attributes.mp4',
      notes: '/notes/html-attributes.pdf',
    },
    {
      key: 'forms',
      title: 'HTML Forms',
      description: 'Understand how to create interactive forms with HTML, including input fields, radio buttons, checkboxes, and more.',
      video: '/videos/html-forms.mp4',
      notes: '/notes/html-forms.pdf',
    },
    {
      key: 'links',
      title: 'HTML Links',
      description: 'Learn how to create links with anchor tags, linking to internal and external resources, and using anchor tag attributes.',
      video: '/videos/html-links.mp4',
      notes: '/notes/html-links.pdf',
    },
    {
      key: 'tables',
      title: 'HTML Tables',
      description: 'Learn how to create tables with rows, columns, and cells, and format them with HTML for better presentation.',
      video: '/videos/html-tables.mp4',
      notes: '/notes/html-tables.pdf',
    },
  ];

  return (
    <div className="html-wrapper">
      <h2 className="html-header">CSS Topics</h2>

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

export default HTML;
