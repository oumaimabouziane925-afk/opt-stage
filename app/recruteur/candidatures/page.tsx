'use client';

import React, { useEffect, useState } from 'react';

export default function RecruiterApplicationsList() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    setApps(JSON.parse(localStorage.getItem('my_applications') || '[]'));
  }, []);

  const updateStatus = (index: number, newStatus: string) => {
    const updated = apps.map((app, i) => (i === index ? { ...app, status: newStatus } : app));
    setApps(updated);
    localStorage.setItem('my_applications', JSON.stringify(updated));
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <nav className="flex items-center justify-between px-10 py-5 bg-white border-b border-gray-200">
        <a href="/" className="text-2xl font-bold text-gray-900">OPT-Stage</a>
        <div className="flex items-center gap-8 text-gray-700 font-medium text-sm">
          <a href="/">Accueil</a>
          <a href="/recruteur">Publier une offre</a>
          <a href="/recruteur/candidatures" className="font-bold text-black">Candidatures reçues</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Candidatures reçues</h1>
        {apps.length === 0 ? (
          <p className="text-gray-500 bg-white p-6 rounded-lg border text-center">Aucune candidature reçue.</p>
        ) : (
          <div className="space-y-4">
            {apps.map((app, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900">{app.stageTitle}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-semibold text-gray-700">Entreprise :</span> {app.company}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="font-semibold text-gray-700">Message :</span> "{app.coverLetter}"
                  </p>
                </div>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(i, e.target.value)}
                  className="p-2 border rounded text-xs font-semibold bg-white cursor-pointer"
                >
                  <option value="En cours d'examen">⏳ En cours d'examen</option>
                  <option value="Accepté pour entretien">✅ Accepté pour entretien</option>
                  <option value="Refusé">❌ Refusé</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}