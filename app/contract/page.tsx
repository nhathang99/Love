"use client";

import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "../styles/Contract.module.css";

export default function ContractLove() {
  const router = useRouter();
  const [pdfKey, setPdfKey] = useState(Date.now()); // Dynamic key to avoid cache

  // Force reload PDF with delay to ensure DOM is ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setPdfKey(Date.now());
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = (): void => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Love Contract</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* Trái tim rơi */}
      <div className={styles.heart}></div>
      <div className={styles.heart}></div>
      <div className={styles.heart}></div>
      <div className={styles.heart}></div>
      <div className={styles.heart}></div>
      {/* Lấp lánh */}
      <div className={styles.sparkle}></div>
      <div className={styles.sparkle}></div>
      <div className={styles.sparkle}></div>
      <div className={styles.sparkle}></div>
      <div className={styles.sparkle}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          I hope you’ll sign the contract, amor ❤️
        </h1>
        <div className={styles.pdfContainer}>
          <object
            key={pdfKey}
            data={`/contract.pdf?t=${pdfKey}`}
            type="application/pdf"
            className={styles.pdfViewer}
            title="Love Contract PDF"
          >
            <p className={styles.fallback}>
              Your browser does not support PDFs.{" "}
              <a href="/contract.pdf" download className={styles.fallbackLink}>
                Download Contract
              </a>
            </p>
          </object>
        </div>
        <div className={styles.buttonContainer}>
          <a href="/contract.pdf" download className={styles.downloadButton}>
            Download Contract
          </a>
          <button onClick={handleBackClick} className={styles.backButton}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
