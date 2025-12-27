'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DiseaseError({ error, reset }) {
  useEffect(() => {
    console.error('Disease detail error:', error);
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Maladie introuvable</h1>
            <p className="text-gray-600">
              Impossible de charger les détails de cette maladie. Elle n'existe peut-être plus ou l'identifiant est incorrect.
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
            href="/diseases"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Liste des maladies
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Utilisez la recherche pour trouver la maladie que vous cherchez.</p>
        </div>
      </div>
    </div>
  );
}
