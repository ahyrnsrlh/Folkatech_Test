import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorState from "../components/common/ErrorState.jsx";
import Loading from "../components/common/Loading.jsx";
import ProductGallery from "../components/ProductGallery.jsx";
import ProductInfo from "../components/ProductInfo.jsx";
import ProductRecommendations from "../components/ProductRecommendations.jsx";
import ProductSpecifications from "../components/ProductSpecifications.jsx";
import StoreHeader from "../components/StoreHeader.jsx";
import { useAuth } from "../context/useAuth.js";
import { getProductById, getProducts } from "../services/productService.js";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let active = true;
    getProductById(id)
      .then((response) => {
        if (active) setProduct(response.data.data);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.status === 404
              ? "Produk tidak ditemukan."
              : "Gagal memuat detail produk.",
          );
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    let active = true;
    getProducts({ limit: 12, sort: "rating", order: "desc" })
      .then((response) => {
        if (active) {
          setRecommendations(
            (response.data.data || [])
              .filter((item) => String(item.id) !== String(id))
              .slice(0, 3),
          );
        }
      })
      .catch(() => {
        if (active) setRecommendations([]);
      });

    return () => {
      active = false;
    };
  }, [id]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-(--color-canvas) text-(--color-ink)">
        <Loading label="Memuat detail produk..." />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-(--color-canvas) text-(--color-ink)">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-(--color-canvas) text-(--color-ink)">
      <StoreHeader
        searchValue={headerSearch}
        onSearchChange={setHeaderSearch}
        onSearch={(value) => navigate(`/products?search=${encodeURIComponent(value.trim())}`)}
        onLogout={handleLogout}
      />
      <div className="mx-auto w-full max-w-355 px-6 pt-7.5 pb-20 max-[700px]:px-4 max-[700px]:pt-3.5 max-[700px]:pb-10">
        <div className="mb-15 flex min-w-0 items-center gap-3 text-[13px] text-(--color-muted) max-[700px]:mb-6">
          <Link className="text-inherit no-underline hover:text-(--color-brand)" to="/products">Home</Link>
          <svg className="h-1.5 w-1.5 flex-[0_0_6px] rotate-45 text-[#999]" viewBox="0 0 6 6" fill="none" aria-hidden="true"><path d="M1 1h4v4" stroke="currentColor" /></svg>
          <Link className="text-inherit no-underline hover:text-(--color-brand)" to="/products">Produk</Link>
          <svg className="h-1.5 w-1.5 flex-[0_0_6px] rotate-45 text-[#999]" viewBox="0 0 6 6" fill="none" aria-hidden="true"><path d="M1 1h4v4" stroke="currentColor" /></svg>
          <strong className="max-w-105 overflow-hidden text-ellipsis font-medium whitespace-nowrap text-(--color-brand)">
            {product.name}
          </strong>
        </div>
        <section className="mx-auto grid w-full max-w-[1218px] grid-cols-[minmax(0,560px)_minmax(0,1fr)] items-start gap-[60px] max-[900px]:grid-cols-2 max-[900px]:gap-8 max-[700px]:block">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </section>
        <ProductSpecifications product={product} />
        <ProductRecommendations products={recommendations} />
      </div>
    </main>
  );
}

export default ProductDetail;
