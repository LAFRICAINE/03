import React, { useState } from 'react';
import BookCard from './components/BookCard';

function App() {
  // 1. État contenant la liste initiale des livres (au moins 4)
  const [books, setBooks] = useState([
    { id: 1, titre: 'Les Misérables', auteur: 'Victor Hugo', estDisponible: true },
    { id: 2, titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', estDisponible: false },
    { id: 3, titre: '1984', auteur: 'George Orwell', estDisponible: true },
    { id: 4, titre: 'L’Étranger', auteur: 'Albert Camus', estDisponible: true },
  ]);

  // États pour les champs du formulaire d'ajout
  const [nouveauTitre, setNouveauTitre] = useState('');
  const [nouvelAuteur, setNouvelAuteur] = useState('');

  // 3. Calculer le nombre total de livres disponibles en temps réel[cite: 2]
  const livresDisponiblesCount = books.filter(book => book.estDisponible).length;

  // 1. Fonction pour inverser la disponibilité d'un livre via son ID[cite: 2]
  const handleEmprunt = (bookId) => {
    setBooks(books.map(book => {
      if (book.id === bookId) {
        // On inverse la valeur de estDisponible
        return { ...book, estDisponible: !book.estDisponible };
      }
      return book;
    }));
  };

  // 3. Fonction de soumission du formulaire d'ajout[cite: 2]
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page[cite: 2]

    // Vérification que les champs ne sont pas vides (en retirant les espaces superflus)
    if (nouveauTitre.trim() === '' || nouvelAuteur.trim() === '') {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    // Création du nouveau livre (disponible par défaut)[cite: 2]
    const nouveauLivre = {
      id: Date.now(), // Utilisation du timestamp comme ID unique
      titre: nouveauTitre,
      auteur: nouvelAuteur,
      estDisponible: true,
    };

    // Ajout à la liste et réinitialisation du formulaire[cite: 2]
    setBooks([...books, nouveauLivre]);
    setNouveauTitre('');
    setNouvelAuteur('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Bibliothèque Universitaire</h1>
      
      {/* Affichage du nombre de livres disponibles en temps réel */}
      <h2>Livres disponibles : {livresDisponiblesCount} / {books.length}</h2>

      {/* Formulaire d'ajout de livre */}
      <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
        <h3>Ajouter un nouveau livre</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Titre du livre"
            value={nouveauTitre}
            onChange={(e) => setNouveauTitre(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
          />
          <input
            type="text"
            placeholder="Auteur"
            value={nouvelAuteur}
            onChange={(e) => setNouvelAuteur(e.target.value)}
            style={{ padding: '8px', marginRight: '10px', width: '200px' }}
          />
          <button type="submit" style={{ padding: '8px 15px' }}>Ajouter</button>
        </div>
      </form>

      <hr />

      {/* Affichage de la liste des livres avec .map() */}
      <div>
        {books.map(book => (
          <BookCard
            key={book.id} // Clé unique obligatoire pour chaque élément de liste[cite: 1, 2]
            titre={book.titre}
            auteur={book.auteur}
            estDisponible={book.estDisponible}
            onClickEmprunt={() => handleEmprunt(book.id)} // Transmission de la fonction avec l'ID
          />
        ))}
      </div>
    </div>
  );
}

export default App;