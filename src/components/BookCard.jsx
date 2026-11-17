import React from 'react';

// Le composant reçoit ses props en paramètre
function BookCard({ titre, auteur, estDisponible, onClickEmprunt }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>{titre}</h3>
      <p>Auteur : {auteur}</p>
      
      {/* Affichage conditionnel du statut */}
      <p>
        Statut : {estDisponible ? "🟢 Disponible" : "🔴 Emprunté"}
      </p>

      {/* Bouton dont le texte et l'action dépendent de la disponibilité */}
      <button onClick={onClickEmprunt}>
        {estDisponible ? "Emprunter" : "Rendre"}
      </button>
    </div>
  );
}

export default BookCard;