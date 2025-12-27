'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DiseasesError({ error, reset }) {
  useEffect(() => {
    console.error('Diseases page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          {/* Error Icon */}
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Erreur de chargement</h1>
            <p className="text-gray-600">
              Impossible de charger la liste des maladies. Cela peut être dû à un problème de connexion.
            </p>
          </div>

          {/* Error Details (development only) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-xs font-semibold text-gray-700 mb-2">Détails de l'erreur (dev only):</p>
              <p className="text-sm font-mono text-red-600 break-all">
                {error.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>

        {/* Troubleshooting Tips */}
        <div className="mt-8 text-sm text-gray-500 space-y-2 text-left">
          <p className="font-semibold text-center">Conseils de dépannage:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Vérifiez votre connexion Internet</li>
            <li>Actualisez la page</li>
            <li>Réessayez dans quelques instants</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
