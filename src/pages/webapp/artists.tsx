import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const WebAppPage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
        <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex h-full flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">Welcome to Artists</h1>  
        </main>
    </>
  );
};

export default WebAppPage;
