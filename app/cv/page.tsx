
'use client';

import React, { useState } from 'react';

export default function CvPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    education: '',
    skills: '',
    experience: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation - masquée à l'impression */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-200 print:hidden">
        <a href="/" className="text-2xl font-bold text-gray-900">
          OPT-Stage
        </a>
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="/" className="hover:text-black">Accueil</a>
          <a href="/" className="hover:text-black">Trouver un stage</a>
          <a href="/cv" className="font-bold text-black">Mon CV</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 print:hidden">Créer mon CV</h1>
        <p className="text-gray-600 mb-8 print:hidden">Remplis les informations ci-dessous pour générer ton CV.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nom complet"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Parcours & Compétences</h2>
              <div className="space-y-4">
                <textarea
                  name="education"
                  placeholder="Études et Formations (ex: Licence Génie Informatique, 2024-2026)"
                  value={formData.education}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <textarea
                  name="skills"
                  placeholder="Compétences (ex: Python, HTML/CSS, React, Communication...)"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                <textarea
                  name="experience"
                  placeholder="Expériences / Projets (ex: Projet académique de création d'application web...)"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-800 transition"
            >
              Générer l'aperçu du CV
            </button>
          </form>
        ) : (
          /* Aperçu du CV généré */
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-md">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{formData.fullName || 'Nom Prénom'}</h2>
              <p className="text-gray-600 mt-1">
                {formData.email} {formData.phone && `• ${formData.phone}`} {formData.city && `• ${formData.city}`}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Formations</h3>
                <p className="text-gray-700 whitespace-pre-line">{formData.education || 'Aucune formation indiquée.'}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Compétences</h3>
                <p className="text-gray-700 whitespace-pre-line">{formData.skills || 'Aucune compétence indiquée.'}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 border-b pb-1 mb-2">Expériences & Projets</h3>
                <p className="text-gray-700 whitespace-pre-line">{formData.experience || 'Aucune expérience indiquée.'}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8 print:hidden">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                ← Modifier les informations
              </button>
              
              <button
                onClick={handlePrint}
                className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Télécharger en PDF / Imprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}