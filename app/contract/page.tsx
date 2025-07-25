"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../styles/Contract.module.css";

export default function ContractLove() {
  const router = useRouter();
  const [pdfKey, setPdfKey] = useState(Date.now());

  // Refresh PDF key to avoid caching
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
    // Fallback for download
    const link = document.createElement("a");
    link.href = "/contract.pdf";
    link.download = "contract.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Love Contract</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Falling hearts */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={`heart-${index}`} className={styles.heart} />
      ))}
      {/* Sparkles */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={`sparkle-${index}`} className={styles.sparkle} />
      ))}
      <div className={styles.content}>
        <h1 className={styles.title}>
          I hope you’ll sign the contract, amor ❤️
        </h1>
        <div className={styles.pdfContainer}>
          <iframe
            key={pdfKey}
            src={`/contract.pdf?t=${pdfKey}#toolbar=0`}
            className={styles.pdfViewer}
            title="Love Contract PDF"
          >
            <p className={styles.fallback}>
              Your browser does not support PDFs.{" "}
              <button
                onClick={handleDownloadClick}
                className={styles.fallbackLink}
              >
                Download Contract
              </button>
            </p>
          </iframe>
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
