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
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    },
    header: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: '100%',
      marginBottom: '20px',
      position: 'relative',
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      border: '3px solid #ffffff',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
    },
    dialogueBubble: {
      position: 'relative',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '10px',
      padding: '10px',
      maxWidth: '300px',
      textAlign: 'left',
      fontFamily: 'monospace',
      fontSize: 'clamp(0.8em, 2vw, 1em)',
      marginLeft: '20px',
      fontWeight: 'bold',
    },
    dialogueArrow: {
      content: '""',
      position: 'absolute',
      top: '20px',
      left: '-10px',
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
      borderRight: '10px solid rgba(255, 255, 255, 0.9)',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/images/lucid.jpg" alt="Lucid" style={styles.avatar} />
        <div style={styles.dialogueBubble}>
          <div style={styles.dialogueArrow}></div>
          <p>Hi, Pardon me you are looking at a half baked personal page. check back later.</p>
        </div>
      </header>
    </div>
  );
}

export default HomePage;