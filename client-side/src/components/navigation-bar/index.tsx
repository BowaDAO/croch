import Link from "next/link";
import { Logo, SearchBox, NavAccount, DropDown } from "..";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StateType } from "@/redux/store";
import {
  setOpenLoginModal,
  setOpenSignupModal,
  setOpenDropDown,
} from "@/redux/slices/modal";
import { useCurrentUser } from "@/utilities";
import { signOut } from "next-auth/react";
const unauthenticatedLinks = [
  { label: "Log in", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Sell Your Creative", href: "/creative/home" },
  { label: "Help center", href: "/help-center" },
];

const authenticatedLinks = [
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Order", href: "/order" },
  { label: "Profile", href: "/profile" },
  { label: "Sign out", href: "/signout" },
];

const NavigationBar = () => {
  const { openDropDown } = useSelector((state: StateType) => state.modal);

  const { session, role } = useCurrentUser();

  const dispatch: DispatchType = useDispatch();

  const openLoginModal = () => {
    dispatch(setOpenLoginModal(true));
    document.body.style.overflow = "hidden";
  };

  const openSignupModal = () => {
    dispatch(setOpenSignupModal(true));
    document.body.style.overflow = "hidden";
  };

  return (
    <nav className="nav_container">
      <Logo />

      <span className="hidden lg:inline-block w-[40%]">
        <SearchBox onChange={() => {}} />
      </span>

      <div className="flex items-center">
        {(!session || role !== "customer") && (
          <Link
            href={"/creative/home"}
            className="text-base font-medium hover:bg-gray rounded-3xl py-3 px-4 hidden lg:inline-block"
          >
            Sell Your Creative
          </Link>
        )}

        <span className=" relative">
          <NavAccount
            onClick={() => {
              openDropDown
                ? dispatch(setOpenDropDown(false))
                : dispatch(setOpenDropDown(true));
            }}
            opened={openDropDown}
          />

          {openDropDown && (
            <DropDown extraClasses="right-0 mt-2">
              {!session &&
                unauthenticatedLinks.map((item, index) => {
                  return (
                    <Link
                      href={item.href}
                      key={index}
                      className="text-sm font-semibold hover:bg-gray px-5 py-3"
                      onClick={(e) => {
                        item.href === "/login"
                          ? e.preventDefault()
                          : item.href === "/signup"
                            ? e.preventDefault()
                            : null;

                        item.href === "/login"
                          ? openLoginModal()
                          : item.href === "/signup"
                            ? openSignupModal()
                            : null;

                        setOpenDropDown(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              {session &&
                authenticatedLinks.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-sm font-semibold hover:bg-gray px-5 py-3"
                      onClick={(e) => {
                        item.href === "/signout" ? e.preventDefault() : null;

                        item.href === "/signout" ? signOut() : null;
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
            </DropDown>
          )}
        </span>
      </div>
    </nav>
  );
};

export default NavigationBar;
