'use client';
import React, { useEffect, useState } from 'react';
import { fetchSefariaText } from '@/lib/fetchSefariaText';

export function SourceRenderer({ refText }: { refText: string }) {
  const [hebrew, setHebrew] = useState<string[]>([]);
  const [english, setEnglish] = useState<string[]>([]);

  useEffect(() => {
    async function loadText() {
      const { hebrew, english } = await fetchSefariaText(refText);
      setHebrew(hebrew);
      setEnglish(english);
    }
    loadText();
  }, [refText]);

  return (
    <div className="space-y-4 mt-4">
      {hebrew.map((line, i) => (
        <div key={i} className="border-b pb-2">
          <p dir="rtl" className="text-xl font-semibold">{line}</p>
          <p className="text-base text-gray-700">{english[i] || ''}</p>
        </div>
      ))}
    </div>
  );
}
