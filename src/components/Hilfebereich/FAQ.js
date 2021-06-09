import React from 'react';
import Faq from 'react-faq-component';

export default function FaqBereich() {

  const data = {
      title: "FAQ",
      rows: [
        {
          title: "Wie starte ich einen manuellen Fahrauftrag?",
          content: "Lorem ipsum"
        },
        {
            title: "Wie werden Fahraufträge von einem ERP-System importiert?",
            content: "Lorem ipsum"
          },
          {
            title: "Wie kann ich Fahraufträge abbrechen?",
            content: "Lorem ipsum"
          },
  
      ]
    }
    
  const styles = {
      bgColor: '282828',
      titleTextColor: "white",
      rowTitleColor: "white",
      rowContentColor: 'white',
      arrowColor: "white",
  };

  const config = {
      animate: true,
      tabFocus: true
  };
  

  return (

    <div style={{ padding: '2px'}}>
      <Faq data={data} styles={styles} config={config} />
      <br></br>
    </div>
      
  );
}