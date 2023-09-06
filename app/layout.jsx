import "@styles/global.css";
export const metadata = {
  title: "promptopia",
  description: "promptopia is a platform for promotions",
  
};
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import Head from "next/head";
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="/assets/assets/images/logo.svg"  />
      </Head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav/>
            <div>{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
