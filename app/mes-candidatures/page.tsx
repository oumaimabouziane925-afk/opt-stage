'use client';

import React, { useEffect, useState } from 'react';

interface Application {
  stageId: number;
  stageTitle: string;
  company: string;
  location: string;
  appliedAt: string;
  coverLetter: string;
  status: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem('my_applications') || '[]');
    setApplications(savedApps);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-200">
        <a href="/" className="text-2xl font-bold text-gray-900">
          OPT-Stage
        </a>
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="/" className="hover:text-black">Accueil</a>
          <a href="/mes-candidatures" className="font-bold text-black">Mes Candidatures</a>
          <a href="/cv" className="hover:text-black">Mon CV</a>
          <a href="/recruteur" className="hover:text-black text-sm bg-gray-100 px-3 py-1.5 rounded-md">
            Déposer une offre
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Suivi de mes candidatures</h1>
        <p className="text-gray-600 mb-8">Retrouvez l'historique et l'état des stages auxquels vous avez postulé.</p>

        {applications.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-gray-200 text-center">
            <div className="text-4xl mb-3">📑</div>
            <p className="text-gray-600 font-medium mb-4">Vous n'avez envoyé aucune candidature pour le moment.</p>
            <a
              href="/"
              className="inline-block bg-black text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition"
            >
              Découvrir les offres de stage
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                <div>
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded mb-2">
                    {app.status || 'En attente de réponse'}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{app.stageTitle}</h3>
                  <p className="text-gray-600 text-sm font-medium">🏢 {app.company} • 📍 {app.location}</p>
                  <p className="text-xs text-gray-400 mt-2">Envoyée le : {app.appliedAt}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-600 max-w-xs">
                  <p className="font-semibold text-gray-700 mb-1">Message envoyé :</p>
                  <p className="italic line-clamp-2">"{app.coverLetter}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}