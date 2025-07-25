import Head from "next/head";
import LoveQuestion from "./components/LoveQuestion";
import styles from "../app/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Do You Love Me?</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <LoveQuestion />
    </div>
  );
}
