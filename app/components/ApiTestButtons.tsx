"use client";

import { useState } from "react";
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ApiTestButtons() {
  const [firestoreResult, setFirestoreResult] = useState<string | null>(null);
  const [openAiResult, setOpenAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [openAiStatus, setOpenAiStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>("idle");
  const [openAiStatusMsg, setOpenAiStatusMsg] = useState<string | null>(null);

  // Firestore Read
  const testFirestoreRead = async () => {
    setLoading("firestoreRead");
    setFirestoreResult(null);
    try {
      const snapshot = await getDocs(collection(db, "test"));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFirestoreResult("Read success: " + JSON.stringify(docs));
    } catch (e: any) {
      setFirestoreResult("Read error: " + (e.message || e.toString()));
    }
    setLoading(null);
  };

  // Firestore Write
  const testFirestoreWrite = async () => {
    setLoading("firestoreWrite");
    setFirestoreResult(null);
    try {
      const docRef = await addDoc(collection(db, "test"), {
        createdAt: serverTimestamp(),
        testValue: Math.random().toString(36).substring(2, 8),
      });
      setFirestoreResult("Write success: doc id " + docRef.id);
    } catch (e: any) {
      setFirestoreResult("Write error: " + (e.message || e.toString()));
    }
    setLoading(null);
  };

  // Real OpenAI test
  const testOpenAI = async () => {
    setLoading("openai");
    setOpenAiResult(null);
    try {
      const response = await fetch("/api/ai-coach-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "I want a coach for strength training and nutrition" })
      });
      if (!response.ok) throw new Error("API error: " + response.status);
      const data = await response.json();
      setOpenAiResult(
        `Explanation: ${data.explanation || ""}\nMatches: ${JSON.stringify(data.matches, null, 2)}`
      );
    } catch (e: any) {
      setOpenAiResult("OpenAI API error: " + (e.message || e.toString()));
    }
    setLoading(null);
  };

  const checkOpenAiStatus = async () => {
    setOpenAiStatus("checking");
    setOpenAiStatusMsg(null);
    try {
      const response = await fetch("/api/ai-coach-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "ping" })
      });
      if (!response.ok) throw new Error("API error: " + response.status);
      setOpenAiStatus("connected");
      setOpenAiStatusMsg(null);
    } catch (e: any) {
      setOpenAiStatus("error");
      setOpenAiStatusMsg(e.message || e.toString());
    }
  };

  return (
    <section className="my-12 max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-xl font-bold mb-4">API Test Buttons (DEV)</h2>
      <div className="flex gap-4 mb-6">
        <button
          onClick={testFirestoreRead}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={loading === "firestoreRead"}
        >
          {loading === "firestoreRead" ? "Reading..." : "Read from Firestore"}
        </button>
        <button
          onClick={testFirestoreWrite}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={loading === "firestoreWrite"}
        >
          {loading === "firestoreWrite" ? "Writing..." : "Write to Firestore"}
        </button>
        <button
          onClick={testOpenAI}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          disabled={loading === "openai"}
        >
          {loading === "openai" ? "Testing..." : "Test OpenAI"}
        </button>
      </div>
      <div className="space-y-2">
        {firestoreResult && <div className="text-blue-700">{firestoreResult}</div>}
        {openAiResult && <div className="text-green-700">{openAiResult}</div>}
      </div>
    </section>
  );
} 