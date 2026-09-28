import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import EmptyState from "../components/common/EmptyState.jsx";
import ErrorState from "../components/common/ErrorState.jsx";
import Loading from "../components/common/Loading.jsx";
import Pagination from "../components/Pagination.jsx";
import ProductFilter from "../components/ProductFilter.jsx";
import StoreHeader from "../components/StoreHeader.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductSort from "../components/ProductSort.jsx";
import { useAuth } from "../context/useAuth.js";
import { getProductFilters, getProducts } from "../services/productService.js";

const filterNames = [
  "origin",
  "species",
  "roast_level",
  "tasted",
  "processing",
  "min_price",
  "max_price",
];

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [filterGroups, setFilterGroups] = useState({});
  const [meta, setMeta] = useState({
    page: 1,
    limit: 12,
    total: 0,
    total_pages: 0,
  });
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "asc";
  const filters = Object.fromEntries(
    filterNames.map((name) => [name, searchParams.get(name) || ""]),
  );

  useEffect(() => {
    let active = true;

    getProductFilters()
      .then((response) => {
        if (active) setFilterGroups(response.data.data || {});
      })
      .catch(() => {
        if (active) setFilterGroups({});
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    getProducts(Object.fromEntries(searchParams.entries()))
      .then((response) => {
        if (!active) return;
        setProducts(response.data.data || []);
        setMeta(
          response.data.meta || { page, limit, total: 0, total_pages: 0 },
        );
      })
      .catch(() => {
        if (active) setError("Gagal memuat produk. Silakan coba lagi.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [searchParams, page, limit]);

  function updateParams(updates) {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([name, value]) => {
      if (value) next.set(name, value);
      else next.delete(name);
    });
    if (!("page" in updates)) next.set("page", "1");
    setIsLoading(true);
    setError("");
    setSearchParams(next);
  }

  function handleFilterApply(name, value) {
    if (name === "price_range") {
      updateParams({ min_price: value.min, max_price: value.max });
      return;
    }
    updateParams({ [name]: value });
  }

  function handleSortChange(event) {
    updateParams({ [event.target.name]: event.target.value });
  }

  function resetFilters() {
    const next = new URLSearchParams();
    next.set("page", "1");
    next.set("limit", String(limit));
    setSearch("");
    setSearchParams(next);
  }

  function changePage(nextPage) {
    updateParams({ page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-(--color-canvas) text-(--color-ink)">
      <StoreHeader
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={(value) => updateParams({ search: value.trim() })}
        onLogout={handleLogout}
      />
      <div className="mx-auto w-full max-w-355 px-6 pt-9.5 pb-12.5 max-[640px]:px-5 max-[520px]:pt-3.5">
        <div className="mb-12.5 flex items-center gap-2.5 text-[13px] text-(--color-muted) max-[520px]:mb-3.5">
          Home
          <svg className="h-1.5 w-1.5 rotate-45 text-[#999]" viewBox="0 0 6 6" fill="none" aria-hidden="true"><path d="M1 1h4v4" stroke="currentColor" /></svg>
          Produk
        </div>
        <div className="grid grid-cols-[minmax(280px,340px)_minmax(0,1fr)] gap-4 max-[900px]:block">
          <ProductFilter
            values={filters}
            groups={filterGroups}
            onApply={handleFilterApply}
            onReset={resetFilters}
          />
          <section className="min-w-0" aria-label="Daftar produk">
            <div className="mb-5 flex items-center justify-between gap-5 max-[640px]:flex-col max-[640px]:items-start">
              <span className="flex-1 text-[13px] text-(--color-muted)">
                Menampilkan{" "}
                <select
                  className="mx-2 min-h-7 rounded-xs border border-(--color-line) bg-[#f8f8f8] px-1.75 text-[12px] text-(--color-ink)"
                  aria-label="Jumlah produk per halaman"
                  value={limit}
                  onChange={(event) =>
                    updateParams({ limit: event.target.value })
                  }
                >
                  {[12, 24, 36].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>{" "}
                dari {meta.total}
              </span>
              <ProductSort
                sort={sort}
                order={order}
                onChange={handleSortChange}
              />
            </div>
            {isLoading && <Loading />}
            {!isLoading && error && (
              <ErrorState
                message={error}
                onRetry={() => {
                  setIsLoading(true);
                  setError("");
                  setSearchParams(new URLSearchParams(searchParams));
                }}
              />
            )}
            {!isLoading && !error && products.length === 0 && <EmptyState />}
            {!isLoading && !error && products.length > 0 && (
              <ProductGrid products={products} />
            )}
            {!isLoading && !error && (
              <Pagination
                page={meta.page}
                totalPages={meta.total_pages}
                onChange={changePage}
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProductList;
