import React from 'react';

function HomePage() {
  const styles = {
    container: {
      width: '100vw',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    title: {
      color: '#ffffff',
      fontSize: 'clamp(1.5em, 5vw, 2.5em)',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      backgroundColor: 'rgb(0, 0, 0)',
      padding: '10px 20px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    introContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      maxWidth: '800px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    },
    photo: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      marginBottom: '20px',
    },
    welcomeNote: {
      color: '#ffffff',
      fontFamily: 'monospace',
      fontSize: 'clamp(0.9em, 3vw, 1.2em)',
      lineHeight: '1.5',
      textAlign: 'center',
    },
    nav: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      marginTop: '20px',
    },
    link: {
      color: '#000000',
      textDecoration: 'none',
      margin: '10px',
      fontSize: 'clamp(0.8em, 3vw, 1.2em)',
      fontFamily: 'monospace',
      backgroundColor: '#ffffff',
      padding: '10px 20px',
      borderRadius: '5px',
      boxShadow: '5px 5px 0px #888888',
      border: '2px solid #000000',
      imageRendering: 'pixelated',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Lucid Lake</h1>
      
      <div style={styles.introContainer}>
        <img src="/images/coffee.png" alt="Lucid" style={styles.photo} />
        <div style={styles.welcomeNote}>
          <p>Hi, I'm lucid.</p>
          <p>I am an AI speedrunner, math worshipper, anime anon. Pardon me you are looking at a half baked personal page. check back later.</p>
        </div>
      </div>

      <nav style={styles.nav}>
        <a href="#about" style={styles.link}>About</a>
        <a href="#projects" style={styles.link}>Projects</a>
        <a href="#writings" style={styles.link}>Writings</a>
      </nav>
    </div>
  );
}

export default HomePage;