"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../styles/Contract.module.css";

export default function ContractLove() {
  const router = useRouter();
  const [pdfKey, setPdfKey] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      setPdfKey(Date.now());
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    router.push("/");
  };

  const handleDownloadClick = () => {
    // Optional: Add analytics or logging here
    window.location.href = "/Contract.pdf"; // Fallback for download
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Love Contract</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Falling hearts */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.heart}></div>
      ))}
      {/* Sparkles */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={styles.sparkle}></div>
      ))}
      <div className={styles.content}>
        <h1 className={styles.title}>
          I hope you’ll sign the contract, amor ❤️
        </h1>
        <div className={styles.pdfContainer}>
          <object
            key={pdfKey}
            data={`/Contract.pdf?t=${pdfKey}`}
            type="application/pdf"
            className={styles.pdfViewer}
            title="Love Contract PDF"
          >
            <p className={styles.fallback}>
              Your browser does not support PDFs.{" "}
              <a
                href="/Contract.pdf"
                download
                className={styles.fallbackLink}
                onClick={handleDownloadClick}
              >
                Download Contract
              </a>
            </p>
          </object>
        </div>
        <div className={styles.buttonContainer}>
          <button
            onClick={handleDownloadClick}
            className={styles.downloadButton}
          >
            Download Contract
          </button>
          <button onClick={handleBackClick} className={styles.backButton}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
