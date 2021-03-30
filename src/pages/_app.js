import "../assets/css/style.css";
import "../assets/css/form.css";
import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Pet Care App</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/pets/new">
            <a>Add Pet</a>
          </Link>
        </div>

        <Link href="/">
          <a>
            <img
              id="title"
              src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
              alt="pet care logo"
            ></img>
          </a>
        </Link>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </Fragment>
  );
}

export default MyApp;
