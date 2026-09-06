'use client';

import React, { useState } from 'react';

export default function RecruteurPage() {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    type: 'Stage PFE',
    duration: '6 mois',
    description: '',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Récupérer les offres existantes ou initialiser un tableau vide
    const existingStages = JSON.parse(localStorage.getItem('custom_stages') || '[]');
    const newStage = {
      id: Date.now(),
      ...formData,
    };

    // Sauvegarder la nouvelle offre
    localStorage.setItem('custom_stages', JSON.stringify([newStage, ...existingStages]));
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-200">
        <a href="/" className="text-2xl font-bold text-gray-900">
          OPT-Stage
        </a>
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="/" className="hover:text-black">Accueil</a>
          <a href="/cv" className="hover:text-black">Mon CV</a>
          <a href="/recruteur" className="font-bold text-black">Espace Recruteur</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Publier une offre de stage</h1>
        <p className="text-gray-600 mb-8">Remplissez le formulaire ci-dessous pour proposer un stage aux étudiants.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nom de l'entreprise</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Ex: Tech Solutions"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email de contact</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Ex: rh@entreprise.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Intitulé du poste</label>
              <input
                type="text"
                name="title"
                placeholder="Ex: Développeur Web Fullstack Junior"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ville / Lieu</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Ex: Casablanca"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Type de stage</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  <option value="Stage PFE">Stage PFE</option>
                  <option value="Stage Fonctionnel">Stage Fonctionnel</option>
                  <option value="Stage d'observation">Stage d'observation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Durée</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Ex: 6 mois"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description de la mission</label>
              <textarea
                name="description"
                placeholder="Décrivez les missions principales..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition"
            >
              Publier l'offre
            </button>
          </form>
        ) : (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Offre publiée avec succès !</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Votre offre pour <strong>{formData.title}</strong> chez <strong>{formData.company}</strong> est désormais en ligne.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Publier une autre offre
              </button>
              <a
                href="/"
                className="bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Voir les offres sur l'accueil
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}