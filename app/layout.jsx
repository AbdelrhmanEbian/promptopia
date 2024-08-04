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
        {/* <link rel="icon" href="/assets/assets/images/favicon.ico" /> */}
        {/* Other meta tags and headers can be added here */}
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
