"use client"
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import { signOut, signIn, getProviders, useSession } from "next-auth/react";
import { useState , useEffect} from "react";
const Nav = () => {
  const {data:session} = useSession()
  const router = useRouter()
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    const getProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    getProvider();
  }, []);
  const [toogle, setToogle] = useState(false);
  return (
    <nav className="flex-between w-full pt-3 mb-16">
      <Link href="/" className="flex-center flex gap-2">
        <Image
          src={"/assets/assets/images/logo.svg"}
          height={30}
          width={30}
          alt="Promptopia logo"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop nav */}
      <div className="sm:flex hidden">
        {session ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className=" black_btn">
              create post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={session.user.image}
                height={37}
                width={37}
                alt="user icon"
                className=" rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => {
                    signIn(provider.id)
                  }}
                  key={provider.name}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile nav */}
      <div className="sm:hidden flex">
        {session ? (
          <div className="flex relative">
            <Image
              src={session.user.image}
              className="cursor-pointer rounded-full"
              height={37}
              width={37}
              alt="user icon"
              onClick={() => setToogle((prev) => !prev)}
            />
            {toogle && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className=" dropdown_link "
                  onClick={() => {
                    setToogle(false);
                  }}
                >
                  profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className=" dropdown_link "
                  onClick={() => {
                    setToogle(false);
                  }}
                >
                  create post
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToogle(false);
                    signOut();
                  }}
                  className="black_btn mt-2 w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  onClick={() => {
                    signIn(provider.id)
                    router.push("/profile")
                  }}
                  key={provider.name}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
