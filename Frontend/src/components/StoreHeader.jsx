import { useState } from "react";
import searchIcon from "../assets/search.png";
import heartIcon from "../assets/heart.png";
import bagIcon from "../assets/chart.png";
import userIcon from "../assets/user.png";
import caretIcon from "../assets/carret - down.png";

function StoreHeader({ searchValue = "", onSearchChange, onSearch, onLogout }) {
  const [accountOpen, setAccountOpen] = useState(false);

  function submitSearch(event) {
    event.preventDefault();
    onSearch?.(searchValue);
  }

  return (
    <>
      <header className="min-h-28 bg-white">
        <div className="mx-auto flex min-h-28 w-full max-w-355 items-center gap-4.5 px-6 max-[640px]:min-h-24 max-[640px]:flex-wrap max-[640px]:gap-x-3.5 max-[640px]:gap-y-2.5 max-[640px]:px-4 max-[640px]:py-3">
          <div className="flex-1 max-[640px]:hidden" aria-hidden="true" />
          <form className="flex h-12.5 w-full max-w-130 shadow-[0_2px_5px_rgb(0_0_0/12%)] max-[640px]:order-2 max-[640px]:h-10.5 max-[640px]:max-w-none" onSubmit={submitSearch}>
            <label className="sr-only" htmlFor="store-search-input">
              Cari produk
            </label>
            <input
              id="store-search-input"
              className="w-full min-w-0 rounded-l-[5px] border-0 bg-white px-5 text-[14px] text-[#666] outline-none placeholder:text-[#bdbdbd] focus:shadow-[inset_0_0_0_1px_#e5e5e5]"
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Cari produk"
            />
            <button className="grid flex-[0_0_86px] cursor-pointer place-items-center rounded-r-[7px] border-0 bg-(--color-brand) p-0 max-[640px]:basis-13" type="submit" aria-label="Cari produk">
              <img className="h-5 w-5 object-contain" src={searchIcon} alt="" />
            </button>
          </form>
          <nav className="flex items-center gap-4.5 max-[640px]:order-1 max-[640px]:w-full max-[640px]:justify-end max-[640px]:gap-4" aria-label="Aksi pengguna">
            <button className="grid h-8 w-6 cursor-pointer place-items-center border-0 bg-transparent p-0" type="button" aria-label="Wishlist" title="Wishlist">
              <img className="h-5.5 w-5.5 object-contain" src={heartIcon} alt="" />
            </button>
            <button className="grid h-8 w-6 cursor-pointer place-items-center border-0 bg-transparent p-0" type="button" aria-label="Keranjang" title="Keranjang">
              <img className="h-5.5 w-5.5 object-contain" src={bagIcon} alt="" />
            </button>
            <div className="relative">
              <button
                type="button"
                className="flex h-8 w-9 cursor-pointer items-center justify-between border-0 bg-transparent p-0"
                aria-label="Menu akun"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((open) => !open)}
              >
                <img className="h-5.5 w-4.75 object-contain" src={userIcon} alt="" />
                <img className="h-1.75 w-2.25 object-contain" src={caretIcon} alt="" />
              </button>
              {accountOpen && (
                <button
                  type="button"
                  className="absolute top-[calc(100%+8px)] right-0 z-5 min-w-25 cursor-pointer border border-[#eee] bg-white px-3.5 py-2.5 text-left text-[13px] text-[#555] shadow-[0_3px_8px_rgb(0_0_0/12%)]"
                  onClick={onLogout}
                >
                  Keluar
                </button>
              )}
            </div>
          </nav>
        </div>
      </header>
      <nav className="min-h-16 bg-[#f3f3f3]" aria-label="Navigasi utama">
        <div className="mx-auto flex min-h-16 w-full max-w-355 items-stretch px-6 max-[640px]:px-0">
          <button className="flex min-h-16 w-52.5 cursor-pointer items-center justify-center gap-2 border-0 bg-(--color-brand) px-8 py-3 text-[16px] font-bold tracking-[0.03em] text-white max-[640px]:min-h-12 max-[640px]:w-35 max-[640px]:text-[13px]" type="button">
            BELANJA <img className="h-1.75 w-2.25 brightness-0 invert" src={caretIcon} alt="" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default StoreHeader;
