'use client';

import React, { useState, useEffect } from 'react';

const mockStages = [
  {
    id: 1,
    title: "Développeur Web Fullstack Junior",
    company: "Tech Solutions",
    location: "Casablanca",
    type: "Stage PFE",
    duration: "6 mois",
    description: "Développement d'applications web modernes avec React et Python.",
  },
  {
    id: 2,
    title: "Assistant UI/UX Designer",
    company: "Creative Studio",
    location: "Rabat",
    type: "Stage Fonctionnel",
    duration: "3 mois",
    description: "Conception d'interfaces utilisateurs et maquettes interactives.",
  },
  {
    id: 3,
    title: "Data Analyst Stagiaire",
    company: "DataCorp",
    location: "À distance",
    type: "Stage PFE",
    duration: "6 mois",
    description: "Analyse de données, création de dashboards et rapports d'activité.",
  },
  {
    id: 4,
    title: "Développeur Mobile Flutter",
    company: "Appify",
    location: "Casablanca",
    type: "Stage PFE",
    duration: "6 mois",
    description: "Création d'applications mobiles iOS et Android.",
  },
];

export default function Home() {
  const [allStages, setAllStages] = useState(mockStages);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Tous');
  const [selectedStage, setSelectedStage] = useState<typeof mockStages[0] | null>(null);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    // Charger les offres créées par les recuteurs
    const custom = JSON.parse(localStorage.getItem('custom_stages') || '[]');
    setAllStages([...custom, ...mockStages]);

    // Charger les favoris
    const favs = JSON.parse(localStorage.getItem('favorite_stages') || '[]');
    setFavorites(favs);
  }, []);

  const toggleFavorite = (id: number) => {
    let updatedFavs: number[];
    if (favorites.includes(id)) {
      updatedFavs = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavs = [...favorites, id];
    }
    setFavorites(updatedFavs);
    localStorage.setItem('favorite_stages', JSON.stringify(updatedFavs));
  };

  const filteredStages = allStages.filter((stage) => {
    const matchesSearch =
      stage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stage.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stage.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = stage.location
      .toLowerCase()
      .includes(locationTerm.toLowerCase());

    const matchesType =
      selectedType === 'Tous' || stage.type === selectedType;

    const matchesFavorite = !showOnlyFavorites || favorites.includes(stage.id);

    return matchesSearch && matchesLocation && matchesType && matchesFavorite;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStage) {
      const existingApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
      const newApp = {
        stageId: selectedStage.id,
        stageTitle: selectedStage.title,
        company: selectedStage.company,
        location: selectedStage.location,
        appliedAt: new Date().toLocaleDateString('fr-FR'),
        coverLetter: coverLetter,
        status: "En cours d'examen",
      };

      localStorage.setItem('my_applications', JSON.stringify([newApp, ...existingApps]));
    }

    setApplied(true);
  };

  const closeModal = () => {
    setSelectedStage(null);
    setApplied(false);
    setCoverLetter('');
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-200">
        <a href="/" className="text-2xl font-bold text-gray-900">
          OPT-Stage
        </a>

        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="/" className="hover:text-black font-semibold">Accueil</a>
          <a href="/mes-candidatures" className="hover:text-black">Mes Candidatures</a>
          <a href="/cv" className="hover:text-black">Mon CV</a>
          <a href="/recruteur" className="hover:text-black text-sm bg-gray-100 px-3 py-1.5 rounded-md">
            Déposer une offre
          </a>
        </div>
      </nav>

      {/* Hero & Recherche */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-12 bg-white">
        <h1 className="text-5xl font-bold text-gray-900 max-w-3xl leading-tight">
          Trouve ton stage. <br />
          Construis ton avenir.
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl text-lg">
          Découvre des opportunités de stages adaptées à ton profil et crée un CV professionnel en quelques clics.
        </p>

        {/* Barre de Recherche */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-2xl">
          <input
            type="text"
            placeholder="🔍 Rechercher un stage, métier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="text"
            placeholder="📍 Ville (ex: Casablanca, Rabat...)"
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
            className="w-full sm:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {['Tous', 'Stage PFE', 'Stage Fonctionnel'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedType === type
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}

          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${
              showOnlyFavorites
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            ❤️ Mes Favoris ({favorites.length})
          </button>
        </div>
      </section>

      {/* Liste des Offres */}
      <section id="offres" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Offres de stage ({filteredStages.length})
        </h2>

        {filteredStages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg">Aucun stage ne correspond à votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredStages.map((stage) => {
              const isFav = favorites.includes(stage.id);

              return (
                <div key={stage.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded">
                        {stage.type}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 font-medium">⏱️ {stage.duration}</span>
                        <button
                          onClick={() => toggleFavorite(stage.id)}
                          className="text-xl hover:scale-110 transition"
                        >
                          {isFav ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{stage.title}</h3>
                    <p className="text-gray-600 font-medium mt-1">🏢 {stage.company} • 📍 {stage.location}</p>
                    <p className="text-gray-600 text-sm mt-3">{stage.description}</p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                    <button
                      onClick={() => setSelectedStage(stage)}
                      className="w-full bg-black text-white text-center font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                      Postuler à cette offre
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Modale de Postulation */}
      {selectedStage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-black font-bold text-xl"
            >
              ✕
            </button>

            {!applied ? (
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                  {selectedStage.type}
                </span>
                <h3 className="text-2xl font-bold text-gray-900">{selectedStage.title}</h3>
                <p className="text-gray-600 font-medium mt-1">{selectedStage.company} — {selectedStage.location}</p>
                
                <p className="text-gray-700 text-sm mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {selectedStage.description}
                </p>

                <form onSubmit={handleApplySubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Message de motivation
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Expliquez brièvement pourquoi ce stage vous intéresse..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                    />
                  </div>

                  <div className="bg-green-50 text-green-800 p-3 rounded-lg text-xs font-medium border border-green-200">
                    ✓ Votre CV généré sera transmis automatiquement avec la candidature.
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition"
                    >
                      Envoyer ma candidature
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900">Candidature envoyée !</h3>
                <p className="text-gray-600 text-sm mt-2">
                  Votre profil et votre message ont été transmis à <strong>{selectedStage.company}</strong>.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <a
                    href="/mes-candidatures"
                    className="px-5 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition"
                  >
                    Voir mes candidatures
                  </a>
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}