import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Navbar from "./[components]/navbar";
import './styles/main.scss';
import { translateUtils } from "@/middleware";

export default async function Home() {
const session = await getServerSession(authOptions);

  return (
    <main>
      <Navbar session={session} />
      
      <div className="home">
        <div className="home-title" id={'stdhometitle'}>{translateUtils.Translate('stdhometitle')}</div>
        <div className="home-subtitle" id={'stdhomesubtitle'}>{translateUtils.Translate('stdhomesubtitle')}</div>
        <div className="home-content" id={'stdhomecontent'}>{translateUtils.Translate('stdhomecontent')}</div>
      </div>
    </main>
  );
}
